---
title: "ADAMANT API JS Client v2.2.0"
slug: "release-adamant-api-jsclient-v2-2-0-134231741"
description: "Этот выпуск ADAMANT API JS Client добавляет набор утилит-валидаторов для проверки ключевых данных в TypeScript-проектах."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v2.2.0"
publishedAt: "2023-12-17T19:51:54Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-api-jsclient"
tag: "v2.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:134231741"
locale: "ru"
placeholder: false
---

Этот выпуск ADAMANT API JS Client вводит набор утилит-валидаторов, которые теперь экспортируются из пакета. Эти утилиты позволяют разработчикам программно проверять секретные фразы, адреса ADAMANT, публичные ключи, цели голосования, имена делегатов и сообщения чата, обеспечивая более безопасные проверки во время выполнения в TypeScript-проектах.

Экспортируемые функции включают типовые защитники для секретных фраз, адресов, публичных ключей и имён делегатов, а также вспомогательные функции для преобразования сумм ADM в сатоши и проверки полезной нагрузки сообщений. Каждый валидатор возвращает результат с сузженным типом, где это применимо.

```ts
function isPassphrase(passphrase: unknown): passphrase is string;
function isAdmAddress(address: unknown): address is AdamantAddress;
function isAdmPublicKey(publicKey: unknown): publicKey is string;
function isAdmVoteForPublicKey(publicKey: unknown): publicKey is string;
function isAdmVoteForAddress(address: unknown): boolean;
function isAdmVoteForDelegateName(delegateName: unknown): delegateName is string;
function validateMessage(
  message: string,
  messageType: MessageType = MessageType.Chat
): { success: false, error: string } | { success: true };
function isDelegateName(name: unknown): name is string;
function admToSats(amount: number): number;
```
