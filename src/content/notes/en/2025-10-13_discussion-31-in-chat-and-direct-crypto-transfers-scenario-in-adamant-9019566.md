---
title: "In-Chat and Direct Crypto Transfers in ADAMANT"
slug: "discussion-31-in-chat-and-direct-crypto-transfers-scenario-in-adamant-9019566"
description: "ADAMANT Messenger supports seamless crypto transfers both inside chats and directly from the Wallet screen, with all operations tracked in the Transaction History. In Chat Crypt…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/31"
publishedAt: "2025-10-13T05:01:20Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9019566"
locale: "en"
placeholder: false
---

ADAMANT Messenger supports seamless crypto transfers both inside chats and directly from the Wallet screen, with all operations tracked in the Transaction History.

### In-Chat Crypto Transfers

Before sending, the app validates the user's ADM balance, internet connection, ADM node availability, and crypto node availability via health checks. If any check fails, the app shows an error and allows a retry.

The transaction flow begins by generating both the crypto transaction and the ADM transaction locally. For chains with nonces like ETH, the app verifies local storage to ensure a transaction with the same nonce hasn't already succeeded. For chains without nonces like BTC, DOGE, or DASH, it checks local storage and queries the blockchain for pending transactions. If a pending or successful duplicate is found, the process stops.

Next, the ADM transaction is sent to the ADM node. If accepted, it is added to the chat, and the app remains on the Send screen. The crypto transaction is then stored in the local database and displayed in the transaction history with a "Pending" status. The app relies on a locally stored timestamp for ordering until the actual blockchain timestamp becomes available. This immediate display is crucial for non-ADM coin transfers, as the coin node hasn't returned data yet, but the user needs instant feedback.

The crypto transaction is then sent to the coin node. Any positive response marks the transaction as Pending, and the user is navigated to the Chat or transaction details screen. If sending fails, a snackbar error is shown, and the user can retry, which generates a completely new transaction. If the user returns to Chat without retrying, the failed transaction still appears in the chat and history because the ADM message was already sent. Transaction updates continue in the background.

Generating the ADM transaction before sending the crypto transaction ensures the crypto transfer is never sent without being recorded in chat, preventing users from spending crypto without seeing it and resending by mistake.

### Direct Crypto Transfers (Wallet Screen)

The direct transfer scenario from the Wallet screen is identical to in-chat transfers, with a few exceptions. It skips the ADM balance check, ADM node check, and ADM transaction creation. Upon completion, the user is redirected to the transaction history instead of the chat.

### Transaction History

The transaction history combines locally stored transactions with data synced from the blockchain node API. Locally stored transactions are retained even after an app restart but must be cleared on logout or re-login to prevent displaying another account's history. This combination provides an accurate and up-to-date overview of user transfers. Wherever possible, the app uses local calculations and checks for transaction generation, balances, nonces, duplicates, and timestamps to ensure a responsive user experience without waiting for network requests.

![Discussion screenshot 1](/images/engineering-notes/github/discussions/9019566/001-90a49183.webp)
