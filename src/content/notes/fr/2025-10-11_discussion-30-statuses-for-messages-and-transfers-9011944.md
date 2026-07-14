---
title: "Statuts des messages et des transferts dans ADAMANT"
slug: "discussion-30-statuses-for-messages-and-transfers-9011944"
description: "ADAMANT distingue les statuts de livraison des messages et ceux des transferts de cryptomonnaies. Les messages sont suivis dans la blockchain ADAMANT, tandis que les transferts sont vérifiés sur la blockchain native de chaque jeton."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/30"
publishedAt: "2025-10-11T18:08:05Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9011944"
locale: "fr"
placeholder: false
---

ADAMANT distingue les statuts de livraison des messages et ceux des transferts de cryptomonnaies. Les messages sont suivis dans la blockchain ADAMANT, tandis que les transferts sont vérifiés sur la blockchain native de chaque jeton. Un principe fondamental de confidentialité : ADAMANT n’implémentera jamais un statut « lu » pour les messages, car cela révélerait l’activité du destinataire.

## Statuts des messages

Les messages entrants sont toujours considérés comme livrés car ils sont lus directement depuis la blockchain ; aucun statut n’est donc affiché pour ceux-ci. Les messages sortants passent par trois étapes : **Envoi en cours** (en attente), **Livré au nœud** (le nœud a accepté la transaction) et **Dans la blockchain** (confirmation supplémentaire une fois le bloc connu). La transition de l’état Envoi à Livré doit être rapide pour une expérience utilisateur fluide. Les statuts sont mis à jour à la fois dans la liste des discussions et à l’intérieur des discussions individuelles.

Lorsque les sockets sont activés, ils renvoient les transactions non confirmées dès qu’elles atteignent le nœud. À ce stade, les champs comme `block_timestamp`, `height`, `blockId` et `confirmations` sont à `null`. Les sockets dupliquent les réponses de l’API REST : les messages arrivent instantanément via le socket, tandis que l’API REST fournit des mises à jour toutes les ~10 secondes (`SOCKET_ENABLED_TIMEOUT`) comme solution de secours pour la fiabilité. ADAMANT n’utilise délibérément pas de statut « Livré au destinataire » car cela contredit la philosophie de confidentialité et est techniquement peu fiable lorsque le destinataire est hors ligne.

Si la livraison au nœud échoue ou si la blockchain rejette la transaction, le message est marqué **Non envoyé**.

## Statuts des transferts de cryptomonnaie

Pour tous les transferts de cryptomonnaie, ADAMANT affiche le statut de la transaction dans la blockchain propre au jeton. Cela s’applique aux transferts entrants et sortants. Le flux de travail est : `En attente → Enregistré → Succès / Échec / Incohérent`.

Un transfert débute comme **En attente** (envoi ou vérification). Dès qu’un nœud confirme l’existence de la transaction, il devient **Enregistré**. ADAMANT continue ensuite à vérifier jusqu’à l’obtention d’un statut final : **Succès** (confirmé dans le réseau), **Échec** (rejeté par le réseau) ou **Incohérent** (incohérence détectée). Les règles de vérification des transactions par monnaie sont définies dans le dépôt [`adamant-wallets`](https://github.com/Adamant-im/adamant-wallets/#info-for-updating-in-chat-coin-transfer-tx-statuses) sous `txFetchInfo`. La spécification est documentée dans [AIP-12](https://aips.adamant.im/AIPS/aip-12).

Pour les transactions ADM spécifiquement, le statut arrive directement avec la transaction : si `confirmations > 0`, le transfert est marqué comme un succès ; si `confirmations = 0`, il reste en attente ou enregistré.

### Mécanisme de vérification en arrière-plan

Pour les blockchains non-ADM, la vérification des statuts nécessite des requêtes supplémentaires vers un nœud ou une API. ADAMANT utilise un mécanisme en arrière-plan qui ne vérifie que les transactions visibles par l’utilisateur et s’arrête une fois qu’un statut final est reçu. La fréquence des vérifications dépend de l’âge de la transaction (Nouveau vs Ancien), et le système limite le nombre de tentatives pour les transactions en attente, tout en autorisant un nombre illimité de tentatives pour celles enregistrées. Les vérifications ne s’exécutent que lorsque la connexion réseau et les nœuds de la monnaie concernée sont disponibles, évitant ainsi des tentatives inutiles hors ligne.

Une transaction est classée comme **Nouveau** si elle vient d’être diffusée depuis l’application, ou si son horodatage se situe dans un seuil de *X* minutes par rapport à l’heure actuelle. Sinon, elle est **Ancien**. Ce seuil peut être une constante fixe ou calculé par monnaie :

```js
const isNew = (admTransferTimestamp) =>
  Date.now() - admTransferTimestamp < newPendingTxFetchAttempts * newPendingTxFetchInterval;
```

Cette distinction garantit que les transactions récentes sont vérifiées plus fréquemment, tandis que les plus anciennes le sont de manière moins agressive.

### Exemple : transfert Bitcoin

Constantes depuis `adamant-wallets` :

```jsonc
"txFetchInfo": {
    "newPendingInterval": 10000,
    "oldPendingInterval": 3000,
    "registeredInterval": 40000,
    "newPendingAttempts": 20,
    "oldPendingAttempts": 3
}
```

Pour une transaction **Nouveau en attente**, l’application vérifie toutes les 10 secondes (`newPendingInterval`) avec un maximum de 20 tentatives (`newPendingAttempts`), ce qui donne une fenêtre totale d’environ 200 secondes. Si le nœud détecte la transaction (même avec 0 confirmations), elle devient **Enregistrée**. Si elle reste invisible après toutes les tentatives, elle est marquée **Échec**.

Pour les transactions **Enregistrées**, l’application vérifie toutes les 40 secondes (`registeredInterval`) avec un nombre illimité de tentatives jusqu’à ce que la transaction soit confirmée (≥1 confirmation) ou que le nœud renvoie une erreur.

Les utilisateurs peuvent relancer manuellement la vérification d’une transaction en appuyant sur son icône de statut dans la discussion, ce qui la réinitialise à En attente et déclenche un nouveau cycle de vérification. Les statuts de transaction ne sont pas stockés localement ; lors de la connexion avec un mot de passe, un code PIN ou une empreinte digitale, ils sont revérifiés à partir de zéro.

## Détection d’incohérence

Un transfert est marqué **Incohérent** lorsque les données enregistrées dans le message ADAMANT ne correspondent pas aux données récupérées depuis la blockchain du jeton. Une incohérence est signalée si l’une des conditions suivantes est remplie : le montant diffère de plus de ~0,1–0,5 %, l’adresse de l’expéditeur est différente, l’adresse du destinataire est différente, ou l’horodatage du message et celui de la transaction blockchain diffèrent de plus de 3 heures.

Deux cas particuliers supplémentaires existent. Si la monnaie n’est pas prise en charge (par exemple, `xrp_transaction`), l’application ne peut pas vérifier le transfert et affiche un message indiquant que la cryptomonnaie n’est pas supportée. Si un hachage de transaction en double est détecté — c’est-à-dire que le même hachage de transaction est déjà apparu dans une transaction chargée — le transfert est marqué comme Incohérent afin d’éviter qu’une seule transaction sur la blockchain soit comptée plusieurs fois dans la discussion.

Les raisons d’incohérence sont priorisées comme suit : hachage de transaction incorrect, transaction en double, adresse de l’expéditeur incorrecte, adresse du destinataire incorrecte, montant erroné, impossible de récupérer l’adresse de l’expéditeur, impossible de récupérer l’adresse du destinataire, différence d’horodatage significative, et échec général de la vérification. Chaque raison inclut un avertissement de fraude le cas échéant.

## Démonstration de l’interface utilisateur

Les captures d’écran ci-dessous illustrent l’évolution des statuts de transfert dans le client ADAMANT PWA et iOS.

**DASH dans la discussion PWA-dev v4.9.0 — 2025-03-04**

| Après confirmation du transfert (~10 sec) | Transaction affichée en discussion comme En attente | Détails de la transaction — En attente (~2 min) |
|---|---|---|
| ![Discussion screenshot 1](/images/engineering-notes/github/discussions/9011944/001-61b4f6c1.webp) | ![Discussion screenshot 2](/images/engineering-notes/github/discussions/9011944/002-711b6dcc.webp) | ![Discussion screenshot 3](/images/engineering-notes/github/discussions/9011944/003-6eb732d9.webp) |

| Confirmé sans détails (~5 sec) | Confirmé avec détails — Final | |
|---|---|---|
| ![Discussion screenshot 4](/images/engineering-notes/github/discussions/9011944/004-fcf2d419.webp) | ![Discussion screenshot 5](/images/engineering-notes/github/discussions/9011944/005-4e0f54a4.webp) | |

**DASH dans la discussion iOS v3.11.0 — 2025-03-04**

| Après confirmation (~3 sec) | Transaction affichée en discussion comme En attente | Détails de la transaction — En attente (~2 min) |
|---|---|---|
| ![Discussion screenshot 6](/images/engineering-notes/github/discussions/9011944/006-ac6db431.webp) | ![Discussion screenshot 7](/images/engineering-notes/github/discussions/9011944/007-a6e778a1.webp) | ![Discussion screenshot 8](/images/engineering-notes/github/discussions/9011944/008-f5034347.webp) |

| Confirmé avec détails — Final | | |
|---|---|---|
| ![Discussion screenshot 9](/images/engineering-notes/github/discussions/9011944/009-b08299f4.webp) | | |
