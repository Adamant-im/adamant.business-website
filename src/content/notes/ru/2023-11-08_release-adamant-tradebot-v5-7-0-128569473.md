---
title: "ADAMANT Tradebot v5.7.0"
slug: "release-adamant-tradebot-v5-7-0-128569473"
description: "В этом выпуске ADAMANT Tradebot представлены улучшения и обновления. Ордера маркетмейкинга теперь сбрасываются после размещения, а наблюдатель цен стал надежнее."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v5.7.0"
publishedAt: "2023-11-08T16:48:40Z"
author: "just-software-dev"
authorUrl: "https://github.com/just-software-dev"
repo: "adamant-tradebot"
tag: "v5.7.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:128569473"
locale: "ru"
placeholder: false
---

Этот выпуск ADAMANT Tradebot включает несколько улучшений и обновлений для технического обслуживания. Ордера маркетмейкинга теперь сбрасываются после размещения, а компонент наблюдения за ценой (Price Watcher) был улучшен для повышения надежности. Бот теперь отслеживает внешние изменения в файле конфигурации торговли, что позволяет динамичнее управлять настройками без перезапуска. Логирование улучшено для лучшей наблюдаемости в процессе работы. Зависимости обновлены до последних совместимых версий, добавлены правила линтера для повышения качества кода, а также применены несколько незначительных исправлений.

### Критические изменения

Если вы до сих пор используете файл `config.json`, переименуйте его в `config.jsonc`.
