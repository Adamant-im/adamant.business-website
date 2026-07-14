---
title: "Notify via ADAMANT"
slug: "notify-via-adamant-e6116f7e55cc"
description: "ADAMANT offers several properties that make it suitable as a notification transport: each message delivery is validated on chain, messages and their ordering are immutable, stor…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/notify-via-adamant-e6116f7e55cc"
publishedAt: "2019-06-02T14:22:43.887Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e6116f7e55cc/001-1-8rvans74h-cl-ux-bpeiaw-png.webp"
cardSpan: "full"
originalId: "medium:e6116f7e55cc"
locale: "en"
placeholder: false
---

ADAMANT offers several properties that make it suitable as a notification transport: each message delivery is validated on-chain, messages and their ordering are immutable, storage time is effectively unlimited, and access is not tied to a specific device. The project is open source. A practical example is cryptocurrency pool operators receiving notifications about pool operations through ADAMANT messages.

Developers can integrate ADAMANT notifications through three primary interfaces. The ADAMANT Console provides a `send message` command and is a language-agnostic command-line tool. For JavaScript applications, the `send` function is available in the ADAMANT API JS client library. Finally, the native ADAMANT node exposes its own API for direct integration.

Message content supports both Markdown formatting and Emoji, allowing structured and readable notifications.
