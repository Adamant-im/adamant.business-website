---
title: "ADAMANT Node v0.10.2：更安全的恢复、更丰富的 API 与更快速的查询"
slug: "discussion-66-adamant-node-v0-10-2-safer-recovery-richer-apis-and-faster-queries-10442742"
description: "ADAMANT Node v0.10.2 聚焦节点活性、更快恢复、更安全的数据库故障处理、更丰富的观测 API 以及更高效的客户端订阅。建议升级，但非网络兼容强制要求：本次发布不包含共识分叉，亦未改变区块或交易序列化、签名、代表排序、奖励、手续费、激活高度、时间槽或确定性重放。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/66"
publishedAt: "2026-07-16T18:19:41Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10442742"
locale: "zh"
placeholder: false
---

ADAMANT Node v0.10.2 聚焦节点活性、更快恢复、更安全的数据库故障处理、更丰富的观测 API 以及更高效的客户端订阅。建议升级，但并非网络兼容性的强制要求：本次发布不包含共识分叉，亦未改变区块或交易序列化、签名、代表排序、奖励、手续费、激活高度、时间槽或确定性重放。

## 同步恢复

此前，同步流水线中的回调或数据库故障可能导致节点永久报告其处于同步状态却无任何进展。在该状态下，节点会拒绝实时区块，永远不会启动新的同步，并需要手动重启。v0.10.2 引入了基于进度的看门狗，可检测五分钟内未应用任何新区块的同步运行。停滞的运行将通过作用域停止信号被中止；中止信号发出后不得开始新的状态变更，且正在进行的区块/账户处理将在加载器释放其同步状态前完成排空。被拒绝的 PostgreSQL 查询现在会贯穿区块验证、区块加载以及启动时内存表更新进行传播，而非静默地挂起回调链。这些仅为活性与错误传播层面的变更，不会改变哪些区块被视为有效。

## 持久化检查点

ADAMANT 将共识派生状态保存在 `mem_*` 表中。如果进程在更新这些镜像时被中断，节点必须从规范区块重建它们。v0.10.2 为派生内存状态新增三个轮转检查点槽位。每个检查点记录区块高度/ID、轮次、nethash、schema 版本、状态以及规范 SHA-256 摘要。启动时仅接受元数据、摘要、链引用、网络及状态不变量均通过验证的检查点。有效检查点将被恢复，仅重放其后的区块；任何验证或部分重放失败都会回退到现有的完整确定性重建。未确认的 junction 表不会被检查点化，而是从已确认状态重建。规范区块与确定性重放仍是唯一事实来源——检查点仅为本地恢复缓存，不能重新定义链状态。

## REST API 改进

`GET /api/accounts/top` 现在可在每个节点上稳定可用，提供确定性的 `balance DESC, address ASC` 排序、分页、`isDelegate` 过滤、计数元数据以及 `limit=0` 仅计数请求。

修复了多个代表 API 缺陷。`GET /api/delegates/get` 重新正确报告代表的真实排名/速率以及正确的外部生产力。`GET /api/delegates/voters` 不再丢失地址过滤并返回所有账户。`GET /api/delegates/getNextForgers` 在轮次边界使用下一区块高度，并在链顶端尚未存在时报告稳定的加载错误。

状态与代表 API 现在暴露活跃的 `consensusCodeName`、默认值与运行时覆盖后的有效共识激活计划、完整的区块奖励里程碑计划，以及每位代表终生的 `forged` 数量（以十进制整数字符串表示）。这减少了对重复硬编码计划的依赖，并在不改变共识行为的前提下暴露节点的有效配置。

`GET /api/blocks` 现在遵守 `numberOfTransactions=0`。在 `(text_generatorPublicKey, height DESC)` 上新增的复合 B-tree 索引避免了未知生成器结合默认排序时昂贵的全表过滤路径。响应契约保持不变。在大型数据库上，运维人员应在首次启动时为索引迁移预留充足时间与磁盘空间。

## Socket.IO 区块与余额事件

服务现在可以订阅紧凑的 `newBlock` 事件以及针对 `balance`、`unconfirmedBalance` 或两者的 `balances/change` 事件。节点维护专用的订阅索引，因此不会扫描无关的 socket。余额读取在区块应用/回滚时进行批处理，事件发布失败与状态变更相互隔离。这些事件为尽力而为且非持久化；客户端应在重连后恢复订阅，并对关键状态使用 REST 对账。

## 依赖与审计维护

运行时与开发依赖在当前主版本范围内进行了更新。移除了未使用的直接 `npm` 运行时依赖及其捆绑子树，并添加了窄范围兼容的 Grunt/js-yaml 覆盖。经验证的审计基线从 4 个中等和 1 个高危发现变为零中等、高危或严重发现。加密协议、签名、助记词、节点握手或交易验证行为均未改变。

## 运维人员须知

继续使用 Node.js 22.13.0 或更新版本。使用常规流程备份数据库，优雅停止节点，并等待 `Cleaned up successfully`。允许首次 v0.10.2 启动完成迁移以及检查点/索引创建。为三个轮转派生状态检查点槽位规划额外磁盘空间。启动后，验证 `/api/node/status`、同步进度、实时区块处理以及您的服务所使用的 REST/Socket.IO 能力。

## 参考资料

- [GitHub Release v0.10.2](https://github.com/Adamant-im/adamant/releases/tag/v0.10.2)
- [ADAMANT Node 文档](https://docs.adamant.im)
- [ADAMANT API schema](https://schema.adamant.im)
