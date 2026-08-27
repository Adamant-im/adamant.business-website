---
title: "ADAMANT IPFS Node v0.1.0: Bounded Storage, Lifecycle-Aware GC, and Deterministic Replication"
slug: "discussion-74-adamant-ipfs-node-v0-1-0-bounded-storage-lifecycle-aware-gc-and-deterministic-replication-10693309"
description: "ADAMANT IPFS Node v0.1.0 introduces a production oriented storage lifecycle that bounds disk growth, cleans up failed uploads, distinguishes durable content from reclaimable cac…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/74"
publishedAt: "2026-08-26T19:14:25Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10693309"
locale: "en"
placeholder: false
---

ADAMANT IPFS Node v0.1.0 introduces a production-oriented storage lifecycle that bounds disk growth, cleans up failed uploads, distinguishes durable content from reclaimable cache, places replicas deterministically across the ADAMANT node set, repairs missing copies, and preserves every pre-existing CID during an upgrade.

## Why this was necessary

The previous implementation could stream blocks into the blockstore before all request limits were known. An interrupted or rejected upload could leave blocks behind, successful uploads remained pinned without an expiration policy, and there was no explicit replication quorum or repair process. This made it impossible to reliably answer how much disk space an upload can consume, which files are durable or reclaimable, what happens if a request disconnects mid-import, which nodes are responsible for a CID, whether a node can reclaim space without deleting confirmed content, and whether existing files remain available after a cluster upgrade.

## Admission happens before storage

Uploads are rejected before they can consume unbounded disk space. Concurrent uploads are limited by `storage.maxConcurrentUploads` (response `429`). Aggregate request size is capped by `storage.maxRequestSizeBytes` (`413`), enforced against both `Content-Length` and bytes actually streamed because chunked requests do not declare their final size. A disk reserve enforced by `storage.diskReserveBytes` returns `507` when free space is insufficient. Files per request are limited by `maxFileCount` (`400`), and individual file size by `uploadLimitSizeBytes` (`400`). Concurrent requests reserve disk atomically, so several uploads cannot all spend the same free-space headroom.

Each request owns an upload session that tracks the blocks it created. A parser rejection, import failure, route error, strict-quorum failure, or client disconnect removes only those new blocks. Pre-existing blocks, blocks retained by another concurrent upload, and pinned blocks are preserved.

## Explicit file lifecycle

A datastore-backed registry under `/adm/files` records the lifecycle and storage accounting of every known CID. The `temporary` state represents an upload waiting for confirmation or transactional settlement. `confirmed` represents durable content protected by policy. `expired` represents content that has been released and may be reclaimed under pressure. `pinned` and `heldLocally` are tracked separately from the logical state.

Lifecycle transitions, pin operations, registry writes, upload cleanup, replica settlement, repair, and garbage collection are coordinated with per-CID locks and a storage-wide collection lease. Failure compensation restores both the pin and the registry record to their observed baseline instead of leaving them in contradictory states.

The default `storage.confirmationRequired: false` keeps the existing API contract where uploads become durable immediately. Deployments that enable confirmation receive a configurable TTL for abandoned uploads and must call the authenticated confirmation endpoint.

## Pressure-driven, lifecycle-aware garbage collection

Releasing a pin and deleting blocks are intentionally separate decisions. A released file remains in the blockstore and can continue serving reads for free. Blocks are deleted only when the blockstore exceeds the configured high watermark or the filesystem falls into the disk reserve. This avoids discarding useful cache only to fetch it again later.

The collector has several safety properties. Confirmed content held by this node is never selected for eviction. Missing protection on a confirmed file is repaired before any deletion starts. A run that cannot verify durable content aborts before its first destructive action. Partial GC failures retain registry records so the next pass can retry safely. Dry-run mode reports the exact release and retention plan without changing pins or blocks. Scheduled sweeps are bounded and advance instead of repeatedly scanning the entire registry.

The documented defaults are a 50 GiB high watermark, a 40 GiB low watermark, a 5 GiB free-space reserve, and a scheduled pass every 15 minutes. All values are configurable. Scheduled GC is enabled by default but performs no deletion while space remains above the safety thresholds. Operators can inspect the plan with:

bash
curl --fail-with-body \
  -X POST \
  -H "x-api-key: $ADMIN_API_KEY" \
  "https://ipfs.example.org/api/storage/gc?dryRun=true"


## Replication over the existing libp2p network

Replication runs over `/adamant/replication/1.0.0`, not over an additional HTTP service. The libp2p handshake proves the remote peer identity, so replication needs no shared API secret, second public port, or separate cluster daemon. Operations that make this node responsible for content are accepted only from peers listed in `nodes`. Control messages are length-framed and bounded. Replica transactions record their originating peer, and only that peer can settle them.

Holders are selected with rendezvous hashing over the CID. Every node with the same membership list independently computes the same holder set without a central coordinator. The default placement policy keeps four copies for fresh content, three copies after 180 days, and two copies after one year. The count is capped by the actual network size, so a three-node network asked for four copies places one copy on every available node. Placement shrinks by file age rather than last-access time, because tracking reads would create metadata about when users retrieve files.

Strict upload durability is optional. When `replication.requireQuorumOnUpload` is enabled, local admission and remote replicas form one rollback-capable transaction: peers stage copies, the origin verifies the configured acknowledgement quorum, and then commits or aborts every prepared replica. A strict configuration requires `ackQuorum >= 2`, ensuring that success proves at least one remote copy.

## Repair, handover, and retrieval

The repair job asks a peer whether it already has a CID and whether it has room before transferring data. Intake is bounded by concurrency, request size, disk reservation, timeout, and per-peer budget. A node outside the current holder set hands its durable copy to the designated holders and releases its own pin only after those holders confirm they have the file. If every remote holder later disappears while the blocks are still local, the node takes responsibility again instead of allowing the last recoverable copy to vanish.

Reads also use placement information. Before serving a CID, a node connects directly to the peers expected to hold it rather than relying on a useful Bitswap peer already being connected. Periodic peering keeps the configured mesh available after startup. This matters for ADAMANT Messenger: a sender and receiver normally use different infrastructure nodes, so the receiver's first read commonly lands on a node that is not a designated holder.

## Preservation of existing files and CIDs

The upgrade does not re-import, rewrite, or rename stored content. CID generation remains compatible with the previous stack, so existing message links continue to address the same files. At startup, pins that predate the lifecycle registry are backfilled as confirmed records. Their DAG sizes are measured offline, and incomplete content is reported rather than silently registered as durable. The API can start while the backfill continues in the background.

One capacity implication is important: the original upload time of a legacy pin cannot be recovered, so backfilled files are initially treated as fresh and enter the widest placement tier. Operators should plan cluster capacity for the existing corpus, not only for future uploads. Repair processes that corpus in bounded advancing batches rather than attempting to replicate everything in one pass.

Only `/adamant/replication/1.0.0` is currently offered, so this release is intended for a coordinated cluster-wide upgrade. `GET /api/storage/metrics` exposes the active protocol version, making a mixed deployment visible.

## Operational visibility and access boundaries

Public read-only routes expose capacity and lifecycle state without filenames, CID inventories, or peer topology: `GET /api/file/:cid/status`, `GET /api/storage/metrics`, and `GET /api/storage/policy`. Administrative mutations such as confirmation, release, on-demand GC, repair, pin management, and libp2p topology operations require the configured `x-api-key`.

The storage report includes pinned and reclaimable bytes, filesystem availability, reserved and usable capacity, lifecycle counts, staged replica transactions, job status, and replication health. It provides enough information to validate an upgrade and monitor subsequent collection and repair passes without exposing private operational details.

## Defaults operators should review

The defaults suit a dedicated storage volume and preserve the current immediate-upload behavior. Aggregate upload size defaults to 512 MiB, concurrent uploads to 32, disk reserve to 5 GiB, temporary TTL to 24 hours, GC schedule to every 15 minutes, repair schedule to every 30 minutes, and fresh placement to 4 copies. Upload acknowledgement quorum defaults to 1 (best-effort replication), and strict upload quorum is disabled. Every operator should review capacity, watermarks, membership lists, and placement tiers before deployment.

## Verification

The merged implementation passed 232 unit tests, 102 integration tests, the production TypeScript build, ESLint and Prettier checks, a production dependency audit, and Semgrep SAST and Semgrep OSS scans. It was also exercised on a four-node network: sixteen files were placed on three holders while fresh, converged to exactly two holders after ageing into the next tier, and then read back byte-identically from all four nodes across 64 successful cross-node reads. No new runtime dependency was introduced.

## Deliberate follow-up work

This release establishes bounded storage and node-to-node durability but does not claim to solve every ownership or network-membership problem. Issue #27 tracks deletion authorized by the original uploader's signature. Issue #28 tracks decentralized node discovery and Sybil resistance. Issue #29 tracks traffic accounting, backoff, and monthly limits. Content encryption remains the responsibility of the ADAMANT client protocol; the storage node manages encrypted content by CID and does not need plaintext access.
