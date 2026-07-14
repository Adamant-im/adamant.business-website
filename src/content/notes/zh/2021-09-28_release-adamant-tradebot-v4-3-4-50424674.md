---
title: "ADAMANT Tradebot v4.3.4"
slug: "release-adamant-tradebot-v4-3-4-50424674"
description: "此版本新增支持 P2PB2B 交易所并移除 Atomars 交易所。机器人现在在可能的情况下直接从交易所获取小数位数和交易对信息…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v4.3.4"
publishedAt: "2021-09-28T20:06:30Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v4.3.4"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:50424674"
locale: "zh"
placeholder: false
---

此版本新增支持 P2PB2B 交易所并移除 Atomars 交易所。机器人现在在可能的情况下直接从交易所获取小数位数和交易对信息，从而提高下单和余额计算的可靠性。

依赖项已更新，包括采用 ADAMANT JS API v1.1.0。命令已更新，项目中新增了 ESLint，并伴随通用代码重构。

现在可向多个地址发送通知。余额和订单按每个发送方单独保存，确保多用户场景下的状态管理更加清晰。
