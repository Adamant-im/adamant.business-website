---
title: "Notifications push sans canal client-serveur : conception, compromis et une course de désinscription connue"
slug: "discussion-72-push-notifications-without-a-client-to-server-channel-design-trade-offs-and-a-known-deregi-10570025"
description: "Les notifications push sont le point où une messagerie privée est le plus tentée de faire des compromis. Quelqu'un doit être informé de l'arrivée d'un message, et sur iOS, c'est Apple."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/72"
publishedAt: "2026-08-07T13:36:18Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10570025"
locale: "fr"
placeholder: false
---

Les notifications push sont le point où une messagerie privée est le plus tentée de faire des compromis. Quelqu'un doit être informé de l'arrivée d'un message, et sur iOS, c'est Apple. Cette note décrit comment ADAMANT organise cela pour que le service de notification en apprenne le moins possible, les coûts de cette conception, et un mode de défaillance connu que le projet a choisi d'accepter plutôt que de masquer.

## La structure du système

Quatre parties sont impliquées : l'appareil de l'utilisateur, un nœud ADAMANT, le service Apple Push Notification (APNs) et le service de notification ADAMANT (ANS), géré par cryptofoundry.

L'enregistrement s'effectue via la blockchain, et non via une API. L'appareil demande d'abord un jeton push à l'APNs. L'application chiffre ensuite `{token, provider, action}` avec la clé publique de l'ANS et l'envoie sous forme de **message de signalement** (type de chat 3, [AIP-6](https://aips.adamant.im/AIPS/aip-6)) à l'adresse ADM du compte ANS, via le nœud choisi par l'utilisateur. L'ANS interroge les nœuds pour les transactions qui lui sont adressées, les déchiffre et stocke la paire `adresse ADM → jeton push`.

La livraison est l'image miroir. L'ANS interroge les transactions de transfert (type 0) et de chat (type 8), vérifie le destinataire dans son registre et demande à l'APNs d'envoyer une notification push.

## Ce que chaque partie apprend réellement

La charge utile de notification ne contient aucun contenu de message :

```json
{
  "aps": {
    "alert": { "loc-key": "NotificationsService.NewMessage.BodySingle" },
    "badge": 1,
    "mutable-content": 1,
    "sound": "notification.mp3"
  },
  "push-recipient": "U1234567890123456",
  "txn-id": "7175005690801347553"
}
```

Le corps est une clé de localisation, pas un message. L'extension de service de notification de l'application prend le `txn-id`, récupère la transaction depuis un nœud et la déchiffre localement avec la clé privée de l'utilisateur avant que la notification ne soit affichée. Apple voit un jeton d'appareil, une adresse ADM, un identifiant de transaction et une temporisation, mais jamais le contenu. C'est une divulgation réelle qu'il convient d'énoncer clairement : si vous utilisez les push d'Apple, Apple apprend que cette adresse a reçu quelque chose, et à quel moment.

La propriété la plus intéressante se situe côté serveur. L'application n'ouvre jamais de connexion vers l'ANS. Le service de jetons du client iOS émet exactement deux types d'appels réseau, tous deux vers des nœuds ADM, et aucun nom d'hôte de service push n'apparaît nulle part dans l'application. L'ANS ne voit donc que ce qui est déjà public sur la chaîne et, surtout, ne voit jamais l'adresse IP de l'appareil. Un utilisateur passant par son propre nœud ou par Tor ne touche absolument pas à l'infrastructure de cryptofoundry.

Cette propriété est tout l'intérêt du système, et elle est fragile. La fonctionnalité de confort évidente — un petit point de terminaison HTTPS sur l'ANS permettant à un client de demander "as-tu toujours mon jeton ?" — la détruirait discrètement. Cela donnerait à l'ANS l'adresse IP de l'appareil, transformerait chaque lancement d'application en un signal de présence par appareil, annulerait le choix du nœud par l'utilisateur et créerait un nom d'hôte unique blocable là où il existe aujourd'hui une liste de nœuds enfichables. Ce point de terminaison ne sera pas ajouté.

## Le cycle de vie de l'enregistrement et ses risques

Comme le canal est la blockchain, `add` (ajouter) et `remove` (supprimer) sont des transactions. Chaque message de signalement coûte des frais de chat normaux : `constants.fees.chat_message = 100000` avec `fixedPoint = 1e8`, soit **0,001 ADM**. Cela compte plus que le prix ne le suggère : un utilisateur avec un solde nul ne peut pas en envoyer, ce qui exclut la stratégie de "ré-enregistrement périodique" comme méthode de robustesse.

Le client conserve une copie locale du jeton qu'il croit enregistré et ne se ré-enregistre que lorsque iOS lui fournit un jeton *différent*. Il ne demande jamais au serveur si l'enregistrement existe toujours, car il ne peut pas le faire sans sacrifier la propriété de confidentialité.

Cela produit un mode de défaillance connu et reproductible qui ne nécessite aucune perte de données sur le serveur. L'utilisateur se déconnecte alors qu'il est hors ligne ou via un nœud instable ; le client efface son jeton mis en cache et envoie `remove(T)`, mais l'envoi échoue, la transaction est donc persistée et réessayée à chaque lancement ultérieur de l'application. L'utilisateur se reconnecte ensuite sur le même appareil. iOS fournit le **même** jeton `T`. Le cache local est vide, donc le client envoie `add(T)` et cela réussit : l'état du serveur est maintenant correct. Mais le `remove(T)` en file d'attente finit par réussir aussi, arrivant sur la chaîne *après* le `add`, donc l'ANS supprime l'enregistrement qu'il vient de créer. Le cache du client indique `T`, iOS continue de fournir `T`, donc la vérification "le jeton a-t-il changé ?" ne se déclenche jamais. L'appareil est désenregistré et n'a aucun moyen de s'en apercevoir.

Les notifications s'arrêtent silencieusement. La seule récupération possible est une bascule manuelle **Notifications → Off → Push** dans l'application, qui efface le cache local et force un nouvel enregistrement.

## Pourquoi ce problème n'est pas traité dans l'urgence

C'est un bug réel, mais limité : il nécessite un désenregistrement échoué suivi d'un ré-enregistrement du même jeton. Les deux raccourcis qui pourraient le masquer sont tous deux pires que le bug. Une vérification HTTP troque une défaillance silencieuse rare contre une fuite de métadonnées permanente et universelle. Le ré-enregistrement périodique dépense les fonds de l'utilisateur selon un calendrier et ne fonctionne tout simplement pas pour ceux qui détiennent zéro ADM.

La correction appropriée est un ordonnancement côté client, et elle reste entièrement dans le cadre de la conception médiée par la blockchain : rendre la file d'attente de réessai consciente des jetons afin qu'un `remove(T)` en attente soit abandonné dès qu'un `add(T)` ultérieur réussit, cesser de traiter "le cache est vide" comme l'état de l'enregistrement, et persister le `add` avec le même soin que celui déjà apporté au `remove`. Ce travail incombe aux clients.

Une conséquence liée à cette même asymétrie : un `unregister` ne peut être envoyé que pour un jeton dont l'application se souvient encore, donc une réinstallation rend l'enregistrement précédent définitivement orphelin. Le registre contient actuellement environ 2 600 lignes pour environ 1 700 adresses distinctes, une adresse en détenant 251. Les lignes sont supprimées lorsque l'APNs signale un jeton comme mort, donc le registre s'auto-nettoie pour ceux qui reçoivent encore des notifications, mais une adresse à laquelle personne n'écrit n'est jamais sollicitée et jamais nettoyée.

## Poursuivre sur cette base

Deux points à retenir pour quiconque s'intègre aux notifications ADAMANT ou développe un client. Premièrement, n'ajoutez pas de rappel de l'appareil vers le service de notification : c'est la conception naturelle, et c'est la seule chose qui brise la garantie. Deuxièmement, traitez l'enregistrement et le désenregistrement comme une paire ordonnée. Ils sont asynchrones, réessayables, sur la chaîne, et peuvent arriver dans le désordre. Séquencez-les explicitement plutôt que de déduire l'état à partir d'un cache local.
