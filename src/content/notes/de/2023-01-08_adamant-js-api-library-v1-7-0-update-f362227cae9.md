---
title: "ADAMANT JS API Library v1.7.0 Update"
slug: "adamant-js-api-library-v1-7-0-update-f362227cae9"
description: "Die ADAMANT JavaScript-API-Bibliothek v1.7.0 unterstützt nun Callbacks für die Initialisierungslogik nach dem Start."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-js-api-library-v1-7-0-update-f362227cae9"
publishedAt: "2023-01-08T14:33:18.085Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f362227cae9/001-1-fyo9k3w-4-kerjuoncf9fw-png.webp"
cardSpan: "full"
originalId: "medium:f362227cae9"
locale: "de"
placeholder: false
---

Die ADAMANT JavaScript API-Bibliothek v1.7.0 unterstützt nun Callbacks für die Logik nach der Initialisierung. Diese Version enthält zwei Änderungen: eine neue Methode `api.setStartupCallback()` sowie einen optionalen Callback, der als dritter Parameter an den `api`-Konstruktor übergeben werden kann. Beide Mechanismen ermöglichen es, benutzerdefinierten Code auszuführen, nachdem die Bibliothek die Initialisierung abgeschlossen hat. Dies ist nützlich für Setup-Aufgaben, die eine bereitgestellte API-Instanz voraussetzen.

Die vollständige API-Dokumentation ist im [ADAMANT API client wiki](https://github.com/Adamant-im/adamant-api-jsclient/wiki/API-Specification) verfügbar. Die Details zur Version finden sich in den [v1.7.0 Release Notes](https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v1.7.0).
