---
title: "Statusprüfung: Allgemeiner Aktualisierungs-Ladeindikator"
slug: "discussion-20-health-check-general-updating-spinner-8923249"
description: "Das Fehlen eines Ladeindikators in der ADAMANT-Headerleiste garantiert, dass der Nutzer die aktuellste Liste von Chats und Nachrichten sieht."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/20"
publishedAt: "2025-09-20T16:33:48Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923249"
locale: "de"
placeholder: false
---

![Diskussionsscreenshot 1](/images/engineering-notes/github/discussions/8923249/001-fda0855b.webp)

Das Fehlen eines Ladeindikators in der ADAMANT-Headerleiste garantiert, dass der Nutzer die aktuellste Liste von Chats und Nachrichten sieht. Der Ladeindikator sollte angezeigt werden, wenn keine Internetverbindung, keine aktiven ADM-Knoten oder keine aktivierten ADM-Knoten vorhanden sind.

Wenn eine Verbindung und aktive Knoten vorhanden sind, führt das System weitere Prüfungen durch. Sobald neue Nachrichten empfangen wurden – das bedeutet, dass keine neueren vorhanden sind – wird ein Zeitstempel `chatActualUntil` im Speicher abgelegt.

```javascript
const chatsActualUntil = adamant.toTimestamp(nodeTimestamp) + INTERVAL + CHAT_ACTUALITY_BUFFER_MS
```

Der `INTERVAL` repräsentiert das Abrufintervall für neue Chats über REST, das je nach Verfügbarkeit einer Socket-Verbindung variiert.

```javascript
INTERVAL: (state, getters, rootState) => {
  return rootState.options.useSocketConnection ? SOCKET_ENABLED_TIMEOUT : SOCKET_DISABLED_TIMEOUT
},
```

Die Bildschirme „Chat“ und „Chatliste“ beobachten `chatActualUntil` und abonnieren den Hook `chatActual = chatActualUntil > currentTime`. Dieser Hook wird alle 500 Millisekunden ausgeführt, um den Ladeindikator auch dann auszulösen, wenn sich `chatActualUntil` aufgrund fehlender neuer Nachrichten nicht geändert hat. Letztlich wird der Ladeindikator angezeigt, wenn keine Internetverbindung besteht, keine Knoten online sind oder wenn `!chatActual` den Wert `true` ergibt.

Wenn die App aus dem Hintergrund wiederhergestellt wird, sind keine Anpassungen erforderlich, da weiterhin auf `chatActualUntil` zurückgegriffen wird. Wenn die Gerätezeit den Gültigkeitszeitstempel des Chats überschreitet, sieht der Nutzer den Ladeindikator. Im ungünstigsten Fall könnte der Nutzer bei Verbindungsverlust den Ladeindikator nicht sehen und irrtümlich annehmen, alles sei aktuell, für maximal `INTERVAL + CHAT_ACTUALITY_BUFFER_MS` Sekunden.
