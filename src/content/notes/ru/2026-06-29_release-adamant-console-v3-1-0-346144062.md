---
title: "ADAMANT Console v3.1.0"
slug: "release-adamant-console-v3-1-0-346144062"
description: "ADAMANT Console v3.1.0 обновляет консоль для ADAMANT Node v0.10.0 с обновлением CLI, JSON-RPC, JavaScript-обёртки, документации и инструментов валидации."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v3.1.0"
publishedAt: "2026-06-29T08:31:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v3.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:346144062"
locale: "ru"
placeholder: false
---

ADAMANT Console v3.1.0 обновляет консоль для ADAMANT Node v0.10.0 и обновляет CLI, JSON-RPC, JavaScript-обёртку, документацию и инструментарий валидации. Этот выпуск добавляет поддержку ответов и запросов ADAMANT Node v0.10.0 через `adamant-api` v3. Также представлены обновления обработки статуса ноды, чат-комнат/сообщений, транзакций чата, параметра транзакций `returnUnconfirmed`, поиска делегатов и прямых переводов. Обновлены метаданные пакетов и зависимости, добавлен новый сайт документации на VitePress, автоматически генерируемая справка по API из TypeDoc и развертывание на GitHub Pages при выпуске релиза. Дополнительные улучшения включают примеры справки CLI, расширенное покрытие JSON-RPC, публичную JSDoc API, подсветку синтаксиса для форматированного вывода JSON и увеличенное покрытие тестов для обёрток API, поведения справки CLI, метаданных конфигурации/клиента, истории ввода и логирования.

Проверку можно выполнить с помощью следующих команд:
@@CODEBLOCK1@@
### Критические изменения
Для запуска ADAMANT Console теперь требуется Node.js 22.13.0 или новее.
