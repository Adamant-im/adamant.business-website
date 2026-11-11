---
title: "ADAMANT mm Bot v10.0：面向代币项目的主权级自托管做市方案"
slug: "adamant-mm-bot-v10-0-launch-self-hosted-sovereign-market-making-for-your-token-in-5-minute-440f435ebf95"
description: "代币流动性难题：对于代币创始人而言，在中心化交易所上市后必须面对严酷的现实——缺乏流动性的代币等同于死亡。若无持续的流动性和可见的交易量，项目将失去聚合器排名，套利机器人会拉大买卖价差，散户也会因滑点过高而离场。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-mm-bot-v10-0-launch-self-hosted-sovereign-market-making-for-your-token-in-5-minutes-440f435ebf95"
publishedAt: "2026-11-11T07:09:05.209Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:440f435ebf95"
coverImage: "/images/engineering-notes/medium/440f435ebf95/001-9e1cee5966.webp"
locale: "zh"
placeholder: false
---

## 代币流动性难题

对于代币创始人而言，在中心化交易所上市后必须面对严酷的现实——缺乏流动性的代币等同于死亡。若无持续的流动性和可见的交易量，项目将失去聚合器排名，套利机器人会拉大买卖价差，散户也会因滑点过高而离场。传统的应对方式是聘请做市商机构，支付每月 5,000 美元至 30,000 美元甚至更高的固定费用，并将代币和稳定币的托管权移交给第三方账户。已有太多项目遭遇过国库代币被抛售，或做市商在市场动荡期间“跑路”的情况。

另一种选择是主权级自托管做市。借助 ADAMANT TradeBot v10.0.0，您可以在每月 5 美元的 VPS 或 Docker 容器中运行机构级、全自动化的做市机器人，整个过程不到五分钟，且无需将代币托管给任何人。

## 非托管设计

核心理念是实现完全的财务主权。ADAMANT TradeBot 完全运行在您自己的单租户环境中。机器人仅需基本的读取和交易 API 权限；提现权限被严格禁用且禁止使用。您无需向 ADAMANT、任何机构或智能合约发送代币或稳定币。代币始终保留在您的交易所账户中，所有订单计算、算法价差和余额对账均在本地执行。您可以通过 ADAMANT Messenger 界面或 WebUI API 随时修改价差、目标交易量和价格区间。

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR INFRASTRUCTURE                      │
│            ($5/mo VPS, Private Server, or Docker)           │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                 ADAMANT mm bot                      │   │
│   │  [ Trader ]   [ OrderBook ]  [ Liquidity ]  [ Watcher]│ │
│   └──────────────────────────┬──────────────────────────┘   │
└──────────────────────────────┼──────────────────────────────┘
                               │ API Keys
                               │ (Trade Permissions ONLY)
                               │ ❌ No Withdrawal Access
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     CENTRALIZED EXCHANGE                    │
│     (Gate, Coinstore, XT, NonKYC, MEXC, etc.)               │
│                                                             │
│  🔒 Tokens never leave your exchange account                │
│  📊 Orders placed directly via signed REST / WebSocket      │
└─────────────────────────────────────────────────────────────┘
```

## 四大算法引擎

开源版本内置了四个同步运行的引擎，共同处理做市的各个维度。

**交易引擎 (Trader)**：通过在价差或订单簿深度内执行自成交，生成持续且自然的交易量，使项目在 CoinMarketCap 和 CoinGecko 等聚合器上保持活跃，且不会造成资金流失。

**订单簿构建引擎 (Order Book Builder)**：持续挂出、调整并替换分层买单和卖单，构建出深度充足、外观真实的订单簿，具有自然的波动性，避免了二级交易所常见的“空梯”现象。

**流动性提供引擎 (Liquidity Provider)**：保护订单簿免受滑点影响，根据可用余额计算最优流动性分布，并在您定义的价差百分比内挂出深度订单，确保社区买家和卖家获得公平的执行价格。

**价格监控引擎 (Price Watcher)**：监控 Binance、DEX 或主要交易对等参考市场的代币价格。若外部价格波动，它会自动调整本地价格边界和订单区间，防止您的流动性因跨交易所套利而被耗尽。

## v10.0.0 版本更新内容

10.0.0 版本是该项目历史上架构变动最大的版本，重点提升了企业级可靠性、安全性和供应链完整性。

**并发安全迭代锁定**：解决了高频机器人中导致重复订单和状态不同步的最常见原因：重叠执行周期。v10.0 引入了 `helpers/moduleIteration.js`，实现了严格的锁定机制。如果某次迭代正在等待交易所 API 响应，下一次执行周期将被平滑推迟而非并发执行，且迭代会通过 `finally` 块安全地重新调度，确保机器人在短暂的网络中断期间不会挂起或崩溃。

**Azbit 连接器**：已完全重写。现在使用带有微秒级时间戳的原生 HMAC-SHA256 签名生成方式，遵循 Azbit 最小变动单位 (lot) 和价格精度 (tick) 规范，支持即时余额缓存失效，并在 API 限流时具备强大的错误恢复能力。

**非活跃保护机制 (Inactivity Guard)**：防止主机服务器重启或断网导致机器人离线，而市场价格发生剧烈波动的情况。启动时，它会检查心跳时间戳；如果停机时间超过您的安全阈值，它将触发安全模式，防止执行过期的陈旧订单。

**结构化日志轮转**：使用 Winston 进行每日轮转，支持自动 gzip 归档、可配置的保留策略以及脱敏日志记录，确保 API 密钥绝不会泄露到日志文件中。

**端到端供应链安全**：完善了此版本的安全性。发布到 GitHub Container Registry 的 Docker 镜像包含 Sigstore 来源证明，npm 包通过 OpenID Connect 可信发布机制发布，并在 npmjs.com 上提供完整的构建来源证明。

## 部署方式

部署过程非常简单，可通过全局 npm CLI 或 Docker 完成。

对于 CLI 方式，请确保已安装 Node.js 22+，然后运行安装、初始化和启动命令：

```
# 1. Install the bot globally
npm install -g adamant-tradebot

# 2. Initialize your configuration
mm init

# 3. Configure your exchange API keys & token pair
nano config/config.default.jsonc

# 4. Start the market maker
mm start

# 5. Check live status
mm status
```

对于 Docker，拉取并运行经过来源验证的容器：

```
docker run -d \
  --name adamant-tradebot \
  --restart unless-stopped \
  -v $(pwd)/config:/app/config \
  -v $(pwd)/logs:/app/logs \
  ghcr.io/adamant-im/adamant-tradebot:10.0.0
```
