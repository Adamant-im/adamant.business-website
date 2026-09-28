---
title: "ADAMANT Exchange Bot v3.0.0: Ein selbstgehosteter anonymer Krypto-Wechseldienst im ADAMANT Messenger"
slug: "we-just-released-a-new-anonymous-crypto-exchanger-inside-adamant-messenger-101f65fdb01f"
description: "ADAMANT Exchange Bot v3.0.0 verwandelt Chats in eine selbstgehostete Krypto-Börse mit verbesserter Sicherheit, modernisiertem Runtime-Stack und optimierter Bedienung."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/we-just-released-a-new-anonymous-crypto-exchanger-inside-adamant-messenger-101f65fdb01f"
publishedAt: "2026-09-27T13:54:25.207Z"
author: "Alex Web3"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:101f65fdb01f"
coverImage: "/images/engineering-notes/medium/101f65fdb01f/001-91e1d37743.webp"
locale: "de"
placeholder: false
---

ADAMANT Exchange Bot v3.0.0 verwandelt einen Chat in eine selbstgehostete, sofortige Krypto-Börse mit strengeren Sicherheitskontrollen für Gelder, einer modernisierten Laufzeitumgebung und einer reibungsloseren Erfahrung für Betreiber. Ein Krypto-Wechseldienst muss nicht zwangsläufig Konten, Dashboards, Browsersitzungen oder die Verwahrung durch Dritte erfordern. Mit dem ADAMANT Exchange Bot findet der Austausch direkt im ADAMANT Messenger statt: Ein Nutzer sendet ein Asset im Chat, gibt das gewünschte Ziel-Asset an, und der Bot erstellt ein Angebot, verifiziert die Transaktion und zahlt aus.

Dies ist eine umfassende Modernisierung der Exchange-Engine mit einem starken Fokus auf Sicherheit, Zuverlässigkeit und praxisnahe Bedienbarkeit für Betreiber.

### Was diesen Wechseldienst auszeichnet

Die meisten Exchange-Produkte basieren auf dem Web: Konten, Formulare, Sitzungen, Browser-Fingerprinting und eine große Angriffsfläche. Der ADAMANT Exchange Bot läuft stattdessen innerhalb von Messenger-Chats. Es gibt keine Weboberfläche, keine Nutzerregistrierung und keine im Produktfluss integrierte KYC-Prüfung. Der Betreiber führt den Bot auf eigener Infrastruktur aus und kontrolliert seine eigenen Hot Wallets.

Wechselanfragen erfolgen direkt im Chat, die Oberfläche ist einfach und vertraut, Betreiber behalten die Kontrolle über Infrastruktur und Gelder, und die Angriffsfläche ist im Vergleich zu herkömmlichen Web-Börsen drastisch kleiner. Für Communities, die Wert auf Privatsphäre, Einfachheit und Self-Hosting legen, ist dieses Modell äußerst sinnvoll.

### Neuerungen in v3.0.0

Für Nutzer ist der Bot nun fehlertoleranter und praktischer im Alltag. Ein `/cancel`-Befehl ermöglicht es Nutzern, einen ausstehenden Wechsel abzubrechen, während der Bot noch auf Klärung wartet, und eine automatische Rückerstattung abzüglich der Netzwerkgebühr zu erhalten. Die Handhabung abgebrochener oder unterbrochener Wechselvorgänge wurde ebenfalls verbessert, sodass veraltete Einzahlungen seltener zu Unklarheiten bei Nutzern und Betreibern führen.

Auf der Betreiberseite ist die Konfiguration strenger, die Startprüfungen sind klarer und die Ausfallsicherheit ist höher. Der Bot validiert seine Konfiguration aggressiver und bricht den Start sofort ab, wenn er eine Konfiguration erkennt, die nicht sicher betrieben werden kann. Zudem wird die Node-Konnektivität durch automatisches Failover über mehrere RPC- oder REST-Endpunkte robuster gehandhabt.

### Entwickelt für echte Gelder, nicht für Demo-Abläufe

Wenn Software Kryptowährungen bewegt, ist „funktioniert meistens“ nicht gut genug. Kleine Race Conditions oder unklare Regeln für die Transaktionszuordnung können zu echten Verlusten führen. Ein wesentlicher Teil von v3.0.0 betrifft die Sicherheit der Gelder.

Das Release führt ein defensiveres Modell zur Einzahlungsverfolgung und Anspruchsprüfung ein, einschließlich Mempool-basierter Überwachung und Streitbeilegung. Das Sperren pro UTXO für Bitcoin-ähnliche Chains verhindert gleichzeitige Ausgaben, und die Serialisierung von Anfragen pro Absender eliminiert Race Conditions auf Chat-Ebene bei Wechsel- und Stornierungsanfragen. Für Dash unterstützt der Bot nun InstantSend, was eine schnellere Erkennung berechtigter Übertragungen ermöglicht. Explizitere Schutzmaßnahmen für Szenarien mit nicht unterstützten Coins und Ausfälle auf Transportebene führen dazu, dass das System kontrollierter und nachvollziehbarer reagiert.

### Ein modernisiertes technisches Fundament

v3.0.0 ist ein bedeutendes Technologie-Update. Das Projekt wurde auf eine aktuelle Node.js-Basis umgestellt und wichtige Blockchain- sowie Infrastruktur-Bibliotheken wurden aktualisiert: Node.js 22.13+, ethers v6 für Ethereum- und ERC-20-Handhabung, bitcoinjs-lib v7 mit PSBT für die Transaktionserstellung bei Bitcoin, Dash und Dogecoin, MongoDB Driver 7 sowie adamant-api 3.x. Linting, Formatierung und Test-Tools wurden ebenfalls modernisiert. Veraltete Komponenten, die nicht mehr zur Ausrichtung des Projekts passten, einschließlich des alten Lisk-Supports, wurden entfernt.

Dies ist wichtig, da langlebige Krypto-Infrastruktur ein Fundament benötigt, das Entwickler warten, prüfen und erweitern können, ohne jahrelange technische Schulden mitzuschleppen.

### Unterstützte Assets und Wechselvorgang

Der ADAMANT Exchange Bot unterstützt Wechsel mit ADM, BTC, ETH, DASH, DOGE, USDT, USDC, DAI und ERC-20-Token.

Der Wechselvorgang ist bewusst unkompliziert: Der Nutzer interagiert mit dem Bot im ADAMANT Messenger, sendet das Quell-Asset, gibt das Ziel-Asset an, und der Bot verarbeitet den Rest – Angebot, Validierung, Bestätigungsverfolgung, Auszahlung oder Rückerstattung, falls etwas einen sicheren Abschluss verhindert. Diese Einfachheit an der Oberfläche wird durch eine modulare Verarbeitungspipeline im Hintergrund gestützt: Nachrichten-Parsing, Angebotserstellung, tiefe Blockchain-Validierung, Bestätigungsverfolgung, Auszahlungsmanagement, Rückerstattungslogik und abschließende Abwicklungsprüfungen.

### Besser getestet, besser dokumentiert

v3.0.0 wird mit einer wesentlich erweiterten automatisierten Test-Suite ausgeliefert, die die Wechsel-Pipeline, Krypto-Adapter, Konfigurationsvalidierung und Hilfslogik abdeckt. Das Projekt umfasst nun Hunderte von Unit-Tests in Dutzenden Test-Suites, ohne Abhängigkeit von Live-Blockchains oder einer echten Datenbank während der Testläufe. Dokumentation und Anleitungen für Mitwirkende wurden ebenfalls aktualisiert, damit Betreiber und Entwickler das System schneller verstehen und sicherer damit arbeiten können.

Release: [https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0](https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0)
ADAMANT Messenger: [https://adamant.im](https://adamant.im)
