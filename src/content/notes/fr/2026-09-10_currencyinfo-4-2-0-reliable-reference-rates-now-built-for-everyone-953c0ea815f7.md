---
title: "Currencyinfo 4.2.0 : taux de référence auto-hébergés pour les cryptomonnaies et les devises fiat"
slug: "currencyinfo-4-2-0-reliable-reference-rates-now-built-for-everyone-953c0ea815f7"
description: "Currencyinfo 4.2.0 est un service open-source de taux de référence pour les données crypto et fiat, désormais accessible à tous les développeurs."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/currencyinfo-4-2-0-reliable-reference-rates-now-built-for-everyone-953c0ea815f7"
publishedAt: "2026-09-10T20:41:57.667Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:953c0ea815f7"
coverImage: "/images/engineering-notes/medium/953c0ea815f7/001-b82653a311.webp"
locale: "fr"
placeholder: false
---

Chaque portefeuille, explorateur, service de paiement, outil comptable ou application de gestion de portefeuille finit par poser la même question : quelle est la valeur actuelle de cet actif ? La difficulté ne réside pas dans l'exécution d'un appel API. Elle consiste à décider quelle source privilégier, à normaliser des marchés disparates, à gérer les quotas et les pannes, à rejeter les données erronées, à préserver l'historique et à justifier les variations de prix. Currencyinfo est conçu pour accomplir ce travail — et avec la version 4.2.0, il n'est plus présenté comme un composant interne d'ADAMANT. Il s'agit désormais d'un service de taux de référence universel, open-source et auto-hébergé, destiné à quiconque travaille avec des données de cryptomonnaies et de devises fiat.

Un taux de référence ne devrait pas être un chiffre mystérieux emprunté à un fournisseur unique. Il devrait être un résultat observable produit par des règles que vous contrôlez.

## Agrégation multi-sources

La tarification à source unique est pratique jusqu'à ce que cette source limite les requêtes, abandonne un marché, modifie son format, devienne indisponible dans votre région ou rapporte une valeur aberrante. Currencyinfo 4.2.0 peut comparer jusqu'à dix fournisseurs indépendants et transformer leurs cotations en un taux de référence configurable.

Cette version ajoute quatre connecteurs sans clé : CoinPaprika, CoinLore, Binance et ExchangeRate-API. Avec Currency API, la configuration par défaut propose désormais cinq sources fonctionnant sans identifiants API. CoinGecko reste disponible avec une clé de démonstration ; CoinMarketCap et ExchangeRate.host prennent en charge les configurations authentifiées ; MOEX offre une option spécialisée supplémentaire. CryptoCompare est conservé pour des raisons de compatibilité, mais est désormais obsolète et désactivé par défaut, car son nouvel accès nécessite un abonnement.

Les fournisseurs diffèrent par leur couverture d'actifs, leur fréquence de mise à jour, leur disponibilité régionale, leurs quotas et leurs hypothèses de marché. Currencyinfo rend ces différences explicites, puis donne aux opérateurs les moyens de décider de leur impact sur le taux final.

## Des cotations à un taux défendable

Le pipeline comporte cinq étapes. Les sources sont interrogées selon leurs propres calendriers. La validation normalise les paires et rejette les taux croisés nuls ou non finis. L'agrégation détecte les divergences, applique des groupes et des pondérations, et utilise `minSources` pour décider si une paire dispose d'un support suffisant pour être publiée. L'historique stocke des instantanés dans la propre base de données MongoDB de l'opérateur. Enfin, une API REST expose les taux actuels et historiques via des points de terminaison ciblés.

![Currencyinfo 4.2.0 : Taux de référence fiables, désormais conçus pour tous](/images/engineering-notes/medium/953c0ea815f7/002-5f5d5df734.webp)

Cette brève description dissimule plusieurs contrôles utiles. Les groupes de sources faisant autorité peuvent être séparés des groupes de secours. Les pondérations et les stratégies de fusion permettent de définir la manière dont les fournisseurs doivent être combinés. La triangulation déterministe de la devise de base permet de dériver une paire lorsqu'une cotation directe est indisponible. La gestion de la fraîcheur via `rateLifetime` empêche les observations obsolètes de paraître actuelles.

Plus important encore, `minSources` prend désormais en compte la fraîcheur des données. Un fournisseur configuré qui a cessé de fournir des données utilisables n'est plus comptabilisé simplement parce qu'il existe dans la configuration. Le service publie les données lorsqu'il existe suffisamment de preuves *actuelles* et se dégrade de manière prévisible dans le cas contraire. La résilience ne consiste pas à prétendre que chaque fournisseur est toujours opérationnel, mais à savoir quelles preuves sont actuelles, lesquelles manquent et quelle action votre système doit entreprendre.

## Améliorations axées sur l'opérateur

Currencyinfo 4.2.0 renforce également les composants situés derrière le point de terminaison. Trois index de tickers triés par date rendent les requêtes historiques plus pratiques à grande échelle. Dans le jeu de données de validation de la version, composé d'environ 238 millions de documents, une requête représentative de paire et de plage a été optimisée, passant de 22,8 secondes à 8 millisecondes. Les résultats réels dépendent du matériel, de la distribution des données, de l'état du cache et de la forme de la requête, mais la tendance est claire : l'historique accumulé est désormais beaucoup plus facile à exploiter.

Le service est passé à Node.js 22.12 ou version ultérieure et met à jour sa plateforme vers NestJS 12, Mongoose 9, Zod 4, TypeScript 6 et Jest 30. La suite de tests complète couvre 28 suites et 266 tests.

La distribution par conteneurs est désormais une surface de publication de premier ordre. Les images sont publiées pour linux/amd64 et linux/arm64 avec des métadonnées OCI, un SBOM et une provenance de construction. L'exécution se fait sans privilèges root, les gestionnaires de paquets sont supprimés de l'image de production, les journaux utilisent des autorisations restrictives, les valeurs sensibles sont masquées et le pipeline CI inclut une analyse des vulnérabilités.

Pour un nouveau déploiement, le chemin le plus court est l'image publique :

```
docker pull ghcr.io/adamant-im/currencyinfo:4.2.0
```

![Currencyinfo 4.2.0 : Taux de référence fiables, désormais conçus pour tous](/images/engineering-notes/medium/953c0ea815f7/003-4f3ec4075a.webp)

## Limites claires

Currencyinfo produit des taux de référence. Il ne s'agit pas d'un flux d'exécution d'échange, d'un terminal de données de marché à haute fréquence ou d'une API hébergée avec un SLA garanti. L'auto-hébergement vous donne le contrôle sur la configuration, l'historique, la confidentialité et la disponibilité ; il vous rend également responsable de la surveillance de votre déploiement et du respect des conditions, limites et règles de redistribution de chaque fournisseur en amont.

La mise à niveau depuis la version 4.1.2 nécessite une planification. Les anciennes configurations peuvent activer des fournisseurs nécessitant désormais des identifiants ; les opérateurs doivent donc désactiver ces sources, ajouter des clés ou adopter les nouvelles valeurs par défaut sans clé avant de démarrer la version 4.2.0. Les bases de données historiques volumineuses doivent également créer les trois nouveaux index hors ligne : les mesures de la version ont pris environ 17 minutes sur un stockage NVMe et 50 minutes sur SATA. Les formats de documents stockés restent compatibles, ce qui facilite les retours en arrière.

Une correction comportementale à noter : les filtres d'historique utilisent désormais l'ordre des paires BASE/QUOTE documenté. Les clients qui compensaient auparavant en inversant les paires doivent supprimer cette solution de contournement. Les paramètres de requête inconnus sont également rejetés avec une erreur HTTP 400 au lieu d'être ignorés silencieusement.

ADAMANT reste visible car il utilise Currencyinfo en production et continue de piloter son développement. Mais le projet ne se limite pas à ADAMANT. Il est tout aussi pertinent pour un portefeuille indépendant, un explorateur de blocs, un backend de paiement, un système comptable ou un opérateur d'infrastructure souhaitant un service de taux pouvant être inspecté, configuré et exécuté localement.
