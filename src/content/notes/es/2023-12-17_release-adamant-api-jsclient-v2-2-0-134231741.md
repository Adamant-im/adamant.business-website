---
title: "ADAMANT API JS Client v2.2.0"
slug: "release-adamant-api-jsclient-v2-2-0-134231741"
description: "Esta versión del ADAMANT API JS Client introduce funciones de utilidad de validación exportadas que permiten validar frases de acceso, direcciones, claves públicas y más."
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
locale: "es"
placeholder: false
---

Esta versión del ADAMANT API JS Client introduce un conjunto de funciones de utilidad de validación que ahora se exportan desde el paquete. Estas utilidades permiten a los desarrolladores validar frases de acceso, direcciones de ADAMANT, claves públicas, objetivos de votos, nombres de delegados y mensajes de chat de forma programática, posibilitando comprobaciones de ejecución más seguras en proyectos TypeScript.

Las funciones exportadas incluyen protecciones de tipo para frases de acceso, direcciones, claves públicas y nombres de delegados, así como ayudantes para convertir cantidades de ADM a satoshis y validar cargas de mensajes. Cada validador devuelve un resultado con tipo restringido cuando es aplicable.

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
