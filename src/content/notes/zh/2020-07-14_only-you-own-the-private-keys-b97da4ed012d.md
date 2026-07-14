---
title: "只有你拥有私钥"
slug: "only-you-own-the-private-keys-b97da4ed012d"
description: "加密货币与银行账户的根本区别在于所有权：你不真正拥有银行账户，但加密货币完全属于你。这是去中心化的基础。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/only-you-own-the-private-keys-b97da4ed012d"
publishedAt: "2020-07-14T20:41:58.005Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b97da4ed012d/001-1-vwww-ippgzj9jadeo82tzw-png.webp"
cardSpan: "full"
originalId: "medium:b97da4ed012d"
locale: "zh"
placeholder: false
---

加密货币与银行账户的根本区别在于所有权：你不真正拥有银行账户，但加密货币完全属于你。这是去中心化的基础。ADAMANT 在其 iOS 应用中已支持导出私钥一年，现在该功能已在所有平台上提供。

### 什么是私钥？

加密钱包地址是公开的，就像银行账户号码。ADAMANT 地址看起来像 `U4193701161843143990`，而以太坊地址看起来像 `0x8edbf571D2973ce211ad561299419238dcC69f43`。但只有私钥的所有者才能管理该账户。私钥是一段唯一代码，允许完全访问特定钱包。

此密钥可能以不同形式存在。在 ADAMANT 和 Lisk 中，它是一个由 12 个单词组成的助记词。在以太坊和比特币中，它是一串字符。

![只有你拥有私钥！](/images/engineering-notes/medium/b97da4ed012d/002-1-gia0n-uqgriaoa-ezm6-aa-png.webp)

如果你没有私钥，你就不是钱包的真正所有者。例如，你在加密货币交易所的钱包没有私钥，且无法在未经交易所许可的情况下提币。将加密货币转入交易所意味着信任第三方。请将所有私钥妥善保存。如果有人获取了你的私钥，他们将能支配你的资金。没有人会归还被盗的代币——这是自由和去中心化的代价。

### ADAMANT 中的钱包

登录 ADAMANT 时，你需要输入一个 12 个单词的助记词。基于该助记词，不同的算法会生成账户中所有其他钱包（包括以太坊和比特币）的私钥。ADAMANT 不会在网络上传输私钥，因此钱包持有者始终完全掌控自己的账户。使用内置钱包时，你无需知道每个钱包的独立密钥，因为它们都是由助记词派生而来。但如果你想在其他应用中访问这些钱包，则需要导出私钥。

### 导出私钥

ADAMANT 应用允许用户将其私钥导出，以便在 messenger 系统之外使用。例如，你可以通过 MyEtherWallet 访问你的以太坊和 ERC-20 钱包，或将导出的密钥作为备份保存。导出功能可在“设置”中找到。

![只有你拥有私钥！](/images/engineering-notes/medium/b97da4ed012d/003-0-gzswtnmhue8pesiw.webp)

只有你对自己的账户和钱包负责。只有你知道私钥。如果私钥泄露，第三方可能夺取相关资金。在这种情况下，请创建一个新的 ADAMANT 账户，以便系统生成新的助记词和新的密钥。

### 安全常见问题

**ADAMANT 开发者知道我的助记词和私钥吗？** 不知道。ADAMANT 账户、助记词和私钥均在你的设备上生成。如果你在 PC 上使用应用，它们就在 PC 上生成；在手机上使用，则在手机上生成。私钥永远不会离开你的设备。当你发起支付或发送消息时，只有已签名的交易会被发送到节点。这适用于 ADAMANT 内建的所有加密货币。

**如何验证 ADAMANT 不会将私钥发送到网络？** 源代码完全开源，可在 GitHub 上查看。

**我的助记词和私钥是否绝对无法被窃取？** 并非如此。如果你的设备被入侵，他人仍可能窃取密钥。例如：向第三方发送数据的浏览器扩展、记录所有按键的键盘记录器、扫描内存的病毒，或使用钓鱼 messenger 应用（例如 `msg.adamant.io` 而非 `msg.adamant.im`）。

**是否必须导出私钥？** 不需要。保存密钥会增加他人看到并窃取代币的风险。

**如果有人窃取了我内置钱包的私钥，他们也能访问我的 ADAMANT 消息吗？** 不能。导出的私钥仅能访问内置加密钱包。此外，如果攻击者窃取了一种加密货币的密钥（例如 Doge），他们也无法访问以太坊或 Dash 钱包。

**如果有人窃取了我的 ADAMANT 助记词，他们会获得所有内置加密钱包的访问权限吗？** 会。他们将能同时访问消息和钱包，因此保护助记词的机密性至关重要。

**助记词或私钥被盗了怎么办？** 创建一个新账户。如果旧账户上还有代币，请尽快将它们转移到新账户。

**导出的私钥可以在哪里使用？** ADAMANT 导出的密钥与多个第三方应用兼容。对于比特币，Electrum、Blockchain.com 以及任何支持 WIF 密钥格式的钱包均可使用。对于以太坊，支持 MyEtherWallet。对于 Doge，支持 MultiDoge。对于 Dash，支持 Dash Electrum。对于 Lisk，需要一个 API 节点；目前没有已知应用支持直接导入私钥，因为你无法从密钥反向生成助记词。
