---
title: "Messenger becomes faster thanks to the Chatrooms API"
slug: "messenger-becomes-faster-thanks-to-the-chatrooms-api-b7353317e7f8"
description: "ADAMANT treats every message as a blockchain transaction, which enhances privacy and security but introduces challenges for speed and message retrieval. Standard blockchain APIs…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/messenger-becomes-faster-thanks-to-the-chatrooms-api-b7353317e7f8"
publishedAt: "2021-11-24T14:07:09.171Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b7353317e7f8/001-0-tot3wyqtwfswo3kx.webp"
cardSpan: "full"
originalId: "medium:b7353317e7f8"
locale: "en"
placeholder: false
---

ADAMANT treats every message as a blockchain transaction, which enhances privacy and security but introduces challenges for speed and message retrieval. Standard blockchain APIs required fetching all transactions to display correspondence. The new Chatrooms API, designed specifically for instant messengers, makes loading messages up to ten times more efficient while reducing memory and CPU consumption.

![Messenger becomes faster thanks to the Chatrooms API](/images/engineering-notes/medium/b7353317e7f8/002-0-g1gbxwpdnkihcskz.webp)

In practice, loading an account with the previous version took 25 seconds and consumed 80 MB of memory. With the new version, loading takes 3 seconds and uses 28 MB of memory, an eightfold speed increase. The performance gain scales with the number of messages an account holds.

Chatrooms provides two endpoints: `/api/chatrooms/U000000000000` and `/api/chatrooms/U000000000000/U000000000001`. The first retrieves a chat list for a specific account, while the second retrieves messages between two accounts. Pagination is supported to minimize data transfer, as detailed in AIP 14. These endpoints can be utilized by any application, including messengers or bots.

To support this, nodes have been updated to handle the new application requests. Unlike the previous version, which downloaded all messages at once for offline viewing, the Chatrooms API downloads messages on demand and requires an internet connection.

The v3.0.0 release introduces the Chatrooms API alongside several other updates. It replaces the HTTP node, removes the Resfinex exchange and RES token, and implements a workaround for a Lisk Service `includePending` bug. Additional fixes address the light/dark theme `background-color`, resolve an infinite update loop in the ADM transaction list, and update dependencies.
