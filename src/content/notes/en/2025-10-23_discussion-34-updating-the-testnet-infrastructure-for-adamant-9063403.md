---
title: "Updating the Testnet Infrastructure for ADAMANT"
slug: "discussion-34-updating-the-testnet-infrastructure-for-adamant-9063403"
description: "ADAMANT has identified an infrastructure improvement task (Issue 148) to update and stabilise its testnet environment. A healthy testnet is essential for reliable blockchain dev…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/34"
publishedAt: "2025-10-23T15:40:31Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9063403"
locale: "en"
placeholder: false
---

ADAMANT has identified an infrastructure improvement task (Issue #148) to update and stabilise its testnet environment. A healthy testnet is essential for reliable blockchain development, enabling realistic testing and contributor onboarding.

## What's Available

A **bootstrap snapshot** of the testnet database is now available for download at `https://testnet.adamant.im/db_test_backup.sql.gz`. This allows developers to spin up a testnet node quickly without syncing from scratch.

Testnet ADM coins (3500 ADM) can be requested via the same faucet used for mainnet at `https://adamant.im/free-adm-tokens/`. The testnet messenger app running the dev branch is accessible at `https://dev-adamant-testnet.surge.sh/`, and the testnet block explorer is available at `https://testnet.adamant.im/`.

A list of public testnet nodes is maintained in the default configuration file on GitHub: `https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json`.

For full implementation details, see the original article at `https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56`.
