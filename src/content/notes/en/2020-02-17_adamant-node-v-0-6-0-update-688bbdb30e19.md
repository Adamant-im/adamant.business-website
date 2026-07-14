---
title: "ADAMANT Node v0.6.0 Update"
slug: "adamant-node-v-0-6-0-update-688bbdb30e19"
description: "A decentralized messenger relies on two components: the blockchain system and the client applications. The blockchain is maintained by network nodes that serve data to applicati…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v-0-6-0-update-688bbdb30e19"
publishedAt: "2020-02-17T09:23:50.372Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/688bbdb30e19/001-1-fmo2vlyn2yehfv84inqtmq-png.webp"
cardSpan: "full"
originalId: "medium:688bbdb30e19"
locale: "en"
placeholder: false
---

A decentralized messenger relies on two components: the blockchain system and the client applications. The blockchain is maintained by network nodes that serve data to applications and process incoming requests. ADAMANT has released node software version 0.6.0, available on the project's GitHub releases page.

This release improves socket connections and the transactions API. Socket connections now return `recipientPublicKey`, and transactions API endpoints—including KVS and Chats—now include a `block_timestamp` field in their responses. The `/states/get/` endpoint has been expanded to support `SenderIds` and `keyIds` parameters as well as POST requests. The release also includes a fix for migrations and an updated documentation set.

The update is not mandatory for all node operators. However, nodes that need to connect with messenger applications must be upgraded to the latest version.
