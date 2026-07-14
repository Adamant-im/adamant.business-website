---
title: "ADAMANT：超越基础通信——多代币转账与隐私"
slug: "adamant-project-is-more-ambitious-than-you-thought-bcff97b3e65f"
description: "ADAMANT 开源项目已开发出支持即时私密通信和 ADM 代币转账的信使应用。开发团队现正致力于扩展平台以支持多代币转账功能。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-project-is-more-ambitious-than-you-thought-bcff97b3e65f"
publishedAt: "2018-06-02T12:39:07.116Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/bcff97b3e65f/001-0-no5snmhgxset6lqg.webp"
cardSpan: "full"
originalId: "medium:bcff97b3e65f"
locale: "zh"
placeholder: false
---

ADAMANT 开源项目已开发出支持即时私密通信和 ADM 代币转账的信使应用。开发团队现正致力于扩展平台，以支持在私密聊天中进行多代币转账，目标是允许用户直接通过信使应用发送和接收比特币、以太坊和 Lisk 等加密货币。

ADM 代币是平台经济体系的基础。它作为消息通信和支付的转账手续费，用于维护网络基础设施。凭借 5 秒的区块时间，ADM 实现了快速交易，并可直接从聊天界面发起支付。ADM 运行在一个完全独立且自给自足的代币系统之上。

![ADAMANT 项目比你想象的更具雄心。](/images/engineering-notes/medium/bcff97b3e65f/002-0-8ofcnhmzjqjcc-p8.webp)

将主流加密货币整合进转账生态系统，旨在吸引这些社区的用户加入 ADAMANT Messenger 平台，从而产生更高的手续费收入，并提升对 ADM 的需求。

## 隐私架构

ADAMANT 是一个基于 Lisk 代码库构建的安全区块链平台，用于数据和消息传输。该区块链提供匿名性，防止用户聊天记录被追踪。与那些将个人数据收集并存储在易受攻击的第三方服务器上的中心化社交网络不同，ADAMANT 仅需一个私钥即可使用系统，且私钥可一键生成。

用户无需提供姓名、电子邮件地址、电话号码或设备信息。开源代码库允许任何人审计系统的真实性，并构建独立的实现版本。

核心隐私功能包括：无法访问用户通讯录或位置信息、完全匿名且无需用户身份标识、端到端加密（消息在发送方设备上加密，在接收方设备上解密）。客户端应用在本地执行所有加密操作，绝不会通过网络传输私钥或助记词。消息历史直接从区块链加载，而非本地存储；与 P2P 信使不同，无法获取用户 IP 地址。ADAMANT 账户无法被任何人（包括开发人员）关闭、封锁或限制。

ADAMANT 证明了区块链信使在开放性、消息保护、分发机制和可靠基础设施方面的优势，能够在无第三方干预或监管的情况下提供匿名通信。
