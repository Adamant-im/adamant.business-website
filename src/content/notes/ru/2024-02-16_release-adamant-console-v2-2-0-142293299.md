---
title: "ADAMANT Console v2.2.0"
slug: "release-adamant-console-v2-2-0-142293299"
description: "Вики обновлена с учётом последних изменений. Зависимости обновлены до текущих версий. База кода переписана для использования ES-модулей (.mjs) для поддержки современных библиотек."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v2.2.0"
publishedAt: "2024-02-16T09:24:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v2.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:142293299"
locale: "ru"
placeholder: false
---

Вики была обновлена, чтобы отразить последние изменения. Зависимости обновлены до их текущих версий. База кода переписана для использования ES-модулей (.mjs) с целью поддержки современных библиотек. Добавлен Prettier для форматирования кода.

### Критические изменения

Формат файла конфигурации изменился. Ключ `passPhrase` в конфигурации переименован в `passphrase`. Файлы конфигурации `config.json` и `config.default.json` переименованы соответственно в `config.jsonc` и `config.default.jsonc`. Ответ команды `account new` теперь возвращает `passphrase` вместо `passPhrase`. Флаг командной строки `--passPhrase` переименован в `--passphrase`, поэтому `adm --passPhrase=""` теперь следует писать как `adm --passphrase=""`.
