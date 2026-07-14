---
title: "Transferts de cryptomonnaies en discussion et directs dans ADAMANT"
slug: "discussion-31-in-chat-and-direct-crypto-transfers-scenario-in-adamant-9019566"
description: "ADAMANT Messenger permet des transferts de cryptomonnaies fluides en discussion ou depuis l'écran Portefeuille, tous enregistrés dans l'historique des transactions."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/31"
publishedAt: "2025-10-13T05:01:20Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9019566"
locale: "fr"
placeholder: false
---

ADAMANT Messenger prend en charge des transferts de cryptomonnaies fluides à la fois dans les discussions et directement depuis l'écran Portefeuille, toutes les opérations étant suivies dans l’Historique des transactions.

### Transferts de cryptomonnaies en discussion

Avant l’envoi, l’application valide le solde ADM de l’utilisateur, la connexion Internet, la disponibilité du nœud ADM et la disponibilité du nœud de cryptomonnaie via des vérifications d’état. Si l’un de ces contrôles échoue, l’application affiche une erreur et permet une nouvelle tentative.

Le flux de transaction commence par la génération locale de la transaction de cryptomonnaie et de la transaction ADM. Pour les chaînes utilisant des nonces comme ETH, l’application vérifie le stockage local afin de s’assurer qu’une transaction avec le même nonce n’a pas déjà réussi. Pour les chaînes sans nonce comme BTC, DOGE ou DASH, elle vérifie le stockage local et interroge la blockchain pour détecter les transactions en attente. Si un doublon en attente ou réussi est trouvé, le processus s’arrête.

Ensuite, la transaction ADM est envoyée au nœud ADM. Si elle est acceptée, elle est ajoutée à la discussion, et l’application reste sur l’écran d’envoi. La transaction de cryptomonnaie est alors stockée dans la base de données locale et affichée dans l’historique des transactions avec un statut « En attente ». L’application s’appuie sur un horodatage stocké localement pour le classement jusqu’à ce que l’horodatage réel de la blockchain soit disponible. Cet affichage immédiat est crucial pour les transferts de monnaies non-ADM, car le nœud de la cryptomonnaie n’a pas encore renvoyé de données, mais l’utilisateur a besoin d’un retour instantané.

La transaction de cryptomonnaie est ensuite envoyée au nœud de la cryptomonnaie. Toute réponse positive marque la transaction comme « En attente », et l’utilisateur est redirigé vers la discussion ou l’écran de détails de la transaction. Si l’envoi échoue, une erreur s’affiche en bas de l’écran (snackbar), et l’utilisateur peut réessayer, ce qui génère une transaction entièrement nouvelle. Si l’utilisateur retourne à la discussion sans réessayer, la transaction ayant échoué apparaît quand même dans la discussion et dans l’historique, car le message ADM a déjà été envoyé. Les mises à jour de transaction se poursuivent en arrière-plan.

La génération de la transaction ADM avant l’envoi de la transaction de cryptomonnaie garantit que le transfert de cryptomonnaie n’est jamais effectué sans être enregistré dans la discussion, évitant ainsi que les utilisateurs dépensent des fonds sans en avoir connaissance et les envoient par erreur une seconde fois.

### Transferts de cryptomonnaies directs (écran Portefeuille)

Le scénario de transfert direct depuis l’écran Portefeuille est identique aux transferts en discussion, à quelques exceptions près. Il omet la vérification du solde ADM, la vérification du nœud ADM et la création de la transaction ADM. Une fois terminé, l’utilisateur est redirigé vers l’historique des transactions au lieu de la discussion.

### Historique des transactions

L’historique des transactions combine les transactions stockées localement avec les données synchronisées depuis l’API du nœud blockchain. Les transactions stockées localement sont conservées même après un redémarrage de l’application, mais doivent être effacées lors de la déconnexion ou de la reconnexion afin d’éviter l’affichage de l’historique d’un autre compte. Cette combinaison fournit un aperçu précis et à jour des transferts de l’utilisateur. Dans la mesure du possible, l’application utilise des calculs et vérifications locaux pour la génération des transactions, les soldes, les nonces, les doublons et les horodatages, afin d’assurer une expérience utilisateur réactive sans avoir à attendre les réponses réseau.

![Discussion screenshot 1](/images/engineering-notes/github/discussions/9019566/001-90a49183.webp)
