---
title: "ADAMANT : Au-delà du messager basique — Transferts multi-tokens et confidentialité"
slug: "adamant-project-is-more-ambitious-than-you-thought-bcff97b3e65f"
description: "Le projet open source ADAMANT développe un messager avec messagerie privée instantanée et transferts de tokens ADM. L'équipe étend désormais la plateforme pour prendre en charge les transferts multi-tokens."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-project-is-more-ambitious-than-you-thought-bcff97b3e65f"
publishedAt: "2018-06-02T12:39:07.116Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/bcff97b3e65f/001-0-no5snmhgxset6lqg.webp"
cardSpan: "full"
originalId: "medium:bcff97b3e65f"
locale: "fr"
placeholder: false
---

Le projet open source ADAMANT a développé un messager permettant la messagerie privée instantanée et les transferts de tokens ADM. L'équipe de développement concentre désormais ses efforts sur l'extension de la plateforme afin de prendre en charge les transferts multi-tokens au sein des discussions privées, dans le but de permettre l'envoi et la réception directe de cryptomonnaies telles que le Bitcoin, l'Ethereum et Lisk directement depuis le messager.

Le token ADM soutient l'économie de la plateforme. Il sert de frais de transfert pour les messages et les paiements, assurant ainsi le fonctionnement de l'infrastructure réseau. Grâce à un temps de bloc de 5 secondes, le token ADM permet des transactions rapides et est directement accessible depuis les écrans de discussion pour les paiements. ADM fonctionne comme un système de token entièrement indépendant et autosuffisant.

![Le projet ADAMANT est plus ambitieux que vous ne le pensiez.](/images/engineering-notes/medium/bcff97b3e65f/002-0-8ofcnhmzjqjcc-p8.webp)

L'intégration de cryptomonnaies majeures dans l'écosystème de transfert vise à attirer des utilisateurs de ces communautés vers la plateforme ADAMANT Messenger, générant ainsi des frais plus élevés et une demande accrue pour le token ADM.

## Architecture de confidentialité

ADAMANT est une plateforme blockchain sécurisée dédiée aux transferts de données et de messages, construite sur une base de code Lisk. La blockchain assure l'anonymat, empêchant ainsi l'historique de discussion d'un utilisateur d'être tracé. Contrairement aux réseaux sociaux centralisés qui collectent et stockent des données personnelles sur des serveurs tiers vulnérables aux violations, ADAMANT ne nécessite qu'une clé privée pour utiliser le système, clé qui peut être générée en un seul clic.

Les utilisateurs n'ont pas besoin de fournir de nom, d'adresse e-mail, de numéro de téléphone ou d'informations sur leur appareil. La base de code open source permet à quiconque d'auditer l'authenticité du système et de créer des implémentations indépendantes.

Les fonctionnalités clés de confidentialité incluent l'absence d'accès aux carnets d'adresses ou aux informations de localisation des utilisateurs, une anonymat complet sans identification d'utilisateur, et un chiffrement de bout en bout : les messages sont chiffrés sur l'appareil de l'expéditeur et déchiffrés côté destinataire. L'application cliente effectue toutes les opérations cryptographiques localement et ne transmet jamais la clé privée ou la phrase mnémonique via le réseau. L'historique des messages est chargé directement depuis la blockchain plutôt que stocké localement, et contrairement aux messagers P2P, les adresses IP des utilisateurs ne peuvent pas être obtenues. Les comptes ADAMANT ne peuvent être fermés, bloqués ou limités par personne, y compris les développeurs.

ADAMANT démontre que les messagers blockchain offrent des avantages en matière d'ouverture, de protection des messages, de distribution et d'infrastructure fiable, permettant une messagerie anonyme sans interruption ni régulation par des tiers.
