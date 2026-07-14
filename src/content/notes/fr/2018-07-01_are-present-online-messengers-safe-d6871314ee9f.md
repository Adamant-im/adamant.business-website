---
title: "Les messagers en ligne actuels sont-ils sûrs ?"
slug: "are-present-online-messengers-safe-d6871314ee9f"
description: "Les messageries en ligne sont omniprésentes, mais peu d'utilisateurs évaluent sérieusement la sécurité de leurs données. Analyse des méthodes de chiffrement et des systèmes de transmission."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/are-present-messengers-safe-d6871314ee9f"
publishedAt: "2018-07-01T10:52:29.801Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/d6871314ee9f/001-0-4pq2ekt1kq-x6n.webp"
cardSpan: "full"
originalId: "medium:d6871314ee9f"
locale: "fr"
placeholder: false
---

Les messageries textuelles en ligne sont une forme de communication omniprésente, pourtant peu d'utilisateurs évaluent sérieusement la manière dont leurs données personnelles sont stockées, transmises et accessibles. Cette analyse examine les méthodes de chiffrement et les systèmes de livraison de messages de plusieurs services de messagerie populaires, en se concentrant sur des faits vérifiables plutôt que sur les récits médiatiques.

WhatsApp, utilisé par plus de 1,5 milliard d'utilisateurs actifs mensuels, a introduit un chiffrement « de bout en bout » en 2016. Toutefois, les paramètres de sécurité critiques étaient cachés profondément dans l'interface, et des chercheurs ont identifié une porte dérobée permettant la manipulation des données via la modification des clés de chiffrement et la duplication dans le cloud. Le code source fermé de WhatsApp rend impossible la vérification indépendante de ses prétendues garanties de sécurité.

Facebook Messenger, utilisé par 1,3 milliard d'utilisateurs, propose de la même manière des conversations « de bout en bout » uniquement lorsqu'elles sont activées manuellement. Son code source fermé et l'historique de Facebook en matière de confidentialité des données soulèvent de sérieuses questions de confiance.

WeChat, utilisé par plus d'un milliard de personnes en Chine, affirme que la confidentialité des utilisateurs est une priorité absolue. Pourtant, ses déclarations de confidentialité décrivent des méthodes de chiffrement complexes sans mentionner le chiffrement de bout en bout, et son code source reste fermé. Le service fonctionne sous les exigences strictes chinoises de conservation des données et de surveillance. QQ Mobile, un autre service chinois majeur avec près de 800 millions d'utilisateurs, ne dispose pas du tout de chiffrement de bout en bout et conserve également son code source privé.

D'autres services bien connus — notamment Viber, Skype, Snapchat et Line — partagent le même défaut fondamental : un code source fermé qui empêche tout audit de sécurité indépendant, malgré des campagnes marketing agressives sur la confidentialité.

Telegram, populaire pour la communication privée au Moyen-Orient, n'ouvre pas entièrement son code source. Bien que son API et ses applications clientes soient open source, le code côté serveur n'a pas été publié, malgré une déclaration affirmant que « tout le code sera publié éventuellement ». Sans transparence côté serveur, aucune preuve vérifiable n'existe quant à la gestion et au stockage des messages des utilisateurs.

Les applications visant la confidentialité échouent régulièrement en raison de limitations architecturales inhérentes. Celles-ci incluent une authentification obligatoire par numéro de téléphone, la divulgation de l'adresse IP, le stockage de journaux sur l'appareil, des capacités de blocage arbitraire des utilisateurs et un stockage centralisé des données.

Ces lacunes systémiques ont motivé la création du messager ADAMANT, qui adopte une approche fondamentalement différente en s'appuyant sur la technologie blockchain. La base de code entièrement open source d'ADAMANT permet la vérification indépendante de ses propriétés de sécurité.

![Les messagers en ligne actuels sont-ils sûrs ?](/images/engineering-notes/medium/d6871314ee9f/002-0-qsxqt626jqio99tb.webp)

En exploitant la blockchain, ADAMANT élimine la dépendance aux serveurs centraux, aux développeurs et aux systèmes d'identification internes. Le soutien au réseau est assuré par les utilisateurs, qui gagnent une monnaie interne en maintenant l'infrastructure. Le projet est en cours de développement actif, avec une récente implémentation du support ETH.

![Les messagers en ligne actuels sont-ils sûrs ?](/images/engineering-notes/medium/d6871314ee9f/003-0-cgrras4imu0tlqjn.webp)
