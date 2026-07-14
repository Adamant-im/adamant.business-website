---
title: "Statusprüfung: Verbindungsstatus"
slug: "discussion-18-health-check-connection-statuses-8923149"
description: "Siehe auch: Statusprüfung: Algorithmus, Allgemeine Beschreibung. Es gibt drei Verbindungsstatus für den Nachrichtenempfang und -versand."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/18"
publishedAt: "2025-09-20T15:41:29Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923149"
locale: "de"
placeholder: false
---

Siehe auch: [Statusprüfung: Algorithmus, Allgemeine Beschreibung](https://github.com/orgs/Adamant-im/discussions/17)

# Verbindungsstatus

Es gibt drei Verbindungsstatus, die sich auf den Empfang und Versand von Nachrichten beziehen.

**Keine Internetverbindung** wird vom Betriebssystem gemeldet (kein Netzwerk, Wi-Fi usw.). In der Statusprüfung kann `Keine aktiven Knoten` tatsächlich bedeuten, dass keine Internetverbindung besteht.

**Keine aktiven/verfügbaren ADM-Knoten** gilt, wenn mindestens ein ADM-Knoten aktiviert ist, aber kein Knoten den Status **Aktiv** hat. Die gleiche Logik gilt für Coins und Dienste (z. B. `Keine aktiven BTC-Dienste`). Nicht unterstützte Knoten zählen hier nicht.

**Keine aktivierten ADM-Knoten** tritt auf, wenn ein Nutzer alle Knoten deaktiviert hat. Auch hier zählen nicht unterstützte Knoten nicht; es kann Knoten im Status `Nicht unterstützt` geben, aber der Status bleibt `Keine aktivierten Knoten`.

# Priorität der Prüfungen

Die Prüfungen erfolgen in dieser Reihenfolge: zuerst `Keine Internetverbindung`, dann `Keine aktiven/verfügbaren ADM-Knoten`, dann `Keine aktivierten ADM-Knoten`.

# Spezielle Fälle

## Allgemeiner Snackbar

Der allgemeine Snackbar erscheint nur bei `Keine Internetverbindung`. Er ist persistent (wird angezeigt, bis der Nutzer ihn schließt oder die Verbindung wiederhergestellt ist) und löst eine Warnvibration aus.

![Diskussionsscreenshot 1](/images/engineering-notes/github/discussions/8923149/001-7a3f923d.webp)

## In-Chat-Warn-Popup

Das In-Chat-Warn-Popup erscheint bei `Keine aktivierten ADM-Knoten`, wenn die Verbindung aktiv ist, keine ADM-Knoten verfügbar sind und der Nutzer mindestens einen manuell deaktivierten Knoten hat. Es ist persistent und löst eine Warnvibration aus.

![Diskussionsscreenshot 2](/images/engineering-notes/github/discussions/8923149/002-7fee21d6.webp)

## Allgemeiner Aktualisierungs-Spinner

Der allgemeine Aktualisierungs-Spinner (im Kopfbereich angezeigt, signalisiert, dass Daten/Nachrichten nicht aktuell sind) erscheint bei allen Verbindungsstatus. Dazu gehören der Delegates-Bildschirm, der Wallets-Bildschirm und jeder Knotenbildschirm. Er ist persistent und löst keine Vibration aus.

![Diskussionsscreenshot 3](/images/engineering-notes/github/discussions/8923149/003-00df57f0.webp)

Siehe auch: [Statusprüfung: Allgemeiner Aktualisierungs-Spinner](https://github.com/orgs/Adamant-im/discussions/20)

## Datenlade-Spinner

Der Datenlade-Spinner umfasst den Chatlisten-Spinner, den spezifischen Chat-Spinner und den ADM-Transaktionslisten-Spinner. Er erscheint bei allen Verbindungsstatus und wird auf Nutzeranfrage angezeigt – beispielsweise wenn ein Nutzer den ADM-Transaktionslisten-Bildschirm betritt, in der Chatliste scrollt, um neue Chats zu laden, einen bestimmten Chat betritt, den die App noch nicht hat, innerhalb eines Chats scrollt oder den „Wähle Delegierte“-Bildschirm öffnet. Der Spinner bleibt sichtbar, bis die Daten aktualisiert sind. Er ist persistent und löst keine Vibration aus.

## Senden einer neuen Nachricht oder Datei

Dieses Verhalten ist bei allen Verbindungsstatus gleich. Bei fehlender Verbindung erscheint die Nachricht im Chat mit dem Transaktionsstatus `Ausstehend`. Der `Ausstehend`-Status wechselt zu `Fehlgeschlagen`, basierend auf den in [Message sending timeouts](https://github.com/Adamant-im/adamant-wallets/pull/95) definierten Timeouts. Zwei Timeouts sind implementiert: eines für den Versand einer regulären Nachricht und eines für Nachrichten mit Anhängen. Das Timeout für Anhänge bezieht sich auf den Versand einer ADM-Nachricht mit bereits hochgeladenen Dateien, nicht auf den Uploadvorgang selbst.

## In-Chat-Senden von ADM oder anderer Kryptowährung

Dies gilt auch für das direkte Senden von ADM-Münzen. Bei allen Verbindungsstatus ist das Senden untersagt, und ein temporärer Snackbar mit Warnvibration wird angezeigt. Bei direktem Senden von Nicht-ADM-Münzen (Konto → Coin → Senden) wird die Verfügbarkeit von ADM-Knoten für Überweisungen nicht geprüft.

![Diskussionsscreenshot 4](/images/engineering-notes/github/discussions/8923149/004-e59de24d.webp)

## Erstellen eines neuen Chats

Dieses Verhalten ist bei allen Verbindungsstatus gleich. Die App prüft lokal, ob die ADM-Adresse wahrscheinlich korrekt ist, öffnet sofort einen neuen Chat ohne Anfragen und zeigt eine Willkommensnachricht im Chat an. Wenn der öffentliche Schlüssel lokal verfügbar ist, werden keine weiteren Nachrichten angezeigt. Wenn der öffentliche Schlüssel vom Knoten abgerufen werden muss, wird eine zusätzliche Nachricht im Chat mit einem Spinner angezeigt.

![Diskussionsscreenshot 5](/images/engineering-notes/github/discussions/8923149/005-ea0f770b.webp)

Bei `Keine aktivierten ADM-Knoten` wird zusätzlich das In-Chat-Warn-Popup angezeigt.

## Bei Wiederherstellung der Verbindung

Wenn die Verbindung wiederhergestellt ist, werden ausstehende Anfragen abgeschlossen – beispielsweise werden ausstehende Nachrichten gesendet und Spinner aktualisiert.

## Anmeldung mit Passphrase

Bei `Keine Internetverbindung` und `Keine aktiven/verfügbaren ADM-Knoten` bleibt der Nutzer auf dem Anmeldebildschirm, wobei ein Snackbar oder Popup angezeigt wird. Bei `Keine aktivierten ADM-Knoten` wird der Nutzer zum ADM-Knotenbildschirm weitergeleitet, begleitet von einem Snackbar oder Popup. Der Snackbar ist temporär und löst eine Warnvibration aus.

![Diskussionsscreenshot 6](/images/engineering-notes/github/discussions/8923149/006-b36dd2ac.webp)

## Anmeldung per Passwort/Biometrie

Dieses Verhalten ist bei allen Verbindungsstatus gleich. Der Nutzer meldet sich wie gewohnt ohne Verzögerung oder Anfragen an, und der Chats-Tab öffnet sich. Lokal gespeicherte Nachrichten und Chats werden angezeigt. Der allgemeine Aktualisierungs-Spinner zeigt an, dass die Daten nicht aktuell sind, und ein „Keine Verbindung“-Snackbar wird angezeigt.
