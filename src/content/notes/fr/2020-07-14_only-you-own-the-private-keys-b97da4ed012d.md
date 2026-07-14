---
title: "Seuls vous possédez les clés privées"
slug: "only-you-own-the-private-keys-b97da4ed012d"
description: "La différence fondamentale entre les cryptomonnaies et les comptes bancaires est la propriété : vous ne possédez pas votre compte bancaire, mais les cryptomonnaies sont entièrement à vous."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/only-you-own-the-private-keys-b97da4ed012d"
publishedAt: "2020-07-14T20:41:58.005Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b97da4ed012d/001-1-vwww-ippgzj9jadeo82tzw-png.webp"
cardSpan: "full"
originalId: "medium:b97da4ed012d"
locale: "fr"
placeholder: false
---

La différence fondamentale entre les cryptomonnaies et les comptes bancaires est la propriété : vous ne possédez pas un compte bancaire, mais les cryptomonnaies sont entièrement à vous. C'est la base de la décentralisation. ADAMANT prend en charge l'exportation des clés privées dans son application iOS depuis un an, et cette fonctionnalité est désormais disponible sur toutes les plateformes.

### Qu'est-ce qu'une clé privée ?

Une adresse de portefeuille crypto est publique, comme un numéro de compte bancaire. Une adresse ADAMANT ressemble à `U4193701161843143990`, tandis qu'une adresse Ethereum ressemble à `0x8edbf571D2973ce211ad561299419238dcC69f43`. Mais seul le propriétaire de la clé privée peut gérer le compte. Une clé privée est un code unique qui permet un accès complet à un portefeuille spécifique.

Cette clé peut prendre différentes formes. Dans ADAMANT et Lisk, il s'agit d'une phrase secrète de douze mots. Dans Ethereum et Bitcoin, il s'agit d'un ensemble de caractères.

![Seuls vous possédez les clés privées !](/images/engineering-notes/medium/b97da4ed012d/002-1-gia0n-uqgriaoa-ezm6-aa-png.webp)

Si vous ne possédez pas la clé privée, vous ne possédez pas le portefeuille. Par exemple, vous ne possédez pas les clés des portefeuilles sur les exchanges de cryptomonnaies, et vous ne pouvez pas retirer vos pièces sans l'autorisation de l'exchange. Transférer des cryptomonnaies vers un exchange signifie faire confiance à un tiers. Conservez toutes vos clés privées en lieu sûr. Si quelqu'un découvre votre clé privée, il pourra disposer de vos fonds. Personne ne pourra restituer les pièces volées — c'est le prix de la liberté et de la décentralisation.

### Portefeuilles dans ADAMANT

Pour vous connecter à ADAMANT, vous saisissez une phrase secrète de douze mots. À partir de cette phrase, différents algorithmes génèrent les clés privées pour tous les autres portefeuilles du compte, y compris Ethereum et Bitcoin. ADAMANT ne transmet jamais les clés privées sur le réseau, ce qui permet au détenteur du portefeuille de conserver un contrôle total sur son compte. Lorsque vous utilisez les portefeuilles intégrés, vous n'avez pas besoin de connaître toutes leurs clés individuelles, car elles sont toutes dérivées de la phrase secrète. Mais si vous souhaitez accéder à ces portefeuilles depuis une autre application, vous devez exporter les clés privées.

### Exportation des clés privées

L'application ADAMANT permet aux utilisateurs d'exporter leurs clés privées pour les utiliser en dehors du système du messager. Par exemple, vous pouvez accéder à vos portefeuilles Ethereum et ERC-20 via MyEtherWallet, ou sauvegarder les clés exportées. La fonction d'exportation est disponible dans les Paramètres.

![Seuls vous possédez les clés privées !](/images/engineering-notes/medium/b97da4ed012d/003-0-gzswtnmhue8pesiw.webp)

Vous êtes seul responsable de votre compte et de vos portefeuilles. Seul vous connaissez les clés privées. Si une clé privée est compromise, des tiers peuvent s'emparer des fonds associés. Dans ce cas, créez un nouveau compte ADAMANT afin que le système génère une nouvelle phrase secrète, et donc de nouvelles clés.

### FAQ Sécurité

**Les développeurs ADAMANT connaissent-ils ma phrase secrète et mes clés privées ?** Non. Le compte ADAMANT, la phrase secrète et les clés privées sont créés sur votre appareil. Si vous utilisez l'application sur un PC, ils sont créés sur le PC ; sur un téléphone mobile, sur le téléphone. Les clés privées ne quittent jamais votre appareil. Lorsque vous effectuez un paiement ou envoyez un message, seule une transaction signée est envoyée au nœud. Cela s'applique à toutes les cryptomonnaies intégrées à ADAMANT.

**Comment puis-je vérifier qu'ADAMANT n'envoie pas les clés privées sur le réseau ?** Le code source est entièrement ouvert et disponible sur GitHub.

**Mes phrase secrète et clés privées sont-elles impossibles à voler ?** Non. Si votre appareil est compromis, quelqu'un pourrait voler les clés. Des exemples incluent une extension de navigateur qui envoie des données à des tiers, un keylogger qui enregistre toutes les frappes, un virus qui analyse la mémoire, ou l'utilisation d'une application de messagerie phishing (par exemple, `msg.adamant.io` au lieu de `msg.adamant.im`).

**Est-il nécessaire d'exporter les clés privées ?** Non. Le fait de stocker des clés augmente le risque que quelqu'un d'autre les voie et vole les pièces.

**Si quelqu'un vole mes clés privées pour les portefeuilles intégrés, aura-t-il également accès aux messages ADAMANT ?** Non. Les clés privées exportées donnent accès uniquement aux portefeuilles cryptos intégrés. De plus, si un attaquant vole la clé d'une cryptomonnaie (par exemple, Doge), il ne peut pas accéder aux portefeuilles Ethereum ou Dash.

**Si quelqu'un vole ma phrase secrète ADAMANT, aura-t-il accès à tous les portefeuilles cryptos intégrés ?** Oui. Il aura accès à la fois aux messages et aux portefeuilles, c'est pourquoi il est essentiel de garder la phrase secrète confidentielle.

**Phrase secrète ou clés privées volées — que faire ?** Créez un nouveau compte. S'il reste des pièces sur l'ancien, transférez-les vers le nouveau compte.

**Où puis-je utiliser les clés privées exportées ?** Les clés exportées par ADAMANT sont compatibles avec plusieurs applications tierces. Pour Bitcoin, Electrum, Blockchain.com, et tout portefeuille prenant en charge le format de clé WIF fonctionnent. Pour Ethereum, MyEtherWallet est pris en charge. Pour Doge, MultiDoge. Pour Dash, Dash Electrum. Pour Lisk, un nœud API est requis ; aucune application connue ne permet d'importer directement la clé privée, car on ne peut pas générer une phrase secrète à partir d'une clé.
