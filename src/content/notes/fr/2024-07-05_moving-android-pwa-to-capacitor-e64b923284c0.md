---
title: "Passage de l'application Android PWA à Capacitor"
slug: "moving-android-pwa-to-capacitor-e64b923284c0"
description: "L'application ADAMANT Android a migré de PWABuilder à Capacitor.js pour bénéficier d'un meilleur contrôle natif, de fonctionnalités avancées et d'une automatisation CI/CD."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/moving-android-pwa-to-capacitor-e64b923284c0"
publishedAt: "2024-07-05T08:19:06.778Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/e64b923284c0/001-1-n3f-qwiedtkwhrlo6feg7a-png.webp"
cardSpan: "full"
originalId: "medium:e64b923284c0"
locale: "fr"
placeholder: false
---

Précédemment, l'application Android ADAMANT était construite à l'aide de PWABuilder, ce qui imposait plusieurs limitations : aucun contrôle sur le niveau d'API cible, aucun accès au code natif, et aucune prise en charge de l'automatisation. Avec la mise à jour PWA v4.7, l'application est passée à Capacitor.js afin d'obtenir un contrôle total sur le code natif, la possibilité d'exécuter des fonctionnalités natives telles que les notifications push et l'accès à la caméra via l'API Cordova, l'optimisation du code, la création de greffons personnalisés, ainsi que l'automatisation CI/CD.

![Passage de l'application Android PWA à Capacitor](/images/engineering-notes/medium/e64b923284c0/002-0-l2l0siac7nx7sixj.webp)

### Pourquoi Capacitor.js ?

ADAMANT Messenger est une plateforme de messagerie décentralisée qui accorde la priorité aux performances, à la sécurité et à la maintenabilité. Capacitor.js a été choisi car il s'intègre parfaitement aux frameworks web modernes comme Vue.js, permet d'utiliser une base de code unique pour iOS, Android et le web, offre un accès aux API natives sans compromettre l'expérience web, et bénéficie d'un développement actif ainsi que d'une documentation robuste.

![Passage de l'application Android PWA à Capacitor](/images/engineering-notes/medium/e64b923284c0/003-0-2oz1atirxy-1lvqb.webp)

### Comparaison : Android natif, PWABuilder et Capacitor.js

Le développement Android natif offre un accès complet à toutes les fonctionnalités et API Android, de hautes performances et un contrôle précis de l'interface utilisateur et des fonctionnalités, mais nécessite une expertise en Java ou Kotlin, une base de code distincte par plateforme, ainsi qu'un coût et un temps de développement plus élevés.

PWABuilder permet de convertir facilement une PWA en application native avec une configuration minimale et un déploiement rapide, ce qui convient aux applications simples aux fonctionnalités natives limitées. Toutefois, il offre un accès restreint aux fonctionnalités natives du dispositif, des performances pouvant être inférieures à celles des applications entièrement natives, et une dépendance à un service tiers de conversion.

Capacitor.js permet une base de code unique multiplateforme avec accès aux API et greffons natifs, prend en charge les outils et frameworks modernes de développement web, et bénéficie d'une communauté active avec des mises à jour continues. Les inconvénients sont une courbe d'apprentissage légère pour les développeurs non familiers avec les ponts web-natif, et certaines fonctionnalités natives peuvent encore nécessiter des greffons personnalisés.

### Implémentation technique

L'application Android est construite nativement à l'aide de Capacitor.js et de GitHub Actions. L'implémentation a ajouté un workflow GitHub Actions, la configuration de Capacitor, les fichiers de manifeste Android, les images de l'écran de démarrage et les icônes de l'application, ainsi qu'un script de construction. L'ensemble des modifications est disponible dans la [demande de fusion sur GitHub](https://github.com/Adamant-im/adamant-im/pull/515).

![Passage de l'application Android PWA à Capacitor](/images/engineering-notes/medium/e64b923284c0/004-0-jzpjysc-tuu83qyr.webp)
