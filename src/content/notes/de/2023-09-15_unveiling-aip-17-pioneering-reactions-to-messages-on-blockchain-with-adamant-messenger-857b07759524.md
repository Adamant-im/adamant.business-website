---
title: "AIP-17: Nachrichten-Reaktionen auf der Blockchain mit ADAMANT Messenger"
slug: "unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
description: "AIP-17 führt Emoji-basierte Reaktionen in ADAMANT Messenger ein – eine Funktion, die bisher in keiner Blockchain-Messaging-App verfügbar war."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
publishedAt: "2023-09-15T10:09:07.924Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/857b07759524/001-0-tn1uulgukvtmgwym.webp"
cardSpan: "full"
originalId: "medium:857b07759524"
locale: "de"
placeholder: false
---

ADAMANT Improvement Proposal 17 (AIP-17) führt emoji-basierte Reaktionen auf Nachrichten in ADAMANT Messenger ein – eine Funktion, die bisher in keiner Blockchain-Messaging-App verfügbar war. Der Vorschlag definiert eine standardisierte Struktur für Reaktionen, die nahtlos in die bestehende Nachrichteninfrastruktur integriert wird.

## Funktionsweise

Reaktionen werden als ADM-Rich-Messages übertragen und folgen dabei den in AIP-5 (Rich Content Messages) festgelegten Konventionen. Ein neues, obligatorisches Feld namens `reactto_id` enthält die Transaktions-ID der Nachricht, auf die reagiert wird. Ein zweites Feld, `react_message`, überträgt das vom Nutzer gewählte Emoji. Reaktionen können nachträglich bearbeitet oder entfernt werden.

Eine Reaktions-Nutzlast sieht wie folgt aus:

```json
{
  "reactto_id": "Transaction_ID",
  "react_message": "👍"
}
```

Da jede Reaktion selbst eine On-Chain-Transaktion ist, die über ihre ID auf eine andere Transaktion verweist, bleibt das bewährte Modell von ADAMANT bezüglich Nachvollziehbarkeit und Dezentralisierung erhalten, während gleichzeitig eine leichtgewichtige, expressive Ebene über die standardmäßigen Chatnachrichten gelegt wird.

Die Implementierung wird voraussichtlich in allen ADAMANT-Anwendungen auf allen Plattformen eingeführt. Die technische Diskussion sowie der vollständige Vorschlag sind auf der [AIP-17-Vorschlagsseite](https://github.com/Adamant-im/AIPs/issues/52) verfügbar.

![AIP-17: Nachrichten-Reaktionen auf der Blockchain mit ADAMANT Messenger](/images/engineering-notes/medium/857b07759524/002-1-zslip-kei08fk54o3-u34q-png.webp)
