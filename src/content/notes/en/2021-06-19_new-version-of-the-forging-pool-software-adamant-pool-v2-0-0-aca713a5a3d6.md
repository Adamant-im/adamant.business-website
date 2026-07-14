---
title: "ADAMANT Pool v2.0.0 Released"
slug: "new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
description: "ADAMANT Pool v2.0.0 introduces a complete code rewrite focused on reliability and performance. The pool now uses the ADAMANT JS API v1.0.0, ensuring voters receive their rewards…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
publishedAt: "2021-06-19T14:05:48.039Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/aca713a5a3d6/001-0-nfjyvf39o49caqs7.webp"
cardSpan: "full"
originalId: "medium:aca713a5a3d6"
locale: "en"
placeholder: false
---

ADAMANT Pool v2.0.0 introduces a complete code rewrite focused on reliability and performance. The pool now uses the ADAMANT JS API v1.0.0, ensuring voters receive their rewards correctly and on time. Resource requirements have been reduced significantly; the pool can now run on a virtual machine with 1 vCPU and 512 MB of RAM. This efficiency was achieved by removing unnecessary dependencies, updating remaining ones, and replacing the `request` library with `axios`.

Several configuration changes have been made. The default port is now 36667 instead of 36668. The config file includes a new `log_level` option and a `donatewallet` parameter to share a percentage of rewards with the ADAMANT Foundation. Payout periods can now be scheduled using a day of the week option for `payoutperiod`. Additionally, the voting transaction fee is now paid by the voters, resulting in 0.5 ADM less per reward. Operators should adjust the `minpayout` parameter to ensure payouts remain reasonable relative to the fee. Delegate productivity is now counted during reward distribution.

Other updates include code refactoring, the removal of read-only mode, and added Markdown functions for the notificator. The pool's info panel dashboard design has also been updated.

![New version of the forging pool software ADAMANT Pool v2.0.0](/images/engineering-notes/medium/aca713a5a3d6/002-0-vrmyfc6ou3ue0xnb.webp)

When updating an existing pool, it is recommended to delete the old installation and perform a fresh install. However, the `/db/transactions` file containing the transaction history should be preserved.
