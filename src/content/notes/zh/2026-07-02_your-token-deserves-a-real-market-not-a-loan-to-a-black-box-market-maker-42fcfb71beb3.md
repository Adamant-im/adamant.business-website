---
title: "使用 ADAMANT v9.0.0 为已上架 CEX 的代币实现自托管做市"
slug: "your-token-deserves-a-real-market-not-a-loan-to-a-black-box-market-maker-42fcfb71beb3"
description: "CEX 上币后，代币发行方常面临订单簿稀薄、价差大等问题。传统方案需出借代币并共享 API 密钥……"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/your-token-deserves-a-real-market-not-a-loan-to-a-black-box-market-maker-42fcfb71beb3"
publishedAt: "2026-07-02T07:55:48.528Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/42fcfb71beb3/001-1-abbad98f8omjn6vedmkhag-png.webp"
cardSpan: "full"
originalId: "medium:42fcfb71beb3"
locale: "zh"
placeholder: false
---

上架中心化交易所（CEX）后，代币发行方常常面临订单簿稀薄、买卖价差大，以及小笔交易就剧烈波动价格的图表问题。传统解决方案是将代币借给第三方做市商，并与其共享 API 密钥，而该做市商运行在不透明的基础设施上。ADAMANT 做市软件 v9.0.0 提供了一种替代方案：一种可自行托管、自主控制的做市系统，像普通软件一样安装即可使用——无需 git clone，也无需移交资产控制权。

### 模式：自托管、自控制

传统的做市通常涉及将代币发送给第三方，共享 API 密钥给一个黑箱系统，并希望订单簿看起来健康——同时还要确保能收回资产。ADAMANT 颠覆了这一模式，让你在自己的服务器上运行做市系统，使用自己的交易所账户和自己的密钥。

![你的代币值得一个真正的市场——而不是借给黑箱做市商](/images/engineering-notes/medium/42fcfb71beb3/002-1-ej9ccmio-dhslxvzftc6xw-png.webp)

托管型做市与 ADAMANT 做市软件的对比

### v9 对你的图表有何帮助

免费开源版本专注于上币后最紧迫的问题。它通过填补订单簿空缺，防止市场显得冷清；维持更窄的买卖价差，避免给用户留下负面第一印象；并提供足够的深度，防止小笔交易引发价格剧烈波动。它会监控你定义的价格区间，并在价差、订单簿、深度和最优模式下应用交易量策略。监控过程完全透明——通过基于命令的控制，你可在 ADAMANT Messenger 中查看余额、订单和统计数据，默认情况下不暴露任何公共管理面板。

开源版本支持的 CEX 连接器包括 Azbit、P2PB2B、StakeCube、Coinstore、FameEX 和 NonKYC。其他交易所可通过高级版或定制连接器支持。

### 快速开始（npm 方式）

你需要一台 Linux 服务器或 Mac（或任何支持 npm 的设备）、Node.js 22+、MongoDB，以及你自己的交易所账户 API 密钥。

![你的代币值得一个真正的市场——而不是借给黑箱做市商](/images/engineering-notes/medium/42fcfb71beb3/003-1-duiackkmcteg8he9ccmqdq-png.webp)

官方 npm 仓库

全局安装包并创建工作目录：

```bash
npm install -g adamant-tradebot
mkdir my-mm && cd my-mm
```

CLI 命令为 `mm`。使用交互式向导配置机器人，然后运行健康检查：

```bash
mm init    # interactive wizard - exchange, pair, API keys
mm doctor  # checks config, MongoDB, exchange API
```

代币不会离开你的交易所账户去资助做市商。你只需将 API 凭据连接到你自己机器上的机器人。启动并检查状态：

```bash
mm on
mm status
```

从你的 ADM 管理账户向机器人发送 `/balances`，即可开始运行。随时使用 `mm off` 停止，使用 `mm logs` 查看日志。

### Docker 替代方案

你也可以从 GitHub 容器注册表（GHCR）拉取已发布的镜像：

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

MongoDB 通过 Compose 与应用一同运行，配置和日志保存在你控制的本地卷中。

### 为什么 v9 是一个里程碑

在 v9 之前，启动需要手动克隆代码仓库并自行配置依赖——这对开发者可行，但对只想拥有更健康订单簿的创始人来说存在使用门槛。v9.0.0 实现了真正的标准化分发，通过 npm 和 GHCR 发布，提供带有 `init`、`on`、`off`、`doctor`、`status`、`logs` 和 `config` 命令的 `mm` CLI 工具，每次 GitHub 发布都通过 CI 自动发布 npm 和 Docker 镜像，重构了交易引擎，涵盖交易员、订单簿构建器、流动性提供者和价格监控模块，并附带 Jest 测试套件和完整文档。

ADAMANT 是一个拥有十年公开开发历史的开源加密项目。

### 适用对象

本软件面向那些在 CEX 上币后订单簿薄弱或空缺的代币发行方，无法承担六位数费用加代币出借的团队，不愿将密钥交给不透明第三方的创始人，以及追求透明度的项目方——能够阅读代码、查看日志，并掌握终止开关。高级策略、Web UI、更多交易所支持或人工部署支持可通过高级模块获得。免费开源版本本身已具备实际可用价值。

### 关于责任的说明

做市行为必须遵守交易所规则和适用法律。ADAMANT 提供的是软件，而非代表你进行资产托管或交易执行。你负责配置、运行，并对软件的使用方式承担全部责任。
