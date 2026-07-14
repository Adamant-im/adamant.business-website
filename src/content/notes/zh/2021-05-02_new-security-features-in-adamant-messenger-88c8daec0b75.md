---
title: "ADAMANT Messenger 2.11.0 中的新安全功能"
slug: "new-security-features-in-adamant-messenger-88c8daec0b75"
description: "ADAMANT Messenger 2.11.0 版本引入了加密货币交易验证、可疑钱包地址警告以及按需交易状态更新。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-security-features-in-adamant-messenger-88c8daec0b75"
publishedAt: "2021-05-02T08:46:58.373Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/88c8daec0b75/001-0-0hsc7oe7vtwfo3p0.webp"
cardSpan: "full"
originalId: "medium:88c8daec0b75"
locale: "zh"
placeholder: false
---

ADAMANT Messenger 2.11.0 版本引入了加密货币交易验证、可疑钱包地址警告以及按需交易状态更新。

### KVS 中的可疑钱包

ADAMANT 将钱包地址存储在区块链的键值存储（KVS）中，从而支持在聊天中进行加密货币转账。保存地址需要账户的密码短语，因此第三方无法代表用户注入错误的地址。然而，如果密码短语被泄露，攻击者可能会将账户的加密货币地址替换为他们自己的地址，从而截获发送给受害者的资金。

Messenger 现在会在登录时检查钱包地址的一致性，并在发现不一致时通知用户。当向聊天对象发送加密货币时，应用还会验证对方存储的钱包地址。

### 聊天中的加密货币转账

聊天内转账通过先在 ADAMANT 区块链上发送一条特殊消息，再执行实际的加密货币交易来实现。特殊消息与链上交易之间可能出现不一致情况——例如金额、接收方、发送方或转账时间不匹配。Messenger 现在能够检测到这些不一致并提醒用户。

![ADAMANT Messenger 中的新安全功能](/images/engineering-notes/medium/88c8daec0b75/002-0-bjwjfxdbbty8fily.webp)

任何在聊天中发起的加密货币转账也应出现在钱包的交易记录中，路径为 钱包 → 币种 → 余额。现在用户可以从聊天界面和交易详情界面手动重新检查交易状态。

### 其他更新

此版本优化了跨币种的交易更新时机，修复了 Doge 的 UTXO 处理问题，增加了节点视图中的节点版本显示，并修复了交易列表可能显示为空的 bug。完整更新日志请参阅 [v2.11.0 发行说明](https://github.com/Adamant-im/adamant-im/releases/tag/v2.11.0)。
