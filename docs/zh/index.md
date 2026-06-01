# Memoh 中文文档

Memoh（读作 /ˈmemoʊ/）是面向多成员、结构化长期记忆和独立 workspace 的 AI 智能体平台。你可以创建多个机器人，为每个机器人准备工作区与长期记忆，并通过 Telegram、Discord、飞书、QQ、Matrix、Misskey、钉钉、企微、微信、公众号、邮件或内置网页端接入。

Memoh 有两种分发方式：

- **Desktop 桌面版**：适合个人和本地使用，原生 App 会启动自己的本地 server、embedded Qdrant、本地存储和 bundled CLI。
- **Server Deploy**：适合长期在线、多人、多租户或需要持续接入外部渠道的部署。

## 起步

- **[安装选择](/zh/installation/)**：先判断用 Desktop 还是 Server Deploy。
- **[Desktop 桌面版](/zh/installation/desktop)**：安装本地原生客户端。
- **[Server Deploy](/zh/installation/docker)**：用 Docker Compose 部署 Memoh server。
- **[供应商与模型](/zh/getting-started/provider-and-model)**：配置上游 API、模型类型与能力标记。
- **[机器人](/zh/getting-started/bot)**：创建机器人并配置各标签页。
- **[会话](/zh/getting-started/sessions)**：聊天与 Discuss 模式、状态区、路由。

## 功能指南

- **[Workspace backend](/zh/installation/workspace-backends)**：选择容器和本地 workspace runtime。
- **[Browser / Computer Use](/zh/getting-started/browser-computer-use)**：操作有头浏览器和图形桌面。
- **[文件](/zh/getting-started/files)**：浏览和编辑机器人 workspace 文件系统。
- **[渠道总览](/zh/channels/index)**：支持的平台与各平台分篇。
- **[访问控制](/zh/getting-started/access)**：ACL 预设、规则顺序与按来源限定。
- **[技能](/zh/getting-started/skills)**：托管/发现、生效/被遮蔽、从超市安装。
- **[超市](/zh/getting-started/supermarket)**：技能与 MCP 模板安装。
- **[MCP](/zh/getting-started/mcp)**：Stdio/远程、OAuth、探测与导入导出。
- **[长期记忆](/zh/getting-started/memory)**：记忆提供方与在界面里的操作。
- **[会话上下文压缩](/zh/getting-started/compaction)**：缩小当前会话占用，不动存储里的长期记忆。
- **[斜杠命令](/zh/getting-started/slash-commands)**：命令结构、权限与速查表。

## 记忆与语音提供方

- [记忆提供方总览](/zh/memory-providers/index) · [内置](/zh/memory-providers/builtin) · [Mem0](/zh/memory-providers/mem0) · [OpenViking](/zh/memory-providers/openviking)
- [TTS 总览](/zh/tts-providers/index) · [Edge TTS](/zh/tts-providers/edge)
