---
title: "ADAMANT API JS Client v2.2.0"
slug: "release-adamant-api-jsclient-v2-2-0-134231741"
description: "Cette version du client ADAMANT API JS introduit un ensemble de fonctions utilitaires de validation désormais exportées depuis le package."
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
locale: "fr"
placeholder: false
---

Cette version du client ADAMANT API JS introduit un ensemble de fonctions utilitaires de validation désormais exportées depuis le package. Ces utilitaires permettent aux développeurs de valider par programme des phrases secrètes, des adresses ADAMANT, des clés publiques, des cibles de vote, des noms de délégués et des messages de discussion, permettant ainsi des vérifications plus sûres lors de l'exécution dans les projets TypeScript.

Les fonctions exportées incluent des gardes de type pour les phrases secrètes, les adresses, les clés publiques et les noms de délégués, ainsi que des utilitaires pour convertir les montants ADM en satoshis et valider les charges utiles des messages. Chaque validateur renvoie un résultat typé plus précis lorsque cela s'applique.

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
