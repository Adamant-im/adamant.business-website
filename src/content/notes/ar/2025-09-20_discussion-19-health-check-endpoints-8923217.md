---
title: "التحقق من الحالة: نقاط النهاية"
slug: "discussion-19-health-check-endpoints-8923217"
description: "انظر أيضًا: خوارزمية التحقق من الحالة، الوصف العام. للتحقق من الحالة، نستلم ارتفاع العقدة الحالية أو طابع التحديث الزمني للخدمة."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/19"
publishedAt: "2025-09-20T16:14:17Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923217"
locale: "ar"
placeholder: false
---

انظر أيضًا: [التحقق من الحالة: الخوارزمية، الوصف العام](https://github.com/orgs/Adamant-im/discussions/17)

للتحقق من الحالة، نستلم ارتفاع العقدة الحالي أو طابع التحديث الزمني للخدمة. استلام إصدار العقدة اختياري ويتم فقط إذا لم تكن هناك حاجة لطلبات إضافية.

## نقاط نهاية التحقق من حالة العقدة والخدمة

| **العقدة أو الخدمة** | **نقطة نهاية التحقق من الحالة** | **ملاحظات** |
|---|---|---|
| **adm-node** (بدون خدمة/فهرس) | `https://endless.adamant.im/api/node/status` | يتضمن إصدار العقدة |
| **خدمة Currencyinfo** | `https://info.adamant.im/status` | يتضمن إصدار البرنامج |
| **btc-node** | طلب RPC واحد يجمع بين `getblockchaininfo` و `getnetworkinfo` | يتضمن إصدار العقدة |
| **btc-indexer** | `https://btcnode2.adamant.im/blocks/tip/height` | لا توجد نقطة نهاية للحصول على إصدار الفهرس |
| **eth-node** | طلب RPC واحد يجمع بين `eth_blockNumber` و `web3_clientVersion` | يتضمن إصدار العقدة |
| **eth-indexer** | `https://ethnode3.adamant.im/max_block` | يتضمن إصدار البرنامج |
| **doge-node** | طلب RPC واحد يجمع بين `getblockchaininfo` و `getnetworkinfo` | يتضمن إصدار العقدة |
| **doge-indexer** | `https://dogenode1.adamant.im/api/status` | يتضمن إصدار العقدة (وليس إصدار الخدمة/الفهرس) |
| **dash-node** (بدون خدمة/فهرس) | طلب RPC `getStatus` (يجمع `getnetworkinfo` للإصدار + `getblockchaininfo` للارتفاع) | يتضمن إصدار العقدة |
| **lsk-node** (kly-node) | طلب RPC `system_getNodeInfo` | يتضمن إصدار العقدة |
| **lsk-service** (kly-service) | `https://klyservice2.adamant.im/api/v3/network/status` | يتضمن إصدار العقدة (وليس إصدار الخدمة/الفهرس) |
| **ipfs-node** | `https://ipfs4.adm.im/api/node/info` | يتضمن إصدار العقدة؛ معلومات IPFS إضافية للتحقق من الحالة قيد التقدم |

بالنسبة لعقد BTC وDoge، يتم استخدام طلب RPC مجمع واحد لاسترجاع معلومات السلسلة ومعلومات الشبكة معًا، مما يتجنب الحاجة إلى رحلة إضافية. مثال لطلب BTC:

```
curl --data-binary '[{"jsonrpc":"1.0","id":"curltext1","method":"getblockchaininfo","params":[]}, {"jsonrpc":"1.0","id":"curltext2","method":"getnetworkinfo","params":[]}]' -H 'content-type:text/plain;' https://dogenode1.adamant.im
```

بالنسبة لعقد ETH، يكون الطلب المجمع المماثل هو دمج `eth_blockNumber` و `web3_clientVersion`:

```
curl --data '[{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}, {"method":"web3_clientVersion","params":[],"id":2,"jsonrpc":"2.0"}]' -H "Content-Type: application/json" -X POST localhost:8545
```

يسترجع رد ETH رقم الكتلة كقيمة سداسية عشرية وسلسلة إصدار العميل، على سبيل المثال `Geth/v1.13.5-stable-916d6a44/linux-amd64/go1.21.4`. عادةً ما تتبع أسماء العملاء النمط `Geth/v1.13.5` أو `Nethermind/v1.22.0`.

لاحظ أن بعض الفهارس تعرض فقط الارتفاع أو الحالة دون نقطة نهاية للإصدار، وفي حالة خدمات Doge وLSK، فإن الإصدار المسترجع يعكس العقدة الأساسية وليس برنامج الفهرس أو الخدمة نفسه.
