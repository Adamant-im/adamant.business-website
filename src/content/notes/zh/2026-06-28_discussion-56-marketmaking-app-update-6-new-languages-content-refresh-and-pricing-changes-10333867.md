---
title: "marketmaking.app 更新：新增语言、内容优化及定价调整"
slug: "discussion-56-marketmaking-app-update-6-new-languages-content-refresh-and-pricing-changes-10333867"
description: "cryptofoundry 对 marketmaking.app 进行了重大更新，新增六种语言，优化免费基础机器人定位，更新文档并改进用户体验。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/56"
publishedAt: "2026-06-28T14:14:24Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10333867"
locale: "zh"
placeholder: false
---

## 概述

cryptofoundry 对 marketmaking.app 进行了一次重大更新，新增六种语言，优化了面向代币发行方的免费基础机器人的定位，更新了文档，并进行了多项用户体验改进。

## 语言

网站现在支持八种语言。除原有的英语和俄语外，cryptofoundry 新增了中文（简体）、西班牙语、阿拉伯语（RTL）、法语、日语和德语。所有主页面均从英文翻译而来，在需要时以俄语作为参考。页眉、模态菜单、联系按钮、语言切换器、导航链接和标志现在均指向正确的本地化 URL。

## 内容与定位

“什么是做市”部分现已与当前 ADAMANT tradebot 的 README 概念保持一致，强调为代币发行方提供免费基础版本，同时提供高级模块和服务。安装、快速入门和免费做市机器人页面已审查并更新。命令参考文档已与机器人代码库同步，以添加新命令并修正过时的描述。

高级功能进行了调整：移除了“禁止对敲交易”模块，新增了“余额监控”和“永续交易”（期货）模块。美元价格已替换为“Request”链接，点击后将打开联系弹窗。服务页面不再列出固定价格或关于提供交易所 API 密钥的说明，首页也从“订购演示”部分移除了 $800 的演示价格。英文和俄文文本中的各类语法错误、失效链接和过时日期均已修复。

## 联系与用户体验

现在可通过 `#contact` 锚点从任意页面打开联系模态框，例如 `/cex-mm/free-market-making-bot/#contact`。Telegram 已作为第三种联系方式加入，可通过 @adamant_business 联系。

## 基础设施

服务器和 WordPress 技术栈已更新，包括 Ubuntu 软件包、PHP、MySQL、WordPress 核心、Polylang、Insert PHP 和 WP Rocket。迁移后已移除 Duplicator。更新前后均进行了完整备份。

![Discussion screenshot 1](/images/engineering-notes/github/discussions/10333867/001-007bf37e.webp)
