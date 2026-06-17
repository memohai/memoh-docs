# Containerd + Kata

Memoh 可以在 Linux/KVM 主机上通过 containerd 的 Kata runtime 运行机器人
workspace。Memoh 的 workspace API 和生命周期模型保持不变，但 containerd 会用
`io.containerd.kata.v2` 创建每个 workspace。

这条路径只支持 Linux。macOS 或 Docker Desktop 主机可以验证 compose 语法和
runc 回归，但不能证明 Kata runtime 本身可用。

## 能力范围

- `[container].backend = "containerd"` 仍然是 workspace backend。
- `[containerd].runtime_type = "io.containerd.kata.v2"` 会为机器人
  workspace 容器选择 Kata。
- `server-kata` image target 使用 Debian/glibc runtime，因为宿主机 Kata
  shim 通常链接 glibc。
- compose overrides 会把 `/dev/kvm`、宿主机 Kata shim、Kata 配置和 Kata
  runtime assets 挂进 Memoh server 容器。

Memoh 仍然通过 containerd snapshot 驱动 Kata workspace。CPU 和内存限制是
hard limit。存储限制会先保存并展示为 soft limit，直到 VM disk quota 或
block-device quota 支持完成。

Kata workspace 使用 bridge TCP listener（`BRIDGE_TCP_ADDR=:9090`），不使用普通
containerd workspace 的 Unix socket bridge。Unix socket 可能会通过 Kata shared
filesystem 出现在宿主机上，但它不是可跨 guest VM 边界使用的连接端点。Memoh
会把 Kata bridge 流量路由到 workspace 的 CNI IP，并且 bridge gRPC dial 会禁用
HTTP proxy，避免 server 容器上的 proxy 设置拦截私有 workspace 地址。

共享部署请启用 `[bridge_tls].mode = "strict"`。默认的 `disabled` 模式方便本地
安装，但不能保护共享 Kata/CNI 网络免受 workspace-to-workspace bridge 流量影响。
在多租户 Kata 部署中，除非你的网络层已经独立阻断 workspace 之间的 TCP 访问，
否则 strict bridge mTLS 是必需的隔离层。

## Bridge mTLS 材料

使用仓库工具生成 strict bridge mTLS 材料，不要手写 OpenSSL 命令：

```bash
INSTANCE_ID="$(uuidgen | tr '[:upper:]' '[:lower:]')"
scripts/gen-bridge-mtls.sh \
  -instance-id "$INSTANCE_ID" \
  -out /opt/memoh/bridge-mtls
```

等价的 `mise` 命令是：

```bash
mise run bridge:mtls:gen -- \
  -instance-id "$INSTANCE_ID" \
  -out /opt/memoh/bridge-mtls
```

生成器会创建两个独立 CA，为 Memoh server 签发一个 `ClientAuth` 证书，为
workspace bridge 签发一个 `ServerAuth` 证书，只写入必需的 leaf keys 和 CA
bundles，并丢弃两个 CA private keys。它会打印类似下面的配置片段：

```toml
instance_id = "11111111-1111-1111-1111-111111111111"

[bridge_tls]
mode = "strict"
server_dir = "/opt/memoh/bridge-mtls/server"
bridge_dir = "/opt/memoh/bridge-mtls/bridge"
server_name = ""
```

`server_dir` 只由 Memoh server 读取，包含：

```text
server-client.crt
server-client.key
bridge-server-ca.crt
```

`bridge_dir` 会以只读方式挂载到 workspace 容器，并且只能包含：

```text
bridge-server.crt
bridge-server.key
server-client-ca.crt
```

不要把 `server_dir` 复用成 `bridge_dir`，也不要把 `server-client.crt` 或
`server-client.key` 复制到 `bridge_dir`。Strict mode 会在向 workspace 挂载任何
内容之前拒绝共享目录、指向同一位置的 symlink 目录、缺失材料，或
`bridge_dir` 中出现的非预期文件。

如果你在现有部署上启用 strict bridge mTLS，需要重建或重启所有已有 workspace
容器。旧容器没有 TLS 材料挂载，也没有 `BRIDGE_TLS_*` 环境变量；一旦 server
要求 mTLS，它们会 fail closed。

## 宿主机要求

- Linux 主机，并且 `/dev/kvm` 可用。
- 如果宿主机本身也是 VM，需要开启 nested virtualization。
- Docker 和 Docker Compose v2。
- 宿主机已安装 Kata Containers。
- 宿主机需要安装 `curl` 和 `jq`，供 API verifier 使用。

默认宿主机路径：

```bash
MEMOH_KATA_SHIM_PATH=/opt/kata/bin/containerd-shim-kata-v2
MEMOH_KATA_CONFIG_DIR=/etc/kata-containers
MEMOH_KATA_SHARE_DIR=/usr/share/kata-containers
MEMOH_KATA_OPT_DIR=/opt/kata
MEMOH_KATA_SYSLOG_SOCKET=/run/systemd/journal/dev-log
```

如果你的 Kata 安装路径不同，在运行 dev 或 production compose 命令前 export
这些变量。syslog socket 会挂载到 server 容器内的 `/dev/log`，让 Kata shim
可以初始化日志。在非 systemd 主机上，把 `MEMOH_KATA_SYSLOG_SOCKET` 设置为宿主机
实际的 syslog socket 路径。

Dockerized Memoh server 会为 workspace 容器运行一个嵌套 containerd。因此 Kata
compose overrides 会给 server service 设置 `cgroup: host` 和 `shm_size: 1gb`。
宿主机 cgroup namespace 允许嵌套 Kata runtime 创建 sandbox cgroup controllers；
更大的 shared-memory segment 可以避免 Docker 默认 `/dev/shm` 太小导致的 QEMU/KVM
启动失败。

如果 Linux/KVM 主机在 Docker image build 阶段需要代理，运行 Kata compose tasks
之前先设置 build proxy 变量：

```bash
export MEMOH_KATA_BUILD_HTTP_PROXY=http://172.17.0.1:7890
export MEMOH_KATA_BUILD_HTTPS_PROXY=http://172.17.0.1:7890
export MEMOH_KATA_BUILD_NO_PROXY=127.0.0.1,localhost
```

这里要使用 Docker build 容器能访问到的宿主机地址。在 Linux 上，Dockerfile
`RUN` 步骤里的 `localhost` 指的是 build 容器自己，不是宿主机。

## Development Stack

在专用 Linux/KVM development host 上运行：

```bash
mise run kata:runner
mise run dev:kata
mise run dev:kata:status
```

`kata:runner` 是面向 runner 或 development host 的轻量 readiness check。它会写入
`tmp/kata-evidence/environment.txt`，验证 Docker 和 Docker Compose 可用，然后在
启动任何 Memoh stack 之前检查 Linux、`/dev/kvm`、Kata shim、Kata 配置和 Kata
runtime asset 目录。

`dev:kata:status` 是面向当前 dev server 的轻量诊断命令。当
`http://127.0.0.1:18082` 已经打开，并且你需要确认后端 server 是 Kata dev stack
还是普通 dev stack 时使用。它会检查 `/ping`、`memoh-dev-server` 容器的
`CONFIG_PATH`、`/dev/kvm` 以及 Kata shim/config mounts。

Kata 下预期看到 `container_backend = "containerd"`。真正证明 workspace runtime
是 Kata 的值，是机器人 workspace 上的 `runtime_backend = "io.containerd.kata.v2"`，
或 `ctr containers info` 输出中的 `Runtime.Name = "io.containerd.kata.v2"`。

## Production Compose

请在专用 Linux/KVM 主机上使用，因为根 compose 文件使用固定容器名，例如
`memoh-server` 和 `memoh-postgres`：

```bash
docker compose -f docker-compose.yml -f docker-compose.kata.yml up --build
```

手动 production 部署时，先复制并编辑 Kata 配置：

```bash
cp conf/app.kata.docker.toml config.kata.toml
# Change admin password, JWT secret, and database password.
MEMOH_CONFIG=./config.kata.toml \
  docker compose -f docker-compose.yml -f docker-compose.kata.yml up --build -d
```

启动后，创建或重建一个机器人 workspace，并确认 workspace runtime 是
`io.containerd.kata.v2`。

也可以在 server 的 containerd 环境里直接运行一个 Kata runtime smoke test：

```bash
ctr -n default run --rm \
  --runtime io.containerd.kata.v2 \
  --snapshotter overlayfs \
  docker.io/library/alpine:3.22 \
  memoh-kata-smoke \
  /bin/sh -lc 'printf "runtime-smoke-ok\n"'
```

通过 `ctr -n default containers info workspace-<bot-id>` 看到的预期 container
runtime name 是 `io.containerd.kata.v2`。

## GitHub Actions Runner

用这些 labels 注册 runner：

```text
self-hosted, linux, x64, kvm, kata
```

在 Linux/KVM 主机上，这个命令可以运行 readiness preflight，并生成 runner
registration script。生成的脚本会添加必需的 `kvm,kata` labels，但不会把短期有效
的 GitHub registration token 写入文件：

```bash
scripts/prepare-kata-github-runner.sh
```

设置 `MEMOH_KATA_RUNNER_NAME`、`MEMOH_KATA_RUNNER_DIR` 或
`MEMOH_KATA_RUNNER_SCRIPT` 可以覆盖生成的 runner 名称、安装目录或输出脚本。
等价的 `mise` 命令是 `mise run kata:github:runner`。生成的注册脚本会在注册前
重新检查 Linux、x86_64/amd64、`/dev/kvm`、Docker Compose 和 Kata shim/config
路径，所以复制出去的脚本不会静默地把错误主机注册为带有 `kvm,kata` labels 的
runner。

如果要在不启动 Memoh stack 的情况下检查新注册的 runner，可以手动运行 workflow，
并设置 `run_runner_readiness=true`。这只会运行
`scripts/check-kata-runner-ready.sh`，并上传包含环境摘要的
`kata-runner-readiness` artifact。

当带有必需 labels 的 runner 注册完成后，可以用这个命令从 PR branch dispatch
readiness workflow，等待它结束，并审计 PR checks：

```bash
scripts/run-kata-github-e2e.sh <pr-number>
```

等价的 `mise` 命令是 `mise run kata:github:readiness -- <pr-number>`。因为
GitHub 要求 `workflow_dispatch` workflows 先注册后才能手动运行，这个命令会在
dispatch 前检查 workflow 是否可用。

如果要审计某个 PR head 是否已经完成 runner readiness verification，运行：

```bash
scripts/audit-kata-github-verification.sh <pr-number>
```

对应 task 是 `mise run kata:github -- <pr-number>`。

## 排障

- `Kata validation requires a Linux host with KVM`：在带 KVM 的 Linux 主机上跑
  E2E。Docker Desktop 不够。
- `/dev/kvm is missing`：启用 KVM 或 nested virtualization，然后确认 Docker 能把
  `/dev/kvm` 传入容器。
- `Kata shim not found`：把 `MEMOH_KATA_SHIM_PATH` 设置为宿主机
  `containerd-shim-kata-v2` 路径。
- `configuration.toml` 中引用的路径缺失：挂载对应 Kata assets，或把
  `MEMOH_KATA_SHARE_DIR` / `MEMOH_KATA_OPT_DIR` 设置为正确的宿主机路径。
- `ctr containers info` 里 runtime mismatch：确认 server config 使用
  `runtime_type = "io.containerd.kata.v2"`，并且包含 Kata compose override。
- 直接 Kata smoke test 通过，但机器人 workspace 无法启动：检查 server 日志中是否
  有 Kata shim、cgroup、`/dev/log`、`/dev/kvm` 或 bridge 连接错误。
