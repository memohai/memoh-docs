# 企业微信（WeCom / WeWork）

在企微工作区内收发消息，常走管理后台里自建/机器人应用。

## 1. 建企微侧凭据

1. 登录 [企微管理后台](https://work.weixin.qq.com/) 或开发文档里指引的入口。
2. 在 **应用管理** 等位置创建 **自建应用** 或 **机器人**（以你组织实际菜单为准）。
3. 记下 **AgentId / Bot ID** 与 **Secret** 等（字段名以 Memoh 表单与企微当前文档为准）。

## 2. 在 Memoh 里填

1. 机器人 **Platforms** → **Add Channel** → **WeCom**。
2. 按表单填，常见包括：

| 字段 | 必填 | 说明 |
|------|------|------|
| **Bot ID** | 是 | 企微里该机器人的标识 |
| **Secret** | 是 | 鉴权用 |
| **WebSocket URL** | 否 | 不填多用默认端点 |

3. **Save and Enable**。

## 3. 使用

连上后，工作区内用户可私聊或拉群与机器人说话，行为以你企微与 Memoh 当前版本为准。

## 支持的能力

- 文本
- 私聊、群聊
- **流式**回复（在 Memoh 里多为实时出字，以实际为准）

## 参考

- [企微开放能力](https://developer.work.weixin.qq.com/)
- [企微「智能机器人」等文档以官网为准](https://developer.work.weixin.qq.com/document/path/91770)
