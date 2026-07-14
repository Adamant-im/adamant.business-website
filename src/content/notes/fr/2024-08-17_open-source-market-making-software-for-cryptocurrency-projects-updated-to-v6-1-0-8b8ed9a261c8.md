---
title: "ADAMANT Market-making Software Updated to v6.1.0"
slug: "open-source-market-making-software-for-cryptocurrency-projects-updated-to-v6-1-0-8b8ed9a261c8"
description: "Le logiciel open source de market making d'ADAMANT, version 6.1.0, améliore la stabilité, la vérification des prix et les outils de développement."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-market-making-software-for-cryptocurrency-projects-updated-to-v6-1-0-8b8ed9a261c8"
publishedAt: "2024-08-17T10:04:57.129Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/8b8ed9a261c8/001-0-3n-a6wrdfj1fhgin.webp"
cardSpan: "full"
originalId: "medium:8b8ed9a261c8"
locale: "fr"
placeholder: false
---

L'application open source de market making d'ADAMANT est un outil auto-hébergé destiné aux projets de cryptomonnaies et aux exchanges, conçu pour générer du volume commercial, maintenir l'écart et la liquidité, et construire un carnet d'ordres dynamique. La version de base est gratuite, avec des fonctionnalités avancées disponibles sous forme de modules payants. Le projet a récemment publié la version 6.1.0, apportant plusieurs améliorations fonctionnelles et en stabilité.

![Logiciel open source de market making pour projets de cryptomonnaies mis à jour vers la v6.1.0](/images/engineering-notes/medium/8b8ed9a261c8/002-0-1vbp44c85yvdelg.webp)

Une mise à jour clé de cette version concerne l'amélioration du module Price Watcher. Il inclut désormais un mécanisme permettant de vérifier si le prix d'un jeton est à jour, ce qui aide à éviter des décisions de market making basées sur des données obsolètes. La base de code a également fait l'objet d'une refonte importante afin d'améliorer la stabilité générale, les performances et la maintenabilité à mesure que les projets s'agrandissent.

De nouveaux paramètres `dev` et `clear_db` ont été introduits. Le paramètre `dev` simplifie les tests et le développement, tandis que `clear_db` offre un moyen rapide d'effacer la base de données, utile pour réinitialiser les environnements. Les dépendances ont été mises à jour afin d'assurer la compatibilité avec les dernières bibliothèques, améliorant ainsi la sécurité et les performances.

D'autres améliorations incluent des corrections mineures de bogues, l'intégration de nouveaux tests manuels pour vérifier les installations avant le déploiement, ainsi qu'une refonte du README avec des guides d'installation et d'utilisation mis à jour. La version et le journal des modifications sont disponibles sur le dépôt GitHub d'ADAMANT.
