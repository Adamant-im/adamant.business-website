---
title: "在 ADAMANT Messenger 和加密钱包中即时接收 DASH"
slug: "receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
description: "ADAMANT Messenger 2.12.0 版本支持 Dash InstantSend，DASH 转账可即时到账，无需等待网络确认。通常，加密货币转账需等待区块确认，但 Dash InstantSend 利用主节点验证交易并确保其被包含在后续区块中。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
publishedAt: "2021-08-04T13:23:12.613Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9cbe8401d6c0/001-0-omadd6rxri1q0dfd.webp"
cardSpan: "full"
originalId: "medium:9cbe8401d6c0"
locale: "zh"
placeholder: false
---

ADAMANT Messenger 2.12.0 版本引入了对 Dash InstantSend 的支持，使 DASH 转账能够即时到账，无需等待网络确认。通常情况下，加密货币转账需要等待区块确认，而 Dash InstantSend 则利用主节点来验证交易，并保证其被包含在后续的区块中。与此同时，此次更新还提升了其他已支持加密货币的交易状态更新速度。

此次发布还将 ADM 激励机器人直接集成到聊天中。该机器人可自动且即时地为已完成的任务发放奖励，目前支持 Twitter 活动。用户可向机器人发送 `/help` 命令以了解活动规则。

![在 ADAMANT Messenger 和加密钱包中即时接收 DASH](/images/engineering-notes/medium/9cbe8401d6c0/002-0-hofe2-yqoknm1e74.webp)

为确保代码的可靠性与安全性，本次更新将依赖项升级至无已知漏洞的版本。通过移除未使用的非英文 bip39 助记词列表，减小了应用程序体积。此外，内置加密钱包的加密密钥生成过程也得到了优化，通过种子缓存使新账户登录速度提升了约六倍。其他维护工作包括升级以太坊相关库、移除已弃用的 Atomars 交易所链接，以及多项错误修复。
