---
title: "ADAMANT Tradebot v9.0.0"
slug: "release-adamant-tradebot-v9-0-0-347857922"
description: "ADAMANT Tradebot v9.0.0 — первый распространяемый релиз open-source бота для маркет-мейкинга. Обновление пакета с 8.0.0 до 9.0.0. Установка, основные изменения"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0"
publishedAt: "2026-07-02T06:12:07Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v9.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:347857922"
locale: "ru"
placeholder: false
---

# ADAMANT Tradebot v9.0.0

Это первый распространяемый релиз открытого бота для маркет-мейкинга. Версия пакета обновлена с 8.0.0 до 9.0.0.

## Установка

```bash
npm install -g adamant-tradebot
mm init
```

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

## Основные изменения

### Распространение

Бот теперь распространяется как npm-пакет `adamant-tradebot` с CLI-командой `mm`, предоставляющей команды, такие как `mm init`, `mm on`, `mm off`, `mm doctor` и другие. Docker-образ доступен в GHCR по адресу `ghcr.io/adamant-im/adamant-tradebot`, а также представлен стек `docker-compose` для MongoDB и локального запуска. Релизы в npm и GHCR публикуются автоматически с помощью GitHub Actions.

### Архитектура (с базовой версии v8)

База кода теперь включает модульные обработчики команд ADM в директории `modules/commands/`. Создана основа WebUI API с использованием Fastify, JWT, Zod и Socket.IO. Модули маркет-мейкинга — trader, order book builder, liquidity provider и price watcher — были рефакторингованы. Добавлены JSDoc-типы в директории `types/`, расширены тесты на Jest и настройка ESLint в flat-формате.

### Коннекторы бирж

Поддерживаемые биржи теперь включают Azbit, Coinstore, FameEXnet, NonKYC, P2PB2B и StakeCube. Устаревшие коннекторы для Bit-Z, CoinDeal и IDCM удалены.

### Документация

Файл README полностью переработан для эмитентов токенов и пользователей, настраивающих маркет-мейкинг самостоятельно. Добавлены `CONTRIBUTING.md` и инструкции для AI-агентов.

### Критические изменения

Конфигурация теперь использует `config.default.jsonc` в сочетании с командой `mm init`, вместо сохранённого файла `config.json`. Требуется Node.js v22.2 или новее. Устаревшие коннекторы бирж удалены, поэтому пользователям необходимо перейти на поддерживаемые биржи. Жизненный цикл npm- и локальных установок теперь управляется через CLI с помощью команд `mm on` и `mm off`.
