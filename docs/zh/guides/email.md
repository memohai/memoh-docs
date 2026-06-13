# 邮件

让机器人**收/发**邮件，分两步：**邮服提供方** + 机器人上的 **Email 绑定**。

## 在做什么

1. 先配能连上的 **Email Provider**（如 Mailgun、泛用 SMTP 等）。
2. 再在某个机器人上，把某邮箱**绑定**过去，并设读/写/删权限。

---

## 邮服

侧栏 **Email Provider**。

### 新建

1. **Add Email Provider**
2. 类型如 **Mailgun**（量大）、**泛用 SMTP**（传统邮局）
3. 按表单填 `domain`/`api_key` 或 `host`/`port` 等
4. 创建

---

## 机器人上的绑定

机器人 **Email** tab。

### 添加

1. **Add Binding**
2. 选已建的 **Email Provider**
3. 填要绑的 **Email Address**
4. 勾权限：
   - **Can Read** 收信、处理入站
   - **Can Write** 发信
   - **Can Delete** 管邮箱里删除等（视实现）
5. 创建

### 发件箱

**Outbox** 会记发出的邮件：收信人、主题、状态、时间，便于对账、排错。

---

## 和机器人

- 有权限时可用邮件发报告、回邮、或按新邮件做事。
- 和聊天一样，是另一条通道，但仍是结构化、可审的。
