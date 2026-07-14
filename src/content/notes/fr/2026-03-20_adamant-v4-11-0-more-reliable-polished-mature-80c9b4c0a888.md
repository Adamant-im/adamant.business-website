---
title: "ADAMANT v4.11.0 : Plus fiable, plus soigné, plus mature"
slug: "adamant-v4-11-0-more-reliable-polished-mature-80c9b4c0a888"
description: "ADAMANT v4.11.0 regroupe 20 demandes de fusion et 437 validations, axées sur la fiabilité des connexions, la cohérence de l'interface, les flux de portefeuille et la stabilité générale."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-v4-11-0-more-reliable-polished-mature-80c9b4c0a888"
publishedAt: "2026-03-20T16:23:57.256Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/80c9b4c0a888/001-1-4agtbybzbmpaqqrwpbaz5q-png.webp"
cardSpan: "full"
originalId: "medium:80c9b4c0a888"
locale: "fr"
placeholder: false
---

ADAMANT v4.11.0 regroupe 20 demandes de fusion et 437 validations, avec un accent mis sur la fiabilité des connexions, la cohérence de l'interface, les flux de portefeuille et la stabilité générale du produit, plutôt que sur une fonctionnalité phare.

### Résilience des nœuds et comportement réseau
Une amélioration majeure de cette version concerne la fiabilité des nœuds. ADAMANT inclut désormais un basculement vers des adresses IP alternatives lorsque l'accès par domaine échoue, ainsi qu'une gestion améliorée du cycle de vie des vérifications d'état et des délais d'attente. La récupération après une mise en veille ou une déconnexion du dispositif est renforcée, et les messages d'état des nœuds sont affinés afin de réduire les signaux de synchronisation erronés. Ces changements visent directement les points de défaillance en cas de conditions réseau instables, rendant le messager plus résilient.

![ADAMANT v4.11.0 : Plus fiable, plus soigné, plus mature](/images/engineering-notes/medium/80c9b4c0a888/002-1-bnmyyew25hm84-zwmg0y0w-png.webp)

### Modernisation de l'interface
Cette version introduit de nombreuses améliorations visuelles dans les discussions, le portefeuille, les flux d'envoi de fonds, les paramètres, les boîtes de dialogue et la navigation. Elle met en œuvre des jetons de conception partagés, des règles d'espacement plus strictes, une typographie améliorée, des primitives de mise en page et un nettoyage du thème piloté par des variables CSS. Une couverture élargie des régressions de mise en page contribue à préserver la qualité de l'interface utilisateur lors des futures mises à jour.

### Améliorations de l'expérience de discussion
Le volet messagerie bénéficie d'améliorations dans la disposition des discussions ouvertes, la gestion de l'état des messages, les indicateurs de nouvelle tentative, le comportement du sélecteur d'émojis, la gestion du débordement des réponses, le chargement de la clé publique et le regroupement des messages. Elle corrige également le rafraîchissement incorrect des dates et les régressions de défilement nul lors des changements rapides de discussion, assurant un fonctionnement quotidien plus fluide.

![ADAMANT v4.11.0 : Plus fiable, plus soigné, plus mature](/images/engineering-notes/medium/80c9b4c0a888/003-1-mmpisulwbp1letrtngejyq-png.webp)

![ADAMANT v4.11.0 : Plus fiable, plus soigné, plus mature](/images/engineering-notes/medium/80c9b4c0a888/004-1-6kfadiesjlisjwmvg9o4ww-png.webp)

### Flux de portefeuille et d'envoi de fonds
Les écrans financiers ont été largement retravaillés, notamment avec des cartes de portefeuille améliorées, des onglets, des états de solde et une disposition de la liste des transactions optimisée. La mise à jour corrige la normalisation du montant des transferts internes pour BTC, DOGE et DASH, et normalise les symboles de portefeuille conservés lors de la restauration afin de maintenir un état cohérent après mise à niveau.

![ADAMANT v4.11.0 : Plus fiable, plus soigné, plus mature](/images/engineering-notes/medium/80c9b4c0a888/005-1-ia-qldhd8-vcndnkepcjdw-png.webp)

### Suppression du support Klayr
Une décision notable concernant la portée du produit est la suppression complète du support de Klayr (KLY) dans les portefeuilles, nœuds, transactions, configurations, icônes, requêtes, clients de nœuds, chemins de stockage et interfaces utilisateur associées. L'élimination de ces chemins obsolètes permet de simplifier la base de code et de réduire la complexité perçue par l'utilisateur.

### Chaîne d'outils et documentation
En coulisses, le projet est passé de Node.js 20 à 22, a migré vers ESLint 9 et a mis à jour les versions Electron pour inclure un support universel macOS. Des workflows Playwright élargis pour les tests de fumée et de régression améliorent la rigueur des tests. La documentation a également été actualisée, notamment avec des instructions plus claires pour l'auto-hébergement dans `README.md` et des directives de fonctionnement pour l'IA dans `AGENTS.md`.
