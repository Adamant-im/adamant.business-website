---
title: "ETH Transactions Storage v2.5.0"
slug: "release-eth-transactions-storage-v2-5-0-382952479"
description: "ETH Transactions Storage v2.5.0 turns the project into a documented, distributable self hosted Ethereum transaction indexer and REST API backend for wallets, explorers, accounti…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.5.0"
publishedAt: "2026-09-04T18:56:20Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "ETH-transactions-storage"
tag: "v2.5.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:382952479"
locale: "en"
placeholder: false
---

ETH Transactions Storage v2.5.0 turns the project into a documented, distributable self-hosted Ethereum transaction indexer and REST API backend for wallets, explorers, accounting and treasury tools, monitoring services, and custom applications. It keeps the existing PostgREST API contract used in production by ADAMANT clients.

This release adds reliable per-block transactions and checkpoints, startup recovery, database rollback and retry behavior, and progress through empty or filtered blocks. Optional address-based indexing is now available with validation, sender, native-recipient, and token-recipient matching, live list reloads, and fail-closed behavior. The recommended database index set is reduced to five indexes, with the three previous indexes available separately for custom query shapes; the smaller set saves an estimated 90–110 GB on approximately 490 million rows. An additive `sync_state` schema, read-only `web_anon` access, a 10,000-row PostgREST response cap, and guidance for protecting public API deployments have been added. PostgreSQL connection URI support with credential redaction, `.env` loading, constrained Python dependencies, updated diagnostics, and a revised systemd unit are included. A Python 3.11 container, a published-image Compose setup, a separate local-build override, OCI metadata, and release-driven multi-architecture GHCR publication have been added. The VitePress documentation site is available at <https://eth-indexer.docs.adamant.im>, with reproducible Node tooling, documentation CI, Pages deployment, and contributor guidance. The project is repositioned for any compatible consumer while preserving ADAMANT ownership, provenance, and production compatibility evidence.

## Upgrade requirements

Stop the existing indexer and update the complete checkout before upgrading. Apply the new schema as a PostgreSQL administrator before starting v2.5.0:

```bash
sudo -u postgres psql -v ON_ERROR_STOP=1 -d index < create_tables.sql
```

Then install the declared Python dependencies for manual or systemd deployments:

```bash
pip3 install -r requirements.txt
```

Preserve all production environment values and credentials; the repository systemd template now requires a valid `.env`. Set `POSTGRES_PASSWORD` before using Docker Compose. Migrate existing PostgreSQL 12 data correctly before adopting the Compose PostgreSQL 14 image; changing the image tag alone is not an upgrade. Create and verify the recommended index set before removing legacy indexes; use concurrent index operations on a live database. Apply `create_tables.sql` before changing PostgREST to `web_anon`, or anonymous API requests will fail. Plan filtered history explicitly: enabling the address filter or adding an address does not backfill earlier blocks.

See the complete upgrade guide at <https://eth-indexer.docs.adamant.im/guide/upgrading> before deploying this version.

## Compatibility and current scope

The `/ethtxs`, `/max_block`, and `/aval` endpoints, database columns, case-insensitive address handling, value encodings, and established client query shapes remain compatible. `/max_block.max` now also reflects processed blocks that stored no transaction rows.

The indexer continues to store native ETH transfers and direct top-level ERC-20 `transfer(address,uint256)` calls. It does not index internal ETH transfers, `transferFrom`, multisig, router, or batch flows, other token standards, or automatic deep-reorganization corrections.

## Distribution

Publishing this stable release triggers images for `linux/amd64` and `linux/arm64`:

```text
ghcr.io/adamant-im/eth-transactions-storage:2.5.0
ghcr.io/adamant-im/eth-transactions-storage:latest
```

Version image tags are immutable. Pin `2.5.0` rather than `latest` in production.

## Verification

All 12 Python unit tests passed. Python syntax, formatting, Markdown linting, and the VitePress build passed. Container build, operator-state exclusion, OCI metadata, both Compose configurations, API progress, and checkpoint restart smoke tests passed on the release merge commit. The documentation deployment passed and the site is served over enforced HTTPS. The production service has been deployed and confirmed healthy by its operator.

Included work: #27, #28, #29, #31, and #33. Tracking issue: #32. Full changelog: <https://github.com/Adamant-im/ETH-transactions-storage/compare/v2.4.1...v2.5.0>.

### Breaking changes

The new `sync_state` schema must be applied via `create_tables.sql` before starting v2.5.0, and it must be applied before switching PostgREST to `web_anon` or anonymous API requests will fail. The systemd template now requires a valid `.env` file, so existing deployments without one will not start until it is created. Enabling the address filter or adding an address does not backfill earlier blocks, meaning previously unindexed history will not be retroactively captured without explicit operator action.
