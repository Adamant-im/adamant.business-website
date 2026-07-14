---
title: "ADAMANT CoinOptimus : Bot de trading de cryptomonnaies open source et auto-hébergé"
slug: "adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-a9686139df31"
description: "ADAMANT CoinOptimus est un bot de trading auto-hébergé conçu pour les traders non professionnels souhaitant automatiser sans céder le contrôle de leurs clés à des tiers."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-traders-a9686139df31"
publishedAt: "2023-07-01T12:39:55.877Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/a9686139df31/001-0-ygfhry-dhfu9rszm.webp"
cardSpan: "full"
originalId: "medium:a9686139df31"
locale: "fr"
placeholder: false
---

ADAMANT CoinOptimus est un bot de trading de cryptomonnaies auto-hébergé, conçu pour les traders non professionnels qui souhaitent bénéficier d'une automatisation sans céder le contrôle de leurs clés à des services tiers. Étant exécuté sur votre propre serveur, les utilisateurs soucieux de leur vie privée conservent la pleine possession de leurs identifiants API d'échange. Le bot convient également aux passionnés occasionnels de cryptomonnaies et, grâce à sa stratégie en échelle/grille, aux propriétaires de projets ou market makers souhaitant remplir les carnets d'ordres et améliorer la liquidité.

Le bot est construit sur Node.js et s'exécute en continu sur un VPS. Vous configurez l'échange cible et la paire de trading dans un fichier `config.jsonc`, fournissez les clés API de l'échange (de préférence limitées au trading, sans droit de retrait), et gérez le bot en envoyant des commandes préfixées par un slash via ADAMANT Messenger. Les notifications de trading en temps réel peuvent être envoyées vers ADAMANT Messenger, Slack et Discord. Dès sa première version, CoinOptimus prend en charge Binance, Bitfinex, P2PB2B, Azbit et StakeCube.

### Stratégie en échelle/grille

CoinOptimus utilise principalement une stratégie en échelle/grille optimale. Le bot place plusieurs ordres d'achat et de vente à partir de l'écart courant. Lorsque l'ordre le plus proche est exécuté, il place un ordre correspondant du côté opposé, selon le principe d'achat à un prix inférieur à celui de vente et de vente à un prix supérieur à celui d'achat. Cette approche donne les meilleurs résultats sur les marchés volatils.

![ADAMANT CoinOptimus : Bot de trading de cryptomonnaies open source et auto-hébergé pour traders non professionnels](/images/engineering-notes/medium/a9686139df31/002-0-tfo-ftrmwbt1zl7r.webp)

![ADAMANT CoinOptimus : Bot de trading de cryptomonnaies open source et auto-hébergé pour traders non professionnels](/images/engineering-notes/medium/a9686139df31/003-0-2twg79hid4ph-cia.webp)

### Installation et configuration

CoinOptimus cible Ubuntu 18–22 et CentOS 8, avec des dépendances sur Node.js v16+ et MongoDB v6+. L'installation consiste à cloner le [dépôt GitHub](https://github.com/Adamant-im/adamant-coinoptimus) et à exécuter `npm install`. La configuration se fait via `config.jsonc`, où vous spécifiez la phrase secrète ADAMANT du bot, l'adresse du compte administrateur autorisé à envoyer des commandes, les détails de l'échange et les clés API. Lors de la mise à jour du code source via git, examinez les modifications apportées au fichier de configuration par défaut et appliquez-les à votre `config.jsonc`, puis redémarrez le bot.

### Utilisation via ADAMANT Messenger

Le bot utilise des comptes blockchain ADAMANT identifiés par des adresses publiques et sécurisés par des phrases secrètes de 12 mots. Après installation, vous envoyez des commandes via ADAMANT Messenger. Par exemple, `/buy ADM/USDT amount=200 price=0.005` place un ordre d'achat de 200 ADM à 0,005 USDT. Pour démarrer la stratégie en échelle avec 6 ordres, un pas de prix de 3 % et environ 100 USDT par ordre, utilisez `/start ld 100 USDT 6 3%`. La référence complète des commandes est disponible dans le [Wiki CoinOptimus](https://github.com/Adamant-im/adamant-coinoptimus/wiki).

![ADAMANT CoinOptimus : Bot de trading de cryptomonnaies open source et auto-hébergé pour traders non professionnels](/images/engineering-notes/medium/a9686139df31/004-0-jinplg771dicgjt7.webp)

### Avertissement

CoinOptimus n'est pas une machine à profit garantie. Son utilisation se fait sous votre propre responsabilité.
