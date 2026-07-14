---
title: "ADAMANT v4.11.0: Zuverlässiger, ausgereifter, professioneller"
slug: "adamant-v4-11-0-more-reliable-polished-mature-80c9b4c0a888"
description: "ADAMANT v4.11.0 umfasst 20 gemergte Pull Requests und 437 Commits mit Fokus auf Verbindungsstabilität, einheitliche Oberfläche, Wallet-Flows und Produktreife."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-v4-11-0-more-reliable-polished-mature-80c9b4c0a888"
publishedAt: "2026-03-20T16:23:57.256Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/80c9b4c0a888/001-1-4agtbybzbmpaqqrwpbaz5q-png.webp"
cardSpan: "full"
originalId: "medium:80c9b4c0a888"
locale: "de"
placeholder: false
---

ADAMANT v4.11.0 bündelt 20 gemergte Pull Requests und 437 Commits und legt den Schwerpunkt auf Verbindungsstabilität, Oberflächenkonsistenz, Wallet-Flows und die allgemeine Produktstabilität anstelle einer einzelnen herausragenden Funktion.

### Knotenresilienz und Netzwerkverhalten
Eine wesentliche Verbesserung dieser Version betrifft die Knotenstabilität. ADAMANT unterstützt nun alternative IP-Failover-Mechanismen für Knoten, falls der Domänenzugriff nicht möglich ist, ergänzt durch verbesserte Healthcheck-Lebenszyklen und Timeout-Handhabung. Die Wiederherstellung nach Geräteschlaf- oder Offline-Zuständen wurde optimiert, und die Statusmeldungen der Knoten wurden präzisiert, um falsche Synchronisierungssignale zu reduzieren. Dadurch werden bekannte Fehlerquellen unter instabilen Netzwerkbedingungen direkt adressiert und die Zuverlässigkeit des Messengers erhöht.

![ADAMANT v4.11.0: Zuverlässiger, ausgereifter, professioneller](/images/engineering-notes/medium/80c9b4c0a888/002-1-bnmyyew25hm84-zwmg0y0w-png.webp)

### Oberflächenmodernisierung
Die Version bringt umfassende visuelle Verbesserungen in Chats, Wallets, Überweisungsabläufen, Einstellungen, Dialogen und Navigation. Es wurden gemeinsame Design-Tokens eingeführt, engere Abstandsregeln, verbesserte Typografie, Layout-Primitiven sowie eine Bereinigung des Themas basierend auf CSS-Variablen umgesetzt. Erweiterte Layout-Regressionstests helfen, die UI-Qualität bei zukünftigen Updates zu bewahren.

### Verbesserungen des Chat-Erlebnisses
Auf der Messaging-Seite wurden Layouts im geöffneten Chat, Statusanzeige von Nachrichten, Wiederholungsindikatoren, Verhalten des Emoji-Pickers, Behandlung von Überläufen bei Antworten, Laden öffentlicher Schlüssel und Gruppierung von Nachrichten verbessert. Fehler wie veraltete Datumsaktualisierungen und Null-Scroll-Regressionen beim schnellen Wechsel zwischen Chats wurden behoben, was den täglichen Betrieb deutlich flüssiger macht.

![ADAMANT v4.11.0: Zuverlässiger, ausgereifter, professioneller](/images/engineering-notes/medium/80c9b4c0a888/003-1-mmpisulwbp1letrtngejyq-png.webp)

![ADAMANT v4.11.0: Zuverlässiger, ausgereifter, professioneller](/images/engineering-notes/medium/80c9b4c0a888/004-1-6kfadiesjlisjwmvg9o4ww-png.webp)

### Wallet- und Überweisungsabläufe
Die Finanz-Bildschirme erhielten deutliche Verbesserungen, darunter optimierte Wallet-Karten, Tabs, Kontostände und das Layout der Transaktionsliste. Die Aktualisierung behebt die Normalisierung von Selbstüberweisungsbeträgen für BTC, DOGE und DASH und stellt sicher, dass gespeicherte Wallet-Symbole beim Wiederherstellen konsistent bleiben, um den aktualisierten Zustand beizubehalten.

![ADAMANT v4.11.0: Zuverlässiger, ausgereifter, professioneller](/images/engineering-notes/medium/80c9b4c0a888/005-1-ia-qldhd8-vcndnkepcjdw-png.webp)

### Klayr-Unterstützung entfernt
Eine bemerkenswerte Entscheidung zum Produktumfang ist die vollständige Entfernung der Klayr-Unterstützung (KLY) in Wallets, Knoten, Transaktionen, Konfigurationen, Symbolen, Abfragen, Knoten-Clients, Speicherpfaden und zugehörigen UI-Komponenten. Die Bereinigung veralteter Pfade vereinfacht den Codebase und reduziert die Komplexität für die Nutzer.

### Toolchain und Dokumentation
Im Hintergrund wurde das Projekt von Node.js 20 auf 22 aktualisiert, auf ESLint 9 migriert und die Electron-Builds wurden angepasst, um universelle macOS-Unterstützung zu bieten. Erweiterte Playwright-Smoke- und Regression-Workflows verbessern die Testdisziplin. Die Dokumentation wurde ebenfalls aktualisiert, darunter klarere Anleitungen zum Self-Hosting in `README.md` und Leitlinien für den Einsatz von KI in `AGENTS.md`.
