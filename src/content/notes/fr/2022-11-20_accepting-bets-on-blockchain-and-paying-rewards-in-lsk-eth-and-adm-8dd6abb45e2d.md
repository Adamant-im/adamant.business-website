---
title: "Accepter des paris sur la blockchain et distribuer des récompenses en LSK, ETH et ADM"
slug: "accepting-bets-on-blockchain-and-paying-rewards-in-lsk-eth-and-adm-8dd6abb45e2d"
description: "Le bot de paris ADAMANT est une application anonyme prouvée par la blockchain qui traite les paris et distribue automatiquement les récompenses."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/accepting-bets-on-blockchain-and-paying-rewards-in-lsk-eth-and-adm-8dd6abb45e2d"
publishedAt: "2022-11-20T13:10:11.915Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/8dd6abb45e2d/001-0-l0olsfjrwmjzcc-3.webp"
cardSpan: "full"
originalId: "medium:8dd6abb45e2d"
locale: "fr"
placeholder: false
---

Le bot de paris ADAMANT est une application anonyme prouvée par la blockchain qui traite les paris et distribue automatiquement les récompenses. Une configuration typique consiste à parier sur le prix d'une cryptomonnaie comme Bitcoin. Avec la mise à jour v2.0, le bot prend désormais en charge les paris et les paiements en Lisk (LSK) ainsi qu'en ADM et en Ethereum.

Le bot accepte les paris en cryptomonnaie directement depuis les portefeuilles ADAMANT Messenger, toutes les activités de pari et de paiement étant prouvées par des transactions blockchain. Les utilisateurs qui prédisent correctement le prix du Bitcoin — ou d'autres cryptomonnaies — peuvent gagner des récompenses. Étant donné que le bot de paris est open source, n'importe qui peut déployer sa propre instance pour accepter des paris sur le prix de n'importe quelle cryptomonnaie, pas seulement Bitcoin.

## Comment parier sur le prix du Bitcoin

Pour placer un pari, vous créez un portefeuille anonyme dans ADAMANT, vous créditez son solde, puis envoyez un pari au bot. Le bot accepte des paris sur le taux de change du Bitcoin (BTC). Une nouvelle manche commence tous les dimanches à 10h00 UTC, les paris pour la manche en cours étant acceptés du dimanche au jeudi. Les paris envoyés le vendredi ou le samedi — dans les 48 heures suivant la fin de la manche — sont comptabilisés pour la manche suivante.

L'erreur de prédiction acceptable est de ±500 USD. Par exemple, si vous pariez sur un taux de 9 500 $ et que le taux réel est de 9 900 $, vous êtes toujours considéré comme gagnant. Le pari minimum est de 0,1 USD, et le paiement minimum est également de 0,1 USD. Pour plus de détails, envoyez `/help` au bot de paris dans ADAMANT.

Pour placer un pari, créditez la cryptomonnaie que vous souhaitez utiliser (ADM, LSK ou ETH), ouvrez la conversation avec le bot de paris dans ADAMANT, puis envoyez `/rates BTC` pour vérifier le taux de change actuel. Ensuite, envoyez au bot le montant souhaité avec votre prix prédit dans le commentaire de la transaction — par exemple, envoyer 250 ADM avec "11300" comme commentaire signifie que vous pariez que le taux du Bitcoin à la fin de la manche sera de 11 300 $. Lorsque la manche se termine, le bot indique le taux réel et verse les récompenses aux gagnants.

![Accepter des paris sur la blockchain, et distribuer des récompenses en LSK, ETH et ADM](/images/engineering-notes/medium/8dd6abb45e2d/002-0-yhlmw4fu3ffrh8-l.webp)

## Notes de mise à jour v2.0.2

La version v2.0.2 ajoute la prise en charge de Lisk, active les connexions socket, met à jour les dépendances et inclut des refactorisations et corrections de bogues.
