# Containerd + Kata（已移除）

::: danger 功能已移除
Memoh 已经移除 Kata Containers 支持。当前版本只用标准 containerd runtime 运行 workspace 容器，`[containerd].runtime_type` 的 Kata 设置、`server-kata` image target、Kata compose overlay 都不存在了。
:::

如果你还有跑着 Kata workspace 的老版本部署：

- 升级前先把部署切回标准 `containerd` backend。workspace 数据在 containerd snapshot 和数据卷里，不在 Kata runtime 里，机器人文件不会丢。
- 把 Kata 专属的 compose overrides（`/dev/kvm` 挂载、Kata shim 挂载、`BRIDGE_TCP_ADDR` bridge 设置）从栈里清掉。

当前可用的 backend 选项见 [Workspace Backend](/zh/self-hosted/workspace-backends.md)。
