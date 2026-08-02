---
title: "ADAMANT Explorer v2.0.0"
slug: "release-adamant-explorer-2-0-0-363589536"
description: "ADAMANT Explorer v2.0.0 ist das erste stabile Release seit v1.3.0. Es modernisiert Frontend, Backend, Monitoring, Sicherheit, Abhängigkeiten, Tests und Dokumentation."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-explorer/releases/tag/2.0.0"
publishedAt: "2026-08-01T17:56:02Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-explorer"
tag: "2.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-explorer:363589536"
locale: "de"
placeholder: false
---

ADAMANT Explorer v2.0.0 ist das erste stabile Release seit v1.3.0. Es modernisiert das Explorer-Frontend, das Backend, das Live-Monitoring, die Sicherheitsgrenzen, Abhängigkeiten, Tests sowie die betriebliche Dokumentation, wobei bestehende URLs öffentlicher Seiten und Deep-Links erhalten bleiben.

Das Frontend wurde auf Basis von Vue 3, Pinia, Vue Router 5 und Vite 8 neu aufgebaut und ersetzt den bisherigen Stack aus AngularJS, Bootstrap 3 und Webpack. Alle öffentlichen Explorer-Seiten verfügen nun über responsive Layouts für Desktop, Tablet und Mobilgeräte mit dauerhaften Hell- und Dunkel-Modi, barrierefreien Bedienelementen, mobilen Transaktionskarten, sichereren Tooltips und verbessertem Feedback beim Kopieren. Kontextbezogene Transaktionssemantiken wurden für Überweisungen, Abstimmungen (Votes/Unvotes), DApp-Operationen, Börsenaktivitäten und Willkommensboni hinzugefügt.

Auf der Backend-Seite wurde der Zugriff auf den ADAMANT Node rund um `adamant-api` 3.1.0 neu gestaltet, inklusive Readiness-Gating, Failover, begrenzter Paginierung, normalisierten Fehlern sowie getrennten Request- und Handler-Schichten. Die 12 Same-Origin-Routen, die für die Explorer-UI erforderlich sind, wurden beibehalten und eine neue Route `GET /api/networkHealth` wurde hinzugefügt. Strenge Routen- und Abfragevalidierung, deterministische Transaktionsreihenfolge, korrigierte Überweisungsfilterung, Paginierung für Top-Accounts, Live-Bestätigungen und ADM-Formatierung mit voller Präzision sind nun implementiert. Redis ist für den Kernbetrieb optional, während eine resiliente API-Zwischenspeicherung sowie rollierende Block- und Peer-Statistiken erhalten bleiben.

Das Live-Monitoring wurde über die Lebenszyklen von Header, Delegate Monitor, Network Monitor und Activity Graph Socket.IO hinweg stabilisiert, inklusive serialisiertem Polling und begrenzten Wiederholungsversuchen. Block-gesteuerte Seitenaktualisierungen und eine begrenzte REST-Bestätigung für kompakte WebSocket-Blockbenachrichtigungen wurden ergänzt. Delegate-Zeitpläne, Forging-Status, Belohnungen, Gebühren, Peer-Statistiken, Versionsreihenfolgen und das Verhalten an Runden-Grenzen wurden verbessert. Die Freegeoip-Integration wurde durch eine optionale GeoJS-Peer-Geolokalisierung ersetzt, und ein Same-Origin-validierter, zwischengespeicherter und ratenbegrenzter OpenStreetMap-Tile-Proxy wurde eingeführt.

Zu den Sicherheits- und Zuverlässigkeitsverbesserungen gehören die Entfernung von Wildcard-CORS und 16 nicht mehr unterstützten Legacy-Explorer-API-Endpunkten. Proxy-bewusste API-Ratenbegrenzung, validierte vertrauenswürdige Proxys, Sicherheits-Header, eine eingeschränkte CSP, stabile Fehlerbehandlung und explizite HTTP-Timeouts wurden hinzugefügt. Request-Logs werden durch den Ausschluss von Query-Strings minimiert, und Daten von nicht vertrauenswürdigen Nodes, Peers, Proxys, Redis, Geolokalisierungsdiensten und Browser-Ursprüngen werden validiert. Ein Bedrohungsmodell für das Repository, eine Sicherheits- und Zuverlässigkeitsprüfung sowie eine umfassende Unit-Test-Abdeckung für öffentliche Schnittstellen und den Live-Monitor-Status wurden implementiert.

Die unterstützte Laufzeitumgebung wurde auf Node.js `^22.18.0 || >=24.11.0` aktualisiert. Express, Redis, Socket.IO, Axios, Vue, Vite, Pinia, Vue Router, ESLint, Mocha, Chai, Supertest und die verbleibenden Abhängigkeiten wurden aktualisiert. Veraltete Komponenten wie Grunt, Protractor, Cucumber, Jenkins, Travis, Webpack/Babel sowie obsolet gewordene Market-Watcher- und Börsenintegrationen wurden entfernt. 43 Node-spezifische Unit-Test-Module wurden hinzugefügt, Live-Testnet-Fixtures aktualisiert und die Abdeckung für API, Sicherheit, Zeitplanung, Datenaufbereitung und Frontend-Utilities erweitert. Die `README.md` wurde mit aktuellen Leitfäden für Mitwirkende und KI-Agenten aktualisiert.

Die Validierung umfasste das Bestehen von ESLint- und Prettier-Prüfungen, einen Production-Build mit 6.337 transformierten Modulen, eine Unit-Test-Suite mit 226 Tests, eine Live-Testnet-API-Suite mit 41 Tests auf dem veröffentlichten Quellcode, ein Abhängigkeits-Audit mit 0 gemeldeten Schwachstellen sowie Browser-Smoke-Tests für 13 Routen bei Desktop-, Tablet- und Mobilauflösungen ohne Konsolenfehler oder horizontales Überlaufen.

### Breaking Changes

Node.js muss auf `^22.18.0 || >=24.11.0` aktualisiert werden. Die Bereitstellungskonfiguration sollte auf Basis der neuen `config.default.jsonc` erstellt werden, wobei `nodes_adm`, `trustedProxies`, `redis`, `geoLocation`, `exchangeRates` und `log_level` zu überprüfen sind. ADAMANT Node v0.10.2 oder neuer ist erforderlich; der Betrieb mehrerer, unabhängig voneinander laufender HTTPS-Nodes wird bevorzugt. Die entfernte Freegeoip-Integration sollte durch die optionale GeoJS-Konfiguration ersetzt werden; durch Deaktivierung der Geolokalisierung bleiben Peer- und Hostname-Daten ohne Karten oder Länderflaggen verfügbar. Externe Konsumenten entfernter Explorer-API-Routen sollten zu `adamant-api-jsclient` migrieren, und `GET /api/networkHealth` sollte für das betriebliche Monitoring verwendet werden. Der Same-Origin-Pfad `/osm-tiles/` muss in Reverse-Proxy- und Firewall-Regeln zugelassen werden. Das ignorierte `public/`-Bundle sollte während der Bereitstellung mit `npm run build` erstellt werden. Für die Entwicklung verwenden Sie `npm run dev` für den kombinierten Backend- und Vite-Stack oder `npm run dev:frontend` nur für Vite. Bestehende Explorer-Seitenrouten und Deep-Links bleiben kompatibel, und Redis wird empfohlen, ist aber für den Kern-HTTP- und statischen Betrieb nicht mehr erforderlich.
