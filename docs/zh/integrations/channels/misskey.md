# Misskey

把 Memoh 接到某台 Misskey 实例，以 Misskey 账号收 mention、发回复。适合偏文字、社交向的玩法。

## 1. 账号和 Token

1. 登录目标 Misskey 实例。
2. 用（或专门建）一个代表机器人的账号。
3. 给该账号生成 **Access Token**（各实例「设置 → API」等位置名称可能略有不同）。

需要交给 Memoh 的主要是：

- **Instance URL**，如 `https://misskey.io`
- **Access Token**

Token 要允许：读入站、发回复等（以你实例上的权限勾选项为准）。

## 2. 在 Memoh 里填

1. 机器人 **Platforms** → **Add Channel** → **Misskey**。
2. 填 **Instance URL**、**Access Token**。
3. **Save and Enable**。

## 3. 用起来

启用后，用户可在该实例上 at/互动。Misskey 在 Memoh 里更偏：回复、文字与类 Markdown、带反应的会话。

## 支持的能力

- 文本、**Markdown**、**回复**、**反应**。

**当前限制**（以版本为准）：

- 无附件/媒体上传类能力
- 无流式逐字输出
