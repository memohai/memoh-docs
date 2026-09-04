# 插件

插件是从 Supermarket 安装到某个 Bot 的能力包。在 v0.13 中，插件 manifest 可以描述受管理的 MCP 资源、打包的 Skills、插件 Hooks、配置变量、认证要求，以及可选的安装命令。

Memoh 会把当前配置的 Supermarket endpoint 视为可信插件来源。默认 endpoint 是 `https://supermarket.memoh.ai`，部署方也可以通过服务端 `supermarket.base_url` 配置覆盖。

---

## 插件能提供什么

插件 manifest 可以包含：

- **MCP 资源**：Memoh 会创建为插件托管的 MCP 连接，用来接入外部工具或服务。
- **Skills**：可复用的 Markdown 行为模块，可以在 manifest 中引用，也可以随插件 bundle 一起打包。
- **Hooks**：插件 bundle 可提供 `hooks.json`，用于在支持的 Hook 事件中执行插件动作。
- **配置变量**：安装时收集必填或可选值，也支持 secret 值。
- **认证要求**：支持 `managed_oauth`、`user_secret`，或不需要认证的 MCP 设置。
- **安装命令**：`install` 字段可以是一个字符串，也可以是字符串数组。

插件托管的 MCP 资源通常是插件的实现细节。用户管理的是插件这个产品边界，而不是手动管理每一个由插件生成的 MCP 连接。

---

## 可信插件 Bundle

从 Supermarket 安装插件时，Memoh 会：

1. 从 Supermarket 获取插件 manifest。
2. 在存在插件 bundle 时从 Supermarket 下载 bundle。
3. 只把可信 bundle 中的下列路径解压到 Bot 工作区的插件区域：
   - `skills/`
   - `hooks.json`
   - `scripts/`
4. 在插件目录中执行 manifest 的 `install` 命令。
5. 创建插件安装记录和插件托管的 MCP 资源。

解压后的插件根目录位于 Bot 工作区内的 `/data/.memoh/plugins/<plugin_id>`。同一个插件 id 重新安装时，Memoh 会先清空该插件根目录，再解压新的 bundle。

安装命令会在插件根目录中运行，并带上这些环境变量：

- `MEMOH_PLUGIN_ID`
- `MEMOH_PLUGIN_DIR`
- `MEMOH_BOT_ID`

只安装可信 Supermarket 插件，因为 bundle 文件和安装命令会在目标 Bot 工作区中执行。

---

## Bot 插件管理

打开 Bot 的 **详情页**，进入 **Plugins** tab，可以查看该 Bot 已安装的插件。

在 v0.13 中，Plugins tab 会显示：

- 已安装插件的名称、描述、图标和主页链接
- 插件状态
- 当前安装是否启用
- 需要 managed OAuth 时显示 **Authorize** 操作
- 对 `ready` 或 `disabled` 插件显示启停开关
- 返回 Supermarket 安装更多插件的入口

插件 API 也支持 Bot 级别的列表、详情、启用、禁用、卸载、清理、managed OAuth 授权，以及 OAuth 状态刷新操作。

---

## 状态

插件安装记录使用这些状态值：

- `ready`：插件已有所需配置和认证；Memoh 可以启用它托管的资源。
- `needs_config`：缺少必填的 manifest 变量、环境变量、header，或 user-secret 值。
- `needs_auth`：插件需要 managed OAuth，但该 Bot 还没有完成授权。
- `admin_required`：插件声明了 managed OAuth `client_ref`，但 Memoh 服务端还没有为该引用配置可用的 OAuth client。
- `disabled`：插件已被关闭；插件托管的 MCP 连接处于 inactive。
- `uninstalled`：插件已从 Bot 卸载；托管 MCP 连接和插件资源记录已移除。

清理安装记录会删除安装记录和已保存配置。安装未启用时，已解压的 bundle 文件不会被发现；之后重新安装会重写插件根目录。

---

## 认证

插件主要有两种认证模型：

- **Managed OAuth**：manifest 声明 `auth_requirements[].type = "managed_oauth"`。如果它使用 `client_ref`，运维方需要在 Memoh 服务端配置对应 OAuth client。用户随后可以在 Supermarket 安装流程或 Bot 的 Plugins tab 中为插件授权。
- **User secret**：manifest 声明必填变量、环境变量或 headers。用户安装时填写这些值。缺少必填值时，插件会进入 `needs_config`。

Managed OAuth 成功后，Memoh 会刷新插件状态，并在插件进入 `ready` 后启用托管 MCP 资源。

---

## 插件和其它功能的关系

- **Supermarket** 用来发现和安装插件以及独立 Skills。
- **Skills** 可以来自独立的 Supermarket Skill，也可以来自已启用的插件 bundle。
- **MCP** 资源可以由插件创建和管理；插件托管的 MCP 资源可能不会出现在普通 MCP 管理入口中。
- **Hooks** 可以由已启用且状态为 `ready` 的插件 bundle 通过 `hooks.json` 提供。

---

## 相关页面

- [Supermarket](/zh/guides/supermarket)
- [技能](/zh/guides/skills)
- [MCP](/zh/guides/mcp)
- [机器人](/zh/guides/bot)
