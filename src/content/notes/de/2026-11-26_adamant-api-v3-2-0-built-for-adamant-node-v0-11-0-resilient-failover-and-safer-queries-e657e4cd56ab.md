---
title: "adamant-api v3.2.0: Optimiert für ADAMANT Node v0.11.0, mit resilientem Failover und sichereren Abfragen"
slug: "adamant-api-v3-2-0-built-for-adamant-node-v0-11-0-resilient-failover-and-safer-queries-e657e4cd56ab"
description: "cryptofoundry präsentiert adamant-api v3.2.0, das offizielle TypeScript- und Node.js-SDK für die ADAMANT-Blockchain, abgestimmt auf ADAMANT Node v0.11.0."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-api-v3-2-0-built-for-adamant-node-v0-11-0-resilient-failover-and-safer-queries-e657e4cd56ab"
publishedAt: "2026-11-26T07:08:23.535Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:e657e4cd56ab"
locale: "de"
placeholder: false
---

cryptofoundry präsentiert eine Zusammenfassung von adamant-api v3.2.0, dem offiziellen TypeScript- und Node.js-SDK für die ADAMANT-Blockchain, das auf ADAMANT Node v0.11.0 abgestimmt ist.

Die Entwicklung dezentraler Apps, Trading-Bots, Explorer oder Zahlungsintegrationen direkt gegen rohe Blockchain-HTTP-Endpunkte bedeutet, dass dieselbe Zuverlässigkeits- und Kryptografie-Infrastruktur immer wieder neu erfunden werden muss: Auswahl synchronisierter Nodes, Wiederholungsversuche bei vorübergehenden Ausfällen ohne Transaktionsduplikate, Verschlüsselung von Nachrichten mit NaCl, Signieren deterministischer Transaktionen und die Synchronisierung von TypeScript-DTOs mit Node-Upgrades. Das SDK erledigt dies direkt mit Zero-Boilerplate-Resilienz (übergeben Sie eine Liste unabhängig betriebener HTTPS-Nodes, und das SDK überwacht den Status, prüft die Synchronisierungshöhen, überspringt veraltete oder ladende Nodes und führt automatisch ein Failover durch), modularen Subpath-Importen, End-to-End-TypeScript-Sicherheit mit DTOs, die aus der maßgeblichen ADAMANT Node OpenAPI 3.2-Spezifikation generiert wurden, sowie Live-Socket.IO-Abonnements mit automatischer Wiederherstellung nach Verbindungsabbrüchen.

### Lokale Überprüfung von Empfänger- und Delegate-Public-Keys

Vor der Verschlüsselung einer Nachricht oder der Stimmabgabe für einen Delegate überprüft v3.2.0 lokal, ob jeder von einem Node zurückgegebene Ed25519-Public-Key ein kanonischer, auf der Kurve liegender 32-Byte-Key ohne niedrige Ordnung ist, und leitet kryptografisch die angeforderte ADM-Adresse ab. Fehlerhafte, außerhalb der Kurve liegende, niedrigwertige (Ordnungen 1, 2, 4 und 8) oder nicht übereinstimmende Keys werden vor dem Caching oder der Verschlüsselung sauber abgelehnt, und Delegate-Caches werden pro `AdamantApi`-Instanz isoliert.

### Kritische Korrektur und Sicherheits-Fix für KVS- und Chat-Abfragen

In v3.0.0 und v3.1.0 sendeten `getKVS()`, `getChatTransactions()`, `getChats()` und `getChatMessages()` mit `and:`-präfixierte Filter, die Nodes vor v0.11.0 stillschweigend ignorierten, während sie dennoch `success: true` mit ungefilterten Datensätzen zurückgaben. In v3.2.0 senden diese Methoden immer einfache Filternamen (durch Auflösung expliziter `and: { ... }`-Wrapper) und lehnen nicht unterstützte `and:`-Wrapper sowie vor-präfixierte Keys clientseitig ab. Jede 3.x-Anwendung, die KVS- oder Chat-Daten liest, sollte auf v3.2.0 aktualisiert werden.

### Resiliente HTTP 429-Behandlung für Node v0.11.0

ADAMANT Node v0.11.0 aktiviert standardmäßig produktionsreife HTTP- und WebSocket-Anti-Missbrauchs-Limits. Wenn ein Node HTTP 429 zurückgibt, rotieren idempotente Lesezugriffe (GET und POST `/api/states/get`) sofort zu einem anderen zwischengespeicherten, synchronisierten Node, während der ratenbegrenzte Node in eine begrenzte Abkühlphase (bis zu 60 Sekunden) eintritt, damit Gesundheitsprüfungen den Datenverkehr nicht direkt zurückleiten. Parallele Anfragen, die einen ratenbegrenzten Node treffen, teilen sich einen einzigen deduplizierten Gesundheits-Scan, anstatt `/api/node/status` zu überlasten oder den aktiven Node ständig zu wechseln. Bei Setups mit nur einem Node oder wenn das Reset-Fenster eines Nodes die begrenzte Wartezeit des SDK von 10 Sekunden überschreitet, macht `AdamantApiResult` nun optionale Felder für `status`, `retryAfterMs` und `rateLimitScope` verfügbar, damit Bots Wiederholungsversuche sauber planen können. POST-Aufrufe zur Transaktionsveröffentlichung werden nach Erhalt einer HTTP-Antwort niemals automatisch wiederholt.

### Intelligentere Startbereitschaft

Dienste, die zusammen mit einem lokalen Node starten, sahen oft, dass `onReady` ausgelöst wurde, während der Node noch Speichertabellen lud oder die Kette aufholte. In v3.2.0 werden Nodes, die `loader.loaded: false` oder `loader.syncing: true` melden, von der primären API- und WebSocket-Auswahl ausgeschlossen. `onReady` (und `api.isReady`) wartet mit einem begrenzten Start-Retry-Backoff (5s, 10s, 30s, 60s), bis ein nutzbarer Node tatsächlich bereit ist, Abfragen zu bedienen. Initialisierte Clients verfügen über ein höhenbegrenztes Synchronisierungs-Fallback, falls alle vollständig synchronisierten Nodes ausfallen.

### POST /api/states/get und strikte v0.11.0 Typ-Ausrichtung

Um Dutzende oder Hunderte von KVS-Keys oder Absenderadressen abzufragen, ohne die URL-Längenbegrenzungen zu überschreiten, übergeben Sie `{method: 'POST'}` an `getKVS()`:

```js
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

TypeScript-Schnittstellen (`ChatroomsOptions`, `ChatTransactionsOptions` und `KVSOptions`) spiegeln nun die strikte Abfragevalidierung von ADAMANT Node v0.11.0 wider, sodass nicht unterstützte Felder zur Kompilierzeit erkannt werden. Der OpenAPI-Generator synchronisiert nun direkt von `Adamant-im/adamant`.

### Supply-Chain-Sicherheit & 7-Tage-Quarantäne

Gemäß der in Node v0.11.0 eingeführten ADAMANT-Sicherheitsrichtlinie erzwingt adamant-api nun eine 7-tägige Release-Alters-Quarantäne (`minimumReleaseAge: 10080` in `pnpm-workspace.yaml`), beschränkt Abhängigkeits-Lebenszyklus-Skripte über `allowBuilds`, wird mit 0 produktionsrelevanten `pnpm audit`-Schwachstellen ausgeliefert und veröffentlicht auf npm mit GitHub Actions Trusted Publishing Provenance.

```
npm install adamant-api@3.2.0
```
