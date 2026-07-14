---
title: "Разработка приложений и сервисов на блокчейне ADAMANT с помощью JavaScript API v1.0.0"
slug: "develop-apps-and-services-upon-messenger-s-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
description: "ADAMANT — публичный блокчейн для анонимного обмена сообщениями. Его уникальность — в сервисах, построенных на его основе. Разработчики могут создавать приложения с использованием анонимной передачи данных, шифрованного хранения и других возможностей."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/develop-apps-and-services-upon-messengers-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
publishedAt: "2021-05-28T20:22:13.112Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f00922f5b00d/001-0-fghvl6xn-ahzkh9m.webp"
cardSpan: "full"
originalId: "medium:f00922f5b00d"
locale: "ru"
placeholder: false
---

ADAMANT — публичный блокчейн, предназначенный для анонимного обмена сообщениями. Его уникальность заключается не в самом блокчейне, а в сервисах, построенных на его основе. Любой разработчик может создавать программы, использующие его возможности, включая анонимную передачу сообщений и сигналов, вечное зашифрованное хранилище, доступ к данным с разных устройств, быстрые временные аккаунты и высокую надёжность.

На блокчейне ADAMANT уже работают несколько приложений. Среди них — мессенджер и криптокошелёк, бот-обменник криптовалют, сервис двухфакторной аутентификации на блокчейне и бот для выплат вознаграждений.

![Разработка приложений и сервисов на блокчейне мессенджера — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/002-0-dtmatfmf-pnkc0hj.webp)

![Разработка приложений и сервисов на блокчейне мессенджера — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/003-0-45fiuq9gnu-tgiot.webp)

![Разработка приложений и сервисов на блокчейне мессенджера — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/004-0-oyzmxof2phgcsl2c.webp)

### ADAMANT JavaScript API v1.0.0

ADAMANT JavaScript API обновлён до [v1.0.0](https://www.npmjs.com/package/adamant-api). По сравнению с предыдущей версией, библиотека стала надёжнее при выполнении запросов к блокчейну и проще в использовании. Она демонстрирует децентрализацию на практике: если один узел сети не может обработать запрос, библиотека автоматически переключается на другой узел, повторяя попытки до получения результата. Разработчику не нужно вручную обрабатывать отказы узлов.

Простой пример запроса к блокчейну:

```javascript
api.get('blocks').then(response => {
  console.log(response.data)
})
```

Библиотека была полностью переработана: обновлены и очищены зависимости, переписаны внутренние функции. Версия 1.0.0 несовместима с предыдущей v0.5.3, однако миграция проста. Полная документация доступна в [wiki adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient/wiki).
