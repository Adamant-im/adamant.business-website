---
title: "ADAMANT IPFS Node v0.1.0: A Self-Hosted File Delivery Mesh"
slug: "adamant-ipfs-node-v0-1-0-a-file-delivery-mesh-you-can-run-yourself-f2d20fc9af5a"
description: "ADAMANT IPFS Node v0.1.0 is the first tagged release and published container image of ADAMANT's self hosted file delivery service. It packages content addressing, a REST API, co…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-ipfs-node-v0-1-0-a-file-delivery-mesh-you-can-run-yourself-f2d20fc9af5a"
publishedAt: "2026-09-30T18:36:13.519Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:f2d20fc9af5a"
coverImage: "/images/engineering-notes/medium/f2d20fc9af5a/001-275d9701d0.webp"
locale: "en"
placeholder: false
---

ADAMANT IPFS Node v0.1.0 is the first tagged release and published container image of ADAMANT's self-hosted file-delivery service. It packages content addressing, a REST API, controlled peer-to-peer delivery, storage policies, replication, repair, and health checkpoints into a single Node.js application. ADAMANT Messenger already uses this infrastructure for attachments; the release makes it easier for other developers to evaluate, deploy, and adapt it.

## Application-owned files

Integration starts with two actions: upload a file via `POST /api/file/upload`, then retrieve it via `GET /api/file/:cid`. The returned content identifier (CID) is derived from the content rather than the server address, so an application can pass that identifier to a recipient without deciding which machine should serve the file. A node can stream its local copy or retrieve content from configured peers that should hold it.

This fits messenger attachments, immutable application media, and services whose clients already exchange content identifiers. In ADAMANT Messenger, the client uploads an encrypted attachment, carries its CID inside a message, and the recipient fetches it through their node. Encryption belongs to the client protocol; the storage service handles only the bytes it receives.

## A mesh with explicit operating rules

The node is built directly with Helia and libp2p. It runs an embedded IPFS stack alongside its HTTP API, using TCP transport, Noise encryption for peer connections, and Yamux stream multiplexing.

Operators configure the peer set. Rendezvous hashing ranks holders for each CID, so nodes with the same membership derive the same placement. Age-based tiers let a deployment reduce the target number of copies as a file grows older. A resumable repair cycle checks for missing copies and attempts to restore the intended placement when content remains recoverable. This combines placement and repair with the service that receives and delivers files, eliminating the need for a separate pin-orchestration service when building around a known, mutually configured set of nodes.

![ADAMANT IPFS Node v0.1.0: A File Delivery Mesh You Can Run Yourself](/images/engineering-notes/medium/f2d20fc9af5a/002-1f2c5c003f.webp)

The v0.1.0 lifecycle at a glance: intake, deterministic placement, repair and retrieval, with storage limits and health reporting throughout.

## Finite disks deserve a real policy

Storage controls are part of the intake path. Disk reserves, aggregate request limits, file limits, and concurrent-transfer admission help the node refuse work it cannot safely accept. Optional temporary uploads can expire after a TTL; garbage collection uses watermarks and the lifecycle registry to reclaim eligible data.

Confirmed content stays protected. When confirmed files occupy available capacity, admission limits matter: bounded storage does not mean silently deleting files that the policy says must remain durable. Operators choose the retention and replication policy, provision capacity, and monitor the results. Storage behaviour can be inspected and configured, including what happens when a deployment runs short of space.

## Reliability beyond an open connection

The release includes fixes for a subtle mesh failure: a TCP connection can remain present while application streams stop working. Earlier peering logic could see a connected peer and leave a stalled session untouched. PR #40 adds liveness checks and reactive session recovery. PR #42 strengthens that path further: concurrent recovery operations are coalesced, failed streams can trigger a reset without being vetoed by a successful ping, and placement can retry once on a fresh connection.

Health reporting follows the same principle. `GET /api/node/health` exposes states of starting, ready, stale, or degraded, together with a persisted checkpoint height and membership information. The height advances when required checks pass and freezes when they fail; heights are comparable only within the same membership version. Operators should read that state, not just rely on HTTP 200. Optional repair-backlog grace can tolerate a configured number of unsuccessful repair cycles, while the backlog and cycle results remain visible to monitoring. The default grants no grace.

## Desktop and Tor client integration

v0.1.0 includes CORS work allowing operators to explicitly permit the desktop `app://.` origin and appropriate onion origins, including the opaque null origin some Tor Browser requests send. Upload and admission failures now include stable machine-readable error codes, letting clients distinguish rate limiting, concurrency limits, insufficient storage, replication-quorum failures, and timeouts without parsing prose. CORS remains a browser compatibility control; deployments still need the authorization and exposure policy appropriate to their application.

## Deployment

The public container is available for linux/amd64 and linux/arm64:

```
docker pull ghcr.io/adamant-im/ipfs-node:0.1.0
```

The image runs as an unprivileged user and carries an SBOM and build-provenance attestation. Configuration is mounted separately at `/app/config.json5`. A single `/data` volume holds the blockstore, datastore, peer identity, pin set, lifecycle registry, repair cursor, and health checkpoint, keeping persistent state together across container replacement. The release pipeline re-pulls and smoke-tests both architectures, exercising startup, readiness, upload and download, clean shutdown, and preservation of content and peer identity across replacement.

For evaluation, start with `docker/config.example.json5`, which joins no network. The production template contains ADAMANT's peer list; your own deployment should define its own peers and browser origins. Keep the HTTP service behind a correctly configured HTTPS reverse proxy.

## Architectural boundaries

The configured topology avoids public DHT announcements and public gateway routing, reducing public exposure of content-routing metadata. It does not make a deployment anonymous or confidential by itself. The service does not encrypt stored files; uploads and downloads are unauthenticated by design. Applications requiring confidentiality or authenticated access must supply those controls above the storage layer.

There is no public IPFS interoperability, IPNS, public gateway, or Kubo-compatible API in this release. Content stored here is not announced to the public network, and content held only by public peers cannot be retrieved through this node. Uploader-signed deletion, dynamic peer discovery, and traffic accounting remain open work.

For a known peer set and content-addressed application delivery, these choices form a focused operating model. For public IPFS participation, a dynamic fleet, or S3-style identity and access controls, consult the comparison guide before choosing a storage architecture.
