---
title: "Enable Push Notifications in ADAMANT Messenger on iOS"
slug: "enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
description: "ADAMANT Messenger for iOS can notify users about new messages even when the application is not running, facilitated by the ADAMANT Notification Service (ANS). The workflow begin…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
publishedAt: "2021-09-02T20:37:14.112Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/5a77ecffeb32/001-0-gssgbcsz1xeu5gpg.webp"
cardSpan: "full"
originalId: "medium:5a77ecffeb32"
locale: "en"
placeholder: false
---

ADAMANT Messenger for iOS can notify users about new messages even when the application is not running, facilitated by the ADAMANT Notification Service (ANS). The workflow begins when a user sends an encrypted signal message containing a unique token to an ADAMANT blockchain node, with the ANS ADAMANT address as the recipient. ANS polls the blockchain to decrypt the user's token and filters transactions where the user's ADM address is the recipient. It then requests APNS to deliver these transactions, which hold encrypted messages, to the user's device specified by the unique token. Finally, APNS notifies the device, and the Messenger app uses its secret key (passphrase) to decrypt the messages.

This architecture ensures the user's device never communicates directly with ANS, meaning ANS never knows the device's IP or other identities. They communicate solely through blockchain nodes. To enable push notifications in the app, users must enable the "Stay logged in" option and select a Push notification type.
