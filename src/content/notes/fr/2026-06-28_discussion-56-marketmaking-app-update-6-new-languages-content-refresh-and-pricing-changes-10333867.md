---
title: "Mise à jour de marketmaking.app : Nouvelles langues, actualisation du contenu et changements de tarification"
slug: "discussion-56-marketmaking-app-update-6-new-languages-content-refresh-and-pricing-changes-10333867"
description: "cryptofoundry a publié une mise à jour majeure de marketmaking.app, avec six nouvelles langues, une nouvelle présentation du bot gratuit pour émetteurs de jetons, une documentation mise à jour et plusieurs améliorations UX."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/56"
publishedAt: "2026-06-28T14:14:24Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10333867"
locale: "fr"
placeholder: false
---

## Aperçu

cryptofoundry a publié une mise à jour majeure de marketmaking.app, introduisant six nouvelles langues, une présentation actualisée du bot de base gratuit pour les émetteurs de jetons, une documentation mise à jour et plusieurs améliorations d'expérience utilisateur.

## Langues

Le site prend désormais en charge huit langues. En plus des versions existantes en anglais et en russe, cryptofoundry a ajouté le chinois (simplifié), l'espagnol, l'arabe (RTL), le français, le japonais et l'allemand. Toutes les pages principales ont été traduites à partir de l'anglais, le russe servant de référence lorsque nécessaire. L'en-tête, le menu modal, le bouton de contact, le sélecteur de langue, les liens de navigation et le logo pointent désormais vers les URL spécifiques à chaque langue.

## Contenu et positionnement

La section « Qu'est-ce que le market making ? » est désormais alignée sur le concept actuel du README d'ADAMANT Tradebot, en mettant l'accent sur une version de base gratuite pour les émetteurs de jetons, accompagnée de modules et services premium. Les pages d'installation, de démarrage rapide et du bot gratuit de market making ont été revues et mises à jour. La référence des commandes a été synchronisée avec la base de code du bot pour ajouter de nouvelles commandes et corriger les descriptions obsolètes.

Les fonctionnalités premium ont été ajustées : le bloc « Pas de wash trading » a été supprimé, et les blocs « Balance watcher » et « Perpetual trading » (futures) ont été ajoutés. Les prix en dollars ont été remplacés par des liens « Demande de devis » qui ouvrent la fenêtre de contact. La page des services n'affiche plus les prix fixes ni la mention concernant la fourniture de clés API d'échange, et la page d'accueil ne mentionne plus le prix de démonstration de 800 $ dans la section « Commander une démo ». Diverses corrections grammaticales, liens rompus et dates obsolètes ont été corrigées dans les textes anglais et russes.

## Contact et expérience utilisateur

Un formulaire de contact modal peut désormais être ouvert depuis n'importe quelle page via l'ancre `#contact`, par exemple `/cex-mm/free-market-making-bot/#contact`. Telegram a été ajouté comme troisième option de contact via @adamant_business.

## Infrastructure

La pile serveur et WordPress a été mise à jour, incluant les paquets Ubuntu, PHP, MySQL, le cœur de WordPress, Polylang, Insert PHP et WP Rocket. Duplicator a été supprimé après la migration. Des sauvegardes complètes ont été effectuées avant et après la mise à jour.

![Discussion screenshot 1](/images/engineering-notes/github/discussions/10333867/001-007bf37e.webp)
