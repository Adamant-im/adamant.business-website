---
title: "ADAMANT Tradebot v4.3.4"
slug: "release-adamant-tradebot-v4-3-4-50424674"
description: "Diese Version unterstützt nun die P2PB2B-Börse und entfernt Atomars. Der Bot lädt Dezimalstellen und Handelspaare direkt von Börsen…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v4.3.4"
publishedAt: "2021-09-28T20:06:30Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v4.3.4"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:50424674"
locale: "de"
placeholder: false
---

Diese Version unterstützt nun die Börse P2PB2B und entfernt die Börse Atomars. Der Bot lädt Dezimalstellen und Handelspaar-Informationen nun, wenn möglich, direkt von den Börsen, wodurch die Zuverlässigkeit bei der Auftragserteilung und der Kontostandsberechnung verbessert wird.

Die Abhängigkeiten wurden aktualisiert, einschließlich der Übernahme der ADAMANT JS API v1.1.0. Die Befehle wurden aktualisiert, und ESLint wurde dem Projekt hinzugefügt, begleitet von einer allgemeinen Code-Refaktorisierung.

Benachrichtigungen können nun an mehrere Adressen gesendet werden. Kontostände und Aufträge werden separat für jeden Absender gespeichert, was eine sauberere Zustandsverwaltung bei mehreren Nutzern gewährleistet.
