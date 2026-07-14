---
title: "ADAMANT Pool v2.0.0 发布"
slug: "new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
description: "ADAMANT Pool v2.0.0 进行了完整的代码重写，专注于可靠性和性能。该版本使用 ADAMANT JS API v1.0.0，确保投票者准时准确获得奖励。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
publishedAt: "2021-06-19T14:05:48.039Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/aca713a5a3d6/001-0-nfjyvf39o49caqs7.webp"
cardSpan: "full"
originalId: "medium:aca713a5a3d6"
locale: "zh"
placeholder: false
---

ADAMANT Pool v2.0.0 引入了专注于可靠性和性能的完整代码重写。该池现在使用 ADAMANT JS API v1.0.0，确保投票者能够正确且及时地收到奖励。资源需求已显著降低；现在该池可以在配备 1 个 vCPU 和 512 MB 内存的虚拟机上运行。这一效率提升通过移除不必要的依赖、更新剩余依赖，并将 `request` 库替换为 `axios` 实现。

进行了多项配置更改。默认端口现为 36667，而非 36668。配置文件新增了 `log_level` 选项以及 `donatewallet` 参数，用于将部分奖励捐赠给 ADAMANT Foundation。现在可通过 `payoutperiod` 的“星期几”选项来安排支付周期。此外，投票交易手续费现由投票者支付，导致每笔奖励减少 0.5 ADM。运营者应调整 `minpayout` 参数，以确保支付金额相对于手续费仍保持合理。委托人生产力现已被计入奖励分发过程中。

其他更新包括代码重构、移除只读模式，以及为通知器添加 Markdown 功能。锻造池信息面板仪表盘的设计也已更新。

![New version of the forging pool software ADAMANT Pool v2.0.0](/images/engineering-notes/medium/aca713a5a3d6/002-0-vrmyfc6ou3ue0xnb.webp)

更新现有池时，建议删除旧版本并重新进行全新安装。但应保留包含交易历史的 `/db/transactions` 文件。
