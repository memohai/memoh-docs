# Supermarket

Supermarket is Memoh's built-in catalog for **connectors**, **plugins**, and **skills**. Plugins are the recommended way to install bundled MCP resources, skills, hooks, auth requirements, and setup scripts together; connectors bind third-party services such as GitHub or Notion to a bot.

The Web UI shows Supermarket under Settings with three tabs:

- **Connectors**
- **Plugins**
- **Skills**

**Connectors** comes first and is the default landing tab when the server has [Connect-It configured](/guides/connectors.md#requirements). Without Connect-It, the tab is hidden and **Plugins** is the default instead.

---

## Connect A Service

The **Connectors** tab lists services a bot can connect through OAuth or an API key. Pick one, click **Connect**, select the target bot, and complete the authorization. The full flow — authentication methods, connection statuses, and how connector tools reach the bot — is documented in [Connectors](/guides/connectors.md).

---

## Install A Plugin

1. Open **Supermarket** in the Web UI.
2. Switch to the **Plugins** tab.
3. Choose a plugin and click **Install**, or open the plugin detail page and click **Install to Bot**.
4. Select the target bot.
5. Fill in any required variables shown by the plugin manifest.
6. Confirm the install.
7. If the plugin returns `needs_auth`, complete the OAuth popup.
8. Memoh opens the target bot's **Plugins** tab.

During installation, Memoh fetches the plugin manifest, downloads the trusted Supermarket bundle when available, extracts plugin assets, runs manifest `install` commands, and creates the bot-scoped plugin installation.

Plugin detail pages show the plugin's MCP resources, bundled skills, auth type, author, version, schema version, and links.

---

## Install A Skill

1. Open **Supermarket** in the Web UI.
2. Switch to the **Skills** tab.
3. Choose a skill and click **Install**, or open the skill detail page and click **Install to Bot**.
4. Select the target bot.
5. Confirm the install.
6. The skill appears in that bot's **Skills** tab.

Standalone skills install into the bot's managed skills directory. Plugin-provided skills are installed through plugin bundles instead.

---

## Configure Supermarket

By default, Memoh reads Supermarket content from:

```toml
[supermarket]
base_url = "https://supermarket.memoh.ai"
```

Operators can point `supermarket.base_url` at another trusted catalog. The configured endpoint is used for plugin manifests, plugin bundle downloads, skill lists, skill details, and skill downloads.

---

## Plugin Bundle Contents

A trusted plugin bundle may provide:

- `skills/`: skill files discovered as plugin-provided skills.
- `hooks.json`: plugin hooks loaded only from enabled, ready plugin installations.
- `scripts/`: helper scripts used by manifest `install` commands.

Bundle files are extracted under `/data/.memoh/plugins/<plugin_id>` inside the target bot workspace. The archive path checker ignores unsupported entries and rejects unsafe paths.

---

## Contribute

Contribute new plugins or skills here:

- [memohai/supermarket](https://github.com/memohai/supermarket)
