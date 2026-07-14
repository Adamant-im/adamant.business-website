---
title: "ADAMANT: Why We Changed Free-Tokens"
slug: "adamant-why-we-changed-free-tokens-12b8aff8a9d4"
description: "All ADAMANT blockchain accounts require a small token balance to send messages, with a minimal fee of 0.001 ADM per message. This fee supports the network infrastructure and let…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-why-we-changed-free-tokens-12b8aff8a9d4"
publishedAt: "2018-06-05T07:18:13.023Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/12b8aff8a9d4/001-0-it4qol6uievlykgo.webp"
cardSpan: "full"
originalId: "medium:12b8aff8a9d4"
locale: "en"
placeholder: false
---

All ADAMANT blockchain accounts require a small token balance to send messages, with a minimal fee of 0.001 ADM per message. This fee supports the network infrastructure and lets new users try the ADAMANT Messenger. Previously, an automatic mechanism gifted 0.49 ADM to every new wallet for this purpose.

The ADAMANT development team reduced the starting token amount to combat botnets that mass-produced wallets to harvest free tokens. Since implementing a captcha inside the messenger would compromise user anonymity, the team instead placed a token-issuing processor on the website at [adamant.im/free-adm-tokens](https://adamant.im/free-adm-tokens/). Only real users now receive ADM tokens.

The free token amount decreased from 0.49 ADM to 0.09 ADM, allowing users to send 90 messages to test the messenger. This change also helps ensure tokens are preserved for bounty programs, maximizing the value of each token spent.
