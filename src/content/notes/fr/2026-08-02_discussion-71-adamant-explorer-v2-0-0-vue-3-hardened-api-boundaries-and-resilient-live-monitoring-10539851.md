---
title: "ADAMANT Explorer v2.0.0 : Vue 3, limites d'API renforcées et surveillance en direct résiliente"
slug: "discussion-71-adamant-explorer-v2-0-0-vue-3-hardened-api-boundaries-and-resilient-live-monitoring-10539851"
description: "ADAMANT Explorer v2.0.0 est la première version stable depuis la v1.3.0, consolidant 218 commits et 491 fichiers modifiés en une mise à jour majeure."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/71"
publishedAt: "2026-08-02T13:46:45Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10539851"
locale: "fr"
placeholder: false
---

ADAMANT Explorer v2.0.0 est la première version stable depuis la v1.3.0, consolidant 218 commits et 491 fichiers modifiés dans une mise à jour majeure du frontend, du backend, de la surveillance en direct, de la sécurité et des opérations, tout en préservant les routes publiques et les liens profonds existants.

## Architecture du frontend

L'application héritée AngularJS, Bootstrap 3 et Webpack a été remplacée par des composants Vue 3 à fichier unique, Pinia pour l'état réseau partagé, Vue Router 5 avec compatibilité d'URL, et Vite 8 pour la compilation. Les utilitaires indépendants du framework résident dans `src/lib/` et peuvent être testés directement dans Node.js.

Toutes les vues principales ont été reconstruites : accueil, blocs, transactions, adresses, délégués, Top Comptes, Portefeuilles réservés, Moniteur de délégués, Moniteur réseau et Graphique d'activité. L'interface utilisateur inclut désormais des thèmes clair et sombre persistants, des tableaux et cartes de transaction réactifs, des contrôles accessibles, un ordonnancement déterministe des transactions et une présentation ADM en précision totale lorsque la précision du registre est requise.

## Nœud ADAMANT et limite d'API

Toute interaction avec le nœud ADAMANT passe désormais par `adamant-api` 3.1.0 dans une couche d'adaptateur de requête dédiée. Le backend ajoute une gestion de la disponibilité au démarrage, le basculement de nœud, la normalisation des erreurs SDK, la pagination bornée, une validation stricte des routes et des requêtes, ainsi que des couches distinctes pour la requête, la normalisation et l'assemblage de la réponse.

L'Explorer n'expose que 12 routes d'origine unique nécessaires à son interface utilisateur, plus `GET /api/networkHealth`. Seize points de terminaison hérités non pris en charge, le passage arbitraire de filtres de transaction, le CORS générique et les routes obsolètes de Market Watcher ont été supprimés. Cette surface réduite constitue une limite d'implémentation pour l'interface de l'Explorer, et non une API publique à usage général. Les applications externes doivent utiliser `adamant-api-jsclient`. La surveillance opérationnelle peut utiliser `GET /api/networkHealth`, qui rapporte des états cohérents : `live`, `degraded`, `critical` ou `unavailable`.

## Surveillance en direct et cohérence du cache

Les quatre espaces de noms Socket.IO publics — Header, Delegate Monitor, Network Monitor et Activity Graph — utilisent désormais un polling sérialisé, des générations de cycle de vie, des tentatives bornées et une protection contre les rappels obsolètes. Les rafraîchissements pilotés par les blocs remplacent les délais de fraîcheur fixes pour les vues Accueil et Blocs. L'hydratation REST et les confirmations bornées complètent les notifications de blocs WebSocket. Les calculs de calendrier des délégués, d'état de forgeage, de récompenses, de frais et de limites de round sont désormais stables, avec des statistiques de blocs et de pairs cohérentes et une persistance Redis optionnelle. L'identité du cache gère correctement les nouveaux blocs et les remplacements de forks à la même hauteur.

La géolocalisation des pairs via GeoJS est limitée avec une normalisation en cache et une dégradation basée sur le nom d'hôte uniquement. Un proxy de tuiles OpenStreetMap validé, mis en cache, limité par timeout et par IP prend en charge les déploiements sur le réseau clair et via Tor. Redis reste recommandé pour la mise en cache des réponses et les statistiques persistantes, mais les échecs de Redis n'entraînent plus l'arrêt du HTTP de base ou du service statique.

## Renforcement de la sécurité et de la confidentialité

Les limites de requête publique et de navigateur incluent désormais une application exacte de la surface d'API avant le cache et la préparation ADAMANT, une validation stricte pour les adresses, les identifiants uint64, la pagination, les routes, les méthodes et les filtres, ainsi qu'un limiteur d'API à fenêtre fixe en cours de processus avec une identité client consciente du proxy et un compartiment de débordement à échec sécurisé. Des en-têtes de sécurité, une politique de sécurité du contenu (CSP) contrainte, des erreurs publiques stables, des timeouts HTTP explicites et des journaux d'accès minimisés sont appliqués. Les valeurs du Network Monitor provenant des nœuds et des pairs sont rendues en texte brut et validées. La dégradation gracieuse couvre les échecs de Redis, de Node, des taux de change, de la géolocalisation et du fournisseur de tuiles.

Le dépôt inclut un modèle de menace versionné ainsi qu'une revue de sécurité et de fiabilité. La sécurité a été auditée par cryptofoundry.

## Changements de runtime et de déploiement

Les opérateurs mettant à niveau depuis la v1.3.0 doivent noter que Node.js `^22.18.0 || >=24.11.0` est requis, et que les nœuds ADAMANT configurés doivent exécuter la version v0.10.2 ou ultérieure. Un nouveau `config.jsonc` doit être préparé à partir de `config.default.jsonc`, en prêtant attention à `nodes_adm`, `trustedProxies`, `redis`, `geoLocation`, `exchangeRates` et `log_level`. Freegeoip a été remplacé par une intégration GeoJS optionnelle ; désactiver la géolocalisation conserve les données de pairs et de noms d'hôte sans données cartographiques dérivées du fournisseur. Les proxys inverses et pare-feux doivent autoriser le chemin d'origine unique `/osm-tiles/`. Les actifs `public/` générés ne sont pas commités et doivent être construits lors du déploiement avec `npm run build`. `npm run dev` démarre le backend et Vite ensemble ; `npm run dev:frontend` démarre uniquement Vite.

## Validation

L'arborescence source publiée a passé les vérifications ESLint et Prettier, une build de production avec 6 337 modules transformés, 226 tests unitaires Node, 41 tests d'API sur le Testnet ADAMANT en direct, et des audits de dépendances complets et de production avec zéro vulnérabilité signalée. Les tests de fumée du navigateur sur 13 routes à des résolutions de bureau, tablette et mobile n'ont produit aucune erreur de console ni débordement horizontal.

La version complète est disponible dans les [GitHub Releases](https://github.com/Adamant-im/adamant-explorer/releases/tag/2.0.0).
