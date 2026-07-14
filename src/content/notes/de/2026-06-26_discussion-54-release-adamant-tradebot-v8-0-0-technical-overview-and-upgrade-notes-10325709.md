---
title: "Release: adamant-tradebot v8.0.0 — technische Übersicht und Upgrade-Hinweise"
slug: "discussion-54-release-adamant-tradebot-v8-0-0-technical-overview-and-upgrade-notes-10325709"
description: "ADAMANT tradebot v8.0.0 ist jetzt im dev-Zweig verfügbar. Dieses Update verbessert Stabilität, Architektur und Austausch-Anbindung bei gleichbleibendem OSS-Umfang."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/54"
publishedAt: "2026-06-26T16:06:12Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10325709"
locale: "de"
placeholder: false
---

## Zusammenfassung

ADAMANT tradebot v8.0.0 ist jetzt im `dev`-Zweig veröffentlicht und als v8.0.0 gekennzeichnet. Dieses umfassende Update des Open-Source-(Basic)-Market-Making-Bots bringt die OSS-Codebasis mit der aktuellen Premium-Engineering-Basislinie in Einklang, behält dabei aber den OSS-Umfang bei: REST-zuerst, spot-fokussiert und ohne Wiedereinführung von Premium-exklusiven Modulen. Wenn Sie den Bot für ein gelistetes Token betreiben, ergibt sich daraus eine zuverlässigere Laufzeitumgebung mit sauberem Startverhalten, sichereren Upgrades bestehender Datenbanken, aktualisierten Börsen-Connectors und einer optionalen privaten WebUI-API für externe Clients.

## Architektur

Die Startsequenz in `app.js` ist nun explizit und geordnet. Sie wartet auf die MongoDB-Verbindung und `db.ready`, führt registrierte Datenbankmigrationen durch, initialisiert Dienste wie ADM-Socket/Polling und die optionale WebUI-API, bereitet die Connector-Metadaten vor und startet schließlich die aktiven `mm_*`-Handelsmodule. Dadurch werden Race Conditions beim kalten Start reduziert und Upgrades sicherer.

Der monolithische `modules/commandTxs.js` wurde in fokussierte Handler unter `modules/commands/` (account, orders, trade, info, features) aufgeteilt, zusammen mit gemeinsam genutztem Hilfscode. Befehle erreichen den Bot weiterhin über ADAMANT Messenger und Telegram, wo konfiguriert, aber der Codepfad ist nun leichter zu warten. Veraltete ADM-Eingangs-Module wurden ersetzt durch `adamantApi.js`, `admTxChecker.js` und `admTxParser.js`, wodurch die Befehlsverarbeitung mit `adamant-api` 3.x und aktuellen Socket-/Polling-Mustern übereinstimmt.

Datenbankmigrationen laufen einmalig beim Start über `modules/dbMigrations.js`. Die erste enthaltene Migration benennt das veraltete Auftragsfeld `type` sicher in `side` um. Bestehende Installationen sollten MongoDB vor dem ersten v8-Start sichern, danach offene Aufträge und Statistiken nach der Migration überprüfen.

## Optionale WebUI-API (Bot-API v1)

v8.0 enthält eine private HTTP-API im Verzeichnis `api/`. Sie nutzt einen Fastify-HTTP-Server mit JWT-Authentifizierung, Zod-Anfragevalidierung und Socket.IO für Transport-Hooks. Kernrouten unter `/api/v1` umfassen Funktionen für Bootstrap, Markt, Konto, Parameter, Befehle und Nachrichten. Die API ist optional und standardmäßig deaktiviert, konzipiert für selbstgehostete grafische Clients, während der Bot weiterhin die einzige Komponente bleibt, die mit den Börsen kommuniziert. Aktivieren Sie sie über die `private_webui`-Einstellungen in der Konfiguration. Legen Sie einen starken `private_webui_secret_key` fest, beschränken Sie `private_webui_allowed_ips` und belassen Sie die API im Internet, es sei denn, Sie wissen genau, was Sie tun.

## Börsen-Connectors

Unterstützte Connector im Basic-Modus umfassen Azbit, P2PB2B, StakeCube, Coinstore, FameEX (über den neuen FameEXnet-Connector) und NonKYC. Betreiber sollten auf brechende Änderungen achten: Die FameEX-API erfordert den Wechsel der Konfiguration zu FameEXnet, und XeggeX wurde aus der OSS-Version entfernt. Market-Making-Module wurden zusammen mit den Trader-Adaptern aktualisiert.

## Abhängigkeiten und Upgrade-Anleitung

Wesentliche Laufzeit-Updates umfassen `adamant-api` 3.x, `mongodb` 7 sowie die Hinzufügung von `zod`, `fast-jwt` und `json-parse-bigint`. Express wurde aus dem WebUI-Pfad entfernt. Um von v7.x aufzurüsten, stoppen Sie den Bot, ziehen Sie den neuesten Code und installieren Sie die Abhängigkeiten:

```bash
pm2 stop tradebot
cd adamant-tradebot
git pull
npm i
```

Stellen Sie sicher, dass Node.js 22.2+ installiert ist. Führen Sie neue Felder aus `config.default.jsonc` in Ihre `config.jsonc` ein, bestätigen Sie die FameEXnet-Connector-Einstellungen und sichern Sie Ihre MongoDB-Datenbank, damit Migrationen beim ersten Start ausgeführt werden können. Wenn die WebUI-API aktiviert ist, überprüfen Sie deren Sicherheitseinstellungen. Starten Sie den Bot abschließend mit Ihrem Prozessmanager neu. Benannte Konfigurationen funktionieren weiterhin wie erwartet.

## OSS-Umfangsgrenze

v8.0 bringt Premium-ähnliche Engineering-Qualität in den OSS-Baum, ohne Premium-exklusive Annahmen wieder einzuführen. Die Spot-, REST-zuerst-Basislinie bleibt erhalten, ohne zwingende WebSocket-Börsen-Connectors, ohne Perpetuals/Futures-Stack und ohne erweiterten Börsenkatalog.
