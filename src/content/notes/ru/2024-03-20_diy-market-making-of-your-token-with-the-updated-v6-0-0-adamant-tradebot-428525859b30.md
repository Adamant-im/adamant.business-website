---
title: "Создание маркет-мейкинга своими силами с помощью ADAMANT TradeBot v6.0.0"
slug: "diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
description: "Открытый инструмент ADAMANT для автономного маркет-мейкинга — обновление v6.0.0 с улучшениями конфигурации, новыми командами и поддержкой бирж"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
publishedAt: "2024-03-20T08:47:50.471Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/428525859b30/001-0-nwojohhggiizs7us.webp"
cardSpan: "full"
originalId: "medium:428525859b30"
locale: "ru"
placeholder: false
---

The ADAMANT Trading & Market Making Bot — это открытый инструмент для эмитентов токенов и криптобирж, которым требуется автономный маркет-мейкинг. Он размещает и исполняет ордера для генерации объёмов торгов, поддержания спреда и ликвидности, формирования динамических стаканов и отслеживания цен на токены. Версия 6.0.0 включает ряд улучшений, на которые стоит обратить внимание при эксплуатации или настройке бота.

### Изменения в конфигурации и кодовой базе

Кодовая база была реорганизована, чтобы упростить настройку для всех, кто работает с открытым проектом. Конфигурация теперь упрощена за счёт единого черновика торговой конфигурации, применимого ко всем поддерживаемым биржам. Функции цены, такие как `getSmartPrice()` и `getCleanPrice()`, а также вспомогательные функции, были обновлены для повышения точности. Модули наблюдения за ценой и построения динамического стакана также улучшены для более надёжного мониторинга рынка.

### Действие «prevent» в наблюдателе цены

Ранее единственным действием наблюдателя цены была команда «fill» — активное размещение ордеров на покупку или продажу для следования цене с другой биржи. Такой подход мог подвергать бота манипуляциям со стороны третьих лиц. Новое действие «prevent» использует иной подход: вместо принудительного установления цены через размещение ордеров оно задаёт безопасный ценовой диапазон, которого должны придерживаться другие модули бота (например, ликвидность), запрещая покупку по завышенной цене и продажу по заниженной за пределами этого диапазона.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/002-0-p2uha5tzki-2klb.webp)

### Новые и расширенные команды

Команда `/deposit` теперь отображает адреса для депозитов по всем доступным сетям, что упрощает пополнение.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/003-0-tj9d8w7qcgqwofa4.webp)

Новая команда `/info` отображает всю доступную информацию по конкретному токену, включая данные о блокчейне.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/004-0-raft4mu2likg0c8p.webp)

Отмена ордеров теперь может фильтроваться по типу модуля (ручной режим, построитель стакана, наблюдатель цены, ликвидность и т.д.), по стороне (покупка или продажа) и по цене. Это даёт администраторам более тонкий контроль при управлении активными ордерами.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/005-0-3slqf62rcikx-msf.webp)

При использовании команд `/amount`, `/interval` или `/stats` бот теперь сообщает оценочный объём торгов, который он генерирует, помогая операторам прогнозировать активность.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/006-0-9eqmd9xwf7q7i7f6.webp)

Новая команда `/account` отображает торговые сборы и месячный объём торгов по аккаунту бота, если биржа предоставляет эти данные.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/007-0-llggirhb0bb42g5m.webp)

Команда `/stats` была расширена и теперь включает цены торговых пар, минимумы и максимумы, объём торгов, лучшую цену спроса и предложения со спредом, ликвидность стакана, оценочный объём маркет-мейкинга, а также статистику ордеров по типам с итоговыми суммами.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/008-0-hr1rvff4aeshjtpw.webp)

### Поддержка бирж

Теперь бот поддерживает XeggeX, а также обновлённые коннекторы для бирж Azbit, Coinstore, FameEX, NonKYC, P2B и StakeCube. В релиз вошли различные исправления ошибок и прочие улучшения.

Выпуск и список изменений доступны на GitHub: [adamant-tradebot v6.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0).
