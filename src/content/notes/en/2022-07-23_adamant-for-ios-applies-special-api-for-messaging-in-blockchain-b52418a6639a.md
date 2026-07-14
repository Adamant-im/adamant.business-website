---
title: "ADAMANT for iOS Adopts Chatrooms API for Faster Blockchain Messaging"
slug: "adamant-for-ios-applies-special-api-for-messaging-in-blockchain-b52418a6639a"
description: "ADAMANT for iOS now supports the Chatrooms API for blockchain messaging, accelerating message loading times by up to 50 times. This improvement is immediately noticeable upon lo…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-for-ios-applies-special-api-for-messaging-in-blockchain-b52418a6639a"
publishedAt: "2022-07-23T13:24:47.800Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:b52418a6639a"
locale: "en"
placeholder: false
---

ADAMANT for iOS now supports the Chatrooms API for blockchain messaging, accelerating message loading times by up to 50 times. This improvement is immediately noticeable upon logging into an ADM account. Desktop applications previously implemented this same API.

The Chatrooms API provides two primary endpoints. The first, `/api/chatrooms/U000000000000`, retrieves the chat list for a specified account. The second, `/api/chatrooms/U000000000000/U000000000001`, fetches the message history between two specific accounts. To optimize data transfer, the API includes pagination. Further technical details are available in AIP 14.

Version 2.5.0 of the iOS application includes this Chatrooms API integration alongside faster crypto rate fetching, general performance enhancements, optimizations for MacBook M1, and various bugfixes.
