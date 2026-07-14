---
title: "如何在 macOS 上安装 ADAMANT 节点"
slug: "how-to-install-an-adamant-node-on-macos-cfdcb9434b9a"
description: "本指南介绍如何从零开始在 macOS 上安装和运行 ADAMANT Messenger 区块链节点，包括开发工具、PostgreSQL、Node.js 和重启后自动启动配置。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-install-an-adamant-node-on-macos-cfdcb9434b9a"
publishedAt: "2025-06-08T16:04:37.394Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/cfdcb9434b9a/001-1-v00ichfaftdwhvumrvfkxq-png.webp"
cardSpan: "full"
originalId: "medium:cfdcb9434b9a"
locale: "zh"
placeholder: false
---

本指南介绍如何从零开始在 **macOS** 上安装和运行 **ADAMANT Messenger 区块链节点**，包括开发工具、PostgreSQL、Node.js 和重启后自动启动配置。

已在 macOS 13 Ventura 及更新版本上测试。节点类型：`mainnet` 或 `testnet`。所需时间：约 15–30 分钟。

运行 ADAMANT 节点可支持由 ADAMANT Messenger 驱动的完全去中心化、注重隐私的区块链。它能增强网络安全性，提供对区块链数据的直接访问，并在您成为验证者/代表时获得 dPoS 奖励。

### 前提条件

您需要一台运行 macOS 13（Ventura）或更高版本的 Mac，一个管理员用户账户，稳定的互联网连接，约 50 GB 的可用磁盘空间，以及基本的终端使用经验。按 `Cmd + 空格`，输入 `Terminal`，然后按 Enter 打开终端。

### 安装 Apple 命令行工具

Apple 的开发工具是编译代码和使用 Git 所必需的：

```bash
xcode-select --install
```

弹出窗口将提示您确认安装。接受并等待安装完成。

### 安装 Homebrew

Homebrew 是 macOS 的包管理器，用于安装 PostgreSQL 和其他依赖项：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

![如何在 macOS 上安装 ADAMANT 节点](/images/engineering-notes/medium/cfdcb9434b9a/002-1-vp1mtcppml-dgtygq6vb9q-png.webp)

按 *Enter* 键确认。安装完成后，请按照“下一步”部分打印的说明操作（通常是将 Homebrew 添加到您的 shell 配置文件如 `~/.zprofile` 或 `~/.bash_profile` 中）。重新加载您的 shell：

```bash
source ~/.zprofile  # or ~/.bash_profile depending on your shell
```

### 安装所需软件包

安装 PostgreSQL、Redis、Git 以及其他必要工具：

```bash
brew install postgresql redis git make automake autoconf libtool jq htop
```

启动并启用 PostgreSQL 和 Redis：

```bash
brew services start postgresql
brew services start redis
```

### 设置 PostgreSQL 数据库

为 ADAMANT 创建 PostgreSQL 用户和数据库：

```bash
# Customize these as needed
DB_USER=adamant
DB_NAME=adamant_main
DB_PASSWORD=securepassword

psql postgres -c "CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASSWORD';"
psql postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"
```

### 安装 NVM 和 Node.js

安装 Node 版本管理器（NVM）和 Node.js 22 LTS（代号 Jod）：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 22
```

安装 *pm2*（Node.js 进程管理器）：

```bash
npm install -g pm2
```

设置 *pm2* 日志轮转（可选但推荐）：

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 500M
pm2 set pm2-logrotate:retain 5
pm2 set pm2-logrotate:compress true
pm2 set pm2-logrotate:rotateInterval '0 0 0 1 *'
```

### 克隆并设置 ADAMANT 节点

为保持结构清晰，使用 `~/Applications` 目录（您主目录中的个人文件夹，而非系统级的 `/Applications`）：

```bash
mkdir -p ~/Applications
cd ~/Applications
```

从 GitHub 克隆 ADAMANT 仓库：

```bash
# Customize these as needed
NETWORK=mainnet   # or testnet
BRANCH=master     # or desired Git branch

git clone https://github.com/Adamant-im/adamant --branch $BRANCH
cd adamant
npm install
```

![如何在 macOS 上安装 ADAMANT 节点](/images/engineering-notes/medium/cfdcb9434b9a/003-1-rtjskr-1lfxqntzxxg2h-q-png.webp)

设置 ADM 节点配置文件：

```bash
cp config.default.json config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" config.json
```

这会将默认配置复制到您自己的文件中，并填入您之前设置的数据库密码。您也可以使用 `nano config.json` 手动编辑配置文件。

对于 **testnet** 节点，请改用以下命令：

```bash
cp test/config.default.json test/config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" test/config.json
```

### 下载区块链快照（可选，仅限主网）

如果您希望支持完全去中心化，请跳过此步骤。否则，下载快照将显著加快区块链同步速度：

```bash
curl -O https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql $DB_NAME < db_backup.sql
rm db_backup.sql
```

此过程可能需要长达 20 分钟，但可节省约一周的同步时间。

### 运行 ADM 节点

首先在终端中临时运行节点，以验证一切正常：

```bash
node app.js
```

如果成功，您将看到启动输出以及区块链同步过程，区块高度持续上升：

![如何在 macOS 上安装 ADAMANT 节点](/images/engineering-notes/medium/cfdcb9434b9a/004-1-fclr7waeepraklxpmforsg-png.webp)

![如何在 macOS 上安装 ADAMANT 节点](/images/engineering-notes/medium/cfdcb9434b9a/005-1-cewqr7pjxjoxwgic-kw4cg-png.webp)

使用 `Ctrl + C` 停止节点，然后使用 *pm2* 启动，以便在关闭终端后仍能持续运行：

```shell
# Mainnet
pm2 start --name adamant app.js

# Or, for testnet
# pm2 start --name adamanttest app.js -- --config test/config.json --genesis test/genesisBlock.json
```

![如何在 macOS 上安装 ADAMANT 节点](/images/engineering-notes/medium/cfdcb9434b9a/006-1-yamwpxe0isnydfrzhcujg-png.webp)

保存 *pm2* 进程列表：

```bash
pm2 save
```

验证其是否正在运行：

```bash
pm2 logs adamant
```

![如何在 macOS 上安装 ADAMANT 节点](/images/engineering-notes/medium/cfdcb9434b9a/007-1-d8em6reqerk-q53fjdwb-q-png.webp)

### macOS 重启后恢复节点

要在 Mac 重启后自动重启 ADAMANT 节点，您有两种选择。

**选项 1：重启后手动启动。** 每次 Mac 重启后，运行：

```bash
source ~/.nvm/nvm.sh
pm2 resurrect
```

您可以通过将这些行添加到 shell 配置文件（例如 `~/.zprofile`）中来实现自动化：

```bash
echo 'source ~/.nvm/nvm.sh && pm2 resurrect' >> ~/.zprofile
```

**选项 2：使用 `pm2 startup` 自动启动。** *pm2 startup* 命令可能无法与 macOS 系统完整性保护（SIP）无缝协作。建议改为创建一个 `launchd` 服务：

```bash
pm2 startup launchd
```

这将输出一条类似 `sudo env PATH=$PATH:/Users/youruser/.nvm/versions/node/vXX.X.X/bin pm2 startup launchd -u youruser — hp /Users/youruser` 的命令。在终端中运行该命令，然后保存 pm2 进程列表：

```bash
pm2 save
```

*pm2* 现在将在系统启动时自动重启您的 ADAMANT 节点。如需后续取消，请运行 `pm2 unstartup launchd`。

### 验证安装

检查进程状态：

```bash
pm2 show adamant
```

检查节点区块高度：

```bash
curl http://localhost:36666/api/blocks/getHeight
```

获取节点状态：

```bash
curl http://localhost:36666/api/node/status
```

返回结果中包含 `"syncing":true` 表示节点尚未完全同步。请等待区块链完全同步完成。使用区块链快照可显著加快此过程。

更多参考信息，请参阅 [ADAMANT 节点文档](https://docs.adamant.im/)。
