---
title: "ADAMANT Web App 2.1 : Partage par QR, accès aux bots et améliorations du transfert de jetons"
slug: "adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
description: "La mise à jour ADAMANT Web App 2.1 améliore l'efficacité du messager et facilite l'adhésion. Les nouveaux comptes ont désormais un accès immédiat à deux bots."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
publishedAt: "2019-10-02T06:50:35.550Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ffbc0ebc656/001-1-l-nswrbv8xnsm1omxvshqg-png.webp"
cardSpan: "full"
originalId: "medium:4ffbc0ebc656"
locale: "fr"
placeholder: false
---

La mise à jour ADAMANT Web App 2.1 se concentre sur l'efficacité du messager et une intégration plus simple. Les nouveaux comptes ont désormais un accès immédiat à deux bots — un bot d'échange et un bot de pari — sans configuration supplémentaire.

Cliquer sur une adresse de portefeuille affiche trois options : copier l'adresse dans le presse-papiers, copier un lien de discussion partageable, ou afficher un code QR. Le format du lien de partage suit le modèle `https://msg.adamant.im/?address=U14236667426471084862`, ce qui permet aux destinataires de commencer à discuter immédiatement. Les codes QR sont désormais également affichés dans la section « Informations du partenaire » lorsque vous cliquez sur l'icône d'un contact.

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/002-1-ca218mdchy7u6byjnmqxha-png.webp)

Le partage par QR est utile pour échanger des contacts en personne, car il ne laisse aucune trace enregistrable. Un seul code QR peut encoder non seulement une adresse, mais aussi une étiquette de contact, un montant de jeton et un message de salutation. L'application analyse automatiquement les liens du presse-papiers et remplit les champs correspondants. Par exemple, ce lien ouvre une discussion avec un contact étiqueté, un montant de jeton prédéfini et un message :

```
https://msg.adamant.im/?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
```

Lors du transfert de jetons, l'application prend en charge des préréglages de montant rapides, vous permettant d'envoyer la totalité des fonds disponibles ou une fraction, comme un tiers, sans saisie manuelle.

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/004-1-dmv7hxalesdxspouol49ka-png.webp)

Ces fonctionnalités sont basées sur les ADAMANT Improvement Proposals (AIPs), une collection ouverte de suggestions d'améliorations d'application hébergée dans le [dépôt AIPs sur GitHub](https://github.com/Adamant-im/AIPs). Parallèlement à l'application web, les versions Tor, Windows et Linux ont été mises à jour et sont disponibles dans [la version 2.1 sur GitHub](https://github.com/Adamant-im/adamant-im/releases/tag/v2.1.0).

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/003-1-2hnq5ol3qs8fauymp6vxa-png.webp)
