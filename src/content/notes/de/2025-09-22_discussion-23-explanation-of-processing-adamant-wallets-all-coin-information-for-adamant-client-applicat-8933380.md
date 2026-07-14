---
title: "Verarbeitung von adamant-wallets: Informationen zu Coins und Tokens für ADAMANT-Client-Apps"
slug: "discussion-23-explanation-of-processing-adamant-wallets-all-coin-information-for-adamant-client-applicat-8933380"
description: "Das adamant-wallets-Repository bündelt alle Coin- und Token-Informationen für ADAMANT-Clientanwendungen. Die Client-App verarbeitet diese Daten korrekt und stellt eine einheitliche Struktur bereit."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/23"
publishedAt: "2025-09-22T12:54:29Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8933380"
locale: "de"
placeholder: false
---

Das Repository `adamant-wallets` bündelt alle Informationen zu Coins und Tokens für ADAMANT-Clientanwendungen. Die Client-App ist dafür verantwortlich, diese Daten korrekt zu verarbeiten und Entwicklern eine bequeme, einheitliche Struktur bereitzustellen. Die vorgeschlagene Struktur ist nicht perfekt – Token-Informationen werden aus verschiedenen Ordnern zusammengeführt –, aber Alternativen bringen eigene Kompromisse mit sich, daher werden hier keine strukturellen Änderungen vorgeschlagen.

## Terminologie

Ein **Crypto** ist ein allgemeiner Begriff, der sowohl Coins als auch Tokens umfasst. Jedes Crypto hat einen Namen (z. B. Bitcoin) und einen Ticker oder Symbol (z. B. BTC). Ein **Coin** ist ein Crypto, das auf einer eigenen Blockchain existiert, wie beispielsweise `ADM`, `BTC`, `DOGE`, `DASH` oder `KLY`. Ein **Token** ist ein Crypto, das auf einer anderen Blockchain basiert – zum Beispiel `STORJ` oder `USDT` auf Ethereum oder Binance Smart Chain.

Jede Blockchain hat eine **Haupt-coin**, die gemeinsame Eigenschaften für alle Tokens dieser Kette bereitstellt und zur Zahlung von Transaktionsgebühren verwendet wird. Beispielsweise erfordert die Übertragung von USDT auf Ethereum Gebühren in `ETH`. Jede Blockchain definiert außerdem einen **Token-Typ** – Ethereum verwendet `ERC20`, Binance Smart Chain verwendet `BEP20`. Ein Token kann auf mehreren Blockchains existieren (**Multi-Chain-Token**): USDT existiert sowohl als `ERC20` auf Ethereum als auch als `BEP20` auf Binance Smart Chain. Es handelt sich um denselben Token mit gleichem Wert und allgemeinen Informationen, der jedoch auf unterschiedlichen Ketten gespeichert und übertragen wird.

## Grundlegende Struktur

Jedes Crypto befindet sich im Ordner `/general`. Tokens existieren zusätzlich im Ordner `/blockchains`. Beispielsweise enthält `/general/USDT/info.json` allgemeine Informationen zu USDT, während `/blockchains/ethereum/USDT/info.json` informationen zu USDT auf Ethereum enthält. Die Datei `/blockchains/{chain}/info.json` speichert kettenübergreifend gemeinsame Informationen für alle Tokens dieser Kette und definiert den Link zur Haupt-coin mit Basis-Eigenschaften.

### Eigenschaftsquellen für einen Token

Jeder Token auf einer beliebigen Blockchain hat vier Quellen für Eigenschaften, die in folgender Reihenfolge nach Priorität (von hoch nach niedrig) zusammengeführt werden:

1. `/blockchains/ethereum/USDT/info.json` — spezifischer Token auf einer bestimmten Blockchain
2. `/blockchains/ethereum/info.json` — gemeinsame Token-Informationen für diese Blockchain
3. `/general/ethereum/info.json` — Informationen aus der Haupt-coin der Blockchain
4. `/general/USDT/info.json` — allgemeine Token-Informationen

Beispielsweise werden für USDT auf Ethereum alle vier Quellen zusammengeführt, wobei Quelle (1) Quelle (2) überschreibt und so weiter.

## Erstellen von Coins und Tokens in Apps

Um Coins zu erstellen, durchläuft die App alle Cryptos im Ordner `/general` und liest jeweils die Datei `/general/{crypto}/info.json`. Einträge, bei denen `status` nicht aktiv ist oder `type` nicht `coin` lautet, werden übersprungen. Ist `createCoin = true`, wird ein Coin-Objekt erstellt, das als Blockchain-Eintrag angezeigt wird, ohne Token-Typ – Beispiele hierfür sind `ADM` und `BTC`.

![Diskussionsscreenshot 1](/images/engineering-notes/github/discussions/8933380/001-fafd0ecc.webp)

![Diskussionsscreenshot 2](/images/engineering-notes/github/discussions/8933380/002-cebba626.webp)

Um Tokens zu erstellen, durchläuft die App alle Blockchains im Ordner `/blockchains` (z. B. `ethereum`, `binanceSmartChain`) und liest die chain-ebenen `info.json`. Die Blockchain wird übersprungen, wenn ihr `status` nicht aktiv ist, und die `mainCoin` wird notiert. Anschließend liest die App `/general/{mainCoin}/info.json`, um allgemeine Informationen zur Haupt-coin zu erhalten. Für jedes Token im Ordner dieser Blockchain wird `/general/{token}/info.json` gelesen – das Token wird übersprungen, falls die Datei fehlt oder `type` nicht `token` ist – und anschließend `/blockchains/{blockchain}/{token}/info.json`, wobei übersprungen wird, wenn `status` nicht aktiv ist. Schließlich werden alle vier Quellen gemäß ihrer Priorität zusammengeführt und ein Token-Objekt erstellt, das mit seinem Token-Typ (z. B. `ERC20`, `BEP20`) angezeigt wird. Beispiele hierfür sind `USDT`, `USDC` und `DAI`.

![Diskussionsscreenshot 3](/images/engineering-notes/github/discussions/8933380/003-f4329279.webp)

![Diskussionsscreenshot 4](/images/engineering-notes/github/discussions/8933380/004-a0d74d6b.webp)

## Datenobjekt für ein Crypto

Nach der Verarbeitung von `adamant-wallets` verfügt die App über ein Datenobjekt mit Informationen zu allen Coins und Tokens über alle Chains hinweg. Da die Eigenschaften bereits zusammengeführt wurden, ist das Abrufen der Daten unkompliziert:

```js
// Inside token-related methods
let property = coinInfo.property

// Outside, referencing by token and chain
let property = coinInfo["USDT"]["ethereum"].property
```

So wird sichergestellt, dass ADAMANT-Apps mehrere Blockchains und Tokens konsistent verarbeiten können.
