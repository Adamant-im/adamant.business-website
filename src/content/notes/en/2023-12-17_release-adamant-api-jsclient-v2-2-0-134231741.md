---
title: "ADAMANT API JS Client v2.2.0"
slug: "release-adamant-api-jsclient-v2-2-0-134231741"
description: "This release of the ADAMANT API JS Client introduces a set of validator utility functions that are now exported from the package. These utilities allow developers to validate pa…"
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
locale: "en"
placeholder: false
---

This release of the ADAMANT API JS Client introduces a set of validator utility functions that are now exported from the package. These utilities allow developers to validate passphrases, ADAMANT addresses, public keys, vote targets, delegate names, and chat messages programmatically, enabling safer runtime checks in TypeScript projects.

The exported functions include type guards for passphrases, addresses, public keys, and delegate names, as well as helpers for converting ADM amounts to satoshis and validating message payloads. Each validator returns a type-narrowed result where applicable.

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
