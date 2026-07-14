---
title: "Индексатор (инструмент EthSync) для Ethereum обновлён с добавлением дополнительных индексов"
slug: "indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
description: "Узлы Ethereum предоставляют RPC API, но не позволяют легко получать список транзакций по адресу — функция, доступная через индексатор ADAMANT на основе Python."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
publishedAt: "2023-09-22T14:36:48.398Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/f828f2b7fdf6/001-0-2atpoq1jvo6rdiry.webp"
cardSpan: "full"
originalId: "medium:f828f2b7fdf6"
locale: "ru"
placeholder: false
---

Узлы Ethereum предоставляют RPC API для множества операций, но не имеют встроенного способа легко получать список транзакций по адресу — функции, которую обычно предоставляют блок-эксплореры, такие как Etherscan. Чтобы решить эту проблему, ADAMANT поддерживает специализированный индексатор на основе Python, известный как инструмент EthSync, который позволяет эффективно запрашивать транзакции ETH и ERC20 по адресу.

Индексатор работает как фоновый сервис, подключающийся к узлам Ethereum через HTTP, WS или IPC API, и совместим с популярными клиентами, такими как Geth и Nethermind. Собранные данные о транзакциях сохраняются в базе данных Postgres для надёжности и быстрого доступа, а через API PostgREST эти данные становятся доступны клиентским приложениям.

![Индексатор (инструмент EthSync) для Ethereum обновлён с добавлением дополнительных индексов](/images/engineering-notes/medium/f828f2b7fdf6/002-0-9zuzrclpitfvpafs.webp)

Значительным обновлением в этой версии стало добавление дополнительных индексов базы данных. Эти индексы резко повышают производительность сложных запросов, например, фильтрации только Ethereum-транзакций или транзакций с определёнными токенами, связанными с адресом. Например, получить последние 25 транзакций USDT для конкретного адреса можно с помощью следующего запроса к API:

```bash
curl -k -X GET “http://localhost:3000/ethtxs?and=(txto.eq.0xdac17f958d2ee523a2206206994597c13d831ec7,or(txfrom.eq.0xabfDF505fFd5587D9E7707dFB47F45AF1f03E275,contract_to.eq.000000000000000000000000abfDF505fFd5587D9E7707dFB47F45AF1f03E275))&order=time.desc&limit=25"
```

При тестировании большинство запросов с использованием этих новых индексов выполняются менее чем за 100 миллисекунд — существенное улучшение по сравнению с десятками секунд, требовавшихся ранее.
