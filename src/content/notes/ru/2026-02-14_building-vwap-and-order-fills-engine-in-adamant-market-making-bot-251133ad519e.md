---
title: "Создание движка VWAP и обработки заявок в боте ADAMANT для маркет-мейкинга"
slug: "building-vwap-and-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
description: "В боте ADAMANT Market-making реализованы динамическое управление стаканом, контроль спреда и стратегии ликвидности. Однако без точной аналитики исполнения заявок видна лишь половина картины."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/building-vwap-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
publishedAt: "2026-02-14T13:30:19.720Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/251133ad519e/001-1-stivdc2giqxmbc5miuwkxa-png.webp"
cardSpan: "full"
originalId: "medium:251133ad519e"
locale: "ru"
placeholder: false
---

В боте ADAMANT Market-making уже поддерживаются динамическое управление стаканом, контроль спреда, предоставление ликвидности и стратегии объёмов. Однако без точной аналитики исполнения заявок видна лишь половина картины. [Задача #87](https://github.com/Adamant-im/adamant-tradebot/issues/87) представляет собой крупное архитектурное обновление: выделенный движок VWAP и движок обработки заявок (модуль Premium), обеспечивающие профессиональную аналитику исполнения.

### Почему важен VWAP

Большинство API бирж предоставляют фрагментарную информацию. Заявки могут частично исполняться, статусы могут обновляться с задержкой, некоторые биржи возвращают неполные данные об исполнении, а перезапуски могут привести к потере внутреннего контекста исполнения. Если бот не сохраняет и не проверяет данные об исполнении корректно, то PnL становится неточным, отслеживание позиций — ненадёжным, логика управления рисками нарушается, а корректировки спреда и ликвидности основываются на предположениях, а не на реальности.

Для работы на институциональном уровне движок использует постоянное отслеживание исполнения, подтверждённую сверку сделок, корректный расчёт VWAP и аналитику с учётом позиции.

### Решение: выделенный движок VWAP и обработки заявок

Задача #87 вводит выделенную подсистему из трёх основных компонентов.

**Хранилище исходных событий исполнения (только добавление).** Выделенная `fillsDb` хранит исходные события исполнения в режиме только для добавления, сохраняя данные между перезапусками без немедленной агрегации. Это гарантирует, что данные об исполнении не будут потеряны или перезаписаны.

**Слой верификации биржи.** Каждое событие исполнения должно быть проверено через API биржи, подтверждено как полностью или частично исполненное и помечено как обработанное только после подтверждения. Это предотвращает ложные срабатывания при отсутствии подключения у бота, недоступности узлов биржи или неполных ответах API. Проверка исполнения происходит только при наличии сетевого подключения и доступности конечных точек биржи; в противном случае корректные сделки могут быть ошибочно помечены как неудачные.

Основная функция проверки реализует политику «всегда проверять, если возможно»:

```javascript
/**
 * Verifies a fill order using exchange API.
 *
 * Policy "always verify if possible":
 *  - If api.getOrderDetails() is missing -> cannot disprove -> treat as confirmed
 *  - If status missing or exception -> return undefined (try again later)
 *  - If API says 'filled' -> confirmed
 *  - If API says explicitly not filled ('new'|'part_filled'|'cancelled') -> rejected
 *  - If API says 'unknown' -> keep (cannot disprove) but warn
 *
 * @param {FillOrder|Object} order Fill order record or Order object
 * @param {any} api API instance (spot first/second account, or other compatible trader api)
 * @param {string} callerName Log context id (usually module and method which calls) to quickly find related logs
 * @returns {Promise<VerifyFillResult | undefined>
 */
async function verifyOrderFilled(order, api, callerName)
```

**Агрегированные статистические данные исполнения.** Второе постоянное хранилище, `filledStatsDb`, накапливает общее количество купленного и проданного базового актива, общее количество потраченного и полученного котируемого актива, а также счётчики полных, частичных, отклонённых и пропущенных исполнений. На основе этого вычисляются основные метрики.

### Основные метрики

Структура объекта базовой статистики:

```javascript
/**
 * Creates a base FillsEngineStatsResult object with zeroed / default values.
 *
 * @param {string} statsId Format: `${exchange}:${pair}:${purpose}:${startTs}`
 * @param {string} pair Trading pair, e.g., `BTC/USDT`
 * @param {FilledStatsRecord | undefined | null} stats Epoch stats (optional)
 * @returns {FillsEngineStatsResult}
 */
function createBaseEpochStats(statsId, pair, stats) {
  return {
    statsId,
    pair,
    updatedAt: stats?.updatedAt || 0,

    buy: stats?.buy ? { ...stats.buy } : emptySide(),
    sell: stats?.sell ? { ...stats.sell } : emptySide(),

    // Calculated later
    boughtVwap: 0,
    soldVwap: 0,

    hasBothSides: false,
    vwapSpread: 0,
    vwapSpreadPercent: 0,

    pnlQuoteCashflow: 0,
    inventoryBase: 0,
    markPrice: undefined,
    pnlQuoteMtm: undefined,
  };
}
```

**VWAP (средневзвешенная цена по объёму)** вычисляется по каждой стороне как Buy VWAP и Sell VWAP по формуле `VWAP = Общий объём котируемого актива / Общий объём базового актива`. Это отражает реальное качество исполнения, а не просто цену размещения заявки.

**Спред VWAP** — разница между Buy VWAP и Sell VWAP, показывающая фактически реализованный торговый спред, а не теоретический.

**Дельта позиции** — разница между общим объёмом купленного и проданного базового актива, используется для управления рисками, отслеживания экспозиции позиции и логики ребалансировки.

**Реализованный PnL** — результат, основанный на денежных потоках от исполненных сделок, с опциональным PnL по рыночной цене на текущий момент.

### Архитектурное влияние

Новый движок является полностью модульным компонентом, который интегрируется в существующую архитектуру без нарушения текущей логики размещения заявок. Он работает параллельно с существующими системами, а не заменяя их, обеспечивая стабильность и добавляя глубокий аналитический уровень.

```
          Exchange API
                │
                ▼
       Order Placement Engine
                │
                ▼
         Fills Collector
                │
                ▼
       Verification Engine
                │
                ▼
         Aggregation Engine
                │
                ▼
      VWAP / Inventory / PnL
                │
                ▼
    Risk & Strategy Modules
```

Эта архитектура закладывает основу для будущего расширения, превращая бота из инструмента размещения заявок в настоящую систему аналитики исполнения. Продвинутые стратегии, такие как управление пулами ликвидности и поддержание динамического спреда, сильно зависят от точных данных об исполнении для корректной работы. Для премиальных торговых модулей аналитика исполнения является ключевым требованием для профессиональной эксплуатации.
