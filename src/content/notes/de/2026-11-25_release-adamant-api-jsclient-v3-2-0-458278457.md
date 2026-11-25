---
title: "ADAMANT API JS Client v3.2.0"
slug: "release-adamant-api-jsclient-v3-2-0-458278457"
description: "ADAMANT API JS Client v3.2.0 ist ein Sicherheits- und Korrektur-Release, abgestimmt auf ADAMANT Node v0.11.0. Alle Nutzer von v3.0.0 und v3.1.0 sollten auf v3.2.0 aktualisieren."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.2.0"
publishedAt: "2026-11-25T15:08:18Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:458278457"
locale: "de"
placeholder: false
---

ADAMANT API JS Client v3.2.0 ist ein Sicherheits- und Korrektur-Release, das auf ADAMANT Node v0.11.0 abgestimmt ist. Alle Nutzer der Versionen v3.0.0 und v3.1.0 sollten auf v3.2.0 aktualisieren.

## Überprüfung von Empfänger- und Delegierten-Public-Keys

Das SDK erzwingt nun eine kanonische 32-Byte-Ed25519-Validierung auf der Kurve. Nicht-kanonische, außerhalb der Kurve liegende oder Curve25519-Keys mit kleiner Ordnung (1, 2, 4 und 8) werden abgelehnt. Zudem führt das SDK lokale ADM-Adressableitungsprüfungen durch, bevor Nachrichten zwischengespeichert oder verschlüsselt werden. Die Methode `getPublicKey()` gibt bei ungültigen ADM-Adressen ohne Netzwerkanfrage einen leeren String zurück und verhindert eine Verunreinigung des Caches, wenn ein Node einen nicht übereinstimmenden oder fehlerhaften Key liefert. `sendMessage()` verifiziert aufgelöste Empfänger-Keys lokal erneut und weist ungültige oder nicht übereinstimmende Keys mit dem Ergebnis `{success: false, errorMessage}` zurück, während `voteForDelegate()` Delegierten-Keys ablehnt, deren Adressbindung fehlschlägt. Ein `Map`-basierter `publicKeysCache` wird sowohl bei Schreib- als auch bei Lesevorgängen verifiziert, und netzwerkabhängige Delegierten-Caches (`byAddress`, `byUsername`) sind nun pro `AdamantApi`-Instanz isoliert.

## Korrekturen an KVS und Chat-Filter

Die Methoden `getKVS()`, `getChatTransactions()`, `getChats()` und `getChatMessages()` geben nun einfache Filternamen aus, indem sie explizite `and: { ... }`-Wrapper auflösen, um dem dokumentierten Node-Vertrag über alle ADAMANT Node-Versionen hinweg zu entsprechen. Nicht unterstützte `or`-Wrapper sowie Filter-Keys mit `and:`- oder `or:`-Präfixen bei reinen AND-Endpunkten werden clientseitig mit `{success: false, errorMessage}` abgelehnt, anstatt Präfixe zu senden, die von älteren Nodes ignoriert und von Nodes ab v0.11.0 abgelehnt werden. Dies wurde mittels eines aufgezeichneten Mainnet `/api/states/get`-Fixturtests verifiziert.

## Node-Verfügbarkeit und Loader-Filterung

Nodes, die `loader.loaded: false` oder `loader.syncing: true` melden, werden von der Auswahl aktiver Haupt-Nodes und WebSocket-Verbindungslisten ausgeschlossen; Legacy-Nodes ohne `loader`-Objekt bleiben weiterhin zulässig. Der `onReady`-Callback (sowie `api.isReady`) wird zurückgehalten, bis tatsächlich ein nutzbarer Node ausgewählt wurde. Die Startprüfungen werden mit einem gestaffelten Backoff von 5s, 10s, 30s und 60s wiederholt und fortgesetzt, selbst wenn ein vorheriger Durchlauf fehlschlägt, anstatt auf den 5-minütigen periodischen Scan zu warten. Wenn nach der Initialisierung alle bereiten Nodes ausfallen oder unter die `minVersion` fallen, greift das SDK mit einer Warnung auf einen `minVersion`-kompatiblen, geladenen, aber synchronisierenden Node zurück, sofern ein aktueller Referenzwert für die Sync-Höhe innerhalb der letzten 10 Minuten verfügbar ist und der Kandidat maximal 25 Blöcke von dieser Höhe entfernt ist. Der `onReady`-Callback wird bei einem Fehler nicht doppelt ausgelöst, und Nicht-Objekt-Antworten wie HTML 200-Wartungsseiten, `null` oder unvollständige `{success: true}`-Status-Payloads werden sicher übersprungen.

## Angleichung an ADAMANT Node v0.11.0 API, OpenAPI und KVS POST

Die deterministische API-DTO-Generierung (`scripts/sync-api-types.mjs`) wurde vom archivierten Repository `Adamant-im/adamant-schema` zu `Adamant-im/adamant` migriert (`openapi/specification/openapi.yaml` beim Release v0.11.0 Master-Commit `50568f37dc2b7da86f44991f96c40c8edde74d67`) und liest exakte installierte Tool-Versionen über `createRequire` aus. Das generierte `src/api/generated.ts` wurde mit `RateLimitErrorResponseDto`, `GetKVSRequestBody` und aktualisierten Links zu `https://docs.adamant.im/` neu erstellt. Endpunkt-Optionstypen (`ChatroomsOptions`, neue `ChatTransactionsOptions` und `KVSOptions`) wurden an die strikte Filtervalidierung von ADAMANT Node v0.11.0 angepasst, wobei `toHeight` bei `/api/chats/get` und `/api/states/get` erzwungen wird und Höhen-/Bereichsfilter von `/api/chatrooms/*` ausgeschlossen sind. Das Feld `ChatroomsOptions.userId` ist veraltet und wird zur Laufzeit bei `/api/chatrooms/*` mit einer einmaligen Warnung entfernt, damit Legacy-Aufrufe bei Nodes ab v0.11.0 nicht an der Validierung scheitern. Unterstützung für `POST /api/states/get` wurde via `api.getKVS(options, {method: 'POST'})` für große `keyIds`- oder `senderIds`-Abfragen hinzugefügt, inklusive vollständigem idempotentem Lese-Failover analog zu `GET`.

## Resilienz bei HTTP 429 und Failover-Härtung

Das SDK erfasst den `targetNode` vor jeder Anfrage, sodass gleichzeitige Fehler `this.node` niemals auf einen fehlerhaften Node zurücksetzen. Bei HTTP 429-Antworten von mehreren Nodes schaltet es sofort auf einen anderen zwischengespeicherten, synchronisierten und nicht ratenbegrenzten Node um, ohne zusätzliche `/api/node/status`-Probes. Bei 429-Antworten von einzelnen Nodes werden Health-Scans übersprungen und 429 in `checkNode()` von Offline-Nodes unterschieden. Gleichzeitige `updateNodes()`-Scans werden über ein laufendes Promise dedupliziert, und ein geplanter Scan wird zu einem erzwungenen Failover hochgestuft, wenn eine Anfrage einen fehlerhaften Node meldet. Das SDK rotiert bei 2-Node- und 3+-Node-Sync-Sets vom `failedNode` weg und verfolgt 429-Cooldowns pro Node (`rateLimitedUntil`, maximal 60s), sodass erzwungene und geplante Health-Scans ratenbegrenzte Nodes bis zum Ablauf des Cooldowns meiden. Es parst `Retry-After` (Sekunden oder HTTP-Datum), `RateLimit-Reset` und `RateLimit-Scope`-Header, führt bei idempotentem Lesen (`GET` und `POST /api/states/get`) sofort ein Failover durch, wenn ein anderer synchronisierter Node existiert, oder hält bei einem einzelnen Node ein begrenztes Backoff mit Jitter bis zu 10s ein, ohne in eine Endlosschleife zu geraten. Optionale Metadaten zu `status`, `retryAfterMs` und `rateLimitScope` werden bei HTTP 429-Fehlern in `AdamantApiResult` bereitgestellt, während `POST`-Schreibanfragen strikt nicht wiederholt werden.

## Aktualisierung der Abhängigkeitssicherheit und 7-Tage-Quarantäne

Das Release erzwingt `minimumReleaseAge: 10080` (7 Tage) und explizite `allowBuilds`-Einstellungen (`'@parcel/watcher': false`, `esbuild: true`, `unrs-resolver: true`) in `pnpm-workspace.yaml` ohne Ausnahmen für das Release-Alter. Direkte und transitive Abhängigkeiten wurden über die 7-Tage-Frist hinaus aktualisiert, darunter axios, bitcoinjs-lib, tiny-secp256k1, pbkdf2, socket.io-client, bip39, ecpair, semver, @redocly/cli, eslint, jest, prettier und swagger-typescript-api, wodurch die Produktions-Audit-Befunde von 20 auf 0 reduziert wurden. Die Veröffentlichung erfolgt über GitHub Actions npm Trusted Publishing mit Build-Provenienz.

## Validierung

Verifiziert unter Node.js v24.19.0 und pnpm 11.13.1. Die vollständige Test-Suite (`pnpm test`) umfasst 20 Suiten und 333 Tests mit 100% Funktionsabdeckung; `gts lint` wurde erfolgreich bestanden. API-Typ-Prüfungen entsprechen den referenzierten ADAMANT- und adamant-wallets-Commits. TypeDoc- und VitePress-Dokumentations-Builds waren erfolgreich. Paket-Tests für ESM, CommonJS, Live-Consumer, Paket-Subpaths und TypeScript-Deklarationen wurden bestanden. Das Produktions-Audit meldet 0 Schwachstellen und alle 893 gesperrten Pakete verfügen über verifizierte Signaturen.

### Breaking Changes

Die Funktionen `encodeMessage()` und `decodeMessage()` werfen nun einen `invalid key`-Fehler für nicht-kanonische, außerhalb der Kurve liegende oder Curve25519-Keys mit kleiner Ordnung (1, 2, 4 und 8). Legitime Mainnet-Keys sind davon nicht betroffen. Die Methode `getPublicKey()` gibt bei ungültigen ADM-Adressen ohne Netzwerkanfrage einen leeren String zurück und gibt ebenfalls einen leeren String zurück, wenn der Key des Nodes die Adresse nicht ableitet. Die Methode `sendMessage()` lehnt solche Empfänger mit `{success: false, errorMessage}` ab, und `voteForDelegate()` lehnt Delegierten-Keys ab, deren Adressbindung fehlschlägt.

Die Einschränkung der TypeScript-Abfrageoptionen ändert `ChatroomsOptions` und `KVSOptions` so, dass sie keine nicht unterstützten `TransactionQueryParameters`-Felder mehr erben, die von ADAMANT Node v0.11.0 abgelehnt werden. Die Methode `getChatTransactions()` verwendet nun `ChatTransactionsOptions`, eine Obermenge von `ChatroomsOptions`, die `fromHeight`, `toHeight`, `inId` und `isIn` beibehält. `TransactionQueryParameters` bleibt unverändert exportiert.

Der direkte Aufruf von `transformTransactionQuery(query, 'states' | 'chats' | 'chatrooms')` mit einem `or`-Wrapper oder Filter-Keys mit `and:`- oder `or:`-Präfix wirft nun einen `Error` mit der Nachricht `badParameter`, während `AdamantApi`-Client-Methoden `{success: false, errorMessage}` zurückgeben.

Der `toHeight`-Filter bei `getKVS()` und `getChatTransactions()` wird nur von ADAMANT Node v0.11.0+ erzwungen. Ältere Nodes ignorieren `toHeight` stillschweigend und geben neuere Datensätze mit `success: true` zurück; Aufrufer, die auf eine obere Höhenbegrenzung angewiesen sind, sollten `minVersion: '0.11.0'` setzen.

Das Feld `userId` bei `/api/chatrooms/*` ist in `ChatroomsOptions` veraltet und wird zur Laufzeit mit einer dedizierten Warnung entfernt. Aufrufer sollten die Account-Adresse nur als URL-Pfad-Argument von `getChats(address)` oder `getChatMessages(address1, address2)` übergeben.

Mit `checkHealthAtStartup: true` wartet `onReady` nun, und `api.isReady` bleibt `false`, bis ein nutzbarer, geladener und nicht synchronisierender Node ausgewählt wurde, wobei die Startprüfungen mit einem Backoff von 5s, 10s, 30s und 60s wiederholt werden.

Optionale Felder für `status`, `retryAfterMs` und `rateLimitScope` wurden der `success: false`-Variante von `AdamantApiResult` hinzugefügt, wenn eine Anfrage mit HTTP 429 fehlschlägt.

Transaktions-Byte-Layout, Hashes, IDs, Signaturen, Verschlüsselung, Wallet-Ableitung und Root-Exporte sind unverändert.
