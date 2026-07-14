---
title: "ADAMANT Tradebot v2.10.6"
slug: "release-adamant-tradebot-v2-10-6-35700159"
description: "Diese Version verbessert Leistung und Stabilität des ADAMANT Tradebot. Die CPU-Nutzung wurde optimiert, API-Begrenzungen und verzögerte Anfragen wurden behoben."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v2.10.6"
publishedAt: "2020-12-24T13:13:19Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v2.10.6"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:35700159"
locale: "de"
placeholder: false
---

Diese Version steht im Zeichen von Leistungs- und Stabilitätsverbesserungen für den ADAMANT Tradebot. Die CPU-Nutzung wurde optimiert, und mehrere Probleme, die API-Grenzwerte sowie verzögerte Antwortzeiten betrafen, wurden behoben. Außerdem wurde die Paginierung der Bit-Z-Antworten korrigiert, um eine zuverlässige Datenabfrage von dieser Börse sicherzustellen.

Im Funktionsumfang liefern die Befehle `/balances`, `/orders`, `/rates` und `/stats` nun zusätzliche Informationen, um Betreibern eine effektivere Überwachung der Bot-Aktivitäten zu ermöglichen. Ein neues `orderUtils`-Modul wurde im Rahmen laufender Refactoring-Arbeiten eingeführt, und ein neuer Auftragstyp `man` wird nun für manuell platzierte Aufträge unterstützt. Die Benachrichtigungshäufigkeit wurde reduziert, um unnötige Warnungen zu minimieren. Abhängigkeiten wurden auf die neuesten kompatiblen Versionen aktualisiert.
