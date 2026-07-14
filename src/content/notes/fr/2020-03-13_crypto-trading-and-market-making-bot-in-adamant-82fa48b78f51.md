---
title: "Bot de trading cryptographique et de market making dans ADAMANT"
slug: "crypto-trading-and-market-making-bot-in-adamant-82fa48b78f51"
description: "Le bot de trading ADAMANT prend en charge plusieurs exchanges de cryptomonnaies. Il permet un trading manuel ou automatisé, avec un accent actuel sur le remplissage des carnets d'ordres et la génération de volume."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/crypto-trading-market-making-bot-in-adamant-82fa48b78f51"
publishedAt: "2020-03-13T11:21:13.547Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/82fa48b78f51/001-0-o1ekf2vkjogaqiht.webp"
cardSpan: "full"
originalId: "medium:82fa48b78f51"
locale: "fr"
placeholder: false
---

Le bot de trading ADAMANT prend en charge plusieurs exchanges de cryptomonnaies. Il peut être utilisé pour du trading manuel ou automatisé, avec un accent actuel sur le remplissage des carnets d'ordres et la génération de volume plutôt que sur le profit spéculatif.

### Attentes réalistes concernant les bots de trading

Les bots de trading ne garantissent pas de générer des profits. La probabilité de succès est à peu près équilibrée, et toute personne affirmant qu’un bot produira certainement un profit n’est pas honnête. Les entreprises vendent des bots de trading au lieu de les utiliser elles-mêmes, car le trading de cryptomonnaies comporte des risques importants, qu’on utilise un bot ou des méthodes manuelles. Les fonctionnalités orientées profit du bot ADAMANT sont actuellement limitées ; l’utilisation principale est le market making.

### Pourquoi le market making est important

Une grande partie du volume d’échanges sur les plateformes de cryptomonnaies est artificielle. Les petits projets de jetons listés sur des exchanges mineurs font face à un volume de trading nul, car même les principales cryptomonnaies peinent à attirer du volume. En l’absence de volume visible, les utilisateurs hésitent à acheter et d’autres exchanges refusent les nouvelles listings. Les opérateurs de projets doivent donc créer eux-mêmes du volume d’échanges et remplir les carnets d’ordres, en payant des frais d’échange au passage.

### Fonctionnement du bot

Le bot de trading est un programme côté serveur persistant. Après l’installation, vous configurez l’exchange cible et la paire de trading. Le bot surveille les commandes entrantes, exécute des transactions selon votre stratégie configurée et envoie des notifications pour toutes les opérations. Les commandes sont envoyées via ADAMANT Messenger, ce qui signifie que vous avez besoin de deux comptes ADM : un pour vous-même en tant qu’administrateur et un pour le bot.

### Prérequis pour commencer

Vous devez avoir des connaissances de base en Linux et en Node.js, ainsi qu’un serveur virtuel minimal provenant d’un fournisseur d’hébergement cloud quelconque. Exécuter un nœud ADAMANT complet n’est pas nécessaire. Vous devez créer deux comptes ADAMANT : votre compte personnel, dont l’adresse est indiquée dans le champ de configuration `admin_accounts`, et le compte du bot, dont le `passPhrase` est défini dans la configuration. Chaque message envoyé au bot coûte 0,001 ADM, et des jetons ADM gratuits sont disponibles via le programme de bounty ADAMANT en quantités suffisantes pour des années d’utilisation.

Du côté de l’exchange, vous avez besoin de clés API pour votre compte exchange, créées dans les paramètres API de l’exchange. Approvisionnez les soldes de la paire de trading sur l’exchange et assurez-vous que le carnet d’ordres de votre paire choisie contient au moins une commande d’achat et une commande de vente avant de lancer le bot. Enfin, installez le bot, ajustez le fichier de configuration et exécutez-le.

### Commandes

Le bot accepte les commandes via ADAMANT Messenger. Utilisez `/help` pour afficher les commandes disponibles, et consultez la référence complète des commandes pour plus de détails.

![Bot de trading cryptographique et de market making dans ADAMANT](/images/engineering-notes/medium/82fa48b78f51/002-0-mvxlgzjz2pq3e6dl.webp)

### Installation et code source

Le bot est open source et les instructions d’installation sont disponibles sur GitHub. Des guides détaillés pour les utilisateurs moins expérimentés sont fournis sur le site du projet.

Le trading de cryptomonnaies comporte des risques importants. Vous êtes seul responsable de vos décisions de trading. ADAMANT propose également d’autres bots pour différents cas d’utilisation.
