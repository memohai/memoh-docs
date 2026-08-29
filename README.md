# Memoh Docs

<p align="center">
  <img src="./docs/public/logo.svg" alt="Memoh" width="96" height="96">
</p>

<p align="center">
  <strong>Documentation source for Memoh.</strong>
</p>

<p align="center">
  <a href="https://docs.memoh.ai">docs.memoh.ai</a>
  ·
  <a href="https://github.com/felinics/Memoh">Memoh</a>
  ·
  <a href="./README_CN.md">简体中文</a>
</p>

This repository contains the public documentation site for [Memoh](https://github.com/felinics/Memoh), a multi-member, long-memory AI agent platform with isolated workspaces, channel integrations, and desktop/server deployment modes.

The product source code lives in [`felinics/Memoh`](https://github.com/felinics/Memoh). This repository only owns the docs site: VitePress config, Markdown pages, and screenshots.

## What Is Here

- **Guides** for SaaS/product usage: bots, workspaces, sessions, memory, MCP, email, scheduled tasks, and slash commands.
- **Integrations** for channels and providers, including messaging platforms, LLMs, memory providers, TTS, and web search.
- **Self-hosted** docs for Desktop, Server Deploy, workspace backends, Kata, and SQLite.
- **English and Chinese docs** under `docs/` and `docs/zh/`.
- **Static assets** under `docs/public/`, including screenshots and logos.
- **VitePress config** under `docs/.vitepress/`.

## Documentation Structure

The current VitePress site is organized around three primary navigation roots:

- `docs/guides/` for product usage guides.
- `docs/integrations/` for channels, providers, memory providers, TTS, and web search.
- `docs/self-hosted/` for Desktop, Server Deploy, workspace backends, Kata, and SQLite.

The Simplified Chinese mirror uses the same structure under `docs/zh/`:

- `docs/zh/guides/`
- `docs/zh/integrations/`
- `docs/zh/self-hosted/`

Legacy paths still exist for old external links, but they are redirect pages instead of the main content source:

- `docs/getting-started/`
- `docs/installation/`
- `docs/channels/`
- `docs/tts-providers/`
- `docs/memory-providers/`
- Matching Chinese redirects under `docs/zh/`

When updating content, edit the primary paths above first. Only touch a legacy redirect page when the redirect target itself changes.

Keep the English and Simplified Chinese docs mirrored. If you add, rename, remove, or move a page in one language, make the matching change in the other language and update both VitePress sidebar files.

Do not edit `docs/.vitepress/dist/` by hand. It is generated build output and should not be treated as source documentation.

## Local Development

Use Node.js and pnpm. The repository is a standalone VitePress project.

```bash
pnpm install
pnpm dev
```

The dev server runs at:

```text
http://localhost:5173
```

## Build

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Project Layout

```text
.
├── docs/
│   ├── .vitepress/        # VitePress config, nav, sidebars
│   ├── guides/            # Product usage guides
│   ├── integrations/      # Channels and providers
│   ├── self-hosted/       # Open-source deployment docs
│   ├── getting-started/   # Legacy redirects to guides
│   ├── installation/      # Legacy redirects to self-hosted
│   ├── channels/          # Legacy redirects to integrations/channels
│   ├── tts-providers/     # Legacy redirects to integrations/providers/tts
│   ├── memory-providers/  # Legacy redirects to integrations/providers/memory
│   ├── public/            # Static images and logo
│   ├── zh/                # Simplified Chinese documentation and redirects
│   └── *.md               # Landing and compatibility pages
├── package.json
└── pnpm-lock.yaml
```

## Contributing

Small fixes are best made directly in the relevant Markdown page. For larger changes:

1. Run `pnpm dev`.
2. Edit the docs under `docs/`.
3. Run `pnpm build`.
4. Open a pull request with screenshots when the change affects layout or images.

When adding a new page, update the matching sidebar file in `docs/.vitepress/`:

- `en.ts` for English pages
- `zh.ts` for Chinese pages

Do not use the legacy redirect folders as the canonical location for new content. New source pages should live under `guides`, `integrations`, or `self-hosted`, with the matching `docs/zh/` page kept in sync.

## License

The documentation follows the license of the Memoh project unless a file says otherwise.
