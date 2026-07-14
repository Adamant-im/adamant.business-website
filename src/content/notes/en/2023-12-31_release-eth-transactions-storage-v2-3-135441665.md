---
title: "ETH Transactions Storage v2.3.0"
slug: "release-eth-transactions-storage-v2-3-135441665"
description: "This release updates function names throughout the ETH Transactions Storage codebase to align with changes introduced in the latest version of the web3.py package. The web3.py l…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.3"
publishedAt: "2023-12-31T17:06:00Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "ETH-transactions-storage"
tag: "v2.3"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:135441665"
locale: "en"
placeholder: false
---

This release updates function names throughout the ETH Transactions Storage codebase to align with changes introduced in the latest version of the web3.py package. The web3.py library periodically renames functions and methods as part of its own evolution, and this update ensures compatibility with the current API surface.

No new features are introduced in this release. The changes are limited to function name adjustments, allowing the project to continue operating correctly with recent web3.py installations.

### Breaking changes

Function names have been updated to match the new web3.py package conventions. Any code that directly calls or references the previous function names will need to be updated accordingly.
