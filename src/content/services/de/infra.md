---
title: Wallets, Nodes & Infrastruktur
description: Node-Deployment, Explorer, APIs, Monitoring, Wallets und langfristige Wartung für produktive Krypto-Systeme.
cta: Ich möchte Krypto-Infrastruktur
layoutStyle: timeline
proofLinks:
  - label: ipfs-node
    url: https://github.com/Adamant-im/ipfs-node
  - label: currencyinfo
    url: https://github.com/Adamant-im/currencyinfo
---

Krypto-Infrastruktur fällt anders aus als gewöhnliche Web-Infrastruktur: Ein stehender Node bedeutet verpasste Einzahlungen, ein schlechtes Upgrade kann Sie vom Netzwerk abkoppeln, und „wir stellen aus dem Backup wieder her“ hat Konsequenzen, wenn Geld im Spiel ist. Wir betreiben diese Klasse von Systemen für unser eigenes Ökosystem — so läuft ein Infrastruktur-Engagement typischerweise ab.

## Phase 0 — Bewertung

Wir beginnen damit, zu lesen, was Sie haben: Chains, Wallets, Node-Versionen, Hosting, Backup-Story und der Ausfall, der Sie am meisten beunruhigt. Sie erhalten eine kurze schriftliche Bewertung mit konkreten Risiken und einer vorgeschlagenen Zielarchitektur — nützlich, auch wenn das Engagement dort endet.

## Phase 1 — Deployment

Nodes, Explorer, Indexer, Wallet-Backends und APIs auf Ihren Servern oder dedizierten Hosts, die Sie kontrollieren. Alles reproduzierbar: Konfiguration in einem Repository, dokumentiertes Bootstrap, keine Schneeflocken-Server, die nur ein Auftragnehmer versteht.

## Phase 2 — Observability

Bevor wir etwas „fertig“ nennen, meldet es sich selbst: Blockhöhen-Verzögerung, Peer-Anzahl, Festplattenreserve, API-Latenz, Wallet-Saldenschwellen. Alerts gehen an die Kanäle Ihres Teams — Telegram, ADAMANT, E-Mail — mit Runbooks für die üblichen Fälle.

## Phase 3 — Betrieb

Chain-Upgrades und Hard Forks nach Plan, Dependencies gepatcht, Kapazität geprüft. Wir bieten laufende Wartungsverträge oder übergeben sauber an Ihr Team mit Dokumentation und Schulung — selbst gehostet bedeutet, Sie sind nie eingesperrt.

## Gebaut aus Teilen, die wir selbst betreiben

[ipfs-node](https://github.com/Adamant-im/ipfs-node) ist unser verteilter Speicherknoten, eingesetzt, wo Dateien nicht auf eine Blockchain gehören. [currencyinfo](https://github.com/Adamant-im/currencyinfo) ist ein selbst gehosteter Krypto- und Fiat-Kursservice — die Art langweiliger, kritischer Abhängigkeit, auf die Produktionssysteme leise angewiesen sind. Beides ist Open Source, beides läuft heute in unserer eigenen Infrastruktur.

## Der Standard, den wir einhalten

Wir warten, was wir bauen. Das zählt, wenn Ihre Nodes, Wallets und APIs jahrelang online bleiben müssen — nicht nur in einem Pitch Deck gut aussehen.
