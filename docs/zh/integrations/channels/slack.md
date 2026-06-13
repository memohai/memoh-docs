# Slack

在 Slack 里收 DM、进频道、跟 thread、读附件、发文件、流式回复。Memoh 的 Slack 适配用 **Socket Mode**。

## 1. 建 Slack App

1. 打开 [Slack API 控制台](https://api.slack.com/apps)，**Create New App**。
2. 选要装的工作区。
3. 在 **Basic Information** 等页保留窗口，下面要填。

## 2. 开 Socket Mode

1. 在 **Settings** → 找到 **Socket Mode** 并开启。
2. 建 **App-Level Token**，Scope 勾 `connections:write`。
3. 复制以 `xapp-` 开头的 **App-Level Token**。

## 3. Bot 权限（OAuth Scopes）

在 **OAuth & Permissions** → **Bot Token Scopes** 至少加当前适配会用的，例如：

- `app_mentions:read`：频道里 @
- `channels:history` / `groups:history` / `im:history` / `mpim:history`：读各场景消息
- `chat:write`：在频道/线程/DM 里发
- `files:read` / `files:write`：收、发文件
- `reactions:write`：动反应

建议再加（名子、元数据更齐）：

- `channels:read` / `groups:read` / `im:read` / `mpim:read`

## 4. 订事件

**Event Subscriptions** 打开，**Subscribe to bot events** 里加，例如：

- `app_mention`
- `message.channels` / `message.groups` / `message.im` / `message.mpim`

以你装的 Memoh 版本在文档/发行说明里写的为准；上面是常见集合。

## 5. 装到工作区

1. **OAuth & Permissions** → **Install to Workspace**。
2. 授权后复制 **Bot User OAuth Token**（`xoxb-` 开头）。

**同一个 Slack App 里** 的 `xoxb-` 与 `xapp-` 要配对使用。

## 6. 在 Memoh 里填

1. 机器人 **Platforms** → **Add Channel** → **Slack**。
2. 填 **Bot Token**（`xoxb-`）、**App-Level Token**（`xapp-`）。
3. **Save and Enable**。

## 7. 把 app 加进对话

- DM：在 Slack 里和该 app 开对话并发一条。
- 公开频道：把 app **邀请**进频道。
- 私聊频道：装好后**显式邀请**进频道。

能发不能收图/文件，多半缺 `files:read`；能连上没人任何入站，查 **Event** 和 **history** 类 scope 是否配对。

## 支持的能力

- DM、公开/私有频道、**thread**
- 读/发附件与图片
