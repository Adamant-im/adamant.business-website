---
title: "Получайте DASH мгновенно в ADAMANT Messenger и криптокошельке"
slug: "receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
description: "ADAMANT Messenger 2.12.0 поддерживает Dash InstantSend — теперь переводы DASH приходят мгновенно без ожидания подтверждений сети. Обычно криптооперации требуют времени на подтверждение, но Dash InstantSend использует мастерноды для мгновенной валидации."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
publishedAt: "2021-08-04T13:23:12.613Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9cbe8401d6c0/001-0-omadd6rxri1q0dfd.webp"
cardSpan: "full"
originalId: "medium:9cbe8401d6c0"
locale: "ru"
placeholder: false
---

ADAMANT Messenger версии 2.12.0 добавляет поддержку Dash InstantSend, позволяя получать переводы DASH мгновенно, без ожидания подтверждений сети. Обычно переводы криптовалют требуют ожидания подтверждений блоков, но Dash InstantSend использует мастерноды для проверки транзакций и гарантирует их включение в следующие блоки. Помимо этого, обновление ускоряет обновление статуса транзакций для других поддерживаемых криптовалют.

Выпуск также интегрирует бота ADM Bounty прямо в чаты. Этот бот автоматически и мгновенно выплачивает вознаграждения за выполненные задачи и на данный момент поддерживает кампании в Twitter. Пользователи могут отправить команду `/help` боту, чтобы узнать правила кампании.

![Получайте DASH мгновенно в ADAMANT Messenger и криптокошельке](/images/engineering-notes/medium/9cbe8401d6c0/002-0-hofe2-yqoknm1e74.webp)

Для обеспечения надёжности и безопасности кода обновление включает переход на версии зависимостей без известных уязвимостей. Уменьшён объём приложения за счёт удаления неиспользуемых неанглийских списков слов bip39. Кроме того, оптимизировано создание криптографических ключей для встроенных криптокошельков, что делает вход в новую учётную запись примерно в шесть раз быстрее благодаря кэшированию сида. Дополнительные работы включают обновление библиотек Ethereum, удаление устаревшей ссылки на биржу Atomars и внедрение различных исправлений ошибок.
