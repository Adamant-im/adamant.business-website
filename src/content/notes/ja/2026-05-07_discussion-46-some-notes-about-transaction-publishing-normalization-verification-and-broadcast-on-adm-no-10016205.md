---
title: "ADAMANTノードにおけるトランザクションの公開、正規化、検証、およびブロードキャスト"
slug: "discussion-46-some-notes-about-transaction-publishing-normalization-verification-and-broadcast-on-adm-no-10016205"
description: "Transaction.prototype.verifyは他のブロックから取得したトランザクションを検証します。Transactions.prototype.publishはユーザーからの新規トランザクションをチェックし、未確認の新しいトランザクションを検証します。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/46"
publishedAt: "2026-05-07T07:27:25Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10016205"
locale: "ja"
placeholder: false
---

## 機能

`Transaction.prototype.verify`は、他のブロックから取得されたトランザクション（古いトランザクションを含む可能性がある）をチェックします。`Transactions.prototype.publish`は、ユーザーからの着信トランザクションをチェックし、新しい未確認トランザクションを検証します。`publish`および`objectNormalize`メソッドの後に、API経由で新しいトランザクションを受信した後にも`verify`が呼び出されます。`publish`は、パブリックAPI経由でトランザクションをプッシュする場合にのみ呼び出されます。

## トランザクション処理

ノードがクライアントアプリからAPI経由で初めて受信する新しいトランザクションを受信した場合、`Logic->Transaction.prototype.publish`は受信データから新しいトランザクションを作成し、クライアントのトランザクションプロパティ（`timestampMs`を含む）を検証し、トランザクションIDを追加して、通常通り未確認トランザクションを処理します。ノードが現在の高さ（height）で他のピアから新しいトランザクションを受信した場合、トランザクションを検証し、無効であればそのピアを削除した上で、未確認トランザクションを処理します。起動時または高さ0からブロックチェーンを検証中に他のピアからトランザクションを取得する際、ノードはトランザクションを検証し、無効であればピアを削除し、複数のトランザクションを同時に検証しながら未確認トランザクションを処理します。検証処理では、ノードが受信したトランザクションのスキーマ検証のために`objectNormalize()`を呼び出します。

未確認トランザクションの処理フローは、`logic.transaction.process()`から始まります。この処理では、トランザクションIDを検証し、送信者IDを正規化します。次に、トランザクションの正規化が行われます。`logic.transaction.objectNormalize()`は、トランザクションオブジェクトをスキーマに対して検証し、`timestampMs`を含む不要なプロパティを削除します（これはspaceshipアクティベーション前）。最後に、`logic.transaction.verify()`が呼び出され、`timestamp`、`timestampMs`、`signature`などのすべてのプロパティを検証します。

ピアの削除とは、そのピアをピアリストから削除することを意味し、再発見されるまでリストに残らないようにします。ノードはピアを禁止（ban）しないため、`BANNED`ステータスは決して適用されません。ノードは、未確認トランザクションの処理後に他のノードにトランザクションをブロードキャストします。`objectNormalize()`に加えて、ノードは`normalize()`も持っていますが、これはPOST `/transactions/normalize`エンドポイントでのみ使用され、非推奨とされるべきです。ノードは`apply()`と`applyUnconfirmed()`の両方を持っています。これは、「apply」メソッドが送信者および受信者のアカウント残高を変更するのに対し、`applyUnconfirmed()`は未確認の残高を変更するためです。「undo」メソッドについても同様です。ノードが新しいブロックを生成する際、トランザクションはすでに検証済みのリストから取得されます。現在、`publish()`はトランザクションのタイムスタンプが未来のものであるか、`constants.maxTransactionAgeSec`秒以上過去のものであるかをチェックしています。`verify`では後で必ず呼び出されるため、`publish`に同じチェックを追加する意味はありません。また、`publish`のチェックを`verify`に含めることはできません。なぜなら、それらは現在時刻に依存しており、古いトランザクションが5秒以上前かどうかを検証できなくなるためです。クライアントアプリは、`publish()`ではなく`verify()`にこれらのチェックがある場合、`The difference between timestamp and timestampMs is greater than ${maxTimestampMsDelta}ms.`や`Invalid transaction timestamp. Timestamp is not in the int32 range`といったエラーメッセージを受け取ります。

## タイムスタンプに関する注意点

トランザクションの`timestamp`はUnix時間ではなく、ADAMANTエポック時間（秒単位）です。トランザクションの`timestampMs`はUnix時間ではなく、ADAMANTエポック時間（ミリ秒単位）であるべきです。Unixミリ秒は`constants.epochTime.getTime() + timestampMs`として導出できます。`timestampMs`フィールドは、`spaceship`アクティベーション後であっても、トランザクションのバイト列、署名、トランザクションID、またはハッシュの一部にはなりません。`spaceship`以降、コンセンサスに影響を与える検証では、`timestampMs`が`timestamp`と同じADAMANTエポック秒内にあることを要求すべきです：`0 <= timestampMs - timestamp * 1000 < 1000`。このより厳格な「同一秒」ルールは意図的です。`timestampMs`は`timestamp`に格納されたのと同じADAMANTエポック秒を正確に細分化するものでなければならず、クライアントは`timestamp = Math.floor(timestampMs / 1000)`を計算すべきです。秒の境界近くで`Math.round()`や`Math.ceil()`を使用すると、一貫性のないペアが生じるため、拒否されるべきです。現在のクライアントおよびソースのレビューにより、`adamant-api-jsclient`、PWA、`adamant-console`（`adamant-api@2.4.0`経由）、iOS、およびドキュメントの例はすべて`Math.floor`または同等の切り捨てを使用しており、`round`や`ceil`を使用する送信側ADMトランザクションのタイムスタンプ生成パスは存在しません。`spaceship`以前は、コンセンサスに影響を与える正規化では`timestampMs`を削除すべきであり、アクティベーション前の動作が古いノードと互換性を保てるようにする必要があります。1秒以内に同じ送信者からの複数のトランザクションは、異なるトランザクションである限り許可されます。`timestampMs`はクライアントが高速チャットメッセージをソートするのを助けますが、トランザクションのnonceや署名の入力としては使用してはなりません。

## 受理時チェック

`publish()`メソッドには、新しく送信されたトランザクションに対するパブリックAPIの受理チェックが含まれており、ノードの現在時刻に依存する場合があります。トランザクションが`publish()`を通過した場合でも、`verify()`によって処理されます。`verify()`は意図的に現在時刻のチェックを持たず、スキーマ、ID、署名、残高、および`timestampMs`の同一秒ルールなど、決定論的なチェックのみを保持すべきです。`publish()`の現在時刻チェックを`verify()`に移動してはなりません。なぜなら、`verify()`はリプレイ、同期、および過去のトランザクションに使用されるためです。既存の未来時刻チェックはスロットベースです。5秒スロットの場合、約400ミリ秒時計が進んでいるクライアントは、丸められた秒単位のタイムスタンプが次のスロットに跨ぐときのみ「Transaction timestamp is in the future」というエラーになります。`maxTransactionFutureMs`は非コンセンサスのパブリックAPI受理許容値であり、`publish()`でのみ適用され、リプレイ、ピア/ブロック検証、またはコンセンサスアクティベーションロジックでは使用されません。意図される条件は、古いスロットベースの受理ポリシーを維持しつつ、`transactionSlotNumber > currentSlotNumber`かつトランザクション時刻がノードの現在時刻より`maxTransactionFutureMs`以上先である場合にのみ拒否することで、境界ケースを緩和することです。この計算では、クライアントが提供した場合`timestampMs`を使用し、それ以外は`timestamp * 1000`にフォールバックします。`publish()`における小さな非コンセンサスの猶予（たとえば、次のスロットに対して500ミリ秒）は、リプレイ検証を変更せずに、わずかに進んでいるクライアント時計のUXを向上させることができますが、クライアントアプリは依然として古いノードとの互換性のために小さなタイムスタンプの余裕を保つべきです。現在のブロックより1秒先の`timestamp`を持つトランザクションであっても、ブロックチェーンを破ることなくそのブロックに含まれる可能性があります。トランザクションの`timestamp`は署名済みのトランザクションメタデータであり、スロットやブロックの有効性の源ではなく、コンセンサスは`tx.timestamp <= block.timestamp`を要求しません。リプレイ中、ノードはトランザクションのタイムスタンプをローカルの壁時計時間と比較しないため、受理時の猶予がリプレイの分岐を引き起こすことはありません。

## ステータスエンドポイント

`/api/node/status`エンドポイントは、`nodeTimestampMs`（ADAMANTエポックミリ秒）や`unixTimestampMs`などの追加の時計フィールドを、コンセンサスに影響を与えることなく返す場合があります。`nodeTimestamp`は引き続きADAMANTエポック秒のままです。

## アクティベーション高さ

コンセンサスのアクティベーション高さは、testnetおよびADAMANTベースのチェーン用に設定可能であるべきであり、コードまたは設定でmainnetのデフォルトを維持する必要があります。過去の`fairSystemActivateBlock: 4359464`チェックは`height > fairSystemActivateBlock`を使用していたため、名前付き`fairSystem`アクティベーションの最初のアクティブ高さは4,359,465です。`spaceship`アクティベーションは、ブロック、ピア、リプレイ処理中に`timestampMs`の受信、正規化、保存、検証などのコンセンサスに影響を与える動作のみを制御すべきです。時計に相対的な`publish()`チェックは受理ポリシーであり、コンセンサスアクティベーションの外に残るべきです。
