---
title: "ADAMANT InfoService v3.3.5 добавляет проверку курсов из нескольких источников"
slug: "reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
description: "ADAMANT InfoService агрегирует курсы валют и криптовалют с MOEX, Currency Api, Coinmarketcap, CryptoCompare и Coingecko, предоставляя их через API…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
publishedAt: "2022-02-15T10:59:58.332Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/791bd7d9e097/001-1-olubh0mvysjvmtykzm2u4a-png.webp"
cardSpan: "full"
originalId: "medium:791bd7d9e097"
locale: "ru"
placeholder: false
---

ADAMANT InfoService — это сервис, который агрегирует курсы валют и криптовалют с MOEX, Currency-Api, Coinmarketcap, CryptoCompare и Coingecko, предоставляя их через API для подключаемых приложений.

Выпуск v3.3.5 добавляет Currency-Api в качестве дополнительного источника данных по фиатным валютам. Более важное изменение — InfoService теперь сравнивает курсы, полученные из разных источников, и помечает некорректные или аномальные данные при обнаружении отклонений. Такая кросс-валидация повышает надёжность сервиса, поскольку снижает вероятность передачи ошибочных курсов потребителям из-за сбоя одного из источников.

Также в релизе выполнена внутренняя рефакторизация кода, исправлены ошибки, добавлена интеграция с линтером и обновлены зависимости.

Документация по API доступна в [вики ADAMANT InfoService](https://github.com/Adamant-im/adamant-currencyinfo-services/wiki/InfoServices-API-documentation). Полные заметки о релизе находятся на [странице v3.3.5](https://github.com/Adamant-im/adamant-currencyinfo-services/releases/tag/v3.3.5).
