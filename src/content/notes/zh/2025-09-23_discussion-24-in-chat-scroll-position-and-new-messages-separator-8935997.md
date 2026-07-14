---
title: "聊天窗口中的滚动位置与新消息分隔符"
slug: "discussion-24-in-chat-scroll-position-and-new-messages-separator-8935997"
description: "本文档描述用户进入或操作ADAMANT聊天时，聊天窗口滚动位置应有的行为。包含两种滚动状态，位置存储与恢复规则。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/24"
publishedAt: "2025-09-23T07:35:30Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8935997"
locale: "zh"
placeholder: false
---

本文档描述用户进入或操作 ADAMANT 聊天时，聊天窗口滚动位置应有的行为。

## 两种滚动状态

每个聊天的滚动位置是单独存储的。一个聊天要么处于未存储位置的状态，要么处于已保存位置的状态——后者是因为用户曾手动滚动并保存了滚动位置。

## 显示“滚动到底部”按钮

当屏幕上约四分之三区域遮挡了最后一条单行消息时，应显示 **滚动到底部** 按钮。

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8935997/001-d6f70e7f.webp)

当用户点击该按钮时，其行为取决于是否存在新消息。如果存在新消息（按钮附近会显示计数），视图应滚动至 **新消息** 分隔符处。如果没有新消息，或用户已经位于分隔符处或其下方，则视图应滚动到底部。

滚动至“新消息”分隔符时，分隔符上方应保留大约三行消息的空间。此时不应触发声音、振动或消息高亮。

分隔符绝不能出现在聊天中的第一条消息之前。例如，如果用户从新联系人处收到十条消息，聊天应滚动至第一条消息，但不显示分隔符。

## 保存滚动位置

仅当用户未处于聊天最底部时，才应保存滚动位置。距离底部几个像素以内的位置视为“在最底部”，不应保存。经验法则是：如果 **滚动到底部** 按钮可见，则应保存当前位置。

![Discussion screenshot 2](/images/engineering-notes/github/discussions/8935997/002-60f2788b.webp)

![Discussion screenshot 3](/images/engineering-notes/github/discussions/8935997/003-4e8be668.webp)

![Discussion screenshot 4](/images/engineering-notes/github/discussions/8935997/004-70d36182.webp)

如果聊天内容总高度小于屏幕高度（例如只有几条短消息），则始终视为处于最底部：按钮隐藏，且不保存滚动位置。

## 恢复滚动位置

需要处理三种事件。第一，用户已在聊天界面内，此时有新消息到达。第二，用户从聊天列表或其他界面（例如从 **交易记录 → 交易详情** 中的“前往聊天”）打开一个包含新消息的聊天。第三，用户通过新消息通知（无论是应用内通知还是推送通知）进入聊天。

当用户已在聊天界面内且收到新消息时，行为取决于是否已保存滚动位置。若未保存位置，则每收到一条新的发送或接收消息时，聊天都会自动滚动到底部，且不显示分隔符。若已保存位置，则收到消息时不会触发自动滚动；而是更新按钮上的计数并显示分隔符，用户可通过点击按钮或手动滚动来查看。然而，发送消息时，无论是否保存了位置，始终会自动滚动到底部。

当用户从聊天列表或其他界面进入一个包含新消息的聊天，且未保存位置时，聊天应直接跳转至“新消息”分隔符处。如果已保存位置，则聊天不滚动；按钮上的计数更新并显示分隔符，用户在点击 **滚动到底部** 按钮或手动滚动时才会看到分隔符。

当用户通过新消息通知进入聊天时，无论是否保存了滚动位置，聊天都应跳转至“新消息”分隔符处。即使收到了多条消息，视图也不应直接跳转到最后一条最新消息。

这些规则确保了在 ADAMANT 所有聊天入口点中，滚动行为、分隔符显示和位置恢复的一致性与可预测性。
