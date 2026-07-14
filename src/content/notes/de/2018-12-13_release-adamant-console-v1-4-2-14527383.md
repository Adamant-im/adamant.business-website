---
title: "ADAMANT Console v1.4.2"
slug: "release-adamant-console-v1-4-2-14527383"
description: "Diese Version des ADAMANT Console führt einen neuen get-blocks-Befehl ein und fügt mehrere JSON-RPC-Methoden hinzu: getBlocks, getTransactionsInBlockByHeight und getTransactionsInBlockById."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v1.4.2"
publishedAt: "2018-12-13T22:26:43Z"
author: "zyuhel"
authorUrl: "https://github.com/zyuhel"
repo: "adamant-console"
tag: "v1.4.2"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:14527383"
locale: "de"
placeholder: false
---

Diese Version des ADAMANT Console führt einen neuen `get blocks` Befehl ein und fügt mehrere JSON-RPC-Methoden hinzu: `getBlocks`, `getTransactionsInBlockByHeight` und `getTransactionsInBlockById`.

Mehrere Fehlerbehebungen sind enthalten. Die Version korrigiert das fehlerhafte Expandieren von `~` in Umgebungsvariablen auf einigen Ubuntu-Versionen. Sie behebt ein Problem, bei dem Standardparameter in benutzerdefinierten Konfigurationsdateien nicht überschrieben wurden. Zusätzlich wird ein Fehler behoben, bei dem `getTransactionsReceivedByAddress` Transaktionen mit Kommentaren übersprungen hat.
