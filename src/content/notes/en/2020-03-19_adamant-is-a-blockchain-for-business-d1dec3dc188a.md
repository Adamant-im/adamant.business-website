---
title: "ADAMANT: A Blockchain for Business"
slug: "adamant-is-a-blockchain-for-business-d1dec3dc188a"
description: "ADAMANT is an open source blockchain platform aimed at small and medium sized businesses and communities, integrating a blockchain with a secure messaging environment. While ent…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-is-a-blockchain-for-business-d1dec3dc188a"
publishedAt: "2020-03-19T17:03:28.381Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/d1dec3dc188a/001-1-d3-fcbis82dcnsuwwaskja-png.webp"
cardSpan: "full"
originalId: "medium:d1dec3dc188a"
locale: "en"
placeholder: false
---

ADAMANT is an open-source blockchain platform aimed at small and medium-sized businesses and communities, integrating a blockchain with a secure messaging environment. While enterprise blockchains often carry costs comparable to ERP implementations, ADAMANT Business is free to license, open source, and designed for low-cost deployment and maintenance.

### Why business needs blockchain

Blockchain increases transparency, improves process visibility, and reduces costs. It allows organizations to store certified copies of data across geographically distributed locations—whether product data, delivery records, or financial information. Instant settlements between departments become possible regardless of distance, avoiding the delays and fees of conventional currency transfers. Supply chain tracking ensures product quality from production to the final consumer. Transaction costs drop because intermediaries, manual ledgers, and associated personnel are no longer required. Blockchain also provides built-in cryptography, meaning data is encrypted by default without additional expenditure.

### ADAMANT Business features

ADAMANT Business provides a blockchain, an internal company token, and a secure messaging solution. The platform is free, easy to install, and inexpensive to maintain. It uses a Fair dPoS consensus mechanism where three nodes are sufficient and can run on virtual machines with a single CPU. The default block time is five seconds and can be configured to be faster. Because ADAMANT is written in JavaScript, finding developers for custom functionality is straightforward. The license permits free internal use but prohibits selling services built on ADAMANT, creating public forks, or publicly selling tokens.

Beyond the blockchain itself, ADAMANT functions as a messaging platform. Organizations gain an internal messenger, the ability to issue one or more internal tokens for mutual settlements, reward systems, or working-hour tracking, and support for transferring cryptocurrencies such as Bitcoin, Ethereum, and Dash directly in chats. Internal exchange rates between the organization's token and other cryptocurrencies can be set independently. Additional capabilities include two-factor authentication, voting services, notification mailings, and bots.

The blockchain messenger provides strong security guarantees. Each message is a transaction signed with Ed25519 EdDSA, excluding man-in-the-middle attacks. Messages are written into blocks whose sequence and timestamps cannot be altered, making message repudiation impossible. End-to-end encryption is standard, and dialogs can be retrieved from any device without local storage. Message delivery is confirmed by the node system.

### Deployment options

A business can use ADAMANT in three ways: on the public network, by deploying nodes connected to the public network, or by creating a separate private network. The first two options are suitable only for evaluation. Full production use requires a separate network.

![ADAMANT is a Blockchain for Business](/images/engineering-notes/medium/d1dec3dc188a/002-1-bzfitphwhrwpmg1ax0ih0a-png.webp)

### Getting started

To begin, identify the tasks you want to accomplish with blockchain and what data you want to store beyond messages. Try the ADAMANT apps on the public network to get acquainted with the platform, then consider how internal tokens and custom services would fit your organization's workflows.

Creating a private ADAMANT Business blockchain requires technical specialists. Documentation and guides are available, and all source code is open. Organizations need to fork the relevant ADAMANT repositories to deploy their own blockchain.

![ADAMANT is a Blockchain for Business](/images/engineering-notes/medium/d1dec3dc188a/003-1-j8cryzu1yl05co9wzhcm9a-png.webp)

![ADAMANT is a Blockchain for Business](/images/engineering-notes/medium/d1dec3dc188a/004-1-vt41xwzpvkonbglaf7n-lg-png.webp)
