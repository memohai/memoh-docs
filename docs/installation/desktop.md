# Desktop Installation

Memoh Desktop is the native client for personal and local use. It is separate from the server deploy stack: the desktop app manages its own local backend instead of connecting to a hosted Web/server deployment by default.

## When to use Desktop

Choose Desktop when you want:

- a local app that starts Memoh for you
- single-user or personal workflows
- local memory and local storage
- a bundled `memoh` CLI connected to the same local server
- local or Docker-backed workspaces from your own machine

Choose [Server Deploy](/installation/docker) instead when you need shared access, production uptime, remote users, or messaging channels that should keep running while your desktop is offline.

## Install

1. Download the installer for your platform from the [Memoh Desktop download page](https://memoh.ai/desktop).
2. Open Memoh.
3. Let the app start its local server and initialize storage.
4. Optional: use the app menu to install the bundled `memoh` CLI.

## What Desktop manages

Desktop owns the local runtime lifecycle:

- local `memoh-server` on `127.0.0.1:18731`
- SQLite-backed local data under the OS application data directory
- embedded Qdrant for memory vector search
- bundled CLI, server binary, provider templates, and workspace bridge runtime
- system tray reopen and quit behavior

Quitting from the tray follows the desktop shutdown path and stops the managed local server and embedded Qdrant.

## Workspace behavior

Desktop can use trusted local workspaces and container-backed workspaces depending on configuration and runtime availability. Trusted local workspaces run with local user permissions and are not container-isolated. Container-backed workspaces keep the normal bot workspace model for file editing, command execution, MCP hosting, and optional display/browser sessions.

For runtime details, see [Workspace Backends](/installation/workspace-backends).
