# Containerd + Kata

Memoh can run bot workspaces with Kata Containers through the `containerd`
workspace backend. This keeps the normal Memoh workspace lifecycle while asking
containerd to start each workspace with `io.containerd.kata.v2`.

Use this setup when you want VM-backed workspace isolation on a Linux/KVM host.
It is not available on macOS or Docker Desktop hosts.

## When to Use It

- You deploy Memoh on a Linux server with KVM.
- You want each bot workspace to run behind a lightweight VM boundary.
- You still want the Memoh workspace APIs, snapshots, files, commands, and UI
  controls to behave like the normal `containerd` backend.

Kata is still managed through containerd snapshots in Memoh. CPU and memory
limits are hard limits. Storage is currently saved and reported as a soft limit
until VM disk quota or block-device quota support is added.

## Requirements

- Linux host with `/dev/kvm`.
- Nested virtualization if the host itself is a VM.
- Docker and Docker Compose v2.
- Kata Containers installed on the host.
- A host Kata runtime such as `io.containerd.kata.v2`.

The default compose overlay expects these host paths:

```bash
MEMOH_KATA_SHIM_PATH=/opt/kata/bin/containerd-shim-kata-v2
MEMOH_KATA_CONFIG_DIR=/etc/kata-containers
MEMOH_KATA_SHARE_DIR=/usr/share/kata-containers
MEMOH_KATA_OPT_DIR=/opt/kata
MEMOH_KATA_SYSLOG_SOCKET=/run/systemd/journal/dev-log
```

If your Kata installation uses different paths, export the matching variables
before starting Memoh.

## Configuration

In `config.toml`, keep the workspace backend as `containerd` and set the
containerd runtime type:

```toml
[container]
backend = "containerd"

[containerd]
runtime_type = "io.containerd.kata.v2"
```

`container_backend` will still report `containerd`. To confirm that a bot
workspace is actually using Kata, check the workspace runtime value:
`runtime_backend = "io.containerd.kata.v2"`.

You can also inspect the container directly from the Memoh server environment:

```bash
ctr -n default containers info workspace-<bot-id>
```

The expected container runtime name is `io.containerd.kata.v2`.

## Compose Overlay

Start Memoh with the Kata compose overlay:

```bash
docker compose -f docker-compose.yml -f docker-compose.kata.yml up -d
```

The overlay mounts the host KVM device, Kata shim, Kata configuration, and Kata
runtime assets into the Memoh server container.

The Dockerized Memoh server runs a nested containerd for bot workspaces. The
Kata compose overlay therefore uses `cgroup: host` and `shm_size: 1gb` on the
server service. The host cgroup namespace lets the nested Kata runtime create
sandbox cgroup controllers, and the larger shared-memory segment avoids
QEMU/KVM boot failures caused by Docker's small default `/dev/shm`.

The syslog socket is mounted into the server container as `/dev/log` so the
Kata shim can initialize logging. On non-systemd hosts, set
`MEMOH_KATA_SYSLOG_SOCKET` to the host syslog socket path.

## Bridge Networking

Kata workspaces use the bridge TCP listener (`BRIDGE_TCP_ADDR=:9090`) instead
of the Unix socket bridge used by normal containerd workspaces. A Unix socket
can appear on the host through the Kata shared filesystem, but it is not a
usable connection boundary across the guest VM.

Memoh routes Kata bridge traffic to the workspace CNI IP. Bridge gRPC dials
also bypass HTTP proxy settings so server-level proxy variables do not
intercept private workspace addresses.

## Build Proxy

If the Linux/KVM host needs a proxy while Docker builds images, set build proxy
variables before starting or rebuilding the Kata compose stack:

```bash
export MEMOH_KATA_BUILD_HTTP_PROXY=http://172.17.0.1:7890
export MEMOH_KATA_BUILD_HTTPS_PROXY=http://172.17.0.1:7890
export MEMOH_KATA_BUILD_NO_PROXY=127.0.0.1,localhost
```

Use a host address that is reachable from Docker build containers. On Linux,
`localhost` inside a Dockerfile `RUN` step is the build container, not the
host.

## Validation

After startup, create or recreate a bot workspace and check that the workspace
runtime is `io.containerd.kata.v2`.

For a direct runtime smoke test, run a small container with the Kata runtime
inside the server's containerd environment:

```bash
ctr -n default run --rm \
  --runtime io.containerd.kata.v2 \
  --snapshotter overlayfs \
  docker.io/library/alpine:3.22 \
  memoh-kata-smoke \
  /bin/sh -lc 'printf "runtime-smoke-ok\n"'
```

If the direct smoke test passes but a bot workspace cannot start, check the
server logs for Kata shim, cgroup, `/dev/log`, `/dev/kvm`, or bridge connection
errors.
