---
title: "ADAMANT Messenger 中的加密概述"
slug: "encryption-overview-in-adamant-messenger-878ecec1ff78"
description: "ADAMANT 采用与比特币、以太坊、Signal、Tor、OpenSSH 等相同且久经考验的加密算法。密码学本质上是保守的，每种加密算法都必须经受时间的考验。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/encryption-overview-in-adamant-messenger-878ecec1ff78"
publishedAt: "2021-02-20T08:36:23.523Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/878ecec1ff78/001-1-z7yxhckijxqq1g7m-pnbq-png.webp"
cardSpan: "full"
originalId: "medium:878ecec1ff78"
locale: "zh"
placeholder: false
---

ADAMANT 依赖于比特币、以太坊、Signal、Tor、OpenSSH 以及许多其他系统所使用的成熟加密算法。密码学本质上是保守的，每种加密算法都必须经受时间的考验。ADAMANT 的独特之处在于，区块链本身保证了去中心化、通过假名实现的匿名性、消息完整性与顺序性、永久存储、可靠传递，以及对中间人攻击的抵御能力。消息和交易由网络中的每个节点进行验证，而非由接收方或中心化机构验证。这种去中心化的代价是交易费用，用于补偿节点运营者。

### 账户与密钥对

一个 ADAMANT 账户始于一个包含 12 个单词的 BIP39 助记词，提供约 132 位熵值，涵盖约 2048¹² 种可能组合。BIP39 种子通过 SHA-256 哈希生成一个 256 位的值，从中派生出 Ed25519 数字签名密钥：一个 256 位的公钥和一个 512 位的私钥。这提供的安全性相当于使用约 3000 位密钥的 RSA 或强 128 位分组密码。面向用户的 ADM 地址是以 'U' 开头，后接公钥的 SHA-256 哈希值的前 8 字节，生成一个 64 位标识符。Ed25519 公钥会在用户的第一笔发出交易中发布到区块链上。

### 消息加密

对于加密消息，用户的 Ed25519 签名密钥会被转换为 Curve25519 Diffie-Hellman 密钥——一个 256 位的公钥和一个 256 位的私钥——从而实现双方之间的非对称加密。消息使用 Curve25519-XSalsa20-Poly1305 密码（NaCl.box）进行加密，该算法采用 XSalsa20 并搭配 192 位的 nonce，以及 Poly1305 实现认证加密，验证数据完整性和消息真实性。

### 键值存储（KVS）

对于键值存储，用户的 Ed25519 签名密钥用于派生一个 XSalsa20-Poly1305 密钥。数据被序列化为一个 JSON 对象并添加噪声，然后使用 NaCl.secretbox 进行加密，同样采用 XSalsa20（192 位 nonce）和 Poly1305 来验证完整性和真实性。

### 交易签名

交易数据——包括时间戳和任何加密消息——使用 SHA-256 进行哈希。发送方使用其 256 位公钥和 512 位私钥，通过 Ed25519 对该哈希值进行签名。交易 ID 是该签名的 SHA-256 哈希值的前 8 字节。

有关密钥生成、消息加解密以及交易签名的详细技术参考，可在 GitHub 上的 ADAMANT 项目 Wiki 中找到。

### 区块链存储与量子计算机

一些用户担心，将加密消息永久存储在链上会带来未来的安全隐患：一旦量子计算机成熟，是否所有已存储的通信内容都可能被回溯性解密？

这种担忧并非 ADAMANT 独有。量子密码分析威胁着整个 IT 领域——国家机密、互联网流量、存储数据——因为几乎所有现代系统都依赖于相同的密码学原语家族。像 PRISM 这样的大规模监控项目已经捕获并保留了网络流量，因此今天截获的加密数据，无论使用何种平台，未来都可能成为密码分析突破的目标。

量子密码分析并非万能钥匙。它仅对某些问题提供理论上的加速，但当前密码算法具有显著的安全裕度，可能使这些加速在实践中无效。此外，攻击者无法批量解密整个区块链；每个账户使用不同的加密密钥，因此必须逐个账户投入资源破解。由于 ADAMANT 账户是匿名的，攻击者首先需要确定哪些账户值得攻击。

实用的量子密码分析可能还需数十年才能实现，在此期间，密码学面临的主要威胁可能并非量子计算机。如果后量子密码算法变得必要，ADAMANT 可以调整其密码学方案，正如其他通信工具和协议一样。

为了操作安全，ADAMANT 最适合用于一次性或短期通信，并频繁切换账户。创建一个新账户仅需约一秒钟，这使得轮换身份变得切实可行，并限制了单个账户被攻破后的价值。
