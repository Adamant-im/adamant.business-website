---
title: "ADAMANT Notification Service v0.5.0 — .NET 8 Modernization, Reliability and Privacy Fixes"
slug: "discussion-73-adamant-notification-service-v0-5-0-net-8-modernization-reliability-and-privacy-fixes-10570181"
description: "ADAMANT Notification Service (ANS) delivers Apple Push Notifications for the ADAMANT iOS app without ANS or Apple ever learning who is messaging whom. Version v0.5.0 is its firs…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/73"
publishedAt: "2026-08-07T14:06:51Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10570181"
locale: "en"
placeholder: false
---

[ADAMANT Notification Service (ANS)](https://github.com/Adamant-im/adamant-notificationService) delivers Apple Push Notifications for the ADAMANT iOS app without ANS or Apple ever learning who is messaging whom. Version [v0.5.0](https://github.com/Adamant-im/adamant-notificationService/releases/tag/v0.5.0) is its first tagged release since 0.4.1 in 2019.

This was not a rewrite. ANS is planned to be succeeded by [adamant-ns](https://github.com/Adamant-im/adamant-ns) eventually, so the goal was narrow: move off end-of-life dependencies and fix the bugs causing production incidents, without touching the architecture or the privacy model.

## Runtime

The service moved from `netcoreapp3.0` (EOL, unsupported since 2020) to **.NET 8 LTS** across every project. This unblocks native Ubuntu 22.04+ deployment without relying on EOL-library containers to keep the old runtime alive.

## Socket leak

The API client allocated a new `HttpClient` per request and never disposed it. In production this showed up as a steady climb of sockets stuck in `CLOSE-WAIT` — confirmed at roughly 30+ file descriptors per minute on a running instance. Past a point, that takes out DNS resolution for the whole process. It is now a single shared, reused client.

## Failover

Node selection previously picked one random configured node and never retried. Any error on that node, including a transient one, crashed the whole service. It now retries against a different node before giving up, and a total outage across every configured node degrades to "skip this cycle" rather than crashing.

## EF Core provider swap

The plan was to leave EF Core alone and only raise the app's target framework. That held for the ORM core — EF Core 2.2 targets `netstandard2.0`, so it still compiles against .NET 8 — but the MySQL provider (`MySql.Data.EntityFrameworkCore`) turned out not to run at all: an `AmbiguousMatchException` on the very first query, caught by a new SQLite-backed smoke test before it reached production. It was replaced with `Pomelo.EntityFrameworkCore.MySql`, the actively maintained provider most of the .NET ecosystem has standardized on.

## Privacy fixes

Three log statements were quietly printing sensitive data: a device token on every successful push, a *decrypted* signal payload (which embeds the device token) on a parse failure, and an APNs certificate password on a load failure. All three violated the project's own stated privacy rules and have been removed.

## Other production fixes

After the above landed, additional issues were found and fixed in running production: a `~` path-expansion bug that could stop both workers from starting on a headless server, a startup edge case that could burst-notify every registered device about old transactions after a network hiccup, a thread-safety issue in node selection under concurrent use, a missing HTTP timeout, and a null reference on a particular malformed APNs response.

## Graceful shutdown

Neither worker previously observed `SIGTERM`, so a routine `docker stop` or `systemctl restart` always looked like a crash in the logs. They now shut down cleanly.

## Tests and version tracking

Test coverage grew from a handful to 35 tests, including the EF Core/SQLite smoke test mentioned above. Builds also carry a real version number now — previously every build silently shipped as `1.0.0.0` regardless of what the project file claimed.

## Security

Security audited by [cryptofoundry](https://adamant.business#contact).

## Links

- [Release notes](https://github.com/Adamant-im/adamant-notificationService/releases/tag/v0.5.0)
- [Full diff, 0.4.1 → v0.5.0](https://github.com/Adamant-im/adamant-notificationService/compare/0.4.1...v0.5.0)
- [Tracking issue](https://github.com/Adamant-im/adamant-notificationService/issues/12)
- [Repository](https://github.com/Adamant-im/adamant-notificationService)
