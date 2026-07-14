---
title: "Обновление ноды блокчейна ADAMANT: версия 0.8.0"
slug: "adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
description: "ADAMANT выпустил версию ноды 0.8.0 с улучшениями API и оптимизациями. Обновление необязательное, без изменений в консенсусе."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
publishedAt: "2023-03-20T08:43:48.499Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:35647db85081"
locale: "ru"
placeholder: false
---

ADAMANT, децентрализованная платформа для обмена сообщениями с открытым исходным кодом, построенная на блокчейн-технологии, выпустила версию ноды 0.8.0. Это обновление сосредоточено на улучшениях и оптимизациях API, а не на изменениях консенсуса, поэтому обновление вашей ноды является необязательным.

## Улучшения API

Конечные точки `/api/transactions` и `/api/chats/get` теперь принимают параметры запроса `inId` или `isIn` как эквивалентные. Например, `/api/chats/get?InId=U6386412615727665758` и `/api/chats/get?isIn=U6386412615727665758` дают одинаковый результат. Кроме того, идентификаторы пользователей в конечных точках `/api/chats/get` и `/api/chatrooms` теперь нечувствительны к регистру, то есть `/api/chatrooms/U6386412615727665758` и `/api/chatrooms/u6386412615727665758` обрабатываются одинаково.

Транзакции и `POST /api/accounts/delegates` теперь принимают транзакцию либо как простой объект, либо вложенной в свойство `transaction`. Обе формы ниже являются допустимыми:

```bash
curl -X POST https://endless.adamant.im/api/transactions/process -H 'Content-Type: application/json' -d '{"type": 0, "amount": 100000000, ...}'
# or {"transaction": { "type": 0, "amount": 100000000, ... }}
```

Конечная точка `/api/states/get` теперь включает свойство `confirmations`, а производительность запросов `generatorPublicKey` была оптимизирована. Также в `config.json` добавлена опция `cors` для упрощения настройки кросс-доменных запросов.

## Исправления ошибок и критические изменения

Обновление устраняет ошибку "permission denied for schema public", которая затрагивала некоторые развертывания. Однако версия 0.8.0 вводит критическое изменение: конечная точка `/api/blocks` больше не возвращает свойство `count`. Приложениям, полагающимся на это поле, потребуется соответствующее обновление.

Поскольку этот выпуск не изменяет правила консенсуса, существующие ноды могут продолжать работу на предыдущей версии без проблем совместимости.
