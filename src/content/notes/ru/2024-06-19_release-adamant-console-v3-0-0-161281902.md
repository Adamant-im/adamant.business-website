---
title: "ADAMANT Console v3.0.0"
slug: "release-adamant-console-v3-0-0-161281902"
description: "Исправлена проверка параметров публичных ключей и имён делегатов в команде vote for. Команда client version теперь включает дополнительные поля с путём к конфигурационному файлу, сетью и учётной записью."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v3.0.0"
publishedAt: "2024-06-19T12:50:46Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-console"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:161281902"
locale: "ru"
placeholder: false
---

Исправлена проверка параметров публичных ключей и имён делегатов в команде `vote for`. Команда `client version` теперь включает дополнительные поля, показывающие путь к конфигурационному файлу, сеть и учётную запись:

```jsonc
{
  "success": true,
  "version": "3.0.0",
  // The new fields:
  "config": "/home/username/.adm/config.jsonc",
  "network": "mainnet",
  "account": "U3716604363012166999"
}
```

### Критические изменения

В ответе команды `get message` сообщение теперь остаётся зашифрованным внутри объекта `transaction.asset.chat`, вместо того чтобы возвращаться расшифрованным на месте. Добавлено новое поле `transaction.decoded` для уже расшифрованного сообщения, если транзакция содержит публичный ключ настроенного пользователя:

```jsonc
{ // adm get message 3745646290027012070
  "success": true,
  "nodeTimestamp": 214429446,
  "transaction": {
    "id": "3745646290027012070",
    // ...
    "asset": {
      "chat": {
        "message": "d6247af9ff5cd53eeb88a48e62cb47c33cc8b1b37d38e784e0481b8251149d", // <--- encoded message
        "own_message": "ae3f5203f252fa75705a6681fee3244b46da5bb0aa169498",
        "type": 1
      }
    },
    "decoded": "Hello, ADAMANT!" // <--- decoded message
  }
}
```
