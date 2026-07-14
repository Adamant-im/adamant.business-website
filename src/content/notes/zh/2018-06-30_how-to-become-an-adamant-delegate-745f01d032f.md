---
title: "如何成为 ADAMANT 委托人"
slug: "how-to-become-an-adamant-delegate-745f01d032f"
description: "ADAMANT 使用改进的委托权益证明（dPoS）算法 Fair dPoS 实现区块链共识。要成为委托人并生成区块，您必须运行节点，支付 3,000 ADM 注册费，并获得足够的投票进入前 101 名。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-become-an-adamant-delegate-745f01d032f"
publishedAt: "2018-06-30T10:11:25.366Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/745f01d032f/001-1-rprsczpnpydvk1y6ko-hzg-png.webp"
cardSpan: "full"
originalId: "medium:745f01d032f"
locale: "zh"
placeholder: false
---

ADAMANT 使用一种名为 Fair dPoS 的改进型委托权益证明（dPoS）算法来实现区块链共识。要成为委托人并生成区块，您必须运行一个节点，支付 3,000 ADM 的注册费，并积累足够的选票以进入前 101 名委托人行列。

首先安装并运行一个 ADAMANT 节点。节点运行后，切换到 `adamant` 系统用户，并从 npm 仓库安装 `adamant-console` 工具。

```bash
su - adamant
npm i -g adamant-console
```

![如何成为 ADAMANT 委托人](/images/engineering-notes/medium/745f01d032f/002-0-55iagwoakrbgkahj.webp)

接下来，创建一个配置目录，并将默认配置文件复制到该目录中。

```bash
mkdir ~/.adm && cp /home/adamant/.nvm/versions/node/$(node -v)/lib/node_modules/adamant-console/config.default.json ~/.adm/config.json
```

![如何成为 ADAMANT 委托人](/images/engineering-notes/medium/745f01d032f/003-1-5n-ejpboh-pf5plf-85-ug-png.webp)

使用文本编辑器编辑已复制的 `~/.adm/config.json` 文件。将 `network` 参数从 `testnet` 更改为 `mainnet`，并添加您的委托人密码短语。请保密您的密码短语，并确保服务器安全。或者，您也可以不在配置文件中填写密码短语，而是在注册时通过命令行参数传入。

![如何成为 ADAMANT 委托人](/images/engineering-notes/medium/745f01d032f/004-1-zwh5ys2uf2nnz04woxe3zw-png.webp)

通过运行 `adm` 启动控制台。执行以下命令注册您的委托人，将 `<new delegate name>` 替换为您选择的名称。与您的密码短语关联的钱包必须至少持有 3,000 ADM 以支付注册费，该费用将分配给其他生成区块的委托人。

```bash
delegate new <new delegate name>
```

![如何成为 ADAMANT 委托人](/images/engineering-notes/medium/745f01d032f/005-0-khyxu9qp9tk9nbzg.webp)

如果您未在配置文件中指定密码短语，请直接在命令中包含它：

```bash
delegate new <new delegate name> --passPhrase "passphrase here"
```

![如何成为 ADAMANT 委托人](/images/engineering-notes/medium/745f01d032f/006-0-fojjd-jrkr-jmvje.webp)

成功注册后，按 `Ctrl+C` 两次退出控制台。要开始生成区块，请更新位于 `~/adamant/config.json` 的节点配置文件。将 `forging/secret` 参数设置为用引号括起的 12 个单词的密码短语，然后重启节点。

```bash
nano ~/adamant/config.json
pm2 restart adamant
```

![如何成为 ADAMANT 委托人](/images/engineering-notes/medium/745f01d032f/007-1-53boguojm1wx6sexqoa6yq-png.webp)

您可以通过访问 ADAMANT 委托人监控页面并搜索您的委托人名称来验证委托人状态。这将跳转到一个详情页面，确认您的注册信息。

![如何成为 ADAMANT 委托人](/images/engineering-notes/medium/745f01d032f/008-1-sq6rao5bjro6dpbpbiwqlq-png.webp)

![如何成为 ADAMANT 委托人](/images/engineering-notes/medium/745f01d032f/009-1-xutdvsnjzh06yedz6uq1jg-png.webp)

仅注册并不能启用区块生成，您必须通过 Messenger 应用程序获得 ADAMANT 用户的投票。一旦您的委托人积累到足够票数进入前 101 名，请在委托人监控页面中密切关注其表现。绿色圆圈表示成功生成区块，而灰色、黄色或红色圆圈则表明存在配置问题——通常是节点配置中的密码短语错误——或节点离线。请保持节点持续运行，跟踪您的委托人排名，并根据需要应用重要更新。

![如何成为 ADAMANT 委托人](/images/engineering-notes/medium/745f01d032f/010-1-imaqsih3o-uz-q2rggmia-png.webp)
