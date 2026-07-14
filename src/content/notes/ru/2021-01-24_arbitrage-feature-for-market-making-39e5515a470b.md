---
title: "Функция арбитража для маркет-мейкинга"
slug: "arbitrage-feature-for-market-making-39e5515a470b"
description: "Бот ADAMANT для трейдинга и маркет-мейкинга теперь поддерживает функцию арбитража. Владельцы токенов могут настроить отслеживание цен на других биржах с помощью команды /enable pw."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/arbitrage-feature-for-market-making-39e5515a470b"
publishedAt: "2021-01-24T16:41:51.417Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/39e5515a470b/001-0-vcyqehma-vfieqdv-png.webp"
cardSpan: "full"
originalId: "medium:39e5515a470b"
locale: "ru"
placeholder: false
---

Бот ADAMANT для трейдинга и маркет-мейкинга теперь поддерживает функцию арбитража. Владельцы токенов могут настроить отслеживание цен на других биржах и торговых парах с помощью команды `/enable pw`.

Когда маркет-мейкер торгует токеном на нескольких парах или биржах, он может назначить ведущую торговую пару в заданном числовом диапазоне и привязать к ней остальные пары. Получая ценовой диапазон с другой торговой пары, бот будет либо размещать прямые заявки на покупку и продажу по политике *strict*, либо оценивать реальные цены по политике *smart*. Например, на основе заданного стакана заявок политика *strict* может выдать диапазон 0,0122–0,0128, а политика *smart* — более широкий диапазон 0,0114–0,0133.
