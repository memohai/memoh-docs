# Discord

接上 Discord 后，机器人可进服务器、在频道和私聊里说话。

## 1. 建 Discord 应用

1. 打开 [Discord Developer Portal](https://discord.com/developers/applications)。
2. **New Application**，起名。
3. 左侧 **Bot** → **Reset Token** 得到 **Bot Token**，保管好。

## 2. 开特权意图

在 **Privileged Gateway Intents** 里打开：

- `Message Content Intent`
- `Server Members Intent`
- `Presence Intent`

保存。

## 3. 把机器人拉进服务器

1. **OAuth2** → **URL Generator**。
2. 勾选 scope：`bot`、`applications.commands`。
3. 权限里至少：发消息、读历史、嵌链接、发附件等按需要勾。
4. 用生成 URL 在浏览器里打开，选服务器并授权。

> 文档入口：[Discord Developer Portal - Bots](https://discord.com/developers/docs/intro)

## 4. 在 Memoh 里填

1. 机器人 **Platforms** → **Add Channel** → **Discord**。
2. 贴 **Bot Token**。
3. **Save and Enable**。

## 支持的能力

- 读**完整消息正文**。
- **附件**图片、文件。
- 若用 MCP 等可扩展 slash；具体以你 Memoh 版本与配置为准。
