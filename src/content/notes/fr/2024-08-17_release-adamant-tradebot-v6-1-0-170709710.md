---
title: "ADAMANT Tradebot v6.1.0"
slug: "release-adamant-tradebot-v6-1-0-170709710"
description: "Cette version apporte des améliorations au Price Watcher et renforce la fiabilité générale. Les modules vérifient désormais la validité des prix avant de continuer."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.1.0"
publishedAt: "2024-08-17T09:45:28Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v6.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:170709710"
locale: "fr"
placeholder: false
---

Cette version apporte des améliorations au Price Watcher ainsi que des renforcements généraux de la fiabilité. Les modules vérifient désormais si le prix d'un jeton est actuel avant de poursuivre, ce qui permet d'éviter que des données obsolètes ou incorrectes n'affectent les décisions de trading. Des travaux de refactoring supplémentaires ont été effectués pour améliorer la stabilité globale.

De nouveaux paramètres `dev` et `clear_db` ont été ajoutés, offrant aux opérateurs un meilleur contrôle sur les flux de travail de développement et de gestion de base de données. Les dépendances ont été mises à jour vers leurs dernières versions compatibles, et plusieurs bogues mineurs ont été corrigés. Des tests manuels ont été ajoutés pour compléter la couverture de tests existante, et le README a été mis à jour avec le nouveau lien du site web ainsi que des guides d'installation et d'utilisation actualisés.
