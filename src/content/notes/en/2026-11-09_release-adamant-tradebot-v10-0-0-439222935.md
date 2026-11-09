---
title: "ADAMANT Tradebot v10.0.0"
slug: "release-adamant-tradebot-v10-0-0-439222935"
description: "ADAMANT Market Making Software v10.0.0 is a major milestone release bringing architectural reorganization, exclusive iteration safety, enterprise log management, role based WebU…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v10.0.0"
publishedAt: "2026-11-09T14:19:19Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-tradebot"
tag: "v10.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:439222935"
locale: "en"
placeholder: false
---

ADAMANT Market-Making Software v10.0.0 is a major milestone release bringing architectural reorganization, exclusive iteration safety, enterprise log management, role-based WebUI management APIs, a rewritten Azbit connector, npm Trusted Publishing via OIDC, and cryptographic build provenance for Docker containers.

## Install

bash
# Via npm
npm install -g adamant-tradebot
mm init
mm doctor
mm on

# Via Docker / GHCR
docker pull ghcr.io/adamant-im/adamant-tradebot:10.0.0
docker run -d --name adamant-tradebot ghcr.io/adamant-im/adamant-tradebot:10.0.0
```

## Supply Chain Security & Trusted Publishing

The npm publishing workflow migrated to OIDC Trusted Publishing without persistent repository secrets (`NPM_TOKEN`), with verified provenance enabled via `publishConfig.provenance: true`, closing issue #119. GHCR build provenance attestation was integrated using `actions/attest-build-provenance@v2` with Sigstore signing for verifiable container builds on GitHub Packages. Manual verification triggers were added to CI/CD publishing workflows via `workflow_dispatch`.

## Architecture & Runtime Reliability

The module structure was reorganized into a clear separation: `trade/features/` for market-making modules, `trade/trader/` for exchange connectors, and `trade/settings/` for dynamic parameter files. Exclusive iteration locking was introduced through `helpers/moduleIteration.js` (`runExclusiveIteration`) to prevent concurrent overlapping iterations and guarantee reliable rescheduling from `finally` blocks.

Enterprise log rotation and a fast log reader were completely rewritten in `helpers/logRotation.js` and `helpers/logReader.js`, supporting active and archive lifecycles, structured reverse reading, and paginated log retrieval. Runtime health evaluation was added via `helpers/mmHealthEval.js`, `helpers/mmHealthState.js`, and `helpers/mmRuntimeHealth.js` for real-time market-making state monitoring. Command initiator tracking is now provided by `helpers/commandInitiator.js`, giving consistent contextual tracking across Messenger, WebUI API, and CLI invocations.

## Exchange Connectors

The Azbit connector underwent a complete rewrite of `trade/trader/trader_azbit.js` and `trade/api/azbit_api.js`, supporting REST API v1 and v2, strict order precision, rate limiting, and 137 unit tests with comprehensive API mocks. Connector precision and safety were standardized across Coinstore, FameEXnet, NonKYC, P2PB2B, and StakeCube, including unified error handling, precision truncation, and balance pre-validation.

## WebUI REST & WebSocket API

Role-based access control was introduced with support for `admin`, `manager`, and `viewer` (read-only) roles, featuring strict JWT validation, TTL enforcement, and IP access filtering. Full bot management endpoints were added for dynamic parameter tuning (`PUT /api/v1/params`, `PUT /api/v1/params/strategy`), bot lifecycle, orders, and log queries. WebSocket streaming enables real-time event subscription for bot status, trade logs, and market ticker updates.

## Quality Assurance & Developer Tooling

Test coverage now spans 576 automated tests across 33 test suites covering general, API WebUI, features, trader, helpers, and market-making modules. AI agent guidelines were added in `AGENTS.md` for AI-assisted development adhering to safety invariants, directory layout, and testing protocols. Type safety was improved with JSDoc `@typedef` definitions and TypeScript checking via `npm run typecheck:webui-api`.

### Breaking changes

This release requires Node.js version 22.12.0 or higher. The internal directory layout changed, with feature modules and connectors moved into `trade/features/` and `trade/trader/`; custom extensions importing internal paths should update accordingly. The WebUI API now enforces strict JWT expiration and role authorization across all private endpoints.
