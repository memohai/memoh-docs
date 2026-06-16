# 供应商与模型

日常用 Memoh，多半要配好：

- 一个或多个 **供应商**（怎么连上游 API）
- 其下的 **模型**
- 若要朗读，再配 **语音合成**（见 [TTS](/zh/integrations/providers/tts/index.md)）
- 若要把语音转文字，再配 **语音转写**

聊天与 embedding 在 **Models** 页管理；语音合成模型在 TTS 流程里单走，语音转写模型在 Transcription 设置页管理。

---

## 供应商基础

**供应商**里存的是某一类上游的连法，例如：

- 协议（`client_type`）
- 需要时的 base URL
- API Key 或 OAuth 等凭据

常见有 OpenAI 兼容站、Anthropic、Google、Codex、GitHub Copilot 等。

### 新建供应商

1. 侧栏打开 **Models**。
2. 点 **Add Provider**。
3. 按表单填完保存。

常用字段：

| 字段 | 说明 |
|------|------|
| **Name** | 展示名，如 `OpenAI`。 |
| **Client Type** | 本供应商用的协议。 |
| **Base URL** | 部分协议必填的根地址。 |
| **API Key** | 走密钥时填。 |

### 客户端类型

| Client Type | 常见用途 |
|-------------|----------|
| `openai-responses` | OpenAI Responses 风格 |
| `openai-completions` | Chat Completions 兼容 |
| `anthropic-messages` | Anthropic Messages |
| `google-generative-ai` | Google Gemini |
| `openai-codex` | Codex / ChatGPT 那套，OAuth |
| `github-copilot` | Copilot，设备码 OAuth |
| `edge-speech` | Edge 朗读 |
| `openai-speech` | OpenAI 兼容语音合成 |
| `openai-transcription` | OpenAI 兼容语音转写 |
| `openrouter-speech` | OpenRouter 语音合成 |
| `openrouter-transcription` | OpenRouter 语音转写 |
| `elevenlabs-speech` | ElevenLabs 语音合成 |
| `elevenlabs-transcription` | ElevenLabs 语音转写 |
| `deepgram-speech` | Deepgram 语音合成 |
| `deepgram-transcription` | Deepgram 语音转写 |
| `minimax-speech` | MiniMax 语音合成 |
| `volcengine-speech` | 火山引擎语音合成 |
| `alibabacloud-speech` | 阿里云语音合成 |
| `microsoft-speech` | Microsoft 语音合成 |
| `google-transcription` | Google 语音转写 |

语音合成与语音转写类型不能当主聊天用。语音合成走 [TTS 提供方](/zh/integrations/providers/tts/index.md)，语音转写走 Transcription 设置页。具体模型、音色和语言取决于 provider 模板与上游账号。

---

## 走 OAuth 的供应商

多数类型用普通 API Key。`openai-codex` 和 `github-copilot` 例外。

### OpenAI Codex

- 类型选 `openai-codex`
- 在供应商表单里走 OAuth，不填普通 key
- 预置会指向 `https://chatgpt.com/backend-api`

偏写代码、走 Codex 那套时合适。

### GitHub Copilot

- 类型 `github-copilot`
- **设备码** 授权
- 等待时界面会给验证 URL 和用户码
- 结束后存 GitHub 侧 token

你本来就有 Copilot 时，可复用进 Memoh。

---

## 导入模型

建完供应商后可以导入或手加模型。常见：选中供应商 → **Import Models**（若上游有目录）→ 勾要保存的。已知上游 id 时也可手填。

---

## 模型类型

| 类型 | 用途 |
|------|------|
| `chat` | 对话、工具、推理、文生图等 |
| `embedding` | 向量化、记忆检索 |
| `speech` | 朗读，挂在 TTS |
| `transcription` | 语音转文字，挂在 Transcription |

**Models** 页主要管 chat / embedding；speech 在 [TTS](/zh/integrations/providers/tts/index.md)，transcription 在 Transcription 设置页。

---

## 聊天模型上要注意的项

| 字段 | 说明 |
|------|------|
| **Model ID** | 上游真实 id，如 `gpt-4o`。 |
| **Name** | 界面展示名。 |
| **Compatibilities** | 如 `vision`、`tool-call`、`image-output`、`reasoning`。 |
| **Context Window** | 粗算上下文上限。 |

### 兼容性

| 标记 | 含义 |
|------|------|
| `vision` | 能吃图 |
| `tool-call` | 能调工具 |
| `image-output` | 能出图 |
| `reasoning` | 有显式推理/档位 |

有推理时可能还带 `reasoning_efforts`：`none`、`low`…`xhigh` 等。

### `context_window`

Memoh 用来：

- 在网页上算当前会话占了多少上下文
- 驱动 `/status` 等
- 判断是否逼近上限
- 决定何时需要 [会话上下文压缩](/zh/guides/compaction)

不填也能用，但**百分比**会没法精确给。

### 文生图模型

机器人上可单挂 **Image Generation Model**，须是带 `image-output` 的 chat 模型。需要时与默认聊天模型分开。

---

## Embedding 模型

给语义索引用。必填如 **Dimensions**（向量维数，如 1536）。和记忆或其它向量检索能力绑在一起用。

---

## 语音合成与转写模型

语音合成在 [TTS 提供方](/zh/integrations/providers/tts/index.md) 配，不跟普通 chat 供应商混流。当前语音合成类别包括：

- Edge：`edge-speech`
- OpenAI 兼容：`openai-speech`
- OpenRouter：`openrouter-speech`
- ElevenLabs：`elevenlabs-speech`
- Deepgram：`deepgram-speech`
- MiniMax：`minimax-speech`
- 火山引擎：`volcengine-speech`
- 阿里云：`alibabacloud-speech`
- Microsoft：`microsoft-speech`

语音转写在 Transcription 设置页配。当前语音转写类别包括：

- OpenAI 兼容：`openai-transcription`
- OpenRouter：`openrouter-transcription`
- ElevenLabs：`elevenlabs-transcription`
- Deepgram：`deepgram-transcription`
- Google：`google-transcription`

音频模型有 provider 专属的音色、格式、语速、音高、语言和识别设置，和 chat/embedding 不是一路设置。

---

## 怎么记省事

对多数机器人，可以分几条线想：

- **Chat**：日常说人话
- **Embedding**：记忆
- **Speech / Transcription / 生图模型**：边能力

不必强行一模型全包。

---

## 接下来

- 给机器人绑聊天、生图、浏览器、记忆、朗读等：[机器人](/zh/guides/bot.md)
- 配语音提供方与语音模型：[TTS 提供方](/zh/integrations/providers/tts/index.md)
- 配语音转文字：打开 Web UI 的 Transcription 设置页
