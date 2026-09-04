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

The product source code lives in [`felinics/Memoh`](https://github.com/felinics/Memoh). This repository only owns the docs site: the Scalar Docs config, Markdown/MDX pages, and screenshots.

## What Is Here

- **Guides** for SaaS/product usage: bots, workspaces, sessions, memory, MCP, email, scheduled tasks, and slash commands.
- **Integrations** for channels and providers, including messaging platforms, LLMs, memory providers, TTS, and web search.
- **Self-hosted** docs for Desktop, Server Deploy, workspace backends, Kata, and SQLite.
- **English and Chinese docs** under `docs/` and `docs/zh/`.
- **Static assets** under `docs/public/`, including screenshots and logos.
- **Scalar Docs config** in `scalar.config.json` at the repository root.

## Documentation Structure

The site is organized around three primary navigation roots:

- `docs/guides/` for product usage guides.
- `docs/integrations/` for channels, providers, memory providers, TTS, and web search.
- `docs/self-hosted/` for Desktop, Server Deploy, workspace backends, Kata, and SQLite.

The Simplified Chinese mirror uses the same structure under `docs/zh/`:

- `docs/zh/guides/`
- `docs/zh/integrations/`
- `docs/zh/self-hosted/`

Both languages are wired up as Scalar **versions** in `scalar.config.json`. The `default` version serves English at `/*`, the `zh` version serves Simplified Chinese at `/zh/*`, and Scalar renders the language switcher in the header. Inside the `zh` version, route keys are written *without* the `/zh` prefix — Scalar adds it.

Legacy paths from the previous information architecture (`/getting-started/*`, `/installation/*`, `/channels/*`, `/tts-providers/*`, `/memory-providers/*`, and their `/zh/` counterparts) are kept alive as `siteConfig.routing.redirects` entries in `scalar.config.json`. There are no redirect pages in `docs/` anymore — when a redirect target moves, edit the config.

Keep the English and Simplified Chinese docs mirrored. If you add, rename, remove, or move a page in one language, make the matching change in the other language and update both versions in `scalar.config.json`.

## Local Development

The Scalar CLI needs no install step:

```bash
npx @scalar/cli project preview
```

The dev server runs at:

```text
http://localhost:7970
```

## Validate

`scalar.config.json` is the single source of truth for the sitemap and sidebar, and CI validates it on every push and pull request that touches `scalar.config.json` or `docs/**`:

```bash
npx @scalar/cli project check-config
```

## Project Layout

```text
.
├── docs/
│   ├── guides/            # Product usage guides
│   ├── integrations/      # Channels and providers
│   ├── self-hosted/       # Open-source deployment docs
│   ├── public/            # Static images and logo (served from the site root)
│   ├── zh/                # Simplified Chinese documentation
│   ├── footer.html        # Site footer
│   └── index.mdx          # Landing page
├── scalar.config.json     # Navigation, routing, theme, redirects
└── package.json
```

Pages are plain Markdown by default. Use the `.mdx` extension when a page needs [Scalar components](https://scalar.com/products/docs) such as `Callout` or `PageLink`, and import them at the top of the file:

```mdx
import { Callout } from 'scalar-mdx-components'

<Callout type="warning">
  Something to be careful about.
</Callout>
```

## Contributing

Small fixes are best made directly in the relevant Markdown page. For larger changes:

1. Run `npx @scalar/cli project preview`.
2. Edit the docs under `docs/`.
3. Run `npx @scalar/cli project check-config`.
4. Open a pull request with screenshots when the change affects layout or images.

When adding a new page, add a matching route entry under both versions in `scalar.config.json` — a file with no route entry is not published. New source pages should live under `guides`, `integrations`, or `self-hosted`, with the matching `docs/zh/` page kept in sync.

## License

The documentation follows the license of the Memoh project unless a file says otherwise.
