---
title: "Set up Blockchain as an OTP 2FA Provider"
slug: "set-up-blockchain-as-an-otp-2fa-provider-f87575c27175"
description: "ADAMANT is a decentralized messaging infrastructure that includes a blockchain, explorer, messaging apps with crypto wallets, an exchanger, forging pool software, a bounty bot,…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/set-up-blockchain-as-an-otp-2fa-provider-f87575c27175"
publishedAt: "2022-12-18T15:14:19.999Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f87575c27175/001-1-g0bpvqabqrk2sobncqoicw-png.webp"
cardSpan: "full"
originalId: "medium:f87575c27175"
locale: "en"
placeholder: false
---

ADAMANT is a decentralized messaging infrastructure that includes a blockchain, explorer, messaging apps with crypto wallets, an exchanger, forging pool software, a bounty bot, and an OTP 2FA service provider. OTP 2FA uses one-time passwords as an additional security layer for logging into websites and services such as cryptocurrency exchanges, email providers, custodial wallets, and social accounts. ADAMANT is the first 2FA provider to deliver one-time passwords via blockchain.

The core advantage of blockchain-based 2FA is decentralization. Traditional OTP providers rely on centralized servers or SMS gateways, both of which can be compromised or taken offline. By contrast, ADAMANT's 2FA service delivers codes through its own blockchain network, meaning there is no single point of failure and no third-party intermediary that could intercept or delay authentication messages.

To try the service, first create an ADAMANT Messenger account, which is where you will receive 2FA codes. Then run the 2FA demo application and sign up for a new account using any regular login and password. After logging in, tap "Enable 2FA" and enter your ADAMANT address. Press the "Get 2FA Code" button, and a 2FA code will be delivered to your ADAMANT Messenger. Enter this code and press "Verify." Once enabled, logging out and signing back in will require a 2FA code, demonstrating the full authentication flow.

Web service providers can integrate ADAMANT 2FA to enhance user account security. The service is open source and designed to be embedded into existing authentication workflows where a second factor is required.
