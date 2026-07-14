---
title: "ADAMANT для iOS внедряет API Chatrooms для ускорения обмена сообщениями в блокчейне"
slug: "adamant-for-ios-applies-special-api-for-messaging-in-blockchain-b52418a6639a"
description: "ADAMANT для iOS теперь поддерживает API Chatrooms для обмена сообщениями в блокчейне, ускоряя загрузку сообщений до 50 раз. Улучшение заметно сразу после входа в аккаунт ADM."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-for-ios-applies-special-api-for-messaging-in-blockchain-b52418a6639a"
publishedAt: "2022-07-23T13:24:47.800Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:b52418a6639a"
locale: "ru"
placeholder: false
---

ADAMANT для iOS теперь поддерживает API Chatrooms для обмена сообщениями в блокчейне, ускоряя загрузку сообщений до 50 раз. Это улучшение сразу заметно при входе в аккаунт ADM. Ранее этот же API был реализован в настольных приложениях.

API Chatrooms предоставляет два основных эндпоинта. Первый — `/api/chatrooms/U000000000000` — возвращает список чатов для указанного аккаунта. Второй — `/api/chatrooms/U000000000000/U000000000001` — получает историю сообщений между двумя конкретными аккаунтами. Для оптимизации передачи данных API поддерживает пагинацию. Дополнительные технические сведения доступны в AIP 14.

Версия 2.5.0 iOS-приложения включает интеграцию API Chatrooms, а также более быстрое получение курсы криптовалют, общие улучшения производительности, оптимизацию под MacBook M1 и различные исправления ошибок.
