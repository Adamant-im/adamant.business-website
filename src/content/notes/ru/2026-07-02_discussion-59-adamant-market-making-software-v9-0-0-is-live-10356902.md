---
title: "ADAMANT Market-Making Software v9.0.0 вышло в свет"
slug: "discussion-59-adamant-market-making-software-v9-0-0-is-live-10356902"
description: "Выпущено ADAMANT Market-Making Software v9.0.0. Первая публичная версия открытого бота для маркет-мейкинга, который вы запускаете самостоятельно с собственными ключами."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/59"
publishedAt: "2026-07-02T06:58:44Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10356902"
locale: "ru"
placeholder: false
---

# ADAMANT Market-Making Software v9.0.0 вышло в свет

Первая публичная версия открытого бота ADAMANT для маркет-мейкинга теперь доступна. Программа работает локально: вы запускаете её с доступом к собственному аккаунту на бирже и своими ключами, без участия третьих лиц.

## Установка

Бот распространяется как пакет npm и как образ Docker.

**npm (CLI `mm`):**

```bash
npm install -g adamant-tradebot
mm init
mm on
```

**Docker (GHCR):**

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

Также доступна оболочка командной строки на основе `docker-compose`; подробности см. в [README](https://github.com/Adamant-im/adamant-tradebot#readme).

## Что нового в v9.0.0

В этом выпуске представлен CLI `mm` с командами `init`, `on`, `off`, `doctor`, `status` и `logs`, а также публичный образ Docker, размещённый на GHCR. Ядро маркет-мейкинга переработано в виде модульных компонентов: трейдер, построитель стакана, поставщик ликвидности и наблюдатель за ценами. Поддерживаются коннекторы бирж: Azbit, Coinstore, FameEXnet, NonKYC, P2PB2B и StakeCube. Также заложена основа для WebUI API, включены тесты и расширенная документация.

Заметки о выпуске и исходный код доступны на [GitHub](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0). Пакет npm опубликован на [npmjs.com](https://www.npmjs.com/package/adamant-tradebot).
