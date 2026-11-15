---
title: "ADAMANT Messenger v4.12.1: Strenge CSP, deterministische Indexer-Paginierung, RTL-UI und verifizierbare Builds"
slug: "discussion-83-adamant-messenger-v4-12-1-strict-csp-deterministic-indexer-pagination-8-language-rtl-ui-an-11310133"
description: "ADAMANT Messenger PWA v4.12.1 basiert auf v4.12.0 und umfasst 69 Commits, 12 Pull Requests und 14 geschlossene Meilenstein-Issues mit Fokus auf Sicherheit und RTL-Support."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/83"
publishedAt: "2026-11-14T17:50:00Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Messenger apps"
cardSpan: "half"
originalId: "github-discussion:11310133"
locale: "de"
placeholder: false
---

ADAMANT Messenger PWA `v4.12.1` basiert auf `master` (`074db965`) und baut auf `v4.12.0` (`dfe094d3`) auf. Das Release umfasst 69 Commits, 12 zusammengeführte Pull Requests und 14 geschlossene Meilenstein-Issues. Neben neuen Funktionen konzentriert sich dieses Release auf verifizierbare Transport- und Laufzeithärtung, deterministische Node- und Indexer-Paginierung innerhalb einer dezentralen Multi-Operator-Infrastruktur, vollständige Acht-Sprachen-Parität mit arabischer RTL-Unterstützung sowie transparente Build-Provenienz für Web-, Desktop- und Android-Targets.

## Strenge CSP, eval-freie Web3-Validierung und gemeinsame Security-Header

Ein vereinheitlichter Security-Header-Vertrag (`PWA_SECURITY_HEADERS` in `vite-config/plugins/cspHardeningPlugin.ts`) definiert nun die einzige Quelle der Wahrheit, die über alle Builds hinweg erzwungen wird — `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer` und `X-XSS-Protection: 0` — gespiegelt durch `vercel.json` Catch-all-Header und nginx-Konfigurationsdateien. Web3-ABI und Validierung wurden auf Zod 4 mit `config({ jitless: true })` für `web3-validator` und `abitype` für `web3-eth-abi` umgestellt, wodurch Compiler-Einstiegspunkte entfernt wurden, während das CSP-Härtungs-Plugin das Produktions-Bundle gegen Laufzeit-`eval` und `Function`-Aliase absichert.

Die Absicherung der Lieferkette umfasst eine `.npmrc` mit einem Mindestalter von sieben Tagen für Releases, ein Skript zur Überprüfung des Abhängigkeitsalters, Dependabot-Cooldowns, Electron-Produktionsbereinigung sowie den Ausschluss von Playwright-Anmeldedaten und Artefakten. Live-Deployment-Verifizierungs-Probes (`cspDeployments.env.spec.ts`, `tests/e2e/production-csp.live.spec.ts`) validieren die Header-Präsenz und die Durchsetzung von Skripten auf dem Anmeldebildschirm ohne CSP-Verletzungen in Produktions-, Entwicklungs-, GitHub Pages- und Surge-Deployments.

## Node-Mindestversionen, begrenzte PostgREST-Abfragen und Single-Node-Paginierungsaffinität

Die minimale ADM-API-Version wurde auf `0.10.0` für Mainnet, Testnet und Tor angehoben. Die Mindestversion des IPFS-Nodes wird nun explizit aus `ipfsService.minVersion` (`0.1.0`) gelesen, anstatt auf den allgemeinen Dienst-Mindestwert zurückzugreifen. Ausgelagerte Node-Fallback-IPs werden über das `adamant-wallets`-Register synchronisiert.

Echtzeit-Direktübertragungen von ADM wurden verbessert: Das Schema ersetzt `withoutDirectTransfers` durch Integer-Enums, WebSocket-Verbindungen werden beim Entsperren sofort aufgebaut und abonnieren Chat-Transaktionstypen `[0, 8]`, und der Übertragungsstatus bleibt zwischen Chat-Vorschau, Transaktionsliste und Übertragungskarten-Komponenten synchronisiert.

ETH-Indexer-Abfragen über `EthIndexerClient.ts` erzwingen nun ein `limit` bei jeder `/ethtxs`-Anfrage (Standardwert 25), teilen native ETH-Lookups in zwei begrenzte, indizierte Abfragen auf, die clientseitig nach `txhash` zusammengeführt und dedupliziert werden, und führen `getTimestampGroup` für die Auflösung von Grenzen bei gleichem Zeitstempel ein. Cross-Chain-Paginierungsschutz für BTC, DOGE und DASH hält die aktive Paginierung an einen einzelnen Indexer gebunden, anstatt eine Adresse über mehrere Operatoren zu verteilen. Der persistierte Modulstatus bereinigt zwischengespeicherte Transaktionen und setzt Paginierungs-Sitzungscursor beim Speichern zurück, um ein Veralten der Cursor zu verhindern.

![ADM- und IPFS-Node-Mindestversionen sowie Einstellungsaktionen auf Mobilgeräten](/images/engineering-notes/github/discussions/11310133/001-bcf4ca3db8.webp)

*ADM-Nodes unter `0.10.0` und reine HTTP-Endpunkte als nicht unterstützt markiert; IPFS-Nodes werden gegen `ipfsNode.minVersion` (`0.1.0`) verifiziert.*

![Desktop-Split-Pane-Chat mit synchronisiertem ADM-Übertragungsstatus und Klartext-XSS-Sanitisierung](/images/engineering-notes/github/discussions/11310133/002-4dc1da2b89.webp)

*Chat-Vorschau-Abstände und Zustellungs-Häkchen synchronisiert mit Typ-0-ADM-Übertragungen; unsanitisierte Payload-Vorschauen werden sicher als inaktiver Text gerendert.*

![Desktop ADM-Wallet-Transaktionsliste](/images/engineering-notes/github/discussions/11310133/003-a42684a993.webp)

*Live-Mainnet-Transaktionsfeed gekoppelt mit der Single-Node-Paginierungsarchitektur über ADM, ETH/ERC-20, BTC und DOGE.*

## Build-Identität, HTTP-IPFS-Multihash-Fallback und isolierte Netzwerkkonfigurationen

A Build-Info-Plugin (`virtual:adamant-build-info`) macht bereinigte Informationen zu `version`, `branch`, `commit`, `prNumber`, `author`, `buildDate` und `isTestnet` in einem Build-Dialog verfügbar, zusammen mit einer „Force Refresh“-Service-Worker-Aktion, die den CacheStorage löscht, während Benutzeranmeldedaten und verschlüsselter IndexedDB-Status erhalten bleiben. Testnet-Builds zeigen explizite `TESTNET`-Badges.

Für reine HTTP-Kontexte wie `.onion`-Mirrors, in denen `crypto.subtle` nicht verfügbar ist, verwendet das IPFS-Anhang-Fallback eine `@noble/hashes` SHA-256-Multihash-Ableitung. Netzwerkkonfigurationen sind in `src/config/mainnet.json` vereinheitlicht und werden über ein virtuelles Modul bereitgestellt, sodass nicht unterstützte Vite-Modi oder Konfigurationslecks zwischen Netzwerken bereits zur Build-Zeit fehlschlagen.

![BuildInfoDialog mit Force Refresh, 8-Sprachen-Auswahl und Testnet-Anmeldeindikator](/images/engineering-notes/github/discussions/11310133/004-4f8da5e80c.webp)

*Login-Build-Dialog mit Force Refresh, vollständigem 8-Sprachen-Dropdown und deutlichen TESTNET-Markierungen bei Testnet-Deployments.*

## Acht-Sprachen-Parität und vollständige arabische RTL-Unterstützung

Dieses Release fügt Übersetzungen für Spanisch, Französisch, Japanisch und Arabisch hinzu, schließt Audits für Deutsch, Russisch und vereinfachtes Chinesisch ab und gleicht alle acht Locale-Dateien auf exakte Schlüsselparität ab (418 Blatt-Schlüssel pro Locale). Die Funktion `applyLocale()` synchronisiert `vue-i18n`, `dayjs`, Vuetify-Locales, `dir` und `lang`, fügt präzise Pluralregeln für arabische, französische und russische Fälle bei Zahlen über 100 hinzu, wählt `ar-u-nu-latn`-Ziffern für arabische Daten und erkennt die Ausgangssprache lokal über `navigator.languages`.

Das vollständige arabische RTL-Layout wird über Vuetify `rtl: { ar: true }` aktiviert, Navigationspfeile werden durch eine richtungsabhängige Icon-Komponente gespiegelt, CSS-logische Eigenschaften werden über alle Ansichten hinweg verwendet und `dir="auto"` wird auf benutzerdefinierte Nachrichten angewendet, während für Passphrasen LTR erzwungen wird. Regressionstests (`RtlUiContract.spec.js`, `chat-rtl-layout-regression.spec.ts`) sichern das Layout gegen zukünftige Fehler ab.

![Arabische RTL-Mobilansichten für Chats, aktiven Chat mit ADM-Übertragung und Einstellungen](/images/engineering-notes/github/discussions/11310133/005-94937d5ba6.webp)

*Rechtsbündige Chat-Liste mit lateinischen Ziffern, aktive Übertragungskarte in der RTL-Chat-Ansicht mit gespiegelten Richtungssymbolen und gespiegelter Einstellungs-Hierarchie.*

![Spanische, französische und japanische Einstellungsbildschirme](/images/engineering-notes/github/discussions/11310133/006-867e6e8b17.webp)

*Spanische, französische und japanische Versionen, die alle 418 UI-Strings im Live-Deployment abgleichen.*

## Verpackungs- und Plattformhinweise

Android-Targets wurden auf `compileSdkVersion` und `targetSdkVersion` 36 aktualisiert, wobei `minSdkVersion` auf 24 (Android 7.0+) angehoben wurde. Zudem wurden AGP 8.13.0, Gradle 8.14.3 und Cordova Android 14.0.1 (`versionCode` 41201) implementiert.

Auf macOS wurde das Entwicklerkonto von Apple blockiert, weshalb die CI-Notarisierung derzeit deaktiviert ist. Desktop `.dmg`-Installer (x64, arm64, universal) sind weiterhin mit der Developer ID signiert und können nach dem ersten Startversuch über Systemeinstellungen → Datenschutz & Sicherheit → „Dennoch öffnen“ installiert werden. Die iOS App Store-Schaltfläche auf adamant.im ist vorübergehend nicht anklickbar und mit einem entsprechenden Hinweis versehen.
