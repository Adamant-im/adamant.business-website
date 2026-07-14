---
title: "ADAMANT API JS Client v2.2.0"
slug: "release-adamant-api-jsclient-v2-2-0-134231741"
description: "このリリースでは、パッケージからエクスポートされる検証ユーティリティ関数が追加され、TypeScriptプロジェクトでの安全なランタイムチェックが可能になります。"
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
locale: "ja"
placeholder: false
---

このADAMANT API JS Clientのリリースでは、パッケージからエクスポートされる一連のバリデータユーティリティ関数を導入しています。これらのユーティリティを使用することで、開発者はパスフレーズ、ADAMANTアドレス、公開鍵、投票先、デリゲート名、チャットメッセージをプログラムで検証できるようになり、TypeScriptプロジェクトでのより安全なランタイムチェックが可能になります。

エクスポートされた関数には、パスフレーズ、アドレス、公開鍵、デリゲート名のための型ガードに加えて、ADMの金額をサトシに変換するヘルパー関数やメッセージペイロードの検証機能が含まれます。各バリデータは、該当する場合は型を絞り込んだ結果を返します。

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
