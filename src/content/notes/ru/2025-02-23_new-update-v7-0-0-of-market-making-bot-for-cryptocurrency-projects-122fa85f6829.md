---
title: "Market-making bot v7.0.0: кэширование запросов, новые команды и настройка базы данных"
slug: "new-update-v7-0-0-of-market-making-bot-for-cryptocurrency-projects-122fa85f6829"
description: "Бесплатный, с открытым исходным кодом, самостоятельно размещаемый инструмент для криптопроектов и бирж. Создает объем торгов, поддерживает спред и ликвидность, устанавливает диапазон цен и формирует динамический стакан"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-update-v7-0-0-of-market-making-bot-for-cryptocurrency-projects-122fa85f6829"
publishedAt: "2025-02-23T06:05:24.786Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/122fa85f6829/001-0-eevpacxefsrwodwf.webp"
cardSpan: "full"
originalId: "medium:122fa85f6829"
locale: "ru"
placeholder: false
---

Бот для маркет-мейкинга ADAMANT — это бесплатный, с открытым исходным кодом, самостоятельно размещаемый инструмент для криптопроектов и бирж. Он создает объем торгов, поддерживает спред и ликвидность, устанавливает диапазон цен и формирует динамический стакан, имитирующий реальную активность. Версия 7.0.0 включает кэширование запросов, несколько новых команд, настройку базы данных, а также исправления ошибок и рефакторинг.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/002-0-vbzoksgzwcabzz-z.webp)

### Кэширование запросов

API бирж ограничивают частоту запросов, и при активной торговле бот может столкнуться с ошибкой `429 Rate limit exceeded`. Это прерывает торговлю и в некоторых случаях может привести к блокировке аккаунта со стороны биржи.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/003-0-sgbs6ithtx73pqm2.webp)

Новая функция кэширования решает эту проблему, объединяя результаты запросов балансов, стаканов и открытых ордеров в течение короткого интервала — примерно одной-двух секунд. Ранее это была платная функция, теперь кэширование доступно всем пользователям.

### Новые команды

Команда `/help` теперь отображает базовую информацию о программном обеспечении бота и его конфигурации. Добавлены дополнительные команды для проверки состояния биржи и управления отдельными ордерами:

`/orderbook [pair] [count]` возвращает текущие заявки на покупку и продажу из стакана.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/005-0-cu4bhsoehypr6ini.webp)

`/trades [pair] [count]` возвращает самые свежие сделки.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/006-0-syt1bu8k15rurvv0.webp)

`/ticker [pair]` предоставляет данные тикера в формате JSON, аналогично команде `/rates`.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/007-0-uvfrkvq-y40vijsu.webp)

`/order {orderId}` возвращает детали конкретного ордера по его идентификатору.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/008-0-m50bnrxoc27z38oc.webp)

`/cancel {orderId}` отменяет конкретный ордер по идентификатору и возвращает его детали.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/009-0-um38pjzfvcanrry7.webp)

### Настройка базы данных

Теперь вы можете задать параметры базы данных в конфигурационном файле, включая имя базы данных. Это позволяет запускать несколько экземпляров бота на одном сервере. Торговля может потреблять значительные ресурсы CPU и RAM, поэтому перед запуском нескольких экземпляров проверьте нагрузку на ресурсы.

Чтобы настроить базу данных, отредактируйте файл `config.jsonc` и измените параметры `db`:

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/010-0-yfdntcpmwdyzvj8c.webp)

Изменение совместимо с предыдущими версиями: если конфигурация не обновлена, бот использует параметры базы данных по умолчанию.

### Исправления коннекторов и другие улучшения

Коннекторы Azbit и P2B получили исправления для `getOrderDetails()`, включая обходные решения для недостатков в API обеих бирж. Модули Command, Order book и Trader были рефакторены, а в рамках постоянной работы по улучшению качества кода добавлены типы TypeScript. Обновлены зависимости, улучшено логирование и исправлено несколько мелких ошибок.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/011-0-la8ixtoq1x1d6nbm.webp)

Бот продолжает предоставлять информативные уведомления, чтобы операторы могли отслеживать торговую активность.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/012-0-bb8s0ouz9vefnxus.webp)

Релиз и полный список изменений доступны на GitHub: [v7.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0).
