---
title: "In-Chat- und direkte Kryptoüberweisungen in ADAMANT"
slug: "discussion-31-in-chat-and-direct-crypto-transfers-scenario-in-adamant-9019566"
description: "ADAMANT Messenger unterstützt nahtlose Kryptoüberweisungen innerhalb von Chats und direkt vom Wallet-Bildschirm, alle Vorgänge werden im Transaktionsverlauf verfolgt."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/31"
publishedAt: "2025-10-13T05:01:20Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9019566"
locale: "de"
placeholder: false
---

ADAMANT Messenger unterstützt nahtlose Kryptoüberweisungen sowohl innerhalb von Chats als auch direkt vom Wallet-Bildschirm, wobei alle Vorgänge im Transaktionsverlauf verfolgt werden.

### In-Chat-Kryptoüberweisungen

Vor dem Senden überprüft die App das ADM-Guthaben des Benutzers, die Internetverbindung, die Verfügbarkeit des ADM-Knotens und die Verfügbarkeit des Kryptoknotens mittels Statusprüfungen. Fällt eine dieser Prüfungen fehl, zeigt die App einen Fehler an und ermöglicht eine erneute Überweisung.

Der Transaktionsablauf beginnt damit, dass sowohl die Kryptotransaktion als auch die ADM-Transaktion lokal generiert werden. Bei Blockchains mit Nonces wie ETH überprüft die App den lokalen Speicher, um sicherzustellen, dass keine Transaktion mit demselben Nonce bereits erfolgreich war. Bei Blockchains ohne Nonces wie BTC, DOGE oder DASH prüft sie den lokalen Speicher und fragt die Blockchain nach ausstehenden Transaktionen ab. Wird eine ausstehende oder erfolgreiche Duplikat-Transaktion gefunden, wird der Vorgang abgebrochen.

Anschließend wird die ADM-Transaktion an den ADM-Knoten gesendet. Wird sie akzeptiert, wird sie dem Chat hinzugefügt, und die App bleibt auf dem Senden-Bildschirm. Die Kryptotransaktion wird dann in der lokalen Datenbank gespeichert und im Transaktionsverlauf mit dem Status „Ausstehend“ angezeigt. Bis der tatsächliche Blockchain-Zeitstempel verfügbar ist, verwendet die App einen lokal gespeicherten Zeitstempel zur Sortierung. Diese sofortige Anzeige ist besonders wichtig bei Überweisungen von Nicht-ADM-Münzen, da der Münzknoten noch keine Daten zurückgegeben hat, der Benutzer jedoch sofortige Rückmeldung benötigt.

Danach wird die Kryptotransaktion an den Münzknoten gesendet. Jede positive Antwort markiert die Transaktion als ausstehend, und der Benutzer wird zum Chat oder zum Transaktionsdetails-Bildschirm weitergeleitet. Falls das Senden fehlschlägt, wird ein Snackbar-Fehler angezeigt, und der Benutzer kann es erneut versuchen, wodurch eine vollständig neue Transaktion generiert wird. Falls der Benutzer ohne erneuten Versuch zum Chat zurückkehrt, bleibt die fehlgeschlagene Transaktion im Chat und im Verlauf sichtbar, da die ADM-Nachricht bereits gesendet wurde. Transaktionsaktualisierungen laufen weiterhin im Hintergrund.

Die Erstellung der ADM-Transaktion vor dem Senden der Kryptotransaktion stellt sicher, dass die Kryptoüberweisung niemals erfolgt, ohne dass sie im Chat protokolliert wird. So wird verhindert, dass Benutzer Kryptoguthaben ausgeben, ohne es zu sehen, und versehentlich erneut senden.

### Direkte Kryptoüberweisungen (Wallet-Bildschirm)

Das Szenario der direkten Überweisung vom Wallet-Bildschirm entspricht dem In-Chat-Transfer mit wenigen Ausnahmen. Es überspringt die Überprüfung des ADM-Guthabens, die Prüfung des ADM-Knotens und die Erstellung der ADM-Transaktion. Nach Abschluss wird der Benutzer statt zum Chat zum Transaktionsverlauf weitergeleitet.

### Transaktionsverlauf

Der Transaktionsverlauf kombiniert lokal gespeicherte Transaktionen mit Daten, die über die Blockchain-Knoten-API synchronisiert wurden. Lokal gespeicherte Transaktionen bleiben auch nach einem App-Neustart erhalten, müssen aber beim Abmelden oder erneuten Anmelden gelöscht werden, um zu verhindern, dass der Verlauf eines anderen Kontos angezeigt wird. Diese Kombination bietet einen genauen und aktuellen Überblick über die Überweisungen des Benutzers. Die App verwendet nach Möglichkeit lokale Berechnungen und Prüfungen für die Transaktionsgenerierung, Guthaben, Nonces, Duplikate und Zeitstempel, um ein reaktionsschnelles Benutzererlebnis zu gewährleisten, ohne auf Netzwerkanfragen warten zu müssen.

![Diskussionsscreenshot 1](/images/engineering-notes/github/discussions/9019566/001-90a49183.webp)
