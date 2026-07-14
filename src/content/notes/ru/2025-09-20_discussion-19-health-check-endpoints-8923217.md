---
title: "Проверка работоспособности: конечные точки"
slug: "discussion-19-health-check-endpoints-8923217"
description: "См. также: Проверка работоспособности: алгоритм, общее описание. Для проверки получаем высоту текущего узла или временную метку обновления сервиса. Получение версии узла — опционально."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/19"
publishedAt: "2025-09-20T16:14:17Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923217"
locale: "ru"
placeholder: false
---

См. также: [Проверка работоспособности: алгоритм, общее описание](https://github.com/orgs/Adamant-im/discussions/17)

Для проверки работоспособности мы получаем текущую высоту узла или временную метку обновления сервиса. Получение версии узла является необязательным и выполняется только при отсутствии необходимости в дополнительных запросах.

## Конечные точки проверки работоспособности узлов и сервисов

| **Узел или сервис** | **Конечная точка проверки работоспособности** | **Комментарии** |
|---|---|---|
| **adm-node** (без сервиса/индексатора) | `https://endless.adamant.im/api/node/status` | Содержит версию узла |
| **Сервис Currencyinfo** | `https://info.adamant.im/status` | Содержит версию программного обеспечения |
| **btc-node** | Единый RPC-запрос, объединяющий `getblockchaininfo` и `getnetworkinfo` | Содержит версию узла |
| **btc-indexer** | `https://btcnode2.adamant.im/blocks/tip/height` | Нет конечной точки для получения версии индексатора |
| **eth-node** | Единый RPC-запрос, объединяющий `eth_blockNumber` и `web3_clientVersion` | Содержит версию узла |
| **eth-indexer** | `https://ethnode3.adamant.im/max_block` | Содержит версию программного обеспечения |
| **doge-node** | Единый RPC-запрос, объединяющий `getblockchaininfo` и `getnetworkinfo` | Содержит версию узла |
| **doge-indexer** | `https://dogenode1.adamant.im/api/status` | Содержит версию узла (а не сервиса/индексатора) |
| **dash-node** (без сервиса/индексатора) | RPC `getStatus` (объединяет `getnetworkinfo` для версии и `getblockchaininfo` для высоты) | Содержит версию узла |
| **lsk-node** (kly-node) | RPC `system_getNodeInfo` | Содержит версию узла |
| **lsk-service** (kly-service) | `https://klyservice2.adamant.im/api/v3/network/status` | Содержит версию узла (а не сервиса/индексатора) |
| **ipfs-node** | `https://ipfs4.adm.im/api/node/info` | Содержит версию узла; дополнительная информация IPFS для проверки работоспособности находится в разработке |

Для узлов BTC и Doge единый пакетный RPC-запрос получает информацию о блокчейне и сети, избегая дополнительного кругового обхода. Пример запроса BTC:

```
curl --data-binary '[{"jsonrpc":"1.0","id":"curltext1","method":"getblockchaininfo","params":[]}, {"jsonrpc":"1.0","id":"curltext2","method":"getnetworkinfo","params":[]}]' -H 'content-type:text/plain;' https://dogenode1.adamant.im
```

Для узлов ETH аналогичный пакетный вызов объединяет `eth_blockNumber` и `web3_clientVersion`:

```
curl --data '[{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}, {"method":"web3_clientVersion","params":[],"id":2,"jsonrpc":"2.0"}]' -H "Content-Type: application/json" -X POST localhost:8545
```

Ответ ETH возвращает номер блока в шестнадцатеричном формате и строку версии клиента, например `Geth/v1.13.5-stable-916d6a44/linux-amd64/go1.21.4`. Названия клиентов обычно следуют шаблону `Geth/v1.13.5` или `Nethermind/v1.22.0`.

Обратите внимание, что некоторые индексаторы предоставляют только высоту или статус без конечной точки версии, а в случае сервисов Doge и LSK возвращаемая версия отражает базовый узел, а не программное обеспечение индексатора или сервиса.
