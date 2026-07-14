---
title: "Neue Sicherheitsfunktionen in ADAMANT Messenger 2.11.0"
slug: "new-security-features-in-adamant-messenger-88c8daec0b75"
description: "ADAMANT Messenger 2.11.0 bietet nun Verifizierung von Kryptotransaktionen, Warnungen bei verdächtigen Wallet-Adressen und manuelle Statusaktualisierungen."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-security-features-in-adamant-messenger-88c8daec0b75"
publishedAt: "2021-05-02T08:46:58.373Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/88c8daec0b75/001-0-0hsc7oe7vtwfo3p0.webp"
cardSpan: "full"
originalId: "medium:88c8daec0b75"
locale: "de"
placeholder: false
---

Version 2.11.0 von ADAMANT Messenger bietet nun die Verifizierung von Kryptowährungstransaktionen, Warnungen bei verdächtigen Wallet-Adressen und auf Abruf verfügbare Transaktionsstatus-Updates.

### Verdächtige Wallets im KVS

ADAMANT speichert Wallet-Adressen im Key-Value Store (KVS) der Blockchain, wodurch Kryptoüberweisungen innerhalb von Chats möglich sind. Die Speicherung einer Adresse erfordert die Account-Passphrase, sodass Dritte keine falschen Adressen im Namen eines Nutzers einfügen können. Falls jedoch die Passphrase kompromittiert wird, könnte ein Angreifer die Kryptowährungsadressen des Accounts durch eigene ersetzen und eingehende Zahlungen abfangen.

Der Messenger prüft nun bei der Anmeldung die Konsistenz der Wallet-Adressen und benachrichtigt den Nutzer bei Abweichungen. Beim Senden von Kryptowerten an einen Chatpartner validiert die App außerdem die gespeicherte Adresse des Partners.

### Kryptowährungsüberweisungen in Chats

Chat-Überweisungen funktionieren, indem zunächst eine spezielle Nachricht über die ADAMANT-Blockchain gesendet wird, gefolgt von der eigentlichen Kryptowährungstransaktion. Dabei können Inkonsistenzen zwischen der Spezialnachricht und der On-Chain-Transaktion auftreten – beispielsweise abweichende Beträge, Empfänger, Sender oder Überweisungszeiten. Der Messenger erkennt diese Unstimmigkeiten nun und warnt den Nutzer.

![Neue Sicherheitsfunktionen in ADAMANT Messenger](/images/engineering-notes/medium/88c8daec0b75/002-0-bjwjfxdbbty8fily.webp)

Jede Kryptowährungsüberweisung im Chat sollte außerdem im Transaktionsverlauf des Wallets unter Wallet → Coin → Balance erscheinen. Der Transaktionsstatus kann nun manuell sowohl vom Chatbildschirm als auch vom Transaktionsdetails-Bildschirm aus erneut geprüft werden.

### Weitere Updates

Diese Version optimiert die Timing-Abstimmung von Transaktionsupdates über verschiedene Coins hinweg, behebt die UTXO-Verarbeitung für Doge, fügt in der Knotenansicht die Anzeige der Node-Version hinzu und behebt einen Fehler, bei dem die Transaktionsliste leer erschien. Den vollständigen Änderungsverlauf finden Sie in den [v2.11.0 Release Notes](https://github.com/Adamant-im/adamant-im/releases/tag/v2.11.0).
