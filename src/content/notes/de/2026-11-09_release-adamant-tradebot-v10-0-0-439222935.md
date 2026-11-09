---
title: "ADAMANT Tradebot v10.0.0"
slug: "release-adamant-tradebot-v10-0-0-439222935"
description: "ADAMANT Market Making Software v10.0.0 ist ein Meilenstein mit architektonischer Reorganisation, Iterationssicherheit, Enterprise-Log-Management und rollenbasierter WebUI-API."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v10.0.0"
publishedAt: "2026-11-09T14:19:19Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-tradebot"
tag: "v10.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:439222935"
locale: "de"
placeholder: false
---

ADAMANT Market-Making Software v10.0.0 ist ein bedeutender Meilenstein, der eine architektonische Reorganisation, exklusive Iterationssicherheit, Enterprise-Log-Management, rollenbasierte WebUI-Management-APIs, einen neu geschriebenen Azbit-Connector, npm Trusted Publishing via OIDC sowie kryptografische Build-Provenienz für Docker-Container einführt.

## Installation

```bash
# Via npm
npm install -g adamant-tradebot
mm init
mm doctor
mm on

# Via Docker / GHCR
docker pull ghcr.io/adamant-im/adamant-tradebot:10.0.0
docker run -d --name adamant-tradebot ghcr.io/adamant-im/adamant-tradebot:10.0.0
```

## Lieferkettensicherheit & Trusted Publishing

Der npm-Publishing-Workflow wurde auf OIDC Trusted Publishing ohne persistente Repository-Secrets (`NPM_TOKEN`) umgestellt. Zudem wurde die verifizierte Provenienz mittels `publishConfig.provenance: true` aktiviert, womit das Issue #119 geschlossen wurde. Die GHCR-Build-Provenienz-Attestierung wurde unter Verwendung von `actions/attest-build-provenance@v2` mit Sigstore-Signierung für verifizierbare Container-Builds in GitHub Packages integriert. Manuelle Verifizierungs-Trigger wurden über `workflow_dispatch` zu den CI/CD-Publishing-Workflows hinzugefügt.

## Architektur & Laufzeit-Zuverlässigkeit

Die Modulstruktur wurde in eine klare Trennung überführt: `trade/features/` für Market-Making-Module, `trade/trader/` für Exchange-Connectors und `trade/settings/` für dynamische Parameterdateien. Durch `helpers/moduleIteration.js` (`runExclusiveIteration`) wurde eine exklusive Iterationssperre eingeführt, um gleichzeitige, überlappende Iterationen zu verhindern und eine zuverlässige Neuplanung aus `finally`-Blöcken zu gewährleisten.

Die Enterprise-Log-Rotation und ein schneller Log-Reader wurden in `helpers/logRotation.js` und `helpers/logReader.js` vollständig neu geschrieben. Sie unterstützen nun aktive und archivierte Lebenszyklen, strukturiertes Rückwärtslesen sowie paginierte Log-Abfragen. Die Laufzeit-Gesundheitsbewertung wurde durch `helpers/mmHealthEval.js`, `helpers/mmHealthState.js` und `helpers/mmRuntimeHealth.js` für eine Echtzeit-Überwachung des Market-Making-Status ergänzt. Die Nachverfolgung von Befehlsinitiatoren erfolgt nun über `helpers/commandInitiator.js`, was eine konsistente kontextbezogene Verfolgung über Messenger, WebUI-API und CLI-Aufrufe hinweg ermöglicht.

## Exchange-Connectors

Der Azbit-Connector wurde durch eine vollständige Neufassung von `trade/trader/trader_azbit.js` und `trade/api/azbit_api.js` grundlegend überarbeitet und unterstützt nun die REST-APIs v1 und v2, strikte Order-Präzision, Rate-Limiting sowie 137 Unit-Tests mit umfassenden API-Mocks. Die Präzision und Sicherheit der Connectors wurden für Coinstore, FameEXnet, NonKYC, P2PB2B und StakeCube standardisiert, einschließlich vereinheitlichter Fehlerbehandlung, Präzisionskürzung und Saldo-Vorvalidierung.

## WebUI REST & WebSocket API

Es wurde eine rollenbasierte Zugriffskontrolle mit Unterstützung für die Rollen `admin`, `manager` und `viewer` (schreibgeschützt) eingeführt, die strikte JWT-Validierung, TTL-Durchsetzung und IP-Zugriffsfilterung umfasst. Vollständige Bot-Management-Endpunkte für die dynamische Parameteranpassung (`PUT /api/v1/params`, `PUT /api/v1/params/strategy`), Bot-Lebenszyklen, Orders und Log-Abfragen wurden hinzugefügt. WebSocket-Streaming ermöglicht das Echtzeit-Abonnement von Ereignissen für Bot-Status, Trade-Logs und Markt-Ticker-Updates.

## Qualitätssicherung & Entwickler-Tools

Die Testabdeckung umfasst nun 576 automatisierte Tests in 33 Test-Suiten, die allgemeine Funktionen, API-WebUI, Features, Trader, Helper und Market-Making-Module abdecken. In `AGENTS.md` wurden Richtlinien für KI-Agenten hinzugefügt, um eine KI-gestützte Entwicklung unter Einhaltung von Sicherheitsinvarianten, Verzeichnisstrukturen und Testprotokollen zu gewährleisten. Die Typsicherheit wurde durch JSDoc `@typedef`-Definitionen und TypeScript-Prüfungen mittels `npm run typecheck:webui-api` verbessert.

### Breaking Changes

Diese Version erfordert Node.js in der Version 22.12.0 oder höher. Die interne Verzeichnisstruktur wurde geändert; Feature-Module und Connectors wurden nach `trade/features/` bzw. `trade/trader/` verschoben. Benutzerdefinierte Erweiterungen, die interne Pfade importieren, müssen entsprechend angepasst werden. Die WebUI-API erzwingt nun eine strikte JWT-Ablaufprüfung und Rollenautorisierung für alle privaten Endpunkte.
