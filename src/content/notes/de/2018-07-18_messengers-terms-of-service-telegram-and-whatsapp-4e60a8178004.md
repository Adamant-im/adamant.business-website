---
title: "Nutzungsbedingungen von Messenger-Diensten: Telegram und WhatsApp"
slug: "messengers-terms-of-service-telegram-and-whatsapp-4e60a8178004"
description: "Dieser Artikel analysiert die Datenschutzrichtlinien von Telegram und WhatsApp. Trotz ihrer Reichweite haben beide Plattformen ihren Server-Quellcode nicht vollständig offengelegt."
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
locale: "de"
placeholder: false
---

Dieser Artikel analysiert die offiziellen Datenschutzrichtlinien von Telegram und WhatsApp, zwei der am weitesten verbreiteten Messaging-Dienste. Trotz ihrer Größe und langen Beständigkeit hat keine der Plattformen ihren vollständigen serverseitigen Quellcode veröffentlicht, was eine unabhängige Überprüfung ihrer Sicherheitsbehauptungen unmöglich macht.

## Telegram

Telegram beschreibt sich selbst als Open-Source-Projekt und lädt Nutzer ein, seine API, sein Protokoll und seinen Quellcode zu prüfen. In der Praxis hat Telegram jedoch seine Serverinfrastruktur, Datenschicht und internen Nachrichtenverarbeitungscode nie vollständig quelloffen gemacht. Diese Lücke wirft Fragen auf bezüglich des Unterschieds zwischen regulären Cloud-Chats und den optionalen „verschlüsselten Chats“ sowie bezüglich des Umfangs der Ende-zu-Ende-Verschlüsselung auf der Plattform.

Telegram speichert Nachrichten, Fotos, Videos und Dokumente aus Cloud-Chats auf seinen Servern. Es verwendet Telefonnummern als eindeutige Identifikatoren und bittet um Erlaubnis, bevor Kontakte synchronisiert werden. Die Richtlinie besagt, dass Telegram „nur die Daten speichert, die für ein ordnungsgemäßes Funktionieren erforderlich sind“, nennt aber nicht konkret, um welche Daten es sich handelt.

Eine Aktualisierung aus dem Jahr 2018 fügte hinzu, dass Telegram personenbezogene Daten auf Grundlage eigener „berechtigter Interessen“ verarbeitet. Anzeigenamen, Profilbilder und Benutzernamen sind stets öffentlich. Bemerkenswerterweise hat dieses Design es, wie in früheren ADAMANT-Studien dokumentiert, ermöglicht, über die offizielle Anwendung die Mobilnummer eines Nutzers zu extrahieren.

Die wichtigsten Bestimmungen betreffen den Zugriff auf Nachrichten. Die Datenschutzrichtlinie von Telegram besagt ausdrücklich, dass Moderatoren gemeldete Nachrichten prüfen dürfen und automatisierte Algorithmen Nachrichten in Cloud-Chats analysieren können, um Spam und Phishing zu bekämpfen. Der Dienst sammelt außerdem Metadaten wie IP-Adressen, Geräteinformationen, verwendete Telegram-App-Versionen und den Verlauf von Benutzernamenänderungen und kann aggregierte Metadaten speichern, um Funktionen über mehrere Geräte hinweg zu unterstützen. Kurz gesagt: Telegram behält Zugriff auf Inhalte von Cloud-Chats und behält sich das Recht vor, diese manuell und automatisch zu überprüfen.

Im Hinblick auf Strafverfolgungsbehörden erklärt Telegram, dass es bei Vorliegen einer gerichtlichen Anordnung, die bestätigt, dass ein Nutzer ein Terrorverdächtiger ist, dessen IP-Adresse und Telefonnummer an die zuständigen Behörden weitergeben kann. Sobald eine Telefonnummer offengelegt ist, können staatliche Stellen weitere Abonnentendaten beim SIM-Anbieter anfordern, wodurch sich der Zugriff erweitert.

## WhatsApp

WhatsApp wurde 2014 von Facebook (heute Meta) übernommen, und seine Datenschutzrichtlinie spiegelt diese Unternehmensbeziehung wider. Die Richtlinie beginnt damit, dass WhatsApp Informationen sammeln muss, um „unsere Dienste zu betreiben, bereitzustellen, verbessern, verstehen, anpassen, unterstützen und bewerben“ – ein weiter Handlungsspielraum ohne spezifische Rechtfertigung für jede Datenerfassungskategorie.

Nutzer müssen eine Mobiltelefonnummer und einen Profilnamen angeben. WhatsApp sammelt außerdem regelmäßig Telefonnummern aus dem Adressbuch des Nutzers, einschließlich Kontakten, die den Dienst nicht nutzen. Wenn eine Nachricht nicht sofort zugestellt werden kann, kann WhatsApp sie bis zu 30 Tage auf seinen Servern speichern und in bestimmten Fällen Inhalte noch länger aufbewahren.

Zu den erfassten Geräte- und Verbindungsdaten gehören Hardwaremodell, Betriebssystem, Akkuladestand, Signalstärke, App-Version, Browserinformationen, Mobilfunknetz, ISP, Sprache, Zeitzone, IP-Adresse und verschiedene Gerätekennungen. Standortinformationen werden ebenfalls über IP, GPS, Bluetooth-Signale, nahegelegene WLAN-Zugangspunkte, Beacons und Funkmasten erfasst.

WhatsApp erhält Informationen über Nutzer von anderen Personen und Unternehmen. Wenn ein Nutzer mit einem Business-Account kommuniziert, kann dieses Unternehmen ein Drittunternehmen beauftragen, Nachrichten stellvertretend zu speichern, zu lesen und darauf zu antworten. WhatsApp arbeitet außerdem mit externen Dienstleistern und anderen Facebook-Unternehmen zusammen und tauscht Daten innerhalb dieses Unternehmensökosystems aus.

Die Richtlinie behält sich das Recht vor, Nutzerinformationen zu erheben, nutzen, speichern und weiterzugeben, sobald WhatsApp in „gutem Glauben“ glaubt, dass dies „angemessen notwendig“ ist – ein Maßstab, der der Plattform erheblichen Ermessensspielraum einräumt.

## Wichtige Erkenntnisse

Sowohl Telegram als auch WhatsApp sammeln umfangreiche Metadaten und behalten unterschiedliche Grade an Zugriff auf Nutzerkommunikation. Die Cloud-Chats von Telegram sind nicht standardmäßig Ende-zu-Ende verschlüsselt und unterliegen sowohl automatisierter als auch manueller Überprüfung. WhatsApp, eingebunden in das Meta-Unternehmensökosystem, sammelt umfangreiche Geräte-, Standort- und Kontaktinformationen. Keine der Plattformen hat den vollständigen serverseitigen Quellcode veröffentlicht, der erforderlich wäre, um ihre Sicherheits- und Datenschutzbehauptungen unabhängig zu überprüfen. Nutzer, die besorgt über Datenhoheit sind, sollten die Originalquellen prüfen – [die Datenschutzrichtlinie von Telegram](https://telegram.org/privacy) und [die Datenschutzrichtlinie von WhatsApp](https://www.whatsapp.com/legal/?lang=en#privacy-policy) – und Open-Source-Alternativen mit überprüfbaren Architekturen in Betracht ziehen.
