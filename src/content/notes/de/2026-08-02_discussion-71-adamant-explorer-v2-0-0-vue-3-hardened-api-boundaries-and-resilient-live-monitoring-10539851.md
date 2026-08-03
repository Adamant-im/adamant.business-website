---
title: "ADAMANT Explorer v2.0.0: Vue 3, gehärtete API-Grenzen und belastbare Live-Überwachung"
slug: "discussion-71-adamant-explorer-v2-0-0-vue-3-hardened-api-boundaries-and-resilient-live-monitoring-10539851"
description: "ADAMANT Explorer v2.0.0 ist das erste stabile Release seit v1.3.0, das 218 Commits und 491 geänderte Dateien in einem umfassenden Update vereint."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/71"
publishedAt: "2026-08-02T13:46:45Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10539851"
locale: "de"
placeholder: false
---

ADAMANT Explorer v2.0.0 ist das erste stabile Release seit v1.3.0. Es fasst 218 Commits und 491 geänderte Dateien in einem umfassenden Update für Frontend, Backend, Live-Überwachung, Sicherheit und Betrieb zusammen, wobei bestehende öffentliche Routen und Deep Links erhalten bleiben.

## Frontend-Architektur

Die veraltete Anwendung aus AngularJS, Bootstrap 3 und Webpack wurde durch Vue 3 Single-File-Components, Pinia für den geteilten Netzwerkstatus, Vue Router 5 mit URL-Kompatibilität sowie Vite 8 für den Build-Prozess ersetzt. Framework-unabhängige Hilfsprogramme befinden sich in `src/lib/` und können direkt in Node.js getestet werden.

Alle Hauptansichten wurden neu aufgebaut: Home, Blöcke, Transaktionen, Adressen, Delegierte, Top-Konten, Reservierte Wallets, Delegierten-Monitor, Netzwerk-Monitor und Aktivitätsdiagramm. Die Benutzeroberfläche bietet nun dauerhafte helle und dunkle Designs, responsive Tabellen und Transaktionskarten, barrierefreie Steuerelemente, deterministische Transaktionsreihenfolgen und eine ADM-Darstellung mit voller Präzision, wo Ledger-Genauigkeit entscheidend ist.

## ADAMANT Node und API-Grenze

Die gesamte Interaktion mit dem ADAMANT Node erfolgt nun über `adamant-api` 3.1.0 in einer dedizierten Request-Adapter-Schicht. Das Backend wurde um eine Startbereitschaftsprüfung, Node-Failover, normalisierte SDK-Fehlerbehandlung, begrenzte Paginierung, strikte Routen-/Query-Validierung sowie getrennte Schichten für Request, Normalisierung und Response-Assemblierung erweitert.

Der Explorer stellt nur 12 Same-Origin-Routen bereit, die für die Benutzeroberfläche erforderlich sind, zuzüglich `GET /api/networkHealth`. Sechzehn nicht unterstützte Legacy-Endpunkte, willkürliches Durchreichen von Transaktionsfiltern, Wildcard-CORS und veraltete Market-Watcher-Routen wurden entfernt. Diese reduzierte Oberfläche dient als Implementierungsgrenze für die Explorer-UI, nicht als allgemeine öffentliche API. Externe Anwendungen sollten `adamant-api-jsclient` verwenden. Für die betriebliche Überwachung kann `GET /api/networkHealth` genutzt werden, das die Zustände `live`, `degraded`, `critical` oder `unavailable` meldet.

## Live-Überwachung und Cache-Konsistenz

Die vier öffentlichen Socket.IO-Namespaces – Header, Delegierten-Monitor, Netzwerk-Monitor und Aktivitätsdiagramm – verwenden nun serialisiertes Polling, Lifecycle-Generationen, begrenzte Wiederholungsversuche und Schutz vor veralteten Callbacks. Block-gesteuerte Aktualisierungen ersetzen feste Aktualisierungsintervalle für die Ansichten Home und Blöcke. REST-Hydrierung und begrenzte Bestätigungs-Backlogs ergänzen die WebSocket-Block-Benachrichtigungen. Berechnungen für Delegierten-Zeitpläne, Forging-Status, Belohnungen, Gebühren und Runden-Grenzen sind nun stabil, inklusive kohärenter Statistiken für Blöcke und Peers sowie optionaler Redis-Persistenz. Die Cache-Identität verarbeitet neue Blöcke und Fork-Ersetzungen bei gleicher Höhe korrekt.

Die GeoJS-Peer-Geolokalisierung ist durch zwischengespeicherte Normalisierung und Degradierung auf Hostnamen-Ebene begrenzt. Ein validierter, zwischengespeicherter, zeitlich begrenzter und pro IP limitierter OpenStreetMap-Kachel-Proxy unterstützt sowohl Clearnet- als auch Tor-Bereitstellungen. Redis wird weiterhin für das Response-Caching und die Speicherung von Statistiken empfohlen, jedoch führen Redis-Ausfälle nicht mehr zum Absturz der Kern-HTTP- oder statischen Dienste.

## Sicherheits- und Privatsphäre-Härtung

Die öffentlichen Request- und Browser-Grenzen umfassen nun eine exakte Durchsetzung der API-Oberfläche vor dem Caching und der ADAMANT-Bereitschaftsprüfung, strikte Validierung für Adressen, uint64-Identifikatoren, Paginierung, Routen, Methoden und Filter sowie einen prozessinternen API-Limiter mit festem Zeitfenster, Proxy-bewusster Client-Identität und einem Fail-Closed-Überlauf-Bucket. Sicherheits-Header, eine eingeschränkte Content Security Policy, stabile öffentliche Fehlermeldungen, explizite HTTP-Timeouts und minimierte Access-Logs sind implementiert. Werte des Netzwerk-Monitors von Nodes und Peers werden nur als Text gerendert und validiert. Eine kontrollierte Degradierung deckt Ausfälle von Redis, Node, Wechselkursen, Geolokalisierung und Kachel-Providern ab.

Das Repository enthält ein versioniertes Bedrohungsmodell sowie eine Sicherheits- und Zuverlässigkeitsprüfung. Die Sicherheit wurde von cryptofoundry auditiert.

## Änderungen an Laufzeit und Bereitstellung

Betreiber, die von v1.3.0 aktualisieren, sollten beachten, dass Node.js `^22.18.0 || >=24.11.0` erforderlich ist und konfigurierte ADAMANT Nodes Version 0.10.2 oder neuer ausführen müssen. Eine neue `config.jsonc` sollte auf Basis der `config.default.jsonc` erstellt werden, wobei auf `nodes_adm`, `trustedProxies`, `redis`, `geoLocation`, `exchangeRates` und `log_level` zu achten ist. Freegeoip wurde durch eine optionale GeoJS-Integration ersetzt; das Deaktivieren der Geolokalisierung behält Peer- und Hostname-Daten bei, ohne auf Provider-basierte Kartendaten angewiesen zu sein. Reverse Proxies und Firewalls müssen den Same-Origin-Pfad `/osm-tiles/` zulassen. Generierte `public/`-Assets sind nicht im Repository enthalten und müssen während der Bereitstellung mit `npm run build` erstellt werden. `npm run dev` startet Backend und Vite gemeinsam; `npm run dev:frontend` startet nur Vite.

## Validierung

Der veröffentlichte Quellcode hat ESLint- und Prettier-Prüfungen, einen Produktions-Build mit 6.337 transformierten Modulen, 226 Node-spezifische Unit-Tests, 41 Live-ADAMANT-Testnet-API-Tests sowie vollständige und produktionsspezifische Abhängigkeitsaudits ohne gemeldete Schwachstellen bestanden. Browser-Smoke-Tests über 13 Routen bei Desktop-, Tablet- und Mobilauflösungen ergaben keine Konsolenfehler oder horizontalen Überläufe.

Das vollständige Release ist in den [GitHub Releases](https://github.com/Adamant-im/adamant-explorer/releases/tag/2.0.0) verfügbar.
