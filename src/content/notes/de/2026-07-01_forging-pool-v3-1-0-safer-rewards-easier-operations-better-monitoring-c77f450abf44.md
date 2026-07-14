---
title: "ADAMANT Forging Pool v3.1.0: Sicherere Belohnungen, einfachere Bedienung, besseres Monitoring"
slug: "forging-pool-v3-1-0-safer-rewards-easier-operations-better-monitoring-c77f450abf44"
description: "ADAMANT Forging Pool v3.1.0 ist ein empfohlenes Update für Poolbetreiber. Es verbessert die Belohnungsberechnung und Auszahlungszuverlässigkeit, stärkt die Buchhaltungslogik, modernisiert die Laufzeitumgebung und vereinfacht den Betrieb."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/forging-pool-v3-1-0-safer-rewards-easier-operations-better-monitoring-c77f450abf44"
publishedAt: "2026-07-01T18:03:33.378Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:c77f450abf44"
coverImage: "/images/engineering-notes/medium/c77f450abf44/001-5ca73690a5.webp"
locale: "de"
placeholder: false
---

ADAMANT Forging Pool v3.1.0 ist ein empfohlenes Update für Poolbetreiber. Es verbessert die Belohnungsberechnung und Auszahlungszuverlässigkeit, stärkt die Buchhaltungslogik, modernisiert die Laufzeitumgebung und vereinfacht den täglichen Betrieb.

### Warum diese Version wichtig ist

Die Hauptaufgabe eines Forging-Pools besteht darin, die Belohnungen für Wähler korrekt zu berechnen und sicher auszuzahlen. Genau darauf konzentriert sich v3.1.0. Die Abläufe zur Belohnungsberechnung und -auszahlung wurden überarbeitet und abgesichert, um Risiken durch Wiederholungen, teilweise Fehler und gespeicherte Belohnungswerte in Randfällen zu reduzieren. Ausstehende Belohnungen werden vor der Buchung der Auszahlung normalisiert, und der Fortschritt der Belohnungen pro Wähler wird nun sicherer verfolgt, sodass ein Absturz oder eine Wiederholung nicht versehentlich Belohnungsaktualisierungen dupliziert. Dadurch wird das Release besonders wichtig für Betreiber, denen die Korrektheit der Auszahlungen und eine langfristige Zuverlässigkeit am Herzen liegen.

### Was ist neu in v3.1.0

Die größte infrastrukturelle Änderung ist der Umstieg auf MongoDB-basierten Speicher, der Poolbetreibern eine robustere Speicherebene für Blöcke, Wähler, Transaktionen, Belohnungshistorie und Betriebsdaten bietet. Für bestehende Pools enthält v3.1.0 Werkzeuge zur Migration älterer LowDB-basierter Daten, sodass Betreiber ohne Verlust des historischen Belohnungsstatus aktualisieren können.

![Forging Pool v3.1.0: Sicherere Belohnungen, einfachere Bedienung, besseres Monitoring](/images/engineering-notes/medium/c77f450abf44/002-a7aa0fc331.webp)

Das Release bietet außerdem sicherere Verteilung und Buchung von Belohnungen, wiedergabesichere Verfolgung des Belohnungsfortschritts, verbesserte Protokolle für Auszahlungen und Blockverarbeitung, einen `/api/health`-Endpunkt für externes Monitoring, optionalen Support für verschlüsselte Delegaten-Passphrasen, `adm-pool` CLI-Befehle für encrypt, unlock, lock und status, Dashboard-Filterung nach Adresse oder Name, klarere Anzeige von Wählern/Delegaten in Tabellen, aktualisierte Dokumentation und eine Node.js 22.13.0+-Laufzeitumgebung als Basis.

### Bessere Sicherheit für Betreiber

Poolbetreiber können die Delegaten-Passphrase nun mit einem Operator-Passwort verschlüsseln. Dies ist optional, sodass bestehende Konfigurationen mit unverschlüsselten Passphrasen weiterhin unterstützt werden. Der neue Workflow bietet Betreibern jedoch einen sichereren Weg für den Produktivbetrieb. Mit verschlüsselten Passphrasen kann der Pool im gesperrten Zustand starten. Blocksynchronisation, Dashboard und öffentliche APIs bleiben verfügbar, während Auszahlungen und ADM-Benachrichtigungen pausiert bleiben, bis der Betreiber den Pool entsperrt. Dadurch kann sich ein Server neu starten oder wiederherstellen, ohne die Auszahlungsfunktion sofort freizugeben.

### Einfachere Bedienung und Überwachung

Das neue `adm-pool` CLI bietet Betreibern einfache Befehle für die sensibelsten Laufzeitaktionen:

```sh
npm run adm-pool encrypt
npm run adm-pool unlock
npm run adm-pool lock
npm run adm-pool status
```

Anstatt sensible Zustandsänderungen manuell in Konfigurationsdateien oder Prozessprotokollen vorzunehmen, erhalten Betreiber nun einen dedizierten Steuerungsworkflow. Der neue `/api/health`-Endpunkt liefert eine statusbasierte Momentaufnahme ohne Geheimnisse für Monitoring-Tools wie Zabbix, benutzerdefinierte Dashboards oder Uptime-Prüfungen. Zusammen mit MongoDB-Speicherung und klareren Protokollen wird der Pool dadurch im Laufe der Zeit einfacher zu überwachen, zu debuggen und zu warten.

### Empfohlenes Update

ADAMANT Forging Pool v3.1.0 wird allen Poolbetreibern empfohlen, insbesondere denen, die Produktionspools mit regelmäßigen Auszahlungen betreiben. Vor dem Update sollten Betreiber ihre Konfiguration und Belohnungshistorie sichern, die MongoDB-Einstellungen prüfen, die Migration auf einer Kopie der bestehenden Daten testen und nach der Migration die Auszahlungseinstellungen überprüfen.

Release: [https://github.com/Adamant-im/pool/releases/tag/v3.1.0](https://github.com/Adamant-im/pool/releases/tag/v3.1.0)
Repository: [https://github.com/Adamant-im/pool](https://github.com/Adamant-im/pool)
