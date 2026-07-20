---
title: "Une vision plus claire d'ADAMANT : l'explorateur de blockchain repensé"
slug: "a-clearer-view-of-adamant-redesigned-blockchain-explorer-f97501b0dc55"
description: "Un explorateur de blockchain doit faire plus qu'afficher des transactions et des blocs. Il doit aider les utilisateurs à comprendre ce qui se passe sur le réseau — rapidement, avec précision et en toute confiance."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-clearer-view-of-adamant-redesigned-blockchain-explorer-f97501b0dc55"
publishedAt: "2026-07-19T11:11:20.263Z"
author: "massivedev0 (Theo Bitner)"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:f97501b0dc55"
coverImage: "/images/engineering-notes/medium/f97501b0dc55/001-00d120d06c.webp"
locale: "fr"
placeholder: false
---

Un explorateur de blockchain doit faire plus qu'afficher des transactions et des blocs. Il doit aider les utilisateurs à comprendre ce qui se passe sur le réseau — rapidement, avec précision et en toute confiance. L'explorateur de blockchain ADAMANT a été entièrement repensé en gardant ce principe à l'esprit.

Cette refonte n'est pas seulement cosmétique. Elle reconsidère la manière dont l'information est structurée, dont les transactions sont expliquées, dont la santé du réseau est communiquée, et dont l'explorateur fonctionne sur les appareils de bureau et mobiles.

### La confiance commence par la clarté

Un explorateur de blockchain est l'un des outils de vérification les plus importants dans tout écosystème blockchain. Les utilisateurs l'ouvrent pour confirmer qu'une transaction a été incluse dans le registre, inspecter une adresse, vérifier l'activité d'un délégué, ou comprendre l'état actuel du réseau. Si l'interface est confuse, incohérente ou visuellement générique, elle crée de l'incertitude précisément là où les utilisateurs attendent de la transparence.

L'explorateur repensé établit une hiérarchie visuelle plus claire pour les données de la blockchain. Les identifiants de transaction, les adresses, les montants, les confirmations, les horodatages et les types d'opérations sont désormais plus faciles à identifier et à comparer. L'état du réseau repose sur des données de forgeage significatives plutôt que sur un simple indicateur décoratif « en ligne ». L'explorateur distingue les états actif, dégradé, critique, retardé et en cours de connexion en se basant sur l'activité des délégués ADAMANT et la fraîcheur des mises à jour du réseau. Le design lui-même fait donc partie du modèle de confiance : les utilisateurs peuvent comprendre non seulement ce qui s'est passé, mais aussi à quel point les informations affichées sont actuelles et fiables.

### Responsive par conception

Les explorateurs sont souvent conçus sous forme de tableaux denses pour ordinateurs de bureau et traités comme des outils techniques destinés à un public restreint. En réalité, les gens consultent les transactions depuis des appareils mobiles, surveillent les délégués sur de longues sessions et passent fréquemment des pages de vue d'ensemble aux enregistrements détaillés.

Le nouvel explorateur est responsive par conception. Les tableaux deviennent des mises en page lisibles sur mobile au lieu d'obliger les utilisateurs à naviguer dans des colonnes compressées. Les comptes connus et les délégués affichent à la fois leurs noms et leurs adresses sous-jacentes. Les actions de copie copient systématiquement la valeur réelle de la blockchain. Les montants sont compacts lorsqu'un balayage rapide est nécessaire et restent entièrement précis sur les pages de détail.

Un thème sombre complet a été introduit comme une expérience à part entière plutôt que comme une simple inversion de couleurs. Il améliore le confort lors de longues sessions de surveillance tout en préservant le contraste pour les états du réseau, les directions de transactions, les nœuds de la carte, les graphiques et les indicateurs de statut.

![Une vision plus claire d'ADAMANT : l'explorateur de blockchain repensé](/images/engineering-notes/medium/f97501b0dc55/002-216920b6f7.webp)

Rendre les données de la blockchain confortables à utiliser sur n'importe quel écran abaisse la barrière entre les utilisateurs et le réseau lui-même.

### Une nouvelle identité visuelle

L'interface est conçue pour être professionnelle et sobre sans ressembler à un tableau de bord d'administration générique. Le design mis à jour utilise un système sémantique de surfaces, de typographie, d'espacement, de bordures et de couleurs de statut. Les thèmes clair et sombre partagent la même hiérarchie d'information tout en adaptant leur contraste et leurs accents à l'environnement.

La refonte couvre l'ensemble de l'explorateur : page d'accueil et dernières opérations publiques, blocs et détails des blocs, transactions et détails des transactions, pages d'adresses et de délégués, Top Accounts, Delegate Monitor, Network Monitor, Activity Graph, ainsi que tous les composants associés tels que l'en-tête, la navigation, la recherche, les infobulles, les tableaux et le pied de page. La zone de contenu dispose désormais d'une largeur maximale confortable sur les grands écrans, tandis que certaines sections de surveillance peuvent toujours utiliser la totalité de la zone d'affichage lorsque l'espace supplémentaire améliore la compréhension.

### Les transactions expliquent désormais davantage

Les types de transactions bruts du protocole sont utiles pour les machines, mais ils ne décrivent pas toujours l'opération du point de vue de l'utilisateur. L'explorateur déduit désormais des types de transactions plus significatifs à partir de leur contexte. En plus des transferts classiques, il peut identifier des opérations telles que deposit, withdraw, welcome bonus, vote, unvote, vote & unvote, create delegate, DApp deposit and withdrawal, ainsi que les transactions de type message et state.

Les portefeuilles d'échange connus sont identifiés grâce au carnet d'adresses ADAMANT partagé. Cela permet à l'explorateur de décrire les transferts vers et depuis les exchanges sans maintenir une liste dupliquée séparée dans le frontend. La sémantique des transactions est désormais définie dans un registre partagé utilisé à la fois par le backend et le frontend, ce qui rend le comportement plus cohérent et simplifie l'ajout de futurs types de protocole.

### Des données en direct plus stables et plus précises

La refonte a également été l'occasion d'améliorer plusieurs flux de données sous-jacents. La page d'accueil affiche désormais les 20 dernières opérations publiques. Les transactions ayant des horodatages identiques sont ordonnées de manière déterministe en utilisant leur hauteur et leur identifiant, empêchant les lignes de sembler sauter ou disparaître entre les mises à jour. Les confirmations et l'état du registre se mettent à jour à mesure que de nouveaux blocs arrivent. Le Delegate Monitor attend un instantané de forgeage frais et cohérent lorsque le premier client se connecte, au lieu d'exposer brièvement des données résiduelles d'une session précédente.

![Une vision plus claire d'ADAMANT : l'explorateur de blockchain repensé](/images/engineering-notes/medium/f97501b0dc55/003-0b5168c513.webp)

Les recherches de comptes inutiles ont été réduites, la fusion de requêtes et la mise en cache ont été ajoutées, et l'interface est désormais protégée contre les pannes temporaires de nœuds et les navigateurs où le stockage persistant n'est pas disponible. Ces changements sont majoritairement invisibles — et c'est exactement le but. Un bon explorateur doit sembler stable sans que les utilisateurs aient à penser à la complexité qui se cache derrière.

### La précision sans bruit visuel

Les valeurs de la blockchain nécessitent de la précision, mais afficher chaque décimale partout rend les tableaux plus difficiles à parcourir. La nouvelle interface adapte le formatage au contexte. Les tableaux de vue d'ensemble mettent en avant quatre chiffres significatifs, les valeurs entières utilisent des séparateurs de milliers, et les valeurs complètes restent disponibles dans les infobulles. Les pages de détail préservent chaque décimale significative de la chaîne, les zéros finaux non significatifs sont supprimés, et les horodatages utilisent un format cohérent avec l'heure UTC et un âge relatif concis. Le même principe s'applique dans tout l'explorateur : fournir une information complète tout en mettant en avant ce qui importe le plus à chaque instant.

Le nouvel explorateur est actuellement disponible dans le dépôt de développement, avec une sortie prévue prochainement.
