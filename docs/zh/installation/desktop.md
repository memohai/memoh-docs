# Desktop 桌面版安装

Memoh Desktop 是面向个人和本地使用的原生客户端。它和 Server Deploy 是两条分发线：桌面版默认管理自己的本地后端，而不是连接一个托管的 Web/server 部署。

## 什么时候用 Desktop

适合这些场景：

- 想要一个打开就能用的本地 App
- 单用户或个人工作流
- 本地记忆和本地存储
- 想用 bundled `memoh` CLI 连接同一个本地服务
- 在自己的电脑上使用 local 或 Docker-backed workspace

如果你需要多人共享、生产可用性、远程访问，或机器人要在桌面离线时继续服务外部渠道，请用 [Server Deploy](/zh/installation/docker)。

## 安装

1. 从 [Memoh Desktop 下载页](https://memoh.ai/desktop) 下载对应平台安装包。
2. 打开 Memoh。
3. 等 App 启动本地服务并初始化存储。
4. 可选：在 App 菜单里安装 bundled `memoh` CLI。

## Desktop 会管理什么

桌面版负责本地运行时生命周期：

- `127.0.0.1:18731` 上的本地 `memoh-server`
- 系统应用数据目录下的 SQLite 本地数据
- 用于记忆向量检索的 embedded Qdrant
- bundled CLI、server binary、provider templates、workspace bridge runtime
- 系统托盘唤起与退出行为

从托盘退出会走桌面端的关闭路径，同时停止它管理的本地 server 和 embedded Qdrant。

## Workspace 行为

Desktop 可按配置使用 trusted local workspace 或 container-backed workspace。Trusted local workspace 以本地用户权限运行，不提供容器隔离；container-backed workspace 仍保留正常的 bot workspace 模型，可用于文件编辑、命令执行、MCP 托管，以及可选的桌面显示/浏览器会话。

运行时差异见 [Workspace backend](/zh/installation/workspace-backends)。
