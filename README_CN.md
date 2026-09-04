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

产品代码在 [`felinics/Memoh`](https://github.com/felinics/Memoh)。这个仓库只负责文档站：Scalar Docs 配置、Markdown/MDX 页面和截图。

## 这里有什么

- **教程**：面向 SaaS/产品使用，覆盖机器人、workspace、会话、记忆、MCP、邮件、计划任务和斜杠命令。
- **集成**：渠道和提供方，包括消息平台、LLM、记忆提供方、TTS 和网页搜索。
- **自托管**：Desktop、Server Deploy、workspace backend、Kata 和 SQLite 等开源部署文档。
- 英文和中文文档，分别位于 `docs/` 和 `docs/zh/`。
- 截图、logo 等静态资源，位于 `docs/public/`。
- Scalar Docs 配置，位于仓库根目录的 `scalar.config.json`。

## 文档站结构

文档站围绕三个主导航路径组织：

- `docs/guides/`：产品使用教程。
- `docs/integrations/`：渠道、提供方、记忆提供方、TTS 和网页搜索。
- `docs/self-hosted/`：Desktop、Server Deploy、workspace backend、Kata 和 SQLite。

简体中文文档使用相同结构，位于 `docs/zh/` 下：

- `docs/zh/guides/`
- `docs/zh/integrations/`
- `docs/zh/self-hosted/`

两种语言在 `scalar.config.json` 里以 Scalar **version** 的形式配置：`default` 提供英文文档，路径为 `/*`；`zh` 提供简体中文文档，路径为 `/zh/*`；语言切换器由 Scalar 在页头自动渲染。注意 `zh` version 内部的路由 key 不要带 `/zh` 前缀，Scalar 会自动加上。

旧信息架构的路径（`/getting-started/*`、`/installation/*`、`/channels/*`、`/tts-providers/*`、`/memory-providers/*` 以及 `/zh/` 下的对应路径）通过 `scalar.config.json` 里的 `siteConfig.routing.redirects` 保持可用。`docs/` 下不再有重定向页面——重定向目标变化时，直接改配置。

英文和简体中文文档需要保持镜像一致。如果在一种语言中新增、重命名、删除或移动页面，请在另一种语言中做对应变更，并同时更新 `scalar.config.json` 里的两个 version。

## 本地开发

Scalar CLI 无需安装步骤：

```bash
npx @scalar/cli project preview
```

开发服务器默认运行在：

```text
http://localhost:7970
```

## 校验

`scalar.config.json` 是站点地图和侧边栏的唯一来源。任何改动 `scalar.config.json` 或 `docs/**` 的 push 和 PR，CI 都会校验它：

```bash
npx @scalar/cli project check-config
```

## 目录结构

```text
.
├── docs/
│   ├── guides/            # 产品使用教程
│   ├── integrations/      # 渠道和提供方
│   ├── self-hosted/       # 开源自托管部署文档
│   ├── public/            # 静态图片和 logo（从站点根路径提供）
│   ├── zh/                # 中文文档
│   ├── footer.html        # 站点页脚
│   └── index.mdx          # 落地页
├── scalar.config.json     # 导航、路由、主题、重定向
└── package.json
```

页面默认是纯 Markdown。需要用 [Scalar 组件](https://scalar.com/products/docs)（例如 `Callout`、`PageLink`）时，把文件扩展名改成 `.mdx`，并在文件顶部导入：

```mdx
import { Callout } from 'scalar-mdx-components'

<Callout type="warning">
  需要注意的内容。
</Callout>
```

## 贡献文档

小的错别字、链接和措辞修正可以直接改对应 Markdown 页面。较大的结构调整建议这样做：

1. 运行 `npx @scalar/cli project preview`。
2. 修改 `docs/` 下的文档。
3. 运行 `npx @scalar/cli project check-config`。
4. 如果改动影响布局或图片，在 PR 里附上截图。

新增页面时，记得在 `scalar.config.json` 的两个 version 下都加上对应的路由条目——没有路由条目的文件不会被发布。新的源码页面应放在 `guides`、`integrations` 或 `self-hosted` 下，并同步维护对应的 `docs/zh/` 页面。

## 许可证

除非单独文件另有说明，文档沿用 Memoh 项目的许可证。
