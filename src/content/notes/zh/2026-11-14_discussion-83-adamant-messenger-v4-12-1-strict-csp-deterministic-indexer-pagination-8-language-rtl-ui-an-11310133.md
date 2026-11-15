---
title: "ADAMANT Messenger v4.12.1：严格的 CSP、确定性索引器分页、RTL UI 及可验证构建"
slug: "discussion-83-adamant-messenger-v4-12-1-strict-csp-deterministic-indexer-pagination-8-language-rtl-ui-an-11310133"
description: "ADAMANT Messenger PWA v4.12.1 基于 v4.12.0 (dfe094d3) 在 master 分支 (074db965) 上发布，包含 69 次提交、12 个合并的拉取请求和 14 个已关闭的里程碑问题。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/83"
publishedAt: "2026-11-14T17:50:00Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Messenger apps"
cardSpan: "half"
originalId: "github-discussion:11310133"
locale: "zh"
placeholder: false
---

ADAMANT Messenger PWA `v4.12.1` 基于 `v4.12.0` (`dfe094d3`) 在 `master` 分支 (`074db965`) 上发布，涵盖了 69 次提交、12 个合并的拉取请求和 14 个已关闭的里程碑问题。此版本不仅增加了表面功能，还重点关注了可验证传输和运行时加固、去中心化多运营商基础设施下确定性的节点和索引器分页、八种语言的完全对等支持（包含阿拉伯语 RTL 支持），以及跨 Web、桌面和 Android 目标的透明构建溯源。

## 严格的 CSP、无 eval 的 Web3 验证及共享安全标头

统一的安全标头契约（`vite-config/plugins/cspHardeningPlugin.ts` 中的 `PWA_SECURITY_HEADERS`）现在定义了跨构建强制执行的单一事实来源——`frame-ancestors 'none'`、`X-Frame-Options: DENY`、`X-Content-Type-Options: nosniff`、`Referrer-Policy: no-referrer` 和 `X-XSS-Protection: 0`——这些标头已同步到 `vercel.json` 的全匹配标头和 nginx 配置文件中。Web3 ABI 和验证切换至 Zod 4，并为 `web3-validator` 使用 `config({ jitless: true })`，为 `web3-eth-abi` 使用 `abitype`，移除了编译器入口点，同时 CSP 加固插件扩展了生产环境包对运行时 `eval` 和 `Function` 别名的拦截。

供应链加固包括：带有七天最小发布期限的 `.npmrc`、依赖项发布期限检查脚本、Dependabot 冷静期、Electron 生产环境裁剪，以及 Playwright 凭据和制品排除。实时部署验证探测（`cspDeployments.env.spec.ts`、`tests/e2e/production-csp.live.spec.ts`）可验证标头是否存在，并确保登录屏幕脚本在生产环境、开发环境、GitHub Pages 和 Surge 部署中零 CSP 违规。

## 节点基准、有界 PostgREST 查询及单节点分页亲和性

主网、测试网和 Tor 网络上的最低 ADM API 版本提升至 `0.10.0`。IPFS 节点最低版本现在明确从 `ipfsService.minVersion` (`0.1.0`) 读取，而不是回退到通用服务基准。重定位的节点回退 IP 通过 `adamant-wallets` 注册表同步。

实时直接 ADM 转账功能得到改进：架构将 `withoutDirectTransfers` 替换为整数枚举，WebSocket 连接在解锁时立即建立并订阅聊天交易类型 `[0, 8]`，转账状态在聊天预览、交易列表和转账卡片组件中保持同步。

通过 `EthIndexerClient.ts` 进行的 ETH 索引器查询现在对每个 `/ethtxs` 请求强制执行 `limit`（默认为 25），将原生 ETH 查询拆分为两个有界的索引查询，并在客户端通过 `txhash` 合并和去重，同时引入 `getTimestampGroup` 以解析等时间戳边界。针对 BTC、DOGE 和 DASH 的跨链分页防护将活动分页锁定在单个索引器上，避免跨运营商分发地址。持久化模块状态在保存时会清除缓存的交易并重置分页会话游标，防止陈旧游标偏移。

![移动端 ADM 和 IPFS 节点版本基准及设置操作](/images/engineering-notes/github/discussions/11310133/001-bcf4ca3db8.webp)

*低于 `0.10.0` 的 ADM 节点和普通 HTTP 端点被标记为不支持；IPFS 节点根据 `ipfsNode.minVersion` (`0.1.0`) 进行验证。*

![桌面端分栏聊天，具有同步的 ADM 转账状态和纯文本 XSS 清理功能](/images/engineering-notes/github/discussions/11310133/002-4dc1da2b89.webp)

*聊天预览间距和送达勾选与 0 型 ADM 转账同步；未清理的有效载荷预览被安全地渲染为惰性文本。*

![桌面端 ADM 钱包交易列表](/images/engineering-notes/github/discussions/11310133/003-a42684a993.webp)

*实时主网交易流与跨 ADM、ETH/ERC-20、BTC 和 DOGE 的单节点分页架构配对。*

## 构建标识、HTTP IPFS 多重哈希回退及隔离的网络配置

构建信息插件 (`virtual:adamant-build-info`) 在构建对话框中公开了经过清理的 `version`、`branch`、`commit`、`prNumber`、`author`、`buildDate` 和 `isTestnet`，并提供了一个强制刷新 Service Worker 的操作，该操作在清除 CacheStorage 的同时保留用户凭据和加密的 IndexedDB 状态。测试网构建显示明确的 `TESTNET` 徽章。

对于无法使用 `crypto.subtle` 的普通 HTTP 上下文（如 `.onion` 镜像），IPFS 附件回退使用 `@noble/hashes` 的 SHA-256 多重哈希派生。网络配置统一到 `src/config/mainnet.json` 并通过虚拟模块公开，因此不支持的 Vite 模式或跨网络配置泄漏将在构建时报错。

![带有强制刷新、8 种语言选择器和测试网登录指示器的 BuildInfoDialog](/images/engineering-notes/github/discussions/11310133/004-4f8da5e80c.webp)

*带有强制刷新、完整 8 种语言下拉菜单以及测试网部署上独特的 TESTNET 标记的登录构建对话框。*

## 八种语言对等支持及完整的阿拉伯语 RTL 支持

此版本增加了西班牙语、法语、日语和阿拉伯语翻译，完成了德语、俄语和简体中文的审核，并将所有八个语言环境文件对齐到精确的键对等（每个语言环境 418 个叶子键）。`applyLocale()` 函数同步了 `vue-i18n`、`dayjs`、Vuetify 语言环境、`dir` 和 `lang`，为阿拉伯语、法语和俄语（100 以上的 teen 情况）添加了准确的复数规则，为阿拉伯语日期选择了 `ar-u-nu-latn` 数字，并从 `navigator.languages` 本地检测初始语言。

完整的阿拉伯语 RTL 布局通过 Vuetify `rtl: { ar: true }` 启用，通过方向图标组件镜像导航箭头，在视图中应用 CSS 逻辑属性，并在用户编写的消息上设置 `dir="auto"`，同时强制对密码短语使用 LTR。回归测试（`RtlUiContract.spec.js`、`chat-rtl-layout-regression.spec.ts`）锁定了布局，防止未来出现损坏。

![聊天、带有 ADM 转账的活跃聊天及设置的阿拉伯语 RTL 移动端视图](/images/engineering-notes/github/discussions/11310133/005-94937d5ba6.webp)

*右对齐的聊天列表（使用拉丁数字）、RTL 聊天视图中带有镜像方向图标的活跃转账卡片，以及镜像的设置层级。*

![西班牙语、法语和日语设置屏幕](/images/engineering-notes/github/discussions/11310133/006-867e6e8b17.webp)

*西班牙语、法语和日语在实时部署中匹配所有 418 个 UI 字符串。*

## 打包与平台说明

Android 目标升级至 `compileSdkVersion` 和 `targetSdkVersion` 36，`minSdkVersion` 提升至 24 (Android 7.0+)，并使用 AGP 8.13.0、Gradle 8.14.3 和 Cordova Android 14.0.1 (`versionCode` 41201)。

在 macOS 上，由于 Apple 封禁了开发者账户，CI 公证目前已禁用。桌面端 `.dmg` 安装程序（x64、arm64、通用）仍然带有 Developer ID 签名，可在首次启动尝试后通过“系统设置”→“隐私与安全性”→“仍要打开”进行安装。adamant.im 上的 iOS App Store 按钮暂时不可点击，并附有相应通知。
