---
title: "ADAMANT Console v3.1.0: Entwicklernotizen zur Unterstützung von Node v0.10.0"
slug: "discussion-57-adamant-console-v3-1-0-developer-notes-for-node-v0-10-0-support-10337345"
description: "ADAMANT Console v3.1.0 unterstützt ADAMANT Node v0.10.0 und verbessert die Entwicklungsoberfläche für CLI, JSON-RPC und lokale JavaScript-Integrationen."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/57"
publishedAt: "2026-06-29T08:48:18Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10337345"
locale: "de"
placeholder: false
---

ADAMANT Console v3.1.0 führt die Unterstützung für ADAMANT Node v0.10.0 ein und aktualisiert die Entwicklungsoberfläche für CLI, JSON-RPC und lokale JavaScript-Integrationen. Dieses Release richtet sich hauptsächlich an Entwickler und Betreiber, die Console als lokales Signierungstool, Skript-CLI oder leichtgewichtige JSON-RPC-Schnittstelle zu ADAMANT-Knoten verwenden.

Console verwendet nun `adamant-api` v3 und ist auf das Antwort- und Abfrageverhalten von ADAMANT Node v0.10.0 abgestimmt. Die unterstützte Laufzeitumgebung ist Node.js 22.13.0 oder neuer. CLI-, JSON-RPC- und JavaScript-Wrapper-Methoden wurden einheitlich an das Verhalten von Console angepasst. Ein neuer `node status`-Befehl und dessen Wrapper bieten Unterstützung für den Knotenstatus, während Chat-Hilfsfunktionen erweitert wurden, um Chat-Räume, Chat-Nachrichten und veraltete Chat-Transaktionen abzudecken. Transaktionsabfragen leiten nun v0.10-Abfrageoptionen wie `returnUnconfirmed` weiter, und Delegatensuchen akzeptieren einen Benutzernamen, einen öffentlichen Schlüssel oder eine ADAMANT-Adresse. Für Direktüberweisungs-Chatfilter bevorzugt die API nun `includeDirectTransfers`, wobei der ältere Eingabeparameter `withoutDirectTransfers` aus Gründen der Abwärtskompatibilität weiterhin normalisiert wird. Öffentliche Wrapper enthalten nun JSDoc und generierte API-Referenzseiten, und das npm-Paket wird mit Herkunftsnachweis über GitHub Actions OIDC und npm Trusted Publishing veröffentlicht.

Zum globalen Installieren oder Aktualisieren verwenden Sie npm:

```sh
npm install -g adamant-console
```

Das Paket stellt die `adm`-Binärdatei für gängige Operationen bereit:

```sh
adm client version
adm node status
adm get transaction 123456789 returnUnconfirmed=1
adm get chats U123456789 includeDirectTransfers=1
```

Beim Aktualisieren sollten Dienste, die Console über JSON-RPC nutzen, die erweiterte Methodenfläche und die Antwortverarbeitung überprüfen. Code, der Transaktions- oder Chat-Antworten verarbeitet, sollte anhand der v0.10.0-Felder getestet werden, auf die er angewiesen ist, insbesondere unbestätigte Transaktionsdaten, die Einbeziehung von Chat-Direktüberweisungen und `timestampMs`. Für neue JavaScript-Dienste wird empfohlen, `adamant-api` direkt zu verwenden, um eine vollständige Protokollabdeckung zu gewährleisten, und `adamant-console`-Wrapper nur dann einzusetzen, wenn Console-kompatibles CLI/RPC-Verhalten oder lokale Betriebsskripte erforderlich sind.
