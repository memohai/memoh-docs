# Memoh 文档

<p align="center">
  <img src="./docs/public/logo.svg" alt="Memoh" width="96" height="96">
</p>

<p align="center">
  <strong>Memoh 官方文档站源码。</strong>
</p>

<p align="center">
  <a href="https://docs.memoh.ai">docs.memoh.ai</a>
  ·
  <a href="https://github.com/memohai/Memoh">Memoh 主仓库</a>
  ·
  <a href="./README.md">English</a>
</p>

这个仓库保存 [Memoh](https://github.com/memohai/Memoh) 的公开文档。Memoh 是一个多成员、长期记忆的 AI 智能体平台，支持独立 workspace、跨渠道接入，以及桌面版和服务器部署。

产品代码在 [`memohai/Memoh`](https://github.com/memohai/Memoh)。这个仓库只负责文档站：VitePress 配置、Markdown 页面和截图。

## 这里有什么

- 安装、供应商、机器人、workspace、会话、记忆、MCP、渠道、邮件、TTS、计划任务和斜杠命令等指南。
- 英文和中文文档，分别位于 `docs/` 和 `docs/zh/`。
- 截图、logo 等静态资源，位于 `docs/public/`。
- VitePress 配置，位于 `docs/.vitepress/`。

## 本地开发

需要 Node.js 和 pnpm。这个仓库是独立的 VitePress 项目。

```bash
pnpm install
pnpm dev
```

开发服务器默认运行在：

```text
http://localhost:5173
```

## 构建

```bash
pnpm build
```

预览生产构建：

```bash
pnpm preview
```

## 目录结构

```text
.
├── docs/
│   ├── .vitepress/        # VitePress 配置、导航、侧边栏
│   ├── public/            # 静态图片和 logo
│   ├── zh/                # 中文文档
│   └── *.md               # 英文文档页面
├── package.json
└── pnpm-lock.yaml
```

## 贡献文档

小的错别字、链接和措辞修正可以直接改对应 Markdown 页面。较大的结构调整建议这样做：

1. 运行 `pnpm dev`。
2. 修改 `docs/` 下的文档。
3. 运行 `pnpm build`。
4. 如果改动影响布局或图片，在 PR 里附上截图。

新增页面时，记得更新对应的侧边栏配置：

- 英文页面：`docs/.vitepress/en.ts`
- 中文页面：`docs/.vitepress/zh.ts`

## 许可证

除非单独文件另有说明，文档沿用 Memoh 项目的许可证。
