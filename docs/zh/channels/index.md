# 渠道总览

**渠道**把 Memoh 机器人和外面连起来；配好以后，你就能在常用 IM 里用机器人。

当前支持：

- **[Slack](./slack)**：Socket Mode、频道与 thread、文件、反应。
- **[Telegram](./telegram)**：流式、附件、格式等较全。
- **[飞书](./feishu)**：开放平台，偏企业流程。
- **[Discord](./discord)**：服务器与私聊。
- **[QQ](./qq)**：官方机器人平台，个人 DM 向。
- **[Matrix](./matrix)**：任意 homeserver，去中心化协议。
- **[Misskey](./misskey)**：回复、反应；偏文字社交。
- **[钉钉](./dingtalk)**：企业私聊/群，流式入站。
- **[企微 WeCom](./wecom)**：企业微信工作区。
- **[微信](./weixin)**：个人号，扫码登录。
- **[微信公众号](./wechatoa)**：服务号/公众号 webhook，偏私聊入站。
- **邮件**：SMTP、Mailgun、Gmail OAuth 等，在「邮件提供方」里配，见 [邮件](/zh/getting-started/email)。
- **Web**：自带网页聊天。

### 个人微信 和 公众号

两套东西不要混：

- **微信（`weixin`）**：个人号扫码连上那种。
- **公众号（`wechatoa`）**：要 `App ID`、`App Secret`、`Token`，可选加解密；走平台回调 URL。

按你实际部署选一种。

## 一般怎么配

1. 在目标平台注册应用/机器人，拿 token、密钥等。
2. 在 Memoh 里该机器人的 **Platforms** 里加渠道，按表单填。
3. 保存并启用。

最后一步因平台而异：有的要把 **回调 URL** 粘到控制台，有的要 **手机扫码**，有的要 **长连接/WebSocket** 一直由 Memoh 维护。下面分平台见各篇。
