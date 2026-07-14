---
title: "ADAMANT API JS Client v2.0.0"
slug: "release-adamant-api-jsclient-v2-0-0-127766556"
description: "ADAMANT API JS Client полностью переписан на TypeScript для обеспечения родных типов. В релизе добавлены новые методы API, включая getBlock и post."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v2.0.0"
publishedAt: "2023-11-02T21:58:09Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-api-jsclient"
tag: "v2.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:127766556"
locale: "ru"
placeholder: false
---

ADAMANT API JS Client полностью переписан на TypeScript для обеспечения родных типов. Этот выпуск вводит дополнительные методы API, такие как `getBlock` и `post`, а также новый метод `getTransactionId`, который принимает подписанную транзакцию и возвращает её идентификатор в виде строки.

@@CODEBLOCK1@@

@@CODEBLOCK2@@

@@CODEBLOCK3@@

Исправлено несколько ошибок, включая проблему, мешавшую созданию нескольких экземпляров, и ошибку, при которой многократный импорт модуля вызывал конфликты при использовании в качестве зависимости.

### Критические изменения

Для инициализации API теперь требуется ключевое слово `new` для создания экземпляров `AdamantApi`.

@@CODEBLOCK4@@

Инициализация сокета обновлена: метод `api.socket.initSocket()` заменён на `api.initSocket()`, а для обработки событий используется `api.socket.on()` вместо передачи колбэков в `initSocket`.

@@CODEBLOCK5@@

В качестве альтернативы можно указать параметр `socket` при инициализации API.

@@CODEBLOCK6@@

@@CODEBLOCK7@@

Метод `createTransaction()` удалён. Разработчикам следует использовать вместо него `createSendTransaction`, `createStateTransaction`, `createChatTransaction`, `createDelegateTransaction` или `createVoteTransaction`.
