---
title: "ADAMANT Messenger v4.12.0 : une PWA plus sûre pour les conversations privées"
slug: "adamant-messenger-v4-12-0-a-safer-pwa-for-private-conversations-3afcd8416678"
description: "ADAMANT Messenger v4.12.0 est une mise à jour de sécurité pour la messagerie décentralisée, le portefeuille et la PWA. Mettez à jour vos applications dès maintenant."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-v4-12-0-a-safer-pwa-for-private-conversations-3afcd8416678"
publishedAt: "2026-08-11T00:19:47.725Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:3afcd8416678"
coverImage: "/images/engineering-notes/medium/3afcd8416678/001-e1683c8738.webp"
locale: "fr"
placeholder: false
---

ADAMANT Messenger v4.12.0 est une mise à jour de sécurité coordonnée pour la messagerie décentralisée, le portefeuille et l'expérience PWA. Les utilisateurs sur navigateur, mobile, Tor ou ordinateur de bureau doivent effectuer la mise à jour immédiatement pour bénéficier d'une protection renforcée des données sensibles.

La PWA actualisée conserve l'interface familière pour la création de comptes anonymes, la gestion des discussions et les contrôles du portefeuille multi-actifs. Comme toujours, aucun numéro de téléphone, adresse e-mail ou opérateur central n'est requis. La phrase secrète de l'utilisateur demeure la seule clé permettant d'accéder à une adresse anonyme et à un portefeuille auto-hébergé.

Sous l'interface, la version v4.12.0 corrige des failles XSS stockées confirmées, supprime le rendu v-html hérité et renforce le Markdown avec SafeHtml. Elle vérifie également les clés publiques fournies par les nœuds par rapport aux adresses qu'elles prétendent représenter, une limite importante lorsqu'une application décentralisée interagit avec une infrastructure publique. Le stockage local des secrets et le flux de dérivation de clé par mot de passe ont été mis à niveau avec scrypt versionné, tandis que les assistants cryptographiques migrent vers l'écosystème moderne @noble et @scure. Une politique de sécurité du contenu (CSP) stricte couvre désormais les versions PWA, Tor, testnet, Android et Electron.

Cette version améliore également la fiabilité du système. Les indexeurs de pièces lents ne sont plus considérés comme des nœuds sains, et les vérifications de version des nœuds utilisent désormais un versionnage sémantique réel. De plus, les messages de signalement AIP-6 sont exclus de l'historique de discussion visible. Pour les utilisateurs Android, les limites de sauvegarde et d'extraction de données ont été renforcées, ce qui réduit les hypothèses implicites et sécurise le parcours de la connexion à la remise des messages.

![ADAMANT Messenger v4.12.0 : une PWA plus sûre pour les conversations privées](/images/engineering-notes/medium/3afcd8416678/002-419a41b893.webp)

![ADAMANT Messenger v4.12.0 : une PWA plus sûre pour les conversations privées](/images/engineering-notes/medium/3afcd8416678/003-dc272cf2f1.webp)

![ADAMANT Messenger v4.12.0 : une PWA plus sûre pour les conversations privées](/images/engineering-notes/medium/3afcd8416678/004-c1c599fad0.webp)
