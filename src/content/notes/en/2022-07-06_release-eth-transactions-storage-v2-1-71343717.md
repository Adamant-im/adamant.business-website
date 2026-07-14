---
title: "ADAMANT ETH Transactions Storage v2.1"
slug: "release-eth-transactions-storage-v2-1-71343717"
description: "This maintenance release for the ETH transactions storage tool reduces the number of requests made to the Ethereum node and adds more logging throughout the application. It fixe…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.1"
publishedAt: "2022-07-06T08:00:44Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "ETH-transactions-storage"
tag: "v2.1"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:71343717"
locale: "en"
placeholder: false
---

This maintenance release for the ETH-transactions-storage tool reduces the number of requests made to the Ethereum node and adds more logging throughout the application. It fixes the IPC connection to the Ethereum node as well as the database connection, improving overall reliability.

A new `LOG_FILE` environment variable has been introduced, allowing operators to configure where log output is written. Two helper scripts are now included: `ethtest.py` for testing the Ethereum node connection and `pgtest.py` for testing the PostgreSQL database connection. These scripts make it easier to diagnose connectivity issues during deployment.
