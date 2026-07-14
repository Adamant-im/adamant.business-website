---
title: "ADAMANT API JS Client v2.2.0"
slug: "release-adamant-api-jsclient-v2-2-0-134231741"
description: "Diese Version des ADAMANT API JS Clients führt exportierte Validierungs-Hilfsfunktionen ein, die Passphrasen, ADM-Adressen, öffentliche Schlüssel und mehr prüfen können."
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
locale: "de"
placeholder: false
---

Diese Version des ADAMANT API JS Clients führt eine Reihe von Validierungs-Hilfsfunktionen ein, die nun aus dem Paket exportiert werden. Diese Hilfsfunktionen ermöglichen Entwicklern die programmatische Überprüfung von Passphrasen, ADAMANT-Adressen, öffentlichen Schlüsseln, Voting-Zielen, Delegatennamen und Chatnachrichten und ermöglichen sicherere Laufzeitprüfungen in TypeScript-Projekten.

Zu den exportierten Funktionen gehören Typ-Guards für Passphrasen, Adressen, öffentliche Schlüssel und Delegaten-Namen sowie Hilfsfunktionen zur Umrechnung von ADM-Beträgen in Satoshis und zur Validierung von Nachrichteninhalten. Jeder Validator gibt gegebenenfalls ein typengenaueres Ergebnis zurück.

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
