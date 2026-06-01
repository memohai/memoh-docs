# Edge TTS

用 Edge 对外公开的朗读接口做合成：免费、无 API key，语言/声音很多。

---

## 建提供方

1. **TTS Providers** → **Add**。
2. 类型选 `edge`。
3. **Create**。

通常会自带默认模型 `edge-read-aloud`。

---

## 调模型

点 `edge-read-aloud`：

| 字段 | 说明 |
|------|------|
| **Voice** | 语言 + 声线 id，默认如 `en-US-EmmaMultilingualNeural` |
| **Format** | 如 `audio-24khz-48kbitrate-mono-mp3`、webm 等 |
| **Speed** | 如 `0.5`、`1.0`、`2.0` |
| **Pitch** | -100 ～ +100，默认 0 |

---

## 绑到机器人

1. 机器人 **General** → **TTS Model**
2. 选配好的 Edge 模型
3. 保存

---

## 试听

模型页上一般有试合成按钮，绑给机器人前可先听效果。
