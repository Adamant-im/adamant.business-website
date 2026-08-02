---
title: "ADAMANT Explorer v2.0.0"
slug: "release-adamant-explorer-2-0-0-363589536"
description: "ADAMANT Explorer v2.0.0 是自 v1.3.0 以来的首个稳定版本，全面升级了前端、后端、实时监控、安全边界、依赖项及测试体系。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-explorer/releases/tag/2.0.0"
publishedAt: "2026-08-01T17:56:02Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-explorer"
tag: "2.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-explorer:363589536"
locale: "zh"
placeholder: false
---

ADAMANT Explorer v2.0.0 是自 v1.3.0 以来的首个稳定版本。该版本在保留现有公共页面 URL 和深层链接的同时，对 Explorer 的前端、后端、实时监控、安全边界、依赖项、测试及操作文档进行了现代化升级。

前端已基于 Vue 3、Pinia、Vue Router 5 和 Vite 8 重构，取代了原有的 AngularJS、Bootstrap 3 和 Webpack 技术栈。所有公共 Explorer 页面现均支持桌面端、平板电脑和移动端的响应式布局，具备持久化的亮色与暗色主题、易用性控件、移动端交易卡片、更安全的工具提示以及改进的复制反馈。此外，针对转账、投票与撤票、DApp 操作、交易所活动及欢迎奖金，增加了上下文相关的交易语义。

在后端方面，ADAMANT Node 访问层已围绕 `adamant-api` 3.1.0 进行重构，引入了就绪状态门控、故障转移、边界分页、标准化错误处理以及分离的请求与处理层。保留了 Explorer UI 所需的 12 个同源路由，并新增了 `GET /api/networkHealth` 路由。目前已实现严格的路由与查询验证、确定性交易排序、修正后的转账过滤、顶级账户分页、实时确认以及全精度 ADM 格式化。Redis 对于核心服务而言现为可选配置，同时保留了稳健的 API 缓存以及滚动区块和节点统计功能。

实时监控功能在 Header、Delegate Monitor、Network Monitor 和 Activity Graph Socket.IO 的生命周期内实现了稳定化，采用了序列化轮询和有界重试机制。新增了基于区块触发的页面刷新，以及用于紧凑型 WebSocket 区块通知的有界 REST 确认功能。代表调度、锻造状态、奖励、费用、节点统计、版本排序及轮次边界行为均得到了改进。Freegeoip 集成已被替换为可选的 GeoJS 节点地理定位，并引入了同源、已验证、已缓存且限流的 OpenStreetMap 切片代理。

安全性和可靠性的改进包括移除通配符 CORS 以及 16 个不受支持的旧版 Explorer API 端点。增加了感知代理的 API 限流、已验证的可信代理、安全标头、受限的 CSP、稳定的错误处理以及明确的 HTTP 超时设置。通过排除查询字符串最大限度地减少了请求日志，并对不受信任的 Node、节点、代理、Redis、地理定位及浏览器来源数据进行了验证。此外，还增加了存储库威胁模型、安全与可靠性审查，以及针对公共边界和实时监控状态的广泛单元测试覆盖。

支持的运行时环境已更新至 Node.js `^22.18.0 || >=24.11.0`。Express、Redis、Socket.IO、Axios、Vue、Vite、Pinia、Vue Router、ESLint、Mocha、Chai、Supertest 及其他剩余依赖项均已更新。移除了过时的 Grunt、Protractor、Cucumber、Jenkins、Travis、Webpack/Babel 以及废弃的 Market Watcher 和交易所集成。新增了 43 个仅限 Node 的单元测试模块，刷新了实时 Testnet 固定装置，并扩展了 API、安全性、调度、数据整形及前端工具的覆盖范围。`README.md` 已根据当前的贡献者和 AI 代理操作指南进行了更新。

验证工作包括通过 ESLint 和 Prettier 检查，完成包含 6,337 个模块转换的生产构建，执行 226 个测试的单元测试套件，在发布源码树上运行 41 个测试的实时 Testnet API 套件，依赖项审计报告显示 0 个漏洞，以及涵盖 13 个路由在桌面、平板和移动分辨率下的浏览器冒烟测试，确保无控制台错误或水平溢出。

### 重大变更

Node.js 必须升级至 `^22.18.0 || >=24.11.0`。部署配置应基于新的 `config.default.jsonc` 创建，并审查 `nodes_adm`、`trustedProxies`、`redis`、`geoLocation`、`exchangeRates` 和 `log_level` 等设置。要求使用 ADAMANT Node v0.10.2 或更高版本，建议优先使用多个独立运行的 HTTPS 节点。已移除的 Freegeoip 集成应替换为可选的 GeoJS 配置；禁用地理定位可在不显示地图或国家/地区标志的情况下保持节点和主机名数据可用。已移除的 Explorer API 路由的外部消费者应迁移至 `adamant-api-jsclient`，并使用 `GET /api/networkHealth` 进行操作监控。反向代理和防火墙规则必须允许同源的 `/osm-tiles/` 路径。被忽略的 `public/` 包应在部署期间通过 `npm run build` 构建。开发时，使用 `npm run dev` 运行后端与 Vite 组合栈，或使用 `npm run dev:frontend` 仅运行 Vite。现有的 Explorer 页面路由和深层链接保持兼容，Redis 虽被推荐使用，但对于核心 HTTP 和静态服务而言已不再是必需项。
