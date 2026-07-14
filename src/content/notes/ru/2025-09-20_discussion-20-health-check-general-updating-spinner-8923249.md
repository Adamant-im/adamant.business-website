---
title: "Проверка работоспособности: индикатор обновления"
slug: "discussion-20-health-check-general-updating-spinner-8923249"
description: "Отсутствие индикатора загрузки в заголовке ADAMANT гарантирует, что пользователь видит актуальный список чатов и сообщений. Индикатор должен отображаться при отсутствии подключения."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/20"
publishedAt: "2025-09-20T16:33:48Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923249"
locale: "ru"
placeholder: false
---

![Скриншот обсуждения 1](/images/engineering-notes/github/discussions/8923249/001-fda0855b.webp)

Отсутствие индикатора загрузки в заголовке ADAMANT гарантирует, что пользователь видит актуальный список чатов и сообщений. Индикатор должен отображаться при отсутствии подключения к интернету, активных ADM-узлов или включённых ADM-узлов.

Когда подключение и активные узлы существуют, система выполняет дополнительную проверку. После получения новых сообщений — то есть когда более свежих сообщений нет — в хранилище сохраняется временная метка `chatActualUntil`.

```javascript
const chatsActualUntil = adamant.toTimestamp(nodeTimestamp) + INTERVAL + CHAT_ACTUALITY_BUFFER_MS
```

`INTERVAL` представляет собой интервал опроса новых чатов через REST, который зависит от наличия соединения по сокету.

```javascript
INTERVAL: (state, getters, rootState) => {
  return rootState.options.useSocketConnection ? SOCKET_ENABLED_TIMEOUT : SOCKET_DISABLED_TIMEOUT
},
```

Экраны чатов и списка чатов отслеживают `chatActualUntil` и подписаны на хук `chatActual = chatActualUntil > currentTime`. Этот хук запускается каждые 500 миллисекунд, чтобы активировать индикатор загрузки, даже если `chatActualUntil` не изменился из-за отсутствия новых сообщений. В итоге индикатор отображается при отсутствии интернета, отсутствии онлайн-узлов или если `!chatActual` принимает значение true.

Когда приложение восстанавливается из фонового режима, дополнительные изменения не требуются, поскольку оно по-прежнему полагается на `chatActualUntil`. Если системное время устройства превышает временную метку актуальности чата, пользователь увидит индикатор загрузки. В худшем случае, при потере соединения, пользователь может не увидеть индикатор и ошибочно полагать, что всё актуально, в течение максимум `INTERVAL + CHAT_ACTUALITY_BUFFER_MS` секунд.
