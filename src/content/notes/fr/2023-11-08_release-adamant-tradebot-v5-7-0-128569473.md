---
title: "ADAMANT Tradebot v5.7.0"
slug: "release-adamant-tradebot-v5-7-0-128569473"
description: "Cette version du ADAMANT Tradebot apporte plusieurs améliorations et mises à jour de maintenance. Les ordres de market making sont désormais effacés après leur création, et le Price Watcher a été amélioré pour plus de fiabilité."
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
locale: "fr"
placeholder: false
---

Cette version du ADAMANT Tradebot apporte plusieurs améliorations et mises à jour de maintenance. Les ordres de market making sont désormais effacés après leur création, et le Price Watcher a été amélioré pour plus de fiabilité. Le bot surveille désormais les modifications externes du fichier de configuration commerciale, permettant une gestion de configuration plus dynamique sans redémarrage. La journalisation a été améliorée pour une meilleure observabilité pendant le fonctionnement. Les dépendances ont été mises à jour vers leurs dernières versions compatibles, des règles de linter ont été ajoutées pour améliorer la qualité du code, et plusieurs corrections mineures ont été appliquées.

### Changements incompatibles

Si vous utilisez encore un fichier `config.json`, renommez-le en `config.jsonc`.
