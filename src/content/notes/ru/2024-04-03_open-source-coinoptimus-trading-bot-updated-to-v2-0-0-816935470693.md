---
title: "CoinOptimus Trading Bot обновлен до версии v2.0.0"
slug: "open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
description: "ADAMANT CoinOptimus, автономный бот для торговли криптовалютами для непрофессиональных трейдеров, обновлен до версии 2.0.0. Обновление включает рефакторинг, исправление ошибок и пять новых команд."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
publishedAt: "2024-04-03T11:29:39.685Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/816935470693/001-1-yi0sr85whds3uma4ith6na-png.webp"
cardSpan: "full"
originalId: "medium:816935470693"
locale: "ru"
placeholder: false
---

ADAMANT CoinOptimus, автономный бот для торговли криптовалютами, предназначенный для непрофессиональных трейдеров, обновлен до версии 2.0.0. Выпуск включает рефакторинг, исправление ошибок и пять новых команд: `/fill`, `/stats`, `/deposit`, `/account` и `/info`.

### Новые команды

Команда `/fill` заполняет стакан заказов серией ордеров за один шаг.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/002-0-p-pmlz9g0oqkhlzh.webp)

Команда `/stats` показывает статистику торговой пары, включая цены, минимумы, максимумы, объём торгов, самую высокую цену покупки в стакане, самую низкую цену продажи, спред и ликвидность стакана.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/003-1-ghu8f-ht7mxhagdmaqo1ag-png.webp)

Команда `/deposit` возвращает адрес для пополнения счёта на бирже через разные блокчейны.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/004-0-j-uwsyddj1i6k3d7.webp)

Команда `/account` показывает торговые комиссии и месячный объём торгов по счёту бота, если такая информация доступна.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/005-0-vfvn8x-wf1ohwg8a.webp)

Команда `/info` отображает всю доступную информацию по конкретной монете и блокчейну.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/006-0-n5uqmmhtmdcwjbe3.webp)

### Как работает CoinOptimus

CoinOptimus — это приложение на Node.js, которое постоянно работает на сервере или VPS. Вы настраиваете его с указанием биржи, торговой пары и API-ключей от своего аккаунта на бирже. Бот управляет торговыми стратегиями и размещает ордера на основе команд, которые вы отправляете через ADAMANT Messenger, и соответствующим образом отвечает.

Бот в основном использует стратегию оптимальной лестницы/сетки (Optimal Ladder/Grid Trade Strategy), размещая несколько ордеров на покупку и продажу с ценами, начинающимися от спреда. Когда ближайший к спреду ордер исполняется, бот добавляет аналогичный ордер с противоположной стороны, следуя принципу покупать дешевле, чем продаёт, и продавать дороже, чем покупает. Такой подход особенно эффективен на волатильных рынках.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/007-0-twtuzn4rmej2q4s8.webp)

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/008-0-ruyx47yeeapvvo4r.webp)

Инструкции по настройке доступны в [README репозитория](https://github.com/Adamant-im/adamant-coinoptimus#usage-and-installation). CoinOptimus не является гарантированной машиной для получения прибыли; используйте его на свой страх и риск.
