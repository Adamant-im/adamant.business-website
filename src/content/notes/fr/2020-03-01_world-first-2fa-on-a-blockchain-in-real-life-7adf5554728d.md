---
title: "Première mondiale : 2FA basée sur la blockchain en production : ADAMANT sur Resfinex"
slug: "world-first-2fa-on-a-blockchain-in-real-life-7adf5554728d"
description: "L'authentification à deux facteurs basée sur la blockchain, utilisant ADAMANT Messenger, est désormais en production sur l'exchange Resfinex, éliminant les vulnérabilités des SMS."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/world-first-2fa-on-a-blockchain-in-real-life-7adf5554728d"
publishedAt: "2020-03-01T07:19:10.858Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/7adf5554728d/001-0-hktm6vjfrwccv7kd.webp"
cardSpan: "full"
originalId: "medium:7adf5554728d"
locale: "fr"
placeholder: false
---

L’authentification à deux facteurs est essentielle pour protéger les fonds, mais toutes les méthodes de 2FA ne sont pas également sécurisées. La 2FA par SMS est particulièrement vulnérable aux attaques par vol de carte SIM, responsables de pertes importantes de cryptomonnaies. La 2FA basée sur la blockchain offre une alternative plus fiable en envoyant les codes d’authentification via un messager intégré à la chaîne, éliminant ainsi complètement la surface d’attaque liée aux télécommunications.

### 2FA ADAMANT sur l’exchange Resfinex

L’exchange de cryptomonnaies Resfinex est la première mise en œuvre en production d’une 2FA basée sur la blockchain, utilisant ADAMANT Messenger pour la livraison des codes d’authentification. Le processus de configuration est simple : l’utilisateur accède aux paramètres de sécurité, sélectionne la méthode de 2FA ADAMANT Messenger, puis indique son adresse ADAMANT où les codes seront reçus. Les nouveaux utilisateurs ADAMANT ont besoin d’une petite quantité d’ADM pour initialiser leur compte. Après avoir saisi le code de vérification et le mot de passe de l’exchange, la 2FA est activée.

![Première mondiale 2FA sur une blockchain en situation réelle](/images/engineering-notes/medium/7adf5554728d/002-0-xvtbn00u-d5nvyzb.webp)

![Première mondiale 2FA sur une blockchain en situation réelle](/images/engineering-notes/medium/7adf5554728d/003-0-necwvzuliwggpf2c.webp)

![Première mondiale 2FA sur une blockchain en situation réelle](/images/engineering-notes/medium/7adf5554728d/004-0-to4kuxsaixckgh5j.webp)

![Première mondiale 2FA sur une blockchain en situation réelle](/images/engineering-notes/medium/7adf5554728d/005-0-kexa5qysqrmab0vf.webp)

![Première mondiale 2FA sur une blockchain en situation réelle](/images/engineering-notes/medium/7adf5554728d/006-0-f1qr6w3udghq575k.webp)

![Première mondiale 2FA sur une blockchain en situation réelle](/images/engineering-notes/medium/7adf5554728d/007-0-a-sfwulbvejil2rl.webp)

Une fois activée, les codes 2FA sont requis pour les connexions, les confirmations de retrait, les changements de mot de passe, la création de clés API, ainsi que pour les modifications des paramètres de sécurité ou d’autres paramètres sensibles du compte.

### Mettre en œuvre la 2FA blockchain dans votre service

Tout fournisseur de services, y compris les exchanges et institutions financières, peut intégrer la 2FA ADAMANT. ADAMANT est un projet entièrement open source, avec documentation et guides d’implémentation disponibles. Le code source de l’application démo 2FA ADAMANT est disponible sur [GitHub](https://github.com/Adamant-im/adamant-2fa), et un [guide de connexion](https://medium.com/adamant-im/go-to-secure-2fa-on-a-blockchain-344500a5f010#db04) est fourni à destination des développeurs.

![Première mondiale 2FA sur une blockchain en situation réelle](/images/engineering-notes/medium/7adf5554728d/008-0-1zqjg9sgj2eli5h5.webp)

![Première mondiale 2FA sur une blockchain en situation réelle](/images/engineering-notes/medium/7adf5554728d/009-0-wdowhqndtnflq0oy.webp)
