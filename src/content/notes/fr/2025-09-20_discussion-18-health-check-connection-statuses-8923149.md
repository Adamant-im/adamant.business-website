---
title: "Vérification de santé : États de connexion"
slug: "discussion-18-health-check-connection-statuses-8923149"
description: "Voir aussi : Vérification de santé : Algorithme, Description générale. Trois états de connexion liés à l'envoi et à la réception de messages."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/18"
publishedAt: "2025-09-20T15:41:29Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923149"
locale: "fr"
placeholder: false
---

Voir aussi : [Health Check: Algorithm, General Description](https://github.com/orgs/Adamant-im/discussions/17)

# États de connexion

Il existe trois états de connexion liés à la réception et à l'envoi de messages.

**Pas de connexion Internet** est signalé par le système d'exploitation (pas de réseau, Wi-Fi, etc.). Dans le contrôle de santé, `Aucun nœud actif` peut en réalité signifier qu'il n'y a pas de connexion Internet.

**Pas de nœuds ADM actifs/disponibles** s'applique lorsqu'au moins un nœud ADM est activé mais qu'aucun nœud n'est en statut **Actif**. La même logique s'applique aux cryptomonnaies et services (par exemple, `Pas de services BTC actifs`). Les nœuds non supportés ne sont pas pris en compte.

**Pas de nœuds ADM activés** se produit lorsque l'utilisateur a désactivé tous les nœuds. Les nœuds non supportés ne sont pas non plus comptabilisés ici ; il peut y avoir des nœuds en statut `Non supporté`, mais le statut reste `Pas de nœuds activés`.

# Priorité des vérifications

Les vérifications sont évaluées dans l'ordre suivant : d'abord `Pas de connexion Internet`, puis `Pas de nœuds ADM actifs/disponibles`, puis `Pas de nœuds ADM activés`.

# Cas particuliers

## Snackbar générale

La snackbar générale apparaît uniquement pour `Pas de connexion Internet`. Elle est persistante (affichée jusqu'à ce que l'utilisateur la ferme ou que la connexion soit rétablie) et déclenche une vibration d'attention.

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8923149/001-7a3f923d.webp)

## Fenêtre d'alerte dans le chat

La fenêtre d'alerte dans le chat apparaît pour `Pas de nœuds ADM activés` lorsque la connexion est active, qu'aucun nœud ADM n'est disponible et que l'utilisateur a au moins un nœud désactivé manuellement. Elle est persistante et déclenche une vibration d'attention.

![Discussion screenshot 2](/images/engineering-notes/github/discussions/8923149/002-7fee21d6.webp)

## Indicateur de mise à jour général

L'indicateur de mise à jour général (affiché dans la zone d'en-tête, indiquant que les données/messages ne sont pas à jour) apparaît pour tous les états de connexion. Cela inclut l'écran Délégués, l'écran Portefeuilles et tout écran de nœuds. Il est persistant et ne déclenche pas de vibration.

![Discussion screenshot 3](/images/engineering-notes/github/discussions/8923149/003-00df57f0.webp)

Voir aussi : [Health Check: General updating spinner](https://github.com/orgs/Adamant-im/discussions/20)

## Indicateur de chargement des données

L'indicateur de chargement des données couvre le spinner de la liste de discussion, le spinner de discussion spécifique et le spinner de la liste des transactions ADM. Il apparaît pour tous les états de connexion et s'affiche sur demande de l'utilisateur — par exemple, lorsque l'utilisateur accède à l'écran de la liste des transactions ADM, fait défiler la liste des discussions pour charger de nouveaux messages, entre dans une discussion spécifique que l'application n'a pas encore chargée, fait défiler une discussion particulière ou accède à l'écran Voter pour les délégués. Le spinner est affiché jusqu'à ce que les données soient mises à jour. Il est persistant et ne déclenche pas de vibration.

## Envoi d'un nouveau message ou fichier

Ce comportement est commun à tous les états de connexion. En cas de connexion absente, le message apparaît dans la discussion avec un statut de transaction `En attente`. Le statut `En attente` passe à `Échec` selon les délais définis dans [Message sending timeouts](https://github.com/Adamant-im/adamant-wallets/pull/95). Deux délais sont implémentés : un pour l'envoi d'un message ordinaire et un autre pour l'envoi d'un message avec pièces jointes. Le délai pour les pièces jointes concerne l'envoi d'un message ADM avec des fichiers déjà uploadés, et non le processus d'upload lui-même.

## Envoi dans une discussion : ADM ou autre cryptomonnaie

Cela s'applique également à l'envoi direct de pièces ADM. Pour tous les états de connexion, l'envoi est interdit et une snackbar temporaire est affichée avec une vibration d'avertissement. Pour l'envoi de cryptomonnaies non ADM directement (Compte → Monnaie → Envoyer), la disponibilité des nœuds ADM n'est pas vérifiée lors des transferts.

![Discussion screenshot 4](/images/engineering-notes/github/discussions/8923149/004-e59de24d.webp)

## Démarrer une nouvelle discussion

Ce comportement est commun à tous les états de connexion. L'application vérifie localement que l'adresse ADM est probablement correcte, ouvre immédiatement une nouvelle discussion sans aucune requête et affiche un message spécial de bienvenue dans la discussion. Si la clé publique est disponible localement, aucun message supplémentaire n'est affiché. Si la clé publique doit être récupérée depuis un nœud, un message supplémentaire dans la discussion avec un spinner est affiché.

![Discussion screenshot 5](/images/engineering-notes/github/discussions/8923149/005-ea0f770b.webp)

Pour `Pas de nœuds ADM activés`, la fenêtre d'alerte supplémentaire dans le chat est également affichée.

## Lors du rétablissement de la connexion

Lorsque la connexion est rétablie, les requêtes en attente sont finalisées — par exemple, les messages en attente sont envoyés et les spinners sont mis à jour.

## Connexion avec phrase secrète

Pour `Pas de connexion Internet` et `Pas de nœuds ADM actifs/disponibles`, l'utilisateur reste sur l'écran de connexion avec une snackbar ou une fenêtre d'alerte affichée. Pour `Pas de nœuds ADM activés`, l'utilisateur est redirigé vers l'écran des nœuds ADM avec une snackbar ou une fenêtre d'alerte. La snackbar est temporaire et déclenche une vibration d'avertissement.

![Discussion screenshot 6](/images/engineering-notes/github/discussions/8923149/006-b36dd2ac.webp)

## Connexion par mot de passe/biométrie

Ce comportement est commun à tous les états de connexion. L'utilisateur se connecte normalement sans délai ni requête, et l'onglet Discussions s'ouvre. Les messages et discussions stockés localement sont affichés. L'indicateur de mise à jour général indique que les données ne sont pas à jour, et une snackbar `Pas de connexion` est affichée.
