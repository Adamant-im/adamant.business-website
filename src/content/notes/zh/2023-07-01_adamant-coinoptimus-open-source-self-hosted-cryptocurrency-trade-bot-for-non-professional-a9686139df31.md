---
title: "ADAMANT CoinOptimus：开源自托管的加密货币交易机器人"
slug: "adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-a9686139df31"
description: "ADAMANT CoinOptimus 是一款自托管的加密货币交易机器人，面向希望实现自动化交易但不愿将密钥交给第三方服务的非专业交易者。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-traders-a9686139df31"
publishedAt: "2023-07-01T12:39:55.877Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/a9686139df31/001-0-ygfhry-dhfu9rszm.webp"
cardSpan: "full"
originalId: "medium:a9686139df31"
locale: "zh"
placeholder: false
---

ADAMANT CoinOptimus 是一款自托管的加密货币交易机器人，面向希望实现自动化交易但不愿将密钥交给第三方服务的非专业交易者。由于它运行在您自己的服务器上，注重隐私的用户可以完全掌控交易所 API 凭据。该机器人也适合普通加密爱好者，同时得益于其阶梯/网格策略，也适用于希望填充订单簿并提高流动性的项目方或做市商。

该机器人基于 Node.js 构建，并持续运行在 VPS 上。您在 `config.jsonc` 文件中配置目标交易所和交易对，提供交易所 API 密钥（建议仅限交易权限，无提币权限），并通过 ADAMANT Messenger 发送带斜杠前缀的命令来管理机器人。实时交易通知可发送至 ADAMANT Messenger、Slack 和 Discord。从首个版本起，CoinOptimus 即支持 Binance、Bitfinex、P2PB2B、Azbit 和 StakeCube。

### 阶梯/网格策略

CoinOptimus 主要采用最优阶梯/网格策略。机器人从价差开始设置多个买入和卖出订单。当最近的订单成交后，它会在相反方向挂出匹配的订单，遵循“买入价低于卖出价，卖出价高于买入价”的原则。这种策略在波动性较大的市场中表现最佳。

![ADAMANT CoinOptimus: Open-source Self-Hosted Cryptocurrency Trade Bot for Non-Professional Traders](/images/engineering-notes/medium/a9686139df31/002-0-tfo-ftrmwbt1zl7r.webp)

![ADAMANT CoinOptimus: Open-source Self-Hosted Cryptocurrency Trade Bot for Non-Professional Traders](/images/engineering-notes/medium/a9686139df31/003-0-2twg79hid4ph-cia.webp)

### 安装与配置

CoinOptimus 支持 Ubuntu 18–22 和 CentOS 8，依赖 Node.js v16+ 和 MongoDB v6+。安装需克隆 [GitHub 仓库](https://github.com/Adamant-im/adamant-coinoptimus) 并运行 `npm install`。配置通过 `config.jsonc` 文件完成，您需在其中指定机器人的 ADAMANT 密钥、允许发送命令的管理员账户地址、交易所信息及 API 密钥。通过 git 更新源码时，请检查默认配置中的变更，并将其同步至您的 `config.jsonc` 文件，然后重启机器人。

### 通过 ADAMANT Messenger 使用

该机器人使用由公钥地址标识并由 12 词密钥保护的 ADAMANT 区块链账户。安装后，您可通过 ADAMANT Messenger 发送命令。例如，`/buy ADM/USDT amount=200 price=0.005` 将以 0.005 USDT 的价格买入 200 ADM。要启动包含 6 个订单、3% 价格步长、每单约 100 USDT 的阶梯策略，请使用 `/start ld 100 USDT 6 3%`。完整命令参考请见 [CoinOptimus Wiki](https://github.com/Adamant-im/adamant-coinoptimus/wiki)。

![ADAMANT CoinOptimus: Open-source Self-Hosted Cryptocurrency Trade Bot for Non-Professional Traders](/images/engineering-notes/medium/a9686139df31/004-0-jinplg771dicgjt7.webp)

### 免责声明

CoinOptimus 并非稳赚不赔的机器。使用风险自负。
