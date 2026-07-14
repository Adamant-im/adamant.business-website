---
title: "World's First Blockchain-Based 2FA in Production: ADAMANT on Resfinex"
slug: "world-first-2fa-on-a-blockchain-in-real-life-7adf5554728d"
description: "Two factor authentication is essential for protecting funds, but not all 2FA methods are equally secure. SMS based 2FA is particularly vulnerable to SIM swapping attacks, which…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/world-first-2fa-on-a-blockchain-in-real-life-7adf5554728d"
publishedAt: "2020-03-01T07:19:10.858Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/7adf5554728d/001-0-hktm6vjfrwccv7kd.webp"
cardSpan: "full"
originalId: "medium:7adf5554728d"
locale: "en"
placeholder: false
---

Two-factor authentication is essential for protecting funds, but not all 2FA methods are equally secure. SMS-based 2FA is particularly vulnerable to SIM swapping attacks, which have caused significant cryptocurrency losses. Blockchain-based 2FA offers a more reliable alternative by delivering authentication codes through an on-chain messenger, eliminating the telecom attack surface entirely.

### ADAMANT 2FA on the Resfinex Exchange

The Resfinex cryptocurrency exchange is the first production implementation of blockchain-based 2FA, using ADAMANT Messenger to deliver authentication codes. The setup flow is straightforward: a user navigates to Security settings, selects the ADAMANT Messenger 2FA method, and enters their ADAMANT address where codes will be received. New ADAMANT users need a small amount of ADM to initialize their account. After entering the verification code and exchange password, 2FA is active.

![World first 2FA on a blockchain in real life](/images/engineering-notes/medium/7adf5554728d/002-0-xvtbn00u-d5nvyzb.webp)

![World first 2FA on a blockchain in real life](/images/engineering-notes/medium/7adf5554728d/003-0-necwvzuliwggpf2c.webp)

![World first 2FA on a blockchain in real life](/images/engineering-notes/medium/7adf5554728d/004-0-to4kuxsaixckgh5j.webp)

![World first 2FA on a blockchain in real life](/images/engineering-notes/medium/7adf5554728d/005-0-kexa5qysqrmab0vf.webp)

![World first 2FA on a blockchain in real life](/images/engineering-notes/medium/7adf5554728d/006-0-f1qr6w3udghq575k.webp)

![World first 2FA on a blockchain in real life](/images/engineering-notes/medium/7adf5554728d/007-0-a-sfwulbvejil2rl.webp)

Once enabled, 2FA codes are required for logins, withdrawal confirmations, password changes, API key creation, and changes to security or other sensitive account settings.

### Implementing Blockchain 2FA in Your Service

Any service provider, including exchanges and financial institutions, can integrate ADAMANT 2FA. ADAMANT is a fully open-source project with documentation and implementation guides available. The source code for the ADAMANT 2FA demo application is on [GitHub](https://github.com/Adamant-im/adamant-2fa), and a [connection guide](https://medium.com/adamant-im/go-to-secure-2fa-on-a-blockchain-344500a5f010#db04) is available for developers.

![World first 2FA on a blockchain in real life](/images/engineering-notes/medium/7adf5554728d/008-0-1zqjg9sgj2eli5h5.webp)

![World first 2FA on a blockchain in real life](/images/engineering-notes/medium/7adf5554728d/009-0-wdowhqndtnflq0oy.webp)
