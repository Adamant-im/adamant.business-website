---
title: "Configurer la Blockchain comme fournisseur OTP 2FA"
slug: "set-up-blockchain-as-an-otp-2fa-provider-f87575c27175"
description: "ADAMANT est une infrastructure de messagerie décentralisée incluant une blockchain, un explorateur, des apps de messagerie avec portefeuilles cryptos, un échangeur, un logiciel de forging, un bot bounty, et un service 2FA OTP."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/set-up-blockchain-as-an-otp-2fa-provider-f87575c27175"
publishedAt: "2022-12-18T15:14:19.999Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f87575c27175/001-1-g0bpvqabqrk2sobncqoicw-png.webp"
cardSpan: "full"
originalId: "medium:f87575c27175"
locale: "fr"
placeholder: false
---

ADAMANT est une infrastructure de messagerie décentralisée qui inclut une blockchain, un explorateur, des applications de messagerie avec portefeuilles cryptos, un échangeur, un logiciel de pool de forging, un bot de bounty et un fournisseur de service 2FA OTP. Le 2FA OTP utilise des mots de passe à usage unique comme couche de sécurité supplémentaire pour la connexion à des sites web et services tels que les exchanges de cryptomonnaies, les fournisseurs de messagerie, les portefeuilles conservateurs et les comptes sociaux. ADAMANT est le premier fournisseur 2FA à distribuer des mots de passe à usage unique via la blockchain.

L'avantage principal du 2FA basé sur la blockchain est la décentralisation. Les fournisseurs OTP traditionnels s'appuient sur des serveurs centralisés ou des passerelles SMS, qui peuvent tous deux être compromis ou mis hors ligne. En revanche, le service 2FA d'ADAMANT distribue les codes via son propre réseau blockchain, ce qui signifie qu'il n'existe aucun point de défaillance unique et aucun intermédiaire tiers susceptible d'intercepter ou de retarder les messages d'authentification.

Pour tester le service, créez d'abord un compte ADAMANT Messenger, là où vous recevrez les codes 2FA. Ensuite, exécutez l'application de démonstration 2FA et inscrivez-vous à un nouveau compte en utilisant un identifiant et un mot de passe classiques. Après vous être connecté, appuyez sur « Activer le 2FA » et saisissez votre adresse ADAMANT. Cliquez sur le bouton « Obtenir le code 2FA », et un code 2FA sera envoyé à votre ADAMANT Messenger. Saisissez ce code puis appuyez sur « Vérifier ». Une fois activé, vous devrez fournir un code 2FA à chaque déconnexion et reconnexion, démontrant ainsi le flux d'authentification complet.

Les fournisseurs de services web peuvent intégrer le 2FA ADAMANT pour renforcer la sécurité des comptes utilisateurs. Le service est open source et conçu pour être intégré dans des flux d'authentification existants nécessitant un second facteur.
