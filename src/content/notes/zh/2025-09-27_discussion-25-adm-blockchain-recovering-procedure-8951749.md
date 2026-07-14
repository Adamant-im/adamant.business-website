---
title: "ADM 区块链分叉恢复流程"
slug: "discussion-25-adm-blockchain-recovering-procedure-8951749"
description: "当多个代理节点同时生成区块时，ADAMANT 区块链节点软件中可能出现短分叉。网络必须决定保留哪个区块。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/25"
publishedAt: "2025-09-27T12:49:14Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:8951749"
locale: "zh"
placeholder: false
---

在 [ADAMANT 区块链节点软件](https://github.com/Adamant-im/adamant) 中，当多个代理节点同时生成区块时，可能会出现短分叉。此时网络必须决定保留哪一个区块。当前的共识规则是选择时间戳更早的区块（假设时间戳可信），如果时间戳相同，则选择区块 ID 更小的区块。这类短分叉在区块链中会定期发生，通常不会演变为更大或危险的分叉。

## 删除最后一个区块

当检测到分叉时，节点会记录“Deleting last block”（删除最后一个区块），这种情况可能发生在恢复过程中，或在接收到新区块时。一个常见的触发条件是：节点接收到一个区块，其高度和前一个区块 ID 与现有区块相同，但自身的区块 ID 不同。这是一种正常的恢复操作，可在不引发更深分叉的前提下保持区块链的一致性。

## 示例日志

以下日志条目展示了恢复操作的过程。被删除的区块高度为 48093334，ID 为 15500937233239097229。为简洁起见，此处省略了完整的交易负载内容，但关键元数据显示了区块版本、总数、奖励、生成者和时间戳：

```
[WRN] 2025-08-06 00:00:09 | Deleting last block - {"version":0,"totalAmount":12119967437,"totalFee":150000000,"reward":15000000,"payloadHash":"b04ed7f935bec1f74b7a179ff07557a36ca5ea38d6966381f1a5794ca9df7125","timestamp":250066805,"numberOfTransactions":3,"payloadLength":351,"previousBlock":"17914802164676259429","generatorPublicKey":"547919533beb2612d76e3a7d5f38e61145a2b0ecb96d971277f34fb8efd3bcb3","blockSignature":"64be4069540ab86f195d3bfb477ac8b2514dc99c33b881d98cdab103101b95e21c3f0cb1d6df5a128977a13992956c5390d7e69b18eb99055250c55d9b734802","height":48093334,"id":"15500937233239097229","relays":3}
```

## 总结

分叉通过选择最老的区块或 ID 最小的区块来自动解决。“Deleting last block”操作是在检测到相同高度的冲突区块时采取的常规恢复步骤，可确保区块链保持一致，且不会产生更深的分叉。
