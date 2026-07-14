---
title: "ADAMANT API JS Client v2.0.0"
slug: "release-adamant-api-jsclient-v2-0-0-127766556"
description: "ADAMANT API JS Client 已完全用 TypeScript 重写以提供原生类型支持。此版本引入了 getBlock 和 post 等新 API 方法，以及…"
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
locale: "zh"
placeholder: false
---

ADAMANT API JS Client 已完全用 TypeScript 重写以提供原生类型支持。此版本引入了额外的 API 方法，例如 `getBlock` 和 `post`，以及一个新的 `getTransactionId` 方法，该方法接收一个已签名的交易并返回其 ID 字符串。

@@CODEBLOCK1@@

@@CODEBLOCK2@@

@@CODEBLOCK3@@

已修复多个 Bug，包括阻止创建多个实例的问题，以及多次导入模块时作为依赖使用导致冲突的 Bug。

### 重大变更

API 初始化现在需要使用 `new` 关键字来创建 `AdamantApi` 实例。

@@CODEBLOCK4@@

Socket 初始化已更新，用 `api.initSocket()` 替代了 `api.socket.initSocket()`，并使用 `api.socket.on()` 而不是向 `initSocket` 传递回调函数。

@@CODEBLOCK5@@

或者，您可以在初始化 API 时指定 `socket` 选项。

@@CODEBLOCK6@@

@@CODEBLOCK7@@

`createTransaction()` 方法已被移除。开发者应改用 `createSendTransaction`、`createStateTransaction`、`createChatTransaction`、`createDelegateTransaction` 或 `createVoteTransaction`。
