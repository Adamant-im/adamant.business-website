---
title: "如何在 Docker 上运行你的 ADAMANT 节点（Windows 或 Mac）"
slug: "how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
description: "注意：Docker 镜像可能已过时；建议改为在 Ubuntu 服务器上运行 ADAMANT 节点。ADAMANT 使用委托权益证明（dPoS）达成区块链共识……"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
publishedAt: "2018-06-22T15:46:46.729Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9a927cf7875a/001-0-fg4w7kswcdb2l5b0.webp"
cardSpan: "full"
originalId: "medium:9a927cf7875a"
locale: "zh"
placeholder: false
---

注意：Docker 镜像可能已过时；建议改为在 Ubuntu 服务器上运行 ADAMANT 节点。ADAMANT 使用委托权益证明（dPoS）达成区块链共识，运行你自己的节点有助于增强网络去中心化。

本指南介绍如何在 Windows、macOS 或 Linux 上使用 Docker 安装、运行和更新 ADAMANT 节点。示例使用 Windows 10，需要 64 位版本的 Windows 10 Pro、Enterprise 或 Education（版本 14393 或更高）。主机应至少拥有 4 GB 内存和 50 GB 可用磁盘空间，具体取决于当前区块高度。

要安装 Docker，请下载免费的 Docker Community Edition 并运行安装程序。按照向导接受许可协议，并使用系统密码授权安装程序，因为网络组件和 Hyper-V 虚拟机需要该权限。安装完成后，从开始菜单启动 Docker。当状态栏中的鲸鱼图标变为稳定状态时，表示 Docker 正在运行。你还必须通过右键单击状态栏图标、选择“设置”、勾选共享驱动器复选框并应用更改，将本地驱动器共享给 Docker。

![如何在 Docker 上运行你的 ADAMANT 节点（Windows 或 Mac）](/images/engineering-notes/medium/9a927cf7875a/002-0-lyckrpled-5lr7hl.webp)

![如何在 Docker 上运行你的 ADAMANT 节点（Windows 或 Mac）](/images/engineering-notes/medium/9a927cf7875a/003-0-6akvfvvlkcfe7829.webp)

![如何在 Docker 上运行你的 ADAMANT 节点（Windows 或 Mac）](/images/engineering-notes/medium/9a927cf7875a/004-0-a86t6y8gjz9oxrpc.webp)

要安装 ADAMANT 节点，请先使用默认选项安装 Git 客户端。打开 Microsoft PowerShell 并克隆仓库：

```bash
git clone https://github.com/Adamant-im/adamant-docker
cd adamant-docker
```

![如何在 Docker 上运行你的 ADAMANT 节点（Windows 或 Mac）](/images/engineering-notes/medium/9a927cf7875a/005-0-fgfme0jdbid9yncf.webp)

要运行节点，请拉取必要的 Docker 镜像：

```bash
docker-compose pull
```

![如何在 Docker 上运行你的 ADAMANT 节点（Windows 或 Mac）](/images/engineering-notes/medium/9a927cf7875a/006-0-aivqroqzrjyhguqd.webp)

启动数据库服务并验证其成功启动：

```bash
docker-compose up -d db
docker-compose logs
```

![如何在 Docker 上运行你的 ADAMANT 节点（Windows 或 Mac）](/images/engineering-notes/medium/9a927cf7875a/007-0-papyajoh0cxgai9i.webp)

接下来，启动 adamant-node 服务并检查日志以确认启动成功：

```bash
docker-compose up -d adamant-node
```

![如何在 Docker 上运行你的 ADAMANT 节点（Windows 或 Mac）](/images/engineering-notes/medium/9a927cf7875a/008-0-5juodmupmzrre2n1.webp)

你可以使用 `docker-compose stop` 停止所有正在运行的服务，并稍后使用 `docker-compose start` 重新启动它们。

![如何在 Docker 上运行你的 ADAMANT 节点（Windows 或 Mac）](/images/engineering-notes/medium/9a927cf7875a/009-0-hrzlp4aniigch2fc.webp)

通过检查节点应用程序日志来验证安装：

```bash
docker-compose logs --tail=10 adamant-node
```

![如何在 Docker 上运行你的 ADAMANT 节点（Windows 或 Mac）](/images/engineering-notes/medium/9a927cf7875a/010-0-v8ofli8bjy-hqo2b.webp)

`--tail=10` 参数将输出限制为最后 10 行日志。要验证节点是否已连接到 ADAMANT 区块链，请访问 ADAMANT 网络监视器，并通过 IP 地址查找你的节点。你的节点可能需要几分钟才会显示。新安装的节点在同步时会显示区块高度为 1，根据你的网络连接和 CPU 性能，同步可能需要长达一天时间。

![如何在 Docker 上运行你的 ADAMANT 节点（Windows 或 Mac）](/images/engineering-notes/medium/9a927cf7875a/011-0-74skpvuswckotzf6.webp)

要直接检查高度，请使用 `docker ps` 获取容器 ID，然后查询节点的 API：

```bash
docker ps
docker exec <container_id> curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

![如何在 Docker 上运行你的 ADAMANT 节点（Windows 或 Mac）](/images/engineering-notes/medium/9a927cf7875a/012-0-osgtdu-u6daibuqi.webp)

当同步完成时，高度将与其他网络节点一致。要更新 ADAMANT 节点，请打开 PowerShell 并运行以下命令：

```bash
cd adamant-docker
docker-compose stop
docker-compose pull
docker-compose down
docker-compose up -d db
docker-compose up -d adamant-node
```

![如何在 Docker 上运行你的 ADAMANT 节点（Windows 或 Mac）](/images/engineering-notes/medium/9a927cf7875a/013-0-l5hbgju9qlgr65sw.webp)
