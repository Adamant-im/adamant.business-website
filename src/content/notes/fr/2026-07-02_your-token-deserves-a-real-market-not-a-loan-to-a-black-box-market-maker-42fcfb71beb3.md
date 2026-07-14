---
title: "Market Making Auto-Hébergé pour les Jetons Cotés en CEX avec ADAMANT v9.0.0"
slug: "your-token-deserves-a-real-market-not-a-loan-to-a-black-box-market-maker-42fcfb71beb3"
description: "Après un listing en CEX, les émetteurs de jetons font face à un carnet d'ordres mince et des spreads larges. ADAMANT v9.0.0 propose une solution auto-hébergée et contrôlée."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/your-token-deserves-a-real-market-not-a-loan-to-a-black-box-market-maker-42fcfb71beb3"
publishedAt: "2026-07-02T07:55:48.528Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/42fcfb71beb3/001-1-abbad98f8omjn6vedmkhag-png.webp"
cardSpan: "full"
originalId: "medium:42fcfb71beb3"
locale: "fr"
placeholder: false
---

Après un listing en CEX, les émetteurs de jetons font souvent face à un carnet d'ordres mince, à des spreads larges, et à un graphique qui pénalise les petits échanges. La solution classique consiste à prêter des jetons et partager des clés API avec un market maker tiers fonctionnant sur une infrastructure opaque. Le logiciel ADAMANT Market-Making v9.0.0 propose une alternative : une pile de market making auto-hébergée et auto-contrôlée que vous installez comme un logiciel classique — sans besoin de `git clone`, ni transfert de custody.

### Le modèle : auto-hébergé, auto-contrôlé

Le market making traditionnel implique généralement d’envoyer des jetons à un tiers, de partager des clés API avec une boîte noire, et d’espérer que le carnet d’ordres semble sain — et que vous puissiez récupérer vos actifs. ADAMANT inverse ce modèle en vous permettant d’exécuter la pile de market making sur votre propre serveur, avec votre propre compte d’échange et vos propres clés.

![Votre jeton mérite un vrai marché — pas un prêt à un market maker en boîte noire](/images/engineering-notes/medium/42fcfb71beb3/002-1-ej9ccmio-dhslxvzftc6xw-png.webp)

Comparaison entre le market making en custody et le logiciel de market making d’ADAMANT

### Ce que fait la version v9 pour votre graphique

L’édition open source gratuite se concentre sur les problèmes critiques juste après un listing. Elle construit le carnet d’ordres en comblant les lacunes afin que le carnet ne paraisse pas abandonné, maintient des spreads bid/ask plus serrés pour éviter une première impression négative, et fournit de la profondeur pour que les petits échanges ne provoquent pas de fortes variations de prix. Elle surveille les fourchettes de prix que vous définissez et applique des politiques de volume selon les modes spread, carnet d’ordres, profondeur et optimal. La surveillance est transparente : les soldes, ordres et statistiques sont accessibles via un contrôle par commande à travers ADAMANT Messenger, sans panneau d’administration public exposé par défaut.

Les connecteurs CEX pris en charge dans la version open source incluent Azbit, P2PB2B, StakeCube, Coinstore, FameEX et NonKYC. Des options premium et des connecteurs personnalisés sont disponibles pour d’autres échanges.

### Démarrage (méthode npm)

Vous avez besoin d’un serveur Linux ou Mac (ou toute machine supportant npm), de Node.js 22+, de MongoDB, et d’une clé API CEX pour votre propre compte.

![Votre jeton mérite un vrai marché — pas un prêt à un market maker en boîte noire](/images/engineering-notes/medium/42fcfb71beb3/003-1-duiackkmcteg8he9ccmqdq-png.webp)

Registre npm officiel

Installez le package globalement et créez un répertoire de travail :

```bash
npm install -g adamant-tradebot
mkdir my-mm && cd my-mm
```

La commande CLI est `mm`. Configurez le bot via un assistant interactif, puis lancez une vérification de santé :

```bash
mm init    # interactive wizard - exchange, pair, API keys
mm doctor  # checks config, MongoDB, exchange API
```

Aucun jeton ne quitte votre exchange pour financer un market maker. Vous connectez uniquement vos identifiants API à votre bot sur votre propre machine. Démarrez et vérifiez le statut :

```bash
mm on
mm status
```

Envoyez `/balances` à votre bot depuis votre compte ADM administrateur et vous êtes opérationnel. Arrêtez à tout moment avec `mm off`, et consultez les journaux avec `mm logs`.

### Alternative Docker

Vous pouvez aussi récupérer l’image publiée depuis GitHub Container Registry :

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

MongoDB s’exécute dans Compose aux côtés de l’application, avec la configuration et les journaux stockés dans des volumes locaux que vous contrôlez.

### Pourquoi la v9 est une étape clé

Avant la v9, démarrer impliquait de cloner un dépôt et de configurer les dépendances soi-même — acceptable pour les développeurs, mais une friction pour les fondateurs qui veulent simplement un carnet d’ordres plus sain. La v9.0.0 apporte une distribution officielle via npm et GHCR, une CLI `mm` avec les commandes `init`, `on`, `off`, `doctor`, `status`, `logs` et `config`, une publication CI/CD pour npm et Docker à chaque publication GitHub, un moteur refondu couvrant le trader, le constructeur de carnet d’ordres, le fournisseur de liquidité et le surveilleur de prix, ainsi que des suites de tests Jest et de la documentation.

ADAMANT est un projet cryptographique open source avec dix ans de développement public.

### À qui cela s’adresse

Ce logiciel cible les émetteurs de jetons après un listing CEX avec un carnet d’ordres faible ou vide, les équipes qui ne peuvent pas se permettre des frais de rétention à six chiffres plus des prêts de jetons, les fondateurs qui ne font pas confiance à des tiers opaques, et les projets qui exigent de la transparence — la capacité de lire le code, surveiller les journaux, et contrôler l’interrupteur d’arrêt. Des modules premium existent pour des stratégies avancées, une interface web, d’autres échanges ou une assistance à la configuration. La version open source gratuite est conçue pour être utile en tant que telle.

### Une note sur la responsabilité

Le market making doit respecter les règles des exchanges et la législation applicable. ADAMANT fournit un logiciel, pas la custody ou l’exécution en votre nom. Vous le configurez, vous l’exécutez, et restez responsable de son utilisation.
