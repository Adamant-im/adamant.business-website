---
title: "ADAMANT ETH Transactions Storage v2.1"
slug: "release-eth-transactions-storage-v2-1-71343717"
description: "Diese Wartungsveröffentlichung für das ETH-Transaktionsspeicher-Tool reduziert die Anzahl der Anfragen an den Ethereum-Node und verbessert die Protokollierung."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.1"
publishedAt: "2022-07-06T08:00:44Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "ETH-transactions-storage"
tag: "v2.1"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:71343717"
locale: "de"
placeholder: false
---

Diese Wartungsveröffentlichung für das ETH-transactions-storage-Tool reduziert die Anzahl der Anfragen an den Ethereum-Node und fügt eine umfassendere Protokollierung im gesamten Anwendungscode hinzu. Außerdem werden die IPC-Verbindung zum Ethereum-Node sowie die Datenbankverbindung behoben, wodurch die Gesamtsystemzuverlässigkeit verbessert wird.

Eine neue Umgebungsvariable `LOG_FILE` wurde eingeführt, die es Betreibern ermöglicht, anzugeben, wohin die Protokollausgaben geschrieben werden sollen. Zwei Hilfsskripte sind nun enthalten: `ethtest.py` zum Testen der Verbindung zum Ethereum-Node und `pgtest.py` zum Testen der PostgreSQL-Datenbankverbindung. Diese Skripte vereinfachen die Diagnose von Verbindungsproblemen während der Bereitstellung.
