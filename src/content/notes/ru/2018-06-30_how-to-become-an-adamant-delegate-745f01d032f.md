---
title: "Как стать делегатом ADAMANT"
slug: "how-to-become-an-adamant-delegate-745f01d032f"
description: "ADAMANT использует улучшенный алгоритм консенсуса Delegated Proof of Stake (dPoS) под названием Fair dPoS. Чтобы стать делегатом и создавать блоки, нужно запустить ноду, заплатить 3000 ADM и набрать достаточно голосов."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-become-an-adamant-delegate-745f01d032f"
publishedAt: "2018-06-30T10:11:25.366Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/745f01d032f/001-1-rprsczpnpydvk1y6ko-hzg-png.webp"
cardSpan: "full"
originalId: "medium:745f01d032f"
locale: "ru"
placeholder: false
---

ADAMANT достигает консенсуса в блокчейне с помощью улучшенного алгоритма Delegated Proof of Stake (dPoS), известного как Fair dPoS. Чтобы стать делегатом и создавать блоки, вы должны запустить ноду, оплатить регистрационный взнос в размере 3000 ADM и набрать достаточно голосов, чтобы войти в топ-101 делегатов.

Начните с установки и запуска ноды ADAMANT. Как только нода начнёт работать, переключитесь на системного пользователя `adamant` и установите инструмент `adamant-console` из репозиториев npm.

```bash
su - adamant
npm i -g adamant-console
```

![Как стать делегатом ADAMANT](/images/engineering-notes/medium/745f01d032f/002-0-55iagwoakrbgkahj.webp)

Далее создайте каталог конфигурации и скопируйте в него файл конфигурации по умолчанию.

```bash
mkdir ~/.adm && cp /home/adamant/.nvm/versions/node/$(node -v)/lib/node_modules/adamant-console/config.default.json ~/.adm/config.json
```

![Как стать делегатом ADAMANT](/images/engineering-notes/medium/745f01d032f/003-1-5n-ejpboh-pf5plf-85-ug-png.webp)

Отредактируйте скопированный файл `~/.adm/config.json` с помощью текстового редактора. Измените параметр `network` с `testnet` на `mainnet` и добавьте секретную фразу (passphrase) вашего делегата. Храните свою фразу в секрете и обеспечьте безопасность сервера. В качестве альтернативы вы можете не указывать фразу в конфигурации, а передавать её через флаг в командной строке при регистрации.

![Как стать делегатом ADAMANT](/images/engineering-notes/medium/745f01d032f/004-1-zwh5ys2uf2nnz04woxe3zw-png.webp)

Запустите консоль, выполнив команду `adm`. Зарегистрируйте своего делегата, выполнив следующую команду, заменив `<new delegate name>` на желаемое имя. На кошельке, связанном с вашей фразой, должно быть не менее 3000 ADM, чтобы покрыть регистрационный взнос, который распределяется между другими делегатами, создающими блоки.

```bash
delegate new <new delegate name>
```

![Как стать делегатом ADAMANT](/images/engineering-notes/medium/745f01d032f/005-0-khyxu9qp9tk9nbzg.webp)

Если вы не указали фразу в конфигурационном файле, добавьте её непосредственно в команду:

```bash
delegate new <new delegate name> --passPhrase "passphrase here"
```

![Как стать делегатом ADAMANT](/images/engineering-notes/medium/745f01d032f/006-0-fojjd-jrkr-jmvje.webp)

После успешной регистрации выйдите из консоли, нажав `Ctrl+C` дважды. Чтобы начать создание блоков, обновите файл конфигурации вашей ноды по пути `~/adamant/config.json`. Установите параметр `forging/secret` равным вашей двенадцатисловой секретной фразе в кавычках, затем перезапустите ноду.

```bash
nano ~/adamant/config.json
pm2 restart adamant
```

![Как стать делегатом ADAMANT](/images/engineering-notes/medium/745f01d032f/007-1-53boguojm1wx6sexqoa6yq-png.webp)

Вы можете проверить статус своего делегата, посетив ADAMANT Delegate Monitor и найдя своё имя делегата. Это перенаправит вас на страницу с подробной информацией, подтверждающей регистрацию.

![Как стать делегатом ADAMANT](/images/engineering-notes/medium/745f01d032f/008-1-sq6rao5bjro6dpbpbiwqlq-png.webp)

![Как стать делегатом ADAMANT](/images/engineering-notes/medium/745f01d032f/009-1-xutdvsnjzh06yedz6uq1jg-png.webp)

Сама по себе регистрация не включает создание блоков — вы должны получить голоса от пользователей ADAMANT через приложения Messenger. Как только ваш делегат наберёт достаточно голосов, чтобы войти в топ-101, отслеживайте его производительность в Delegate Monitor. Зелёный кружок означает успешное создание блоков, а серый, жёлтый или красный указывают на проблемы с конфигурацией — обычно это неправильная секретная фраза в конфигурации ноды — или на простой ноды. Держите ноду в рабочем состоянии, отслеживайте позицию делегата и своевременно применяйте важные обновления.
