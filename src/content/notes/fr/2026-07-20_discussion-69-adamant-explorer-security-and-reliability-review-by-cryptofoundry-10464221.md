---
title: "Revue de sécurité et de fiabilité d'ADAMANT Explorer"
slug: "discussion-69-adamant-explorer-security-and-reliability-review-by-cryptofoundry-10464221"
description: "ADAMANT Explorer a finalisé une revue ciblée de sécurité et de fiabilité de sa surface HTTP publique, de la limite ADAMANT Node, du cache Redis, du cycle de vie Socket.IO, du reverse-proxy et du rendu navigateur."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/69"
publishedAt: "2026-07-20T20:32:14Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10464221"
locale: "fr"
placeholder: false
---

ADAMANT Explorer a finalisé une revue ciblée de sécurité et de fiabilité portant sur sa surface HTTP publique, la limite ADAMANT Node, le comportement du cache Redis, le cycle de vie Socket.IO, la confiance accordée au reverse-proxy et le rendu navigateur. Le durcissement a été fusionné dans [adamant-explorer#37](https://github.com/Adamant-im/adamant-explorer/pull/37) et clôture les issues [#23](https://github.com/Adamant-im/adamant-explorer/issues/23), [#25](https://github.com/Adamant-im/adamant-explorer/issues/25) et [#33](https://github.com/Adamant-im/adamant-explorer/issues/33). La revue a couvert l'ordre des middlewares Express, l'exposition de l'API publique, la validation, la limitation de débit, la confiance accordée au reverse-proxy, les réponses ADAMANT Node en tant que limite de données non fiables, la correction du cache Redis et son comportement en cas de défaillance, le polling et les reconnexions Socket.IO, le rendu navigateur des valeurs contrôlées par les nœuds et les pairs, les défaillances de dépendances optionnelles, la continuité des taux de change, le reporting de santé opérationnelle et la modélisation des menaces du dépôt.

## Limite HTTP publique et API

Explorer n'expose désormais que les 12 routes API de même origine requises par son interface utilisateur, ainsi que `GET /api/networkHealth`. Seize enregistrements de routes héritées et le CORS wildcard ont été supprimés. Les requêtes sont vérifiées par rapport à une surface API exacte avant toute consultation Redis ou vérification de disponibilité ADAMANT, empêchant ainsi les points de terminaison supprimés d'être réactivés via des entrées de cache obsolètes. Les paramètres de requête publics utilisent désormais une validation stricte et une pagination bornée. L'application applique une limite en fenêtre fixe, en cours de traitement et consciente du proxy, de 300 requêtes API par minute et par client, avec un stockage d'identité borné et un compartiment de débordement à fermeture automatique. La confiance accordée au reverse-proxy est explicite et validée. Les en-têtes de sécurité, une politique de sécurité de contenu restreinte, des réponses d'erreur stables, des délais d'expiration HTTP et une journalisation des requêtes minimisant les données réduisent encore la surface d'attaque exposée.

## Disponibilité et correction de l'état

`GET /api/networkHealth` rapporte des états cohérents `live`, `degraded`, `critical` ou `unavailable`, ne retournant HTTP `503` que lorsqu'aucun instantané cohérent de nœud ne peut être produit. Les défaillances de Redis et des services externes optionnels ne font plus tomber le cœur HTTP ni le service statique. L'identité du cache est sensible aux blocs lorsque nécessaire, et le chemin de rafraîchissement des taux de change préserve les dernières valeurs utilisables connues tout en évitant les rafraîchissements simultanés. Le polling Socket.IO est sérialisé, conscient du cycle de vie et borné lors des défaillances en amont. Le suivi de génération, la propriété explicite des minuteurs et la suppression des rappels obsolètes empêchent les espaces de noms déconnectés ou redémarrés de poursuivre un travail périmé.

## Données non fiables et sécurité du navigateur

Les charges utiles ADAMANT Node et des pairs restent non fiables jusqu'à leur normalisation ou validation. Les valeurs du Network Monitor sont rendues sous forme de texte, tandis que les cibles de route, les valeurs dérivées de CSS et les coordonnées sont contraintes avant utilisation. Les chemins d'API frontend et backend partagent désormais une source unique de vérité pour éviter toute dérive de contrat.

## Compatibilité et impact sur l'intégration

L'API Explorer conservée est un détail d'implémentation de l'interface web, et non une API d'intégration à usage général. Les applications externes doivent utiliser [adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient) pour une intégration directe avec ADAMANT Node. Les opérateurs peuvent utiliser `GET /api/networkHealth` pour la supervision d'Explorer. Les routes frontend existantes et les liens profonds restent compatibles. Les déploiements derrière un reverse proxy doivent configurer `trustedProxies` pour correspondre à la topologie réelle. Les nœuds HTTPS sont préférés ; un repli HTTP en clair hérité subsiste pour des raisons de compatibilité.

## Périmètre et suivi

Il s'agissait d'un audit du code et de l'architecture du dépôt Explorer et de ses limites de confiance à l'exécution, et non d'un audit du protocole cryptographique ou du consensus blockchain. Le limiteur de débit est volontairement par processus, de sorte que les déploiements multi-répliques doivent également appliquer une limite agrégée au niveau du périmètre. Un [modèle de menaces du dépôt](https://github.com/Adamant-im/adamant-explorer/blob/dev/adamant-explorer-threat-model.md) et le [rapport complet de sécurité et de fiabilité](https://github.com/Adamant-im/adamant-explorer/blob/dev/security_best_practices_report.md) sont disponibles. Les éléments de suivi ouverts incluent [les contrôles optionnels de confidentialité des IP des pairs](https://github.com/Adamant-im/adamant-explorer/issues/20), [les mises à jour majeures des dépendances frontend](https://github.com/Adamant-im/adamant-explorer/issues/34), [la validation du schéma de réponse ADAMANT Node](https://github.com/Adamant-im/adamant-explorer/issues/35) et [la réessai lors des pannes et le regroupement des journaux](https://github.com/Adamant-im/adamant-explorer/issues/36).
