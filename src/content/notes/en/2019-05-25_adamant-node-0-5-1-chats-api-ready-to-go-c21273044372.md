---
title: "ADAMANT Node 0.5.1: Chats API Ready for Production"
slug: "adamant-node-0-5-1-chats-api-ready-to-go-c21273044372"
description: "ADAMANT Node version 0.5.1 is now available on GitHub, completing the Chats API work first announced in January. The headline feature is the /api/chatrooms endpoint, which allow…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-0-5-1-chats-api-ready-to-go-c21273044372"
publishedAt: "2019-05-25T11:16:05.701Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/c21273044372/001-0-ldhnafxy9xpuzvb9.webp"
cardSpan: "full"
originalId: "medium:c21273044372"
locale: "en"
placeholder: false
---

ADAMANT Node version 0.5.1 is now available on GitHub, completing the Chats API work first announced in January. The headline feature is the `/api/chatrooms` endpoint, which allows retrieving contacts and chats significantly faster than the previous API. Developers should refer to the [AIP-14 specification](https://aips.adamant.im/AIPS/aip-14) for implementation details.

This update is not mandatory for all node owners. However, nodes that need to connect with messenger apps must upgrade to the latest version to take advantage of the new API. The ADAMANT Android team has already demonstrated measurable speed improvements using the new endpoint, and similar gains are expected across other ADAMANT apps as they adopt it.
