---
title: "Gardez vos jetons : un desk de market-making auto-hébergé pour ADAMANT"
slug: "keep-your-tokens-run-the-market-a-self-hosted-market-making-desk-is-coming-5116a74186a4"
description: "Si vous émettez un jeton, le discours est connu : un market maker s'occupera du carnet, du spread et du volume. Mais que se passe-t-il quand vous gardez le contrôle ?"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/keep-your-tokens-run-the-market-a-self-hosted-market-making-desk-is-coming-5116a74186a4"
publishedAt: "2026-08-30T07:03:02.790Z"
author: "massivedev0 (Theo Bitner)"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:5116a74186a4"
coverImage: "/images/engineering-notes/medium/5116a74186a4/001-80778e7498.webp"
locale: "fr"
placeholder: false
---

Si vous émettez un jeton, le discours est connu : un market maker « s'occupera du carnet », assurera un spread serré et un volume affiché — il suffit de leur envoyer un sac de jetons et un sac de devises de référence, puis de faire confiance à l'arrangement. C'est précisément ce point qui devrait vous faire hésiter. Ces jetons constituent votre flottant, votre trésorerie, l'histoire même de votre listing. Une fois qu'ils quittent votre portefeuille, vous ne gérez plus le market-making. Vous louez une boîte noire. Vous ne pouvez pas voir quels ordres sont les vôtres, arrêter le bot à 3 heures du matin, ni prouver à un partenaire que l'inventaire vous appartient toujours.

Le market-making auto-hébergé et auto-contrôlé est le modèle inverse : vous conservez les jetons, les clés API et le processus. Le logiciel réside à côté de votre compte d'échange. Rien n'est placé sous la garde d'un desk dans une autre juridiction.

Ce modèle existe déjà avec le [logiciel de market-making ADAMANT](https://marketmaking.app), une solution de liquidité auto-hébergée pour les listings sur CEX. Il place et gère le flux de market-making sur votre compte — spread, profondeur, échelles, volume, bandes de prix. Vous l'installez, vous le pointez vers vos clés API, et les pièces ne quittent jamais le portefeuille d'échange que vous possédez. Le contrôle est bien réel aujourd'hui, mais il repose encore sur une boucle pour utilisateurs avancés : ADAMANT Messenger, Telegram, CLI. Une commande, une réponse textuelle. C'est parfait pour une seule paire que vous suivez au quotidien ; c'est en revanche fastidieux pour une flotte entière, et peu pratique lorsque vous avez besoin de visualiser le carnet, les bougies, l'inventaire et les douze dernières heures en un coup d'œil.

C'est ce fossé que cryptofoundry est en train de combler.

## Un desk web pour un logiciel qui ne prend jamais vos jetons

Le projet consiste à construire une interface web (WebUI) privée et auto-hébergée : une adresse dans le navigateur, de nombreux bots dans des onglets. Vous vous connectez en tant qu'opérateur, choisissez une paire, et accédez à un écran de marché, des formulaires de paramètres, des commandes et des journaux — sans que le navigateur ne communique jamais directement avec l'échange. L'architecture est volontairement simple. La WebUI ne détient pas de secrets d'échange et ne place pas d'ordres dans le cloud. Chaque graphique, solde et annulation passe par l'API de votre bot. Le bot reste le seul processus qui connaît l'échange.

La connexion s'effectue sur votre console — pas sur l'échange, ni chez un market maker tiers. Chaque bot vérifie uniquement un jeton signé. C'est le scénario A : vous exécutez la console (généralement derrière HTTPS sur une machine que vous contrôlez), ajoutez chaque bot par URL et partagez un secret HMAC avec la flotte. Une seule WebUI, plusieurs instances — Binance, Bybit, Gate, BiFinance, ou toute plateforme sur laquelle vous êtes listé. Un abonnement hébergé (scénario B : relais sortant, licence dans la configuration du bot, pas de port bot entrant) est un produit prévu ultérieurement. La règle ne change pas : les jetons restent sur votre compte d'échange.

## Le marché, pas un journal de discussion

Ouvrez un onglet de bot et vous voilà sur un desk de marché : des bougies avec vos ordres dessinés sur le graphique, un carnet en temps réel avec spread, plage et volume sur 24h, inventaire en base et en quote (en pièces et en USD), ainsi que des limites manuelles si vous avez besoin d'ajuster. Cliquez sur le carnet pour remplir le côté, le prix et la taille. L'annulation envoie l'identifiant de l'ordre, le marché et le côté ; la ligne disparaît du tableau. Vous regardez votre compte, à travers votre bot.

![Vue du marché](/images/engineering-notes/medium/5116a74186a4/002-a2f1096b3e.webp)

*Vue du marché. Bougies, carnet d'ordres, inventaire en USD et placement d'ordres — un onglet dans une flotte multi-bots. Il s'agit toujours de votre clé API et de votre portefeuille sur l'échange.*

## Des paramètres lisibles à 2 heures du matin

Le market-making n'est pas un simple interrupteur. Il s'agit de bandes de liquidité, de surveillance des prix, d'échelles, de volume et de notifications. La WebUI transforme cela en formulaires regroupés. Si un module n'est pas dans cette version du bot, le groupe reste verrouillé — vous ne devinez pas quel code `/enable` correspond à quelle carte.

La situation en direct est une bande pour les opérateurs qui refusent de surveiller un terminal : douze heures d'inventaire (base + quote en USD) et un mélange d'ordres ouverts. Les barres se remplissent dans le navigateur pendant que vous êtes connecté. Une heure jaune signifie que la qualité a été dégradée ; le gris signifie que le market-making était désactivé. Vous voyez la nuit, pas seulement un instantané.

![Paramètres](/images/engineering-notes/medium/5116a74186a4/003-5c8d7d7f51.webp)

*Paramètres. Interrupteur principal de market-making, situation en direct sur 12 heures, liquidité, surveillance des prix, échelles. Les groupes correspondent à ce que ce bot a réellement installé.*

Une note sur la mécanique, car elle est importante en cas de problème : le bot horodate le dernier démarrage du MM et le dernier redémarrage du processus avec le MM déjà activé. Des horodatages identiques signifient un démarrage propre. Une initialisation plus ancienne que le redémarrage signifie que la machine a redémarré. La vivacité du processus public (`/health`) reste un petit `{ status, transport }` afin qu'un port accessible ne révèle pas la qualité du carnet. La qualité est un `/status` séparé et authentifié.

## Les mêmes commandes, sur un desk

Fill, close, make-price, TWAP, transfer, withdraw et requêtes — les mêmes gestionnaires que Messenger et CLI, avec des confirmations sur les appels destructeurs et une console en direct sur la droite.

![Commandes](/images/engineering-notes/medium/5116a74186a4/004-18e42a4cf7.webp)

*Commandes. L'ensemble pour utilisateur avancé, disposé pour un desk : remplir le carnet, fermer une tranche, fixer un prix, regarder le bot répondre dans la console.*

Parce que « qui a désactivé le MM ? » est une vraie question, « Événements » est une piste d'audit sur la WebUI — opérateur vs bot, paramètres vs commandes, avec recherche et exportation.

![Événements](/images/engineering-notes/medium/5116a74186a4/005-0c6f4d12d6.webp)

*Événements. Ce qui a changé, quand et qui : vous, un collègue ou le bot lui-même.*

## Pourquoi ce n'est pas juste un énième MM en SaaS

La plupart des offres « nous ferons votre marché » optimisent leurs propres opérations : ils ont besoin de vos jetons sur leurs comptes pour que leurs bots puissent trader. Ce modèle optimise vos opérations. La garde reste sur l'échange sous les clés que vous avez émises. Le bot tourne là où vous choisissez — votre VPS, votre rack. La WebUI est une fenêtre sur ce processus, pas un nouveau dépositaire. Une console couvre chaque paire qui vous intéresse réellement.

Si un listing nécessite une deuxième clé API pour les règles d'auto-trading, c'est toujours votre deuxième compte. Si vous arrêtez le logiciel, les ordres vous appartiennent et vous pouvez les annuler. Si vous mettez fin à la relation avec le fournisseur, vous n'attendez pas le retour de jetons qui auraient déjà quitté votre contrôle.

## Statut

Le chemin auto-hébergé privé (scénario A) est en cours d'intégration active : marché, paramètres, situation en direct, commandes, événements et santé du MM authentifiée. Les tableaux de bord de flotte et la configuration sont en cours de finalisation afin que les premiers opérateurs puissent l'utiliser comme un desk quotidien, et non comme une simple démonstration.

Le logiciel de market-making ADAMANT est auto-hébergé. Vous conservez le compte d'échange, les clés API, les fonds et l'exécution. La WebUI décrite ici est la console de l'opérateur pour ce logiciel — et non une plateforme qui prend possession de votre inventaire.
