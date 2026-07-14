---
title: "Nice Chart : Mise en forme premium des prix pour le market-making"
slug: "introducing-nice-chart-how-premium-market-making-turns-raw-volume-into-a-chart-people-trus-83160e6678e3"
description: "Le module Nice Chart d'ADAMANT façonne l'action du prix au comptant pour donner l'impression de liquidité et d'intention, pas celle d'un bot oublieux."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/introducing-nice-chart-how-premium-market-making-turns-raw-volume-into-a-chart-people-trust-83160e6678e3"
publishedAt: "2026-06-01T08:42:48.686Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/83160e6678e3/001-1-2ebag0oqbrqff72gxpcsbw-png.webp"
cardSpan: "full"
originalId: "medium:83160e6678e3"
locale: "fr"
placeholder: false
---

Le module Nice Chart mis à jour d'ADAMANT façonne l'action du prix au comptant afin qu'un jeton paraisse vivant, liquide et intentionnel — pas comme si un bot avait laissé le volume allumé en oubliant l'esthétique. Il est inclus dans l'édition Premium du [ADAMANT Trading & Market-making bot](https://github.com/Adamant-im/adamant-tradebot) et est conçu pour les équipes qui accordent autant d'importance à la perception qu'à l'exécution.

### Le graphique est votre vitrine

Sur une bourse centralisée, un jeton ne commence pas par un pitch deck ou une page d'accueil. Il commence par un graphique en chandeliers. Les traders, market makers, partenaires de cotation et membres de la communauté jugent la santé en quelques secondes : les mèches sont-elles naturelles ? Le prix évolue-t-il en douceur ou par à-coups ? Le volume ressemble-t-il à un marché réel — ou à un logiciel qui martèle le spread ? Avoir un bot de market-making est une condition minimale ; c'est l'aspect du graphique qui fait la différence.

Les bots classiques de volume dans le spread font leur travail — ils placent des ordres, rééquilibrent les stocks et génèrent des transactions. Mais sans une mise en forme délibérée du prix, les graphiques racontent souvent une mauvaise histoire : bougies irrégulières, sauts brusques qui crient « algorithme » plutôt que « marché », artefacts après redémarrage, et mémoire courte due aux API d'historique des échanges qui ne remontent pas très loin. Le résultat n'est pas toujours un trading défaillant ; c'est une confiance défaillante.

Nice Chart ne remplace pas les contrôles de risque, la gestion du spread ou les modules de liquidité. Il ajoute une couche d'esthétique intentionnelle des prix par-dessus les mêmes garde-fous opérationnels auxquels vous vous fiez déjà.

### Ce que fait Nice Chart

Nice Chart est un module dédié à la mise en forme des prix au sein du module Trader. Tandis que le bot respecte toujours le spread, les limites du Price Watcher, la politique MM et les sécurités du carnet d'ordres, Nice Chart se demande en continu : étant donné notre position dans la bougie et l'historique connu, quelle est la prochaine transaction la plus naturelle — sans sortir de notre couloir de sécurité ?

En pratique, cela signifie des bougies plus lisses et crédibles, avec moins de discontinuités brutales ; une continuité après redémarrage, où l'historique est conservé plutôt que réinventé à chaque déploiement ; une dégradation gracieuse lorsque les nouvelles données de l'échange sont rares, en s'appuyant sur l'historique accumulé et en émettant des alertes claires au lieu de deviner aveuglément ; et une tentative de clôture cohérente des bougies, où le bot peut orienter vers une clôture plus harmonieuse lorsque les vérifications de sécurité le permettent — jamais en contournant les règles de risque.

### Sous le capot

Nice Chart réside dans son propre module `trade/mm_nice_chart.js` et s'interfase avec `mm_trader` via un chargement par dépendance souple. Si le module n'est pas présent dans une version personnalisée, le Trader conserve son comportement historique. Si Nice Chart renvoie une sortie invalide, le Trader revient en arrière — pas de plantage brutal, pas de contournement silencieux des sécurités. Cette architecture est cruciale pour distinguer les éditions Premium des versions basiques : la mise en forme avancée des graphiques est livrée là où elle doit l'être, sans obliger chaque déploiement à supporter la même surface d'attaque.

Les points d'accès aux échanges ont une durée de vie limitée, donc Nice Chart s'associe à une couche partagée d'historique du marché qui maintient un état en mémoire pour le marché actif, persiste les bougies dans la base de données, conserve environ 90 jours d'historique tout en prenant des décisions de mise en forme sur une fenêtre d'analyse d'environ 30 jours, et dédoublonne les transactions selon une identité stable (ID de transaction, horodatage, secours côté/prix). Le bot puise dans un flux durable qui survit aux redémarrages — essentiel pour les émetteurs qui redéploient fréquemment.

Les bougies sont construites indépendamment du timeframe à partir du même flux de transactions, qu'elles soient en direct ou utilisées pour un rapport, réduisant ainsi le risque classique de divergence entre simulateur et production. Les équipes Premium disposent d'un simulateur HTML interactif `trade/tests/nice_chart.test.js` qui affiche des vues multi-timeframe avec Lightweight Charts, compare les trajectoires de base et celles avec Nice Chart sur des entrées identiques, et prend en charge les modes `snapshot` (graine depuis un échange en direct) et `db` (historique accumulé) pour des tests qualitatifs avant d'engager de vrais fonds sur la paire.

La sécurité reste en amont. Nice Chart propose une enveloppe cible contrainte, pas un prix libre. `mm_trader` intersecte cette enveloppe avec les limites de spread, les contraintes du watcher, les règles spécifiques au carnet d'ordres selon la politique, et les vérifications de liquidité avant toute mise d'ordre. La correction de clôture des bougies est une tentative sans contournement — l'esthétique ne prime jamais sur la sécurité de l'exécution.

### À qui cela s'adresse-t-il

Les émetteurs de jetons et projets crypto en bénéficient car un graphique est une preuve sociale ; Nice Chart aide les bougies quotidiennes à raconter une histoire d'activité organique plutôt que de bruit mécanique, surtout sur les paires où la confiance visuelle influence le sentiment des détenteurs. Les bourses et desks de market-making en bénéficient car les partenaires comparent les graphiques entre plateformes, et un flux bien poli réduit les discussions du type « expliquez-moi cette mèche ». Les utilisateurs avancés des versions Premium obtiennent une couche esthétique — la touche finale sur une pile déjà optimisée pour l'exploitation.

Le bot basique open source continue d'utiliser le chemin standard du Trader. Nice Chart est une fonctionnalité Premium destinée aux équipes qui paient pour une présentation avancée du marché.

![Introducing Nice Chart: How Premium market-making turns raw volume into a Chart People Trust](/images/engineering-notes/medium/83160e6678e3/002-1-rhpseh8d6qk4rkb0slsxuq-png.webp)

L'objectif n'est pas de fabriquer un faux graphique BTC pour un microcap — c'est un graphique qui ne détourne pas l'attention de l'histoire réelle du jeton.

### Utilisation pratique

Conceptuellement, activez le Trader sur une configuration spot Premium avec Nice Chart activé, observez le resserrement du couloir et le comportement des bougies pendant une session, puis redémarrez le bot et vérifiez la continuité plutôt qu'une amnésie. Visuellement, exécutez le simulateur Nice Chart avec votre configuration — le mode `trader` avec graine `db` est le plus proche de ce que retient la production, tandis que le mode `snapshot` teste le comportement au démarrage à froid. Opérationnellement, ajustez `mm_minInterval` en conscience ; le bot avertit lorsque le rythme de votre Trader pousse Nice Chart vers un régime dégradé de simple clôture, ce qui est une transparence intentionnelle plutôt qu'une dégradation cachée.

Parcours d'implémentation : [Feature issue #94](https://github.com/Adamant-im/adamant-tradebot/issues/94).

Tout projet sérieux peut acheter ou opérer du market-making. Beaucoup moins investissent dans l'aspect horaire de leur marché sur le graphique que tout le monde capture en screenshot. Nice Chart est la réponse d'ADAMANT pour les clients Premium qui veulent que la sortie du bot paraisse réfléchie — des bougies plus lisses, une continuité plus stable, des secours honnêtes, et des outils pour voir la différence avant d'engager des fonds.
