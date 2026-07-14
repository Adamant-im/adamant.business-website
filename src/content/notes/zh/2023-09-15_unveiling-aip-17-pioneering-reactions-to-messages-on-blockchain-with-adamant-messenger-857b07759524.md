---
title: "AIP-17: 在 ADAMANT Messenger 中通过区块链实现消息表情反应"
slug: "unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
description: "ADAMANT 改进提案 17 (AIP-17) 为 ADAMANT Messenger 引入基于表情符号的消息反应功能，这是首个在区块链消息应用中实现该功能的方案。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
publishedAt: "2023-09-15T10:09:07.924Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/857b07759524/001-0-tn1uulgukvtmgwym.webp"
cardSpan: "full"
originalId: "medium:857b07759524"
locale: "zh"
placeholder: false
---

ADAMANT 改进提案 17 (AIP-17) 为 ADAMANT Messenger 引入了基于表情符号的消息反应功能——此前没有任何区块链消息应用支持此功能。该提案定义了一种标准化的反应结构，可与现有的消息基础设施集成。

## 工作原理

反应以 ADM 富媒体消息的形式传输，遵循 AIP-5（富内容消息）中建立的规范。新增一个必填字段 `reactto_id`，用于标识被反应消息的交易 ID。另一个字段 `react_message` 则承载用户选择的表情符号。反应在创建后可进行编辑或删除。

一个反应的有效载荷如下所示：

```json
{
  "reactto_id": "Transaction_ID",
  "react_message": "👍"
}
```

由于每个反应本身都是一笔链上交易，并通过 ID 引用另一笔交易，因此该方法在标准聊天消息之上增加了一层轻量级的表达能力，同时保留了 ADAMANT 现有的可审计性和去中心化模型。

预计该功能将实现在所有平台的 ADAMANT 应用中。技术讨论和完整提案可在 [AIP-17 提案页面](https://github.com/Adamant-im/AIPs/issues/52) 查看。

![AIP-17: 在 ADAMANT Messenger 中通过区块链实现消息表情反应](/images/engineering-notes/medium/857b07759524/002-1-zslip-kei08fk54o3-u34q-png.webp)
