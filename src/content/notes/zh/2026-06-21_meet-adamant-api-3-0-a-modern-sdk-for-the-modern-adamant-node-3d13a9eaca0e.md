---
title: "认识 adamant-api 3.0 —— 面向现代 ADAMANT 节点的现代化 SDK"
slug: "meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
description: "adamant api JavaScript/TypeScript SDK 发布了 3.0.0 版本，专为与 ADAMANT Node v0.10.0 无缝协作而设计。此版本引入了毫秒级时间戳、更丰富的查询参数、整合的节点状态响应以及包含式最低版本过滤。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
publishedAt: "2026-06-21T15:54:25.436Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3d13a9eaca0e/001-0-hkmpiqt1p-ubpghb.webp"
cardSpan: "full"
originalId: "medium:3d13a9eaca0e"
locale: "zh"
placeholder: false
---

`adamant-api` JavaScript/TypeScript SDK 已发布 3.0.0 版本，专为与 ADAMANT Node v0.10.0 无缝协作而设计。此版本引入了毫秒级时间戳、更丰富的查询参数、整合的节点状态响应以及包含式最低版本过滤。该 SDK 提供自动健康检查、重试、故障转移、类型化响应、加密消息传输以及实时 WebSocket 订阅功能。

ADAMANT 是一个基于区块链的端到端加密信使，内置加密钱包，无需电话号码或中心化服务器。`adamant-api` SDK 将网络抽象为简洁的函数调用，使开发者能够构建去中心化的机器人、打赏罐和钱包，用户完全掌控自己的身份和资金。

### 3.0 版本更新内容

SDK 的 API 数据传输对象（DTO）基于固定的 `adamant-schema` 版本重新生成，确保毫秒级时间戳、加载器/状态数据以及可为空的未确认交易字段具备正确的类型定义。查询功能现在支持 `returnUnconfirmed`、`includeDirectTransfers`、通过地址查找委托人，以及多类型交易查询。交易过滤器默认使用逻辑 `and` 组合，金额过滤器仅适用于转账交易。可选的 `timestampMs` 构造和 `getEpochTimeMs()` 已提供，但 `timestampMs` 不参与签名字节计算，因此哈希、ID 和签名保持不变。

可靠性方面，对于明确被拒绝的 POST 请求将停止重试循环，并返回结构化的不可重试错误。对于安全请求和网络故障，仍保留重试和活动节点故障转移机制。基于高度的节点选择和包含式 `minVersion` 过滤确保与健康且最新的节点通信。

全新的 WebSocket 客户端支持通过单个连接订阅多个地址、交易类型和聊天资产类型。其特性包括类型化的连接错误、重连回调、显式的 `connect()`/`disconnect()`、监听器清理以及受限的重连机制。

该包现在在设计上是模块化的。根包仍专注于 ADM，而子路径导出（subpath exports）提供了对 API DTO、交易、元数据以及适用于 CommonJS 和 ESM 的 BTC/ETH/DASH/DOGE 辅助工具的访问。币种元数据来自 `adamant-wallets`，具有确定性并已固定版本。文档现已迁移至由版本控制系统管理的 VitePress + TypeDoc 网站。

![认识 adamant-api 3.0 —— 面向现代 ADAMANT 节点的现代化 SDK](/images/engineering-notes/medium/3d13a9eaca0e/002-0-bato9yeonu3b9-oz.webp)

### 快速开始

安装包并使用节点列表初始化客户端。健康检查、重试和故障转移将自动处理。

```javascript
import {AdamantApi} from 'adamant-api';

const api = new AdamantApi({
  nodes: [
    'https://endless.adamant.im',
    'https://clown.adamant.im',
    'https://lake.adamant.im',
  ],
  checkHealthAtStartup: true,
  minVersion: '0.10.0', // inclusive — older nodes are excluded automatically
});

api.onReady(async () => {
  const response = await api.getBlocks();
  if (response.success) {
    console.log(response.blocks);
  } else {
    console.error(response.errorMessage);
  }
});
```

### 使用场景

您可以构建一个去中心化聊天机器人，实时监控账户并响应加密消息。内置端到端加密；机器人使用自己的密码解密消息，服务器从不存储明文。

```javascript
import {AdamantApi, WebSocketClient, decodeMessage} from 'adamant-api';
import {config} from './config.js';

const api = new AdamantApi({nodes: config.nodes});

const ws = new WebSocketClient({
  admAddress: config.address,
  direction: 'incoming', // only messages sent *to* the bot
});
api.initSocket(ws);

ws.onMessage(async (tx) => {
  const text = decodeMessage(
    tx.asset.chat.message,
    tx.senderPublicKey,
    config.passphrase,
    tx.asset.chat.own_message,
  );

  if (text.trim() === '/ping') {
    await api.sendMessage(config.passphrase, tx.senderId, 'pong 🏓');
  }
});
```

对于加密打赏罐或支付机器人，您可以响应入账的代币转账并回赠代币。单个 WebSocket 连接还可以同时监控多个地址并按类型过滤，适用于交易所入账或会计仪表板。

如果您需要一个轻量级的多币种钱包，可以使用相同的 ADAMANT 密码派生 BTC、ETH、DASH 或 DOGE 地址，而无需在仅支持 ADM 的机器人中集成多个加密技术栈。通过子路径导出按需导入所需模块，以保持无服务器部署包的小型化。

```javascript
import {eth} from 'adamant-api/coins/eth';
import {btc} from 'adamant-api/coins/btc';

const {address: ethAddress} = eth.keys(process.env.PASSPHRASE);
const {address: btcAddress} = btc.keys(process.env.PASSPHRASE);

console.log({ethAddress, btcAddress});
```

### 从 2.x 版本迁移

要完成迁移，请在您的运行时和 CI 中将 Node 升级至 22 或更高版本。检查 WebSocket 的方向，如果您的应用假设仅接收入站消息，请添加 `direction: 'incoming'`。将币种导入更新为 `adamant-api/coins/*`，移除 Lisk/Klayr 相关代码路径，并重新检查查询过滤器，因为默认逻辑已变为 `and`，请将 `withoutDirectTransfers` 替换为 `includeDirectTransfers`。签名、交易 ID 以及 CommonJS/ESM 导入保持不变。
