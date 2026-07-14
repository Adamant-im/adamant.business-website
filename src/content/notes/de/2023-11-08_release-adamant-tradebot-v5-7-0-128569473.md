---
title: "ADAMANT Tradebot v5.7.0"
slug: "release-adamant-tradebot-v5-7-0-128569473"
description: "Diese Version des ADAMANT Tradebot enthält Verbesserungen und Wartungsaktualisierungen, darunter bessere Zuverlässigkeit und dynamische Konfigurationsverwaltung."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v5.7.0"
publishedAt: "2023-11-08T16:48:40Z"
author: "just-software-dev"
authorUrl: "https://github.com/just-software-dev"
repo: "adamant-tradebot"
tag: "v5.7.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:128569473"
locale: "de"
placeholder: false
---

Diese Version des ADAMANT Tradebot enthält mehrere Verbesserungen und Wartungsaktualisierungen. Market-Making-Orders werden nun nach der Platzierung gelöscht, und der Price Watcher wurde für eine bessere Zuverlässigkeit verbessert. Der Bot überwacht jetzt externe Änderungen an der Handelskonfigurationsdatei, wodurch eine dynamischere Konfigurationsverwaltung ohne Neustart möglich ist. Das Logging wurde verbessert, um eine bessere Beobachtbarkeit während des Betriebs zu ermöglichen. Abhängigkeiten wurden auf die neuesten kompatiblen Versionen aktualisiert, Lint-Regeln wurden hinzugefügt, um die Codequalität zu verbessern, und mehrere kleinere Fehler wurden behoben.

### Breaking changes

Falls Sie noch eine `config.json`-Datei verwenden, benennen Sie diese in `config.jsonc` um.
