---
title: "Vérification de santé : Indicateur de mise à jour général"
slug: "discussion-20-health-check-general-updating-spinner-8923249"
description: "L'absence de l'indicateur de chargement dans l'en-tête ADAMANT garantit que l'utilisateur voit la liste la plus récente des discussions et messages."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/20"
publishedAt: "2025-09-20T16:33:48Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923249"
locale: "fr"
placeholder: false
---

![Capture d'écran de la discussion 1](/images/engineering-notes/github/discussions/8923249/001-fda0855b.webp)

L'absence d'un indicateur de chargement dans l'en-tête ADAMANT garantit que l'utilisateur consulte la liste la plus récente des discussions et messages. L'indicateur doit s'afficher s'il n'y a pas de connexion Internet, aucun nœud ADM actif ou aucun nœud ADM activé.

Lorsqu'une connexion et des nœuds actifs existent, le système effectue des vérifications supplémentaires. Après réception de nouveaux messages — c'est-à-dire qu'il n'en existe pas de plus récents — le système enregistre un horodatage `chatActualUntil` dans le stockage.

```javascript
const chatsActualUntil = adamant.toTimestamp(nodeTimestamp) + INTERVAL + CHAT_ACTUALITY_BUFFER_MS
```

Le `INTERVAL` représente l'intervalle d'interrogation des nouvelles discussions via REST, qui varie selon que la connexion par socket est disponible ou non.

```javascript
INTERVAL: (state, getters, rootState) => {
  return rootState.options.useSocketConnection ? SOCKET_ENABLED_TIMEOUT : SOCKET_DISABLED_TIMEOUT
},
```

Les écrans Discussion et Liste des discussions observent `chatActualUntil` et s'abonnent au hook `chatActual = chatActualUntil > currentTime`. Ce hook s'exécute toutes les 500 millisecondes afin de déclencher l'affichage de l'indicateur, même si `chatActualUntil` n'a pas changé en raison de l'absence de nouveaux messages. En fin de compte, l'indicateur s'affiche s'il n'y a pas de connexion Internet, aucun nœud en ligne, ou si `!chatActual` est évalué à vrai.

Lorsque l'application est réactivée depuis l'arrière-plan, aucune modification n'est nécessaire car elle repose toujours sur `chatActualUntil`. Si l'heure du dispositif dépasse l'horodatage de validité de la discussion, l'utilisateur verra l'indicateur. Dans le pire des cas, si la connexion est perdue, l'utilisateur pourrait ne pas voir l'indicateur et croire à tort que tout est à jour pendant une durée maximale de `INTERVAL + CHAT_ACTUALITY_BUFFER_MS` secondes.
