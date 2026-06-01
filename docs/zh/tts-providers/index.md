# 语音（TTS）

Memoh 支持把字变成声音。可以分三层想：

- **TTS Provider**：一种服务类型（如 Edge TTS），在 TTS 页建**具名实例**。
- **TTS Model**：某实例下的具体声音/模型，可配音色、格式、变速、音高。
- **机器人绑定**：在机器人 **General** 里选 TTS Model，之后对话里可朗读。

---

## 一般步骤

1. 侧栏 **TTS Providers**。
2. **Add**，选类型（如 `edge`）。
3. **Create**（常会自动导入默认模型）。
4. 点进模型，调音色、格式等。
5. 用页面试听。
6. 机器人 **General** 里选这个 TTS Model 并保存。

---

## 当前文档里有的

| 提供方 | 说明 |
|--------|------|
| [Edge TTS](/zh/tts-providers/edge.md) | 走 Edge 公开朗读接口，无 key，多语音 |

---

## 接下来

- 配 [Edge TTS](/zh/tts-providers/edge.md)
