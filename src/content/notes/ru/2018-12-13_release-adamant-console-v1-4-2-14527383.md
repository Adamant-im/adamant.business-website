---
title: "ADAMANT Console v1.4.2"
slug: "release-adamant-console-v1-4-2-14527383"
description: "В этом выпуске ADAMANT Console представлен новый командный параметр get blocks и добавлены методы JSON-RPC: getBlocks, getTransactionsInBlockByHeight и getTransactionsInBlockById."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v1.4.2"
publishedAt: "2018-12-13T22:26:43Z"
author: "zyuhel"
authorUrl: "https://github.com/zyuhel"
repo: "adamant-console"
tag: "v1.4.2"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:14527383"
locale: "ru"
placeholder: false
---

Этот выпуск ADAMANT Console представляет новую команду `get blocks` и добавляет несколько методов JSON-RPC: `getBlocks`, `getTransactionsInBlockByHeight` и `getTransactionsInBlockById`.

Включены различные исправления. Исправлено неправильное расширение `~` в переменных окружения на некоторых версиях Ubuntu. Устранена проблема, при которой параметры по умолчанию не переопределялись в пользовательских конфигурационных файлах. Кроме того, исправлена ошибка в методе `getTransactionsReceivedByAddress`, из-за которой пропускались транзакции, полученные с комментариями.
