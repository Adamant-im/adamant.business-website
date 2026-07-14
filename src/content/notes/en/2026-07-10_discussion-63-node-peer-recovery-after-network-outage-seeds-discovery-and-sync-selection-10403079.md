---
title: "ADAMANT node peer recovery after network outage: seeds, discovery, and sync selection"
slug: "discussion-63-node-peer-recovery-after-network-outage-seeds-discovery-and-sync-selection-10403079"
description: "ADAMANT nodes maintain peer connectivity through three separate mechanisms that are easy to confuse when reading console logs after a network outage. This note explains how they…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/63"
publishedAt: "2026-07-10T05:24:55Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10403079"
locale: "en"
placeholder: false
---

ADAMANT nodes maintain peer connectivity through three separate mechanisms that are easy to confuse when reading console logs after a network outage. This note explains how they interact, why sync can stall even while seed peers are still being contacted, and what operators should expect during recovery.

## Background

A node keeps an in-memory peer table populated from three sources: seed peers listed in the `peers.list` config, persisted peers loaded from the database on startup, and discovered peers returned by other nodes via `GET /peer/list`. Seed peers are frozen — they are never removed from the table, even when requests fail.

Each peer has a state: `BANNED` (0, excluded from normal use), `DISCONNECTED` (1, known but not currently usable for sync or broadcast), or `CONNECTED` (2, recently responded successfully and eligible for sync). On request failures, a peer's success rate drops. When a previously `CONNECTED` peer falls below 80% success, its state degrades to `DISCONNECTED`. Network timeouts (`ECONNABORTED`) do not remove the peer; they only reduce the success rate.

## Three parallel mechanisms

**Seed ping (quiet).** On startup and every ~5 seconds, the node pings every seed peer from config via `GET /peer/height`. Failures are logged at trace level and are usually invisible in default console output. A successful ping promotes the peer back to `CONNECTED`.

**Peer discovery (loud).** Every ~5 seconds, the node picks one random peer from memory (states `DISCONNECTED` or `CONNECTED`) and requests `GET /peer/list` to learn new addresses. If that single random pick times out, the console shows:

```text
Discovering new peers failed. ECONNABORTED Request failed GET http://<peer>/peer/list
```

This error names only the randomly selected peer, not the full peer table. During recovery it often surfaces little-known cloud-hosted nodes that were discovered earlier and saved to the database. That does not mean the node ignores seed peers.

**Blockchain sync (strict).** The loader sync path uses `peers.list()` with the default filter: `CONNECTED` peers only. If no peer is currently `CONNECTED` with a usable height, sync finishes with:

```text
Failed to find enough good peers
```

In that situation the node is not disconnected from the network in the sense of having no peer records. It simply has zero active peers suitable for block download.

## Typical outage timeline

When network loss occurs, HTTP requests to all peers start failing. Previously `CONNECTED` peers become `DISCONNECTED`, and the loader cannot select good peers, so height stops advancing. Discovery errors continue against random stale entries while seed pings run quietly in the background. Once at least one seed or other known peer answers a ping again, it returns to `CONNECTED` and sync resumes.

The gap between "internet is back" and "node is syncing again" can be several minutes — or longer if remote peers are still unreachable — because recovery depends on a successful round-trip to a peer that becomes `CONNECTED`, not merely on local connectivity.

## Operator expectations

Seeing discovery errors against unfamiliar addresses after an outage is normal and does not by itself indicate misconfiguration. Seed peers from config are still contacted; their ping failures are just not prominent in default logs. The message `Failed to find enough good peers` means no currently active peers, not that the peer table was wiped. Restarting the node reloads seeds and database peers, but recovery still requires at least one remote peer to respond.

## Possible improvements

Several changes could improve operator experience: logging seed ping failures at `warn` when no `CONNECTED` peers remain for longer than a threshold period, preferring seed peers or recently working peers in `getFromRandomPeer` instead of a uniform random pick, retrying all seed peers in parallel when sync reports `Failed to find enough good peers`, and reducing duplicate warn lines when `async.retry` exhausts all sync attempts.
