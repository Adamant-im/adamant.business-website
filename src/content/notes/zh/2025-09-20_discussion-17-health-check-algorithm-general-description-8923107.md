---
title: "ADAMANT 节点与服务的健康检查算法"
slug: "discussion-17-health-check-algorithm-general-description-8923107"
description: "健康检查算法旨在使 ADAMANT 成为最可靠的加密钱包。适用于所有节点（包括 ADM 和币种节点）以及 info-service、IPFS 等服务。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/17"
publishedAt: "2025-09-20T15:11:05Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923107"
locale: "zh"
placeholder: false
---

健康检查算法旨在使 ADAMANT 成为最可靠的加密钱包。它适用于所有节点，包括 ADM 和币种节点，以及 `info-service` 和 IPFS 等服务。该算法评估节点高度、最低支持版本，并使用最有效的可用端点，例如 ADM 的 `/api/node/status`。它会跳过用户禁用的节点，并将节点列表本地存储，独立于“保持登录”设置。

节点状态包括：用户禁用、不支持（由于版本或通过 PWA-HTTPS 的 HTTP 节点）和不可用。如果节点不可用，算法会先检查域名，域名失败后再尝试 `alt_ip`。一旦域名可用，`alt_ip` 将不再被检查，以避免额外请求。如果两者均不可用，算法将在下一次请求时重试。

可用性和同步状态的检测依赖于节点高度阈值（`HEIGHT_EPSILON`）。唯一响应的节点被标记为可用。在阈值范围内的多个节点被标记为活跃（Active），而超出阈值的节点则为已同步（或称“作弊者”，In-sync）。不同币种的阈值不同：ADM 为 10，BTC 为 2，ETH 为 5，DOGE 为 3，DASH 为 3，LSK 为 5。例如，高度为 815,000 和 815,001 的 BTC 节点均为活跃状态，而高度为 815,010 的节点则为已同步状态。

在初始健康检查或连接中断后恢复时，首个节点响应可能被标记为活跃而非已同步。若等待完整的 10 秒检查将导致应用冻结。为解决此问题，状态仅在 30% 的节点响应后才更新为活跃或已同步；否则保留之前的状态。此阶段标记为初始检查（Initial check）。对于后续检查，仅当 100% 节点响应后才更新状态，以防止携带旧数据的待定节点被误标为已同步。

为避免用户困惑，对于状态为未定义（Undefined）或不可用（Unavailable）的节点，在初始检查进行中时会显示“更新中…”的视觉提示。该提示表现为灰色圆点和弱化文字。

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8923107/001-bfb8d9fa.webp)

每次健康检查请求都会测量 Ping，延迟最小的节点即为最快节点。"优先选择最快节点"设置对 ADM 默认为否，对币种节点默认为是，并分别作用于币种节点和索引器。

健康检查独立于系统报告的互联网连接状态运行，因为操作系统报告的“无网络连接”并不可靠。若无网络连接，结果将仅仅是无可用节点。`hasEnabledNodes` 和 `hasAvailableNodes` 状态在至少三个节点响应或一次检查完成后更新，从而避免 10 秒冻结，改善启动体验。检查重叠已被防止；此前因使用 `setInterval()` 而非 `setTimeout()` 导致从后台恢复应用时引发请求风暴的 bug 已修复。

健康检查在应用启动、连接恢复、打开节点界面或节点列表更新时触发。常规检查间隔（`normalUpdateInterval`）根据节点类型不同，范围为 3 到 8 分钟。若所有活跃节点均失败，则会额外执行一次健康检查。

发送 HTTP 请求时，算法忽略“无网络连接”状态，且不等待完整健康检查完成。它会选择最快或一个随机的活跃节点。若请求因超时失败，则尝试下一个节点，并将失败节点标记为不可用。HTTP 错误如 404 不被视为失败。所有待处理请求在连接恢复后始终完成，确保保存联系人列表等操作不会中断。
