---
title: "ADAMANT Messenger v4.12.1: Strict CSP, deterministic indexer pagination, RTL UI, and verifiable builds"
slug: "discussion-83-adamant-messenger-v4-12-1-strict-csp-deterministic-indexer-pagination-8-language-rtl-ui-an-11310133"
description: "ADAMANT Messenger PWA v4.12.1 ships from master (074db965) on top of v4.12.0 (dfe094d3), spanning 69 commits, 12 merged pull requests, and 14 closed milestone issues. Rather tha…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/83"
publishedAt: "2026-11-14T17:50:00Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Messenger apps"
cardSpan: "half"
originalId: "github-discussion:11310133"
locale: "en"
placeholder: false
---

ADAMANT Messenger PWA `v4.12.1` ships from `master` (`074db965`) on top of `v4.12.0` (`dfe094d3`), spanning 69 commits, 12 merged pull requests, and 14 closed milestone issues. Rather than adding surface features alone, this release focuses on verifiable transport and runtime hardening, deterministic node and indexer pagination under decentralized multi-operator infrastructure, full eight-language parity with Arabic RTL support, and transparent build provenance across web, desktop, and Android targets.

## Strict CSP, eval-free Web3 validation, and shared security headers

A unified security header contract (`PWA_SECURITY_HEADERS` in `vite-config/plugins/cspHardeningPlugin.ts`) now defines the single source of truth enforced across builds — `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, and `X-XSS-Protection: 0` — mirrored by `vercel.json` catch-all headers and nginx configuration files. Web3 ABI and validation switches to Zod 4 with `config({ jitless: true })` for `web3-validator` and `abitype` for `web3-eth-abi`, removing compiler entry points while the CSP hardening plugin expands the production bundle gate against runtime `eval` and `Function` aliases.

Supply-chain hardening includes `.npmrc` with a seven-day minimum release age, a dependency release-age check script, Dependabot cooldowns, Electron production pruning, and Playwright credential and artifact exclusions. Live deployment verification probes (`cspDeployments.env.spec.ts`, `tests/e2e/production-csp.live.spec.ts`) validate header presence and login-screen script enforcement with zero CSP violations across production, dev, GitHub Pages, and Surge deployments.

## Node floors, bounded PostgREST queries, and single-node pagination affinity

The minimum ADM API version rises to `0.10.0` across mainnet, testnet, and Tor. IPFS node minimum version is now explicitly read from `ipfsService.minVersion` (`0.1.0`) rather than falling back to the general services floor. Relocated node fallback IPs are synced via the `adamant-wallets` registry.

Real-time direct ADM transfers are improved: the schema replaces `withoutDirectTransfers` with integer enums, WebSocket connections establish immediately on unlock subscribing to chat transaction types `[0, 8]`, and transfer status stays synced across chat preview, transaction list, and transfer card components.

ETH indexer queries through `EthIndexerClient.ts` now enforce a `limit` on every `/ethtxs` request (defaulting to 25), split native ETH lookups into two bounded indexed queries merged and deduplicated client-side by `txhash`, and introduce `getTimestampGroup` for equal-timestamp boundary resolution. Cross-chain pagination guards for BTC, DOGE, and DASH keep active pagination pinned to a single indexer instead of fanning an address across operators. The persisted module state strips cached transactions and resets pagination session cursors on save, preventing stale cursor drift.

![ADM and IPFS node version floors alongside Settings actions on mobile](/images/engineering-notes/github/discussions/11310133/001-bcf4ca3db8.webp)

*ADM nodes below `0.10.0` and plain HTTP endpoints flagged as unsupported; IPFS nodes verified against `ipfsNode.minVersion` (`0.1.0`).*

![Desktop split-pane chat with synced ADM transfer status and plaintext XSS sanitization](/images/engineering-notes/github/discussions/11310133/002-4dc1da2b89.webp)

*Chat preview spacing and delivery ticks synced with type-0 ADM transfers; unsanitized-payload previews safely rendered as inert text.*

![Desktop ADM wallet transaction list](/images/engineering-notes/github/discussions/11310133/003-a42684a993.webp)

*Live mainnet transaction feed paired with the single-node pagination architecture across ADM, ETH/ERC-20, BTC, and DOGE.*

## Build identity, HTTP IPFS multihash fallback, and isolated network configs

A build info plugin (`virtual:adamant-build-info`) exposes sanitized `version`, `branch`, `commit`, `prNumber`, `author`, `buildDate`, and `isTestnet` in a build dialog, together with a Force refresh Service Worker action that clears CacheStorage while preserving user credentials and encrypted IndexedDB state. Testnet builds display explicit `TESTNET` badges.

For plain HTTP contexts such as `.onion` mirrors where `crypto.subtle` is unavailable, the IPFS attachment fallback uses `@noble/hashes` SHA-256 multihash derivation. Network configurations are unified into `src/config/mainnet.json` exposed through a virtual module, so unsupported Vite modes or cross-network config leakage fail at build time.

![BuildInfoDialog with Force Refresh, 8-language selector, and Testnet login indicator](/images/engineering-notes/github/discussions/11310133/004-4f8da5e80c.webp)

*Login build dialog with Force refresh, full 8-language dropdown, and distinct TESTNET markers on testnet deployments.*

## Eight-language parity and full Arabic RTL support

This release adds Spanish, French, Japanese, and Arabic translations, completes audits for German, Russian, and Simplified Chinese, and aligns all eight locale files to exact key parity (418 leaf keys per locale). The `applyLocale()` function synchronizes `vue-i18n`, `dayjs`, Vuetify locales, `dir`, and `lang`, adds accurate plural rules for Arabic, French, and Russian teen cases above 100, selects `ar-u-nu-latn` numerals for Arabic dates, and detects the initial language locally from `navigator.languages`.

Full Arabic RTL layout is enabled via Vuetify `rtl: { ar: true }`, mirrored navigation arrows through a directional icon component, CSS logical properties across views, and `dir="auto"` on user-authored messages while forcing LTR for passphrases. Regression tests (`RtlUiContract.spec.js`, `chat-rtl-layout-regression.spec.ts`) lock the layout against future breakage.

![Arabic RTL mobile views across Chats, active chat with ADM transfer, and Settings](/images/engineering-notes/github/discussions/11310133/005-94937d5ba6.webp)

*Right-aligned chat list with Latin numerals, active transfer card in RTL chat view with mirrored directional icons, and mirrored Settings hierarchy.*

![Spanish, French, and Japanese Settings screens](/images/engineering-notes/github/discussions/11310133/006-867e6e8b17.webp)

*Spanish, French, and Japanese matching all 418 UI strings on live deployment.*

## Packaging and platform notes

Android targets are upgraded to `compileSdkVersion` and `targetSdkVersion` 36, with `minSdkVersion` raised to 24 (Android 7.0+), and AGP 8.13.0, Gradle 8.14.3, and Cordova Android 14.0.1 (`versionCode` 41201).

On macOS, Apple blocked the developer account, so CI notarization is currently disabled. Desktop `.dmg` installers (x64, arm64, universal) remain Developer ID signed and installable via System Settings → Privacy & Security → Open Anyway after the first launch attempt. The iOS App Store button on adamant.im is temporarily non-clickable with a matching notice.
