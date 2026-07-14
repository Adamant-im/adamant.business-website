---
title: "AIP-17 : Réactions aux messages sur la blockchain avec ADAMANT Messenger"
slug: "unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
description: "La proposition d'amélioration ADAMANT (AIP-17) introduit des réactions par émojis dans ADAMANT Messenger, une fonctionnalité inédite dans les applications de messagerie blockchain."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
publishedAt: "2023-09-15T10:09:07.924Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/857b07759524/001-0-tn1uulgukvtmgwym.webp"
cardSpan: "full"
originalId: "medium:857b07759524"
locale: "fr"
placeholder: false
---

La proposition d'amélioration ADAMANT 17 (AIP-17) introduit des réactions par émojis aux messages dans ADAMANT Messenger — une fonctionnalité jusqu'ici indisponible dans toute application de messagerie blockchain. La proposition définit une structure normalisée pour les réactions, s'intégrant à l'infrastructure de messages existante.

## Fonctionnement

Les réactions sont transmises sous forme de messages riches ADM, conformément aux conventions établies dans l'AIP-5 (Messages de contenu riche). Un nouveau champ obligatoire, `reactto_id`, identifie l'ID de transaction du message auquel on réagit. Un second champ, `react_message`, contient l'émoji choisi par l'utilisateur. Les réactions peuvent être modifiées ou supprimées après leur création.

Une charge utile de réaction se présente comme suit :

```json
{
  "reactto_id": "Transaction_ID",
  "react_message": "👍"
}
```

Étant donné que chaque réaction est elle-même une transaction sur la blockchain référençant une autre transaction par son ID, cette approche préserve le modèle d'auditabilité et de décentralisation existant d'ADAMANT, tout en ajoutant une couche expressive légère par-dessus les messages classiques.

L'implémentation devrait être déployée dans les applications ADAMANT sur toutes les plateformes. La discussion technique et la proposition complète sont disponibles sur la [page de la proposition AIP-17](https://github.com/Adamant-im/AIPs/issues/52).

![AIP-17 : Réactions aux messages sur la blockchain avec ADAMANT Messenger](/images/engineering-notes/medium/857b07759524/002-1-zslip-kei08fk54o3-u34q-png.webp)
