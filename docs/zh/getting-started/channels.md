# 机器人的渠道

**渠道**把机器人接到各消息平台，让你用熟悉的 App 跟它说话。

## 统一接入

Memoh 在中间做一层适配；一个机器人可以同时挂在 Telegram、Discord、Matrix 等多个平台。

---

## 支持哪些平台

在机器人 **Platforms** tab 里配。分平台步骤见 **[渠道](/zh/channels/index)** 下各篇：

| 平台 | 指南 | 备注 |
|------|------|------|
| Telegram | [Telegram](/zh/channels/telegram) | 附件、流式较好 |
| 飞书 | [飞书](/zh/channels/feishu) | 可走 webhook 入站 |
| Discord | [Discord](/zh/channels/discord) | 社群、服务器 |
| QQ | [QQ](/zh/channels/qq) | 偏个人 DM |
| Matrix | [Matrix](/zh/channels/matrix) | 自建 homeserver |
| Misskey | [Misskey](/zh/channels/misskey) | 回复、反应；无流式 |
| 钉钉 | [钉钉](/zh/channels/dingtalk) | 企业私聊/群 |
| 企微 | [企微](/zh/channels/wecom) | 企业微信工作区 |
| 微信 | [微信](/zh/channels/weixin) | 个人扫码登录 |
| 公众号 | [公众号](/zh/channels/wechatoa) | 公众号 webhook |
| Slack | [Slack](/zh/channels/slack) | 有 thread；无流式 |

个人 **微信** 和 **公众号** 是两套适配，别混用。

---

## 配置流程

### 1. 添加

**Add Channel** → 选平台 → 按表单填（随平台变）。

### 2. 常见字段

| 字段 | 说明 |
|------|------|
| **Credentials** | 各平台给的 token、密钥、机器人 key 等 |
| **Disabled** | 不删配置，只关掉 |
| **Routing** | 平台侧线程/会话与 Memoh 的对应关系 |

### 3. 飞书 Webhook 入站

`webhook` 入站时，Memoh 会生成 **Webhook 回调 URL**，贴到飞书应用事件里，由飞书把消息推过来。

### 4. 个人微信

启用后走扫码，用微信扫完连上。

### 5. 公众号

先保存渠道，用 Memoh 给的 **回调 URL** 配到公众号后台；`Token`、加解密方式、可选 AES 要与 Memoh 里一致。

### 6. 钉钉 Stream

填 `App Key` / `App Secret`，保存并启用；标准用法下由 Memoh 维护长连接收事件，不必自己再管一层 webhook。

---

## 操作

- **Save**：改配置
- **Save and Enable**：保存并立刻启用
- **启停开关**：不删配置地开/关
- **Delete**：删掉该渠道配置
