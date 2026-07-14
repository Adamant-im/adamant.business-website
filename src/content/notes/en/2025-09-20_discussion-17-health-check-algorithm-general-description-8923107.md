---
title: "Health Check Algorithm for ADAMANT Nodes and Services"
slug: "discussion-17-health-check-algorithm-general-description-8923107"
description: "The health check algorithm aims to make ADAMANT the most reliable crypto wallet. It applies to all nodes, including ADM and coin nodes, as well as services like info service and…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/17"
publishedAt: "2025-09-20T15:11:05Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923107"
locale: "en"
placeholder: false
---

The health check algorithm aims to make ADAMANT the most reliable crypto wallet. It applies to all nodes, including ADM and coin nodes, as well as services like `info-service` and IPFS. The algorithm evaluates node height, minimum supported version, and uses the most informative endpoint available, such as `/api/node/status` for ADM. It skips nodes disabled by the user and stores the node list locally, independent of the “Stay logged in” setting.

Node statuses include Disabled by user, Not supported (due to version or HTTP node via PWA-HTTPS), and Unavailable. If a node is unavailable, the algorithm checks the domain first, then an `alt_ip` if the domain fails. Once the domain is available, `alt_ip` is never checked again to avoid extra requests. If both are unavailable, the algorithm retries on the next request.

Available and in-sync detection relies on node height thresholds (`HEIGHT_EPSILON`). The only responsive node is marked Available. A group of nodes within the threshold are Active, while nodes outside the threshold are In-sync (or “cheater”). Thresholds vary by coin: ADM is 10, BTC is 2, ETH is 5, DOGE is 3, DASH is 3, and LSK is 5. For example, BTC nodes at 815,000 and 815,001 are both active, but a node at 815,010 would be in-sync.

During the initial health check or after a connection drop, the first node reply might be marked Active instead of In-sync. Waiting for a full 10-second check would freeze the app. To solve this, statuses update to Active or In-sync only after 30% of nodes respond; otherwise, previous statuses are kept. This is marked as an Initial check. For subsequent checks, statuses update only after 100% of nodes respond to prevent pending nodes with old data from being mistakenly marked In-sync.

To avoid confusing users, an “Updating…” visual status is shown during an in-progress Initial check for nodes in Undefined or Unavailable statuses. It appears as a grey dot with muted text.

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8923107/001-bfb8d9fa.webp)

Each health check request measures Ping, and the node with the smallest ping is the fastest. The “Prefer fastest node” setting defaults to No for ADM and Yes for coin nodes, operating separately for coin nodes and indexers.

Health checks run independently of internet connection status, as OS-reported “No internet connection” is unreliable. If there is no connection, the result will simply be no available nodes. The `hasEnabledNodes` and `hasAvailableNodes` states update when at least three nodes are responsive or when a check completes, improving startup UX by avoiding 10-second freezes. Overlapping checks are prevented; a bug using `setInterval()` instead of `setTimeout()` previously caused a request storm when restoring the app from the background.

Health checks are triggered on app start, connection restore, when a node screen is opened, or when node lists are updated. Regular intervals (`normalUpdateInterval`) vary by node type, ranging from 3 to 8 minutes. If all active nodes fail, an extra health check is performed.

When sending HTTP requests, the algorithm ignores the “No internet connection” status and does not wait for a full health check. It chooses the fastest or a random active node. If a request fails due to timeout, it tries the next node and marks the failed one as Unavailable. HTTP errors like 404 do not count as failed. Pending requests are always completed after connection restore, ensuring operations like saving a contact list are not interrupted.
