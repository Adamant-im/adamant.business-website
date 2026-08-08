---
title: "Le service de notification ADAMANT, refondu : même confidentialité, fondations plus solides"
slug: "adamant-notification-service-rebuilt-same-privacy-sturdier-foundations-fee1b3ab39fb"
description: "Le service de notification ADAMANT (ANS) a reçu sa plus grande mise à jour depuis 2019, modernisant son infrastructure tout en préservant son modèle de confidentialité."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-notification-service-rebuilt-same-privacy-sturdier-foundations-fee1b3ab39fb"
publishedAt: "2026-08-07T14:48:47.463Z"
author: "Sab Kabadas"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:fee1b3ab39fb"
coverImage: "/images/engineering-notes/medium/fee1b3ab39fb/001-50da4f2353.webp"
locale: "fr"
placeholder: false
---

Le service de notification ADAMANT (ANS) a bénéficié de sa plus importante mise à jour depuis 2019, modernisant son infrastructure sous-jacente tout en conservant son modèle de notifications push « zero-knowledge » pour les utilisateurs iOS. Pour les utilisateurs d'iPhone sur ADAMANT Messenger, l'ANS fonctionne discrètement en arrière-plan, alertant les appareils de l'arrivée de nouveaux messages sans jamais compromettre la confidentialité.

La plupart des applications de messagerie imposent un compromis : les notifications push nécessitent qu'un composant système ait connaissance des détails du message. L'ANS évite cela en interrogeant la blockchain publique ADAMANT pour détecter les transactions adressées à un appareil enregistré. Lorsqu'une transaction est détectée, il demande à Apple de notifier l'appareil en utilisant uniquement l'identifiant de la transaction. L'ANS ne peut ni lire le contenu des transactions, ni inclure de contenu déchiffré dans la charge utile de la notification, car le déchiffrement nécessite une clé secrète détenue exclusivement sur l'appareil de l'utilisateur. Ni l'ANS ni Apple ne peuvent donc reconstituer la conversation.

Bien que ce modèle de confidentialité reste inchangé, l'environnement d'exécution et les mécanismes de fiabilité ont été considérablement renforcés. L'ANS fonctionne désormais sous .NET 8, remplaçant une version obsolète. Cela permet au service de s'exécuter nativement sur les systèmes d'exploitation serveurs actuels sans dépendre de couches de compatibilité vieillissantes.

De plus, une fuite de connexion réseau qui s'accumulait avec le temps et nécessitait des redémarrages périodiques du service a été corrigée ; les connexions sont désormais correctement réutilisées. Le service implémente également un véritable basculement (failover) pour la communication avec les nœuds de la blockchain. Auparavant, un seul nœud inaccessible pouvait interrompre l'ensemble du pipeline de notification. L'ANS effectue désormais automatiquement des tentatives de connexion vers un autre nœud, tirant parti de la résilience décentralisée du réseau ADAMANT.

Cette version de maintenance a fait l'objet d'un audit de sécurité indépendant réalisé par cryptofoundry. En modernisant l'environnement d'exécution et en corrigeant des problèmes d'infrastructure fondamentaux, ADAMANT garantit que l'ANS pourra continuer à fournir des notifications fiables et « zero-knowledge » pour les années à venir.
