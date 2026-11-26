---
title: "adamant-api v3.2.0: отработка ошибок HTTP 429, проверка открытых ключей и строгие фильтры запросов"
slug: "discussion-85-adamant-api-v3-2-0-resilient-http-429-failover-recipient-public-key-verification-strict-ch-11403173"
description: "В ADAMANT Node v0.11.0 добавлены лимиты запросов, строгая валидация фильтров чатов и KVS, а также обновлены источники OpenAPI для повышения стабильности работы API."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/85"
publishedAt: "2026-11-26T06:52:55Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:11403173"
locale: "ru"
placeholder: false
---

В связи с тем, что в ADAMANT Node v0.11.0 были внедрены стандартные ограничения частоты запросов (rate limits) для REST/WebSocket, строгая валидация фильтров (только AND) для эндпоинтов чатов и KVS, а также консолидированы источники OpenAPI в репозитории `Adamant-im/adamant`, пакет `adamant-api` был обновлен. Это повышает надежность переключения между узлами (failover), готовность системы и сериализацию запросов как для узлов v0.11.0+, так и для более ранних версий.

## Устойчивая отработка HTTP 429 и периоды охлаждения

ADAMANT Node v0.11.0 применяет лимиты HTTP на основе IP-адреса для совокупных (`all`) и классовых (`status`, `read`, `publish`) запросов, отвечая кодами `429`, а также заголовками `Retry-After` / `RateLimit-Reset` и `RateLimit-Scope`.

Каждый запрос фиксирует `targetNode = this.node` перед отправкой, чтобы случайные ошибки не приводили к переключению на узел, от которого другой запрос уже ранее отказался. Параллельные вызовы `updateNodes()` теперь используют общий `updateNodesPromise`, а принудительный переход при плановой проверке повышает приоритет до принудительной ротации с `failedNode`.

Поскольку `/api/node/status` тарифицируется по более высокому лимиту `status` (12 000/мин против 3 000/мин для `read`), узел с исчерпанным лимитом по-прежнему отвечает на проверки работоспособности. `NodeManager` теперь отслеживает периоды охлаждения 429 для каждого узла (`rateLimitedUntil`, максимум 60 с), поэтому при плановых и принудительных проверках предпочтение отдается синхронизированным узлам без ограничений в пулах из 2 и более узлов.

Если доступных синхронизированных узлов нет, идемпотентные операции чтения учитывают `Retry-After` / `RateLimit-Reset` с добавлением случайной задержки (jitter) до 10 с; если окно сброса узла превышает этот лимит или попытки повтора исчерпаны, SDK немедленно возвращает результат с дополнительными метаданными в `AdamantApiResult`:

```ts
const response = await api.getBlocks();

if (!response.success) {
  if (response.status === 429 && response.retryAfterMs !== undefined) {
    console.warn(`Rate-limited (${response.rateLimitScope}), retry in ${response.retryAfterMs}ms`);
  }
}
```

Неидемпотентные `POST`-запросы (отправка транзакций) никогда не повторяются при получении ответов HTTP, включая `429`.

## Простые имена фильтров, строгие типы эндпоинтов и POST /api/states/get

Эндпоинты `/api/states/get`, `/api/chats/get` и `/api/chatrooms/*` теперь принимают простые имена фильтров. Обертки `and: { ... }` удалены (flattened), а неподдерживаемые обертки `or` отклоняются на стороне клиента с `success: false`. Это исправляет проблему #97 на узлах до версии v0.11.0 и соответствует строгой валидации в v0.11.0.

Объекты `ChatroomsOptions`, `ChatTransactionsOptions` и `KVSOptions` теперь в точности соответствуют полям, принимаемым ADAMANT Node v0.11.0, включая `toHeight` для `/api/chats/get` и `/api/states/get`, при этом исключая поля высоты/диапазона, которые отклоняются на `/api/chatrooms/*`. Устаревший параметр `userId` для `/api/chatrooms/*` удаляется во время выполнения с выводом соответствующего предупреждения.

Для больших выборок KVS теперь можно использовать `POST /api/states/get`:

```ts
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

Метод `getKVS(..., {method: 'POST'})` использует политику повторных попыток для идемпотентного чтения, сохраняя полную поддержку failover для ошибок 429 и 5xx.

## Готовность узлов и фильтрация состояния загрузчика

`NodeManager` теперь проверяет поля `loader.loaded` и `loader.syncing` в ответе `/api/node/status`. Узлы, которые еще загружаются (`loaded: false`) или синхронизируются (`syncing: true`), исключаются из списка активных узлов API и WebSocket; узлы без объекта `loader` остаются доступными. При установке `checkHealthAtStartup: true` событие `onReady` ожидает выбора пригодного узла, а не срабатывает после неудачной начальной проверки работоспособности.

## Проверка открытых ключей получателя и делегата

Функции `encodeMessage()` и `decodeMessage()` теперь отклоняют неканонические, нестандартные (off-curve) ключи и ключи малого порядка (порядки 1, 2, 4 и 8) Ed25519 с ошибкой `invalid key`. Метод `getPublicKey()` локально проверяет ADM-адреса перед выполнением сетевого запроса и подтверждает, что ключи, возвращенные узлом, локально соответствуют запрошенному адресу, прежде чем кэшировать или возвращать их. `sendMessage()` локально перепроверяет полученные ключи перед шифрованием и возвращает `{success: false, errorMessage}` в случае несовпадения; `voteForDelegate()` обеспечивает привязку к адресу и использует кэши делегатов для каждого клиента.

## Консолидация источников OpenAPI и защита цепочки поставок

Скрипт `scripts/sync-api-types.mjs` теперь получает спецификацию OpenAPI 3.2 напрямую из `Adamant-im/adamant` (`openapi/specification/openapi.yaml`), генерируя `RateLimitErrorResponseDto` и `GetKVSRequestBody`. Файл `pnpm-workspace.yaml` устанавливает 7-дневный карантин для новых версий зависимостей (`minimumReleaseAge: 10080`) с явным разрешением `allowBuilds` и нулевым количеством уязвимостей в продакшн-сборке.

## Ссылки

- PR SDK (адаптация к Node v0.11.0 и зависимости): https://github.com/Adamant-im/adamant-api-jsclient/pull/105
- Проверка открытых ключей получателя и делегата: https://github.com/Adamant-im/adamant-api-jsclient/pull/110
- Исправление простых фильтров чатов и KVS: https://github.com/Adamant-im/adamant-api-jsclient/pull/101
- Исправление `onReady` для готовых узлов: https://github.com/Adamant-im/adamant-api-jsclient/pull/102
- ADAMANT Node v0.11.0: https://github.com/Adamant-im/adamant/pull/303
- Документация SDK: https://js.docs.adamant.im
- OpenAPI Swagger UI: https://docs.adamant.im/schema/
