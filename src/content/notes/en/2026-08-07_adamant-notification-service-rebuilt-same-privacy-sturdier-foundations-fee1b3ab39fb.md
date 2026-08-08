---
title: "ADAMANT Notification Service, Rebuilt: Same Privacy, Sturdier Foundations"
slug: "adamant-notification-service-rebuilt-same-privacy-sturdier-foundations-fee1b3ab39fb"
description: "The ADAMANT Notification Service (ANS) has shipped its biggest update since 2019, maintaining its zero knowledge push notification model for iOS users while rebuilding its under…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-notification-service-rebuilt-same-privacy-sturdier-foundations-fee1b3ab39fb"
publishedAt: "2026-08-07T14:48:47.463Z"
author: "Sab Kabadas"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:fee1b3ab39fb"
coverImage: "/images/engineering-notes/medium/fee1b3ab39fb/001-50da4f2353.webp"
locale: "en"
placeholder: false
---

The ADAMANT Notification Service (ANS) has shipped its biggest update since 2019, maintaining its zero-knowledge push notification model for iOS users while rebuilding its underlying infrastructure. For iPhone users of ADAMANT Messenger, ANS operates quietly in the background, alerting devices to new messages without compromising privacy.

Most messaging apps face a tradeoff where push notifications require some system component to know message details. ANS avoids this by polling the public ADAMANT blockchain for transactions addressed to a registered device. When it detects one, it asks Apple to notify the device using only a transaction ID. ANS cannot read transaction contents or include decrypted content in the push payload, as decryption requires a secret key held only on the user's device. Neither ANS nor Apple can reconstruct the conversation.

While this privacy model remains unchanged, the underlying runtime and reliability mechanisms have been significantly hardened. ANS now runs on .NET 8, replacing an end-of-life runtime version. This allows the service to run natively on current server operating systems without relying on aging compatibility layers.

Additionally, a network connection leak that compounded over time and required periodic service restarts has been fixed, with connections now properly reused. The service also implements real failover for blockchain node communication. Previously, a single unreachable node could interrupt the entire notification pipeline. ANS now automatically retries against another node, leveraging the decentralized resilience of the ADAMANT network.

This maintenance release was independently security audited by cryptofoundry. By modernizing the runtime and fixing core infrastructure issues, ADAMANT ensures ANS can continue delivering timely, zero-knowledge notifications reliably for years to come.
