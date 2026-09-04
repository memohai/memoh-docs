# About Memoh

Memoh v0.13 is the open-source multi-agent platform. It lets you run multiple AI agents on one machine, with each agent getting its own workspace, browser, network, tools, and long-term memory.

Agents can talk through Telegram, Discord, Lark, WeChat, Web UI, Email, and other channels. They can remember context, operate a browser or desktop, call MCP tools, install plugins and skills, run scheduled tasks, and enforce per-bot access rules.

The hosted Memoh SaaS service is coming soon. Join the [SaaS waitlist](https://memoh.ai/waitlist) if you want a managed option instead of operating your own deployment.

## Distribution Modes

### Desktop

Desktop is the quickest way to try Memoh locally. It starts a local `memoh-server`, manages local SQLite storage, starts embedded Qdrant for memory search, bundles the `memoh` CLI, and owns the system tray lifecycle.

### Server Deploy

Server Deploy is for always-on shared usage. Use it when Memoh should serve multiple users, keep channels online while your computer is offline, or run as a self-hosted service. The Docker Compose stack includes the backend, Web UI, database, memory services, and workspace runtime.

## What v0.13 Emphasizes

### Agent Workspaces

Each bot can use an isolated container workspace with files, commands, MCP hosting, network access, a headed browser, and a graphical desktop. Local and desktop setups can also use trusted local workspaces when host-level access is intentional.

### Web Product

The Web UI now covers more of the daily product surface: bot setup, sessions, providers, channels, workspace files, terminal and display panes, Supermarket, plugins, hooks, schedules, access control, and user preferences. v0.13 also includes English, Simplified Chinese, and Japanese UI language support.

### Plugins, Hooks, And Automation

Plugins package managed MCP resources, skills, hooks, configuration, authentication, and install steps behind one bot-scoped capability. Hooks let bots run small automation rules around supported events, while Schedule and Heartbeat keep recurring work moving without an active chat.

### Access Control

Access control is split between channel-side chat permissions and workspace-side user permissions. Bot owners can allow or block channel members, grant registered users workspace roles, and keep advanced ACL rules for cases that need more precise matching.

## Where To Start

- **[Bot Setup](/guides/bot)** - create and configure a bot.
- **[Providers And Models](/integrations/providers/llm)** - configure model access.
- **[Channels](/integrations/channels)** - choose where bots are reachable.
- **[Plugins](/guides/plugins)** and **[Supermarket](/guides/supermarket)** - install packaged capabilities.
- **[Scheduled Tasks](/guides/schedule)** and **[Access Control](/guides/access)** - operate recurring work and permissions.
- **[Self-hosted](/self-hosted)** - deploy and maintain your own Memoh instance.
