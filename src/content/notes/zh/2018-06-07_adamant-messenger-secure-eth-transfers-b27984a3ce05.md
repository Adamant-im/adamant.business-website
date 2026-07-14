---
title: "ADAMANT Messenger：安全的 ETH 转账"
slug: "adamant-messenger-secure-eth-transfers-b27984a3ce05"
description: "ADAMANT 在其私密消息平台中集成了以太坊（ETH）钱包支持和转账功能。该功能可在聊天系统内实现完全无需信任的加密货币转账……"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-secure-eth-transfers-b27984a3ce05"
publishedAt: "2018-06-07T07:30:57.792Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b27984a3ce05/001-0-0qs-wuvvdq6a0uk2.webp"
cardSpan: "full"
originalId: "medium:b27984a3ce05"
locale: "zh"
placeholder: false
---

ADAMANT 已在其私密消息平台中集成以太坊（ETH）钱包支持和转账功能。该功能可在聊天系统内实现完全无需信任的加密货币转账，无需第三方或中间机构参与。其运作方式类似于开源的客户端应用 MyEtherWallet：用户自行保管私钥，每笔交易均在客户端签名后，加密发送至以太坊节点。

当用户通过 ADAMANT 网络发送 ETH 时，系统会从用于访问 Messenger 的相同 ADAMANT 钱包助记词中派生出私钥。这意味着 ADAMANT 助记词将成为所有绑定加密货币钱包的唯一密钥，因此安全地存储助记词至关重要。如果助记词丢失或因钓鱼攻击而泄露，ADAMANT 无法帮助用户恢复资金或冻结账户。

![ADAMANT Messenger：安全的 ETH 转账](/images/engineering-notes/medium/b27984a3ce05/002-0-zzoel-pond1fmpkh.webp)

目前正在开发独立的以太坊节点，并配备专用数据库索引以检索交易历史。不愿信任 ADAMANT 基础设施的用户可自行运行带有此类索引的以太坊节点，并在应用中选择使用。所有 ADAMANT 源代码均在 GitHub 上公开提供。

当用户创建 ADAMANT 账户时，系统会生成一个以太坊地址，并在区块链的 KVS 中记录一条公开条目以证明所有权。账户需持有超过 0.001 ADM 才能完成此交易记录。一旦记录完成，聊天中的任何人都可从区块链查询该 ETH 地址并发送付款，无需再单独请求地址。

一项重要的隐私考虑：ETH 地址在区块链上是公开可见的，任何人都能看到某个 ADAMANT 地址与特定 ETH 地址的绑定关系。尽管这无法直接关联到现实身份，但关注匿名性的用户应避免公开分享其 ADAMANT 地址。用户对其 ETH 钱包拥有完全控制权，可将资金转账至任意其他以太坊钱包，标准的以太坊 Gas 费用适用。
