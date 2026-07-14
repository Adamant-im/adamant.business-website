---
title: "将区块链设置为 OTP 2FA 提供商"
slug: "set-up-blockchain-as-an-otp-2fa-provider-f87575c27175"
description: "ADAMANT 是一个去中心化消息基础设施，包含区块链、浏览器、带加密钱包的消息应用、兑换器、锻造池软件、悬赏机器人、OTP 2FA 服务等。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/set-up-blockchain-as-an-otp-2fa-provider-f87575c27175"
publishedAt: "2022-12-18T15:14:19.999Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f87575c27175/001-1-g0bpvqabqrk2sobncqoicw-png.webp"
cardSpan: "full"
originalId: "medium:f87575c27175"
locale: "zh"
placeholder: false
---

ADAMANT 是一个去中心化消息基础设施，包含区块链、浏览器、带加密钱包的消息应用、兑换器、锻造池软件、悬赏机器人，以及 OTP 2FA 服务提供商。OTP 2FA 使用一次性密码作为登录网站和服务（如加密货币交易所、电子邮件提供商、托管钱包和社会账户）的额外安全层。ADAMANT 是首个通过区块链传递一次性密码的 2FA 提供商。

基于区块链的 2FA 的核心优势是去中心化。传统 OTP 提供商依赖中心化服务器或短信网关，两者都可能被攻破或下线。相比之下，ADAMANT 的 2FA 服务通过其自有区块链网络传递验证码，这意味着没有单点故障，也没有可能拦截或延迟身份验证消息的第三方中介。

要试用该服务，首先创建一个 ADAMANT Messenger 账户，您将在此接收 2FA 验证码。然后运行 2FA 演示应用程序，并使用任意常规登录名和密码注册一个新账户。登录后，点击“启用 2FA”并输入您的 ADAMANT 地址。按下“获取 2FA 验证码”按钮，一个 2FA 验证码将被发送到您的 ADAMANT Messenger。输入此验证码并点击“验证”。启用后，重新登录将需要输入 2FA 验证码，从而演示完整的身份验证流程。

网络服务提供商可集成 ADAMANT 2FA 以增强用户账户安全性。该服务为开源设计，可嵌入现有身份验证工作流中，适用于需要第二因素的场景。
