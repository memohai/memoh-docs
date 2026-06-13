# Self-hosted Overview

Memoh is distributed in two forms: a native desktop client for personal/local use, and a server deploy stack for always-on shared usage. Choose the one that matches how you want bots to run.

| Use case | Choose | Why |
|----------|--------|-----|
| Personal desktop workflow, local memory, quick trial, single-user usage | [Desktop](/self-hosted/desktop) | The app starts and stops its own local server, embedded Qdrant, local storage, and bundled CLI. |
| Shared server, remote access, public/private channels, production uptime, multi-user or multi-tenant usage | [Server Deploy](/self-hosted/docker) | The Docker Compose stack keeps the backend, Web UI, database, memory services, and workspace runtime online. |

## Desktop

Use Desktop when you want Memoh to behave like a local app. It manages a local `memoh-server` on `127.0.0.1:18731`, prepares local storage, starts embedded Qdrant for memory search, and connects the UI automatically.

Desktop is the easiest path for trying Memoh on your own computer. It is not the right choice for bots that must keep serving external channels while your computer is offline.

## Server Deploy

Use Server Deploy when Memoh should be reachable by multiple users, run continuously, or connect to external channels such as Telegram, Discord, Lark, WeChat, WeChat Official Account, Email, and more.

Start with [Server Deploy](/self-hosted/docker) for a Docker Compose deployment.

## Related

- [Workspace Backends](/self-hosted/workspace-backends) explains Docker, containerd, Apple, and local workspace runtime choices.
- [SQLite deployment](/self-hosted/sqlite) covers lighter single-node server deployments.
