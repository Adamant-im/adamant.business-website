---
title: "ADAMANT Bounty Bot：通过自动化加密支付开展互动活动"
slug: "adamant-s-interactive-bounty-bot-for-cryptocurrency-projects-51fec10f93b9"
description: "ADAMANT Bounty Bot 是一个开源工具，供加密货币项目通过 ADAMANT Messenger 聊天互动地运行悬赏活动和空投。它自动化任务验证和支付，无需专职悬赏管理员，消除参与者等待付款的延迟。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamants-interactive-bounty-bot-for-cryptocurrency-projects-51fec10f93b9"
publishedAt: "2020-09-11T08:11:44.041Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/51fec10f93b9/001-1-gjb4fgnplpza3buymtpy6w-png.webp"
cardSpan: "full"
originalId: "medium:51fec10f93b9"
locale: "zh"
placeholder: false
---

ADAMANT Bounty Bot 是一个开源工具，专为加密货币项目设计，可通过 ADAMANT Messenger 中的聊天功能互动地运行悬赏活动和空投。它能自动完成任务验证和支付，无需专职的悬赏管理员，并消除参与者领取奖励时的延迟。

### 为何需要专用的悬赏机器人

传统的悬赏活动依赖管理员在 Bitcointalk 等论坛上发布规则，并在活动结束后手动核对参与者是否完成任务。这种方式对用户来说不方便，对项目方而言成本高昂。ADAMANT Bounty Bot 简化了整个流程：参与者直接在聊天中与机器人互动，机器人自动验证已完成的任务，并立即以 ADM、ETH 或 ERC-20 代币发放奖励。

目前，该机器人支持 Twitter 活动（关注账号、带评论转发推文、提及好友、使用话题标签），以及 ADAMANT 推荐活动（用户邀请他人加入）。由于该机器人是开源的，贡献者可以添加对其他社交网络的支持。

### 工作原理

机器人持续在服务器上运行。安装后，您可以配置活动设置，例如参与者必须关注的 Twitter 账号、需要转发的推文，以及转发评论中必须包含的内容。机器人会跟踪用户消息，检查任务完成情况，发放奖励并累积统计数据。它还能检测重复的社交媒体账号，防止单个用户多次领取奖励。

### 系统要求

运行该机器人需要基本的 Linux 和 Node.js 技能。服务器配置要求很低——任何搭载 Ubuntu 的 VPS 均可满足（例如 Digital Ocean、Ramnode、Scaleway、Hetzner）。安装完整的 ADAMANT 节点是可选的，但如果机器具备超过 40 GB 的磁盘空间和 1 GB 的内存，建议安装以支持去中心化。您还需要为机器人准备一个 ADAMANT 钱包、用于支付的资金钱包（请注意，ERC-20 转账费用以 ETH 支付，因此机器人的 ETH 钱包也需充值）、运行 Twitter 活动所需的 Twitter API 密钥，以及在服务器上安装 MongoDB。

### 命令

机器人响应多种用户和管理员命令。用户可发送 `/help` 获取活动信息，`/rates` 查询代币市场价格，`/calc` 在不同加密货币之间进行换算。管理员可使用 `/balances` 查看机器人的钱包余额，使用 `/test` 运行诊断，例如 `/test twitterapi`。

### 安装

机器人应以 `adamant` 用户身份安装。如果您之前已安装过 ADAMANT 节点，则该用户已存在。克隆代码仓库并安装依赖项：

```bash
su - adamant
git clone https://github.com/Adamant-im/adamant-bountybot.git
cd ./adamant-bountybot
npm i
```

### 配置

使用文本编辑器打开 `config.json`。需要设置的关键参数如下所述。

**`passPhrase`** — 机器人的 ADM 账户的种子短语。请务必为机器人创建一个新账户，而不是重复使用现有账户。

```json
"passPhrase": "scatter tomato doctor also stay tell success pause gift clip hungry october",
```

**`twitter_follow`** — 参与者为获得奖励必须关注的 Twitter 账号。设置为空数组可禁用此功能。

```json
"twitter_follow": [
  "@adamant_im",
  "@BitZ_Group"
],
```

**`twitter_retweet_w_comment`** — 定义需带评论转发的推文。`min_mentions` 设置必须提及的好友数量；`hashtags` 指定必需的话题标签。设置为空数组可禁用此功能。

```json
"twitter_retweet_w_comment": [
  {
    "tweet": "https://twitter.com/adamant_im/status/1272945640574722048",
    "min_mentions": 3,
    "hashtags": [
      "#privacy",
      "#decentralization"
    ]
  }
],
```

**`adamant_campaign`** — 设置参与者需邀请到 ADAMANT 的新用户数量（`min_contacts`）。只有当被邀请用户的第一条消息不超过三天且发送给了活动参与者时，才算有效。设置为 `0` 可禁用此功能。

```json
"adamant_campaign": {
  "min_contacts": 3
},
```

**`rewards`** — 指定完成所有任务的用户所获得的奖励金额和币种。

```json
"rewards": [
  {
    "currency": "ADM",
    "amount": 100
  },
  {
    "currency": "ETH",
    "amount": 0.01
  }
],
```

**`twitter_api`** — 您从 Twitter 开发者平台获取的 Twitter API 凭据。如果不运行 Twitter 活动，请留空。

```json
"twitter_api": {
  "consumer_key": "jsoQSRzVYWTUE88t",
  "consumer_secret": "6l7w0vqHCEIkmjbdR8ubTxzhJZRk1JUlSUonu5",
  "access_token_key": "86823450088-il17SnfGmxQCYW9bAGAnFB2aW4",
  "access_token_secret": "W0k1armrFUL8ATzJwAJ2x9yuxojKIEtRaphT"
},
```

**`admin_accounts`** — 您的个人 ADM 地址，以便机器人接受您发送的管理员命令。此地址必须与机器人自身的地址不同。

```json
"admin_accounts": [
  "U14818108337685946763"
],
```

**`welcome_string`** 和 **`help_message`** — 向用户展示的欢迎语和帮助文本。两者均支持 Markdown，并可引用配置变量（例如 `${config.rewards_list}`、`${config.twitter_follow_list}`）。

**`adamant_notify`** 和 **`slack`** — 可选但推荐的通知渠道。如果使用 ADAMANT 通知，请指定一个不同于 `admin_accounts` 的地址。

```json
"adamant_notify": "U48110833768594688888",
"slack": "https://hooks.slack.com/services/T7YUJW/LKHHD/rDKFJZ94FOhbkn49eOfq",
```

### 运行机器人

使用 pm2 进程管理器启动机器人。如果您已安装 ADAMANT 节点，pm2 已可用；否则请使用 `sudo npm install -g pm2` 安装。

```bash
pm2 start --name bountybot app.js
```

如果机器人未响应消息，请检查日志：

```bash
pm2 logs bountybot
```

为确保机器人在机器重启后自动重启，请添加一条 cron 任务：

```bash
crontab -e
```

添加以下行并保存：

```
@reboot cd /home/adamant/adamant-bountybot && pm2 start --name bountybot app.js
```

![ADAMANT 的互动型加密货币项目悬赏机器人](/images/engineering-notes/medium/51fec10f93b9/002-0-turkg-jxhihlqu39.webp)
