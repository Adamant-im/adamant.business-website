---
title: "在 Ubuntu 或 CentOS Linux 上运行 ADAMANT 节点"
slug: "how-to-run-adamant-node-on-ubuntu-or-centos-linux-990e391e8fcc"
description: "ADAMANT 使用公平 dPoS 共识机制。运行自己的节点可增强网络去中心化并支持作为代表出块。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-your-adamant-node-on-ubuntu-990e391e8fcc"
publishedAt: "2018-06-13T08:17:00.719Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/990e391e8fcc/001-1-ere-rzan0-vcmaaj97qubg-jpeg.webp"
cardSpan: "full"
originalId: "medium:990e391e8fcc"
locale: "zh"
placeholder: false
---

## 概述

ADAMANT 使用公平 dPoS（委托权益证明）作为区块链共识机制。运行您自己的节点可以增强网络的去中心化，并启用代表出块功能。本指南涵盖在 Ubuntu 20–24（推荐）或 CentOS 8 上的安装，其他兼容 Linux 的系统也可能适用。

需要一台至少 2 GB 内存和 70 GB 磁盘空间的服务器或 VPS（截至 2025 年 10 月主网需求）。

## 快速安装

首次设置时，请以 sudo 权限运行安装脚本。该脚本将更新操作系统软件包，创建 `adamant` 系统用户，安装 PostgreSQL、Node.js 及其他依赖项，设置 ADAMANT 节点，并可选地下载区块链镜像。系统会提示您设置数据库和系统用户的密码。

**Ubuntu：**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)"
```

**CentOS：**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh)
```

![如何在 Ubuntu 或 CentOS Linux 上运行 ADAMANT 节点](/images/engineering-notes/medium/990e391e8fcc/002-1-xzbcago0snmqw09cignfyq-png.webp)

使用 `screen` 工具可确保即使 SSH 连接中断，安装也能完成。该过程通常需要 10–20 分钟。

对于测试网，请添加相应的标志：

**Ubuntu：**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)" -O -b dev -n testnet -j jod
```

**CentOS：**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh) -b dev -n testnet -j jod
```

## 手动安装（Ubuntu）

这些步骤适用于 Ubuntu。在 CentOS 上，请使用等效命令或上述快速脚本。

### 系统准备

更新系统并安装构建工具、git 和 Redis：

```
sudo apt update && sudo apt upgrade -y
sudo apt-get install -y build-essential curl automake autoconf libtool rpl mc git redis-server
```

### PostgreSQL 设置

添加 PostgreSQL 仓库并安装：

```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
sudo apt update && sudo apt install -y postgresql postgresql-contrib libpq-dev
```

创建数据库用户和数据库。请使用强密码，而非以下示例中的密码：

```
su postgres -c psql
CREATE ROLE adamant LOGIN PASSWORD 'HardPass111';
CREATE DATABASE adamant_main;
ALTER DATABASE adamant_main OWNER TO adamant;
\q
```

### 创建系统用户

```
adduser adamant
sudo usermod -aG sudo adamant
su - adamant
```

### 安装 Node.js 和 PM2

安装 nvm，然后安装 Node.js LTS（Hydrogen/v18），再安装 PM2 作为进程管理器：

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

退出并重新登录以使 nvm 生效，然后执行：

```
nvm i --lts=hydrogen
npm install -g pm2
```

### 克隆并配置 ADAMANT

```
git clone https://github.com/Adamant-im/adamant
cd adamant
npm i
cp default.config.json config.json
nano config.json
```

在 `config.json` 中，将数据库密码设置为之前创建的密码。如果希望启用外部 API 访问（允许通过 Web 服务器调用 API），请将 `api/access/public` 设置为 `true`。将 `consoleLogLevel` 设置为 `error` 可获得更清晰的日志。

### 可选：区块链镜像

下载预构建的区块链镜像可节省同步时间，但需信任镜像来源。跳过此步骤意味着将完全验证每笔交易，可能需要数天时间，但可验证链的完整性。

```
pm2 stop adamant
wget https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql adamant_main < db_backup.sql
```

如果之前已在此数据库上注册过节点，请先使用 `dropdb` 和 `createdb` 删除并重新创建数据库。

## 运行与验证

使用 PM2 启动节点，PM2 会将进程放入后台并在崩溃时自动重启：

```
cd /home/adamant/adamant && pm2 start --name adamant app.js
```

使用 `pm2 show adamant` 检查状态——应显示 `online`。查询区块链高度：

```
curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

启动时，高度为 `1`，并随着节点同步而增加。同步完成后，高度将与其他网络节点一致。若出现问题，可使用 `pm2 logs adamant` 查看日志。您还可以通过在 ADAMANT 网络监控页面搜索您的 IP 地址，确认节点是否已显示。

## 启用公共 API

公共 API 允许 ADAMANT 消息应用连接到您的节点。内部（localhost）API 默认启用。要启用外部访问，请在 `config.json` 中将 `api/access/public` 设置为 `true`，然后重启：

```
pm2 restart adamant
```

通过在浏览器中打开 `http://<IP>:36666/api/blocks/getHeight` 来验证。

## 停止与更新

使用 `pm2 stop adamant` 停止节点。更新时：

```
su - adamant
cd adamant
pm2 stop adamant
git pull
npm update
pm2 restart adamant
```

## 重启时自动启动

以 `adamant` 用户身份添加一条 crontab 条目，使节点在 VPS 重启后自动重启：

```
crontab -e
```

```
@reboot cd /home/adamant/adamant && pm2 start --name adamant app.js
```

或者，使用 `pm2 save` 和 `pm2 startup` 可提供更可靠的自动启动机制。

## 恢复

如果节点失去同步并从高度 0 重新开始——通常由硬件错误或磁盘空间不足引起——可使用恢复脚本从区块链镜像中恢复。对于需要快速恢复运行的出块代表，此方法尤其有用：

```
sudo bash -c "$(wget -O - https://adamant.im/fix_node.sh)" -O -n mainnet
```

或者，可参考上述加载区块链镜像的手动恢复步骤。
