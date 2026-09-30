---
title: "ADAMANT IPFS Node v0.1.0：有界存储与确定性复制"
slug: "discussion-80-adamant-ipfs-node-v0-1-0-released-from-master-bounded-storage-deterministic-replication-an-10920610"
description: "ADAMANT IPFS Node 已发布首个 v0.1.0 版本，容器镜像位于 ghcr.io/adamant-im/ipfs-node:0.1.0。这是一个基于 Node.js 和 Helia 的独立应用程序。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/80"
publishedAt: "2026-09-30T11:31:18Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10920610"
locale: "zh"
placeholder: false
---

ADAMANT IPFS Node 已发布首个 v0.1.0 版本，容器镜像位于 `ghcr.io/adamant-im/ipfs-node:0.1.0`。这是一个基于 Node.js 和 Helia 的独立应用程序，旨在作为应用程序文件交付的 IPFS 存储节点。它并非 Kubo 的封装，也不提供 Kubo 兼容的 API。虽然 ADAMANT Messenger 是其参考部署方案，但任何应用程序均可自行托管该节点。

该服务运行时通过 Express API 暴露了 12 个已记录的路径，包括健康检查、管理详情、多部分上传、按 CID 下载以及存储指标。访问权限由中心化强制执行，管理密钥采用故障关闭（fail-closed）机制，CORS 则采用明确的白名单策略。存储生命周期功能包括基于数据存储的文件注册表，具备持久化状态机、磁盘预留、摄入预算、带 TTL 的临时上传以及基于水位线的垃圾回收机制。数据放置采用针对已配置对等节点集的确定性集合哈希（rendezvous hashing），并根据文件存续时间缩减副本数量。复制过程通过版本化协议运行，支持准备（prepare）、提交（commit）和回滚（rollback）阶段。每个上传会话都会跟踪已创建的区块，确保被拒绝或中止的请求能够精确移除相应的区块。

健康检查点具备网络感知能力，采用持久化的单调高度和明确的成员纪元（membership epoch），仅接受来自已配置对等节点的证明。网格可靠性改进包括定期的 libp2p ping 活跃度检查（失败时会重置会话）以及在陈旧复制流错误后的响应式恢复。CORS 和错误代码的更新引入了可选的精确 `app://.` 桌面源、机器可读的 `code` 值，以及针对 Tor 浏览器兼容性、仅限于 v3 隐藏服务格式的 `http(s)://*.onion` 通配符。

该容器基于 `node:24.13.0-bookworm-slim` 构建，使用多阶段 Dockerfile。它以非特权 `node` 用户身份运行，并将 `HOME=/data` 设置为数据目录，允许单个卷存储块存储（blockstore）、数据存储（datastore）、对等身份、引脚（pins）、注册表、修复游标和健康检查点。镜像发布时不包含配置，操作员必须将配置文件挂载至 `/app/config.json5`。该镜像针对 `linux/amd64` 和 `linux/arm64` 架构发布，并附带 SBOM 和来源证明。

该节点明确避开了 DHT、IPNS、公共网关和 Kubo API。存储的内容不会向公共 IPFS 网络广播，也无法通过此节点获取公共网络内容。受控的对等拓扑结构降低了内容路由元数据的公共暴露风险，但并不意味着部署本身具备私密性、匿名性、无需信任或抗审查特性。上传和下载在设计上未经过身份验证，仅使用单个管理密钥作为凭据。后续工作包括支持上传者签名的删除、对等节点发现、流量统计、绝对数据目录以及公共网络互操作性。

要运行该节点，请创建一个数据卷，并使用适当的配置和端口映射启动容器：

```bash
docker volume create ipfs-node-data

docker run -d \
  --name ipfs-node \
  --restart unless-stopped \
  --stop-timeout 20 \
  -v ipfs-node-data:/data \
  -v "$PWD/config.json5:/app/config.json5:ro" \
  -p 127.0.0.1:4000:4000 \
  -p 4001:4001 \
  ghcr.io/adamant-im/ipfs-node:0.1.0
```

该版本已通过 CI、安全审计以及两种架构下的容器冒烟测试验证。发布工作流确认了标签是 `master` 分支的祖先，与 `package.json` 版本号匹配，并在第二次冒烟测试前使用 OCI 标签、SBOM 和来源证明进行了重新构建。
