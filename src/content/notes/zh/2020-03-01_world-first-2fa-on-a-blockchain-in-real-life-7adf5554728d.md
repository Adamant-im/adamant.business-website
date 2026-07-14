---
title: "全球首个投入生产的基于区块链的双因素认证：Resfinex 上的 ADAMANT"
slug: "world-first-2fa-on-a-blockchain-in-real-life-7adf5554728d"
description: "双因素认证对保护资金至关重要，但并非所有2FA方法安全性相同。基于短信的2FA极易受到SIM卡交换攻击，而区块链2FA提供了更可靠的替代方案。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/world-first-2fa-on-a-blockchain-in-real-life-7adf5554728d"
publishedAt: "2020-03-01T07:19:10.858Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/7adf5554728d/001-0-hktm6vjfrwccv7kd.webp"
cardSpan: "full"
originalId: "medium:7adf5554728d"
locale: "zh"
placeholder: false
---

双因素认证对于保护资金至关重要，但并非所有2FA方法的安全性都相同。基于短信的2FA特别容易受到SIM卡交换攻击，已导致大量加密货币资产损失。基于区块链的2FA通过链上信使传递认证码，提供了更可靠的替代方案，完全消除了电信层面的攻击面。

### Resfinex 交易所上的 ADAMANT 2FA

Resfinex 加密货币交易所是基于区块链的2FA首个投入生产的实现案例，使用 ADAMANT Messenger 传递认证码。设置流程非常简单：用户进入安全设置，选择 ADAMANT Messenger 2FA 方式，并输入其将接收验证码的 ADAMANT 地址。新 ADAMANT 用户需要少量 ADM 代币以初始化账户。输入验证码和交易所密码后，2FA 即被激活。

![世界上首个在区块链上运行的2FA在现实生活中的应用](/images/engineering-notes/medium/7adf5554728d/002-0-xvtbn00u-d5nvyzb.webp)

![世界上首个在区块链上运行的2FA在现实生活中的应用](/images/engineering-notes/medium/7adf5554728d/003-0-necwvzuliwggpf2c.webp)

![世界上首个在区块链上运行的2FA在现实生活中的应用](/images/engineering-notes/medium/7adf5554728d/004-0-to4kuxsaixckgh5j.webp)

![世界上首个在区块链上运行的2FA在现实生活中的应用](/images/engineering-notes/medium/7adf5554728d/005-0-kexa5qysqrmab0vf.webp)

![世界上首个在区块链上运行的2FA在现实生活中的应用](/images/engineering-notes/medium/7adf5554728d/006-0-f1qr6w3udghq575k.webp)

![世界上首个在区块链上运行的2FA在现实生活中的应用](/images/engineering-notes/medium/7adf5554728d/007-0-a-sfwulbvejil2rl.webp)

启用后，登录、提币确认、密码修改、API密钥创建以及安全设置或其他敏感账户设置的更改均需要2FA验证码。

### 在您的服务中集成区块链2FA

任何服务提供商，包括交易所和金融机构，均可集成 ADAMANT 2FA。ADAMANT 是一个完全开源的项目，提供文档和实施指南。ADAMANT 2FA 演示应用的源代码位于 [GitHub](https://github.com/Adamant-im/adamant-2fa)，开发者可参考 [连接指南](https://medium.com/adamant-im/go-to-secure-2fa-on-a-blockchain-344500a5f010#db04) 进行集成。

![世界上首个在区块链上运行的2FA在现实生活中的应用](/images/engineering-notes/medium/7adf5554728d/008-0-1zqjg9sgj2eli5h5.webp)

![世界上首个在区块链上运行的2FA在现实生活中的应用](/images/engineering-notes/medium/7adf5554728d/009-0-wdowhqndtnflq0oy.webp)
