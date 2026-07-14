---
title: "ADAMANT 节点在网络中断后的对等节点恢复：种子节点、发现机制与同步选择"
slug: "discussion-63-node-peer-recovery-after-network-outage-seeds-discovery-and-sync-selection-10403079"
description: "ADAMANT 节点通过三种独立机制维持对等连接，在网络中断后查看控制台日志时容易混淆。本文解释了它们如何交互，以及为何即使仍在联系种子节点，同步也可能停滞。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/63"
publishedAt: "2026-07-10T05:24:55Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10403079"
locale: "zh"
placeholder: false
---

ADAMANT 节点通过三种独立机制维持对等连接，在网络中断后查看控制台日志时容易混淆。本文解释了它们如何交互，为何即使仍在联系种子节点，同步也可能停滞，以及运维人员在恢复期间应如何预期。

## 背景

节点维护一个内存中的对等节点表，该表由三个来源填充：配置中 `peers.list` 列出的种子节点、启动时从数据库加载的持久化节点，以及通过其他节点返回的 `GET /peer/list` 发现的新节点。种子节点是冻结的 —— 即使请求失败，它们也永远不会从表中移除。

每个对等节点都有一个状态：`BANNED`（0，排除在正常使用之外）、`DISCONNECTED`（1，已知但当前不可用于同步或广播）或 `CONNECTED`（2，最近成功响应，可用于同步）。当请求失败时，节点的成功率会下降。当一个先前处于 `CONNECTED` 状态的节点成功率低于 80% 时，其状态会降级为 `DISCONNECTED`。网络超时（`ECONNABORTED`）不会移除该节点，只会降低其成功率。

## 三种并行机制

**种子节点 Ping（静默）**。在启动时以及每 ~5 秒，节点会通过 `GET /peer/height` 向配置中的每个种子节点发送 Ping。失败记录在 trace 级别，默认控制台输出中通常不可见。成功的 Ping 会将该节点重新提升为 `CONNECTED` 状态。

**对等节点发现（显著）**。每 ~5 秒，节点会从内存中随机选择一个对等节点（状态为 `DISCONNECTED` 或 `CONNECTED`），并请求 `GET /peer/list` 以获取新地址。如果该随机选择的节点超时，控制台将显示：

```text
Discovering new peers failed. ECONNABORTED Request failed GET http://<peer>/peer/list
```

此错误仅显示被随机选中的节点，而非完整的对等节点表。在恢复期间，这通常会暴露出一些之前发现并保存到数据库中的、鲜为人知的云托管节点。这并不意味着节点忽略了种子节点。

**区块链同步（严格）**。加载器的同步路径使用 `peers.list()` 并采用默认过滤器：仅限 `CONNECTED` 节点。如果当前没有 `CONNECTED` 状态且具有可用高度的节点，同步将以以下信息结束：

```text
Failed to find enough good peers
```

在这种情况下，节点并未从网络断开连接（即并非没有对等节点记录），而仅仅是没有任何适合区块下载的活跃节点。

## 典型中断时间线

当网络中断发生时，对所有对等节点的 HTTP 请求开始失败。先前 `CONNECTED` 的节点变为 `DISCONNECTED`，加载器无法选择合适的节点，因此高度停止增长。在后台静默进行种子节点 Ping 的同时，对等节点发现机制仍会持续尝试随机的过期条目并产生错误。一旦至少一个种子节点或其他已知节点再次响应 Ping，它将恢复为 `CONNECTED` 状态，同步随即恢复。

“网络恢复”与“节点重新开始同步”之间可能存在数分钟的延迟 —— 如果远程节点仍不可达，则延迟可能更长 —— 因为恢复依赖于成功与某个节点完成往返通信并使其变为 `CONNECTED`，而不仅仅是本地网络连通。

## 运维人员预期

在中断后看到针对不熟悉地址的发现错误是正常现象，本身并不表示配置错误。配置中的种子节点仍在被联系；只是它们的 Ping 失败在默认日志中不显著。消息 `Failed to find enough good peers` 意味着当前没有活跃节点，而不是对等节点表被清空。重启节点会重新加载种子节点和数据库中的节点，但恢复仍需至少一个远程节点响应。

## 可能的改进

有几项改进可提升运维体验：当没有 `CONNECTED` 节点持续超过一定阈值时间时，将种子节点 Ping 失败日志级别提升至 `warn`；在 `getFromRandomPeer` 中优先选择种子节点或最近工作过的节点，而非完全随机选择；当同步报告 `Failed to find enough good peers` 时并行重试所有种子节点；以及在 `async.retry` 耗尽所有同步尝试时减少重复的 warn 日志行。
