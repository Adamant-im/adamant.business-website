---
title: "如何在 Windows 上运行 ADAMANT 节点"
slug: "how-to-run-adamant-node-on-windows-ee057e6e80d5"
description: "从 Windows 10 版本 1903 和 Windows Server 2019 开始，微软引入了 WSL 2，可在 Windows 上运行 Linux 应用程序，从而可在本地计算机上运行 ADAMANT 节点。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-adamant-node-on-windows-ee057e6e80d5"
publishedAt: "2021-04-06T13:12:12.555Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/ee057e6e80d5/001-1-uqe2ccpdkrmbxnio3cyqaq-jpeg.webp"
cardSpan: "full"
originalId: "medium:ee057e6e80d5"
locale: "zh"
placeholder: false
---

从 Windows 10 版本 1903 和 Windows Server 2019 开始，微软引入了 WSL 2（Windows Subsystem for Linux），允许你在 Windows 上运行 Linux 应用程序。这意味着你可以在家用计算机上运行 ADAMANT 节点，包括作为代理节点或运行锻造池。

### 系统要求

你需要 Windows 10 x64（版本 1903 / build 18362 或更高）或 Windows Server 2019，至少 4 GB 的内存和 50 GB 的磁盘空间。在安装前，必须在计算机的 BIOS 中启用虚拟化技术。

### WSL 2 的设置

请遵循[官方 WSL 2 安装指南](https://docs.microsoft.com/en-us/windows/wsl/install-win10#manual-installation-steps)。如果你不使用 Microsoft Store，可以[手动下载 Ubuntu](https://docs.microsoft.com/en-us/windows/wsl/install-manual)；Ubuntu 16、18 或 20 均可适用。

![如何在 Windows 上运行 ADAMANT 节点](/images/engineering-notes/medium/ee057e6e80d5/002-0-d3n4-16cc9epoa-d.webp)

安装后，为 Ubuntu 发行版创建一个 UNIX 用户名和密码。例如，将用户名设为 *ubuntu*。

### 安装 ADAMANT 节点

你现在拥有一个在 Windows 上运行的 Ubuntu 子系统，其行为类似于虚拟机。请按照标准的[Ubuntu 指南](https://medium.com/adamant-im/how-to-run-your-adamant-node-on-ubuntu-990e391e8fcc)安装 ADAMANT 节点。

![如何在 Windows 上运行 ADAMANT 节点](/images/engineering-notes/medium/ee057e6e80d5/003-0-jj5gjxvimq-cagrf.webp)

安装后，*Vmmem*（WSL 2）进程可能会消耗大量内存，因为安装脚本会下载最新的区块链镜像，而 Linux 子系统会将其缓存在内存中。计算机重启后，内存占用会显著下降。

### 重启后运行节点

关闭 Ubuntu 窗口不会停止节点；Linux 子系统将继续在后台运行。如果计算机进入睡眠状态，唤醒后节点会自动恢复并同步至最新的区块链高度。然而，在完全重启计算机后，你必须手动启动节点。

打开 Ubuntu 终端，或从 PowerShell 连接：

```
wsl
```

如果你安装了多个 Linux 发行版，请指定版本：

```
wsl -d Ubuntu-18.04
```

连接后，启动 PostgreSQL，切换到 *adamant* 用户，并启动节点：

```
sudo service postgresql start
su - adamant
cd /home/adamant/adamant && pm2 start --name adamant app.js
```

验证节点是否正在运行并持续增长高度：

```
curl http://localhost:36666/api/blocks/getHeight
```

节点需要一些时间才能追上当前的区块链高度。如果你具备系统管理知识，可以配置重启时自动启动；可参考[此 Ask Ubuntu 回答](https://askubuntu.com/a/1166012)获取指导。

### 访问 API

无论是从 Ubuntu 终端还是 Windows，都可以通过 *localhost* 访问节点的 API。在浏览器中打开 `http://localhost:36666/api/blocks/getHeight`。若要从其他计算机访问 API，则需要额外的网络配置。
