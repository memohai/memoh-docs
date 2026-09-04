# Plugins

Plugins are bot-scoped capability bundles installed from Supermarket. In v0.13, a plugin manifest can describe managed MCP resources, bundled skills, plugin hooks, configuration variables, authentication requirements, and optional install commands.

Memoh treats the configured Supermarket endpoint as the trusted source for plugin bundles. The default endpoint is `https://supermarket.memoh.ai`, and deployments can override it with the server `supermarket.base_url` config.

---

## What A Plugin Can Provide

A plugin manifest can include:

- **MCP resources**: external tools or services that Memoh creates as plugin-managed MCP connections.
- **Skills**: reusable Markdown behavior modules, either referenced in the manifest or shipped inside the plugin bundle.
- **Hooks**: a `hooks.json` file that can run plugin-provided actions for supported hook events.
- **Config variables**: required or optional values collected during install, including secret values.
- **Auth requirements**: `managed_oauth`, `user_secret`, or no-auth MCP setup.
- **Install commands**: an `install` field that can be a string or a string array.

Plugin-managed MCP resources are usually hidden implementation details of the plugin. Users manage the plugin as the product boundary instead of managing each generated MCP connection by hand.

---

## Trusted Plugin Bundles

When you install a plugin from Supermarket, Memoh:

1. Fetches the plugin manifest from Supermarket.
2. Downloads the plugin bundle from Supermarket when one exists.
3. Extracts only trusted bundle paths into the bot workspace plugin area:
   - `skills/`
   - `hooks.json`
   - `scripts/`
4. Runs manifest `install` commands from the plugin directory.
5. Creates the plugin installation record and plugin-managed MCP resources.

The extracted plugin root is under `/data/.memoh/plugins/<plugin_id>` inside the bot workspace. Memoh clears that plugin root before extracting a newly installed bundle for the same plugin id.

Install commands run in the plugin root with these environment variables:

- `MEMOH_PLUGIN_ID`
- `MEMOH_PLUGIN_DIR`
- `MEMOH_BOT_ID`

Only install trusted Supermarket plugins, because bundle files and install commands execute inside the target bot workspace.

---

## Bot Plugin Management

Open a bot's **Detail Page** and go to the **Plugins** tab to view installed plugins for that bot.

In v0.13, the Plugins tab shows:

- installed plugin name, description, icon, and homepage link
- plugin status
- whether the installation is enabled or disabled
- an **Authorize** action when managed OAuth is required
- an enable/disable switch for plugins that are ready or disabled
- a shortcut back to Supermarket for installing more plugins

The plugin API also supports bot-scoped list, get, enable, disable, uninstall, purge, managed OAuth authorize, and OAuth status refresh operations.

---

## Statuses

Plugin installations use these status values:

- `ready`: the plugin has the required configuration and auth; Memoh can enable its managed resources.
- `needs_config`: required manifest variables, environment variables, headers, or user-secret values are missing.
- `needs_auth`: the plugin requires managed OAuth and the bot has not completed authorization yet.
- `admin_required`: the plugin declares a managed OAuth `client_ref`, but the server does not have a usable OAuth client configured for that reference.
- `disabled`: the plugin was turned off; plugin-managed MCP connections are inactive.
- `uninstalled`: the plugin was uninstalled from the bot; managed MCP connections and plugin resource rows were removed.

Purging an installation deletes the installation record and saved config. Extracted bundle files are no longer discovered when the installation is not enabled, and a later reinstall rewrites the plugin root.

---

## Authentication

Plugins can use two main auth models:

- **Managed OAuth**: the manifest declares `auth_requirements[].type = "managed_oauth"`. If it uses `client_ref`, an operator must configure that OAuth client on the Memoh server. Users then authorize the plugin from Supermarket install or from the bot's Plugins tab.
- **User secret**: the manifest declares required variables, environment entries, or headers. Users provide the values during install. Missing required values put the plugin in `needs_config`.

When managed OAuth succeeds, Memoh refreshes the plugin status and enables the managed MCP resources once the plugin is `ready`.

---

## How Plugins Relate To Other Features

- **Supermarket** is where plugins and standalone skills are discovered and installed.
- **Skills** can come from a standalone Supermarket skill or from an enabled plugin bundle.
- **MCP** resources can be created and managed by plugins; plugin-managed MCP resources may be hidden from normal MCP management.
- **Hooks** can be provided by enabled, ready plugin bundles through `hooks.json`.

---

## Related Pages

- [Supermarket](/guides/supermarket)
- [Skills](/guides/skills)
- [MCP](/guides/mcp)
- [Bot Management](/guides/bot)
