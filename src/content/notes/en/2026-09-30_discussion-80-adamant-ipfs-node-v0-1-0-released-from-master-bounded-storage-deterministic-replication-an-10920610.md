---
title: "ADAMANT IPFS Node v0.1.0: Bounded Storage and Deterministic Replication"
slug: "discussion-80-adamant-ipfs-node-v0-1-0-released-from-master-bounded-storage-deterministic-replication-an-10920610"
description: "The first tagged release of ADAMANT IPFS Node is now available as v0.1.0, with the container image at ghcr.io/adamant im/ipfs node:0.1.0. This standalone Node.js and Helia appli…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/80"
publishedAt: "2026-09-30T11:31:18Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10920610"
locale: "en"
placeholder: false
---

The first tagged release of ADAMANT IPFS Node is now available as v0.1.0, with the container image at `ghcr.io/adamant-im/ipfs-node:0.1.0`. This standalone Node.js and Helia application serves as an IPFS storage node for application file delivery. It is not a Kubo wrapper and does not expose a Kubo-compatible API. While ADAMANT Messenger is the reference deployment, any application can self-host the node.

The service runtime exposes an Express API over twelve documented paths, including health, administrative details, multipart upload, download by CID, and storage metrics. Access classes are enforced centrally, the admin key fails closed, and CORS is an explicit allowlist. The storage lifecycle features a datastore-backed file registry with a durable state machine, disk reserve, intake budget, temporary uploads with TTL, and watermark-driven garbage collection. Placement uses deterministic rendezvous hashing over the configured peer set, with copy counts shrinking by file age. Replication runs over versioned protocols with prepare, commit, and rollback staging. Each upload session tracks created blocks, ensuring rejected or aborted requests remove exactly those blocks.

Health checkpoints are network-aware with persisted monotonic height and an explicit membership epoch, accepting attestations only from configured peers. Mesh reliability improvements include periodic libp2p ping liveness checks with session reset on failure and reactive recovery after stale replication stream errors. CORS and error code updates introduce an opt-in exact `app://.` desktop origin, machine-readable `code` values, and `http(s)://*.onion` wildcards limited to v3 hidden-service shapes for Tor Browser compatibility.

The container is built on `node:24.13.0-bookworm-slim` using a multi-stage Dockerfile. It runs as an unprivileged `node` user with `HOME=/data`, allowing a single volume to hold blockstore, datastore, peer identity, pins, registry, repair cursor, and health checkpoint. The image ships without configuration; operators must mount one at `/app/config.json5`. It is published for `linux/amd64` and `linux/arm64` with SBOM and provenance attestation.

The node explicitly avoids DHT, IPNS, public gateways, and Kubo APIs. Stored content is not announced to the public IPFS network, and public-network content cannot be fetched through this node. A controlled peer topology reduces public exposure of content-routing metadata but does not inherently make a deployment private, anonymous, trustless, or censorship-proof. Upload and download are unauthenticated by design, with a single administrative key as the only credential. Open work includes uploader-signed deletion, peer discovery, traffic accounting, absolute data directory, and public-network interop.

To run the node, create a data volume and start the container with the appropriate configuration and port mappings:

```bash
docker volume create ipfs-node-data

docker run -d \
  --name ipfs-node \
  --restart unless-stopped \
  --stop-timeout 20 \
  -v ipfs-node-data:/data \
  -v "$PWD/config.json5:/app/config.json5:ro" \
  -p 127.0.0.1:4000:4000 \
  -p 4001:4001 \
  ghcr.io/adamant-im/ipfs-node:0.1.0
```

The release was verified through CI, security audits, and container smoke tests on both architectures. The publish workflow confirms the tag is an ancestor of `master`, matches the `package.json` version, and rebuilds with OCI labels, SBOM, and provenance before a second smoke test.
