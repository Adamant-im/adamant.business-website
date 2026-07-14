---
title: "ADAMANT 节点上的交易发布、规范化、验证与广播"
slug: "discussion-46-some-notes-about-transaction-publishing-normalization-verification-and-broadcast-on-adm-no-10016205"
description: "Transaction.prototype.verify 验证从其他区块获取的交易（可能包含旧交易），Transactions.prototype.publish 验证用户提交的新交易。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/46"
publishedAt: "2026-05-07T07:27:25Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10016205"
locale: "zh"
placeholder: false
---

## 函数

`Transaction.prototype.verify` 用于验证从其他区块中获取的交易，这些交易可能包含旧交易。`Transactions.prototype.publish` 用于验证来自用户的传入交易，验证尚未确认的新交易。在通过 API 接收到新交易后，会依次调用 `publish` 和 `objectNormalize` 方法，然后调用 `verify`。`publish` 仅在通过公共 API 推送交易时被调用。

## 交易处理

当一个节点通过 API 从客户端应用接收到一笔新交易，并且是第一个看到该交易的节点时，`Logic->Transaction.prototype.publish` 会根据接收到的数据创建一笔新交易，验证客户端交易属性（包括 `timestampMs`），添加交易 ID，并像通常一样处理未确认交易。如果一个节点在当前高度从另一个对等节点接收到一笔新交易，它会验证该交易，若无效则移除该对等节点，然后处理未确认交易。当在启动过程中或从高度 0 开始验证区块链时从另一个对等节点获取交易，节点会验证交易，若无效则移除对等节点，并在一次验证多个交易的同时处理未确认交易。验证过程包括节点调用 `objectNormalize()` 对接收到的交易进行模式验证。

未确认交易的处理流程始于 `logic.transaction.process()`，该方法验证交易 ID 并规范化发送方 ID。接下来，交易被规范化：`logic.transaction.objectNormalize()` 根据模式验证交易对象，并移除不必要的属性，包括在 `spaceship` 激活前的 `timestampMs`。最后，调用 `logic.transaction.verify()` 来验证所有属性，例如 `timestamp`、`timestampMs` 和 `signature`。

移除对等节点意味着将其从对等节点列表中删除，直到重新发现；节点不会封禁对等节点，因此永远不会应用 `BANNED` 状态。节点在处理完未确认交易后，会将交易广播给其他节点。除了 `objectNormalize()`，节点还有 `normalize()`，后者仅用于 POST `/transactions/normalize` 端点，该端点应被弃用。节点同时具有 `apply()` 和 `applyUnconfirmed()`，因为“apply”方法会更改发送方和接收方账户的余额，而 `applyUnconfirmed()` 更改的是未确认余额；“undo”方法同理。当节点生成一个新块时，交易来自一个已经过验证的列表。目前，`publish()` 会检查交易时间戳是否为未来时间，或是否比当前时间早超过 `constants.maxTransactionAgeSec` 秒。没有必要在 `publish` 中添加与 `verify` 相同的检查，因为后者必须在 `publish` 之后被调用。同时，也不能将 `publish` 的检查包含在 `verify` 中，因为它们依赖于当前时间，无法验证旧交易是否不超过 5 秒。如果客户端应用未将错误检查放在 `publish()` 而放在 `verify()` 中，它们将收到类似 `The difference between timestamp and timestampMs is greater than ${maxTimestampMsDelta}ms.` 或 `Invalid transaction timestamp. Timestamp is not in the int32 range` 的错误信息。

## 时间戳说明

交易 `timestamp` 是 ADAMANT 纪元时间（单位为秒），而非 Unix 时间。交易 `timestampMs` 应为 ADAMANT 纪元时间（单位为毫秒），而非 Unix 时间；Unix 毫秒可通过 `constants.epochTime.getTime() + timestampMs` 推导得出。即使在 `spaceship` 激活后，`timestampMs` 字段也不属于交易字节、签名、交易 ID 或哈希的一部分。在 `spaceship` 激活后，共识敏感的验证应要求 `timestampMs` 与 `timestamp` 处于相同的 ADAMANT 纪元秒内：`0 <= timestampMs - timestamp * 1000 < 1000`。这种更严格的同秒规则是有意设计的：`timestampMs` 必须精确细化 `timestamp` 中存储的同一 ADAMANT 纪元秒，客户端应计算 `timestamp = Math.floor(timestampMs / 1000)`。在接近秒边界时使用 `Math.round()` 或 `Math.ceil()` 会产生不一致的配对，应被拒绝。对当前客户端和源码的审查发现，`adamant-api-jsclient`、PWA、`adamant-console`（通过 `adamant-api@2.4.0`）、iOS 以及文档示例均使用 `Math.floor` 或等效截断，没有任何传出 ADM 交易时间戳生成路径使用 `round` 或 `ceil`。在 `spaceship` 激活前，共识敏感的规范化应移除 `timestampMs`，以保持与旧节点的兼容性。只要交易彼此不同，允许同一发送方在一秒内发起多笔交易；`timestampMs` 有助于客户端对快速聊天消息进行排序，但不得作为交易 nonce 或签名输入。

## 入账检查

`publish()` 方法包含针对新提交交易的公共 API 入账检查，这些检查可能依赖于节点的当前时钟。如果一笔交易通过了 `publish()`，它仍会被 `verify()` 处理，而 `verify()` 故意不包含当前时间检查，应仅保留确定性检查，如模式、ID、签名、余额以及 `timestampMs` 同秒规则。`publish()` 中的当前时间检查不得移入 `verify()`，因为 `verify()` 被用于重放、同步和历史交易。现有的未来时间检查是基于时隙的：在 5 秒时隙下，客户端时钟提前约 400 毫秒仅在四舍五入后的秒级时间戳跨入下一个时隙时，才会导致 `Transaction timestamp is in the future` 错误。`maxTransactionFutureMs` 是一个非共识性的公共 API 入账容差，仅在 `publish()` 中应用，不用于重放、对等节点/区块验证或共识激活逻辑。预期条件是保留旧的基于时隙的入账策略，同时通过仅在 `transactionSlotNumber > currentSlotNumber` 且交易时间比节点当前时间提前超过 `maxTransactionFutureMs` 时拒绝交易来软化边界情况。在此计算中，若客户端提供了 `timestampMs`，则使用它；否则回退到 `timestamp * 1000`。在 `publish()` 中设置较小的非共识性宽限期（例如，下一时隙 500 毫秒）可以改善略微超前客户端时钟的用户体验，而不会改变重放验证行为，尽管客户端应用仍应保留较小的时间戳余量以兼容旧节点。一笔 `timestamp` 比当前区块时间提前一秒的交易仍可被包含在该区块中，而不会破坏区块链，因为交易 `timestamp` 是已签名的交易元数据，不是时隙或区块有效性的来源，共识不要求 `tx.timestamp <= block.timestamp`。在重放过程中，节点不会将交易时间戳与本地挂钟时间进行比较，因此入账时的宽限期不会导致重放分歧。

## 状态端点

`/api/node/status` 端点可能返回额外的时钟字段，例如 `nodeTimestampMs`（ADAMANT 纪元毫秒）和 `unixTimestampMs`，且不会对共识产生影响。`nodeTimestamp` 仍为 ADAMANT 纪元秒。

## 激活高度

共识激活高度应可配置，以适用于测试网和基于 ADAMANT 的链，同时在代码或配置中保留主网默认值。历史上的 `fairSystemActivateBlock: 4359464` 检查使用 `height > fairSystemActivateBlock`，因此名为 `fairSystem` 的激活的等效首个激活高度为 4,359,465。`spaceship` 激活应仅控制共识敏感行为，例如在区块、对等节点和重放处理期间接受、规范化、存储和验证 `timestampMs`。与时间相关的 `publish()` 检查属于入账策略，应保持在共识激活之外。
