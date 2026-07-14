---
title: "Mise en place du moteur VWAP et de gestion des exécutions dans le bot de market-making ADAMANT"
slug: "building-vwap-and-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
description: "Le bot ADAMANT de market-making intègre désormais un moteur VWAP et de gestion des exécutions pour des analyses d'exécution professionnelles."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/building-vwap-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
publishedAt: "2026-02-14T13:30:19.720Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/251133ad519e/001-1-stivdc2giqxmbc5miuwkxa-png.webp"
cardSpan: "full"
originalId: "medium:251133ad519e"
locale: "fr"
placeholder: false
---

Dans le bot de market-making ADAMANT, la gestion dynamique du carnet d'ordres, le contrôle des spreads, la fourniture de liquidité et les stratégies de volume sont déjà pris en charge. Cependant, sans analyses précises des exécutions, seule une partie de l'information est visible. [Issue #87](https://github.com/Adamant-im/adamant-tradebot/issues/87) introduit une amélioration majeure de l'architecture : un moteur dédié VWAP et un moteur de gestion des exécutions (module Premium) fournissant des analyses d'exécution de niveau professionnel.

### Pourquoi le VWAP est important

La plupart des API d'échanges fournissent des informations fragmentées. Les ordres peuvent être partiellement exécutés, les mises à jour d'état peuvent être retardées, certains échanges renvoient des données d'exécution incomplètes, et les redémarrages peuvent entraîner la perte du contexte interne d'exécution. Si un bot ne conserve pas correctement les données d'exécution ni ne les vérifie, le PnL devient inexact, le suivi des positions devient peu fiable, la logique de gestion des risques est compromise, et les ajustements de spread et de liquidité reposent sur des hypothèses plutôt que sur la réalité.

Pour fonctionner à un niveau institutionnel, le moteur utilise un suivi persistant des exécutions, une réconciliation vérifiée des exécutions, un calcul correct du VWAP et des analyses tenant compte des positions.

### La solution : moteur dédié VWAP et gestion des exécutions

L'issue #87 introduit un sous-système dédié composé de trois éléments principaux.

**Stockage brut des événements d'exécution (ajout uniquement).** Une base `fillsDb` dédiée stocke les événements d'exécution bruts en mode ajout uniquement, en les conservant entre les redémarrages sans agrégation immédiate. Cela garantit qu'aucune donnée d'exécution n'est perdue ou écrasée.

**Couche de vérification d'échange.** Chaque événement d'exécution doit être vérifié par rapport à l'API de l'échange, confirmé comme entièrement ou partiellement exécuté, et marqué comme traité uniquement après confirmation. Cela évite les faux positifs d'exécution lorsque le bot n'a pas de connectivité, que les nœuds de l'échange sont indisponibles ou que les réponses API sont incomplètes. La vérification d'exécution n'a lieu que lorsque la connectivité réseau est présente et que les points d'accès de l'échange sont joignables ; sinon, des transactions valides risquent d'être marquées à tort comme ayant échoué.

La fonction principale de vérification implémente une politique « toujours vérifier si possible » :

```javascript
/**
 * Verifies a fill order using exchange API.
 *
 * Policy "always verify if possible":
 *  - If api.getOrderDetails() is missing -> cannot disprove -> treat as confirmed
 *  - If status missing or exception -> return undefined (try again later)
 *  - If API says 'filled' -> confirmed
 *  - If API says explicitly not filled ('new'|'part_filled'|'cancelled') -> rejected
 *  - If API says 'unknown' -> keep (cannot disprove) but warn
 *
 * @param {FillOrder|Object} order Fill order record or Order object
 * @param {any} api API instance (spot first/second account, or other compatible trader api)
 * @param {string} callerName Log context id (usually module and method which calls) to quickly find related logs
 * @returns {Promise<VerifyFillResult | undefined>
 */
async function verifyOrderFilled(order, api, callerName)
```

**Statistiques agrégées d'exécution.** Un second stockage persistant, `filledStatsDb`, accumule le volume total de l'actif de base acheté et vendu, le volume total de l'actif de cotation dépensé et reçu, ainsi que les compteurs d'exécutions complètes, partielles, rejetées et manquantes. À partir de ces données, les métriques principales sont calculées.

### Métriques principales

La structure de base de l'objet de statistiques :

```javascript
/**
 * Creates a base FillsEngineStatsResult object with zeroed / default values.
 *
 * @param {string} statsId Format: `${exchange}:${pair}:${purpose}:${startTs}`
 * @param {string} pair Trading pair, e.g., `BTC/USDT`
 * @param {FilledStatsRecord | undefined | null} stats Epoch stats (optional)
 * @returns {FillsEngineStatsResult}
 */
function createBaseEpochStats(statsId, pair, stats) {
  return {
    statsId,
    pair,
    updatedAt: stats?.updatedAt || 0,

    buy: stats?.buy ? { ...stats.buy } : emptySide(),
    sell: stats?.sell ? { ...stats.sell } : emptySide(),

    // Calculated later
    boughtVwap: 0,
    soldVwap: 0,

    hasBothSides: false,
    vwapSpread: 0,
    vwapSpreadPercent: 0,

    pnlQuoteCashflow: 0,
    inventoryBase: 0,
    markPrice: undefined,
    pnlQuoteMtm: undefined,
  };
}
```

**VWAP (Prix Moyen Pondéré par le Volume)** est calculé par côté en tant que VWAP d'achat et VWAP de vente selon la formule `VWAP = Volume total de cotation / Volume total de base`. Cela reflète la qualité réelle d'exécution, et non seulement le prix de placement de l'ordre.

**Écart VWAP** est la différence entre le VWAP d'achat et le VWAP de vente, indiquant l'écart réel réalisé sur les transactions plutôt que l'écart théorique.

**Delta de position** est la différence entre le volume total de base acheté et le volume total de base vendu, utilisé pour la gestion des risques, le suivi de l'exposition et la logique de rééquilibrage.

**PnL réalisé** est le résultat basé sur les flux de trésorerie des transactions exécutées, avec un PnL mark-to-market optionnel utilisant le prix de marché actuel.

### Impact architectural

Le nouveau moteur est un composant entièrement modulaire qui s'intègre proprement à l'architecture existante sans perturber la logique actuelle de placement d'ordres. Il fonctionne en parallèle avec les systèmes existants plutôt que de les remplacer, préservant ainsi la stabilité tout en ajoutant une couche analytique plus poussée.

```
          Exchange API
                │
                ▼
       Order Placement Engine
                │
                ▼
         Fills Collector
                │
                ▼
       Verification Engine
                │
                ▼
         Aggregation Engine
                │
                ▼
      VWAP / Inventory / PnL
                │
                ▼
    Risk & Strategy Modules
```

Cette architecture jette les bases d'une évolution future, transformant le bot d'un simple outil de placement d'ordres en un véritable système d'analyse d'exécution. Des stratégies avancées telles que la gestion de compartiments de liquidité et le maintien dynamique des spreads dépendent fortement de données d'exécution précises pour fonctionner correctement. Pour les modules de trading Premium, l'analyse d'exécution est une exigence fondamentale pour un fonctionnement de niveau professionnel.
