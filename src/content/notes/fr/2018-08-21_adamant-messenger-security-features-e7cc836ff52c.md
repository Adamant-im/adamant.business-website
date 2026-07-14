---
title: "Fonctionnalités de sécurité d'ADAMANT Messenger"
slug: "adamant-messenger-security-features-e7cc836ff52c"
description: "ADAMANT est un messager privé fonctionnant entièrement sur une blockchain. En stockant chaque message comme une transaction sur la chaîne, il corrige les failles de sécurité typiques des messagers pair-à-pair et centralisés."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-security-features-e7cc836ff52c"
publishedAt: "2018-08-21T13:14:09.919Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e7cc836ff52c/001-0-ed-frrpe89f-d93u.webp"
cardSpan: "full"
originalId: "medium:e7cc836ff52c"
locale: "fr"
placeholder: false
---

ADAMANT est un messager privé qui fonctionne entièrement sur une blockchain. En stockant chaque message comme une transaction sur la chaîne, il corrige les failles de sécurité typiques des messagers pair-à-pair et centralisés, offrant un modèle de confiance différent pour les communications privées.

## Chiffrement et signature

Chaque message est une transaction blockchain, chiffrée et signée à l’aide d’Ed25519 EdDSA, Curve25519, Salsa20 et Poly1305. Les messages sont chiffrés sur l’appareil de l’expéditeur et déchiffrés sur celui du destinataire. L’application cliente n’envoie jamais la clé privée ou la phrase de récupération mnémonique d’un utilisateur sur le réseau ; toutes les opérations cryptographiques sont effectuées localement.

Étant donné que chaque compte est identifié par sa clé publique sur la chaîne, l’authenticité de l’expéditeur et du destinataire peut être vérifiée. Les attaques de type man-in-the-middle sont détectables : si un attaquant intercepte et relaie des messages, l’identifiant de l’expéditeur ne correspondra pas à la clé publique attendue, révélant ainsi l’interception.

## La blockchain comme stockage de messages

La blockchain sert de couche de stockage redondante et fiable pour l’historique des messages. Les messages ne peuvent pas être datés rétroactivement ni modifiés après leur confirmation, et la livraison est à la fois signée et confirmée par le réseau. L’historique des messages n’est jamais stocké sur la machine locale de l’utilisateur ; il est chargé directement depuis la blockchain à la demande. Cela signifie également qu’un utilisateur peut accéder à son historique complet depuis n’importe quel appareil, de manière similaire à un modèle de stockage centralisé, mais sans autorité centrale contrôlant les données.

## Architecture décentralisée

ADAMANT fonctionne sur un réseau décentralisé de nœuds blockchain gérés par les utilisateurs. Aucune autorité centrale ne peut désactiver, suspendre ou bloquer le service. Les comptes ne peuvent être fermés ou limités par personne, y compris les développeurs du projet. Les développeurs ne contrôlent pas les actions des utilisateurs sur le réseau.

## Confidentialité et anonymat

Contrairement aux messagers P2P, où l’adresse IP d’un pair peut être visible, toutes les communications ADAMANT transitent par des nœuds blockchain, rendant impossible l’obtention directe de l’adresse IP d’un utilisateur. Cela équivaut conceptuellement à un routage via un réseau Tor.

Le messager ne demande aucun accès au carnet d’adresses, à la localisation ou à d’autres données de l’appareil. Aucun numéro de téléphone n’est requis pour la création de compte ou la récupération d’accès, éliminant ainsi l’interception SMS comme vecteur d’attaque. Les comptes peuvent être créés en quelques secondes, et les utilisateurs peuvent modifier librement leur UID et leurs clés de chiffrement. Aucune identification personnelle n’est requise.

## Open source

ADAMANT est entièrement open source, permettant une revue indépendante des applications clientes et du logiciel des nœuds.

![Fonctionnalités de sécurité d'ADAMANT Messenger](/images/engineering-notes/medium/e7cc836ff52c/002-0-qtvvnsefdgux9haq.webp)
