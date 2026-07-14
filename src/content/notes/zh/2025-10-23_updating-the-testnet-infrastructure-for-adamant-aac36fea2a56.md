---
title: "更新 ADAMANT 的测试网基础设施"
slug: "updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
description: "为何测试网至关重要：ADAMANT 测试网基础设施需更新和稳定化，以更好支持开发、测试和社区贡献。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
publishedAt: "2025-10-23T15:31:46.542Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/aac36fea2a56/001-1-gpu744hucponr8ep2jojwa-png.webp"
cardSpan: "full"
originalId: "medium:aac36fea2a56"
locale: "zh"
placeholder: false
---

### 为何测试网至关重要

ADAMANT 的测试网基础设施在 [Issue #148](https://github.com/Adamant-im/adamant/issues/148) 中被指出需要更新和稳定化，以更好地支持开发、测试和社区贡献。讨论中明确了两个优先事项：**可访问性**，使新贡献者无需复杂配置即可快速启动节点；以及**稳定性**，确保测试节点能可靠地模拟生产环境条件。

### ADM 测试网的引导镜像

测试网数据库的快照现已提供下载，可帮助您快速启动一个已同步至当前测试网状态的全新节点，显著缩短部署时间。

安装测试网节点后，请下载快照：

```bash
wget https://testnet.adamant.im/db_test_backup.sql.gz
```

解压文件：

```bash
gunzip db_test_backup.sql.gz
```

将镜像加载到测试网节点的数据库中：

```bash
psql adamant_test < db_test_backup.sql
```

### 公共测试网节点

ADAMANT 测试网提供了一份预定义的公共节点列表，用于节点发现、网络同步和 API 访问。权威来源是仓库中的 [官方配置文件](https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json)。撰写本文时，列表包含三个节点，均使用端口 36667：

```json
"list": [
  {
    "ip": "162.55.32.80",
    "port": 36667
  },
  {
    "ip": "81.0.247.181",
    "port": 36667
  },
  {
    "ip": "95.217.19.144",
    "port": 36667
  }
]
```

其中第一个节点（`testnode1.adamant.im`）同时托管了测试网浏览器。第二个节点无域名且未启用公共 API。第三个节点（`testnode3.adm.im`）开放了公共 API；例如，访问 `https://testnode3.adm.im/api/node/status` 可获取节点状态信息。

### 运行测试

贡献者和验证节点应根据项目的 [贡献指南](https://github.com/Adamant-im/adamant/blob/dev/.github/CONTRIBUTING.md) 对其节点运行单元测试和 API 测试。

### 申请测试网 ADM 及访问应用

您可通过与主网相同的水龙头申请 3500 个测试网 ADM：[https://adamant.im/free-adm-tokens](https://adamant.im/free-adm-tokens/)。测试网消息应用位于 [https://dev-adamant-testnet.surge.sh](https://dev-adamant-testnet.surge.sh)，由 dev 分支自动构建。测试网浏览器地址为 [https://testnet.adamant.im](https://testnet.adamant.im/)。
