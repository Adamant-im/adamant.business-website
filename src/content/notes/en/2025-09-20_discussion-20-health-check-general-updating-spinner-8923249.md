---
title: "Health Check: General Updating Spinner"
slug: "discussion-20-health-check-general-updating-spinner-8923249"
description: "The absence of a loading spinner in the ADAMANT header guarantees that the user is viewing the latest list of chats and messages. The spinner should be shown if there is no inte…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/20"
publishedAt: "2025-09-20T16:33:48Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923249"
locale: "en"
placeholder: false
---

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8923249/001-fda0855b.webp)

The absence of a loading spinner in the ADAMANT header guarantees that the user is viewing the latest list of chats and messages. The spinner should be shown if there is no internet connection, no active ADM nodes, or no enabled ADM nodes.

When a connection and active nodes exist, the system checks further. Upon receiving fresh messages—meaning no newer ones exist—it saves a timestamp `chatActualUntil` in the store.

```javascript
const chatsActualUntil = adamant.toTimestamp(nodeTimestamp) + INTERVAL + CHAT_ACTUALITY_BUFFER_MS
```

The `INTERVAL` represents the polling interval for new chats over REST, which varies depending on whether a socket connection is available.

```javascript
INTERVAL: (state, getters, rootState) => {
  return rootState.options.useSocketConnection ? SOCKET_ENABLED_TIMEOUT : SOCKET_DISABLED_TIMEOUT
},
```

The Chat and Chat List screens observe `chatActualUntil` and subscribe to the hook `chatActual = chatActualUntil > currentTime`. This hook runs every 500 milliseconds to trigger the spinner even if `chatActualUntil` has not changed due to a lack of new messages. Ultimately, the spinner is displayed if there is no internet, no nodes online, or if `!chatActual` evaluates to true.

When the app is restored from the background, no tweaks are needed because it still relies on `chatActualUntil`. If the device time exceeds the chat validity timestamp, the user will see the spinner. In the worst case, if the connection is lost, the user might not see the spinner and could mistakenly believe everything is up-to-date for a maximum duration of `INTERVAL + CHAT_ACTUALITY_BUFFER_MS` seconds.
