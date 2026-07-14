---
title: "健康检查：通用更新旋转图标"
slug: "discussion-20-health-check-general-updating-spinner-8923249"
description: "ADAMANT 头部缺少加载旋转图标意味着用户看到的是最新的聊天和消息列表。当无网络连接、无活跃ADM节点或未启用ADM节点时，应显示旋转图标。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/20"
publishedAt: "2025-09-20T16:33:48Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923249"
locale: "zh"
placeholder: false
---

![讨论截图 1](/images/engineering-notes/github/discussions/8923249/001-fda0855b.webp)

ADAMANT 头部缺少加载旋转图标意味着用户看到的是最新的聊天和消息列表。当无网络连接、无活跃 ADM 节点或未启用 ADM 节点时，应显示旋转图标。

当存在连接和活跃节点时，系统会进一步检查。在接收到新消息（即没有更新的消息）后，系统会在 store 中保存一个时间戳 `chatActualUntil`。

```javascript
const chatsActualUntil = adamant.toTimestamp(nodeTimestamp) + INTERVAL + CHAT_ACTUALITY_BUFFER_MS
```

`INTERVAL` 表示通过 REST 轮询新聊天的间隔，其值取决于是否可用 socket 连接。

```javascript
INTERVAL: (state, getters, rootState) => {
  return rootState.options.useSocketConnection ? SOCKET_ENABLED_TIMEOUT : SOCKET_DISABLED_TIMEOUT
},
```

聊天和聊天列表界面会观察 `chatActualUntil`，并订阅钩子 `chatActual = chatActualUntil > currentTime`。该钩子每 500 毫秒运行一次，即使 `chatActualUntil` 因无新消息而未变化，也能触发旋转图标。最终，当无网络、无节点在线或 `!chatActual` 为 true 时，将显示旋转图标。

当应用从后台恢复时，无需额外调整，因其仍依赖 `chatActualUntil`。如果设备时间超过聊天有效性时间戳，用户将看到旋转图标。最坏情况下，若连接丢失，用户可能不会看到旋转图标，并误以为一切仍为最新状态，最长持续时间为 `INTERVAL + CHAT_ACTUALITY_BUFFER_MS` 秒。
