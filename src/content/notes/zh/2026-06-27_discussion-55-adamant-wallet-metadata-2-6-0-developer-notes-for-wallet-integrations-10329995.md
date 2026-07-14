---
title: "ADAMANT 钱包元数据 2.6.0：钱包集成开发者说明"
slug: "discussion-55-adamant-wallet-metadata-2-6-0-developer-notes-for-wallet-integrations-10329995"
description: "ADAMANT 钱包元数据 2.6.0 版本即将发布，主要面向集成 ADAMANT 内置加密钱包、元数据、节点列表、服务定义或下游钱包 UI/配置同步的开发者。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/55"
publishedAt: "2026-06-27T13:42:14Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10329995"
locale: "zh"
placeholder: false
---

ADAMANT 钱包元数据 `2.6.0` 已准备发布。此更新主要面向集成 ADAMANT 内置加密钱包、钱包元数据、节点列表、服务定义或下游钱包 UI/配置同步的开发者。

## 钱包与服务开发者的变化

`adamant-wallets` 仓库是 ADAMANT 应用所使用的币种、代币、区块链、节点、服务、图标和模式元数据的权威来源。版本 `2.6.0` 更新了元数据本身，以及下游使用者应如何读取它的相关文档。

元数据覆盖模型现在有了更清晰的文档说明。通用字段位于 `assets/general/<coin-or-token>/info.json`，区块链默认值位于 `assets/blockchains/<blockchain>/info.json`，而特定于区块链的代币覆盖位于 `assets/blockchains/<blockchain>/<token>/info.json`。`README.md` 现在恢复并扩展了钱包元数据参数的字段说明，包括节点、服务、费用、精度、图标、健康检查、状态标志和转账限制。`specification/openapi.json` 覆盖了更多钱包元数据字段和嵌套结构，有助于 SDK、验证器、模式使用者和生成的文档更贴近实际的 JSON 结构。仓库特定的维护规则、验证要求、问题/PR 规范以及元数据安全规则现已记录在 `AGENTS.md` 和 `.github/CONTRIBUTING.md` 中。

## 需在下游审查的元数据更新

如果您的应用、服务、SDK、机器人或后端直接或通过捆绑的 ADAMANT 钱包消费 ADAMANT 钱包元数据，请审查以下变更。

ADAMANT 节点元数据已更新，并移除了三个不可用的 ADM 代理节点：`tauri.bbry.app`、`endless.bbry.app` 和 `debate.bbry.app`。比特币、达世币和狗狗币的元数据已更新，并修复了狗狗币地址验证示例。DAI 的 GitHub 链接已修正，GT 代币命名也已更新。已弃用的 USDS 元数据及相关图标资源已被移除。包元数据、依赖锁文件、Node.js 引擎信息、验证脚本和仓库链接也已更新。

## 推荐给集成者的检查项

如果您在钱包、交易所集成、监控服务、移动应用、PWA、SDK 或自定义后端中使用此仓库，请在 `2.6.0` 版本合并到 `master` 后重新同步钱包元数据。检查您的代码是否硬编码了已移除的 USDS 元数据或已移除的 ADM 代理节点，并在使用生成类型、验证器或感知模式的工具时，重新对更新后的 OpenAPI 模式运行元数据验证。

请重新检查钱包 UI 行为，涉及字段如 `status`、`defaultVisibility`、`defaultOrdinalLevel`、`decimals`、`cryptoTransferDecimals`、`minBalance`、`minTransferAmount`、`fixedFee`、`defaultFee` 和图标路径。如果您的应用使用 `nodes`、`services`、`healthCheck`、`minVersion`、`hasIndex`、`alt_ip`、`txFetchInfo`、`txConsistencyMaxTime`、`timeout` 或可靠性 gas 设置，请重新检查节点和服务选择逻辑。确保您的集成将元数据视为基于列表的配置，除非您有明确的备用策略，否则不要固定单一端点。

## 参考资料

- 发布议题：https://github.com/Adamant-im/adamant-wallets/issues/137
- 发布 PR：https://github.com/Adamant-im/adamant-wallets/pull/138
- 仓库：https://github.com/Adamant-im/adamant-wallets
- ADAMANT 改进提案：https://aips.adamant.im/
