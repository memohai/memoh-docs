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
  <a href="https://github.com/memohai/Memoh">Memoh</a>
  ·
  <a href="./README_CN.md">简体中文</a>
</p>

This repository contains the public documentation site for [Memoh](https://github.com/memohai/Memoh), a multi-member, long-memory AI agent platform with isolated workspaces, channel integrations, and desktop/server deployment modes.

The product source code lives in [`memohai/Memoh`](https://github.com/memohai/Memoh). This repository only owns the docs site: VitePress config, Markdown pages, and screenshots.

## What Is Here

- **Guides** for installation, providers, bots, workspaces, sessions, memory, MCP, channels, email, TTS, scheduled tasks, and slash commands.
- **English and Chinese docs** under `docs/` and `docs/zh/`.
- **Static assets** under `docs/public/`, including screenshots and logos.
- **VitePress config** under `docs/.vitepress/`.

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
│   ├── public/            # Static images and logo
│   ├── zh/                # Simplified Chinese documentation
│   └── *.md               # English documentation pages
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

## License

The documentation follows the license of the Memoh project unless a file says otherwise.
