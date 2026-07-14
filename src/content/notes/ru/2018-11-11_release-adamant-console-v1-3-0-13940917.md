---
title: "ADAMANT Console v1.3.0"
slug: "release-adamant-console-v1-3-0-13940917"
description: "В этом выпуске представлены две новые команды: account new и get transactions. Добавлена поддержка опции passPhrase для прямого ввода парфразы."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v1.3.0"
publishedAt: "2018-11-11T16:19:44Z"
author: "zyuhel"
authorUrl: "https://github.com/zyuhel"
repo: "adamant-console"
tag: "v1.3.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:13940917"
locale: "ru"
placeholder: false
---

Этот выпуск представляет две новые команды: `account new` и `get transactions`. Также добавлена поддержка опции `--passPhrase`, позволяющей пользователям напрямую указывать парфразу при выполнении команды.

В этот выпуск включено несколько исправлений. Устаревшие вызовы `new Buffer()` были заменены, а ошибка, приводившая к некорректной загрузке конфигурации, устранена. Временно обновлена зависимость в ожидании слияния dthree/vorpal#322.
