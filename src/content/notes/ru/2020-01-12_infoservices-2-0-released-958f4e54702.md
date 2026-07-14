---
title: "InfoServices 2.0 released"
slug: "infoservices-2-0-released-958f4e54702"
description: "ADAMANT InfoServices обновлён до версии 2.0 с новыми функциями и улучшениями стабильности. Сервис теперь получает курсы из CryptoCompare и Coingecko, минимизируя вызовы API Coinmarketcap."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/infoservices-2-0-released-958f4e54702"
publishedAt: "2020-01-12T12:25:26.832Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/958f4e54702/001-0-zxv8izxs4xnlu4e.webp"
cardSpan: "full"
originalId: "medium:958f4e54702"
locale: "ru"
placeholder: false
---

ADAMANT InfoServices обновлён до версии 2.0, в которой представлены новые функции и улучшения стабильности. Сервис теперь получает курсы криптовалют из CryptoCompare и Coingecko, сводя к минимуму вызовы API Coinmarketcap для оптимизации использования. Надёжность дополнительно повышена за счёт уведомлений об ошибках, отправляемых через ADAMANT и Slack, а также ведением общего лога операций. Новый модуль чтения конфигурации позволяет задавать более детальные настройки в конфигурационном файле. Обновление включает изменения в 15 файлах, 462 вставки и 75 удалений.

Являясь бесплатным и открытым провайдером курсов крипто- и фиатных валют, ADAMANT InfoServices агрегирует данные с MOEX, Coinmarketcap, CryptoCompare и Coingecko. Сервис рассчитывает кросс-курсы и предоставляет информацию через API. Для разработчиков крипто-проектов самостоятельное размещение этого сервиса даёт более надёжное решение для получения котировок по сравнению с использованием сторонних конечных точек.
