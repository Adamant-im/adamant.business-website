---
title: "ADAMANT Tradebot v2.10.6"
slug: "release-adamant-tradebot-v2-10-6-35700159"
description: "Этот выпуск посвящён улучшению производительности и стабильности ADAMANT Tradebot. Оптимизировано использование CPU, устранены проблемы с лимитами API и задержками ответов."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v2.10.6"
publishedAt: "2020-12-24T13:13:19Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v2.10.6"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:35700159"
locale: "ru"
placeholder: false
---

Этот выпуск посвящён улучшению производительности и стабильности ADAMANT Tradebot. Использование CPU было оптимизировано, а также устранены несколько проблем, влияющих на лимиты API и задержки в ответах на запросы. Исправлена постраничная выдача ответов от Bit-Z, чтобы обеспечить надёжное получение данных с этой биржи.

Что касается функциональности, команды `/balances`, `/orders`, `/rates` и `/stats` теперь предоставляют дополнительную информацию, которая помогает операторам более эффективно отслеживать активность бота. В рамках текущей рефакторизации добавлен новый модуль `orderUtils`, а также поддержка нового типа ордеров — `man` — для ручного размещения ордеров. Частота уведомлений была снижена, чтобы уменьшить количество ненужных оповещений. Зависимости обновлены до последних совместимых версий.
