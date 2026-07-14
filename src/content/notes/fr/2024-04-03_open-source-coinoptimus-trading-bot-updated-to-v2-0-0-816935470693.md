---
title: "CoinOptimus Trading Bot mis à jour vers la v2.0.0"
slug: "open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
description: "ADAMANT CoinOptimus, un bot de trading de cryptomonnaies auto-hébergé conçu pour les traders non professionnels, a été mis à jour vers la version 2.0.0. La version inclut du refactoring, des corrections de bogues…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
publishedAt: "2024-04-03T11:29:39.685Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/816935470693/001-1-yi0sr85whds3uma4ith6na-png.webp"
cardSpan: "full"
originalId: "medium:816935470693"
locale: "fr"
placeholder: false
---

ADAMANT CoinOptimus, un bot de trading de cryptomonnaies auto-hébergé conçu pour les traders non professionnels, a été mis à jour vers la version 2.0.0. La version inclut du refactoring, des corrections de bogues et cinq nouvelles commandes : `/fill`, `/stats`, `/deposit`, `/account` et `/info`.

### Nouvelles commandes

La commande `/fill` remplit un carnet d'ordres avec une série d'ordres en une seule étape.

![Bot de trading open-source CoinOptimus mis à jour vers la v2.0.0](/images/engineering-notes/medium/816935470693/002-0-p-pmlz9g0oqkhlzh.webp)

La commande `/stats` affiche les statistiques de la paire de trading, incluant les prix, les plus bas, les plus hauts, le volume de trading, l'offre la plus élevée du carnet d'ordres, la demande la plus basse, l'écart et la liquidité du carnet d'ordres.

![Bot de trading open-source CoinOptimus mis à jour vers la v2.0.0](/images/engineering-notes/medium/816935470693/003-1-ghu8f-ht7mxhagdmaqo1ag-png.webp)

La commande `/deposit` renvoie une adresse pour recharger un compte d'échange sur différentes blockchains.

![Bot de trading open-source CoinOptimus mis à jour vers la v2.0.0](/images/engineering-notes/medium/816935470693/004-0-j-uwsyddj1i6k3d7.webp)

La commande `/account` affiche les frais de trading et le volume mensuel de trading pour le compte du bot, lorsque disponibles.

![Bot de trading open-source CoinOptimus mis à jour vers la v2.0.0](/images/engineering-notes/medium/816935470693/005-0-vfvn8x-wf1ohwg8a.webp)

La commande `/info` affiche toutes les informations disponibles pour une pièce et une blockchain spécifiques.

![Bot de trading open-source CoinOptimus mis à jour vers la v2.0.0](/images/engineering-notes/medium/816935470693/006-0-n5uqmmhtmdcwjbe3.webp)

### Fonctionnement de CoinOptimus

CoinOptimus est une application Node.js qui s'exécute en continu sur un serveur ou un VPS. Vous la configurez avec un exchange, une paire de trading et des clés API provenant de votre compte d'échange. Le bot gère les stratégies de trading et passe des ordres en fonction des commandes que vous envoyez via ADAMANT Messenger, en répondant en conséquence.

Le bot utilise principalement la stratégie de trading Optimal Ladder/Grid, plaçant plusieurs ordres d'achat et de vente avec des prix partant de l'écart. Lorsque l'ordre le plus proche de l'écart est exécuté, le bot ajoute un ordre similaire du côté opposé, suivant le principe d'achat à un prix inférieur à celui de vente et de vente à un prix supérieur à celui d'achat. Cette approche est particulièrement efficace sur les marchés volatils.

![Bot de trading open-source CoinOptimus mis à jour vers la v2.0.0](/images/engineering-notes/medium/816935470693/007-0-twtuzn4rmej2q4s8.webp)

![Bot de trading open-source CoinOptimus mis à jour vers la v2.0.0](/images/engineering-notes/medium/816935470693/008-0-ruyx47yeeapvvo4r.webp)

Les instructions d'installation sont disponibles dans le [README du dépôt](https://github.com/Adamant-im/adamant-coinoptimus#usage-and-installation). CoinOptimus n'est pas une machine à profit garantie ; utilisez-le à vos propres risques.
