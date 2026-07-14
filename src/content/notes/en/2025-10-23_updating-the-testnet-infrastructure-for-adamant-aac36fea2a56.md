---
title: "Updating the Testnet Infrastructure for ADAMANT"
slug: "updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
description: "Why the Testnet Matters ADAMANT's testnet infrastructure was flagged in Issue 148 as needing updates and stabilization to better support development, testing, and community cont…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
publishedAt: "2025-10-23T15:31:46.542Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/aac36fea2a56/001-1-gpu744hucponr8ep2jojwa-png.webp"
cardSpan: "full"
originalId: "medium:aac36fea2a56"
locale: "en"
placeholder: false
---

### Why the Testnet Matters

ADAMANT's testnet infrastructure was flagged in [Issue #148](https://github.com/Adamant-im/adamant/issues/148) as needing updates and stabilization to better support development, testing, and community contributions. Two priorities emerged from the discussion: accessibility, so new contributors can spin up a node without complex setup, and stability, so test nodes reliably mirror production-like conditions.

### Bootstrap Image for the ADM Testnet

A snapshot of the testnet database is available for download, letting you bootstrap a fresh node already synced to the current testnet state and significantly reducing setup time.

After installing a testnet node, download the snapshot:

```bash
wget https://testnet.adamant.im/db_test_backup.sql.gz
```

Unzip it:

```bash
gunzip db_test_backup.sql.gz
```

Load the image into the testnet node's database:

```bash
psql adamant_test < db_test_backup.sql
```

### Public Testnet Nodes

The ADAMANT testnet provides a predefined list of public nodes for peer discovery, network synchronization, and API access. The authoritative source is the [official configuration file](https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json) in the repository. At the time of writing, the list contains three nodes, all on port 36667:

```json
"list": [
  {
    "ip": "162.55.32.80",
    "port": 36667
  },
  {
    "ip": "81.0.247.181",
    "port": 36667
  },
  {
    "ip": "95.217.19.144",
    "port": 36667
  }
]
```

The first node (`testnode1.adamant.im`) also hosts the testnet explorer. The second has no domain and public API disabled. The third (`testnode3.adm.im`) exposes a public API; for example, `https://testnode3.adm.im/api/node/status` returns node status.

### Running Tests

Contributors and validators should run the unit and API tests against their node following the project's [contribution guidelines](https://github.com/Adamant-im/adamant/blob/dev/.github/CONTRIBUTING.md).

### Requesting Testnet ADM and Accessing Apps

You can request 3500 testnet ADM through the same faucet used for mainnet: [https://adamant.im/free-adm-tokens](https://adamant.im/free-adm-tokens/). The testnet messenger app is available at [https://dev-adamant-testnet.surge.sh](https://dev-adamant-testnet.surge.sh), auto-built from the dev branch. The testnet explorer is at [https://testnet.adamant.im](https://testnet.adamant.im/).
