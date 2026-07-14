---
title: "在区块链上实现安全的双因素认证"
slug: "go-to-secure-2fa-on-a-blockchain-344500a5f010"
description: "短信双因素认证存在结构性安全缺陷，SIM卡交换攻击频发。区块链消息传递可提供更安全、可靠且低成本的替代方案。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/go-to-secure-2fa-on-a-blockchain-344500a5f010"
publishedAt: "2020-01-19T10:27:29.377Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/344500a5f010/001-1-ljkbgctg0w-cqgb0tn5s6g-png.webp"
cardSpan: "full"
originalId: "medium:344500a5f010"
locale: "zh"
placeholder: false
---

短信是目前应用最广泛的双因素认证方式，被银行、加密钱包和无数在线服务所采用。然而，它本质上并不安全。SIM卡交换诈骗——攻击者将受害者的电话号码转移到新SIM卡上——自移动通信早期便已被利用，且近年来愈演愈烈。伦敦警方报告称，2019年SIM卡交换诈骗案件增加了63%，多起高调案件导致数百万美元的加密货币被盗。其根本原因是结构性的：谁控制了SIM卡，谁就能重置密码并接管账户，而电信员工可能被贿赂或欺骗以重新分配号码。

![前往在区块链上实现安全的双因素认证](/images/engineering-notes/medium/344500a5f010/002-0-h92gnghvvfxe0cfp.webp)

典型的SIM卡交换攻击分为三个阶段。首先，诈骗者收集个人数据——通常来自社交媒体或电信内部的同伙。其次，他们联系移动运营商，谎称手机丢失，并阻止受害者SIM卡的使用。第三，他们获取替换的SIM卡，有时使用伪造文件或勾结门店经理。一旦新SIM卡激活，受害者将失去所有基于短信的身份验证访问权限，而攻击者则能接收所有一次性验证码，并迅速更改密码。

![前往在区块链上实现安全的双因素认证](/images/engineering-notes/medium/344500a5f010/003-0-tptrqqosbbxrb3up.webp)

*Joel Ortiz 在大学新闻发布会上的场景。两年后，他因通过SIM卡交换盗窃超过750万美元的加密货币而被捕，并被判处10年监禁。*

恢复极为困难。法币转账有时可在银行配合下撤销，但加密货币交易实际上不可逆转且通常无法追踪。目前没有任何加密交易所对SIM卡交换盗窃的受害者进行赔偿，法律追索通常针对电信运营商而非资金追回。例如，Michael Terpin 损失了2.24亿美元，正在对AT&T提起诉讼。

除了SIM卡交换外，短信双因素认证还存在其他技术弱点。消息可能通过信令系统7（SS7）的漏洞被截获，美国国家标准与技术研究院（NIST）已在《数字身份指南》中正式弃用短信作为第二因素。短信送达也不可靠——验证码可能延迟或根本无法收到，而双因素认证的存在可能给用户带来虚假的安全感，导致他们选择更弱的密码。

## 其他双因素认证方法及其权衡

替代的双因素认证方法包括一次性TAN码列表、生物识别认证、基于时间的一次性验证码应用（如Google Authenticator）以及硬件安全密钥。每种方法都有实际缺陷。物理令牌可能丢失或被盗。认证应用使设备迁移变得复杂——例如，Google Authenticator 不提供密钥导出功能，导致手机损坏后恢复极为困难。2013年的一项研究发现，用户普遍认为所有双因素认证都不方便，而短信之所以流行，仅仅是因为它是“最不麻烦”的选项，而非最安全的。

理想的双因素认证方法应具备安全性、可靠性、便捷性和低成本。基于区块链的传递方式满足这些标准。

## 使用ADAMANT实现基于区块链的双因素认证

从用户角度看，基于区块链的双因素认证与基于短信的流程相同：服务生成一次性验证码并通过消息通道发送；用户读取并输入验证码。区别在于传输方式。不同于短信，验证码通过ADAMANT区块链信使传递，该信使提供网页版、Tor客户端，以及适用于iOS、Android、Linux、Windows和macOS的原生应用。

![前往在区块链上实现安全的双因素认证](/images/engineering-notes/medium/344500a5f010/004-0-l5oogpwqaljtmoab.webp)

区块链提供了短信无法实现的多项安全特性。账户创建无需电话号码或电子邮件——仅需一个助记符。所有消息均使用curve25519xsalsa20poly1305进行端到端加密。每条消息都是使用Ed25519 EdDSA签名的区块链交易，使得中间人攻击不可能实现。消息被记录在带有不可篡改时间戳的区块中，其真实性由分布式节点共识验证，而非任何中心化机构。账户无法被封锁，消息无法被删除，这意味着不存在运营商暂停SIM卡的情况。验证码可在任何时间从任何设备访问，发送方还能收到送达确认——无需“重新发送”按钮。

![前往在区块链上实现安全的双因素认证](/images/engineering-notes/medium/344500a5f010/005-0-prx5mhtulthutavr.webp)

用户仅凭助记符即可登录ADAMANT，因此他们可以为所有服务使用单一账户，或为每个服务创建独立账户。一个限制是，账户必须至少有一笔交易，其公钥才会出现在链上，这是向该账户发送加密消息所必需的。ADAMANT钱包包含一个免费代币水龙头以解决此问题，尽管更稳健的解决方案是直接通过公钥而非派生的数字地址来寻址账户。

通过ADAMANT发送一次双因素验证码的成本约为0.001 ADM（按当前价格约0.00001美元）。服务也可基于ADAMANT代码库运行自己的区块链，并将交易费用设为零。

## 实现指南

以下步骤描述了如何将基于区块链的双因素认证集成到服务中，使用ADAMANT作为传递通道。参考实现在GitHub上提供：`https://github.com/Adamant-im/adamant-2fa`。

### 步骤1：创建发送方账户

创建一个将发送双因素验证码的ADAMANT账户。你可以通过网页钱包手动完成，或通过ADAMANT Node API、Console或JS API以编程方式完成。账户创建包括生成BIP39助记符，计算其SHA-256哈希值，推导出Ed25519私钥和公钥对，然后通过另一轮SHA-256哈希并反转得到区块链地址。

![前往在区块链上实现安全的双因素认证](/images/engineering-notes/medium/344500a5f010/006-0-djya3mapovmiw1rz.webp)

![前往在区块链上实现安全的双因素认证](/images/engineering-notes/medium/344500a5f010/007-0-wjbii6tc0qtwvpom.webp)

### 步骤2：生成一次性验证码

为每次登录尝试生成一个HOTP验证码。以下示例使用`speakeasy`库：

```js
const hotp = speakeasy.hotp({
  counter,
  secret: account.seSecretAscii,
});
```

用户提交验证码时的验证：

```js
se2faVerified = speakeasy.hotp.verify({
  counter: this.seCounter,
  secret: this.seSecretAscii,
  token: hotp,
});
```

### 步骤3：通过区块链发送验证码

使用ADAMANT Console CLI将验证码作为区块链消息发送：

```js
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const command = `adm send message ${adamantAddress} "2FA code: ${hotp}"`;
let { error, stdout, stderr } = await exec(command);
```

或者，使用ADAMANT JS API库的`send`方法，以编程方式实现而无需调用CLI。

### 步骤4：构建用户界面

提供一个字段供用户输入双因素验证码。演示应用使用Vue，但任何前端框架均可使用。

![前往在区块链上实现安全的双因素认证](/images/engineering-notes/medium/344500a5f010/008-0-uvflqyj6wavxcmsl.webp)

演示应用的完整源代码位于GitHub：`https://github.com/Adamant-im/adamant-2fa`，包含安装说明和在线演示链接。
