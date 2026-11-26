---
title: "adamant-api v3.2.0: HTTP 429-Failover, Public-Key-Verifizierung und strikte Abfragefilter"
slug: "discussion-85-adamant-api-v3-2-0-resilient-http-429-failover-recipient-public-key-verification-strict-ch-11403173"
description: "Mit ADAMANT Node v0.11.0 werden REST/WebSocket-Rate-Limits, strikte Abfragevalidierung für Chat/KVS-Endpunkte und konsolidierte OpenAPI-Quellen eingeführt."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/85"
publishedAt: "2026-11-26T06:52:55Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:11403173"
locale: "de"
placeholder: false
---

Mit der Einführung von standardmäßigen REST/WebSocket-Anti-Abuse-Rate-Limits, strikter AND-only-Abfragevalidierung für Chat- und KVS-Endpunkte sowie konsolidierten OpenAPI-Quellen unter `Adamant-im/adamant` in ADAMANT Node v0.11.0 wurde `adamant-api` aktualisiert, um Node-Failover, Bereitschaftsprüfungen und Abfrageserialisierung sowohl für v0.11.0+- als auch für ältere Nodes zu härten.

## Resilientes HTTP 429-Failover und Cooldowns

ADAMANT Node v0.11.0 erzwingt IP-basierte aggregierte (`all`) sowie klassenspezifische (`status`, `read`, `publish`) HTTP-Budgets und antwortet mit `429`, `Retry-After` / `RateLimit-Reset` und `RateLimit-Scope`.

Jede Anfrage erfasst `targetNode = this.node` vor dem Senden, sodass späte gleichzeitige Fehler niemals `this.node` auf einen Node zurücksetzen, von dem eine andere Anfrage bereits ein Failover durchgeführt hat. Gleichzeitige `updateNodes()`-Aufrufe teilen sich ein einzelnes, laufendes `updateNodesPromise`, anstatt vorzeitig zurückzukehren. Ein erzwungenes Failover, das sich einem geplanten Suchlauf anschließt, wird zu einer erzwungenen Rotation mit `failedNode` hochgestuft.

Da `/api/node/status` über das höher kapazitive `status`-Bucket abgerechnet wird (12.000/min gegenüber 3.000/min für `read`), antwortet ein ratenbegrenzter Node weiterhin auf Gesundheitsprüfungen. Der `NodeManager` verfolgt nun pro Node 429-Cooldowns (`rateLimitedUntil`, begrenzt auf 60s), sodass sowohl erzwungene als auch geplante Suchläufe bevorzugt nicht ratenbegrenzte, synchronisierte Nodes in 2-Node- und 3+-Node-Pools auswählen.

Wenn kein alternativer synchronisierter Node verfügbar ist, berücksichtigen idempotente Lesezugriffe `Retry-After` / `RateLimit-Reset` mit einem Jitter von bis zu 10s; wenn das Reset-Fenster des Nodes dieses Limit überschreitet oder die Wiederholungsversuche erschöpft sind, kehrt das SDK umgehend mit optionalen Metadaten in `AdamantApiResult` zurück:

```ts
const response = await api.getBlocks();

if (!response.success) {
  if (response.status === 429 && response.retryAfterMs !== undefined) {
    console.warn(`Rate-limited (${response.rateLimitScope}), retry in ${response.retryAfterMs}ms`);
  }
}
```

Nicht-idempotente `POST`-Anfragen (Transaktionseinreichungen) werden bei HTTP-Antworten, einschließlich `429`, niemals erneut gesendet.

## Einfache Filternamen, strikte Endpunkttypen und POST /api/states/get

Die Endpunkte `/api/states/get`, `/api/chats/get` und `/api/chatrooms/*` akzeptieren nun einfache Filternamen. Die `and: { ... }`-Wrapper werden flachgedrückt, während nicht unterstützte `or`-Wrapper clientseitig mit `success: false` abgelehnt werden. Dies behebt das Problem #97 auf Nodes vor v0.11.0 und entspricht der strikten Validierung von v0.11.0.

`ChatroomsOptions`, `ChatTransactionsOptions` und `KVSOptions` spiegeln nun exakt die Felder wider, die von ADAMANT Node v0.11.0 akzeptiert werden, einschließlich `toHeight` bei `/api/chats/get` und `/api/states/get`, während Höhen-/Bereichsfelder, die bei `/api/chatrooms/*` abgelehnt werden, ausgeschlossen sind. Das veraltete `userId` bei `/api/chatrooms/*` wird zur Laufzeit mit einer dedizierten Deprecation-Warnung entfernt.

Große KVS-Abfragen können nun `POST /api/states/get` verwenden:

```ts
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

`getKVS(..., {method: 'POST'})` nutzt die idempotente Lese-Wiederholungsrichtlinie des SDK und bewahrt so das vollständige 429- und 5xx-Failover.

## Bereitschaft von Nodes und Loader-Statusfilterung

Der `NodeManager` prüft nun die Felder `loader.loaded` und `loader.syncing` von `/api/node/status`. Nodes, die noch laden (`loaded: false`) oder synchronisieren (`syncing: true`), werden von der aktiven API-Auswahl und den WebSocket-Verbindungslisten ausgeschlossen; Nodes ohne `loader`-Objekt bleiben weiterhin zulässig. Mit `checkHealthAtStartup: true` wartet `onReady` nun, bis tatsächlich ein nutzbarer Node ausgewählt wurde, anstatt nach einem fehlgeschlagenen anfänglichen Gesundheits-Suchlauf auszulösen.

## Lokale Empfänger- und Delegate-Public-Key-Verifizierung

`encodeMessage()` und `decodeMessage()` lehnen nun nicht-kanonische, off-curve und small-order Ed25519-Schlüssel (Ordnungen 1, 2, 4 und 8) mit `invalid key` ab. `getPublicKey()` validiert ADM-Adressen lokal, bevor eine Netzwerkanfrage gestellt wird, und verifiziert, dass die vom Node zurückgegebenen Schlüssel lokal die angeforderte Adresse ableiten, bevor sie zwischengespeichert oder zurückgegeben werden. `sendMessage()` verifiziert aufgelöste Schlüssel lokal erneut vor der Verschlüsselung und gibt bei einer Nichtübereinstimmung `{success: false, errorMessage}` zurück; `voteForDelegate()` erzwingt eine Adressbindung und verwendet client-spezifische Delegate-Caches.

## Konsolidierung der OpenAPI-Quellen und Härtung der Lieferkette

`scripts/sync-api-types.mjs` bezieht die OpenAPI 3.2-Spezifikation nun direkt von `Adamant-im/adamant` (`openapi/specification/openapi.yaml`) und generiert `RateLimitErrorResponseDto` sowie `GetKVSRequestBody`. Die `pnpm-workspace.yaml` erzwingt eine 7-tägige Quarantäne für Abhängigkeits-Releases (`minimumReleaseAge: 10080`) mit expliziten `allowBuilds` und 0 Produktions-Audit-Schwachstellen.

## Referenzen

- SDK PR (Anpassung an Node v0.11.0 & Abhängigkeiten): https://github.com/Adamant-im/adamant-api-jsclient/pull/105
- Verifizierung von Empfänger- & Delegate-Public-Keys: https://github.com/Adamant-im/adamant-api-jsclient/pull/110
- Fix für einfache Chat- & KVS-Filter: https://github.com/Adamant-im/adamant-api-jsclient/pull/101
- Fix für `onReady` bei nutzbaren Nodes: https://github.com/Adamant-im/adamant-api-jsclient/pull/102
- ADAMANT Node v0.11.0: https://github.com/Adamant-im/adamant/pull/303
- SDK-Dokumentation: https://js.docs.adamant.im
- OpenAPI Swagger UI: https://docs.adamant.im/schema/
