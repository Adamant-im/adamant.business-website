---
title: "ADAMANT 中的键值存储：在区块链上存储联系人名称"
slug: "what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
description: "ADAMANT 在 0.2.0 版本中引入了键值存储（KVS）机制，支持在区块链上存储公有和私有联系人数据，如以太坊地址和地址簿。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
publishedAt: "2018-07-11T07:10:16.055Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ee5f82ab77f/001-0-tvpp-oomdjax-ek8.webp"
cardSpan: "full"
originalId: "medium:4ee5f82ab77f"
locale: "zh"
placeholder: false
---

ADAMANT 引入了一种键值存储（KVS）机制，用于在区块链上存储联系人数据，该功能实现在 ADAMANT Blockchain 0.2.0 版本中。KVS 支持公有和私有数据存储。公有数据的示例包括以太坊地址，而私有数据的示例则包括地址簿。

私有 KVS 交易与其他交易类型一样存储在链上，但仅其所有者可访问。交易内容使用所有者私钥的哈希值并添加盐值进行加密，以增强安全性。完整的技术细节详见 [AIP-3](https://aips.adamant.im/AIPS/aip-3)。

ADAMANT 采用增量数据存储机制，即客户端仅传输地址簿的变更部分，而非整个地址簿。这对于区块链存储至关重要，因为需要尽量减少链上数据的大小。每个键对应一个特定值——例如，一个联系人的 ADAMANT 地址（如 `U324242353425354`）映射到一个显示名称（如“John”）。

ADAMANT Messenger 网页应用已更新以支持此功能。用户可在聊天界面中点击包含 ADAMANT 地址的标题来重命名联系人。

![Key-Value Store in ADAMANT](/images/engineering-notes/medium/4ee5f82ab77f/002-0-xzokd2tzoxh9eqk2.webp)

iOS 和 Android 应用计划在未来版本中支持地址簿功能。
