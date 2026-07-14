---
title: "Conditions d'utilisation des messageries : Telegram et WhatsApp"
slug: "messengers-terms-of-service-telegram-and-whatsapp-4e60a8178004"
description: "Cet article examine les politiques de confidentialité officielles de Telegram et WhatsApp, deux services de messagerie très utilisés. Malgré leur ampleur, aucun n’a publié l’intégralité de son code source côté serveur."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/messengers-terms-of-service-telegram-and-whatsapp-4e60a8178004"
publishedAt: "2018-07-18T13:49:15.655Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4e60a8178004/001-0-w-bbrzmuju79thvm.webp"
cardSpan: "full"
originalId: "medium:4e60a8178004"
locale: "fr"
placeholder: false
---

Cet article examine les politiques de confidentialité officielles de Telegram et WhatsApp, deux des services de messagerie les plus utilisés. Malgré leur ampleur et leur ancienneté, aucune des deux plateformes n’a publié l’intégralité de son code source côté serveur, rendant impossible la vérification indépendante de leurs affirmations en matière de sécurité.

## Telegram

Telegram se décrit comme un projet open source, invitant les utilisateurs à étudier son API, son protocole et son code source. En pratique, toutefois, Telegram n’a jamais entièrement ouvert le code de son infrastructure serveur, de sa couche de stockage de données ou de son code interne de traitement des messages. Ce manque soulève des questions sur la différence entre les discussions cloud classiques et les « discussions chiffrées » facultatives, ainsi que sur l’étendue du chiffrement de bout en bout sur la plateforme.

Telegram stocke sur ses serveurs les messages, photos, vidéos et documents provenant des discussions cloud. Il utilise les numéros de téléphone comme identifiants uniques et demande l’autorisation avant de synchroniser les contacts. La politique indique que Telegram « ne stocke que les données nécessaires à son bon fonctionnement », sans préciser exactement de quelles données il s’agit.

Une mise à jour de 2018 précise que Telegram traite les données personnelles sur la base de ses propres « intérêts légitimes ». Les pseudos, photos de profil et noms d’utilisateur sont toujours publics. Notamment, cette conception permet d’extraire le numéro de mobile d’un utilisateur via l’application officielle, comme documenté dans une recherche antérieure d’ADAMANT.

Les dispositions les plus importantes concernent l’accès aux messages. La politique de Telegram indique explicitement que des modérateurs peuvent consulter les messages signalés par les destinataires, et que des algorithmes automatisés peuvent analyser les messages des discussions cloud pour lutter contre le spam et le phishing. Le service collecte également des métadonnées, notamment les adresses IP, les informations sur les appareils, les versions de l’application Telegram utilisées et l’historique des changements de nom d’utilisateur, et peut stocker des métadonnées agrégées pour prendre en charge les fonctionnalités multi-appareils. En résumé, Telegram conserve un accès au contenu des discussions cloud et se réserve le droit de l’inspecter manuellement ou automatiquement.

En ce qui concerne les forces de l’ordre, Telegram déclare que s’il reçoit une ordonnance judiciaire confirmant qu’un utilisateur est suspecté de terrorisme, il peut communiquer l’adresse IP et le numéro de téléphone de cet utilisateur aux autorités compétentes. Une fois le numéro de téléphone divulgué, les organismes étatiques peuvent demander davantage de données d’abonné à l’opérateur SIM, élargissant ainsi la portée de l’accès.

## WhatsApp

WhatsApp a été racheté par Facebook (aujourd’hui Meta) en 2014, et sa politique de confidentialité reflète cette relation corporative. La politique commence par indiquer que WhatsApp doit collecter des informations pour « exploiter, fournir, améliorer, comprendre, personnaliser, prendre en charge et promouvoir nos Services » — une justification large, sans justification spécifique pour chaque catégorie de collecte de données.

Les utilisateurs doivent fournir un numéro de téléphone mobile et un nom de profil. WhatsApp collecte également régulièrement les numéros de téléphone présents dans le carnet d’adresses de l’utilisateur, y compris ceux de contacts n’utilisant pas le service. Si un message ne peut pas être livré immédiatement, WhatsApp peut le conserver sur ses serveurs jusqu’à 30 jours, et peut conserver le contenu plus longtemps dans certaines circonstances.

Les informations collectées sur l’appareil et la connexion incluent le modèle du matériel, le système d’exploitation, le niveau de batterie, la puissance du signal, la version de l’application, les informations du navigateur, le réseau mobile, le FAI, la langue, le fuseau horaire, l’adresse IP et divers identifiants d’appareil. Les informations de localisation sont également collectées via l’adresse IP, le GPS, les signaux Bluetooth, les points d’accès Wi-Fi à proximité, les balises et les antennes-relais.

WhatsApp reçoit des informations sur les utilisateurs provenant d’autres personnes et entreprises. Lorsqu’un utilisateur communique avec un compte professionnel, cette entreprise peut utiliser une entreprise tierce pour stocker, lire et répondre aux messages en son nom. WhatsApp collabore également avec des fournisseurs de services tiers et d’autres sociétés Facebook, partageant des données au sein de cet écosystème corporatif.

La politique se réserve le droit de collecter, utiliser, conserver et partager les informations utilisateur chaque fois que WhatsApp a une « conviction sincère » que cela est « raisonnablement nécessaire » — un critère qui laisse une grande discrétion à la plateforme.

## Points clés

Telegram et WhatsApp collectent tous deux d’importantes métadonnées et conservent différents niveaux d’accès aux communications des utilisateurs. Les discussions cloud de Telegram ne sont pas chiffrées de bout en bout par défaut et sont soumises à une analyse automatisée et manuelle. WhatsApp, intégré à l’écosystème Meta, collecte des données étendues sur les appareils, la localisation et les contacts. Aucune des deux plateformes n’a publié l’intégralité du code source côté serveur nécessaire pour vérifier indépendamment leurs affirmations en matière de sécurité et de confidentialité. Les utilisateurs soucieux de la souveraineté de leurs données devraient consulter les sources originales — [la politique de confidentialité de Telegram](https://telegram.org/privacy) et [la politique de confidentialité de WhatsApp](https://www.whatsapp.com/legal/?lang=en#privacy-policy) — et envisager des alternatives open source dotées d’architectures vérifiables.
