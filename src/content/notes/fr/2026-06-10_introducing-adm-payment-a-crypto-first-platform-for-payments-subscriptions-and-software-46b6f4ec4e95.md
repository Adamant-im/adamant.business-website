---
title: "Présentation d'ADM-Payment : une plateforme axée crypto pour les paiements, abonnements et licences logiciels"
slug: "introducing-adm-payment-a-crypto-first-platform-for-payments-subscriptions-and-software-46b6f4ec4e95"
description: "Découvrez ADM Payment, une plateforme auto-hébergée axée crypto pour la monétisation de logiciels, abonnements et licences, conçue pour le Web3, SaaS et outils automatisés."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/introducing-a-payment-a-crypto-first-platform-for-payments-subscriptions-and-software-licensing-46b6f4ec4e95"
publishedAt: "2026-06-10T16:33:29.168Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/46b6f4ec4e95/001-1-ikwbquslxdsnxlvmcfgy5a-png.webp"
cardSpan: "full"
originalId: "medium:46b6f4ec4e95"
locale: "fr"
placeholder: false
---

### Présentation d'ADM-Payment

Monétiser un logiciel ne devrait pas nécessiter une chaîne fragile de services déconnectés. Pour de nombreux produits — notamment dans le Web3, le trading, le SaaS, l’automatisation et les infrastructures auto-hébergées — le défi réel n’est pas seulement d’accepter un paiement, mais de gérer l’ensemble du flux commercial : authentification, passage à la caisse, logique de facturation, abonnements, délivrance de licences, validation des licences, opérations administratives, gestion des utilisateurs, renouvellements, essais et accès aux produits.

ADAMANT Payment (*ADM-Payment*) est une plateforme universelle, auto-hébergée et prioritairement conçue pour les cryptomonnaies, destinée aux paiements, abonnements et gestion des licences logiciels. Elle est actuellement publiée comme un projet en cours avec une version bêta opérationnelle. La plateforme est conçue comme un produit indépendant, non lié à ADAMANT Messenger ou à une application unique. La première intégration interne concerne les abonnements à l’interface Web de ADAMANT Tradebot, mais la plateforme est pensée pour un éventail bien plus large de produits, incluant les bots, plateformes SaaS, applications de bureau, services Web3, outils privés, API commerciales et logiciels auto-hébergés.

### Pourquoi cela a été créé

La plupart des solutions modernes de monétisation logicielle ont été conçues autour des paiements traditionnels en monnaie fiduciaire. Cela convient à de nombreuses entreprises, mais devient limitant lorsque le produit est natif crypto, mondial, auto-hébergé, soucieux de confidentialité, ou vendu à des utilisateurs qui préfèrent ne pas dépendre des circuits bancaires traditionnels. Une configuration typique peut nécessiter des services distincts pour l’authentification, les paiements, les abonnements et les clés de licence, ainsi que des scripts personnalisés pour l’accès au produit, un panneau d’administration développé sur mesure, des webhooks, des rappels, des bases de données interconnectées et des flux de support manuels.

ADM-Payment rassemble tous ces éléments en une seule plateforme cohérente. Un éditeur de produit peut définir des forfaits, accepter des paiements en crypto, émettre des licences, gérer des utilisateurs et permettre à des logiciels externes de valider l’accès via une API — sans avoir à reconstruire à chaque fois toute la couche de monétisation.

### Modules principaux

La plateforme regroupe dans une solution auto-hébergée l’authentification, la facturation, les paiements en crypto, les essais et licences payantes, les abonnements, les licences promotionnelles et manuelles, un portail web pour les utilisateurs, un tableau de bord administrateur, une API de validation des licences, la personnalisation de marque, l’internationalisation et des fonctionnalités de sécurité opérationnelle.

Les paiements sont conçus dès l’origine pour les cryptomonnaies, et non ajoutés comme complément tardif. Le périmètre actuel inclut les paiements en Bitcoin via un BTCPay Server auto-hébergé, les paiements natifs ADAMANT avec des adresses de dépôt uniques et une surveillance de la chaîne, ainsi qu’un fournisseur de développement pour tester les flux. L’architecture est conçue pour permettre l’ajout ultérieur de nouveaux fournisseurs de paiement (Ethereum, ERC20, stablecoins, etc.) et de nouvelles blockchains sans devoir réécrire le cœur de la facturation.

![Se connecter avec un portefeuille Ethereum](/images/engineering-notes/medium/46b6f4ec4e95/002-1-uvvnwb38hzdf94wtr5rkra-png.webp)

![Accepter des paiements en crypto](/images/engineering-notes/medium/46b6f4ec4e95/003-1-18j1i2bwffpurrfyebeoqg-png.webp)

Pour les utilisateurs, ADM-Payment offre une interface web claire pour la connexion, la consultation du catalogue, le passage à la caisse et la gestion des licences. Pour les éditeurs de produits, elle fournit un tableau de bord administrateur pour gérer les comptes, licences, factures, portefeuilles, forfaits et droits d’accès. Pour les logiciels externes, elle propose une validation des licences par API, permettant à un bot, un backend SaaS, un relais, une application de bureau ou tout autre produit de vérifier par programme si un utilisateur dispose d’un accès actif.

### Cas d’utilisation ciblés

ADM-Payment est une couche de monétisation, pas seulement une page de paiement. Elle est particulièrement utile pour les bots de trading et outils d’automatisation nécessitant un accès basé sur licence, des forfaits d’abonnement, des restrictions par marché ou par exchange, et des déploiements privés. Un développeur de bot de trading peut créer des forfaits tels que Basique, Pro ou Entreprise ; les utilisateurs paient en crypto, reçoivent des licences, et le bot valide l’accès via l’API. Les licences peuvent être limitées par des paramètres spécifiques au produit, tels que l’exchange et la paire de trading, permettant un contrôle d’accès précis allant au-delà d’un simple modèle payant ou non.

Pour les produits SaaS ayant des utilisateurs natifs crypto, ADM-Payment permet d’accepter des cryptomonnaies, gérer les abonnements et contrôler l’accès sans dépendre entièrement de processeurs de paiement traditionnels. Les applications de bureau et outils privés peuvent l’utiliser comme backend de licence et de facturation en appelant l’API de validation pour vérifier si une licence est active. Les services Web3 bénéficient de flux d’authentification orientés crypto, incluant la connexion via portefeuille ADM et Ethereum, en complément de la connexion classique par e-mail. Les produits commerciaux auto-hébergés peuvent déployer et adapter la plateforme à leurs propres règles au lieu de dépendre d’un service SaaS de licence fermé.

La plateforme prend en charge la logique d’essai avec inscription automatique tout en appliquant des règles telles qu’un seul essai par périmètre défini. Elle inclut également des types de licences payantes, d’essai, promotionnelles et manuelles, offrant aux opérateurs une grande flexibilité sans modification directe de la base de données. La personnalisation de marque peut être configurée via des variables d’environnement, et le modèle de données utilise des identifiants génériques de produit au lieu d’hypothèses spécifiques à ADAMANT, ce qui la rend adaptée aux déploiements en marque blanche pour plusieurs produits.

### Architecture technique

ADM-Payment est construite comme un monorepo moderne utilisant `pnpm` et Turborepo. Le périmètre de la v1.0.0 inclut un backend d’API Fastify 5, un ORM Prisma, une base de données PostgreSQL, un frontend React 18 avec Vite, des applications web séparées pour les utilisateurs et pour l’administration, des packages partagés pour la logique commune, des sessions JWT avec cookies de rafraîchissement, une authentification par code-message ADM, une authentification SIWE Ethereum, une authentification par e-mail et mot de passe, un captcha Turnstile, une intégration BTCPay Server pour les paiements Bitcoin, un fournisseur de paiement ADAMANT natif avec adresses de dépôt uniques et observateur de chaîne, des webhooks idempotents, une clé API administrateur, une 2FA optionnelle, une limitation par IP et empreinte numérique, une journalisation des audits, une localisation i18n et une intégration continue GitHub Actions pour l’installation, la génération Prisma, la construction, l’analyse statique et la vérification des types.

L’architecture sépare clairement les zones destinées aux utilisateurs et celles destinées à l’administration. Les produits externes interagissent avec la plateforme via des points de terminaison API pour valider les licences ou vérifier le statut d’abonnement. Cette approche centrée sur l’API signifie que ADM-Payment n’est pas seulement une page de paiement, mais un service backend sur lequel d’autres logiciels peuvent s’appuyer.

Les contrôles de sécurité sont intégrés au niveau de l’architecture : zones utilisateur et administrateur distinctes, flux d’authentification protégés, contrôle d’accès, API de validation de licence sécurisée, clé API administrateur, 2FA optionnelle ADM et ETH, prise en charge du captcha, limitation par IP et empreinte numérique, et journalisation des audits. L’authentification par portefeuille permet aux utilisateurs de s’authentifier via des identités crypto au lieu d’être contraints à des comptes e-mail uniquement, tandis que la connexion par e-mail et mot de passe reste disponible pour les utilisateurs traditionnels.

### État actuel

ADM-Payment est un projet en cours avec une version bêta opérationnelle. La base est déjà utilisable, mais le produit continue d’être amélioré avec un polissage progressif des flux, une expansion de la documentation et la collecte de retours concrets d’intégration. La direction actuelle de publication inclut les fondations de la plateforme v1.0.0, la première intégration en production étant centrée sur les abonnements à l’interface Web de ADAMANT Tradebot. La feuille de route prévoit l’ajout de nouveaux fournisseurs de paiement, de nouvelles blockchains, une documentation OpenAPI, l’automatisation du renouvellement des abonnements et des intégrations pour des produits tiers.

### Captures d’écran

![Interface utilisateur : Options de connexion](/images/engineering-notes/medium/46b6f4ec4e95/004-1-cqwvqqbxknkp-uvuuknxrq-png.webp)

![Interface utilisateur : Forfaits d’abonnement](/images/engineering-notes/medium/46b6f4ec4e95/005-1-t37cypcdhaysabgjilzivg-png.webp)

![Interface utilisateur : Licences](/images/engineering-notes/medium/46b6f4ec4e95/006-1-3kfx3yvszqtpokjjjvsexa-png.webp)

![Tableau de bord administrateur : Comptes](/images/engineering-notes/medium/46b6f4ec4e95/007-1-bp6rl5dl-yi5cq0-elmo1q-png.webp)

![Tableau de bord administrateur : Licences](/images/engineering-notes/medium/46b6f4ec4e95/008-1-wpdhnvtgoltez8bgcjxjyg-png.webp)

![Tableau de bord administrateur : Factures](/images/engineering-notes/medium/46b6f4ec4e95/009-1-o-3ouw6yormfxhtyk3npbw-png.webp)

![Tableau de bord administrateur : Émission manuelle de licence (option)](/images/engineering-notes/medium/46b6f4ec4e95/010-1-kg3c6muwymo6kftbchh2jg-png.webp)

![Tableau de bord administrateur : Paiements ADM](/images/engineering-notes/medium/46b6f4ec4e95/011-1-ypzmklcvz81nqi7rh7fyrg-png.webp)

![Tableau de bord administrateur : Paiements BTC](/images/engineering-notes/medium/46b6f4ec4e95/012-1-pygj4qnhxawlioosdttx5a-png.webp)
