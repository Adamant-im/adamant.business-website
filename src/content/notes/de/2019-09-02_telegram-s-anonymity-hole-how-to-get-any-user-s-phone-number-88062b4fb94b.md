---
title: "Die Anonymitätslücke von Telegram: So erhält man die Telefonnummer eines beliebigen Nutzers"
slug: "telegram-s-anonymity-hole-how-to-get-any-user-s-phone-number-88062b4fb94b"
description: "Telegram verlangt eine Telefonnummer für die Nutzung, was erhebliche Datenschutzrisiken birgt. Eine Schwachstelle ermöglicht es, die Nummer eines Nutzers preiszulegen."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/telegrams-anonymity-hole-how-to-get-any-user-s-phone-number-88062b4fb94b"
publishedAt: "2019-09-02T08:18:08.034Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/88062b4fb94b/001-0-mhckpcqqduw4kpcb.webp"
cardSpan: "full"
originalId: "medium:88062b4fb94b"
locale: "de"
placeholder: false
---

Telegram erfordert eine Telefonnummer, um mit dem Nachrichtenversand beginnen zu können, wodurch alle Nachrichten an die Identität eines Nutzers gebunden sind. Dieser Mechanismus ist nicht nur veraltet, sondern birgt erhebliche Datenschutzrisiken. Eine solche Schwachstelle ermöglicht es jedem, die Telefonnummer eines Nutzers in einer Telegram-Gruppe zu erhalten, indem die Kontaktsynchronisierungsfunktion der App ausgenutzt wird.

Zur Demonstration betrachten wir einen offenen Gruppenchat, in dem ein Zielnutzer namens „Sergey Lebedev“ sichtbar ist.

![Die Anonymitätslücke von Telegram: So erhält man die Telefonnummer eines beliebigen Nutzers](/images/engineering-notes/medium/88062b4fb94b/002-0-fcieyaa3mo5op3nv.webp)

Indem man die Anwendung verlässt und einen neuen Kontakt im nativen Adressbuch des Geräts mit einer geratenen Telefonnummer hinzufügt, kann getestet werden, ob diese Nummer einem Telegram-Nutzer gehört.

![Die Anonymitätslücke von Telegram: So erhält man die Telefonnummer eines beliebigen Nutzers](/images/engineering-notes/medium/88062b4fb94b/003-0-usc809xtvbg9yqgn.webp)

Als Nächstes muss sichergestellt werden, dass die Kontaktsynchronisierung in den Datenschutzeinstellungen von Telegram aktiviert ist (Einstellungen — Datenschutz und Sicherheit). Diese Funktion fügt registrierte Kontakte automatisch der Anwendung hinzu, sofern sie bei Telegram registriert sind.

![Die Anonymitätslücke von Telegram: So erhält man die Telefonnummer eines beliebigen Nutzers](/images/engineering-notes/medium/88062b4fb94b/004-0-bpxhl6k-bs5uhotz.webp)

Wenn die geratene Telefonnummer bei Telegram registriert ist, fügt die Anwendung den Nutzer der Kontaktliste hinzu. In diesem Beispiel war die geratene Nummer korrekt.

![Die Anonymitätslücke von Telegram: So erhält man die Telefonnummer eines beliebigen Nutzers](/images/engineering-notes/medium/88062b4fb94b/005-0-ajrqdbdxby-cjw0f.webp)

Telegram überschreibt dann den Anzeigenamen des Nutzers mit dem Namen, der im Adressbuch des Geräts vergeben wurde. Bei Rückkehr in den ursprünglichen Gruppenchat wird „Sergey Lebedev“ nun als „Testing Phone ID“ angezeigt, was bestätigt, dass die geratene Nummer ihm gehört.

![Die Anonymitätslücke von Telegram: So erhält man die Telefonnummer eines beliebigen Nutzers](/images/engineering-notes/medium/88062b4fb94b/006-0-qbjxtb52xz7x-fzs.webp)

Obwohl das Raten einer Telefonnummer aus Millionen heraus zunächst als unpraktisch erscheint, können Angreifer den Zahlenraum durch Social Engineering erheblich einschränken, indem sie Land und Mobilfunkanbieter des Ziels ermitteln. Darüber hinaus könnte eine einfache Mobile-App das Hinzufügen großer Nummernbereiche zum Adressbuch eines Geräts automatisieren, wodurch eine Brute-Force-Ermittlung realisierbar wird. Diese Schwachstelle stellt eine erhebliche Bedrohung für die Privatsphäre von Nutzern dar, insbesondere für öffentliche Personen, Investoren und Aktivisten. Anwendungen, die die Registrierung mit einer Telefonnummer vorschreiben, bergen oft verborgene Datenschutzkompromisse.
