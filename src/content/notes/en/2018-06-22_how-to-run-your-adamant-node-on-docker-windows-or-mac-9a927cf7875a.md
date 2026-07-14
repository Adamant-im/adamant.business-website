---
title: "How to Run Your ADAMANT Node on Docker (Windows or Mac)"
slug: "how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
description: "Note: The Docker image may be outdated; running an ADAMANT node on an Ubuntu server is recommended instead. ADAMANT uses Delegated Proof of Stake (dPoS) for blockchain consensus…"
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
locale: "en"
placeholder: false
---

Note: The Docker image may be outdated; running an ADAMANT node on an Ubuntu server is recommended instead. ADAMANT uses Delegated Proof of Stake (dPoS) for blockchain consensus, and running your own node enhances network decentralization.

This guide explains how to install, run, and update an ADAMANT node on Windows, macOS, or Linux using Docker. The example uses Windows 10, which requires a 64-bit version of Windows 10 Pro, Enterprise, or Education (Build 14393 or later). The host machine should have at least 4 GB of RAM and 50 GB of free disk space, depending on the current block height.

To install Docker, download the free Docker Community Edition and run the installer. Follow the wizard to accept the license and authorize the installer with your system password, which is needed for networking components and Hyper-V VMs. After installation, start Docker from the Start menu. Once the whale icon in the status bar becomes steady, Docker is running. You must also share your local drive with Docker by right-clicking the status bar icon, selecting Settings, checking the shared drive checkbox, and applying the changes.

![How to Run Your ADAMANT Node on Docker (Windows or Mac)](/images/engineering-notes/medium/9a927cf7875a/002-0-lyckrpled-5lr7hl.webp)

![How to Run Your ADAMANT Node on Docker (Windows or Mac)](/images/engineering-notes/medium/9a927cf7875a/003-0-6akvfvvlkcfe7829.webp)

![How to Run Your ADAMANT Node on Docker (Windows or Mac)](/images/engineering-notes/medium/9a927cf7875a/004-0-a86t6y8gjz9oxrpc.webp)

To install the ADAMANT node, first install a Git client using the default options. Open Microsoft PowerShell and clone the repository:

```bash
git clone https://github.com/Adamant-im/adamant-docker
cd adamant-docker
```

![How to Run Your ADAMANT Node on Docker (Windows or Mac)](/images/engineering-notes/medium/9a927cf7875a/005-0-fgfme0jdbid9yncf.webp)

To run the node, pull the necessary Docker images:

```bash
docker-compose pull
```

![How to Run Your ADAMANT Node on Docker (Windows or Mac)](/images/engineering-notes/medium/9a927cf7875a/006-0-aivqroqzrjyhguqd.webp)

Start the database service and verify it launched successfully:

```bash
docker-compose up -d db
docker-compose logs
```

![How to Run Your ADAMANT Node on Docker (Windows or Mac)](/images/engineering-notes/medium/9a927cf7875a/007-0-papyajoh0cxgai9i.webp)

Next, start the adamant-node service and check the logs to confirm a successful start:

```bash
docker-compose up -d adamant-node
```

![How to Run Your ADAMANT Node on Docker (Windows or Mac)](/images/engineering-notes/medium/9a927cf7875a/008-0-5juodmupmzrre2n1.webp)

You can stop all running services with `docker-compose stop` and restart them later using `docker-compose start`.

![How to Run Your ADAMANT Node on Docker (Windows or Mac)](/images/engineering-notes/medium/9a927cf7875a/009-0-hrzlp4aniigch2fc.webp)

Validate the installation by checking the node application log:

```bash
docker-compose logs --tail=10 adamant-node
```

![How to Run Your ADAMANT Node on Docker (Windows or Mac)](/images/engineering-notes/medium/9a927cf7875a/010-0-v8ofli8bjy-hqo2b.webp)

The `--tail=10` argument limits the output to the last 10 log lines. To verify the node is connected to the ADAMANT blockchain, visit the ADAMANT network monitor and find your node by its IP address. It may take a few minutes for your node to appear. A newly installed node will show a block height of 1 as it synchronizes, which can take up to a day depending on your connection and CPU.

![How to Run Your ADAMANT Node on Docker (Windows or Mac)](/images/engineering-notes/medium/9a927cf7875a/011-0-74skpvuswckotzf6.webp)

To check the height directly, get the container ID using `docker ps`, then query the node's API:

```bash
docker ps
docker exec <container_id> curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

![How to Run Your ADAMANT Node on Docker (Windows or Mac)](/images/engineering-notes/medium/9a927cf7875a/012-0-osgtdu-u6daibuqi.webp)

When the sync completes, the height will match other nodes on the network. To update the ADAMANT node, open PowerShell and run the following commands:

```bash
cd adamant-docker
docker-compose stop
docker-compose pull
docker-compose down
docker-compose up -d db
docker-compose up -d adamant-node
```

![How to Run Your ADAMANT Node on Docker (Windows or Mac)](/images/engineering-notes/medium/9a927cf7875a/013-0-l5hbgju9qlgr65sw.webp)
