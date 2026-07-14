---
title: "ADAMANT Tradebot v8.0.0"
slug: "release-adamant-tradebot-v8-0-0-345264629"
description: "ADAMANT Tradebot v8.0.0 — крупное обновление open-source бота для маркет-мейкинга, версия пакета обновлена с 7.0.1 до 8.0.0. Переработан процесс запуска, добавлены миграции базы данных и предварительная инициализация."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v8.0.0"
publishedAt: "2026-06-26T10:47:34Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v8.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:345264629"
locale: "ru"
placeholder: false
---

ADAMANT Tradebot v8.0.0 — крупное обновление open-source бота для маркет-мейкинга, версия пакета обновлена с 7.0.1 до 8.0.0.

Процесс запуска был переработан и теперь включает миграции базы данных и предварительную инициализацию. Обработчики ADM-команд стали модульными и размещены в директории `modules/commands/`. Добавлен новый конвейер обработки ADM-транзакций с компонентами `adamantApi`, `admTxChecker` и `admTxParser`.

Добавлен необязательный WebUI API, построенный на Fastify HTTP с JWT-аутентификацией, валидацией через Zod и транспортом Socket.IO. API предоставляет маршруты для управления аккаунтом, статусом бота, командами, рыночными данными, сообщениями и параметрами торгов.

Обновлены коннекторы бирж: XeggeX удалён, FameEX перенесён на FameEXnet, обновлены Azbit, P2PB2B, NonKYC, Coinstore и StakeCube.

Теперь требуется Node.js v22.2+, а также `adamant-api` 3.x и `mongodb` 7.x. Инструментарий обновлён до ESLint 10, расширены тестовые наборы Jest, улучшено покрытие JSDoc в директории `types/`. Добавлена документация `CONTRIBUTING.md`, обновлены `README.md` и `config.default.jsonc`.

Чтобы обновиться, загрузите последний код, установите зависимости, сравните и объедините ваш `config.jsonc` с `config.default.jsonc`, затем запустите бота.

```bash
git pull
npm i
# Review and merge config.jsonc with config.default.jsonc
npm start
```

### Критические изменения

Теперь требуется Node.js v22.2+, ранее требовался v18+. В ходе миграции базы данных поле `type` в ордерах переименовано в `side`. Изменения в схеме конфигурации требуют проверки `config.default.jsonc` и внесения обновлений в существующие конфиги. Коннектор XeggeX удалён, пользователи FameEX должны перейти на коннектор FameEXnet. Метаданные лицензии изменены на `UNLICENSED` с `private: true`.
