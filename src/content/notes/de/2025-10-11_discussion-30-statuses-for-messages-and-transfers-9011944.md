---
title: "Statusanzeigen für Nachrichten und Überweisungen in ADAMANT"
slug: "discussion-30-statuses-for-messages-and-transfers-9011944"
description: "ADAMANT unterscheidet zwischen Zustellstatus von Nachrichten und Kryptowährungs-Transaktionsstatus. Nachrichten werden in der ADAMANT-Blockchain verfolgt, Überweisungen in der jeweiligen Token-Blockchain verifiziert."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/30"
publishedAt: "2025-10-11T18:08:05Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9011944"
locale: "de"
placeholder: false
---

ADAMANT unterscheidet zwischen dem Zustellstatus von Nachrichten und dem Status von Kryptowährungsüberweisungen. Nachrichten werden innerhalb der ADAMANT-Blockchain verfolgt, während Überweisungen anhand der jeweiligen nativen Blockchain des Tokens verifiziert werden. Ein zentrales Datenschutzprinzip: ADAMANT wird niemals einen „Gelesen“-Status für Nachrichten implementieren, da dies Rückschlüsse auf die Aktivität des Empfängers zulassen würde.

## Nachrichten-Status

Eingehende Nachrichten gelten immer als zugestellt, da sie direkt aus der Blockchain gelesen werden – daher wird für sie kein Status angezeigt. Ausgehende Nachrichten durchlaufen drei Stadien: **Senden** (ausstehend), **An Knoten zugestellt** (der Knoten hat die Transaktion akzeptiert) und **In Blockchain** (zusätzliche Bestätigung, sobald der Block bekannt ist). Der Übergang vom Status „Senden“ zu „An Knoten zugestellt“ muss schnell erfolgen, um ein flüssiges Benutzererlebnis zu gewährleisten. Die Statusaktualisierungen werden sowohl in der Chat-Liste als auch innerhalb einzelner Chats angezeigt.

Wenn Sockets aktiviert sind, geben sie unbestätigte Transaktionen sofort zurück, sobald sie den Knoten erreichen. Zu diesem Zeitpunkt sind Felder wie `block_timestamp`, `height`, `blockId` und `confirmations` `null`. Sockets duplizieren die Antworten der REST-API – Nachrichten treffen sofort über den Socket ein, während die REST-API etwa alle 10 Sekunden (`SOCKET_ENABLED_TIMEOUT`) Aktualisierungen liefert, als Zuverlässigkeits-Backup. ADAMANT verwendet bewusst keinen Status „An Empfänger zugestellt“, da dies gegen die Datenschutzphilosophie verstößt und technisch unzuverlässig ist, wenn der Empfänger offline ist.

Falls die Zustellung an den Knoten fehlschlägt oder die Blockchain die Transaktion ablehnt, wird die Nachricht als **Nicht gesendet** markiert.

## Status von Kryptowährungsüberweisungen

Für alle Kryptoüberweisungen zeigt ADAMANT den Transaktionsstatus in der jeweiligen Blockchain des Tokens an. Dies gilt sowohl für eingehende als auch ausgehende Überweisungen. Der Ablauf lautet: `Ausstehend → Registriert → Erfolgreich / Fehlgeschlagen / Inkonsistent`.

Eine Überweisung beginnt als **Ausstehend** (Senden oder Prüfen). Sobald ein Knoten bestätigt, dass die Transaktion existiert, wechselt sie in den Status **Registriert**. ADAMANT prüft dann weiter, bis ein endgültiger Status erreicht ist: **Erfolgreich** (im Netzwerk bestätigt), **Fehlgeschlagen** (vom Netzwerk abgelehnt) oder **Inkonsistent** (es wurde eine Diskrepanz festgestellt). Die Prüfregeln für Transaktionen je Coin sind im [`adamant-wallets`](https://github.com/Adamant-im/adamant-wallets/#info-for-updating-in-chat-coin-transfer-tx-statuses)-Repository unter `txFetchInfo` definiert. Die Spezifikation ist in [AIP-12](https://aips.adamant.im/AIPS/aip-12) dokumentiert.

Bei ADM-Transaktionen kommt der Status direkt mit der Transaktion: Wenn `confirmations > 0`, wird die Überweisung als Erfolgreich markiert; wenn `confirmations = 0`, bleibt sie im Status Ausstehend oder Registriert.

### Hintergrund-Prüfmechanismus für Status

Für Nicht-ADM-Blockchains erfordern Statusprüfungen zusätzliche Anfragen an Knoten oder APIs. ADAMANT verwendet einen Hintergrundmechanismus, der nur Transaktionen prüft, die dem Benutzer sichtbar sind, und stoppt, sobald ein endgültiger Status erreicht ist. Die Prüfhäufigkeit hängt vom Alter der Transaktion ab (Neu vs. Alt), und das System begrenzt die Versuche für ausstehende Transaktionen, während für registrierte Transaktionen unbegrenzte Versuche erlaubt sind. Die Prüfungen laufen nur, wenn eine Netzwerkverbindung und die relevanten Coin-Knoten verfügbar sind, um unnötige Versuche im Offline-Modus zu vermeiden.

Eine Transaktion gilt als **Neu**, wenn sie gerade aus der App heraus übertragen wurde oder wenn ihr Zeitstempel innerhalb eines Schwellwerts *X* Minuten der aktuellen Zeit liegt. Andernfalls gilt sie als **Alt**. Der Schwellwert kann eine statische Konstante sein oder je Coin berechnet werden:

```js
const isNew = (admTransferTimestamp) =>
  Date.now() - admTransferTimestamp < newPendingTxFetchAttempts * newPendingTxFetchInterval;
```

Diese Unterscheidung stellt sicher, dass neuere Transaktionen häufiger geprüft werden, während ältere weniger intensiv verifiziert werden.

### Beispiel: Bitcoin-Überweisung

Konstanten aus `adamant-wallets`:

```jsonc
"txFetchInfo": {
    "newPendingInterval": 10000,
    "oldPendingInterval": 3000,
    "registeredInterval": 40000,
    "newPendingAttempts": 20,
    "oldPendingAttempts": 3
}
```

Für eine **Neue Ausstehende** Transaktion prüft die App alle 10 Sekunden (`newPendingInterval`) für maximal 20 Versuche (`newPendingAttempts`), was einem Gesamtzeitraum von etwa 200 Sekunden entspricht. Wenn der Knoten die Transaktion erkennt (auch mit 0 Bestätigungen), wechselt sie in den Status **Registriert**. Bleibt sie nach allen Versuchen unsichtbar, wird sie als **Fehlgeschlagen** markiert.

Für **Registrierte** Transaktionen prüft die App alle 40 Sekunden (`registeredInterval`) mit unbegrenzten Versuchen, bis die Transaktion bestätigt ist (≥1 Bestätigung) oder der Knoten einen Fehler zurückgibt.

Benutzer können eine Transaktion manuell erneut prüfen, indem sie im Chat auf das Statussymbol tippen. Dadurch wird der Status auf Ausstehend zurückgesetzt und ein neuer Verifizierungszyklus ausgelöst. Transaktionsstatus werden nicht lokal gespeichert; beim Anmelden mit Passwort, PIN oder Fingerabdruck werden sie von Grund auf neu überprüft.

## Erkennung von Inkonsistenzen

Eine Überweisung wird als **Inkonsistent** markiert, wenn die in der ADAMANT-Nachricht gespeicherten Daten nicht mit den aus der Token-Blockchain abgerufenen Daten übereinstimmen. Eine Diskrepanz wird festgestellt, wenn einer der folgenden Fälle eintritt: der Betrag um mehr als ~0,1–0,5 % abweicht, die Absenderadresse abweicht, die Empfängeradresse abweicht oder der Zeitstempel der Nachricht und der der Blockchain-Transaktion um mehr als 3 Stunden differieren.

Zwei zusätzliche Sonderfälle existieren. Wenn der Coin nicht unterstützt wird (z. B. `xrp_transaction`), kann die App die Überweisung nicht verifizieren und zeigt eine Meldung an, dass die Kryptowährung nicht unterstützt wird. Wird ein doppelter Transaktions-Hash erkannt – d. h., der gleiche TX-Hash ist bereits in einer geladenen Transaktion vorhanden –, wird die Überweisung als Inkonsistent markiert, um zu verhindern, dass eine einzelne On-Chain-Transaktion mehrfach im Chat gezählt wird.

Die Gründe für Inkonsistenzen werden wie folgt priorisiert: falscher Transaktions-Hash, doppelte Transaktion, Absenderadressenabweichung, Empfängeradressenabweichung, falscher Betrag, Absenderadresse nicht abrufbar, Empfängeradresse nicht abrufbar, erhebliche Zeitstempeldifferenz und allgemeiner Prüffehler. Jeder Grund enthält gegebenenfalls eine Betrugswarnung.

## UI-Demonstration

Die folgenden Screenshots veranschaulichen den Statusverlauf von Überweisungen in der ADAMANT PWA und im iOS-Client.

**DASH In-Chat PWA-dev v4.9.0 — 2025-03-04**

| Nach Bestätigung der Überweisung (~10 Sek) | Tx im Chat als Ausstehend angezeigt | Tx-Details — Ausstehend (~2 Min) |
|---|---|---|
| ![Diskussionsscreenshot 1](/images/engineering-notes/github/discussions/9011944/001-61b4f6c1.webp) | ![Diskussionsscreenshot 2](/images/engineering-notes/github/discussions/9011944/002-711b6dcc.webp) | ![Diskussionsscreenshot 3](/images/engineering-notes/github/discussions/9011944/003-6eb732d9.webp) |

| Bestätigt ohne Details (~5 Sek) | Bestätigt mit Details — Endgültig | |
|---|---|---|
| ![Diskussionsscreenshot 4](/images/engineering-notes/github/discussions/9011944/004-fcf2d419.webp) | ![Diskussionsscreenshot 5](/images/engineering-notes/github/discussions/9011944/005-4e0f54a4.webp) | |

**DASH In-Chat iOS v3.11.0 — 2025-03-04**

| Nach Bestätigung (~3 Sek) | Tx im Chat als Ausstehend angezeigt | Tx-Details — Ausstehend (~2 Min) |
|---|---|---|
| ![Diskussionsscreenshot 6](/images/engineering-notes/github/discussions/9011944/006-ac6db431.webp) | ![Diskussionsscreenshot 7](/images/engineering-notes/github/discussions/9011944/007-a6e778a1.webp) | ![Diskussionsscreenshot 8](/images/engineering-notes/github/discussions/9011944/008-f5034347.webp) |

| Bestätigt mit Details — Endgültig | | |
|---|---|---|
| ![Diskussionsscreenshot 9](/images/engineering-notes/github/discussions/9011944/009-b08299f4.webp) | | |
