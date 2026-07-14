---
title: "ADAMANT Tradebot v7.0.0"
slug: "release-adamant-tradebot-v7-0-0-201883296"
description: "Diese Version bringt Caching für Anfragen, neue Befehle wie /orderbook und /trades sowie Verbesserungen an Modulen, Typsicherheit und Logging."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0"
publishedAt: "2025-02-23T05:56:49Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v7.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:201883296"
locale: "de"
placeholder: false
---

Diese Version führt eine Caching-Funktion für Anfragen und mehrere neue Befehle zur Interaktion mit Börsen ein, darunter `/orderbook`, `/trades`, `/ticker`, `/order` und `/cancel`. Der Befehl `/help` wurde aktualisiert, um Informationen zur Bot-Software und ihrer Konfiguration zu enthalten.

Die Module Command, Order book und Trader wurden zur besseren Wartbarkeit überarbeitet. Eine neue Konfigurationsoption `database` wurde hinzugefügt, um diese Änderungen zu unterstützen. Die Funktion `getOrderDetails()` wurde in den Connectoren für Azbit und P2B behoben.

Abhängigkeiten wurden aktualisiert, und allgemeine Fehlerbehebungen sowie Verbesserungen wurden im gesamten Codebase vorgenommen. Das Logging wurde verbessert, und TypeScript-Typen wurden hinzugefügt, um die Typsicherheit und die Entwicklererfahrung zu erhöhen.
