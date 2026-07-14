---
title: "Les messageries décentralisées ont besoin de temps"
slug: "decentralized-messaging-needs-a-time-d5af2289041c"
description: "par Aleksei Lebedev, fondateur d'ADAMANT Messenger L'intrusion dans la vie privée est devenue banale à mesure que la technologie s'immisce dans la vie quotidienne."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/decentralized-messaging-needs-a-time-d5af2289041c"
publishedAt: "2020-04-06T10:21:32.885Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/d5af2289041c/001-0-cubdo3cy7xzrqg2m.webp"
cardSpan: "full"
originalId: "medium:d5af2289041c"
locale: "fr"
placeholder: false
---

*par Aleksei Lebedev, fondateur d'ADAMANT Messenger*

L'intrusion dans la vie privée est devenue banale à mesure que la technologie s'immisce dans la vie quotidienne. La messagerie est l'une des formes de communication en ligne les plus courantes, pourtant peu d'utilisateurs réfléchissent sérieusement à l'endroit où leurs données vont une fois le message envoyé. Les messageries populaires appartiennent à de grandes entreprises qui collectent autant d'informations personnelles que possible — connexions, utilisation de l'application, transactions, et même les données que d'autres fournissent à votre sujet. Ces données sont stockées sur des serveurs centralisés régulièrement piratés, prouvant ainsi que même les plus grandes entreprises ne peuvent garantir la sécurité.

### À qui faire confiance

La réponse courte : ne faire confiance à personne. Signal, souvent cité comme messagerie sécurisée, identifie encore les utilisateurs par leur numéro de téléphone. C'est précisément pourquoi Bitcoin et les applications décentralisées existent — pour fonctionner dans un environnement sans confiance. La technologie blockchain introduit une architecture où la sécurité et la fiabilité peuvent être vérifiées sans avoir besoin de comprendre le code sous-jacent.

Après trois ans de développement, ADAMANT a confirmé son concept de messagerie blockchain décentralisée, avec des applications disponibles sur iOS, Web PWA, Windows, GNU/Linux, macOS et Android.

### Le prototype

La blockchain permet la création de comptes en quelques secondes, sans identifiants comme les numéros de téléphone ou les courriels. Les utilisateurs peuvent changer de compte librement, sans laisser de trace qu’ils en étaient propriétaires. Les adresses IP sont masquées et les localisations sont inaccessibles, car toutes les données transitent par des nœuds distribués, et les applications n’ont aucun accès au carnet d’adresses. Aucune autorité centrale ne vérifie l’authenticité des messages — cela est géré par un système hôte distribué et basé sur le consensus, appartenant aux utilisateurs. La censure est impossible : les comptes ne peuvent pas être bloqués et les messages ne peuvent pas être supprimés.

![Les messageries décentralisées ont besoin de temps](/images/engineering-notes/medium/d5af2289041c/002-1-jrg9wiqqat22kbcwkhyaag-png.webp)

ADAMANT traite les messages comme des transactions. Chaque message est signé avec Ed25519 EdDSA, éliminant ainsi les attaques de type man-in-the-middle. Les messages sont intégrés dans des blocs, et comme la séquence des blocs et les horodatages sont immuables, l’ordre des messages est garanti — l’argument « Je n’ai jamais dit cela » ne fonctionne pas avec des messages stockés sur la blockchain. Tous les messages sont chiffrés de bout en bout, et le code d’ADAMANT est entièrement open source.

Puisque les conversations sont stockées sur la blockchain, il n’y a pas besoin de stockage local, ce qui améliore la sécurité et permet d’accéder aux discussions depuis n’importe quel appareil ou emplacement.

![Les messageries décentralisées ont besoin de temps](/images/engineering-notes/medium/d5af2289041c/003-0-iccadzxqtzq4ocze.webp)

La messagerie blockchain ouvre également de nouvelles opportunités. La confirmation de la livraison des messages est utile pour les notifications critiques. L’intégration avec Ethereum, Dogecoin, Lisk, Dash et Bitcoin permet des transferts de cryptomonnaies directement dans la discussion, et ADAMANT inclut un changeur intégré. L’authentification à deux facteurs (2FA) d’ADAMANT propose une alternative blockchain au système 2FA par SMS, connu pour ses failles de sécurité.

### Les changements ne sont pas anodins

Développer une véritable messagerie blockchain demande bien plus d’efforts qu’une messagerie traditionnelle — il n’existe aucun précédent. Au-delà des défis techniques, l’adoption massive fait face à un obstacle plus profond : les gens doivent d’abord changer de mentalité.

### Changement de paradigme

Le problème fondamental est celui de la responsabilité. Les gens l’évitent. Lorsqu’un compte bancaire est compromis, il y a de fortes chances que la banque rembourse les fonds perdus. Lorsqu’un portefeuille Bitcoin est compromis, il n’y a personne vers qui se tourner. La valeur des monnaies fiduciaires est garantie par les gouvernements ; personne ne garantit la valeur du Bitcoin.

La messagerie décentralisée est encore plus difficile à accepter pour les utilisateurs. Ils demandent : « Et si je perds ma clé privée ? Toutes mes conversations seront volées ! » — et ils n’aiment pas la réponse : gardez votre clé privée en sécurité. Avec Facebook, les utilisateurs peuvent blâmer l’entreprise pour les failles de sécurité. Avec une messagerie décentralisée, il n’y a personne à blâmer. C’est cela, la responsabilité.

### Préférer payer des coûts cachés

Les utilisateurs ont tendance à éviter les paiements directs, préférant des coûts cachés — même lorsque cela signifie céder leurs données personnelles et leurs conversations. Il n’existe pas de repas gratuit.

Avec ADAMANT, le prix est explicite. Chaque action, y compris l’envoi de messages ou l’enregistrement de contacts, entraîne des frais réseau de 0,001 ADM. Certains s’interrogent sur la volonté des gens à payer pour envoyer des messages alors que des alternatives gratuites existent, mais ils méconnaissent le modèle : les frais vont aux opérateurs de nœuds, pas aux développeurs, tout comme les frais de transaction Bitcoin ne vont pas aux développeurs de Bitcoin.

### Le temps mettra la vérité à l’épreuve

La blockchain n’est qu’une tentative de créer une messagerie décentralisée. Quant à savoir si elle réussira, seul le temps le dira. Mais un messager révolutionnaire finira par atteindre une adoption massive à l’échelle de Facebook.

ADAMANT a démontré qu’une messagerie blockchain peut exister. La seule tentative antérieure fut Bitmessage en 2012, qui a échoué en raison de délais de livraison longs, de la charge processeur et de l’absence d’applications mobiles.

Le scepticisme actuel provient du fait que les messageries blockchain sont en avance sur leur temps. Les gens ne sont pas prêts à assumer la responsabilité de leurs comptes, la propriété des données personnelles n’est pas encore à la mode, et la technologie blockchain actuelle n’offre pas de hautes performances. Si ce n’est pas ADAMANT, des analogues plus avancés apparaîtront à l’avenir.
