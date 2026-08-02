---
title: "ADAMANT Explorer v2.0.0"
slug: "release-adamant-explorer-2-0-0-363589536"
description: "ADAMANT Explorer v2.0.0 est la première version stable depuis la v1.3.0, modernisant l'interface, le backend, le monitoring et la sécurité."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-explorer/releases/tag/2.0.0"
publishedAt: "2026-08-01T17:56:02Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-explorer"
tag: "2.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-explorer:363589536"
locale: "fr"
placeholder: false
---

ADAMANT Explorer v2.0.0 est la première version stable depuis la v1.3.0. Elle modernise le frontend, le backend, le monitoring en temps réel, les périmètres de sécurité, les dépendances, les tests et la documentation opérationnelle de l'Explorer, tout en préservant les URL des pages publiques et les liens profonds existants.

Le frontend a été reconstruit avec Vue 3, Pinia, Vue Router 5 et Vite 8, remplaçant la pile précédente composée d'AngularJS, Bootstrap 3 et Webpack. Toutes les pages publiques de l'Explorer disposent désormais de mises en page responsives pour ordinateur, tablette et mobile, avec des thèmes clair et sombre persistants, des contrôles accessibles, des cartes de transaction mobiles, des info-bulles plus sûres et un retour visuel amélioré lors de la copie. Une sémantique contextuelle des transactions a été ajoutée pour les transferts, les votes et dévotes, les opérations DApp, l'activité des échanges et les bonus de bienvenue.

Côté backend, l'accès au nœud ADAMANT a été reconstruit autour d' `adamant-api` 3.1.0 avec gestion de la disponibilité (readiness gating), basculement, pagination bornée, normalisation des erreurs et séparation des couches de requête et de traitement. Les 12 routes d'origine conservées pour l'interface de l'Explorer sont maintenues, et une nouvelle route `GET /api/networkHealth` a été ajoutée. Une validation stricte des routes et des requêtes, un ordre déterministe des transactions, un filtrage corrigé des transferts, une pagination des comptes principaux, des confirmations en temps réel et un formatage ADM en précision totale sont désormais en place. Redis devient optionnel pour le service principal, tandis que la mise en cache résiliente de l'API et les statistiques de blocs et de pairs sont préservées.

Le monitoring en temps réel a été stabilisé pour les cycles de vie de l'en-tête, du moniteur de délégués, du moniteur de réseau et du graphique d'activité Socket.IO, avec un interrogeage sérialisé et des tentatives limitées. Des rafraîchissements de page basés sur les blocs et une confirmation REST limitée pour les notifications de blocs WebSocket compactes ont été ajoutés. Les plannings des délégués, les états de forge, les récompenses, les frais, les statistiques des pairs, le tri des versions et le comportement aux limites de tour ont été améliorés. L'intégration Freegeoip a été remplacée par une géolocalisation optionnelle des pairs via GeoJS, et un proxy de tuiles OpenStreetMap validé, mis en cache et limité en débit (rate-limited) a été introduit.

Les améliorations en matière de sécurité et de fiabilité incluent la suppression du CORS générique (wildcard) et de 16 points de terminaison d'API hérités. Une limitation de débit (rate limiting) prenant en compte les proxys, la validation des proxys de confiance, des en-têtes de sécurité, une CSP contrainte, des erreurs stables et des délais d'attente HTTP explicites ont été ajoutés. Les journaux de requêtes sont minimisés en excluant les chaînes de requête, et les données non fiables provenant des nœuds, pairs, proxys, Redis, géolocalisation et origines de navigateur sont systématiquement validées. Un modèle de menace du dépôt, une revue de sécurité et de fiabilité, ainsi qu'une couverture étendue des tests unitaires pour les interfaces publiques et l'état du monitoring en temps réel ont été ajoutés.

L'environnement d'exécution pris en charge a été mis à jour vers Node.js `^22.18.0 || >=24.11.0`. Express, Redis, Socket.IO, Axios, Vue, Vite, Pinia, Vue Router, ESLint, Mocha, Chai, Supertest et les dépendances restantes ont été mis à jour. Les composants hérités Grunt, Protractor, Cucumber, Jenkins, Travis, Webpack/Babel, ainsi que les intégrations obsolètes Market Watcher et d'échanges ont été supprimés. 43 modules de tests unitaires dédiés au nœud ont été ajoutés, les fixtures du Testnet ont été rafraîchies, et la couverture des tests pour l'API, la sécurité, le planning, le formatage des données et les utilitaires frontend a été étendue. Le fichier `README.md` a été mis à jour avec les guides opérationnels actuels pour les contributeurs et les agents IA.

La validation a inclus le passage des vérifications ESLint et Prettier, une compilation de production transformant 6 337 modules, une suite unitaire de 226 tests, une suite API Testnet en direct de 41 tests sur l'arborescence source publiée, un audit des dépendances signalant 0 vulnérabilité, et des tests de fumée (smoke tests) sur navigateur couvrant 13 routes aux résolutions ordinateur, tablette et mobile sans erreurs de console ni débordement horizontal.

### Changements majeurs (Breaking changes)

Node.js doit être mis à jour vers `^22.18.0 || >=24.11.0`. La configuration de déploiement doit être créée à partir du nouveau `config.default.jsonc`, en révisant `nodes_adm`, `trustedProxies`, `redis`, `geoLocation`, `exchangeRates` et `log_level`. ADAMANT Node v0.10.2 ou supérieur est requis, et plusieurs nœuds HTTPS opérés indépendamment sont recommandés. L'intégration Freegeoip supprimée doit être remplacée par la configuration optionnelle GeoJS ; désactiver la géolocalisation permet de conserver les données des pairs et des noms d'hôtes sans cartes ni drapeaux de pays. Les consommateurs externes des routes d'API supprimées doivent migrer vers `adamant-api-jsclient`, et `GET /api/networkHealth` doit être utilisé pour le monitoring opérationnel. Le chemin d'origine `/osm-tiles/` doit être autorisé dans les règles de reverse-proxy et de pare-feu. Le bundle `public/` ignoré doit être généré lors du déploiement avec `npm run build`. Pour le développement, utilisez `npm run dev` pour la pile combinée backend et Vite, ou `npm run dev:frontend` pour Vite uniquement. Les routes des pages Explorer existantes et les liens profonds restent compatibles, et Redis est recommandé mais n'est plus requis pour le service HTTP et statique de base.
