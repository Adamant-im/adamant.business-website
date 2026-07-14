---
title: "推出 ADM-Payment：面向支付、订阅和软件授权的加密优先平台"
slug: "introducing-adm-payment-a-crypto-first-platform-for-payments-subscriptions-and-software-46b6f4ec4e95"
description: "ADM-Payment 是一个通用的、加密优先的自托管平台，用于支付、订阅和软件许可证管理，专为 Web3、SaaS 和自托管工具设计。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/introducing-a-payment-a-crypto-first-platform-for-payments-subscriptions-and-software-licensing-46b6f4ec4e95"
publishedAt: "2026-06-10T16:33:29.168Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/46b6f4ec4e95/001-1-ikwbquslxdsnxlvmcfgy5a-png.webp"
cardSpan: "full"
originalId: "medium:46b6f4ec4e95"
locale: "zh"
placeholder: false
---

### 推出 ADM-Payment

软件变现不应依赖于一连串脆弱且相互割裂的服务。对于许多产品——尤其是在 Web3、交易、SaaS、自动化和自托管基础设施领域——真正的挑战不仅仅是接收付款，而是管理完整的商业流程：身份验证、结账、计费逻辑、订阅、许可证发放、许可证验证、管理操作、用户管理、续订、试用以及产品访问控制。

ADAMANT Payment（*ADM-Payment*）是一个通用的、加密优先的自托管平台，用于支付、订阅和软件许可证管理。目前该平台作为进行中的项目发布，并已提供可用的测试版本。该平台被设计为一个独立产品，不与 ADAMANT Messenger 或任何单一应用绑定。首个内部集成目标是 ADAMANT Tradebot WebUI 的订阅功能，但该平台的设计适用于更广泛的产品，包括机器人、SaaS 平台、桌面应用、Web3 服务、私有工具、商业 API 以及自托管软件。

### 为何构建 ADM-Payment

大多数现代软件变现技术栈最初都是围绕传统法币支付设计的。这对许多企业来说是可行的，但当产品本身是加密原生、全球部署、自托管、注重隐私，或面向偏好不依赖传统银行通道的用户时，这种模式就会显得局限。典型的设置可能需要多个独立服务来处理身份验证、支付、订阅和许可证密钥，外加用于产品访问的自定义脚本、从零构建的管理面板，以及 Webhook、回调、数据库胶水代码和人工支持流程。

ADM-Payment 将这些组件整合到一个连贯的平台中。产品所有者可以定义套餐、接受加密支付、发放许可证、管理用户，并允许外部软件通过 API 验证访问权限——而无需反复重建整个变现层。

### 核心模块

该平台将身份验证、计费、加密支付、试用与付费许可证、订阅、促销及手动许可证、面向用户的网页门户、管理仪表板、许可证验证 API、产品品牌化、国际化以及运营安全功能集成在一个可自托管的解决方案中。

支付功能从设计上就是加密优先，而非后期附加功能。当前支持范围包括通过自托管的 BTCPay Server 接受比特币支付、使用唯一存款地址并通过链上监控实现原生 ADAMANT 支付，以及用于测试流程的开发用支付提供方。架构设计允许未来在不重写计费核心的情况下，添加更多支付提供方（如以太坊、ERC20、稳定币等）和区块链。

![使用以太坊钱包登录](/images/engineering-notes/medium/46b6f4ec4e95/002-1-uvvnwb38hzdf94wtr5rkra-png.webp)

![接受加密货币支付](/images/engineering-notes/medium/46b6f4ec4e95/003-1-18j1i2bwffpurrfyebeoqg-png.webp)

对于用户，ADM-Payment 提供清晰的 Web 界面用于登录、浏览目录、结账和管理许可证。对于产品所有者，它提供管理仪表板以管理账户、许可证、发票、钱包、套餐和访问权限。对于外部软件，它提供基于 API 的许可证验证，使机器人、SaaS 后端、中继、桌面应用或其他产品能够以编程方式检查用户是否拥有有效访问权限。

### 目标使用场景

ADM-Payment 是一个变现层，而不仅仅是一个支付页面。它特别适用于需要基于许可证访问、订阅计划、按市场或交易所限制以及私有部署的交易机器人和自动化工具。交易机器人开发者可以创建 Basic、Pro 或 Enterprise 等套餐；用户以加密货币支付，获得许可证，机器人则通过 API 验证访问权限。许可证可按产品特定参数（如交易所和交易对）进行范围限定，从而实现比简单“已付费/未付费”模型更精确的访问控制。

对于拥有加密原生用户的 SaaS 产品，ADM-Payment 提供了一种接受加密支付、管理订阅并控制访问的方式，而无需完全依赖传统支付处理器。桌面应用和私有工具可通过调用验证 API 检查许可证是否有效，将其用作授权和计费后端。Web3 服务可受益于面向加密的认证流程，包括 ADM 和以太坊钱包登录，同时保留传统的基于电子邮件的登录方式。自托管的商业产品可以部署并根据自身规则调整该平台，而不必依赖封闭的授权 SaaS。

该平台支持自动注册试用并强制执行“每个指定范围内仅限一次试用”等规则。它还包含付费、试用、促销和手动许可证类型，使运营者无需直接编辑数据库即可灵活管理。品牌化可通过环境变量配置，数据模型使用通用产品 slug 而非硬编码的 ADAMANT 特定假设，使其适用于跨多个产品的白标部署。

### 技术架构

ADM-Payment 采用现代单体仓库（monorepo）结构构建，使用 `pnpm` 和 Turborepo。v1.0.0 版本范围包括：基于 Fastify 5 的 API 后端、Prisma ORM、PostgreSQL 数据库、使用 Vite 的 React 18 前端、独立的用户 Web 应用和管理应用、用于共享逻辑的公共包、带刷新 Cookie 的 JWT 会话、ADM 消息码认证、以太坊 SIWE 认证、邮箱密码认证、Turnstile 验证码、与 BTCPay Server 集成以支持比特币支付、具备唯一存款地址和链上监听器的原生 ADAMANT 支付提供方、幂等 Webhook、管理 API 密钥、可选的双因素认证（2FA）、IP 与指纹锁定、审计日志、i18n 国际化，以及用于安装、Prisma 生成、构建、lint 和类型检查的 GitHub Actions CI。

架构上分离了面向用户和面向管理的功能区域。外部产品通过 API 端点与平台交互，以验证许可证或检查订阅状态。这种 API 优先的方法意味着 ADM-Payment 不仅是一个结账页面，更是一个其他软件可依赖的后端服务。

安全控制已内置于架构层级：分离用户与管理区域、受保护的身份验证流程、访问控制、安全的许可证验证 API、管理 API 密钥、可选的 ADM 和 ETH 双因素认证、验证码支持、IP 与指纹锁定、审计日志。基于钱包的身份验证允许用户通过加密身份流程登录，而非强制使用仅邮箱账户，同时传统用户仍可使用邮箱密码登录。

### 当前状态

ADM-Payment 是一个进行中的项目，当前已提供可用的测试版本。基础功能已可使用，但产品仍在持续优化流程、扩展文档并收集实际集成反馈。当前发布方向聚焦于 v1.0.0 平台基础建设，首个生产级集成为 ADAMANT Tradebot WebUI 订阅功能。路线图包括更多支付提供方、更多区块链支持、OpenAPI 文档、订阅自动续订功能以及第三方产品集成。

### 截图

![用户界面：登录选项](/images/engineering-notes/medium/46b6f4ec4e95/004-1-cqwvqqbxknkp-uvuuknxrq-png.webp)

![用户界面：订阅套餐](/images/engineering-notes/medium/46b6f4ec4e95/005-1-t37cypcdhaysabgjilzivg-png.webp)

![用户界面：许可证](/images/engineering-notes/medium/46b6f4ec4e95/006-1-3kfx3yvszqtpokjjjvsexa-png.webp)

![管理仪表板：账户](/images/engineering-notes/medium/46b6f4ec4e95/007-1-bp6rl5dl-yi5cq0-elmo1q-png.webp)

![管理仪表板：许可证](/images/engineering-notes/medium/46b6f4ec4e95/008-1-wpdhnvtgoltez8bgcjxjyg-png.webp)

![管理仪表板：发票](/images/engineering-notes/medium/46b6f4ec4e95/009-1-o-3ouw6yormfxhtyk3npbw-png.webp)

![管理仪表板：手动发放许可证（选项）](/images/engineering-notes/medium/46b6f4ec4e95/010-1-kg3c6muwymo6kftbchh2jg-png.webp)

![管理仪表板：ADM 支付](/images/engineering-notes/medium/46b6f4ec4e95/011-1-ypzmklcvz81nqi7rh7fyrg-png.webp)

![管理仪表板：BTC 支付](/images/engineering-notes/medium/46b6f4ec4e95/012-1-pygj4qnhxawlioosdttx5a-png.webp)
