---
title: "ADAMANT：面向企业的区块链"
slug: "adamant-is-a-blockchain-for-business-d1dec3dc188a"
description: "ADAMANT 是一个开源区块链平台，专为中小型企业与社区设计，集成了区块链与安全通信环境。企业区块链通常成本高昂，而 ADAMANT Business 可免费授权、开源且部署维护成本低。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-is-a-blockchain-for-business-d1dec3dc188a"
publishedAt: "2020-03-19T17:03:28.381Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/d1dec3dc188a/001-1-d3-fcbis82dcnsuwwaskja-png.webp"
cardSpan: "full"
originalId: "medium:d1dec3dc188a"
locale: "zh"
placeholder: false
---

ADAMANT 是一个开源区块链平台，专为中小型企业与社区设计，将区块链与安全通信环境集成在一起。尽管企业级区块链的实施成本通常堪比 ERP 系统，ADAMANT Business 却可免费授权、开源，并专为低成本部署与维护而设计。

### 企业为何需要区块链

区块链可提升透明度、优化流程可见性并降低成本。它使组织能够在地理上分布的多个位置存储经过认证的数据副本——无论是产品数据、交付记录还是财务信息。部门之间可实现即时结算，不受距离限制，避免了传统货币转账的延迟与手续费。供应链追踪可确保产品从生产到最终消费者全过程的质量。由于不再需要中间机构、手工账本及相关人员，交易成本显著下降。区块链还内置加密机制，意味着数据默认即被加密，无需额外支出。

### ADAMANT Business 功能特性

ADAMANT Business 提供区块链、企业内部代币以及安全通信解决方案。该平台免费、易于安装且维护成本低廉。它采用公平的 dPoS 共识机制，仅需三个节点即可运行，且可在配备单核 CPU 的虚拟机上运行。默认出块时间为五秒，也可配置为更短。由于 ADAMANT 使用 JavaScript 编写，为特定功能寻找开发人员非常容易。许可证允许免费内部使用，但禁止销售基于 ADAMANT 构建的服务、创建公开的分叉项目或公开销售代币。

除了区块链本身，ADAMANT 还具备消息平台功能。组织可获得一个内部通信工具，能够发行一种或多种内部代币用于内部结算、奖励机制或工时记录，并支持在聊天中直接收发比特币、以太坊和 Dash 等加密货币。组织可自行设定其内部代币与其他加密货币之间的汇率。其他功能还包括双因素认证、投票服务、通知邮件推送以及机器人支持。

该区块链消息系统提供强大的安全保证。每条消息均为使用 Ed25519 EdDSA 签名的交易，可防止中间人攻击。消息被写入区块，其顺序与时间戳不可篡改，从而杜绝消息抵赖。端到端加密为默认配置，对话可在任意设备上恢复而无需本地存储。消息的送达由节点系统确认。

### 部署选项

企业可通过三种方式使用 ADAMANT：在公共网络上运行、部署连接至公共网络的节点，或创建独立的私有网络。前两种方式仅适用于评估用途。完整的生产环境使用必须采用独立网络。

![ADAMANT is a Blockchain for Business](/images/engineering-notes/medium/d1dec3dc188a/002-1-bzfitphwhrwpmg1ax0ih0a-png.webp)

### 快速入门

首先，明确您希望使用区块链完成哪些任务，以及除消息外还需要存储哪些数据。可先在公共网络上试用 ADAMANT 应用以熟悉平台，然后思考内部代币与自定义服务如何融入组织的工作流程。

创建私有的 ADAMANT Business 区块链需要专业技术人才。相关文档与指南已公开提供，所有源代码均为开源。组织需要 Fork 相关的 ADAMANT 仓库，以部署属于自己的区块链。

![ADAMANT is a Blockchain for Business](/images/engineering-notes/medium/d1dec3dc188a/003-1-j8cryzu1yl05co9wzhcm9a-png.webp)

![ADAMANT is a Blockchain for Business](/images/engineering-notes/medium/d1dec3dc188a/004-1-vt41xwzpvkonbglaf7n-lg-png.webp)
