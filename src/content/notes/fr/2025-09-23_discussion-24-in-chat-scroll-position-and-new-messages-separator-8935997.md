---
title: "Position de défilement dans le chat et séparateur de nouveaux messages"
slug: "discussion-24-in-chat-scroll-position-and-new-messages-separator-8935997"
description: "Ce document décrit le comportement de la position de défilement dans les chats ADAMANT lorsqu'un utilisateur entre ou interagit avec un chat."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/24"
publishedAt: "2025-09-23T07:35:30Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8935997"
locale: "fr"
placeholder: false
---

Ce document décrit comment la position de défilement dans les chats ADAMANT doit se comporter lorsque l’utilisateur entre dans un chat ou interagit avec celui-ci.

## Deux états de défilement

La position de défilement est enregistrée séparément pour chaque chat. Un chat est soit dans un état où aucune position n’est enregistrée, soit dans un état où une position a été sauvegardée parce que l’utilisateur a fait défiler manuellement et enregistré une position de défilement.

## Affichage du bouton Défiler vers le bas

Le bouton **Défiler vers le bas** doit apparaître lorsque le dernier message sur une seule ligne est masqué d’environ trois quarts de l’écran.

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8935997/001-d6f70e7f.webp)

Lorsque l’utilisateur appuie sur le bouton, le comportement dépend de la présence de nouveaux messages. S’il y a de nouveaux messages — indiqués par un compteur affiché près du bouton —, la vue défile jusqu’au séparateur **Nouveaux messages**. S’il n’y a pas de nouveaux messages, ou si l’utilisateur est déjà au niveau ou en dessous du séparateur, la vue défile tout en bas.

Lors du défilement vers le séparateur Nouveaux messages, celui-ci doit être positionné avec environ trois lignes de messages au-dessus. Aucun son, vibration ou surlignage de message ne doit être déclenché dans ce cas.

Le séparateur ne doit jamais apparaître avant le tout premier message d’un chat. Par exemple, si un utilisateur reçoit dix messages d’un nouveau contact, le chat défile jusqu’au premier message, mais aucun séparateur n’est affiché.

## Enregistrement de la position de défilement

La position de défilement ne doit être enregistrée que lorsque l’utilisateur n’est pas tout en bas du chat. Une position à quelques pixels du bas est considérée comme « tout en bas » et ne doit pas être enregistrée. En règle générale, si le bouton **Défiler vers le bas** est visible, la position doit être sauvegardée.

![Discussion screenshot 2](/images/engineering-notes/github/discussions/8935997/002-60f2788b.webp)

![Discussion screenshot 3](/images/engineering-notes/github/discussions/8935997/003-4e8be668.webp)

![Discussion screenshot 4](/images/engineering-notes/github/discussions/8935997/004-70d36182.webp)

Si la longueur du chat est inférieure à la hauteur de l’écran — par exemple, quelques courts messages —, il est toujours considéré comme étant tout en bas : le bouton est masqué et la position de défilement n’est pas enregistrée.

## Restauration de la position de défilement

Trois événements doivent être pris en compte. Premièrement, l’utilisateur est dans un chat lorsque de nouveaux messages arrivent. Deuxièmement, l’utilisateur ouvre un chat contenant de nouveaux messages depuis la liste des chats ou depuis un autre écran, comme **Aller au chat** depuis **Liste des transactions → Détails de la transaction**. Troisièmement, l’utilisateur ouvre un chat depuis une notification de nouveau message, que ce soit en application ou par notification push.

Lorsqu’un utilisateur est dans un chat et qu’un nouveau message arrive, le comportement dépend de la présence d’une position de défilement enregistrée. Si aucune position n’est stockée, le chat défile toujours tout en bas à chaque nouveau message entrant ou sortant, et aucun séparateur n’est affiché. Si une position est enregistrée, un message entrant ne déclenche pas de défilement ; à la place, le compteur sur le bouton est mis à jour et le séparateur est affiché, que l’utilisateur peut révéler en appuyant sur le bouton ou en faisant défiler manuellement. Un message sortant, en revanche, fait toujours défiler tout en bas, indépendamment de la position enregistrée.

Lorsqu’un utilisateur accède à un chat contenant de nouveaux messages depuis la liste des chats ou un autre écran, et qu’aucune position n’est enregistrée, le chat va au séparateur **Nouveaux messages**. Si une position est enregistrée, le chat ne défile pas ; le compteur sur le bouton est mis à jour et le séparateur est affiché, que l’utilisateur verra lorsqu’il appuiera sur le bouton **Défiler vers le bas** ou fera défiler manuellement.

Lorsqu’un utilisateur accède à un chat depuis une notification de nouveau message, le chat va au séparateur **Nouveaux messages**, quelle que soit la présence d’une position enregistrée. Même si plusieurs messages ont été reçus, la vue ne doit pas sauter jusqu’au tout dernier message.

Ces règles garantissent un comportement cohérent et prévisible du défilement, des séparateurs et de la restauration de la position dans tous les points d’entrée du chat dans ADAMANT.
