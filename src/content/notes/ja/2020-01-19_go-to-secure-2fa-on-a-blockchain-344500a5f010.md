---
title: "ブロックチェーン上で安全な2段階認証を実現"
slug: "go-to-secure-2fa-on-a-blockchain-344500a5f010"
description: "SMSによる2段階認証は根本的に不安定です。SIMスワップ詐欺から守るため、ADAMANTブロックチェーンを使った安全な2FAの実装方法を解説します。"
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
locale: "ja"
placeholder: false
---

SMSは銀行、暗号資産ウォレット、無数のオンラインサービスで最も広く使われている2段階認証（2FA）方式です。しかし、根本的に安全ではありません。SIMスワップ詐欺——攻撃者が被害者の電話番号を新しいSIMカードに移行する——は携帯電話の初期から存在しており、近年ますます増加しています。ロンドン警察は2019年にSIMスワップ詐欺が63％増加したと報告しており、著名な事件では暗号資産の盗難額が何百万ドルにも上っています。根本的な原因は構造的なものです。SIMカードを管理している者がパスワードをリセットし、アカウントを乗っ取ることができ、通信会社の従業員が賄賂や詐欺によって番号の再割り当てを行う可能性があります。

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/002-0-h92gnghvvfxe0cfp.webp)

典型的なSIMスワップ攻撃は3段階で進行します。第一に、詐欺師は個人情報を収集します——多くはSNSや通信会社の内部協力者から得られます。第二に、携帯事業者に連絡し、携帯電話を紛失したと主張して、被害者のSIMをブロックします。第三に、偽造書類や協力する店舗マネージャーを利用して、代替SIMを取得します。新しいSIMが有効になると、被害者はSMSベースの認証へのアクセスを失い、攻撃者はすべてのワンタイムコードを受信し、すみやかにパスワードを変更します。

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/003-0-tptrqqosbbxrb3up.webp)

*大学の記者会見でのジョエル・オルティス。2年後、彼はサイバー詐欺で拘束され、SIMスワップにより750万ドル以上の暗号資産を盗んだ罪で10年の刑を宣告された。*

回復は困難です。法定通貨の送金は銀行の協力で取り消せる場合がありますが、暗号資産の取引は事実上取り消せないだけでなく、追跡も困難です。SIMスワップによる盗難の被害者を補償した暗号資産取引所は存在せず、法的措置は資金回収ではなく通信事業者を対象にするのが一般的です。たとえば、マイケル・テルピンは2億2400万ドルを失い、AT&Tに対して訴訟を起こしています。

SIMスワップ以外にも、SMS 2FAには技術的な弱点があります。Signaling System 7（SS7）の脆弱性によりメッセージが傍受される可能性があり、米国国立標準技術研究所（NIST）はデジタルIDガイドラインでSMSを第二要素として正式に非推奨としています。また、SMSの配信は信頼性が低く——コードが遅れて届く、あるいは届かない——ことがあり、2FAの存在がユーザーに誤った安心感を与えるため、弱いパスワードを選択する傾向があります。

## 他の2FA方式とそのトレードオフ

代替の2FA方式には、ワンタイムTANコードリスト、生体認証、Google Authenticatorなどの時間ベースの認証アプリ、ハードウェアセキュリティキーなどがあります。それぞれに実用上の欠点があります。物理的なトークンは紛失や盗難のリスクがあります。認証アプリは端末の移行を複雑にします——たとえばGoogle Authenticatorはキーのエクスポート機能を提供しておらず、壊れたスマホからの復旧が困難です。2013年の研究では、すべての2FAが不便だとユーザーが感じており、SMSが人気なのは最も不便でないからであって、最も安全だからではありません。

理想的な2FA方式は、安全で、信頼性が高く、使いやすく、安価であるべきです。ブロックチェーンベースの配信はこれらの条件を満たします。

## ADAMANTを使ったブロックチェーン上の2FA

ユーザーの視点では、ブロックチェーン2FAはSMSベースの配信と同じように機能します：サービスがワンタイムコードを生成し、メッセージングチャネルを通して送信し、ユーザーがそれを読み取り入力します。違いはトランスポート方式です。SMSの代わりに、ADAMANTブロックチェーンメッセンジャーを通じてコードが配信されます。これはWebアプリ、Torクライアント、iOS、Android、Linux、Windows、macOS向けのネイティブアプリとして利用可能です。

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/004-0-l5oogpwqaljtmoab.webp)

ブロックチェーンはSMSでは実現できないいくつかのセキュリティ特性を提供します。アカウント作成には電話番号やメールアドレスは不要で、パスフレーズだけで済みます。すべてのメッセージはcurve25519xsalsa20poly1305を使用してエンドツーエンド暗号化されています。各メッセージはEd25519 EdDSAで署名されたブロックチェーントランザクションであり、中間者攻撃は不可能です。メッセージは不変のタイムスタンプとともにブロックに記録され、その真正性は中央権限ではなく、分散したノードの合意によって検証されます。アカウントはブロックされず、メッセージは削除できないため、通信事業者がSIMカードを停止するような事態は発生しません。コードはいつでもどのデバイスからでもアクセス可能で、送信者は配信確認を受け取り、「再送信」ボタンの必要がなくなります。

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/005-0-prx5mhtulthutavr.webp)

ユーザーはパスフレーズのみでADAMANTにログインするため、すべてのサービスに同じアカウントを使い回すことも、サービスごとに別アカウントを作成することもできます。ただし、アカウントの公開鍵がオンチェーンに登録されるには少なくとも1回のトランザクションが必要であり、これは暗号化されたメッセージを送信する前提条件です。この問題を回避するため、ADAMANTウォレットには無料のADMを提供するファセットが含まれています。より堅牢な解決策としては、数値アドレスではなく公開鍵そのものでアカウントを直接参照する方法があります。

ADAMANT経由での2FAコード送信コストは約0.001 ADM（現在の価格で約0.00001米ドル）です。サービス提供者はADAMANTのコードベースに基づいて独自のブロックチェーンを運用し、トランザクション手数料をゼロに設定することも可能です。

## 実装ガイド

以下は、ADAMANTを配信チャネルとして使用して、ブロックチェーン2FAをサービスに統合する手順です。リファレンス実装はGitHubの `https://github.com/Adamant-im/adamant-2fa` で利用可能です。

### ステップ1：送信者アカウントの作成

2FAコードを送信するADAMANTアカウントを作成します。これはWebウォレットで手動で行うことも、ADAMANT Node API、Console、またはJS APIを使ってプログラムで行うこともできます。アカウント作成には、BIP39パスフレーズの生成、そのSHA-256ハッシュの計算、Ed25519の秘密鍵と公開鍵ペアの導出、さらに公開鍵から別のSHA-256ハッシュと反転によりブロックチェーンアドレスを導出するプロセスが含まれます。

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/006-0-djya3mapovmiw1rz.webp)

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/007-0-wjbii6tc0qtwvpom.webp)

### ステップ2：ワンタイムコードの生成

各ログイン試行に対してHOTPコードを生成します。以下の例では `speakeasy` ライブラリを使用しています：

```js
const hotp = speakeasy.hotp({
  counter,
  secret: account.seSecretAscii,
});
```

ユーザーがコードを送信した際の検証：

```js
se2faVerified = speakeasy.hotp.verify({
  counter: this.seCounter,
  secret: this.seSecretAscii,
  token: hotp,
});
```

### ステップ3：ブロックチェーン経由でコードを送信

ADAMANT Console CLIを使用して、コードをブロックチェーンメッセージとして送信します：

```js
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const command = `adm send message ${adamantAddress} "2FA code: ${hotp}"`;
let { error, stdout, stderr } = await exec(command);
```

あるいは、CLIを呼び出さずにプログラムで処理するため、ADAMANT JS APIライブラリの `send` メソッドを使用することもできます。

### ステップ4：ユーザーインターフェースの構築

ユーザーが2FAコードを入力するためのフィールドを用意します。デモアプリケーションではVueを使用していますが、どのフロントエンドフレームワークでも問題ありません。

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/008-0-uvflqyj6wavxcmsl.webp)

デモの完全なソースコードは、セットアップ手順とライブデモリンクとともにGitHubの `https://github.com/Adamant-im/adamant-2fa` にあります。
