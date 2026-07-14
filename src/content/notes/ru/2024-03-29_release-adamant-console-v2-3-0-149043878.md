---
title: "ADAMANT Console v2.3.0"
slug: "release-adamant-console-v2-3-0-149043878"
description: "В этом выпуске представлено новое CLI-команды adm init [путь], позволяющее копировать файл конфигурации по умолчанию в ~/.adm/ или указанный каталог. Без изменений, нарушающих совместимость."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v2.3.0"
publishedAt: "2024-03-29T17:13:09Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-console"
tag: "v2.3.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:149043878"
locale: "ru"
placeholder: false
---

В этом выпуске представлено новое CLI-команды `adm init [path]`, которое позволяет пользователям копировать файл конфигурации по умолчанию в `~/.adm/` или в указанный путь к каталогу.

```bash
# to copy to ~/.adm/$ADM_CONFIG_FILENAME
$ adm init
# to copy to the specific directory
$ adm init ./my-dir
```

В этом выпуске не внесено изменений, нарушающих совместимость.
