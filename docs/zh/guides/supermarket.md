# Supermarket

Supermarket 是 Memoh 内置的 **插件** 和 **Skills** 目录。在 v0.13 中，插件是把 MCP 资源、Skills、Hooks、认证要求和安装脚本一起打包安装的推荐方式。

Web UI 会在 Settings 下显示 Supermarket，并提供两个 tab：

- **Plugins**
- **Skills**

---

## 安装插件

1. 在 Web UI 中打开 **Supermarket**。
2. 切到 **Plugins** tab。
3. 选择一个插件并点击 **Install**，或进入插件详情页点击 **Install to Bot**。
4. 选择目标 Bot。
5. 填写插件 manifest 要求的变量。
6. 确认安装。
7. 如果插件返回 `needs_auth`，完成 OAuth 弹窗授权。
8. Memoh 会打开目标 Bot 的 **Plugins** tab。

安装过程中，Memoh 会获取插件 manifest，在存在可信 Supermarket bundle 时下载并解压插件资产，执行 manifest 的 `install` 命令，并创建 Bot 级插件安装记录。

插件详情页会展示插件的 MCP 资源、打包 Skills、认证类型、作者、版本、Schema 版本和链接。

---

## 安装 Skill

1. 在 Web UI 中打开 **Supermarket**。
2. 切到 **Skills** tab。
3. 选择一个 Skill 并点击 **Install**，或进入 Skill 详情页点击 **Install to Bot**。
4. 选择目标 Bot。
5. 确认安装。
6. Skill 会出现在该 Bot 的 **Skills** tab 中。

独立 Skill 会安装到 Bot 的 managed skills 目录。插件提供的 Skills 则通过插件 bundle 安装。

---

## 配置 Supermarket

默认情况下，Memoh 会从这里读取 Supermarket 内容：

```toml
[supermarket]
base_url = "https://supermarket.memoh.ai"
```

运维方可以把 `supermarket.base_url` 指向其它可信目录。该 endpoint 会用于插件 manifest、插件 bundle 下载、Skill 列表、Skill 详情和 Skill 下载。

---

## 插件 Bundle 内容

可信插件 bundle 可以提供：

- `skills/`：作为插件提供的 Skills 被发现。
- `hooks.json`：只会从已启用且状态为 `ready` 的插件安装中加载。
- `scripts/`：供 manifest 的 `install` 命令使用的辅助脚本。

Bundle 文件会解压到目标 Bot 工作区内的 `/data/.memoh/plugins/<plugin_id>`。归档路径检查会忽略不支持的条目，并拒绝不安全路径。

---

## 贡献

新插件或 Skills 可提交到：

- [memohai/supermarket](https://github.com/memohai/supermarket)
