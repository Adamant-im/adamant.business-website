---
title: "Индексатор для Ethereum для получения списка транзакций по адресу"
slug: "indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
description: "Узлы Ethereum не поддерживают получение списка транзакций по адресу. Команда ADAMANT создала открытый индексатор транзакций Ethereum."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
publishedAt: "2019-12-17T09:47:40.803Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f5e5b38d5e8e/001-1-joo929ftoejwheza0gd8ka-png.webp"
cardSpan: "full"
originalId: "medium:f5e5b38d5e8e"
locale: "ru"
placeholder: false
---

Узлы Ethereum не поддерживают нативное получение списка транзакций по заданному адресу. Метод `eth_listTransactions` давно запрашивается, но отсутствует в дорожной карте Ethereum, что вынуждает разработчиков приложений — мессенджеров, блок-эксплореров, кошельков — создавать собственный индексирующий уровень.

Команда ADAMANT разработала бесплатный, открытый [индексатор транзакций Ethereum](https://github.com/Adamant-im/ETH-transactions-storage), чтобы заполнить этот пробел. Написанный на Python, он работает как фоновый сервис, подключающийся к узлу Ethereum (протестировано с geth и parity), получает транзакции через JSON RPC и сохраняет их — включая транзакции со смарт-контрактами — в базе данных Postgres. Слой RESTful API предоставляется через Postgrest, позволяя выполнять запросы по адресу, аналогично тому, как это делает Etherscan.

### Как это работает

Индексатор начинает хранение транзакций с указанного вами номера блока, затем по умолчанию опрашивает новые блоки каждые 20 секунд (интервал настраивается). После заполнения индекса вы можете запрашивать транзакции по адресу через Postgrest. Например, следующий запрос возвращает 25 последних транзакций, связанных с адресом `0x6b924750e56a674a2ad01fbf09c7c9012f16f094`, упорядоченных по временной метке:

```
curl -k -X GET "http://localhost:3000/?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25"
```

Полная документация по API доступна в [документации Postgrest](https://postgrest.org/en/v5.2/api.html).

### Установка

Индексатор работает на Linux (протестировано на Ubuntu 16 и 18). Вам понадобится синхронизированный узел geth или parity, а также Python, Postgresql, Postgrest и nginx. Вы можете запустить индексатор напрямую или как демон:

```
python3.6 you/path/to/script/ethsync.py <yourDB>
```

Индексация занимает время. Чтобы проверить прогресс, запросите последний проиндексированный блок и сравните его с лучшим блоком вашего узла:

```
psql -d index -c 'SELECT MAX(block) FROM ethtxs;'
```

Подробные инструкции по установке и настройке находятся в [репозитории](https://github.com/Adamant-im/ETH-transactions-storage).

### Публичное API

Postgrest публикует API на локальном порту. Чтобы открыть его публично, настройте nginx для проксирования запросов к Postgrest:

```
location /ethtxs {
    proxy_pass http://127.0.0.1:3000;
}

location /aval {
    proxy_pass http://127.0.0.1:3000;
}
```

Это предоставляет два эндпоинта: `/ethtxs` для получения транзакций Ethereum по адресу и `/aval` для статуса сервиса.

### Рабочий пример

Рабочий экземпляр доступен на узле ADAMANT. Открытие следующего URL в браузере возвращает недавние транзакции для примера адреса:

```
https://ethnode1.adamant.im/ethtxs?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25
```
