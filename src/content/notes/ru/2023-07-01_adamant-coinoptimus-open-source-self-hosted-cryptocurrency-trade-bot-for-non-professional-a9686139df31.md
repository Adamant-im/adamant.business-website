---
title: "ADAMANT CoinOptimus: открытый торговый бот для криптовалют с самостоятельным хостингом"
slug: "adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-a9686139df31"
description: "ADAMANT CoinOptimus — это саморазмещаемый торговый бот для криптовалют, предназначенный для непрофессиональных трейдеров, которые хотят автоматизации, не передавая контроль над ключами третьим лицам."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-traders-a9686139df31"
publishedAt: "2023-07-01T12:39:55.877Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/a9686139df31/001-0-ygfhry-dhfu9rszm.webp"
cardSpan: "full"
originalId: "medium:a9686139df31"
locale: "ru"
placeholder: false
---

ADAMANT CoinOptimus — это саморазмещаемый торговый бот для криптовалют, предназначенный для непрофессиональных трейдеров, которые хотят автоматизации, не передавая контроль над своими ключами сторонним сервисам. Поскольку бот работает на вашем собственном сервере, пользователи, заботящиеся о конфиденциальности, полностью сохраняют контроль над учетными данными API биржи. Бот также подойдёт случайным энтузиастам криптовалют и, благодаря своей стратегии лестницы/сетки, владельцам проектов или маркет-мейкерам, стремящимся заполнить стаканы заявок и повысить ликвидность.

Бот построен на Node.js и постоянно работает на VPS. Вы настраиваете целевую биржу и торговую пару в файле `config.jsonc`, указываете ключи API биржи (желательно только для торговли, без прав вывода) и управляете ботом, отправляя команды с символом слеш через ADAMANT Messenger. Уведомления о сделках в реальном времени могут доставляться в ADAMANT Messenger, Slack и Discord. С момента первого релиза CoinOptimus поддерживает Binance, Bitfinex, P2PB2B, Azbit и StakeCube.

### Стратегия лестницы/сетки

CoinOptimus в основном использует оптимальную стратегию лестницы/сетки. Бот размещает несколько ордеров на покупку и продажу, начиная со спреда. Когда ближайший ордер исполняется, он размещает соответствующий ордер с противоположной стороны, следуя принципу покупки по цене ниже цены продажи и продажи по цене выше цены покупки. Такой подход показывает наилучшие результаты на волатильных рынках.

![ADAMANT CoinOptimus: Open-source Self-Hosted Cryptocurrency Trade Bot for Non-Professional Traders](/images/engineering-notes/medium/a9686139df31/002-0-tfo-ftrmwbt1zl7r.webp)

![ADAMANT CoinOptimus: Open-source Self-Hosted Cryptocurrency Trade Bot for Non-Professional Traders](/images/engineering-notes/medium/a9686139df31/003-0-2twg79hid4ph-cia.webp)

### Установка и настройка

CoinOptimus предназначен для Ubuntu 18–22 и CentOS 8, с зависимостями от Node.js v16+ и MongoDB v6+. Установка включает клонирование [репозитория на GitHub](https://github.com/Adamant-im/adamant-coinoptimus) и выполнение команды `npm install`. Настройка осуществляется через `config.jsonc`, где вы указываете парольную фразу бота ADAMANT, адрес административного аккаунта, которому разрешено отправлять команды, данные биржи и ключи API. При обновлении исходного кода через git проверьте изменения в конфигурации по умолчанию и внесите их в свой `config.jsonc`, затем перезапустите бот.

### Использование через ADAMANT Messenger

Бот использует учётные записи блокчейна ADAMANT, идентифицируемые публичными адресами и защищённые 12-словной парольной фразой. После установки вы отправляете команды через ADAMANT Messenger. Например, `/buy ADM/USDT amount=200 price=0.005` разместит ордер на покупку 200 ADM по цене 0.005 USDT. Чтобы запустить стратегию лестницы с 6 ордерами, шагом цены 3% и примерно 100 USDT на каждый ордер, используйте `/start ld 100 USDT 6 3%`. Полная справка по командам доступна в [вики CoinOptimus](https://github.com/Adamant-im/adamant-coinoptimus/wiki).

![ADAMANT CoinOptimus: Open-source Self-Hosted Cryptocurrency Trade Bot for Non-Professional Traders](/images/engineering-notes/medium/a9686139df31/004-0-jinplg771dicgjt7.webp)

### Отказ от ответственности

CoinOptimus не является гарантированной машиной для получения прибыли. Используйте его на свой собственный риск.
