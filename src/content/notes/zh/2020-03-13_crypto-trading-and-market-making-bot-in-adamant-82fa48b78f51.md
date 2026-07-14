---
title: "ADAMANT 中的加密交易与做市机器人"
slug: "crypto-trading-and-market-making-bot-in-adamant-82fa48b78f51"
description: "ADAMANT 交易机器人支持多种加密货币交易所，可用于手动或自动交易，当前重点是填充订单簿和生成交易量。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/crypto-trading-market-making-bot-in-adamant-82fa48b78f51"
publishedAt: "2020-03-13T11:21:13.547Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/82fa48b78f51/001-0-o1ekf2vkjogaqiht.webp"
cardSpan: "full"
originalId: "medium:82fa48b78f51"
locale: "zh"
placeholder: false
---

ADAMANT 交易机器人支持多种加密货币交易所。它可用于手动或自动交易，目前的重点是填充订单簿和生成交易量，而非投机性盈利。

### 对交易机器人的合理预期

交易机器人并不能保证盈利。成功的概率大致是五五开，任何声称机器人必定产生利润的说法都不够诚实。公司之所以出售交易机器人而不是自己用它交易，是因为无论使用机器人还是手动操作，加密货币交易都存在重大风险。ADAMANT 机器人的以盈利为导向的交易功能目前较为有限；其主要用例是做市（market making）。

### 为什么做市很重要

加密货币交易所的大量交易量是人为制造的。在较小交易所上市的小型代币项目面临零交易量的问题，因为即使是顶级币种也难以吸引足够交易量。如果没有可见的交易量，用户就不愿购买，其他交易所也不会考虑上线该代币。因此，项目方必须自行创造交易量并填充订单簿，同时支付交易所手续费。

### 机器人如何工作

该交易机器人是一个持久运行的服务器端程序。安装后，您需要配置目标交易所和交易对。机器人会监听传入的命令，按照您设定的策略执行交易，并对所有操作发送通知。命令通过 ADAMANT Messenger 发送，这意味着您需要两个 ADM 账号：一个作为管理员的个人账号，另一个是机器人的账号。

### 入门要求

您需要具备 Linux 和 Node.js 的基础知识，并拥有一台来自任意云服务商的最低配置虚拟服务器。运行完整的 ADAMANT 节点并非必需。您必须创建两个 ADAMANT 账号：您的个人账号，其地址填入 `admin_accounts` 配置字段；以及机器人的账号，其 `passPhrase` 需设置在配置文件中。每向机器人发送一条消息需花费 0.001 ADM，而通过 ADAMANT 悬赏计划可获得足够多年使用的免费 ADM 代币。

在交易所方面，您需要在交易所的 API 设置中为其账户创建 API 密钥。为交易所上的交易对余额充值，并确保所选交易对的订单簿中至少包含一个买盘和一个卖盘，然后再启动机器人。最后，安装机器人，调整配置文件并运行它。

### 命令

机器人通过 ADAMANT Messenger 接收命令。使用 `/help` 查看可用命令，并参考完整的命令参考文档了解详情。

![Crypto trading & Market making bot in ADAMANT](/images/engineering-notes/medium/82fa48b78f51/002-0-mvxlgzjz2pq3e6dl.webp)

### 安装与源码

该机器人是开源的，安装说明可在 GitHub 上获取。项目官网为经验较少的用户提供了详细的设置指南。

加密货币交易涉及重大风险。您需独自承担所有交易决策的责任。ADAMANT 还提供适用于其他用例的其他机器人。
