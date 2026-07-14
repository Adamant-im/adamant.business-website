---
title: "用于崩溃恢复的持久化内存表检查点"
slug: "discussion-64-persisted-mem-table-checkpoints-for-crash-recovery-node-261-10411019"
description: "ADAMANT 节点现支持派生内存状态的持久化轮转检查点。在强制中断导致内存镜像不一致后，启动时可恢复最新检查点并仅重放其后的区块。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/64"
publishedAt: "2026-07-11T14:36:39Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10411019"
locale: "zh"
placeholder: false
---

ADAMANT 节点现在支持派生的 `mem_*` 状态的持久化、轮转式检查点。在因强制中断导致内存镜像不一致后，启动时可恢复最新的已验证检查点，并仅重放该检查点高度之后的区块，而不是从高度 1 开始重建所有内存表。该功能实现了 issue #227 中的设计，已合并至 pull request #261。检查点仅为本地恢复缓存；区块和确定性重放仍是事实来源。如果验证或重放失败，节点将回退到现有的完整重建路径。

当进程在写入进行中被终止时，诸如 `mem_accounts`、`mem_round`、委托和多重签名连接表及其未确认镜像等派生表可能变得不一致。通过 `SIGTERM` 进行的优雅关机仍是必需的操作路径，但检查点可在发生强制终止时减少恢复时间。

该实现引入了一个元数据表（`mem_state_checkpoint_meta`）和三组轮转槽表（`mem_ckpt_0..2_*`）用于已确认状态。未确认的连接表不会被检查点化；在恢复时将从已确认状态重建。核心逻辑分布在 `logic/memCheckpoint.js`（用于摘要和槽轮转）、`modules/memCheckpoints.js`（作为模块封装器）、`sql/memCheckpoints.js`（用于 SQL 辅助函数），以及对 `modules/loader.js` 和 `modules/blocks/chain.js` 的修改（用于触发恢复和检查点创建）。

检查点仅在完整 `applyBlock` 流水线已持久化区块后的完整轮边界处创建。在链尖，这每完成一轮发生一次。在追赶同步期间，为避免降低同步吞吐量，每第 100 轮发生一次。检查点创建使用 PostgreSQL 的 `REPEATABLE READ` 事务来冻结 MVCC 快照。一旦元数据行被持久化，区块处理的关键区即被释放，而表复制和摘要计算则在后台针对冻结的快照继续进行。这避免了在整个复制操作期间长时间持有关键区。

在接受检查点用于恢复之前，会检查多个不变量：状态必须为完成，模式和 nethash 必须匹配，所引用的区块必须存在，且 SHA-256 摘要必须匹配。恢复时会按从新到旧的顺序尝试所有完整的槽，因此如果存在较旧的有效槽，最新的槽损坏不会强制进行完整重建。在启动时，如果 `checkMemTables()` 检测到不一致，`memCheckpoints.tryRecover()` 将恢复该槽，重置未确认状态，设置最后一个区块，并从检查点高度重放区块至链尖。如果重放失败，节点将丢弃检查点状态并从创世块开始进行完整重建。

该功能在 `config.default.json` 中默认启用：

```json
"loading": {
  "memCheckpoints": {
    "enabled": true
  }
}
```

操作员应注意，此功能未引入任何协议变更；检查点永远不会作为共识输入，且被篡改的本地数据无法绕过区块验证。在主网规模的 `mem_*` 数据量下，三个槽大约需要 96–144 MB 加上元数据，因此建议预留约 1 GB 的余量。操作员仍应优先采用优雅关机，因为检查点虽可缩短恢复时间，但不能替代正确的关机流程。
