---
title: "Sind heutige Online-Messenger sicher?"
slug: "are-present-online-messengers-safe-d6871314ee9f"
description: "Online-Messaging ist allgegenwärtig, doch nur wenige Nutzer prüfen kritisch, wie ihre Daten gespeichert, übertragen und zugänglich gemacht werden. Diese Analyse untersucht Verschlüsselungsmethoden und Nachrichtenübertragungssysteme bekannter Dienste."
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
locale: "de"
placeholder: false
---

Online-Textnachrichten sind eine allgegenwärtige Kommunikationsform, doch nur wenige Nutzer bewerten kritisch, wie ihre persönlichen Daten gespeichert, übertragen und zugänglich gemacht werden. Diese Analyse untersucht die Verschlüsselungsmethoden und Nachrichtenübertragungssysteme mehrerer bekannter Messaging-Dienste und konzentriert sich dabei auf überprüfbare Fakten statt auf mediale Narrative.

WhatsApp, mit über 1,5 Milliarden monatlich aktiven Nutzern, führte 2016 eine „Ende-zu-Ende“-Verschlüsselung ein. Kritische Sicherheitseinstellungen waren jedoch tief in der Benutzeroberfläche versteckt, und Forscher identifizierten eine Hintertür, die Datenmanipulation durch geänderte Verschlüsselungsschlüssel und Cloud-Duplikation ermöglicht. Der geschlossene Quellcode von WhatsApp macht eine unabhängige Überprüfung seiner Sicherheitsbehauptungen unmöglich.

Facebook Messenger, mit 1,3 Milliarden Nutzern, bietet „Ende-zu-Ende“-Chats nur bei spezieller Konfiguration an. Der geschlossene Quellcode und die Historie von Facebook im Bereich Datenschutz werfen erhebliche Vertrauensfragen auf.

WeChat, von über einer Milliarde Menschen in China genutzt, behauptet, dass der Datenschutz eine höchste Priorität sei. Doch in den Datenschutzerklärungen werden komplexe Verschlüsselungsmethoden beschrieben, ohne Ende-zu-Ende-Verschlüsselung zu erwähnen, und der Quellcode bleibt geschlossen. Der Dienst unterliegt den strengen Vorschriften Chinas zur Datenspeicherung und Überwachung. QQ Mobile, ein weiterer großer chinesischer Dienst mit fast 800 Millionen Nutzern, verfügt überhaupt nicht über Ende-zu-Ende-Verschlüsselung und hält seinen Quellcode ebenfalls geheim.

Weitere bekannte Dienste – darunter Viber, Skype, Snapchat und Line – weisen denselben grundlegenden Fehler auf: geschlossener Quellcode, der unabhängige Sicherheitsaudits verhindert, trotz aggressiver Marketingaussagen zum Datenschutz.

Telegram, populär für private Kommunikation im Nahen Osten, öffnet seinen Quellcode nicht vollständig. Während die API und Client-Anwendungen quelloffen sind, wurde der Server-Code nicht veröffentlicht, obwohl versprochen wurde, dass „letztendlich der gesamte Code veröffentlicht wird“. Ohne Transparenz auf Serverseite gibt es keine überprüfbaren Beweise dafür, wie Nutzernachrichten verwaltet und gespeichert werden.

Anwendungen, die Vertraulichkeit anstreben, verfehlen dieses Ziel aufgrund inhärenter architektonischer Einschränkungen. Dazu gehören die obligatorische Telefonnummern-Autorisierung, IP-Adress-Offenlegung, lokale Protokollspeicherung auf Geräten, willkürliche Sperrmöglichkeiten von Nutzern und zentrale Datenspeicherung.

Diese systemischen Mängel motivierten die Entwicklung des ADAMANT-Messengers, der einen grundlegend anderen Ansatz verfolgt, indem er seine Architektur auf Blockchain-Technologie aufbaut. Der vollständig quelloffene Code von ADAMANT ermöglicht die unabhängige Überprüfung seiner Sicherheitseigenschaften.

![Sind heutige Online-Messenger sicher?](/images/engineering-notes/medium/d6871314ee9f/002-0-qsxqt626jqio99tb.webp)

Durch die Nutzung der Blockchain eliminiert ADAMANT Abhängigkeiten von zentralen Servern, Entwicklern und internen Identifikationssystemen. Die Netzwerkunterstützung erfolgt durch Nutzer, die interne Währung verdienen, indem sie die Infrastruktur betreiben. Das Projekt befindet sich in aktiver Entwicklung; kürzlich wurde die Unterstützung für ETH implementiert.

![Sind heutige Online-Messenger sicher?](/images/engineering-notes/medium/d6871314ee9f/003-0-cgrras4imu0tlqjn.webp)
