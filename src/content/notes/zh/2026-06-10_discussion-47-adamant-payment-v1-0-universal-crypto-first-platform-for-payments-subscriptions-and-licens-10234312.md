---
title: "ADAMANT Payment v1.0 — 面向支付、订阅和许可证管理的原生加密平台"
slug: "discussion-47-adamant-payment-v1-0-universal-crypto-first-platform-for-payments-subscriptions-and-licens-10234312"
description: "ADAMANT Payment（adamant payment）是 ADAMANT 生态系统的新基础设施，为需要原生加密货币变现的产品提供一体化解决方案，无需整合多个第三方服务。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/47"
publishedAt: "2026-06-10T14:30:29Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10234312"
locale: "zh"
placeholder: false
---

**ADAMANT Payment** (`adamant-payment`) 是 ADAMANT 生态系统以及任何需要原生加密货币变现、而无需拼接多个第三方服务的产品的新基础设施。它取代了旧版的 `adamant-client-auth` 方案，提供了一个现代化、与产品无关的平台：在一个可自托管的解决方案中集成了身份验证、计费、加密支付、订阅、许可证管理、用户门户和管理控制台。

首个集成目标是 ADAMANT Tradebot WebUI 订阅（场景 B）：用户在 adamant-payment 上购买订阅或试用，获得一个作用域受限的许可证令牌，机器人则通过出站连接连接到公共 WebUI 中继。该平台并不局限于 Tradebot —— 它被设计为适用于机器人、SaaS、桌面应用和 Web3 服务的独立产品。

## 架构与核心优势

该平台从设计之初就专为加密货币支付打造，而非事后添加的功能。它天然适用于 Web3 项目、交易机器人、SaaS 产品以及面向全球用户销售的软件。初始支付支持包括比特币（通过 BTCPay Server）和 ADM（原生支持，使用带链上监控器的唯一存款地址），并提供用于测试的开发环境支付提供程序。Webhook 具备幂等性，且通过唯一的 `externalId`/txid 值确保支付准确性 —— 许可证在结算后自动发放或续期。

身份验证、计费、加密支付、订阅、许可证管理、用户门户和管理面板全部集成于单一解决方案中，无需拼接多个第三方服务。平台可在支付后自动发放许可证，管理到期时间、订阅、套餐和产品访问权限。外部应用通过 `/v1/...` 下的 REST API 验证许可证，使产品能够以编程方式检查许可证状态、订阅有效性及用户访问权限。

用户可通过传统邮箱账户登录，或使用 ADM 或 ETH 钱包进行加密身份验证（SIWE）。这对 Web3 用户尤其有用，因为平台可在无需强制邮箱身份的情况下运行。JWT 会话配合刷新 Cookie 支持基于浏览器的应用。

该解决方案附带面向用户的界面和管理仪表盘。客户可管理支付、许可证和订阅；产品所有者可管理用户、订单、套餐和访问权限。管理面板支持 ADM 2FA 和 ETH 2FA、Turnstile 验证码、IP 与指纹锁定以及审计日志。在生产环境中，管理面板运行在独立的域名下。

`adamant-payment` 不依赖于 ADAMANT Messenger 或任何特定应用。通过 `BRAND_*` 环境变量支持白标品牌化，数据模型使用通用产品 slug。与 Stripe、Paddle、Lemon Squeezy 或传统 SaaS 许可平台不同，它可适配您自定义的规则、加密支付流程、定价模型和产品。它部署在您自己的基础设施上（PostgreSQL、Node.js），完全掌控用户、支付逻辑、许可证和业务数据。提供用于 Postgres 的 Docker Compose，无强制性的云 SaaS 依赖。

## v1.0 范围

v1.0 版本涵盖核心变现流程：用户注册、支付、权限交付、订阅续订、管理及产品集成。身份验证支持 ADM 消息验证码、以太坊（SIWE）以及邮箱加密码。计费功能包括商品目录、14 天试用（每个交易所和交易对全球仅一次）、付费、促销和手动许可证，并支持对 `config/` 中的套餐和促销码进行热重载。管理面板提供统计信息、账户管理、许可证、发票以及 ADM/BTC 钱包视图，支持 API 密钥认证和可选的 2FA。国际化在发布时支持英文和俄文，`packages/shared` 中提供可扩展的 i18n 支持。

技术栈采用 pnpm 与 Turborepo、Fastify 5、Prisma、PostgreSQL 和 React 18（Vite）。CI 通过 GitHub Actions 运行，涵盖安装、Prisma 生成、构建、代码检查和类型检查。

## 产品与集成要求

产品中立性是核心要求：数据库枚举中不存在硬编码的 Tradebot 或 ADAMANT 品牌；所有内容均可按部署配置。许可证作用域为每个交易所和交易对一个许可证，试用在全球范围内每个作用域仅一次。多身份认证确保 ADM、ETH 和邮箱共存。运营商安全要求生产环境中管理面板运行在独立域名下，配备 API 密钥、可选 2FA、验证码、锁定机制和审计日志。

为实现生态集成，Tradebot WebUI（场景 B）中继通过 adamant-payment API 验证许可证，机器人采用出站连接模式。`refactor/new-webui-api` 分支上的 Tradebot API 消费许可证验证功能，`refactor/new-stack` 分支上的 Tradebot WebUI 提供公共 WebUI 和中继。可添加新的 `PaymentProvider` 实现（例如，支持更多链），而无需重写计费核心。

## 发布标准

v1.0.0 版本将在 GitHub 上作为正式发布版本发布并打标签。`dev` 分支和合并至 `main` 的发布 PR 必须通过 CI。文档涵盖身份验证、计费、支付、管理安全、品牌化、数据库和 BTCPay 配置。冒烟测试覆盖认证流程、试用领取、支付到许可证发放、管理面板以及许可证验证端点。

## v1 后路线图

后续计划包括订阅自动续订（BTCPay 仅创建发票；续订逻辑位于 adamant-payment 中）、新增支付提供商和区块链、公共 API 的 OpenAPI 文档，以及 Tradebot 之外的第三方产品集成。

发布跟踪：[Adamant-im/adamant-payment#1](https://github.com/Adamant-im/adamant-payment/issues/1)。
