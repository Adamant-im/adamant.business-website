---
title: "ADAMANT Tradebot 8.0: Более надёжная основа для маркет-мейкинга на собственном сервере"
slug: "adamant-market-making-software-8-0-a-stronger-foundation-for-your-token-s-market-presence-c8032a1a7d38"
description: "Версия 8.0 — крупнейшее обновление открытого ADAMANT Tradebot за годы. Для эмитентов токенов разрыв между листингом и реальным рынком очевиден: слабый стакан, широкий спред и разрывы отпугивают трейдеров."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-market-making-software-8-0-a-stronger-foundation-for-your-tokens-market-presence-c8032a1a7d38"
publishedAt: "2026-06-26T15:58:19.696Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/c8032a1a7d38/001-0-qywflgfw1krzccj5-png.webp"
cardSpan: "full"
originalId: "medium:c8032a1a7d38"
locale: "ru"
placeholder: false
---

Версия 8.0 — крупнейшее обновление открытого ADAMANT Tradebot за несколько лет. Для эмитентов токенов разрыв между наличием листинга и реальным рынком ощутим: тонкий стакан отпугивает трейдеров, широкий спред делает каждый своп дорогим, а разрывы в стакане выглядят как пренебрежение. Бот устраняет этот разрыв, поддерживая политики спреда, ликвидности и объёмов на биржах, где реально торгуется ваш токен.

Основное предложение остаётся неизменным. Вы размещаете бота на своём VPS, подключаете его к бирже через API-ключи, которые никогда не покидают вашу инфраструктуру, и контролируете, кто может отправлять команды. Версия 8.0 делает бота более надёжным, безопасным и простым в долгосрочной эксплуатации — переходя от решения, требующего постоянного контроля, к инфраструктуре, способной работать автономно.

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/002-1-swca0-a2gacbe1zvi17jjq-png.webp)

### Операционная безопасность

Версия 8.0 обновляет зависимости с чистым аудитом по уязвимостям высокого и критического уровня, усиливает схемы доступа к опциональным API управления и приводит кодовую базу в соответствие с инженерным стандартом, используемым в коммерческих продуктах — без включения функций, доступных только в премиум-версиях. Ваши API-ключи биржи никогда не передаются в ADAMANT или в какую-либо SaaS-панель.

### Интерфейсы управления

Ботом можно управлять через ADAMANT Messenger (оригинальный зашифрованный децентрализованный канал команд), Telegram (доступно в премиум-боте) и веб-интерфейс, находящийся в разработке. Под капотом версия 8.0 добавляет современное закрытое API веб-интерфейса на основе Fastify с JWT-аутентификацией, валидацией схем запросов и обновлениями в реальном времени через WebSocket. Для большинства операторов это остаётся незаметным — вы просто получаете более быстрый и надёжный опыт управления при включённом веб-интерфейсе.

Изо дня в день вы по-прежнему делаете то же самое: проверяете балансы, настраиваете спред, включаете политики объёмов, задаёте диапазоны цен и отключаете модули, когда рынок ведёт себя странно. Разница в том, что теперь бот под капотом обрабатывает эти команды более предсказуемо.

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/003-1-6ltktmqgyhhs6pniej4dcq-png.webp)

### Поддержка бирж

Открытый бот поддерживает ограниченный набор централизованных бирж: Azbit, P2PB2B, StakeCube, Coinstore, FameEX (через FameEXnet — обновлённый коннектор в v8.0) и NonKYC. Пользователям FameEX следует учитывать, что теперь бот взаимодействует с FameEXnet, поэтому обновление требует плановой смены коннектора, а не простого `git pull`. Бесплатная версия намеренно сосредоточена на спотовых рынках с приоритетом REST и без сложности фьючерсов. Более широкая поддержка CEX и продвинутые стратегические модули входят в премиум-продукт.

### Что изменилось под капотом

Старый монолитный обработчик команд был разделён на специализированные модули. Приём транзакций ADAMANT перестроен на `adamant-api` 3.x. Запуск теперь ожидает подключения базы данных, выполняет автоматические миграции, чтобы безопасно обновить устаревшие данные ордеров, подготавливает метаданные бирж и только затем запускает торговые циклы.

Среда выполнения ориентирована на Node.js 22.2+, драйвер MongoDB 7.x и обновлённый HTTP-стек. Слой закрытого веб-интерфейса использует JWT, валидацию схем, списки разрешённых IP и настройки по умолчанию, ориентированные на localhost, чтобы удобство управления не превратилось в поверхность атаки. Новые автоматизированные тесты охватывают API веб-интерфейса и основные вспомогательные компоненты, что снижает риски при обновлениях для технических команд.

### Обновление

Новые проекты можно начать с:

```bash
git clone https://github.com/Adamant-im/adamant-tradebot
cd adamant-tradebot
npm i
cp config.default.jsonc config.jsonc
# edit config.jsonc - pair, API keys, spread/volume settings
npm start
```

Существующие установки v7.x должны остановить бота, выполнить pull, переустановить зависимости, объединить новые поля из `config.default.jsonc` в `config.jsonc` и перезапустить:

```bash
pm2 stop tradebot
git pull
npm i
# merge new config.default.jsonc fields into your config.jsonc
pm2 restart tradebot
```

Выпуск отслеживается в [GitHub PR #110](https://github.com/Adamant-im/adamant-tradebot/pull/110) и закрывает комплексную задачу [#109](https://github.com/Adamant-im/adamant-tradebot/issues/109). Полная документация по установке и командам доступна на [marketmaking.app](https://marketmaking.app/cex-mm/installation/).

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/004-0-fcjgeqhiqq-h0grv-png.webp)

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/005-0-8ihrvb-is-qsshbb-png.webp)
