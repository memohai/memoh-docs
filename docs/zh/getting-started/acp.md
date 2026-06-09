# Agents / ACP

Memoh 可以把机器人连接到 ACP 兼容的编码智能体。ACP 智能体是外部编码工作流，可以从机器人的聊天 workspace 里工作，同时把自己的会话和普通 chat / discuss 分开。

当前界面里可见的设置示例包括 Codex 和 Claude Code。它们是当前支持/展示的配置路径，不代表未来只能接这两种 ACP 兼容智能体。

---

## 设置流程

1. 打开机器人 **详情页**。
2. 进入 **Agents** tab。
3. 启用要使用的智能体。
4. 按该智能体展示的方式选择设置或授权模式，例如 OAuth、API Key、或自管理配置。
5. 保存。
6. 打开聊天 workspace，从那里启动已启用的智能体。

不同智能体的字段会不一样，因为每个 ACP 集成都有自己的授权和设置要求。

---

## ACP Agent 会话

ACP 工作使用 `acp_agent` 会话类型。这类会话由 Agents/ACP 工作流创建和管理。

它不会通过普通 `/new chat` 或 `/new discuss` 路由创建。网页端可以按 `acp_agent` 过滤会话，把编码智能体工作和日常对话分开看。

---

## 附件

ACP Agent 会话目前不支持消息附件。需要直接给机器人发文件或图片时，请使用普通 chat 会话。

---

## 相关页面

- [机器人](/zh/getting-started/bot.md)
- [会话](/zh/getting-started/sessions.md)
- [文件](/zh/getting-started/files.md)
