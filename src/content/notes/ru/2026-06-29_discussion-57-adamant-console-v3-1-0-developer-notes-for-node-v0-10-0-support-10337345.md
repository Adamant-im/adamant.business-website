---
title: "ADAMANT Console v3.1.0: технические заметки о поддержке Node v0.10.0"
slug: "discussion-57-adamant-console-v3-1-0-developer-notes-for-node-v0-10-0-support-10337345"
description: "ADAMANT Console v3.1.0 добавляет поддержку ADAMANT Node v0.10.0 и обновляет интерфейсы для CLI, JSON-RPC и JavaScript-интеграций."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/57"
publishedAt: "2026-06-29T08:48:18Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10337345"
locale: "ru"
placeholder: false
---

ADAMANT Console v3.1.0 добавляет поддержку ADAMANT Node v0.10.0 и обновляет интерфейсы для CLI, JSON-RPC и локальных JavaScript-интеграций. Этот выпуск в первую очередь ориентирован на разработчиков и операторов, использующих Console в качестве локального инструмента подписания, CLI для сценариев или легковесного моста JSON-RPC к узлам ADAMANT.

Теперь Console использует `adamant-api` v3 и соответствует поведению ответов и запросов ADAMANT Node v0.10.0. Поддерживаемая среда выполнения — Node.js 22.13.0 или новее. Методы CLI, JSON-RPC и JavaScript-обёртки унифицированы вокруг единого поведения Console. Добавлена новая команда `node status` и соответствующая обёртка для получения статуса узла, а возможности вспомогательных функций чата расширены для поддержки чат-комнат, сообщений и устаревших транзакций чата. Запросы транзакций теперь передают параметры запроса v0.10, такие как `returnUnconfirmed`, а поиск делегатов принимает имя пользователя, публичный ключ или ADAMANT-адрес. Для фильтров чата с прямым переводом API теперь предпочитает `includeDirectTransfers`, хотя старый параметр `withoutDirectTransfers` остаётся нормализованным для обратной совместимости. Публичные обёртки теперь включают JSDoc и сгенерированные страницы справки по API, а пакет в npm публикуется с подтверждением подлинности через GitHub Actions OIDC и npm Trusted Publishing.

Для установки или обновления в глобальном режиме используйте npm:

```sh
npm install -g adamant-console
```

Пакет предоставляет бинарник `adm` для типовых операций:

```sh
adm client version
adm node status
adm get transaction 123456789 returnUnconfirmed=1
adm get chats U123456789 includeDirectTransfers=1
```

При обновлении службы, использующие Console через JSON-RPC, должны проверить расширенный набор методов и обработку ответов. Код, использующий ответы с транзакциями или чатами, следует протестировать на полях v0.10.0, от которых он зависит, особенно данные о неподтверждённых транзакциях, включение прямых переводов в чате и `timestampMs`. Для новых JavaScript-сервисов предпочтительнее использовать `adamant-api` напрямую для полного охвата протокола, оставляя обёртки `adamant-console` для случаев, когда требуется поведение, совместимое с Console CLI/RPC, или для локальных операционных скриптов.
