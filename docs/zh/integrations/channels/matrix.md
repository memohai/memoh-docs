# Matrix

接到任意 Matrix homeserver，机器人在房间、私聊里收发消息。

## 1. 建机器人 Matrix 账号

1. 在目标 homeserver 上注册账号（Element 等客户端即可）。
2. 记下 **User ID**，如 `@mybot:matrix.org`。
3. 准备该账号的 **Access Token**：

- 一种做法：用登录 API，例如：

```bash
curl -X POST "https://<homeserver>/_matrix/client/v3/login" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "m.login.password",
    "identifier": {
      "type": "m.id.user",
      "user": "<username>"
    },
    "password": "<password>"
  }'
```

- 或从客户端里导出/查看 token（以客户端安全提示为准）。

> **注意**：谁拿到 token 谁就能以该账号操作，当密码保管。

## 2. 在 Memoh 里填

1. **Platforms** → **Add Channel** → **Matrix**。
2. 填表：

| 字段 | 必填 | 说明 |
|------|------|------|
| **Homeserver URL** | 是 | 如 `https://matrix.org` |
| **Access Token** | 是 | 机器人账号 token |
| **User ID** | 是 | 如 `@mybot:matrix.org` |
| **Sync Timeout** | 否 | 长轮询秒数，默认如 30 |
| **Auto Join Invites** | 否 | 被邀请是否自动进房，默认多开 |

3. **Save and Enable**。

## 3. 拉机器人进房

在 Element 等里邀请该 User ID，或私聊。若开了 **Auto Join Invites**，邀请会自动接受。

## 支持的能力

- 房间、私聊、流式、Markdown、媒体/附件等（以当前 Memoh 版本为准）。
- 更多路线可见 [相关 issue/路线图](https://github.com/memohai/Memoh/issues/249)。

## 参考

- [Matrix 规范](https://spec.matrix.org/)
- [Element Web](https://app.element.io/)
