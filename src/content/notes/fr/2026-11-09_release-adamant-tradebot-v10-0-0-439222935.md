---
title: "ADAMANT Tradebot v10.0.0"
slug: "release-adamant-tradebot-v10-0-0-439222935"
description: "ADAMANT Tradebot v10.0.0 est une version majeure introduisant une réorganisation architecturale, une sécurité d'itération exclusive et une gestion des logs d'entreprise."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v10.0.0"
publishedAt: "2026-11-09T14:19:19Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-tradebot"
tag: "v10.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:439222935"
locale: "fr"
placeholder: false
---

ADAMANT Tradebot v10.0.0 est une version majeure qui apporte une réorganisation architecturale, une sécurité d'itération exclusive, une gestion des logs d'entreprise, des API de gestion WebUI basées sur les rôles, un connecteur Azbit réécrit, la publication npm sécurisée via OIDC et une provenance de build cryptographique pour les conteneurs Docker.

## Installation

```bash
# Via npm
npm install -g adamant-tradebot
mm init
mm doctor
mm on

# Via Docker / GHCR
docker pull ghcr.io/adamant-im/adamant-tradebot:10.0.0
docker run -d --name adamant-tradebot ghcr.io/adamant-im/adamant-tradebot:10.0.0
```

## Sécurité de la chaîne d'approvisionnement et publication sécurisée

Le flux de publication npm a migré vers le système OIDC Trusted Publishing, supprimant le besoin de secrets de dépôt persistants (`NPM_TOKEN`), avec une provenance vérifiée activée via `publishConfig.provenance: true`, ce qui clôture le ticket #119. L'attestation de provenance des builds GHCR a été intégrée en utilisant `actions/attest-build-provenance@v2` avec la signature Sigstore pour des builds de conteneurs vérifiables sur GitHub Packages. Des déclencheurs de vérification manuelle ont été ajoutés aux flux de publication CI/CD via `workflow_dispatch`.

## Architecture et fiabilité du runtime

La structure des modules a été réorganisée pour une séparation claire : `trade/features/` pour les modules de market-making, `trade/trader/` pour les connecteurs d'échange, et `trade/settings/` pour les fichiers de paramètres dynamiques. Un verrouillage d'itération exclusif a été introduit via `helpers/moduleIteration.js` (`runExclusiveIteration`) pour empêcher les itérations concurrentes qui se chevauchent et garantir une reprogrammation fiable à partir des blocs `finally`.

La rotation des logs d'entreprise et un lecteur de logs rapide ont été entièrement réécrits dans `helpers/logRotation.js` et `helpers/logReader.js`, prenant en charge les cycles de vie actifs et d'archivage, la lecture inversée structurée et la récupération de logs paginés. L'évaluation de l'état de santé du runtime a été ajoutée via `helpers/mmHealthEval.js`, `helpers/mmHealthState.js` et `helpers/mmRuntimeHealth.js` pour une surveillance en temps réel de l'état du market-making. Le suivi de l'initiateur de commande est désormais fourni par `helpers/commandInitiator.js`, offrant un suivi contextuel cohérent à travers les invocations Messenger, API WebUI et CLI.

## Connecteurs d'échange

Le connecteur Azbit a fait l'objet d'une réécriture complète de `trade/trader/trader_azbit.js` et `trade/api/azbit_api.js`, prenant en charge les API REST v1 et v2, la précision stricte des ordres, la limitation de débit (rate limiting) et 137 tests unitaires avec des mocks d'API complets. La précision et la sécurité des connecteurs ont été standardisées pour Coinstore, FameEX, NonKYC, P2PB2B et StakeCube, incluant une gestion unifiée des erreurs, la troncature de précision et la pré-validation des soldes.

## API REST et WebSocket WebUI

Le contrôle d'accès basé sur les rôles a été introduit avec la prise en charge des rôles `admin`, `manager` et `viewer` (lecture seule), incluant une validation JWT stricte, l'application de TTL et le filtrage d'accès par IP. Des points de terminaison complets de gestion des bots ont été ajoutés pour le réglage dynamique des paramètres (`PUT /api/v1/params`, `PUT /api/v1/params/strategy`), le cycle de vie du bot, les ordres et les requêtes de logs. Le streaming WebSocket permet l'abonnement aux événements en temps réel pour le statut du bot, les logs de trade et les mises à jour des tickers du marché.

## Assurance qualité et outils de développement

La couverture des tests s'étend désormais à 576 tests automatisés répartis sur 33 suites de tests couvrant les modules généraux, API WebUI, fonctionnalités, trader, helpers et market-making. Des directives pour les agents IA ont été ajoutées dans `AGENTS.md` pour un développement assisté par IA respectant les invariants de sécurité, la disposition des répertoires et les protocoles de test. La sécurité des types a été améliorée avec des définitions JSDoc `@typedef` et une vérification TypeScript via `npm run typecheck:webui-api`.

### Changements majeurs (Breaking changes)

Cette version nécessite Node.js version 22.12.0 ou supérieure. La disposition interne des répertoires a changé ; les modules de fonctionnalités et les connecteurs ont été déplacés dans `trade/features/` et `trade/trader/`. Les extensions personnalisées important des chemins internes doivent être mises à jour en conséquence. L'API WebUI impose désormais une expiration stricte des JWT et une autorisation par rôle sur tous les points de terminaison privés.
