---
title: "ADAMANT Tradebot v6.1.0"
slug: "release-adamant-tradebot-v6-1-0-170709710"
description: "此版本改进了价格监视器并提升了整体可靠性。模块现会验证代币价格有效性，避免过时或错误数据影响交易决策。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.1.0"
publishedAt: "2024-08-17T09:45:28Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v6.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:170709710"
locale: "zh"
placeholder: false
---

此版本改进了价格监视器，并提升了整体可靠性。模块在继续执行前会验证代币价格是否有效，从而帮助防止过时或错误的数据影响交易决策。此外，还进行了额外的重构工作以提高整体稳定性。

新增了 `dev` 和 `clear_db` 设置，使操作人员能更灵活地控制开发和数据库管理流程。依赖项已更新至最新兼容版本，并修复了多个次要漏洞。新增了手动测试以补充现有测试覆盖范围，同时更新了 README，包含新的网站链接以及修订后的安装和使用指南。
