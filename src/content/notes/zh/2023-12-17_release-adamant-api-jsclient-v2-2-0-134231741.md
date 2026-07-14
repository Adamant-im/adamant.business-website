---
title: "ADAMANT API JS Client v2.2.0"
slug: "release-adamant-api-jsclient-v2-2-0-134231741"
description: "此版本的 ADAMANT API JS Client 引入了一组从包中导出的验证工具函数，支持对密码、地址、公钥等进行编程验证。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v2.2.0"
publishedAt: "2023-12-17T19:51:54Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-api-jsclient"
tag: "v2.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:134231741"
locale: "zh"
placeholder: false
---

此版本的 ADAMANT API JS Client 引入了一组现在从包中导出的验证工具函数。这些工具允许开发者以编程方式验证密码、ADAMANT 地址、公钥、投票目标、代理名称和聊天消息，从而在 TypeScript 项目中实现更安全的运行时检查。

导出的函数包括针对密码、地址、公钥和代理名称的类型守卫，以及用于将 ADM 数量转换为 satoshis 和验证消息负载的辅助函数。每个验证器在适用时均返回类型收窄的结果。

```ts
function isPassphrase(passphrase: unknown): passphrase is string;
function isAdmAddress(address: unknown): address is AdamantAddress;
function isAdmPublicKey(publicKey: unknown): publicKey is string;
function isAdmVoteForPublicKey(publicKey: unknown): publicKey is string;
function isAdmVoteForAddress(address: unknown): boolean;
function isAdmVoteForDelegateName(delegateName: unknown): delegateName is string;
function validateMessage(
  message: string,
  messageType: MessageType = MessageType.Chat
): { success: false, error: string } | { success: true };
function isDelegateName(name: unknown): name is string;
function admToSats(amount: number): number;
```
