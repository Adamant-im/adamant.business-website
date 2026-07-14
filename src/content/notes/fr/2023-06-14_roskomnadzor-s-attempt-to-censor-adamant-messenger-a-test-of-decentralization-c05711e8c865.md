---
title: "La tentative de censure de Roskomnadzor contre ADAMANT Messenger : un test de la décentralisation"
slug: "roskomnadzor-s-attempt-to-censor-adamant-messenger-a-test-of-decentralization-c05711e8c865"
description: "Roskomnadzor, l'organisme fédéral russe de surveillance des médias, a tenté de bloquer le site d'ADAMANT Messenger. Selon l'équipe ADAMANT, cette action n'a fait que souligner la résilience de la décentralisation."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/roskomnadzors-attempt-to-censor-adamant-messenger-a-test-of-decentralization-c05711e8c865"
publishedAt: "2023-06-14T07:54:33.044Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/c05711e8c865/001-0-jwcvr-n50oxiub1g.webp"
cardSpan: "full"
originalId: "medium:c05711e8c865"
locale: "fr"
placeholder: false
---

Roskomnadzor, l'organisme fédéral russe de surveillance des médias, a tenté de bloquer le site d'ADAMANT Messenger. Selon l'équipe ADAMANT, cette action n'a fait que souligner la résilience de la décentralisation, car l'architecture de la plateforme ne comporte aucun point central pouvant être ciblé.

![La tentative de censure de Roskomnadzor contre ADAMANT Messenger : un test de la décentralisation](/images/engineering-notes/medium/c05711e8c865/002-0-huj1r-ko7v6mmyj2.webp)

![La tentative de censure de Roskomnadzor contre ADAMANT Messenger : un test de la décentralisation](/images/engineering-notes/medium/c05711e8c865/003-0-u2rhtpmennkqqq87.webp)

## Pourquoi la censure est inefficace contre ADAMANT

ADAMANT Messenger utilise la technologie blockchain pour offrir une plateforme de communication indépendante de toute infrastructure tierce. Contrairement aux applications de messagerie classiques qui stockent les données sur des serveurs centralisés, ADAMANT distribue les messages sur un réseau de nœuds indépendants. Il n'existe aucun serveur central à fermer, ni organisation unique contrôlant les données.

La réponse de l'équipe ADAMANT a été claire : « La censure est impossible. ADAMANT est un protocole véritablement décentralisé. Ce n'est pas simplement une affirmation, mais une caractéristique intégrée à la structure même de notre plateforme. » Ces propriétés sont documentées dans les Conditions d'Utilisation de la plateforme, disponibles à la fois sur le clearnet et via Tor.

![La tentative de censure de Roskomnadzor contre ADAMANT Messenger : un test de la décentralisation](/images/engineering-notes/medium/c05711e8c865/004-0-xm12prccf1rsvrxa.webp)

## La Fondation ADAMANT

La demande de Roskomnadzor mentionnait l'organisation « ADAMANT TECH LABS », qui n'existe plus. Depuis décembre 2020, ADAMANT fonctionne sous forme de Fondation, sans leader ni direction centralisée. Le projet open source est maintenu par une communauté de développeurs sur GitHub.

![La tentative de censure de Roskomnadzor contre ADAMANT Messenger : un test de la décentralisation](/images/engineering-notes/medium/c05711e8c865/005-0-ptiedse-rssglttj.webp)

## Impact pour les utilisateurs en Russie

Même avec le site officiel bloqué, le protocole ADAMANT continue de fonctionner normalement. Les messages étant stockés sur plusieurs nœuds indépendants plutôt que sur un serveur central, le réseau ne possède aucun point d'extrémité unique pouvant être mis hors ligne. Cet événement a servi de test grandeur nature des affirmations d'ADAMANT concernant sa décentralisation, et le système est resté opérationnel pendant toute la durée du blocage.

Les utilisateurs en Russie peuvent s'attendre à ce que le site principal, l'URL de l'application web et les nœuds publics sous `adamant.im` soient inaccessibles. En attendant, ils peuvent se connecter via un VPN ou via le réseau Tor. Les applications de bureau pour Windows, Linux et macOS sont disponibles sur les publications GitHub du projet et se connectent directement au protocole sans dépendre de l'interface web.

Pour une solution durable, les utilisateurs peuvent exécuter leur propre nœud ADAMANT avec l'API activée dans la configuration, héberger eux-mêmes une instance du Messenger à partir du dépôt open source, et modifier le fichier de configuration du Messenger pour pointer vers ce nœud auto-hébergé. Cela élimine toute dépendance à une infrastructure publique pouvant être bloquée.

## Conclusions

Le blocage par Roskomnadzor illustre la tension persistante entre les autorités étatiques cherchant à contrôler les communications numériques et les plateformes décentralisées conçues pour résister à ce type de contrôle. Pour ADAMANT, cet incident a démontré concrètement qu'un protocole de messagerie basé sur la blockchain peut continuer à fonctionner même lorsque sa présence web principale est rendue inaccessible. L'équipe ADAMANT a réaffirmé son engagement à améliorer la plateforme et à garantir une communication sécurisée, privée et non censurée dans le monde entier.
