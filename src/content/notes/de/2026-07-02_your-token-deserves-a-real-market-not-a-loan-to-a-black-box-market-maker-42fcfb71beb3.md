---
title: "Selbstgehostetes Market Making für an CEX notierte Tokens mit ADAMANT v9.0.0"
slug: "your-token-deserves-a-real-market-not-a-loan-to-a-black-box-market-maker-42fcfb71beb3"
description: "Nach einem CEX-Listing leiden viele Token unter dünnem Orderbuch und hohen Spreads. ADAMANT v9.0.0 ermöglicht selbstgehostetes Market Making – ohne Git, ohne Custody-Abgabe."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/your-token-deserves-a-real-market-not-a-loan-to-a-black-box-market-maker-42fcfb71beb3"
publishedAt: "2026-07-02T07:55:48.528Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/42fcfb71beb3/001-1-abbad98f8omjn6vedmkhag-png.webp"
cardSpan: "full"
originalId: "medium:42fcfb71beb3"
locale: "de"
placeholder: false
---

Nach einem CEX-Listing stehen Token-Emittenten oft vor einem dünnen Orderbuch, weiten Spreads und einem Chart, der kleine Trades bestraft. Die übliche Lösung ist, Tokens zu verleihen und API-Schlüssel mit einem externen Market Maker zu teilen, der auf intransparenter Infrastruktur läuft. Die ADAMANT Market-Making-Software v9.0.0 bietet eine Alternative: einen selbstgehosteten, selbstkontrollierten Market-Making-Stack, den Sie wie normale Software installieren – kein git clone erforderlich, keine Übergabe der Verwahrung.

### Das Modell: selbstgehostet, selbstkontrolliert

Traditionelles Market Making beinhaltet typischerweise, Tokens an eine dritte Partei zu senden, API-Schlüssel mit einer Blackbox zu teilen und zu hoffen, dass das Orderbuch gesund aussieht – und dass man seine Assets zurückbekommt. ADAMANT kehrt dieses Modell um, indem Sie den Market-Making-Stack auf Ihrem eigenen Server mit Ihrem eigenen Exchange-Konto und Ihren eigenen Schlüsseln betreiben.

![Ihr Token verdient einen echten Markt – nicht ein Darlehen an einen Black-Box-Market-Maker](/images/engineering-notes/medium/42fcfb71beb3/002-1-ej9ccmio-dhslxvzftc6xw-png.webp)

Vergleich zwischen Custody-MM und ADAMANTs Market-Making-Software

### Was v9 für Ihren Chart bewirkt

Die kostenlose Open-Source-Edition konzentriert sich auf die Probleme, die unmittelbar nach einem Listing relevant sind. Sie baut das Orderbuch auf, indem sie Lücken schließt, sodass das Buch nicht verlassen wirkt, hält engere Bid/Ask-Spreads aufrecht, um einen toxischen ersten Eindruck zu vermeiden, und schafft Tiefe, sodass kleine Trades den Preis nicht abrupt verändern. Sie überwacht von Ihnen definierte Preisspannen und wendet Volumenrichtlinien in den Modi Spread, Orderbuch, Tiefe und optimal an. Die Überwachung ist transparent – Kontostände, Orders und Statistiken sind über Befehle über ADAMANT Messenger abrufbar, standardmäßig wird kein öffentliches Admin-Panel freigegeben.

Unterstützte CEX-Connectors im OSS-Build umfassen Azbit, P2PB2B, StakeCube, Coinstore, FameEX und NonKYC. Für zusätzliche Börsen sind Premium- und Custom-Connector verfügbar.

### Erste Schritte (npm-Pfad)

Sie benötigen einen Linux-Server oder Mac (oder jede Maschine mit npm), Node.js 22+, MongoDB und einen CEX-API-Schlüssel für Ihr eigenes Konto.

![Ihr Token verdient einen echten Markt – nicht ein Darlehen an einen Black-Box-Market-Maker](/images/engineering-notes/medium/42fcfb71beb3/003-1-duiackkmcteg8he9ccmqdq-png.webp)

Offizielles npm-Registry

Installieren Sie das Paket global und erstellen Sie ein Arbeitsverzeichnis:

```bash
npm install -g adamant-tradebot
mkdir my-mm && cd my-mm
```

Der CLI-Befehl lautet `mm`. Konfigurieren Sie den Bot mit einem interaktiven Assistenten und führen Sie anschließend eine Gesundheitsprüfung durch:

```bash
mm init    # interactive wizard - exchange, pair, API keys
mm doctor  # checks config, MongoDB, exchange API
```

Keine Tokens verlassen Ihren Exchange, um einen Market Maker zu finanzieren. Sie verbinden lediglich Ihre API-Anmeldedaten mit Ihrem Bot auf Ihrer eigenen Maschine. Starten und prüfen Sie den Status:

```bash
mm on
mm status
```

Senden Sie `/balances` an Ihren Bot von Ihrem ADM-Admin-Konto aus, und Sie sind live. Beenden Sie jederzeit mit `mm off` und lesen Sie die Logs mit `mm logs`.

### Docker-Alternative

Sie können das veröffentlichte Image auch aus dem GitHub Container Registry ziehen:

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

MongoDB läuft in Compose zusammen mit der App, wobei Konfiguration und Logs in lokalen Volumes gespeichert werden, die Sie kontrollieren.

### Warum v9 ein Meilenstein ist

Vor v9 bedeutete der Einstieg, ein Repository zu klonen und Abhängigkeiten selbst zu verbinden – akzeptabel für Entwickler, aber hinderlich für Gründer, die einfach ein gesünderes Orderbuch wollen. v9.0.0 bietet nun eine ordnungsgemäße Distribution über npm und GHCR, eine `mm`-CLI mit `init`, `on`, `off`, `doctor`, `status`, `logs` und `config`-Befehlen, CI-Publishing für npm und Docker bei jedem GitHub Release, eine überarbeitete Engine für Trader, Orderbuch-Builder, Liquiditätsanbieter und Preisüberwachung sowie Jest-Test-Suiten und Dokumentation.

ADAMANT ist ein Open-Source-Crypto-Projekt mit einem Jahrzehnt öffentlicher Entwicklung.

### Für wen das gedacht ist

Diese Software richtet sich an Token-Emittenten nach einem CEX-Listing mit schwachem oder leerem Orderbuch, Teams, die keine sechsstelligen Honorare plus Token-Darlehen leisten können, Gründer, die es nicht wollen, ihre Schlüssel an intransparente Dritte zu geben, und Projekte, die Transparenz wünschen – die Möglichkeit, den Code zu lesen, die Logs zu überwachen und den Kill-Switch zu besitzen. Premium-Module existieren für fortgeschrittene Strategien, eine Web-Oberfläche, zusätzliche Börsen oder manuelle Einrichtung. Die kostenlose OSS-Version ist bewusst bereits eigenständig nützlich.

### Hinweis zur Verantwortung

Market Making muss den Regeln der Börse und geltendem Recht folgen. ADAMANT stellt Software bereit, nicht Verwahrung oder Ausführung im Namen des Nutzers. Sie konfigurieren sie, führen sie aus und bleiben für die Nutzung verantwortlich.
