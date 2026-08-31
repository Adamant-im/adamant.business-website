---
title: "ETH-transactions-storage: Optional Address Filter, Lighter Indexes, and a Safer Public API"
slug: "discussion-76-eth-transactions-storage-optional-address-filter-lighter-indexes-and-a-safer-public-api-10716438"
description: "ETH transactions storage is a self hosted Ethereum indexer that follows an Ethereum node, stores native ETH and ERC 20 transfer(address,uint256) activity in PostgreSQL, and expo…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/76"
publishedAt: "2026-08-30T20:51:54Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10716438"
locale: "en"
placeholder: false
---

[ETH-transactions-storage](https://github.com/Adamant-im/ETH-transactions-storage) is a self-hosted Ethereum indexer that follows an Ethereum node, stores native ETH and ERC-20 `transfer(address,uint256)` activity in PostgreSQL, and exposes it as a read-only REST API through PostgREST. Because Ethereum nodes cannot answer address-history queries directly, wallets, dapps, treasuries, and operators typically depend on a third-party explorer. This project is the alternative you run yourself — no API key vendor, no tracking, no telemetry.

The `dev` branch now includes an **optional address filter**, merged in [PR #29](https://github.com/Adamant-im/ETH-transactions-storage/pull/29). Full-chain indexing remains the default and is what ADAMANT wallets use. Filtered mode targets operators who only need a known set of addresses and do not want to store the rest of the chain.

## Why the filter exists

A public Ethereum indexer is a large database. On a one-year mainnet dataset of roughly 490M rows, the legacy full index set consumed hundreds of gigabytes. Many operators do not need that scale — a wallet or custodial backend serving only its own users, a project treasury watching a handful of operational addresses, a self-hosted explorer for an app-specific address set, or a lab and CI environment that should stay small all benefit from selective storage. The filter preserves the existing API contract: clients still query `/ethtxs`, `/max_block`, and `/aval`. Operators change what is stored, not how it is read.

## Address filter behavior

The filter is disabled by default (`ADDRESS_FILTER_ENABLED=false`). Enabling it points `ADDRESS_FILTER_FILE` at a private list (default `filter/addresses.txt`, gitignored and not copied into the Docker image). The list accepts one `0x`-prefixed 40-hex-character address per line, with blank lines and `#` comments ignored, and matching is case-insensitive. Native transfers match `txfrom` or `txto`. Supported ERC-20 `transfer(address,uint256)` calls match the sender (`txfrom`), the token contract (`txto`), and the ABI-encoded recipient (`contract_to`).

The list reloads before every synchronization pass, so valid additions and removals take effect without restarting the indexer. Invalid, empty, or missing lists fail closed: indexing stops until the file is corrected rather than silently storing everything. The receipt RPC is skipped for transactions the filter rejects.

Existing indexer limits remain unchanged: the filter does not capture internal ETH transfers, ERC-20 flows that are not a direct `transfer(address,uint256)` (such as `transferFrom`, routers, multisigs, or batch/aggregator calls), or automatic historical backfill when an address is added. Enabling the filter does not delete already stored rows. Rebuild is a manual operator step: stop the indexer, truncate both `ethtxs` and `sync_state` in one transaction (or rewind both to block `N`), set `START_BLOCK`, and restart. Truncating only `ethtxs` will not rescan because the checkpoint still reports the chain as done.

## Durable sync progress

Filtered and empty blocks previously looked like “nothing happened,” so the indexer could rescan them. The `dev` branch now keeps a single-row `public.sync_state` checkpoint, updated in the same PostgreSQL transaction as the inserts for that block. The `/max_block` endpoint still returns `{ max, version }`, where `max` is `GREATEST(MAX(ethtxs.block), sync_state.last_block)`. Startup still rewinds the last processed block, now atomically with the checkpoint. The `create_tables.sql` script is idempotent: it creates `sync_state`, initializes it from the existing highest transaction block, and grants DML to `api_user` and `app_user` when those roles exist. The `web_anon` role cannot read or write `sync_state` directly.

## Indexes, API hardening, and operations

The address filter builds on other `dev` work from [PR #28](https://github.com/Adamant-im/ETH-transactions-storage/pull/28), not yet a GitHub Release (latest tag remains [v2.4.1](https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.4.1)). A minimal five-index set covers ADAMANT Web and iOS query shapes, saving roughly 90–110 GB per one-year dataset compared with the legacy eight-index set. The PostgREST anonymous role `web_anon` is now `SELECT`-only on `ethtxs`, `aval`, and `max_block`, and `db-max-rows = 10000` caps serialized result size so an unbounded `GET /ethtxs` cannot OOM the API.

Public deployments gain nginx guards: a method allow-list (`GET`/`HEAD`/`OPTIONS`), a requirement for `txfrom` or `txto` on `/ethtxs`, and rejection of `Prefer: count=exact` and huge offsets. The `.env` workflow is now documented with a template, secrets stay out of Git, and Compose no longer ships a hardcoded database password. DB diagnostics are safer — connection URIs work correctly and passwords are redacted from logs. An `AGENTS.md` file defines the contributor and operator contract for the repository.

Existing systemd hosts should keep their current unit during the code and schema upgrade. Apply `create_tables.sql` with `ON_ERROR_STOP` before starting the new indexer, and do not copy the repository `ethsync.service` until a production `.env` with equivalent values exists.

## Who this is for

ADAMANT uses this indexer so [adamant-im](https://github.com/Adamant-im/adamant-im) and [adamant-iOS](https://github.com/Adamant-im/adamant-iOS) can show Ethereum and ERC-20 history without a centralized explorer. The same binary is a general-purpose open-source service for wallets, payment processors, token issuers, and anyone who wants address-indexed Ethereum history under their own PostgreSQL and access policy. Self-host it, keep full-chain mode for a public API, or enable the filter and store only the addresses you actually serve.
