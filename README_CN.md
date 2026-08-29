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
  <a href="https://github.com/felinics/Memoh">Memoh 主仓库</a>
  ·
  <a href="./README.md">English</a>
</p>

这个仓库保存 [Memoh](https://github.com/felinics/Memoh) 的公开文档。Memoh 是一个多成员、长期记忆的 AI 智能体平台，支持独立 workspace、跨渠道接入，以及桌面版和服务器部署。

产品代码在 [`felinics/Memoh`](https://github.com/felinics/Memoh)。这个仓库只负责文档站：VitePress 配置、Markdown 页面和截图。

## 这里有什么

- **教程**：面向 SaaS/产品使用，覆盖机器人、workspace、会话、记忆、MCP、邮件、计划任务和斜杠命令。
- **集成**：渠道和提供方，包括消息平台、LLM、记忆提供方、TTS 和网页搜索。
- **自托管**：Desktop、Server Deploy、workspace backend、Kata 和 SQLite 等开源部署文档。
- 英文和中文文档，分别位于 `docs/` 和 `docs/zh/`。
- 截图、logo 等静态资源，位于 `docs/public/`。
- VitePress 配置，位于 `docs/.vitepress/`。

## 文档站结构

当前 VitePress 文档站围绕三个主导航路径组织：

- `docs/guides/`：产品使用教程。
- `docs/integrations/`：渠道、提供方、记忆提供方、TTS 和网页搜索。
- `docs/self-hosted/`：Desktop、Server Deploy、workspace backend、Kata 和 SQLite。

简体中文文档使用相同结构，位于 `docs/zh/` 下：

- `docs/zh/guides/`
- `docs/zh/integrations/`
- `docs/zh/self-hosted/`

旧路径仍然保留，用于兼容外部旧链接，但它们是重定向页面，不是主要内容源：

- `docs/getting-started/`
- `docs/installation/`
- `docs/channels/`
- `docs/tts-providers/`
- `docs/memory-providers/`
- `docs/zh/` 下对应的中文重定向路径

更新内容时，请优先修改上面的主路径。只有重定向目标本身变化时，才需要修改 legacy redirect 页面。

英文和简体中文文档需要保持镜像一致。如果在一种语言中新增、重命名、删除或移动页面，请在另一种语言中做对应变更，并同时更新两个 VitePress 侧边栏文件。

不要手动编辑 `docs/.vitepress/dist/`。它是构建生成产物，不应当作为文档源码维护。

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
│   ├── guides/            # 产品使用教程
│   ├── integrations/      # 渠道和提供方
│   ├── self-hosted/       # 开源自托管部署文档
│   ├── getting-started/   # 到 guides 的旧路径重定向
│   ├── installation/      # 到 self-hosted 的旧路径重定向
│   ├── channels/          # 到 integrations/channels 的旧路径重定向
│   ├── tts-providers/     # 到 integrations/providers/tts 的旧路径重定向
│   ├── memory-providers/  # 到 integrations/providers/memory 的旧路径重定向
│   ├── public/            # 静态图片和 logo
│   ├── zh/                # 中文文档和重定向页面
│   └── *.md               # 入口和兼容页面
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

不要把 legacy redirect 目录作为新内容的规范位置。新的源码页面应放在 `guides`、`integrations` 或 `self-hosted` 下，并同步维护对应的 `docs/zh/` 页面。

## 许可证

除非单独文件另有说明，文档沿用 Memoh 项目的许可证。
