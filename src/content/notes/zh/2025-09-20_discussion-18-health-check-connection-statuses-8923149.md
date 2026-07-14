---
title: "健康检查：连接状态"
slug: "discussion-18-health-check-connection-statuses-8923149"
description: "参见：健康检查：算法、通用描述。三种与收发消息相关的连接状态：无网络连接、无可用ADM节点、无启用的ADM节点。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/18"
publishedAt: "2025-09-20T15:41:29Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923149"
locale: "zh"
placeholder: false
---

参见：[健康检查：算法，通用描述](https://github.com/orgs/Adamant-im/discussions/17)

# 连接状态

存在三种与接收和发送消息相关的连接状态。

**无网络连接** 由操作系统报告（无网络、Wi-Fi等）。在健康检查中，`无活动节点` 实际上可能意味着没有网络连接。

**无活动/可用的ADM节点** 指至少启用了一个ADM节点，但没有任何节点处于 **活动** 状态。相同的逻辑适用于其他币种和服务（例如，`无活动的BTC服务`）。不支持的节点不计入统计。

**无启用的ADM节点** 指用户已禁用所有节点。此处同样不计入不支持的节点；即使存在状态为 `不支持` 的节点，状态仍为 `无启用的节点`。

# 检查优先级

检查按顺序执行：首先判断 `无网络连接`，然后是 `无活动/可用的ADM节点`，最后是 `无启用的ADM节点`。

# 特定情况

## 通用Snackbar

仅当出现 `无网络连接` 时显示通用Snackbar。该提示为持久性（持续显示，直到用户手动关闭或连接恢复），并触发提醒振动。

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8923149/001-7a3f923d.webp)

## 聊天内警告弹窗

当连接正常但无可用ADM节点，且用户至少手动禁用了一个节点时，会在聊天界面显示警告弹窗。该弹窗为持久性，并触发提醒振动。

![Discussion screenshot 2](/images/engineering-notes/github/discussions/8923149/002-7fee21d6.webp)

## 通用更新旋转图标

通用更新旋转图标（显示在页眉区域，表示数据/消息非最新）在所有连接状态下均会显示。包括代表节点页面、钱包页面以及任何节点页面。该图标为持久性，不触发振动。

![Discussion screenshot 3](/images/engineering-notes/github/discussions/8923149/003-00df57f0.webp)

参见：[健康检查：通用更新旋转图标](https://github.com/orgs/Adamant-im/discussions/20)

## 数据加载旋转图标

数据加载旋转图标覆盖聊天列表加载、特定聊天加载以及ADM交易列表加载。在所有连接状态下，当用户发起请求时显示——例如，用户进入ADM交易列表页面、滚动聊天列表以加载新聊天、进入应用尚未加载的特定聊天、在特定聊天内滚动，或进入投票给代表页面。旋转图标持续显示，直到数据更新完成。该图标为持久性，不触发振动。

## 发送新消息或文件

该行为在所有连接状态下一致。若无连接，消息将在聊天中显示为 `待处理` 状态。`待处理` 状态根据 [消息发送超时](https://github.com/Adamant-im/adamant-wallets/pull/95) 中定义的超时时间转为 `失败`。设置了两个超时时间：一个用于发送普通消息，另一个用于发送带附件的消息。附件超时指发送已上传文件的ADM消息，不包括文件上传本身。

## 在聊天中发送ADM或其他加密货币

这也适用于直接发送ADM币。在所有连接状态下，发送操作被禁止，并显示临时Snackbar及警告振动。对于直接发送非ADM币（账户 → 币种 → 发送），不检查ADM节点可用性。

![Discussion screenshot 4](/images/engineering-notes/github/discussions/8923149/004-e59de24d.webp)

## 开始新聊天

该行为在所有连接状态下一致。应用会在本地验证ADM地址是否可能正确，立即打开新聊天且不发起请求，并显示欢迎的特殊聊天内消息。若公钥已在本地存在，则不显示额外消息。若需从节点请求公钥，则会显示带旋转图标的额外聊天内消息。

![Discussion screenshot 5](/images/engineering-notes/github/discussions/8923149/005-ea0f770b.webp)

对于 `无启用的ADM节点` 情况，还会显示额外的聊天内警告弹窗。

## 连接恢复时

连接恢复后，待处理请求将完成——例如，待发送消息被发出，旋转图标被更新。

## 使用助记词登录

对于 `无网络连接` 和 `无活动/可用的ADM节点`，用户停留在登录界面，并显示Snackbar或弹窗。对于 `无启用的ADM节点`，用户将被引导至ADM节点页面，并显示Snackbar或弹窗。Snackbar为临时性，并触发警告振动。

![Discussion screenshot 6](/images/engineering-notes/github/discussions/8923149/006-b36dd2ac.webp)

## 使用密码/生物识别登录

该行为在所有连接状态下一致。用户正常登录，无延迟或请求，聊天标签页打开。显示本地存储的消息和聊天。通用更新旋转图标表示数据非最新，并显示“无连接”Snackbar。
