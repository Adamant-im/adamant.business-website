---
title: "Messengers' Terms of Service: Telegram and WhatsApp"
slug: "messengers-terms-of-service-telegram-and-whatsapp-4e60a8178004"
description: "This article reviews the official privacy policies of Telegram and WhatsApp, two of the most widely used messaging services. Despite their scale and longevity, neither platform…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/messengers-terms-of-service-telegram-and-whatsapp-4e60a8178004"
publishedAt: "2018-07-18T13:49:15.655Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4e60a8178004/001-0-w-bbrzmuju79thvm.webp"
cardSpan: "full"
originalId: "medium:4e60a8178004"
locale: "en"
placeholder: false
---

This article reviews the official privacy policies of Telegram and WhatsApp, two of the most widely used messaging services. Despite their scale and longevity, neither platform has published its full server-side source code, making independent verification of their security claims impossible.

## Telegram

Telegram describes itself as an open-source project, inviting users to study its API, protocol, and source code. In practice, however, Telegram has never fully open-sourced its server infrastructure, data storage layer, or internal message-processing code. This gap raises questions about the difference between standard cloud chats and the optional "encrypted chats," and about the extent of end-to-end encryption across the platform.

Telegram stores messages, photos, videos, and documents from cloud chats on its servers. It uses phone numbers as unique identifiers and requests permission before syncing contacts. The policy states that Telegram "only stores the data it needs to function properly," but does not specify what that data entails.

A 2018 update added that Telegram processes personal data on the basis of its own "legitimate interests." Screen names, profile pictures, and usernames are always public. Notably, this design has been shown to allow extraction of a user's mobile number through the official application, as documented in prior ADAMANT research.

The most significant provisions concern message access. Telegram's policy explicitly states that moderators may check messages reported by recipients, and that automated algorithms may analyze messages in cloud chats to combat spam and phishing. The service also collects metadata including IP addresses, device information, Telegram app versions used, and username change history, and may store aggregated metadata to support cross-device features. In short, Telegram retains access to cloud chat content and reserves the right to inspect it both manually and automatically.

Regarding law enforcement, Telegram states that if it receives a court order confirming a user is a terror suspect, it may disclose that user's IP address and phone number to relevant authorities. Once a phone number is disclosed, state bodies can further request subscriber data from the SIM operator, expanding the scope of access.

## WhatsApp

WhatsApp was acquired by Facebook (now Meta) in 2014, and its privacy policy reflects that corporate relationship. The policy opens by stating that WhatsApp must collect information to "operate, provide, improve, understand, customize, support, and market our Services" — a broad mandate without specific justification for each category of data collection.

Users must provide a mobile phone number and profile name. WhatsApp also collects phone numbers from the user's address book on a regular basis, including contacts who do not use the service. If a message cannot be delivered immediately, WhatsApp may retain it on its servers for up to 30 days, and may keep content longer in certain circumstances.

Device and connection information collected includes hardware model, operating system, battery level, signal strength, app version, browser information, mobile network, ISP, language, time zone, IP address, and various device identifiers. Location information is also collected via IP, GPS, Bluetooth signals, nearby Wi-Fi access points, beacons, and cell towers.

WhatsApp receives information about users from other people and businesses. When a user communicates with a business account, that business may use a third-party company to store, read, and respond to messages on its behalf. WhatsApp also works with third-party service providers and other Facebook Companies, sharing data within that corporate ecosystem.

The policy reserves the right to collect, use, preserve, and share user information whenever WhatsApp has a "good-faith belief" that doing so is "reasonably necessary" — a standard that leaves significant discretion to the platform.

## Key Takeaways

Both Telegram and WhatsApp collect substantial metadata and retain varying degrees of access to user communications. Telegram's cloud chats are not end-to-end encrypted by default and are subject to both automated and manual review. WhatsApp, integrated into the Meta corporate ecosystem, collects extensive device, location, and contact data. Neither platform has published the full server-side source code needed to independently verify their security and privacy claims. Users concerned about data sovereignty should review the original sources — [Telegram's privacy policy](https://telegram.org/privacy) and [WhatsApp's privacy policy](https://www.whatsapp.com/legal/?lang=en#privacy-policy) — and consider open-source alternatives with verifiable architectures.
