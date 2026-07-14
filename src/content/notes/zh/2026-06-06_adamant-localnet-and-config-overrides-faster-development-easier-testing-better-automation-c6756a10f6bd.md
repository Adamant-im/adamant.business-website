---
title: "ADAMANT Localnet 和配置覆盖：更快的开发、更简单的测试、更好的自动化"
slug: "adamant-localnet-and-config-overrides-faster-development-easier-testing-better-automation-c6756a10f6bd"
description: "ADAMANT 开发对节点运营者、贡献者和应用开发者来说变得更简单、更快速。除了公共测试网，现在还可以在本地运行轻量级网络。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-localnet-and-config-overrides-faster-development-easier-testing-better-automation-c6756a10f6bd"
publishedAt: "2026-06-06T13:20:25.670Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/c6756a10f6bd/001-1-50jddzsw9tlqqlt95tevlg-png.webp"
cardSpan: "full"
originalId: "medium:c6756a10f6bd"
locale: "zh"
placeholder: false
---

ADAMANT 开发对节点运营者、贡献者和应用开发者来说变得更简单、更快速。除了公共 ADAMANT Testnet，开发者现在可以直接在自己的机器上运行轻量级的本地 ADAMANT 网络。这种 Localnet 设置专为快速实验、自动检查、场景测试以及无需公共网络或重型基础设施的开发工作流而设计。同时，ADAMANT Node 现在支持灵活的配置覆盖功能，允许运营者和测试自动化脚本在启动时更改节点设置，而无需手动编辑 `config.json` 或 `test/config.json`。

### 从 Testnet 到 Localnet

Testnet 仍然非常重要，因为它为开发者提供了一个更接近真实网络条件的共享公共环境。它适用于测试集成、检查应用行为、验证节点兼容性，以及在功能上线 Mainnet 之前进行实验。然而，并非所有开发任务都需要公共网络。有时开发者需要更小、更快的环境——在本地启动多个节点、测试与共识相关的变更、检查对等节点发现和同步、复现 bug、运行自动化场景测试，或在提交 pull request 前验证节点行为。这正是 Localnet 的用武之地。

### 什么是 ADAMANT Localnet？

ADAMANT Localnet 是一个在单台机器上运行的受控本地多节点 ADAMANT 网络。Localnet 不连接公共 Testnet 节点，而是在本地启动多个隔离的 ADAMANT 节点。每个节点都有自己的端口、运行时状态、日志、配置、进程元数据和数据库设置。

基本工作流程非常简单：

```bash
npm run start:localnet -- --nodes 3
npm run status:localnet
npm run stop:localnet
```

当需要完全清理时，可以通过 `npm run drop:localnet` 或使用 `npm run stop:localnet -- --dropOnStop` 删除持久化的本地数据库。

Localnet 故意设计得轻量。它不需要公共服务器、VPS 或从网络长时间同步。它在本地运行，使用受控的测试配置，适用于开发机器。这使其对在提交前测试节点变更的贡献者、需要快速发布检查的维护者、基于 ADAMANT API 构建应用的开发者，以及自动化脚本或类 CI 环境都非常有用。

### Localnet 在底层创建了什么

Localnet 启动时，会为每个节点生成隔离的运行时数据，包括每个节点的配置文件、运行时状态、PID 文件、清单、本地链数据和每个节点的日志文件夹。日志按节点分离，例如位于 `logs-localnet/node-1/`、`logs-localnet/node-2/` 等。这一点很重要，因为多节点问题通常需要比较不同对等节点的行为——在调试传播问题、重连、错过的区块、脑裂情况、出块行为或 broadhash 共识时，单个日志文件是不够的。Localnet 工具还会生成机器可读的元数据，供后续的场景测试工具使用。

状态脚本会报告每个节点的信息，例如 API 状态、代表数量、上次出块时间、nethash 和实时 broadhash 共识。Broadhash 共识对于检查本地节点在启动后是否真正对齐特别有用。在一个本地冒烟测试中，启动了一个三节点的 Localnet，轮询了状态，所有节点的实时 broadhash 共识达到了 100%，然后优雅地停止并清除了 Localnet。

Localnet 不会通过简单地终止进程来停止。`stop:localnet` 脚本使用节点的正常优雅关闭路径，这有助于避免不必要的数据库或运行时状态问题，并使本地测试更接近真实操作行为。默认情况下，本地 PostgreSQL 数据库是持久化的。自动数据库创建取决于本地 PostgreSQL 角色是否具有 `CREATEDB` 权限；如果不可用，开发者可以使用现有数据库设置或文档中记录的跳过/创建选项。

### 配置覆盖：不再需要手动编辑配置

以前，ADAMANT Node 支持使用 `--config` 选择配置文件，并有几个硬编码的 CLI 覆盖选项，如 `--port`、`--address`、`--peers`、`--log` 和 `--snapshot`。这在简单情况下可行，但扩展性不好。运营者和自动化脚本通常需要更改嵌套的配置值——端口、Redis 设置、数据库设置、对等节点列表、日志选项、API 设置、出块配置、激活高度或特定于测试的参数。手动编辑复制的配置文件容易出错，为每个配置键添加一个 CLI 标志无法扩展，而替换整个配置文件对于小的环境特定更改来说往往过于沉重。

开发者现在可以在启动时直接传递单个配置值，使用与现有配置对象结构匹配的点路径键：

```bash
node app.js \
  --config test/config.json \
  --genesis test/genesisBlock.json \
  --config-set consensusActivationHeights.fairSystem=4359465 \
  --config-set redis='{ "url": "redis://127.0.0.1:6379/1", "password": null }'
```

这允许脚本覆盖单个嵌套标量值或整个对象值。值尽可能被解析为 JSON 兼容值，因此数字、布尔值、null、数组和对象可以正确表示，而不是被视为纯字符串。

配置覆盖也支持文件。一个类似环境变量的覆盖文件可以包含如下条目：

```ini
consensusActivationHeights.fairSystem=4359465
redis='{ "url": "redis://127.0.0.1:6379/1", "password": null }'
```

该实现还支持 JSON 部分覆盖文件。这对于本地环境、测试自动化、类 CI 工作流以及希望在不修改受版本控制的配置文件的情况下重复一组更改的维护者非常有用。Localnet 默认通过 `test/config.localnet.json` 使用此机制，在保持基础配置稳定的同时，通过相同的验证覆盖流程应用 Localnet 特定的差异。

### 验证与安全性

最终解析的配置仍然会在默认值、覆盖文件、直接覆盖和旧版 CLI 快捷方式解析后，根据现有的 ADAMANT 配置模式进行验证。无效路径、无效值类型、格式错误的 JSON 和不安全的键应在启动前失败，而不是产生不可预测的运行时行为。敏感值会从配置覆盖日志中脱敏，包括密码、密码短语、密钥和令牌。旧版启动快捷方式通过相同的验证覆盖管道路由，并保持最高的覆盖优先级，因此现有工作流可以继续工作，而新工作流可以获得更通用和一致的配置机制。

某些配置值与共识相关。覆盖 `consensusActivationHeights.*` 等键在本地或测试场景中可能有用，但对错误链使用网络不兼容的激活高度可能导致节点偏离网络。配置覆盖旨在明确且可见。它们适用于 Localnet、Testnet、自动化和受控操作场景，但应谨慎用于生产 Mainnet 节点。该功能仅更改启动时的配置解析——它不会直接更改区块逻辑、交易序列化、奖励逻辑、费用逻辑、代表排序、签名检查或共识规则。

### Localnet 与 Testnet 协同工作

Localnet 不会取代 Testnet；它们解决不同的问题。Localnet 最适合在单台机器上进行快速、私密、可重复的开发，开发者需要完全控制、快速启动和隔离实验。Testnet 最适合公共、共享、网络级别的测试，开发者需要持久环境、公共对等节点、测试 ADM 币、浏览器访问以及针对共享网络的应用级别检查。两者结合为 ADAMANT 贡献者提供了更强的开发流程：使用 Localnet 在本地测试，通过公共 Testnet 验证，然后准备更安全的 Mainnet 发布。

Localnet 生命周期管理被有意地与场景测试执行分离。Localnet 脚本负责启动、停止、检查和清理本地网络。场景运行器随后可以针对已可用的 Localnet 或 Testnet 生成报告。这种分离使职责清晰，并使未来工具的构建更加容易。
