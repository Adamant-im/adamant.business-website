---
title: "ADAMANT Tradebot v8.0.0"
slug: "release-adamant-tradebot-v8-0-0-345264629"
description: "ADAMANT Tradebot v8.0.0 ist ein wichtiges Update des Open-Source-Market-Making-Bots, das die Paketversion von 7.0.1 auf 8.0.0 erhöht. Der Startprozess wurde überarbeitet…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v8.0.0"
publishedAt: "2026-06-26T10:47:34Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v8.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:345264629"
locale: "de"
placeholder: false
---

ADAMANT Tradebot v8.0.0 ist ein wichtiges Update des Open-Source-Market-Making-Bots, bei dem die Paketversion von 7.0.1 auf 8.0.0 erhöht wurde.

Der Startprozess wurde überarbeitet, um Datenbankmigrationen und eine Startvorbereitung (Warmup) einzubeziehen. ADM-Befehlshandler sind nun modular unter `modules/commands/` organisiert, und eine neue ADM-Transaktionsverarbeitungspipeline wurde mit den Komponenten `adamantApi`, `admTxChecker` und `admTxParser` eingeführt.

Ein optionales WebUI-API wurde hinzugefügt, das auf Fastify HTTP mit JWT-Authentifizierung, Zod-Validierung und Socket.IO-Transport basiert. Es stellt Schnittstellen für Konto, Bot-Status, Befehle, Marktdata, Nachrichten und Handelsparameter bereit.

Die Exchange-Connectors wurden aktualisiert: XeggeX wurde entfernt, FameEX wurde zu FameEXnet migriert, und Azbit, P2PB2B, NonKYC, Coinstore und StakeCube wurden aktualisiert.

Die Laufzeitumgebung erfordert nun Node.js v22.2+, `adamant-api` 3.x und `mongodb` 7.x. Die Entwicklungswerkzeuge wurden auf ESLint 10 aktualisiert, die Jest-Test-Suiten erweitert und die JSDoc-Abdeckung im `types/`-Verzeichnis verbessert. Zur Dokumentation wurden `CONTRIBUTING.md` hinzugefügt sowie `README.md` und `config.default.jsonc` aktualisiert.

Zum Aktualisieren ziehen Sie den neuesten Code, installieren Sie die Abhängigkeiten, prüfen und führen Sie Ihre `config.jsonc` mit `config.default.jsonc` zusammen und starten Sie den Bot.

```bash
git pull
npm i
# Review and merge config.jsonc with config.default.jsonc
npm start
```

### Breaking changes

Node.js v22.2+ ist nun erforderlich, erhöht von der vorherigen Basis v18+. Eine Datenbankmigration benennt das Auftragsfeld `type` in `side` um. Änderungen am Konfigurationsschema erfordern die Prüfung von `config.default.jsonc` und das Zusammenführen der Aktualisierungen in bestehende Konfigurationen. XeggeX wurde entfernt, und FameEX-Nutzer müssen zum FameEXnet-Connector wechseln. Die Lizenzmetadaten wurden zu `UNLICENSED` mit `private: true` geändert.
