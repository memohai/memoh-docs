# LINE

接上 LINE 后，用户加机器人绑定的 LINE 官方账号为好友，即可 1 对 1 聊天。

## 先决条件：公网 HTTPS

LINE 用 **webhook** 推消息进来，出站图片也是 LINE 服务器来你这边抓，所以部署必须有公网 HTTPS 入口，二选一：

- 设 `MEMOH_WEBHOOK_PUBLIC_BASE_URL` 为公网 HTTPS origin（不能带路径、端口、内网地址）；
- 或在 server deploy 里启用 Cloudflare Quick Tunnel profile，Memoh 会自动拿到公网地址。

## 1. 建 Messaging API channel

1. 打开 [LINE Developers Console](https://developers.line.biz/console/)。
2. 建（或选）一个 provider，在下面创建 **Messaging API** channel，它会关联一个 LINE 官方账号。
3. **Basic settings** 里复制 **Channel secret**。
4. **Messaging API** tab 里签发并复制 **Channel access token**（长效）。

> 官方文档：[Messaging API - Getting Started](https://developers.line.biz/en/docs/messaging-api/getting-started/)

## 2. 在 Memoh 里填

1. 机器人 **Platforms** → **Add Channel** → **LINE**。
2. 贴 **Channel Secret** 和 **Channel Access Token**。
3. **Save**（或 **Save and Enable**）。回调 URL 要保存之后才会生成。

## 3. 注册 webhook

保存后面板会显示只读的 **WebHook Callback URL**，格式：

```text
https://<公网 base>/channels/line/webhook/<config_id>
```

两种注册方式：

- 点 **Set in LINE**——Memoh 直接通过 Messaging API 把地址写进你的 LINE channel。有未保存的改动会先报错，保存了再点。
- 或点 **Copy**，去 LINE Developers Console 的 **Messaging API → Webhook URL** 手动粘贴。

最后确认 LINE 控制台里 **Use webhook** 是打开的。面板若提示拿不到公网 base URL，先回去解决第一步的公网 HTTPS。

## 支持的能力

- **1 对 1 私聊**：用户加官方账号好友即可开聊。
- **入站**：文本、图片、文件（图片需是 LINE 自己托管的，App 里直接发照片就是这种）。
- **出站**：文本 + PNG/JPEG 图片。
- webhook 带签名校验（用 Channel Secret 验），事件 24 小时内去重。

## 限制

- **只支持私聊**。群和多人聊天室的消息会被忽略，把机器人拉进 LINE 群没有用。
- 入站的**语音、视频、贴图、位置**不处理。
- 出站图片必须公网 HTTPS 可访问，且符合 LINE 体积限制（原图 10 MB、预览图 1 MB）；图片之外的附件发不出去。
- 回复走 LINE **Push API**，计入你 LINE 套餐的推送条数配额。
- 不支持流式输出，回复整条整条到。
- 超长回复按 LINE 的 5000 字符上限拆成多条。
