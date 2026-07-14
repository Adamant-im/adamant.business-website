---
title: "ADAMANT iOS adds socket connections for fast messaging"
slug: "adamant-delivers-fast-d1d3d9e8c82c"
description: "ADAMANT for iOS now supports socket connections, bringing message delivery speed in line with classic messengers. Desktop applications previously implemented sockets as well, so…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-delivers-fast-d1d3d9e8c82c"
publishedAt: "2022-05-20T12:48:31.779Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/d1d3d9e8c82c/001-1-djgmlycgrt1rto-ajz7ifw-png.webp"
cardSpan: "full"
originalId: "medium:d1d3d9e8c82c"
locale: "en"
placeholder: false
---

ADAMANT for iOS now supports socket connections, bringing message delivery speed in line with classic messengers. Desktop applications previously implemented sockets as well, so communication across platforms is now consistently fast regardless of which client your partner uses.

Privacy and security of correspondence remain unchanged. Messages are still encrypted and stored on the blockchain, preserving ADAMANT's core guarantees.

When a message is sent, it first appears with a status of "Delivered to a node" and is verified by a single node. Once the transaction is confirmed by the broader blockchain network, the status changes to "Saved to the blockchain" ⚭.

Release 2.4.0 includes socket support for instant send and receive, along with the ability to open a specific chat directly from a push notification.

A short demonstration of the delivery flow is available on [YouTube](https://youtube.com/shorts/OSYL9ELVEjE).
