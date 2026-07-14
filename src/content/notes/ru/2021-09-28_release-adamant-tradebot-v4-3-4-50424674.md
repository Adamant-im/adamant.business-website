---
title: "ADAMANT Tradebot v4.3.4"
slug: "release-adamant-tradebot-v4-3-4-50424674"
description: "В этом выпуске добавлена поддержка биржи P2PB2B и удалена биржа Atomars. Бот теперь получает информацию о десятичных дробях и торговых парах напрямую с бирж, когда это возможно…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v4.3.4"
publishedAt: "2021-09-28T20:06:30Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v4.3.4"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:50424674"
locale: "ru"
placeholder: false
---

В этом выпуске добавлена поддержка биржи P2PB2B и удалена биржа Atomars. Бот теперь получает информацию о десятичных дробях и торговых парах напрямую с бирж, когда это возможно, что повышает надёжность размещения ордеров и расчётов баланса.

Зависимости были обновлены, включая переход на ADAMANT JS API v1.1.0. Команды были обновлены, в проект добавлен ESLint, а также проведён общий рефакторинг кода.

Теперь уведомления можно отправлять на несколько адресов. Балансы и ордера сохраняются отдельно для каждого отправителя, что обеспечивает более чистое управление состоянием при работе нескольких пользователей.
