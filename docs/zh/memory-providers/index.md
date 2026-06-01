# 记忆提供方

**Memory Provider** 决定机器人**怎么存、怎么取、怎么管**长期记忆。在机器人 **General** 里绑一个，即成为抽取与检索记忆的后端。

## 有哪些

- [内置](/zh/memory-providers/builtin.md)：默认自带，可关、稀疏、稠密三档，全可自建。
- [Mem0](/zh/memory-providers/mem0.md)：走 Mem0 云 API，要密钥。
- [OpenViking](/zh/memory-providers/openviking.md)：自建或 SaaS，自有 API。

---

## 一般步骤

1. 侧栏 **Memory Providers**。
2. 选类型，建一个实例。
3. 配好参数。
4. 机器人 **General** → **Memory Provider** 选中。
5. 在 **Memory** tab 里管具体条目。

---

## 接下来

- [内置](/zh/memory-providers/builtin.md)
- [Mem0](/zh/memory-providers/mem0.md)
- [OpenViking](/zh/memory-providers/openviking.md)
- 条目级操作：[长期记忆](/zh/getting-started/memory.md)
