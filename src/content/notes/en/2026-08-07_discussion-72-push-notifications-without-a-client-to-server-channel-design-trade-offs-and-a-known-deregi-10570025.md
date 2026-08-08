---
title: "Push notifications without a client-to-server channel: design, trade-offs, and a known deregistration race"
slug: "discussion-72-push-notifications-without-a-client-to-server-channel-design-trade-offs-and-a-known-deregi-10570025"
description: "Push notifications are the one place where a private messenger is most tempted to compromise. Somebody has to be told that a message arrived, and on iOS that somebody is Apple.…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/72"
publishedAt: "2026-08-07T13:36:18Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10570025"
locale: "en"
placeholder: false
---

Push notifications are the one place where a private messenger is most tempted to compromise. Somebody has to be told that a message arrived, and on iOS that somebody is Apple. This note describes how ADAMANT wires that up so the notification service learns as little as possible, what the design costs, and one known failure mode the project has decided to live with rather than paper over.

## The shape of the system

Four parties are involved: the user's device, an ADAMANT node, Apple Push Notification service (APNs), and the ADAMANT Notification Service (ANS), which cryptofoundry operates.

Registration goes through the blockchain, not through an API. The device first asks APNs for a push token. The app then encrypts `{token, provider, action}` to the ANS public key and sends it as a **signal message** (chat type 3, [AIP-6](https://aips.adamant.im/AIPS/aip-6)) to the ANS account's ADM address, through whichever node the user has chosen. ANS polls nodes for transactions addressed to itself, decrypts them, and stores the `ADM address → push token` pair.

Delivery is the mirror image. ANS polls for transfer (type 0) and chat (type 8) transactions, checks the recipient against its registry, and asks APNs to deliver a push.

## What each party actually learns

The notification payload carries no message content:

```json
{
  "aps": {
    "alert": { "loc-key": "NotificationsService.NewMessage.BodySingle" },
    "badge": 1,
    "mutable-content": 1,
    "sound": "notification.mp3"
  },
  "push-recipient": "U1234567890123456",
  "txn-id": "7175005690801347553"
}
```

The body is a localization key, not a message. The app's Notification Service Extension takes `txn-id`, fetches the transaction from a node, and decrypts it locally with the user's private key before the notification is rendered. Apple sees a device token, an ADM address, a transaction id, and timing — never content. That is a real disclosure worth stating plainly: if you push to Apple, Apple learns that this address received something, and when.

The more interesting property is on the server side. The app never opens a connection to ANS. The iOS client's token service issues exactly two kinds of network calls, both to ADM nodes, and no push-service hostname appears anywhere in the app. ANS therefore sees only what is already public on-chain and, critically, never sees a device IP address. A user routing through their own node or through Tor does not touch cryptofoundry infrastructure at all.

That property is the whole point, and it is fragile. The obvious convenience feature — a small HTTPS endpoint on ANS so a client could ask "do you still have my token?" — would quietly destroy it. It would hand ANS the device IP, turn every app launch into a per-device liveness signal, defeat the user's choice of node, and create a single blockable hostname where today there is a pluggable node list. That endpoint is not being added.

## The registration lifecycle, and where it bites

Because the channel is the blockchain, `add` and `remove` are transactions. Each signal message costs a normal chat fee: `constants.fees.chat_message = 100000` at `fixedPoint = 1e8`, i.e. **0.001 ADM**. That matters more than the price suggests — a user with a zero balance cannot send one at all, which rules out "just re-register periodically" as a robustness strategy.

The client keeps a local copy of the token it believes is registered and only re-registers when iOS hands it a *different* token. It never asks the server whether the registration still exists, because it cannot ask without giving up the privacy property.

This produces a known and reproducible failure mode that requires no data loss on the server. The user signs out while offline or against a flaky node; the client clears its cached token and sends `remove(T)`, but the send fails, so the transaction is persisted and retried on every subsequent app launch. The user then signs back in on the same device. iOS supplies the **same** token `T`. The local cache is empty, so the client sends `add(T)` and it succeeds — server state is now correct. But the queued `remove(T)` eventually succeeds too, landing on chain *after* the `add`, so ANS deletes the registration it just created. The client's cache says `T`, iOS keeps supplying `T`, so the "did the token change?" check never fires. The device is unregistered and has no way to notice.

Notifications stop silently. The only recovery is a manual **Notifications → Off → Push** toggle in the app, which clears the local cache and forces a fresh registration.

## Why this is not being rushed

It is a real bug, but a narrow one: it needs a failed unregister followed by a re-registration of the same token. The two shortcuts that would mask it are both worse than the bug. An HTTP check trades a rare silent failure for a permanent, universal metadata leak. Periodic re-registration spends user funds on a schedule and simply does not work for anyone holding zero ADM.

The correct fix is client-side ordering, and it stays entirely within the blockchain-mediated design: make the retry queue token-aware so a pending `remove(T)` is dropped once a later `add(T)` succeeds, stop treating "cache is empty" as the registration state, and persist the `add` with the same care the `remove` already gets. That work belongs in the clients.

A related consequence of the same asymmetry: an `unregister` can only be sent for a token the app still remembers, so a reinstall orphans the previous registration permanently. The registry currently holds around 2,600 rows across roughly 1,700 distinct addresses, with one address carrying 251 of them. Rows are removed when APNs reports a token as dead, so the registry does self-clean for anyone still receiving pushes — but an address nobody writes to is never exercised and never cleaned.

## Building on this

Two takeaways for anyone integrating with ADAMANT notifications or building a client. First, do not add a device-to-notification-service callback — it is the natural design and it is the one thing that breaks the guarantee. Second, treat register and unregister as an ordered pair. They are asynchronous, retryable, on-chain, and they can arrive out of order. Sequence them explicitly rather than inferring state from a local cache.
