---
title: "ADAMANT Tradebot v10.0.0"
slug: "release-adamant-tradebot-v10-0-0-439222935"
description: "ADAMANT Market Making Software v10.0.0 是一个重要的里程碑版本，带来了架构重组、独占迭代安全性、企业级日志管理、基于角色的 WebUI 管理 API 等功能。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v10.0.0"
publishedAt: "2026-11-09T14:19:19Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-tradebot"
tag: "v10.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:439222935"
locale: "zh"
placeholder: false
---

ADAMANT Market-Making Software v10.0.0 是一个重要的里程碑版本，带来了架构重组、独占迭代安全性、企业级日志管理、基于角色的 WebUI 管理 API、重写的 Azbit 连接器、通过 OIDC 实现的 npm 可信发布（Trusted Publishing），以及用于 Docker 容器的加密构建溯源。

## 安装

```bash
# 通过 npm
npm install -g adamant-tradebot
mm init
mm doctor
mm on

# 通过 Docker / GHCR
docker pull ghcr.io/adamant-im/adamant-tradebot:10.0.0
docker run -d --name adamant-tradebot ghcr.io/adamant-im/adamant-tradebot:10.0.0
```

## 供应链安全与可信发布

npm 发布工作流已迁移至 OIDC 可信发布，不再依赖持久化的仓库密钥（`NPM_TOKEN`），并通过 `publishConfig.provenance: true` 启用了验证溯源，解决了 issue #119。GHCR 构建溯源证明已通过 `actions/attest-build-provenance@v2` 集成，并结合 Sigstore 签名，实现了 GitHub Packages 上可验证的容器构建。通过 `workflow_dispatch` 为 CI/CD 发布工作流增加了手动验证触发器。

## 架构与运行时可靠性

模块结构已重组为清晰的分层：`trade/features/` 用于做市模块，`trade/trader/` 用于交易所连接器，`trade/settings/` 用于动态参数文件。通过 `helpers/moduleIteration.js` (`runExclusiveIteration`) 引入了独占迭代锁定机制，以防止并发重叠迭代，并确保从 `finally` 代码块进行可靠的重新调度。

企业级日志轮转和快速日志读取器已在 `helpers/logRotation.js` 和 `helpers/logReader.js` 中完全重写，支持活动与归档生命周期管理、结构化反向读取以及分页日志检索。通过 `helpers/mmHealthEval.js`、`helpers/mmHealthState.js` 和 `helpers/mmRuntimeHealth.js` 增加了运行时健康评估功能，用于实时监控做市状态。命令发起者追踪功能现由 `helpers/commandInitiator.js` 提供，可在 Messenger、WebUI API 和 CLI 调用之间提供一致的上下文追踪。

## 交易所连接器

Azbit 连接器对 `trade/trader/trader_azbit.js` 和 `trade/api/azbit_api.js` 进行了全面重写，支持 REST API v1 和 v2、严格的订单精度控制、速率限制，并包含 137 个带有全面 API 模拟的单元测试。连接器的精度和安全性已在 Coinstore、FameEXnet、NonKYC、P2PB2B 和 StakeCube 上实现标准化，包括统一的错误处理、精度截断和余额预校验。

## WebUI REST 与 WebSocket API

引入了基于角色的访问控制，支持 `admin`、`manager` 和 `viewer`（只读）角色，具备严格的 JWT 验证、TTL 强制执行和 IP 访问过滤功能。增加了完整的机器人管理端点，用于动态参数调整（`PUT /api/v1/params`、`PUT /api/v1/params/strategy`）、机器人生命周期管理、订单管理和日志查询。WebSocket 流支持实时事件订阅，涵盖机器人状态、交易日志和市场行情更新。

## 质量保证与开发工具

测试覆盖率现已扩展至 576 个自动化测试，涵盖 33 个测试套件，涉及通用功能、API WebUI、特性模块、交易器、辅助工具和做市模块。在 `AGENTS.md` 中添加了 AI 代理开发指南，以确保 AI 辅助开发遵循安全不变量、目录布局和测试协议。通过 JSDoc `@typedef` 定义和 `npm run typecheck:webui-api` 的 TypeScript 检查，提升了类型安全性。

### 重大变更

此版本要求 Node.js 版本 22.12.0 或更高。内部目录布局已更改，特性模块和连接器已移动至 `trade/features/` 和 `trade/trader/`；导入内部路径的自定义扩展应相应更新。WebUI API 现在在所有私有端点上强制执行严格的 JWT 过期检查和角色授权。
