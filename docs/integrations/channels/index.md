# Channels

Channels connect Memoh bots to messaging platforms. Configure them from the bot **Platforms** tab so users can talk to the same bot through Slack, Telegram, Feishu, Discord, WeChat, Email, the web UI, and other surfaces.

## Supported Channels

| Platform | Guide | Notes |
|----------|-------|-------|
| Slack | [Slack Configuration](/integrations/channels/slack) | Workspace messaging with threads |
| Telegram | [Telegram Configuration](/integrations/channels/telegram) | Strong attachment and streaming support |
| Feishu (Lark) | [Feishu Configuration](/integrations/channels/feishu) | Supports webhook-style inbound mode |
| Discord | [Discord Configuration](/integrations/channels/discord) | Good fit for communities and servers |
| QQ | [QQ Configuration](/integrations/channels/qq) | Personal DM oriented |
| Matrix | [Matrix Configuration](/integrations/channels/matrix) | Decentralized homeserver support |
| Misskey | [Misskey Configuration](/integrations/channels/misskey) | Replies and reactions, no streaming |
| DingTalk | [DingTalk Configuration](/integrations/channels/dingtalk) | Enterprise private/group chat |
| WeCom (WeWork) | [WeCom Configuration](/integrations/channels/wecom) | Enterprise workspace integration |
| WeChat | [WeChat Configuration](/integrations/channels/weixin) | Personal QR login flow |
| WeChat Official Account | [WeChat Official Account Configuration](/integrations/channels/wechatoa) | Official account webhook flow |
| Email | [Email](/guides/email) | SMTP, Mailgun, Gmail OAuth, and related email provider flows |
| Web | Built-in | Available from the Memoh web interface |

## WeChat Options

Memoh supports two different WeChat-related adapters:

- **WeChat (`weixin`)** is the personal-account style integration that relies on QR login.
- **WeChat Official Account (`wechatoa`)** is the official-account webhook integration that uses `App ID`, `App Secret`, `Token`, and optional AES settings.

Choose the one that matches your actual WeChat deployment model.

## General Setup Flow

1. Register an app or bot on the target platform.
2. Obtain credentials such as API tokens, app IDs, app secrets, or access tokens.
3. Add the channel from the bot **Platforms** tab in Memoh.
4. Save and enable the channel.

Depending on the platform, the final step may involve copying a webhook callback URL into the platform console, approving a QR login on mobile, or keeping a stream/WebSocket connection running through Memoh.
