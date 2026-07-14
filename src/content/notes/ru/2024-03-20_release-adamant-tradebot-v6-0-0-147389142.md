---
title: "ADAMANT Tradebot v6.0.0"
slug: "release-adamant-tradebot-v6-0-0-147389142"
description: "В этом выпуске представлены крупные изменения в ADAMANT Tradebot, включая объединение конфигурации бирж в один файл tradeParams_Default.js."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0"
publishedAt: "2024-03-20T08:46:40Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v6.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:147389142"
locale: "ru"
placeholder: false
---

Этот выпуск вносит крупную рефакторизацию в ADAMANT Tradebot, объединяя конфигурацию бирж в один файл `tradeParams_Default.js`, используемый для всех бирж. Функции `getSmartPrice()` и `getCleanPrice()` были обновлены, а также функция `isOrderOutOfPriceWatcherRange()`. Добавлены дополнительные вспомогательные функции для поддержки этих изменений.

Система отслеживания цен была улучшена и теперь поддерживает действие `prevent`. Оценка объёма теперь отображается при обновлении суммы или интервала. Команда `/stats` предоставляет расширенную информацию, а команда `/info` может получать данные о сетях и выводе монет. Информация о балансах также была расширена.

Команда `/account` теперь предоставляет информацию о торговых комиссиях и объёме. Бот собирает данные о заполнении ордеров для всех ордеров, а динамический построитель стакана ордеров был улучшен. После размещения маркет-мейкерского ордера бот проверяет, был ли ордер исполнен. Функция `getMinOrderAmount()` также была улучшена.

Добавлена поддержка биржи XeggeX. Обновлены коннекторы бирж для Azbit, Coinstore, FameEX, NonKYC, P2B и StakeCube. Выпуск также включает разные улучшения, исправления ошибок и обновлённые зависимости.
