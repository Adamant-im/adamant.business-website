---
title: "Position beim Scrollen im Chat und Trennlinie für neue Nachrichten"
slug: "discussion-24-in-chat-scroll-position-and-new-messages-separator-8935997"
description: "Dieses Dokument beschreibt das Verhalten der Scrollposition in ADAMANT-Chats beim Betreten oder Interagieren mit einem Chat. Zwei Scrollzustände werden unterschieden."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/24"
publishedAt: "2025-09-23T07:35:30Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8935997"
locale: "de"
placeholder: false
---

Dieses Dokument beschreibt, wie sich die Scrollposition in ADAMANT-Chats verhalten soll, wenn ein Benutzer einen Chat betritt oder mit ihm interagiert.

## Zwei Scrollzustände

Die Scrollposition wird separat für jeden Chat gespeichert. Ein Chat befindet sich entweder in einem Zustand, in dem keine Position gespeichert ist, oder in einem Zustand, in dem eine Position gespeichert wurde, weil der Benutzer manuell gescrollt und eine Scrollposition festgelegt hat.

## Anzeige der Schaltfläche Zum Ende scrollen

Die Schaltfläche **Zum Ende scrollen** sollte angezeigt werden, wenn die letzte einzeilige Nachricht ungefähr zu drei Vierteln des Bildschirms verdeckt ist.

![Diskussionsscreenshot 1](/images/engineering-notes/github/discussions/8935997/001-d6f70e7f.webp)

Wenn der Benutzer auf die Schaltfläche tippt, hängt die Aktion davon ab, ob neue Nachrichten vorhanden sind. Gibt es neue Nachrichten – angezeigt durch einen Zähler neben der Schaltfläche –, scrollt die Ansicht zum **Neue Nachrichten**-Trenner. Gibt es keine neuen Nachrichten oder befindet sich der Benutzer bereits am oder unterhalb des Trenners, scrollt die Ansicht ganz nach unten.

Beim Scrollen zum Trenner „Neue Nachrichten“ sollte der Trenner so positioniert werden, dass etwa drei Nachrichtenzeilen darüber angezeigt werden. In diesem Fall sollten kein Ton, keine Vibration und keine Hervorhebung der Nachrichten ausgelöst werden.

Der Trenner sollte niemals vor der allerersten Nachricht in einem Chat erscheinen. Wenn beispielsweise ein Benutzer zehn Nachrichten von einem neuen Kontakt erhält, scrollt der Chat zur ersten Nachricht, aber kein Trenner wird angezeigt.

## Speichern der Scrollposition

Die Scrollposition sollte nur dann gespeichert werden, wenn sich der Benutzer nicht ganz unten im Chat befindet. Eine Position innerhalb weniger Pixel vom unteren Rand gilt als „ganz unten“ und sollte nicht gespeichert werden. Als Faustregel gilt: Wenn die Schaltfläche **Zum Ende scrollen** sichtbar ist, sollte die Position gespeichert werden.

![Diskussionsscreenshot 2](/images/engineering-notes/github/discussions/8935997/002-60f2788b.webp)

![Diskussionsscreenshot 3](/images/engineering-notes/github/discussions/8935997/003-4e8be668.webp)

![Diskussionsscreenshot 4](/images/engineering-notes/github/discussions/8935997/004-70d36182.webp)

Wenn die Chat-Länge unterhalb der Bildschirmhöhe liegt – beispielsweise bei wenigen kurzen Nachrichten –, gilt dies immer als „ganz unten“: Die Schaltfläche wird ausgeblendet und die Scrollposition nicht gespeichert.

## Wiederherstellen der Scrollposition

Es gibt drei Ereignisse, die berücksichtigt werden müssen. Erstens: Der Benutzer befindet sich bereits in einem Chat, als eine neue Nachricht eintrifft. Zweitens: Der Benutzer öffnet einen Chat mit neuen Nachrichten aus der Chat-Liste oder von einem anderen Bildschirm, z. B. über **Gehe zum Chat** in **Transaktionsliste → Transaktionsdetails**. Drittens: Der Benutzer öffnet einen Chat über eine Benachrichtigung über eine neue Nachricht, entweder in der App oder per Push.

Befindet sich der Benutzer bereits in einem Chat, wenn eine neue Nachricht eintrifft, hängt das Verhalten davon ab, ob eine Scrollposition gespeichert ist. Ist keine Position gespeichert, scrollt der Chat bei jeder eingehenden oder ausgehenden Nachricht automatisch ganz nach unten, und es wird kein Trenner angezeigt. Ist eine Position gespeichert, führt eine eingehende Nachricht nicht zu einem automatischen Scrollen; stattdessen wird der Zähler auf der Schaltfläche aktualisiert und der Trenner angezeigt, den der Benutzer durch Antippen der Schaltfläche oder manuelles Scrollen erreicht. Eine ausgehende Nachricht hingegen führt stets dazu, dass ganz nach unten gescrollt wird, unabhängig von der gespeicherten Position.

Betritt der Benutzer einen Chat mit neuen Nachrichten aus der Chat-Liste oder einem anderen Bildschirm, und ist keine Position gespeichert, geht der Chat zum Trenner „Neue Nachrichten“. Ist eine Position gespeichert, erfolgt kein automatisches Scrollen; der Zähler auf der Schaltfläche wird aktualisiert und der Trenner angezeigt, den der Benutzer sieht, wenn er auf die Schaltfläche **Zum Ende scrollen** tippt oder manuell scrollt.

Betritt der Benutzer einen Chat über eine Benachrichtigung über eine neue Nachricht, geht der Chat unabhängig davon, ob eine Position gespeichert ist, zum Trenner „Neue Nachrichten“. Selbst wenn mehrere Nachrichten eingegangen sind, sollte die Ansicht nicht zur allerneuesten Nachricht springen.

Diese Regeln gewährleisten ein konsistentes und vorhersehbares Verhalten beim Scrollen, bei Trennern und beim Wiederherstellen der Position über alle Einstiegspunkte in Chats in ADAMANT hinweg.
