---
title: "Первый стейблкоин в ADAMANT: USDS от Stably"
slug: "the-first-stablecoin-in-adamant-meet-usds-by-stably-42106aae239"
description: "Интеграция токенов в ADAMANT показала необходимость стейблкоина в кошельке. Стейблкоины сохраняют стоимость и полезны для повседневной торговли активами и оплаты товаров и услуг."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/the-first-stablecoin-in-adamant-meet-usds-by-stably-42106aae239"
publishedAt: "2019-08-02T11:09:24.464Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/42106aae239/001-0-wizmb-2p-jaeiioj.webp"
cardSpan: "full"
originalId: "medium:42106aae239"
locale: "ru"
placeholder: false
---

Интеграция токенов в ADAMANT показала, что в кошельке необходим стейблкоин. Стейблкоины сохраняют стоимость и полезны для повседневной торговли блокчейн-активами, а также для оплаты товаров и услуг. После оценки нескольких вариантов ADAMANT выбрал StableUSD (USDS) в качестве своего первого стейблкоина.

### О StableUSD

USDS выпускается компанией Stably Blockchain Labs, Inc., канадской организацией. Каждый токен USDS обеспечен на 1:1 долларом США, хранящимся в резерве, поэтому его стоимость привязана к доллару США. StableUSD торгуется на Bittrex и Binance и является основным стейблкоином на Binance DEX. Монета существует в двух сетях: Ethereum (USDS) и Binance Chain (USDSB). ADAMANT интегрировал версию в сети Ethereum.

Команда Stably была выбрана отчасти благодаря их открытости новым технологиям и готовности к сотрудничеству, в отличие от более крупных эмитентов стейблкоинов, которые не проявляли интереса к взаимодействию. Дорожная карта сотрудничества включает хранение USDS в кошельке и переводы в чатах, а затем интеграцию в внутренние сервисы ADAMANT, такие как встроенные обменники криптовалют.

### USDS в мессенджере

Пользователи веб-приложения получают кошелек USDS прямо в ADAMANT. Пользователи могут переводить USDS в чатах своим контактам и использовать его для оплаты.

![Кошелек USDS в ADAMANT](/images/engineering-notes/medium/42106aae239/002-1-ykzho7rrajzcrnwtdkn40w-png.webp)

Комиссия за отправку USDS оплачивается в Ether (ETH) — токене газа сети Ethereum. Такой подход позволяет кошельку точно определять сумму отправляемого USDS и упрощает расчет комиссий для пользователя.

![Отправка USDS в ADAMANT](/images/engineering-notes/medium/42106aae239/003-0-ovcrx5nnfyucgphs.webp)
