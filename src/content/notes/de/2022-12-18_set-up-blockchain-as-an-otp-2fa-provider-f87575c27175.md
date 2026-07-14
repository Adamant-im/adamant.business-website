---
title: "Blockchain als OTP-2FA-Anbieter einrichten"
slug: "set-up-blockchain-as-an-otp-2fa-provider-f87575c27175"
description: "ADAMANT ist eine dezentrale Messaging-Infrastruktur mit Blockchain, Explorer, Messaging-Apps mit Krypto-Wallets, Börsensoftware, Schürfpool und OTP-2FA-Dienst."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/set-up-blockchain-as-an-otp-2fa-provider-f87575c27175"
publishedAt: "2022-12-18T15:14:19.999Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f87575c27175/001-1-g0bpvqabqrk2sobncqoicw-png.webp"
cardSpan: "full"
originalId: "medium:f87575c27175"
locale: "de"
placeholder: false
---

ADAMANT ist eine dezentrale Messaging-Infrastruktur, die eine Blockchain, einen Explorer, Messaging-Apps mit Krypto-Wallets, einen Tauschdienst, Software für das Schürfen von Blöcken, einen Bounty-Bot und einen OTP-2FA-Dienst umfasst. OTP-2FA verwendet Einmalkennwörter als zusätzliche Sicherheitsebene beim Anmelden an Websites und Diensten wie Kryptobörsen, E-Mail-Anbietern, verwahrten Wallets und Social-Media-Konten. ADAMANT ist der erste 2FA-Anbieter, der Einmalkennwörter über eine Blockchain übermittelt.

Der zentrale Vorteil von blockchainbasiertem 2FA ist die Dezentralisierung. Herkömmliche OTP-Anbieter setzen auf zentralisierte Server oder SMS-Gateways, die beide kompromittiert oder abgeschaltet werden können. Im Gegensatz dazu übermittelt der ADAMANT-2FA-Dienst Codes über sein eigenes Blockchain-Netzwerk. Dadurch entfällt ein einzelner Ausfallpunkt, und es gibt keinen Drittanbieter, der Authentifizierungsnachrichten abfangen oder verzögern könnte.

Um den Dienst auszuprobieren, erstellen Sie zunächst ein ADAMANT Messenger-Konto, über das Sie die 2FA-Codes erhalten. Führen Sie danach die 2FA-Demoanwendung aus und registrieren Sie sich mit einem beliebigen Benutzernamen und Passwort für ein neues Konto. Nach der Anmeldung tippen Sie auf „2FA aktivieren“ und geben Ihre ADAMANT-Adresse ein. Drücken Sie die Schaltfläche „2FA-Code erhalten“, und ein 2FA-Code wird an Ihren ADAMANT Messenger gesendet. Geben Sie diesen Code ein und klicken Sie auf „Verifizieren“. Sobald die 2FA-Funktion aktiviert ist, wird beim erneuten Anmelden nach dem Abmelden ein 2FA-Code erforderlich sein, wodurch der vollständige Authentifizierungsablauf demonstriert wird.

Webdienstanbieter können ADAMANT 2FA integrieren, um die Sicherheit von Benutzerkonten zu erhöhen. Der Dienst ist quelloffen und so konzipiert, dass er in bestehende Authentifizierungsabläufe eingebettet werden kann, bei denen ein zweiter Faktor erforderlich ist.
