---
title: "ADAMANT Console v3.1.0 : notes de développement pour la prise en charge du nœud v0.10.0"
slug: "discussion-57-adamant-console-v3-1-0-developer-notes-for-node-v0-10-0-support-10337345"
description: "ADAMANT Console v3.1.0 prend en charge ADAMANT Node v0.10.0 et améliore l'interface développeur pour CLI, JSON-RPC et intégrations JavaScript locales."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/57"
publishedAt: "2026-06-29T08:48:18Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10337345"
locale: "fr"
placeholder: false
---

ADAMANT Console v3.1.0 introduit la prise en charge d'ADAMANT Node v0.10.0 et renouvelle l'interface développeur pour les intégrations CLI, JSON-RPC et JavaScript locales. Cette version s'adresse principalement aux développeurs et opérateurs utilisant Console comme outil de signature local, interface en ligne de commande (CLI) pour scripts ou pont léger JSON-RPC vers les nœuds ADAMANT.

Console utilise désormais `adamant-api` v3 et s'aligne sur le comportement de réponse et de requête d'ADAMANT Node v0.10.0. Le runtime pris en charge est Node.js 22.13.0 ou une version ultérieure. Les méthodes CLI, JSON-RPC et les wrappers JavaScript ont été harmonisées autour d'un comportement commun de Console. Une nouvelle commande `node status` et son wrapper associé permettent désormais d'obtenir l'état du nœud, tandis que les assistants de discussion ont été étendus pour couvrir les salons de discussion, les messages et les transactions de discussion héritées. Les recherches de transactions transmettent désormais les options de requête v0.10 comme `returnUnconfirmed`, et les recherches de délégués acceptent un nom d'utilisateur, une clé publique ou une adresse ADAMANT. Pour les filtres de discussion avec transferts directs, l'API privilégie désormais `includeDirectTransfers`, bien que l'ancien paramètre `withoutDirectTransfers` soit toujours normalisé pour assurer la compatibilité descendante. Les wrappers publics incluent désormais des commentaires JSDoc et des pages de référence API générées, et le package npm est publié avec preuve d'origine via OIDC GitHub Actions et npm Trusted Publishing.

Pour installer ou mettre à jour globalement, utilisez npm :

```sh
npm install -g adamant-console
```

Le package expose le binaire `adm` pour les opérations courantes :

```sh
adm client version
adm node status
adm get transaction 123456789 returnUnconfirmed=1
adm get chats U123456789 includeDirectTransfers=1
```

Lors de la mise à jour, les services utilisant Console via JSON-RPC doivent examiner attentivement l'élargissement de la surface des méthodes et la gestion des réponses. Le code qui consomme les réponses de transaction ou de discussion doit être testé avec les champs de la version v0.10.0 dont il dépend, en particulier les données de transaction non confirmées, l'inclusion des transferts directs dans les discussions et le champ `timestampMs`. Pour les nouveaux services JavaScript, il est préférable d'utiliser directement `adamant-api` afin d'obtenir une couverture complète du protocole, en réservant les wrappers `adamant-console` aux cas où vous avez besoin d'un comportement CLI/RPC compatible avec Console ou pour des scripts opérationnels locaux.
