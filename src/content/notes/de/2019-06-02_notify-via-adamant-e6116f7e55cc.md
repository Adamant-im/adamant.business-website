---
title: "Benachrichtigung über ADAMANT"
slug: "notify-via-adamant-e6116f7e55cc"
description: "ADAMANT eignet sich als Benachrichtigungstransport: Nachrichtenübermittlung wird auf der Blockchain validiert, Inhalte sind unveränderlich und geräteunabhängig zugänglich."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/notify-via-adamant-e6116f7e55cc"
publishedAt: "2019-06-02T14:22:43.887Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e6116f7e55cc/001-1-8rvans74h-cl-ux-bpeiaw-png.webp"
cardSpan: "full"
originalId: "medium:e6116f7e55cc"
locale: "de"
placeholder: false
---

ADAMANT bietet mehrere Eigenschaften, die es als Benachrichtigungstransport geeignet machen: Jede Nachrichtenübermittlung wird on-chain validiert, Nachrichten und ihre Reihenfolge sind unveränderlich, die Speicherzeit ist praktisch unbegrenzt, und der Zugriff ist nicht an ein bestimmtes Gerät gebunden. Das Projekt ist Open Source. Ein praktisches Beispiel ist die Empfang von Benachrichtigungen über Pool-Operationen durch Betreiber von Kryptowährungspools über ADAMANT-Nachrichten.

Entwickler können ADAMANT-Benachrichtigungen über drei Hauptinterfaces integrieren. Die ADAMANT Console bietet einen `send message`-Befehl und ist ein sprachunabhängiges CLI-Tool. Für JavaScript-Anwendungen steht die `send`-Funktion in der ADAMANT API JS-Clientbibliothek zur Verfügung. Schließlich stellt der native ADAMANT-Knoten eine eigene API für die direkte Integration bereit.

Der Nachrichteninhalt unterstützt sowohl Markdown-Formatierung als auch Emoji, wodurch strukturierte und gut lesbare Benachrichtigungen möglich sind.
