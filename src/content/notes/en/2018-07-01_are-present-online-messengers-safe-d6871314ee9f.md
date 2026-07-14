---
title: "Are Present Online-Messengers Safe?"
slug: "are-present-online-messengers-safe-d6871314ee9f"
description: "Online text messaging is a ubiquitous form of communication, yet few users critically evaluate how their personal data is stored, transmitted, and accessed. This analysis examin…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/are-present-messengers-safe-d6871314ee9f"
publishedAt: "2018-07-01T10:52:29.801Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/d6871314ee9f/001-0-4pq2ekt1kq-x6n.webp"
cardSpan: "full"
originalId: "medium:d6871314ee9f"
locale: "en"
placeholder: false
---

Online text messaging is a ubiquitous form of communication, yet few users critically evaluate how their personal data is stored, transmitted, and accessed. This analysis examines the encryption methods and message delivery systems of several popular messaging services, focusing on verifiable facts rather than media narratives.

WhatsApp, with over 1.5 billion monthly active users, introduced "end-to-end" encryption in 2016. However, critical security settings were buried deep in the interface, and researchers identified a backdoor allowing data manipulation through modified encryption keys and cloud duplication. WhatsApp's closed source code makes independent verification of its security claims impossible.

Facebook Messenger, serving 1.3 billion users, similarly offers "end-to-end" chats only when specially configured. Its closed source code and Facebook's track record on user data privacy raise significant trust concerns.

WeChat, used by over a billion people in China, claims that user privacy is a top priority. Yet its privacy statements describe complex encryption methods without mentioning end-to-end encryption, and the source code remains closed. The service operates under China's strict data retention and surveillance requirements. QQ Mobile, another major Chinese service with nearly 800 million users, lacks end-to-end encryption entirely and also keeps its source code private.

Other well-known services—including Viber, Skype, Snapchat, and Line—share the same fundamental flaw: closed source code that prevents independent security audits, despite aggressive marketing claims about privacy.

Telegram, popular for private communication in the Middle East, does not fully open its source code. While the API and client applications are open source, the server-side code has not been released despite a statement promising that "all code will be released eventually." Without server-side transparency, there is no verifiable evidence of how user messages are managed and stored.

Applications that aim for confidentiality consistently fall short due to inherent architectural limitations. These include mandatory phone-number authorization, IP address disclosure, on-device log storage, arbitrary user blocking capabilities, and centralized data storage.

These systemic shortcomings motivated the creation of the ADAMANT messenger, which takes a fundamentally different approach by building its architecture on blockchain technology. ADAMANT's fully open-source codebase allows independent verification of its security properties.

![Are Present Online-Messengers Safe?](/images/engineering-notes/medium/d6871314ee9f/002-0-qsxqt626jqio99tb.webp)

By leveraging blockchain, ADAMANT eliminates dependencies on central servers, developers, and internal identification systems. Network support is provided by users who earn internal currency for maintaining the infrastructure. The project is under active development, with recent implementation of ETH support.

![Are Present Online-Messengers Safe?](/images/engineering-notes/medium/d6871314ee9f/003-0-cgrras4imu0tlqjn.webp)
