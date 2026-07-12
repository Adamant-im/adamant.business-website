---
title: Logiciels de trading
description: Automatisation CEX/DEX, outils de trésorerie et pipelines de données de marché — logiciels de trading auto-hébergés sans promesses de profit.
cta: Je veux un logiciel de trading
layoutStyle: split
proofLinks:
  - label: adamant-tradebot
    url: https://github.com/Adamant-im/adamant-tradebot
  - label: marketmaking.app
    url: https://marketmaking.app
---

Le logiciel de trading est jugé au pire moment : une API d'exchange se dégrade, un websocket tombe silencieusement, un fill partiel arrive en plein redémarrage. Nous construisons des systèmes pour ces moments — auto-hébergés, observables et sous le contrôle de votre équipe dès le premier commit.

## Ce qu'une construction typique inclut

- **Connectivité exchange** — connecteurs REST et websocket pour les CEX et DEX que vous utilisez, avec reconnexion, gestion de la dérive d'horloge et budgets de rate-limit par venue
- **Moteur d'ordres** — suivi du cycle de vie des ordres qui survit aux redémarrages : chaque ordre est réconcilié avec l'exchange, jamais supposé
- **Garde-fous de risque** — plafonds de position stricts, limites notionnelles, kill switches et contrôles de cohérence entre le code de stratégie et l'exchange
- **Pipeline de données de marché** — trades, carnets d'ordres et bougies normalisés entre venues, stockés là où vos analystes peuvent les interroger
- **Vue opérationnelle** — tableaux de bord et alertes, pour qu'un humain sache toujours ce que fait le système et puisse l'arrêter en une action

## Market making, spécifiquement

Une décennie d'exploitation de notre propre logiciel de market making a alimenté [adamant-tradebot](https://github.com/Adamant-im/adamant-tradebot) — logiciel spécialisé de market making et de trading avec une édition open source gratuite, et une expérience premium hébergée sur [marketmaking.app](https://marketmaking.app). Pour les équipes qui en ont besoin sur leur propre matériel — paires personnalisées, venues personnalisées, règles de risque personnalisées — nous adaptons des déploiements auto-hébergés du même moteur.

## Outils de trésorerie et d'exécution

Tout n'est pas une stratégie. Fonds et entreprises produit viennent à nous pour la couche ingrate : rééquilibrage entre venues, exécution TWAP de grandes positions, batching de paiements et reporting réconcilié au satoshi. C'est là que l'automatisation se rentabilise le plus vite.

## Ce que nous vous dirons d'emblée

- Nous ne promettons pas de profits, de signaux ou d'« APY garanti » — quiconque le fait vous vend du risque
- Nous ne générons pas de volume factice ni d'activité de marché artificielle
- Nous ne détenons pas les fonds ; les clés vivent dans votre environnement, limitées au minimum de permissions
- La colocation HFT à faible latence est une autre industrie — nous construisons une automatisation robuste, pas une course aux nanosecondes

Vous obtenez le logiciel, le code source, la documentation et un partenaire d'ingénierie qui le maintient. La stratégie et la responsabilité restent les vôtres.
