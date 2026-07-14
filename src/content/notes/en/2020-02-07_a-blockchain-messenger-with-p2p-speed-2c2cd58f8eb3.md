---
title: "A blockchain messenger with P2P speed"
slug: "a-blockchain-messenger-with-p2p-speed-2c2cd58f8eb3"
description: "ADAMANT PWA version 2.4.0 introduces WebSocket support, significantly increasing messaging speed to rival classic P2P messengers. WebSockets enable instant data sharing between…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-blockchain-messenger-with-p2p-speed-2c2cd58f8eb3"
publishedAt: "2020-02-07T03:03:50.348Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/2c2cd58f8eb3/001-0-nhjz84euai2uyek8-png.webp"
cardSpan: "full"
originalId: "medium:2c2cd58f8eb3"
locale: "en"
placeholder: false
---

ADAMANT PWA version 2.4.0 introduces WebSocket support, significantly increasing messaging speed to rival classic P2P messengers. WebSockets enable instant data sharing between a node and the messaging app, notifying users of new events and unconfirmed transactions immediately.

When a message is sent, it is initially received by a single node and displayed with a "Delivered to a node" ✔ status within a fraction of a second, meaning the recipient has already received it. The message is then verified by other nodes across the decentralized network, which guarantees the security advantages of a blockchain messenger. Once verified and included in a new block, the status changes to "Saved to the blockchain" ⚭. This verification process takes a few seconds.

Currently, nodes communicate with each other with a slight delay. If both users are connected to the same node, messages are delivered instantly. If they are connected to different nodes, delivery may take a few seconds. Users can test this by navigating to the Nodes list in the Settings section and disabling all nodes except one.

![A blockchain messenger with P2P speed](/images/engineering-notes/medium/2c2cd58f8eb3/002-0-7eq9vdfgyflcuptg-png.webp)

Future updates will add supported connections between sockets and nodes to eliminate delays regardless of which nodes users are connected to. In addition to WebSocket support and the new blockchain status indicators, version 2.4.0 includes Resfinex Token (RES) support, an updated Stably Dollar (USDS) name and logo, and various interface adjustments such as an updated Buy & Sell tokens dialog and adjusted Send Token menu height. The release also introduces validation for BTC addresses and fixes issues related to pasting addresses from the clipboard and sending negative amounts.
