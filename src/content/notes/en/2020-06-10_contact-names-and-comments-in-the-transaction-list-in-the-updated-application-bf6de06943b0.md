---
title: "Contact names and comments in the transaction list — In the updated application"
slug: "contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
description: "The ADAMANT web messenger v2.6.0 update makes the transaction list more informative. Transfer comments are now visible directly in the list, contact names are displayed alongsid…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
publishedAt: "2020-06-10T06:44:48.139Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/bf6de06943b0/001-0-q5zuwj-pur7a9hdb.webp"
cardSpan: "full"
originalId: "medium:bf6de06943b0"
locale: "en"
placeholder: false
---

The ADAMANT web messenger v2.6.0 update makes the transaction list more informative. Transfer comments are now visible directly in the list, contact names are displayed alongside addresses, and each entry provides a shortcut to open the corresponding chat. Transaction detail views have been updated to show comments and contact names as well, and the user's own address is labeled as "Me" for clarity. For transactions involving other cryptocurrencies, ADM addresses and contact names are shown in the list, with the same chat shortcut available.

![Contact names and comments in the transaction list — In the updated application](/images/engineering-notes/medium/bf6de06943b0/002-0-nu76kd5rli905hye.webp)

The login persistence setting has been clarified: the previous "logout on tab close" behavior is replaced by a clearer "Stay logged in" option. Dark mode is now the default theme. On the security side, links in messages and the user-password documentation link open in new windows with `noopener` to prevent tab-nabbing. Push notifications have also been fixed in this release.

The full changelog is available on the [ADAMANT GitHub release page](https://github.com/Adamant-im/adamant-im/releases/tag/v2.6.0).
