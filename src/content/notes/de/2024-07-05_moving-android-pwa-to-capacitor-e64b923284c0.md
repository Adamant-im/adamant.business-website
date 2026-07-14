---
title: "Umstellung der Android-PWA auf Capacitor"
slug: "moving-android-pwa-to-capacitor-e64b923284c0"
description: "Die ADAMANT Android-App wechselte von PWABuilder zu Capacitor.js, um bessere Kontrolle, Native-Funktionen und CI/CD-Automatisierung zu erhalten."
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
locale: "de"
placeholder: false
---

Zuvor wurde die ADAMANT Android-App mit PWABuilder erstellt, was mehrere Einschränkungen mit sich brachte: keine Kontrolle über die Ziel-API-Version, kein Zugriff auf nativen Code und keine Unterstützung für Automatisierung. Mit dem PWA v4.7-Update wechselte die App zu Capacitor.js, um vollständige Kontrolle über den nativen Code zu erhalten, native Funktionen wie Push-Benachrichtigungen und Kamera über die Cordova-API nutzen zu können, Code-Optimierungen vorzunehmen, benutzerdefinierte Plugins einzubinden und CI/CD-Automatisierung zu ermöglichen.

![Moving Android PWA to Capacitor](/images/engineering-notes/medium/e64b923284c0/002-0-l2l0siac7nx7sixj.webp)

### Warum Capacitor.js?

ADAMANT Messenger ist eine dezentrale Messaging-Plattform, bei der Leistung, Sicherheit und Wartbarkeit im Vordergrund stehen. Capacitor.js wurde gewählt, da es nahtlos mit modernen Web-Frameworks wie Vue.js integriert werden kann, einen einheitlichen Codebase für iOS, Android und das Web ermöglicht, Zugriff auf native APIs bietet, ohne die Web-Erfahrung einzuschränken, und von aktiver Entwicklung sowie umfassender Dokumentation profitiert.

![Moving Android PWA to Capacitor](/images/engineering-notes/medium/e64b923284c0/003-0-2oz1atirxy-1lvqb.webp)

### Vergleich: Native Android, PWABuilder und Capacitor.js

Die native Android-Entwicklung bietet vollen Zugriff auf alle Android-Funktionen und APIs, hohe Leistung und feingranulierte Kontrolle über UI und Funktionalität, erfordert jedoch Kenntnisse in Java oder Kotlin, einen separaten Codebase pro Plattform sowie höheren Entwicklungsaufwand und längere Entwicklungszeiten.

PWABuilder ermöglicht eine einfache Konvertierung einer PWA in eine native App mit minimalem Setup und schneller Bereitstellung, was für einfache Apps mit begrenzter nativer Funktionalität geeignet ist. Allerdings bietet es nur eingeschränkten Zugriff auf native Gerätefunktionen, möglicherweise geringere Leistung im Vergleich zu vollständig nativen Apps und Abhängigkeit von einem Drittanbieter-Konvertierungsdienst.

Capacitor.js bietet einen plattformübergreifenden, einheitlichen Codebase mit Zugriff auf native APIs und Plugins, Unterstützung moderner Web-Entwicklungswerkzeuge und -frameworks sowie eine aktive Community mit kontinuierlichen Updates. Die Nachteile sind eine leichte Lernkurve für Nutzer ohne Erfahrung mit Web-Native-Brücken, und einige native Funktionen erfordern möglicherweise weiterhin benutzerdefinierte Plugins.

### Technische Umsetzung

Die Android-App wird nun nativ mithilfe von Capacitor.js und GitHub Actions erstellt. Die Implementierung fügte einen GitHub Actions-Workflow, Capacitor-Konfiguration, Android-Manifest-Dateien, Splash-Screen-Bilder und App-Symbole sowie ein Build-Skript hinzu. Alle Änderungen sind im [Pull Request auf GitHub](https://github.com/Adamant-im/adamant-im/pull/515) einsehbar.

![Moving Android PWA to Capacitor](/images/engineering-notes/medium/e64b923284c0/004-0-jzpjysc-tuu83qyr.webp)
