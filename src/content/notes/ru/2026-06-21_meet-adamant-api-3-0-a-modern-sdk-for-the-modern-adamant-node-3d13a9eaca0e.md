---
title: "Знакомьтесь: adamant-api 3.0 — современный SDK для современного узла ADAMANT"
slug: "meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
description: "Выпущена версия 3.0.0 JavaScript/TypeScript SDK adamant-api, совместимая с ADAMANT Node v0.10.0. Новые возможности: метки времени в миллисекундах, расширенные запросы, улучшенная отказоустойчивость"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
publishedAt: "2026-06-21T15:54:25.436Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3d13a9eaca0e/001-0-hkmpiqt1p-ubpghb.webp"
cardSpan: "full"
originalId: "medium:3d13a9eaca0e"
locale: "ru"
placeholder: false
---

Пакет `adamant-api` для JavaScript/TypeScript выпустил версию 3.0.0, разработанную для бесшовной работы с ADAMANT Node v0.10.0. Обновление включает метки времени в миллисекундах, расширенные параметры запросов, объединённые ответы о статусе узла и включающую фильтрацию по минимальной версии. SDK обеспечивает автоматические проверки работоспособности, повторные попытки, переключение при сбое, типизированные ответы, шифрование сообщений и подписки на WebSocket в реальном времени.

ADAMANT — это построенный на блокчейне мессенджер с полным сквозным шифрованием и встроенным криптокошельком, не требующий номера телефона и центрального сервера. SDK `adamant-api` абстрагирует сеть в виде чистых вызовов функций, позволяя разработчикам создавать децентрализованных ботов, приёмники чаевых и кошельки, где пользователи полностью владеют своей идентичностью и средствами.

### Что нового в версии 3.0

DTO API SDK регенерируются из закреплённой версии `adamant-schema`, что гарантирует корректную типизацию меток времени в миллисекундах, данных загрузчика/статуса и полей неподтверждённых транзакций, допускающих null. Возможности запросов теперь включают `returnUnconfirmed`, `includeDirectTransfers`, поиск делегата по адресу и запросы транзакций нескольких типов. Фильтры транзакций по умолчанию объединяются логическим `and`, а фильтры по сумме применяются только к транзакциям перевода. Доступны опциональные конструктор `timestampMs` и функция `getEpochTimeMs()`, однако `timestampMs` не входит в подписываемые байты, поэтому хэши, идентификаторы и подписи остаются неизменными.

Улучшения надёжности включают прекращение циклов повтора для явно отклонённых POST-запросов и возврат структурированных ошибок, не подлежащих повтору. Повторные попытки и переключение на активный узел сохраняются для безопасных запросов и сетевых сбоев. Выбор узла с учётом высоты блокчейна и включающая фильтрация по `minVersion` обеспечивают связь с работоспособными и актуальными узлами.

Реализован полноценный клиент WebSocket, позволяющий подписываться на несколько адресов, типов транзакций и типов чат-ассетов через одно соединение. Клиент поддерживает типизированные ошибки соединения, обратные вызовы при переподключении, явные методы `connect()`/`disconnect()`, очистку слушателей и ограниченное переподключение.

Пакет теперь модульный по дизайну. Основной пакет остаётся ориентированным на ADM, а экспорт по подпутям предоставляет доступ к DTO API, транзакциям, метаданным и вспомогательным функциям для BTC/ETH/DASH/DOGE как для CommonJS, так и для ESM. Метаданные монет детерминированы и зафиксированы из `adamant-wallets`. Документация перенесена на сайт на основе VitePress + TypeDoc с контролем версий.

![Знакомьтесь: adamant-api 3.0 — современный SDK для современного узла ADAMANT](/images/engineering-notes/medium/3d13a9eaca0e/002-0-bato9yeonu3b9-oz.webp)

### Быстрый старт

Установите пакет и инициализируйте клиент со списком узлов. Проверки работоспособности, повторные попытки и переключение при сбое обрабатываются автоматически.

```javascript
import {AdamantApi} from 'adamant-api';

const api = new AdamantApi({
  nodes: [
    'https://endless.adamant.im',
    'https://clown.adamant.im',
    'https://lake.adamant.im',
  ],
  checkHealthAtStartup: true,
  minVersion: '0.10.0', // inclusive — older nodes are excluded automatically
});

api.onReady(async () => {
  const response = await api.getBlocks();
  if (response.success) {
    console.log(response.blocks);
  } else {
    console.error(response.errorMessage);
  }
});
```

### Примеры использования

Вы можете создать децентрализованного чат-бота, который в реальном времени отслеживает аккаунты и отвечает на зашифрованные сообщения. Сквозное шифрование встроено: бот расшифровывает сообщения с помощью собственного пароля, а сервер никогда не хранит открытый текст.

```javascript
import {AdamantApi, WebSocketClient, decodeMessage} from 'adamant-api';
import {config} from './config.js';

const api = new AdamantApi({nodes: config.nodes});

const ws = new WebSocketClient({
  admAddress: config.address,
  direction: 'incoming', // only messages sent *to* the bot
});
api.initSocket(ws);

ws.onMessage(async (tx) => {
  const text = decodeMessage(
    tx.asset.chat.message,
    tx.senderPublicKey,
    config.passphrase,
    tx.asset.chat.own_message,
  );

  if (text.trim() === '/ping') {
    await api.sendMessage(config.passphrase, tx.senderId, 'pong 🏓');
  }
});
```

Для приёмника крипточаевых или платёжного бота вы можете реагировать на входящие переводы токенов и отправлять токены в ответ. Одно соединение WebSocket также может отслеживать множество адресов и фильтровать по типу — это полезно для приёма данных на бирже или для бухгалтерских дашбордов.

Если вам нужен лёгкий мультивалютный кошелёк, вы можете выводить адреса BTC, ETH, DASH или DOGE из того же пароля ADAMANT, не включая в свой ADM-бот несколько криптостеков. Импортируйте только необходимое через экспорт по подпутям, чтобы минимизировать размер бандлов в serverless-среде.

```javascript
import {eth} from 'adamant-api/coins/eth';
import {btc} from 'adamant-api/coins/btc';

const {address: ethAddress} = eth.keys(process.env.PASSPHRASE);
const {address: btcAddress} = btc.keys(process.env.PASSPHRASE);

console.log({ethAddress, btcAddress});
```

### Миграция с версии 2.x

Для миграции обновите Node до версии 22 или выше в среде выполнения и CI. Проверьте направление WebSocket и добавьте `direction: 'incoming'`, если ваше приложение предполагало только входящие сообщения. Обновите импорты монет на `adamant-api/coins/*`, удалите пути кода Lisk/Klayr и перепроверьте фильтры запросов на новый режим объединения по умолчанию — логическое `and`, заменив `withoutDirectTransfers` на `includeDirectTransfers`. Подписи, идентификаторы транзакций и импорты CommonJS/ESM остаются без изменений.
