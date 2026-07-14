---
title: "ADAMANT Market-Making Bot : Un Soutien de Spread Plus Sûr et Plus Intelligent"
slug: "adamant-market-making-bot-a-safer-smarter-spread-support-aef80292b22c"
description: "Le soutien de spread (SS) est l'une des fonctionnalités les plus puissantes du bot ADAMANT Market Making, mais aussi la plus délicate. Il resserre les spreads et maintient la santé du carnet d'ordres…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-market-making-bot-a-safer-smarter-spread-support-aef80292b22c"
publishedAt: "2026-03-31T18:05:33.126Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/aef80292b22c/001-1-yjio7wtzsgsnwh-gu1vzpa-png.webp"
cardSpan: "full"
originalId: "medium:aef80292b22c"
locale: "fr"
placeholder: false
---

Les ordres de liquidité de Soutien de Spread (SS) font partie des fonctionnalités les plus puissantes du bot ADAMANT Market-Making, mais aussi des plus délicates. Ils maintiennent les spreads serrés et les carnets d'ordres sains, mais une logique de reconstitution naïve peut devenir exploitable : les boucles de reconstitution recréent une exposition, les conditions volatiles déforment le placement, et les mouvements unilatéraux transforment un mécanisme utile en source de risques évitables.

Cette mise à jour y remédie par une amélioration en trois phases : un outil de simulation dédié, la séparation du Soutien de Spread et de la Liquidité Sûre en sous-modules optionnels, et le remplacement de l'ancienne logique de reconstitution répétée par une stratégie de miroir bornée qui préserve des spreads serrés sans ouvrir de boucles de pertes illimitées.

### Pourquoi cette mise à jour est importante

La logique de liquidité doit se comporter de manière prévisible en situation de stress. Contrairement à la liquidité basée sur la profondeur, qui respecte naturellement les prix moyens d'achat et de vente, les ordres SS existent pour soutenir le spread lui-même. Cela les rend sensibles aux exécutions hostiles, aux mouvements directionnels soudains, et aux règles de placement qui fonctionnent en conditions calmes mais se dégradent en conditions volatiles. Cette version vise à garder le Soutien de Spread utile sans en faire une source de risque illimitée.

### Phase 1 : Outil de simulation et de visualisation

Avant de modifier la logique principale, un outil autonome a été créé pour inspecter le comportement SS dans un environnement contrôlé. Le système comprend `trade/tests/liquidity_test.js` et `trade/tests/liquidity_test.html`, fonctionnant comme une application Express + Socket.io.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/002-1-idogwktarx9lftmrmbspow-png.webp)

En **mode papier**, l'outil conserve en mémoire un instantané unique du carnet d'ordres. Les itérations SS peuvent être déclenchées manuellement, et cliquer sur un niveau de prix simule l'exécution complète de tous les ordres jusqu'à ce niveau, facilitant la reproduction de cas limites et l'inspection des réactions.

En **mode live**, l'outil actualise continuellement le carnet d'ordres depuis l'exchange et travaille avec les enregistrements réels de `ordersDb`. Les itérations restent déclenchées manuellement, mais l'environnement reflète les conditions de marché réelles.

L'interface HTML inclut un tableau du carnet d'ordres codé par couleur, distinguant les ordres externes, la liquidité de profondeur, les ordres SS et les ordres miroirs. Un panneau de statistiques affiche les nombres d'ordres SS ouverts, exécutés et annulés par côté, les valeurs VWAP d'achat et de vente, et les deltas par itération. Un panneau `tradeParams` en lecture seule affiche l'état actif du runtime, tandis que des contrôles manuels permettent aux opérateurs de déclencher des itérations SS, d'inspecter les changements d'état et de copier les valeurs de cellules. Chaque itération met en évidence ce qui a changé, transformant le comportement de liquidité d'une chose déduite des journaux en une chose directement observable.

### Phase 2 : Extraction de la Liquidité Sûre et du Soutien de Spread en modules optionnels

Auparavant, l'état principal de la Liquidité Sûre et la logique de placement SS étaient intégrés dans `mm_liquidity_provider`, liant étroitement plusieurs préoccupations distinctes. Cette version les sépare en deux modules dédiés : `trade/mm_liquidity_safe.js` et `trade/mm_liquidity_ss.js`.

Le module de Liquidité Sûre encapsule l'état `liqLimits` et tous les utilitaires associés (`updateLiqLimits`, `loadLiqLimits`, `storeLiqLimits`, `resetLiqLimits`, `getLiqLimits`, `getVwapRangeString`). Il traite uniquement les exécutions de profondeur en utilisant un filtre strict `subPurpose === 'depth'`, restant ainsi concentré sur l'historique d'exécution basé sur la profondeur et les limites dérivées.

Le module de Soutien de Spread encapsule le comportement SS, y compris `updateSsLiquidity(liquidityOrders, orderBookInfo)`, `updateSsVwap()`, la logique de prix SS, les limites de nombre d'ordres SS, et la logique de placement miroir. Les constantes telles que le nombre minimum et maximum d'ordres SS par côté ont également été déplacées ici.

Le `mm_liquidity_provider.js` principal charge désormais les deux modules via `utils.softRequire()`. Ces modules sont optionnels : si l'un d'eux est absent, le bot continue de fonctionner correctement. La liquidité de profondeur continue d'opérer. Si `mm_liquidity_safe` est absent, les limites de Liquidité Sûre sont simplement inactives. Si `mm_liquidity_ss` est absent, le Soutien de Spread est inactif. Aucun plantage, aucun flux rompu, aucune branche de code séparée n'est nécessaire.

Le fournisseur délègue également les règles de clôture spécifiques à SS au module SS lorsqu'il est présent, remplace la boucle de placement SS en ligne par `ss.updateSsLiquidity()`, et actualise le carnet d'ordres après le placement SS afin que les ordres de profondeur puissent utiliser un prix médian à jour, améliorant ainsi la cohérence du placement.

### Phase 3 : Remplacement des boucles de reconstitution par une stratégie de miroir bornée

Il s'agit du changement comportemental principal. L'ancien modèle de reconstitution répétée pouvait recréer une exposition indésirable dans certaines situations d'exécution.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/003-1-747lh26q3v79vk3xcekrvq-png.webp)

#### La règle de miroir principale

Lorsqu'un ordre SS régulier est exécuté, le bot place un **ordre miroir** sur le côté opposé au prix réfléchi et avec la même taille. Il ne place **pas** de remplacement du même côté.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/004-1-fwgdzzeu-axrb9noqz-o2q-png.webp)

Au lieu de reconstituer indéfiniment là où la liquidité vient d'être consommée, le système reconnaît l'exécution et répond par un homologue borné de l'autre côté du spread. Cela maintient le marché serré sans créer de boucle de rétroaction illimitée de reconstitution du même côté.

#### Propriétés des ordres miroirs

Les ordres miroirs sont explicitement marqués avec `subType: 'mirrored'`, `subTypeString: ' (ss mirrored)'`, et `priceCorrected: true`. Le champ `priceCorrected` permet à la logique existante de `closeLiquidityOrders` de sauter les ordres miroirs valides même s'ils se trouvent en dehors de la fenêtre normale de spread SS, de sorte que les miroirs persistent là où ils devraient sans nécessiter un chemin d'annulation séparé.

#### Prévention des cascades

Un danger majeur dans la logique miroir est le comportement récursif : un miroir est exécuté, puis à nouveau miroir, et ainsi de suite. Ceci est explicitement bloqué. Les ordres miroirs exécutés ne sont pas à nouveau miroirs. Le module vérifie `subType`, et une fois qu'un miroir est créé, l'ordre d'origine est marqué comme source de miroir, empêchant les chaînes en cascade et maintenant le mécanisme borné.

#### Contrôles de risque

**Plafond de distance du miroir.** Si le prix miroir « vrai » mathématiquement se situait trop loin du milieu, le bot revient à un prix borné proche du bord de la zone SS au lieu de le placer aveuglément. Cela empêche les miroirs de se détacher d'un comportement de liquidité significatif.

**Garde de pertinence VWAP.** Le SS maintient désormais ses propres statistiques d'exécution via une époque `fillsEngine` dédiée indexée par `subPurpose: 'ss'`, suivant séparément le `buyVWAP` et le `sellVWAP` SS par rapport à la liquidité de profondeur. Si le VWAP SS dérive de plus de 2 % par rapport au milieu actuel, il est considéré comme obsolète et ignoré pour les contraintes de placement. Cela est important après de forts retournements directionnels, où une ancienne ancre VWAP pourrait autrement piéger la logique SS d'un seul côté du marché.

**Assouplissement en cas de spread large.** Sur les marchés volatils, le spread externe peut temporairement devenir beaucoup plus large que la zone SS prévue. Lorsque cela se produit selon un multiplicateur défini, les vérifications d'occupation des miroirs sont assouplies afin que le Soutien de Spread puisse continuer de fonctionner au lieu de se figer en raison d'hypothèses strictes de placement qui ne correspondent plus au marché.

**Placement régulier SS borné.** Le placement régulier SS respecte désormais le VWAP SS lorsque pertinent. Les nouveaux achats réguliers sont placés en dessous du `buyVWAP` SS, et les nouvelles ventes régulières au-dessus du `sellVWAP` SS, réduisant ainsi la probabilité d'ajouter continuellement une exposition fraîche à des niveaux de plus en plus défavorables.

### Améliorations de l'observabilité et du contrôle opérateur

La commande `/stats` valide désormais les paires via `parseCommandParams`, accepte toute paire ou ticker perpétuel (pas seulement la paire par défaut), formate les valeurs de spread sur 24h en gras, utilise une précision stable pour `volumeInCoin2`, affiche le volume de trading et les statistiques des ordres exécutés uniquement pour la paire par défaut, inclut les ordres en échelle (`ld`) dans les statistiques des ordres exécutés, et ajoute une section Notes.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/005-1-h4suuocfjjiiwmrko04igq-png.webp)

Une nouvelle vue riche des statistiques de liquidité est disponible via `/orders liq full`. Elle inclut un bloc Liquidité de Profondeur avec statut, paramètres de spread, nombres d'ordres, montants ouverts, limites de Liquidité Sûre et historique des exécutions ; un bloc Soutien de Spread avec plage de spread SS, limites de taille d'ordre, nombres d'ordres réguliers et miroirs, statistiques d'exécution SS, VWAP et PnL MTM ; un bloc Total Combiné agrégant les données d'exécution de profondeur et SS ; l'heure de début de l'époque de liquidité actuelle ; les informations sur les ordres minimums de l'exchange ; et les informations actuelles du carnet d'ordres via des utilitaires de profondeur réutilisables. Les tableaux de statistiques d'exécution utilisent une disposition compacte en quatre colonnes : libellé, Achat, Vente et Delta.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/006-1-bnw14f3hsjeoscgu6x3y0g-png.webp)

La liste régulière `/orders liq` affiche désormais le pourcentage exécuté pour les ordres partiellement remplis et inclut les libellés `subPurpose` et `subType` tels que `ss, mirrored`. La commande `/orderbook` inclut une nouvelle colonne **Purpose** indiquant quels modules du bot correspondent à chaque niveau de prix, dérivée des enregistrements `ordersDb` en direct.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/007-1-m8b7g-dtzbkcqrovk8i-0w-png.webp)

La commande `/enable liq` inclut désormais une étape de confirmation avant de modifier les paramètres de liquidité et valide les capacités de construction : la notation de plage de profondeur est rejetée si `mm_liquidity_safe` est absent, et les paramètres SS sont rejetés si `mm_liquidity_ss` est absent, avec un message clair. Une nouvelle sous-commande `/enable liq reset` réinitialise `mm_liquidityInitTs` et efface `liqLimits`, redémarrant l'époque VWAP après confirmation.

Les commandes manuelles `/buy` et `/sell` ont bénéficié d'une amélioration de sécurité : si le prix demandé pour un ordre s'écarte du marché de plus de 1000 %, le bot s'arrête et demande une confirmation avec `/y`, protégeant ainsi contre les ordres accidentels à prix extrêmes. La commande `/account` gère désormais plus correctement les listes de frais vides provenant des API d'exchange.

### Aucune modification cassante

Les deux modules `mm_liquidity_safe` et `mm_liquidity_ss` sont optionnels. S'ils sont absents, `mm_liquidity_provider` continue de fonctionner correctement avec la liquidité de profondeur active. L'évolution au niveau du format est uniquement que les clés de statistiques `fillsEngine` peuvent désormais inclure un segment optionnel `:<subPurpose>` ; les enregistrements existants sans ce segment restent valides et inchangés.

### Résumé

Cette mise à jour fait trois choses. Elle rend le Soutien de Spread visible grâce à un outil de simulation qui transforme un comportement de liquidité caché en quelque chose d'inspectable et de rejouable. Elle rend le Soutien de Spread modulaire en dissociant la Liquidité Sûre et le SS d'un seul chemin de fournisseur. Et surtout, elle rend le Soutien de Spread plus sûr en remplaçant un modèle de reconstitution répétée par une stratégie de miroir bornée conçue pour maintenir le spread serré sans permettre de boucles de pertes incontrôlées.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/008-1-mnimve9mbrwsscd6m9gllq-png.webp)

Pour les systèmes de market-making, c'est la bonne direction : pas plus d'activité pour elle-même, mais un comportement plus intelligent sous pression de marché réelle. Le Soutien de Spread est désormais plus compréhensible, plus maintenable, et beaucoup plus difficile à exploiter.
