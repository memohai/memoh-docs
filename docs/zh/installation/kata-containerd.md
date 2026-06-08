# Containerd + Kata

Memoh 可以通过 `containerd` workspace backend 使用 Kata Containers 运行机器人 workspace。整体生命周期仍然走 Memoh 原来的 workspace 模型，但 containerd 会用 `io.containerd.kata.v2` 启动每个 workspace。

当你希望在 Linux/KVM 主机上获得 VM 级 workspace 隔离时，可以使用这个方案。macOS 和 Docker Desktop 主机不能运行这条路径。

## 适用场景

- Memoh 部署在有 KVM 的 Linux 服务器上。
- 希望每个机器人 workspace 运行在轻量 VM 边界之后。
- 仍然希望 Memoh 的 workspace API、快照、文件、命令和界面控制保持和普通 `containerd` backend 一致。

Memoh 目前仍通过 containerd snapshot 管理 Kata workspace。CPU 和内存限制是 hard limit。存储限制目前会保存并展示为 soft limit；等 VM 磁盘 quota 或 block-device quota 支持完成后，才能作为 hard limit 强制。

## 环境要求

- Linux 主机，并且存在 `/dev/kvm`。
- 如果主机本身也是 VM，需要开启 nested virtualization。
- Docker 和 Docker Compose v2。
- 宿主机已安装 Kata Containers。
- 宿主机可用的 Kata runtime，例如 `io.containerd.kata.v2`。

默认 compose overlay 会使用这些宿主机路径：

```bash
MEMOH_KATA_SHIM_PATH=/opt/kata/bin/containerd-shim-kata-v2
MEMOH_KATA_CONFIG_DIR=/etc/kata-containers
MEMOH_KATA_SHARE_DIR=/usr/share/kata-containers
MEMOH_KATA_OPT_DIR=/opt/kata
MEMOH_KATA_SYSLOG_SOCKET=/run/systemd/journal/dev-log
```

如果你的 Kata 安装路径不同，启动 Memoh 前先 export 对应变量。

## 配置

在 `config.toml` 里，workspace backend 仍然保持 `containerd`，同时设置 containerd runtime type：

```toml
[container]
backend = "containerd"

[containerd]
runtime_type = "io.containerd.kata.v2"
```

`container_backend` 仍会显示为 `containerd`。要确认机器人 workspace 是否真的在用 Kata，需要看 workspace runtime：`runtime_backend = "io.containerd.kata.v2"`。

也可以在 Memoh server 的 containerd 环境里直接检查容器：

```bash
ctr -n default containers info workspace-<bot-id>
```

期望看到的 runtime name 是 `io.containerd.kata.v2`。

## Compose overlay

使用 Kata compose overlay 启动 Memoh：

```bash
docker compose -f docker-compose.yml -f docker-compose.kata.yml up -d
```

这个 overlay 会把宿主机的 KVM 设备、Kata shim、Kata 配置和 Kata runtime assets 挂进 Memoh server 容器。

Dockerized Memoh server 会为机器人 workspace 运行一个嵌套 containerd。因此 Kata compose overlay 会给 server service 设置 `cgroup: host` 和 `shm_size: 1gb`。宿主机 cgroup namespace 允许嵌套 Kata runtime 创建 sandbox cgroup controllers；更大的 shared-memory segment 可以避免 Docker 默认 `/dev/shm` 太小导致的 QEMU/KVM 启动失败。

syslog socket 会挂载到 server 容器内的 `/dev/log`，让 Kata shim 可以初始化日志。在非 systemd 主机上，把 `MEMOH_KATA_SYSLOG_SOCKET` 设置为宿主机实际的 syslog socket 路径。

## Bridge 网络

Kata workspace 使用 bridge TCP listener（`BRIDGE_TCP_ADDR=:9090`），不使用普通 containerd workspace 的 Unix socket bridge。Unix socket 可能会通过 Kata shared filesystem 出现在宿主机上，但它不是一个可跨 guest VM 边界使用的连接端点。

Memoh 会把 Kata bridge 流量路由到 workspace 的 CNI IP。Bridge gRPC dial 也会绕过 HTTP proxy，避免 server 级别的 proxy 变量拦截私有 workspace 地址。

## Build proxy

如果 Linux/KVM 主机在 Docker build 阶段需要代理，启动或重建 Kata compose stack 前设置 build proxy 变量：

```bash
export MEMOH_KATA_BUILD_HTTP_PROXY=http://172.17.0.1:7890
export MEMOH_KATA_BUILD_HTTPS_PROXY=http://172.17.0.1:7890
export MEMOH_KATA_BUILD_NO_PROXY=127.0.0.1,localhost
```

这里要使用 Docker build 容器能访问到的宿主机地址。在 Linux 上，Dockerfile `RUN` 步骤里的 `localhost` 指的是 build 容器自己，不是宿主机。

## 验证

启动后，创建或重建一个机器人 workspace，并确认 workspace runtime 是 `io.containerd.kata.v2`。

也可以在 server 的 containerd 环境里直接跑一个 Kata runtime smoke test：

```bash
ctr -n default run --rm \
  --runtime io.containerd.kata.v2 \
  --snapshotter overlayfs \
  docker.io/library/alpine:3.22 \
  memoh-kata-smoke \
  /bin/sh -lc 'printf "runtime-smoke-ok\n"'
```

如果直接 smoke test 通过，但机器人 workspace 无法启动，优先检查 server 日志里是否有 Kata shim、cgroup、`/dev/log`、`/dev/kvm` 或 bridge 连接错误。
