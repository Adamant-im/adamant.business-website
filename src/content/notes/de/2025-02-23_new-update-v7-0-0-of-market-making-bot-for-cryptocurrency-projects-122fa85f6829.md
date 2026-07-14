---
title: "Market-Making-Bot v7.0.0: Anfrage-Caching, neue Befehle und Datenbankkonfiguration"
slug: "new-update-v7-0-0-of-market-making-bot-for-cryptocurrency-projects-122fa85f6829"
description: "Der kostenlose, Open-Source-Market-Making-Bot von ADAMANT für Kryptoprojekte und Börsen erzeugt Handelsvolumen, hält Spread und Liquidität aufrecht und bildet dynamische Orderbücher."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-update-v7-0-0-of-market-making-bot-for-cryptocurrency-projects-122fa85f6829"
publishedAt: "2025-02-23T06:05:24.786Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/122fa85f6829/001-0-eevpacxefsrwodwf.webp"
cardSpan: "full"
originalId: "medium:122fa85f6829"
locale: "de"
placeholder: false
---

Der ADAMANT-Market-Making-Bot ist ein kostenloses, quelloffenes, selbstgehostetes Tool für Kryptowährungsprojekte und Börsen. Er erzeugt Handelsvolumen, hält Spread und Liquidität aufrecht, definiert Preisspannen und baut dynamische Orderbücher, die echten Marktbewegungen ähneln. Die Version 7.0.0 führt Anfrage-Caching, mehrere neue Befehle, Datenbankkonfiguration sowie eine Reihe von Fehlerbehebungen und Refactorings ein.

![Neues Update v7.0.0 des Market-Making-Bots für Kryptoprojekte](/images/engineering-notes/medium/122fa85f6829/002-0-vbzoksgzwcabzz-z.webp)

### Anfrage-Caching

Börsen-APIs beschränken die Anfragengeschwindigkeit, und während aktiven Market-Makings kann der Bot auf `429 Rate limit exceeded`-Fehler stoßen. Dies unterbricht den Handel und kann in einigen Fällen dazu führen, dass die Börse das Konto sperrt.

![Neues Update v7.0.0 des Market-Making-Bots für Kryptoprojekte](/images/engineering-notes/medium/122fa85f6829/003-0-sgbs6ithtx73pqm2.webp)

Die neue Caching-Funktion behebt dies, indem Abfragen für Salden, Orderbücher und offene Aufträge innerhalb eines kurzen Zeitintervalls von etwa ein bis zwei Sekunden zusammengefasst werden. Bisher ein kostenpflichtiges Modul, steht Caching nun allen Nutzern zur Verfügung.

### Neue Befehle

Der Befehl `/help` zeigt nun grundlegende Informationen über die Bot-Software und deren Konfiguration an. Zusätzlich wurden mehrere Befehle hinzugefügt, um den Zustand der Börse zu überprüfen und einzelne Aufträge zu verwalten:

`/orderbook [pair] [count]` gibt aktuelle Kauf- und Verkaufsangebote aus dem Orderbuch zurück.

![Neues Update v7.0.0 des Market-Making-Bots für Kryptoprojekte](/images/engineering-notes/medium/122fa85f6829/005-0-cu4bhsoehypr6ini.webp)

`/trades [pair] [count]` gibt die jüngsten Trades zurück.

![Neues Update v7.0.0 des Market-Making-Bots für Kryptoprojekte](/images/engineering-notes/medium/122fa85f6829/006-0-syt1bu8k15rurvv0.webp)

`/ticker [pair]` liefert Ticker-Daten im JSON-Format, ähnlich wie `/rates`.

![Neues Update v7.0.0 des Market-Making-Bots für Kryptoprojekte](/images/engineering-notes/medium/122fa85f6829/007-0-uvfrkvq-y40vijsu.webp)

`/order {orderId}` ruft Details eines bestimmten Auftrags anhand der ID ab.

![Neues Update v7.0.0 des Market-Making-Bots für Kryptoprojekte](/images/engineering-notes/medium/122fa85f6829/008-0-m50bnrxoc27z38oc.webp)

`/cancel {orderId}` storniert einen bestimmten Auftrag anhand der ID und gibt dessen Details zurück.

![Neues Update v7.0.0 des Market-Making-Bots für Kryptoprojekte](/images/engineering-notes/medium/122fa85f6829/009-0-um38pjzfvcanrry7.webp)

### Datenbankkonfiguration

Sie können nun Datenbankparameter in der Konfigurationsdatei festlegen, einschließlich des Datenbanknamens. Dadurch ist es möglich, mehrere Bot-Instanzen auf einem einzigen Server zu betreiben. Da der Handel erhebliche CPU- und RAM-Ressourcen verbrauchen kann, prüfen Sie die Systemlast, bevor Sie mehrere Instanzen gleichzeitig ausführen.

Zur Konfiguration der Datenbank bearbeiten Sie `config.jsonc` und passen die `db`-Parameter an:

![Neues Update v7.0.0 des Market-Making-Bots für Kryptoprojekte](/images/engineering-notes/medium/122fa85f6829/010-0-yfdntcpmwdyzvj8c.webp)

Diese Änderung ist abwärtskompatibel; wenn die Konfiguration nicht aktualisiert wird, verwendet der Bot standardmäßige Datenbankparameter.

### Connector-Verbesserungen und weitere Updates

Die Azbit- und P2B-Connectoren erhielten Korrekturen für `getOrderDetails()`, einschließlich Workarounds für Unzulänglichkeiten in den APIs beider Börsen. Die Module Command, Order book und Trader wurden refactored, und TypeScript-Typen wurden im Rahmen laufender Code-Qualitätsarbeiten hinzugefügt. Abhängigkeiten wurden aktualisiert, das Logging verbessert, und mehrere kleinere Fehler wurden behoben.

![Neues Update v7.0.0 des Market-Making-Bots für Kryptoprojekte](/images/engineering-notes/medium/122fa85f6829/011-0-la8ixtoq1x1d6nbm.webp)

Der Bot liefert weiterhin informative Benachrichtigungen, damit Betreiber die Handelsaktivitäten überwachen können.

![Neues Update v7.0.0 des Market-Making-Bots für Kryptoprojekte](/images/engineering-notes/medium/122fa85f6829/012-0-bb8s0ouz9vefnxus.webp)

Der Release und der vollständige Änderungsprotokoll sind auf GitHub verfügbar: [v7.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0).
