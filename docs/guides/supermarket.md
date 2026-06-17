# Supermarket

Supermarket is Memoh's built-in catalog for **plugins** and **skills**. In v0.13, plugins are the recommended way to install bundled MCP resources, skills, hooks, auth requirements, and setup scripts together.

The Web UI shows Supermarket under Settings with two tabs:

- **Plugins**
- **Skills**

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
