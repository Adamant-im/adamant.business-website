---
title: "ADAMANT Tradebot v7.0.0"
slug: "release-adamant-tradebot-v7-0-0-201883296"
description: "В этом выпуске представлено кэширование запросов и новые команды для работы с биржами: /orderbook, /trades, /ticker, /order, /cancel. Обновлена команда /help."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0"
publishedAt: "2025-02-23T05:56:49Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v7.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:201883296"
locale: "ru"
placeholder: false
---

Этот выпуск представляет функцию кэширования запросов и несколько новых команд для взаимодействия с биржами, включая `/orderbook`, `/trades`, `/ticker`, `/order` и `/cancel`. Команда `/help` была обновлена, чтобы включать информацию о программном обеспечении бота и его конфигурации.

Модули Command, Order book и Trader были рефакторингованы для улучшения сопровождаемости. Добавлен новый параметр конфигурации `database` для поддержки этих изменений. Исправлена функция `getOrderDetails()` в коннекторах Azbit и P2B.

Зависимости были обновлены, а также по всему коду применены общие исправления ошибок и улучшения. Улучшено логирование, добавлены TypeScript-типы для повышения безопасности типов и удобства разработки.
