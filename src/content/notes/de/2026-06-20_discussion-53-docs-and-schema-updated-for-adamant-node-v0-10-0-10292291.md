---
title: "Dokumentation und Schema für ADAMANT Node v0.10.0 aktualisiert"
slug: "discussion-53-docs-and-schema-updated-for-adamant-node-v0-10-0-10292291"
description: "Zusammen mit ADAMANT Node v0.10.0 wurden die Entwicklerdokumentation, das API-Schema und die Testumgebung aktualisiert und auf den neuesten Stand gebracht."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/53"
publishedAt: "2026-06-20T18:25:34Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:10292291"
locale: "de"
placeholder: false
---

Zusammen mit **ADAMANT Node v0.10.0** wurde der stackseitige Entwicklerbereich aktualisiert, um mit dem Node synchron zu bleiben: Die API-Spezifikation (`adamant-schema`) und die Dokumentation (`adamant-docs`) wurden beide aktualisiert, ebenso wie ein lokales Netzwerk und ein frisch neu gestartetes Testnetz. Hier ist eine kurze Übersicht für alle, die auf ADAMANT aufbauen.

## adamant-schema (API-Spezifikation)

Die Spezifikation wurde von **OpenAPI 3.0.3 → 3.2.0** aktualisiert, die Version ist nun auf `0.10.0` gesetzt und wurde anhand des Live-Nodes überprüft. Transaktionen unterstützen nun **`timestampMs`**, wodurch Zeitstempel mit Millisekundengenauigkeit zusätzlich zum bisherigen sekundengenauen `timestamp` bereitgestellt werden. Die Antwort zur Knotenstatusabfrage ist nun umfangreicher und enthält **`nodeTimestampMs`**, **`unixTimestampMs`** sowie ein **`loader`**-Objekt, das `syncing`, `consensus`, `blocks` und `blocksCount` offenlegt.

Ein neuer **`GET /peers/get`**-Endpunkt ermöglicht die Abfrage eines Peers anhand von IP und Port. Neue Abfrageparameter **`returnUnconfirmed`** und **`includeDirectTransfers`** ersetzen das veraltete `withoutDirectTransfers`. Testnet-Knoten wurden der Serverliste hinzugefügt.

Die interaktive Swagger UI unter [schema.adamant.im](https://schema.adamant.im) bietet nun eine Live-Suche für Operationen, Gesundheitschecks pro Knoten mit API-Versionskennzeichnung sowie die automatische Auswahl eines gesunden Mainnet-Knotens. Die Tooling-Umgebung wurde auf Node.js 22, TypeScript und Express 5 aktualisiert, mit einem neu generierten, typisierten Clientpfad für Nutzer.

## adamant-docs (Dokumentation)

Die API-Referenz wurde auf **v0.10.0** aktualisiert und ist in der Seitenleiste versionsgekennzeichnet, sodass Dokumentation und Netzwerk nie auseinanderlaufen. Neue Seiten behandeln **Konsens und Transaktionsvalidierung**, **Synchronisierung** sowie den **loader / node status**-Endpunkt. Die Semantik von **`timestampMs`** wird nun durchgängig dokumentiert, und die Dokumentation der **peers**-API wurde aktualisiert.

Die Anleitungen zum **eigenen Node betreiben** wurden erweitert und umfassen nun Installation (auch unter macOS), Konfiguration, Autostart, Bootstrap und Knotenwiederherstellung. Es gibt nun separate Seiten zum Betrieb eines **localnet** und zum Beitritt zum **testnet**.

## Localnet & Testnet

Ein **localnet** ermöglicht es, ein vollständiges ADAMANT-Netzwerk lokal aufzusetzen, um Entwicklung und Tests durchzuführen, ohne die öffentliche Infrastruktur zu beeinflussen. Das **Testnet** wurde neu gestartet und auf v0.10.0 ausgerichtet, sodass Integrationen unter realen Netzwerkbedingungen vor dem Mainnet getestet werden können. Zusammen stellen diese Komponenten den Pfad **local → testnet → mainnet** sicher und vollständig dokumentiert dar.

## Verwandte Ressourcen

- API-Referenz: https://schema.adamant.im
- Dokumentation: https://docs.adamant.im
- Node-Quellcode: https://github.com/Adamant-im/adamant
- API-Spezifikations-Repo: https://github.com/Adamant-im/adamant-schema
- Dokumentations-Repo: https://github.com/Adamant-im/docs
- JS-Client: https://github.com/Adamant-im/adamant-api-jsclient
