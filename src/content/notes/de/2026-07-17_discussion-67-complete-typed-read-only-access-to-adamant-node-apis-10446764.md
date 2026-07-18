---
title: "Vollständiger typisierter Lesezugriff auf ADAMANT Node APIs"
slug: "discussion-67-complete-typed-read-only-access-to-adamant-node-apis-10446764"
description: "Das adamant api SDK bietet jetzt eine vollständige typisierte Oberfläche für die leseintensiven ADAMANT Node APIs, die von Explorern, Monitoring-Diensten, Wallets, Bots und anderen Integrationen genutzt werden."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/67"
publishedAt: "2026-07-17T10:54:30Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10446764"
locale: "de"
placeholder: false
---

Das `adamant-api` SDK bietet jetzt eine vollständige typisierte Oberfläche für die leseintensiven ADAMANT Node APIs, die von Explorern, Monitoring-Diensten, Wallets, Bots und anderen Integrationen genutzt werden. Konsumenten benötigen keine generischen `api.get()`-Aufrufe oder lokalen Response-Casts mehr für die wichtigsten Abfragen zu Accounts, Blöcken, Delegates, Peers, Pools und Netzwerkstatus, die in ADAMANT Node v0.10.2 eingeführt oder erweitert wurden.

## Abdeckung

Das SDK stellt `getTopAccounts()` mit typisierter Paginierung und Delegate-Filterung bereit. Die Response enthält die deterministische Balance-Reihenfolge des Nodes und Paginierungs-Metadaten; `limit: 0` fordert nur Zähl-Metadaten an, ohne Account-Zeilen zurückzugeben.

```ts
const topDelegates = await api.getTopAccounts({
  limit: 50,
  offset: 0,
  isDelegate: 1,
});

const countOnly = await api.getTopAccounts({limit: 0});
```

Die öffentlichen Optionstypen umfassen jetzt Blocklisten und Lookups, Delegatelisten mit Single-Delegate-Lookup, Benutzernamenssuche, Forging-Statistiken, Voter und Next-Forger-Projektionen, verbundene Peerlisten und genaue Peer-Lookups, gepoolte Transaktionslisten und Lookups sowie inklusive Transaktionszeitbereiche. Dadurch lässt sich das SDK als typisierte Grenze für schreibgeschützte Dienste einsetzen und nicht nur als Signing- und Broadcast-Helfer.

Die generierten Contracts stellen jetzt `consensusCodeName`, den effektiven `consensusSchedule`, den vollständigen Block-Reward-`milestoneSchedule` und die Delegate-Lebenszeit-`forged`-Werte als Base-10-Integer-Strings bereit. Die Laufzeit-Eigenschaft `producedblocks` ersetzt den bisherigen generierten Tippfehler `producedlocks`. Ein Dienst kann die öffentliche Chain-Projektion abrufen, ohne die Response lokal neu zu definieren:

```ts
const [network, node] = await Promise.all([
  api.getStatus(),
  api.getNodeStatus(),
]);

console.log(network.consensusCodeName);
console.log(node.consensusSchedule, node.milestoneSchedule);
```

## Endpunktbewusste Abfragesemantik

Die Transaktions-Abfragesprache des ADAMANT Node ist flach und kein verschachtelter boolescher Ausdrucksbaum. Sie serialisiert Bedingungen in einen einzigen SQL-Ausdruck in der Query-String-Reihenfolge, mit normaler SQL-Präzedenz und ohne hinzugefügte Klammern für `and: {}`- oder `or: {}`-Objekte. Das SDK kombiniert daher standardmäßig gewöhnliche Top-Level-Filter mit `and`, bewahrt die Einfügereihenfolge von JavaScript-Objekten bei der Serialisierung und warnt, wenn gemischte `and`- / `or`-Bedingungen die Wire-Reihenfolge semantisch relevant machen. Es beschränkt Steuerungen wie `includeDirectTransfers`, `returnAsset` und `userId` auf kompatible Endpunkte, entfernt bekannte nicht unterstützte Steuerungen vor dem Senden der Anfrage und erlaubt Betragsfilter nur auf `/api/transactions`, wo der Node sie tatsächlich anwendet. Dies ist absichtlich strenger als die Weiterleitung jeder gemeinsamen Option an jeden Endpunkt — ein typisierter Aufruf sollte das Verhalten widerspiegeln, das die gewählte Node-Route tatsächlich implementiert.

## Schema-Herkunft und Kompatibilität

`src/api/generated.ts` wird reproduzierbar aus `Adamant-im/adamant-schema@f35b8ddb5597a8f1a80a3a670bedb003af65ef90` generiert. Das Repository verifiziert die generierte Datei mit `npm run api-types:check`, während Package-Consumer-Tests die exportierten Deklarationen kompilieren und die gebauten ESM- und CommonJS-Entry-Points testen. Die Korrektur von `producedlocks` zu `producedblocks` ist eine Compile-Kompatibilitätsänderung; Konsumenten, die Delegate- oder Status-Fixtures manuell erstellen, müssen möglicherweise die neu erforderlichen Felder hinzufügen. Die Laufzeit-Response-Verarbeitung bleibt Pass-Through — ältere Node-Responses werden vom SDK weder transformiert noch abgelehnt.

## Live-Zustand neben Snapshot-Lesevorgängen

Die gleiche Ausrichtung auf Node v0.10.2 fügt optionale WebSocket-Handler für kompakte `newBlock`-Ereignisse sowie bestätigte oder unbestätigte `balances/change`-Ereignisse hinzu. Subscriptions werden nach dem Wiederverbinden wiederhergestellt, und Balancewerte sind absolute Ersetzungen statt Deltas. Diese Ereignisse ergänzen die typisierten REST-Lesevorgänge, ersetzen sie aber nicht: Es gibt kein Replay oder initialen Balance-Snapshot, ein Balance-Payload kann nur die geänderten Felder enthalten, und Ereignisse, die während der Trennung zugestellt werden, werden nicht nachgetragen. Kritische Clients sollten Blöcke und Salden nach dem Wiederverbinden über REST abgleichen.

## Kompatibilitätsgrenzen

Neue Funktionen für Top-Accounts, Netzwerkstatus, Delegates, Blöcke und Balance-Ereignisse erfordern ADAMANT Node v0.10.2. Bestehende Transaktionserstellung, Byte-Layout, Hashing, IDs, Signaturen, Verschlüsselung, Retries, Failover und Active-Node-Auswahl bleiben unverändert. Das Package-Root bleibt ADM-fokussiert; External-Coin-Helfer verwenden weiterhin explizite Subpath-Exports. Das SDK erfordert Node.js 22.12.0 oder neuer, während ADAMANT Node v0.10.2-Betreiber die Node-Anforderung von 22.13.0 oder neuer beachten sollten.
