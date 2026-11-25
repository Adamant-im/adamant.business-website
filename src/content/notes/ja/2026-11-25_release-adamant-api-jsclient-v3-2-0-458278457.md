---
title: "ADAMANT API JS Client v3.2.0"
slug: "release-adamant-api-jsclient-v3-2-0-458278457"
description: "ADAMANT API JS Client v3.2.0は、ADAMANT Node v0.11.0と連携したセキュリティおよび正確性向上のためのリリースです。v3.0.0およびv3.1.0のすべての利用者はv3.2.0へアップグレードしてください。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.2.0"
publishedAt: "2026-11-25T15:08:18Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:458278457"
locale: "ja"
placeholder: false
---

ADAMANT API JS Client v3.2.0は、ADAMANT Node v0.11.0と連携したセキュリティおよび正確性向上のためのリリースです。v3.0.0およびv3.1.0のすべての利用者はv3.2.0へアップグレードしてください。

## 受信者およびデリゲートの公開鍵検証

SDKは、標準的な32バイトのオンカーブEd25519検証を強制するようになりました。これにより、非標準、オフカーブ、および位数1、2、4、8の小さなオーダーのCurve25519鍵を拒否し、メッセージのキャッシュや暗号化の前にローカルでADMアドレスの導出チェックを行います。`getPublicKey()`メソッドは、無効なADMアドレスに対してはネットワークリクエストを行わずに空文字列を返し、ノードが不一致または不正な鍵を返した場合にはキャッシュを汚染することなく空文字列を返します。`sendMessage()`は解決された受信者の鍵をローカルで再検証し、無効または不一致の鍵を`{success: false, errorMessage}`の結果として拒否します。また、`voteForDelegate()`はアドレスバインディングに失敗したデリゲート鍵を拒否します。`Map`ベースの`publicKeysCache`は書き込み時と読み込み時の両方で検証され、ネットワーク依存のデリゲートキャッシュ（`byAddress`、`byUsername`）は`AdamantApi`インスタンスごとに分離されます。

## KVSおよびチャットフィルターの修正

`getKVS()`、`getChatTransactions()`、`getChats()`、および`getChatMessages()`メソッドは、明示的な`and: { ... }`ラッパーをフラット化し、プレーンなフィルター名を出力するようになりました。これは、すべてのADAMANT Nodeバージョンで文書化されているノードコントラクトに準拠しています。サポートされていない`or`ラッパーや、AND専用エンドポイント上のプレフィックス付き`and:`または`or:`フィルターキーは、古いノードが無視しv0.11.0以降のノードが拒否するプレフィックスを送信する代わりに、クライアント側で`{success: false, errorMessage}`として拒否されます。これは、記録されたメインネットの`/api/states/get`フィクスチャテストで検証済みです。

## 使用可能なノードの準備状況とローダーフィルタリング

`loader.loaded: false`または`loader.syncing: true`を報告するノードは、プライマリのアクティブノード選択およびWebSocket接続リストから除外されます。ただし、`loader`オブジェクトを持たないレガシーノードは引き続き対象となります。`onReady`コールバック（および`api.isReady`）は、使用可能なノードが実際に選択されるまで待機します。スタートアップチェックは5秒、10秒、30秒、60秒のバックオフで再試行され、5分ごとの定期スイープを待たずに、以前のスイープが失敗した場合でも継続されます。初期化済みで、かつ準備完了ノードがすべて失敗するか`minVersion`を下回った場合、SDKは警告とともに`minVersion`互換の「ロード済みだが同期中」のノードへフォールバックします。ただし、これは10分以内の最近の同期高さの参照があり、候補がその高さから25ブロック以内にある場合に限ります。`onReady`コールバックは、例外が発生した場合の二重起動が防止され、HTML 200メンテナンスページ、null、または不完全な`{success: true}`ステータスなどの非オブジェクト応答は安全にスキップされます。

## ADAMANT Node v0.11.0 API、OpenAPI、およびKVS POSTの整合性

決定論的なAPI DTO生成（`scripts/sync-api-types.mjs`）は、アーカイブされた`Adamant-im/adamant-schema`リポジトリから`Adamant-im/adamant`（v0.11.0リリース時のマスターコミット`50568f37dc2b7da86f44991f96c40c8edde74d67`の`openapi/specification/openapi.yaml`）へ移行し、`createRequire`を通じてインストールされた正確なツールバージョンを読み取ります。生成された`src/api/generated.ts`は、`RateLimitErrorResponseDto`、`GetKVSRequestBody`、および更新された`https://docs.adamant.im/`へのリンクを含めて再生成されました。エンドポイントのオプション型（`ChatroomsOptions`、新規の`ChatTransactionsOptions`、`KVSOptions`）はADAMANT Node v0.11.0の厳格なフィルター検証と整合性が取られており、`/api/chats/get`および`/api/states/get`では`toHeight`が強制され、`/api/chatrooms/*`からは高さ/範囲フィルターが除外されています。`ChatroomsOptions.userId`は非推奨となり、レガシーな呼び出し元がv0.11.0以降のノードで検証エラーにならないよう、実行時に`/api/chatrooms/*`から削除され、専用の初回非推奨警告が表示されます。`POST /api/states/get`のサポートが`api.getKVS(options, {method: 'POST'})`経由で追加され、大規模な`keyIds`や`senderIds`のクエリに対応しました。これには、`GET`と一致する完全なべき等読み取りフェイルオーバーが含まれます。

## HTTP 429への耐性とフェイルオーバーの強化

SDKは各リクエストの前に`targetNode`をキャプチャし、同時発生する障害によって`this.node`が失敗したノードに戻らないようにします。複数のノードからHTTP 429応答が返された場合、追加の`/api/node/status`プローブなしで、キャッシュされた別の同期済みかつレート制限されていないノードに即座に切り替えます。単一ノードの429応答ではヘルススイープをスキップし、`checkNode()`内の429をオフラインノードとは別個に処理します。同時実行される`updateNodes()`スイープはインフライトのPromiseによって重複排除され、リクエストがノードの失敗を報告した際には、計画中のスイープが強制フェイルオーバーにアップグレードされます。SDKは2ノードおよび3ノード以上の同期セットの両方で`failedNode`からローテーションし、ノードごとの429クールダウン（`rateLimitedUntil`、最大60秒）を追跡するため、強制および計画的なヘルススイープはクールダウンが終了するまでレート制限されたノードを回避します。`Retry-After`（秒またはHTTP日付）、`RateLimit-Reset`、`RateLimit-Scope`ヘッダーを解析し、別の同期ノードが存在する場合はべき等読み取り（`GET`および`POST /api/states/get`）に対して即座にフェイルオーバーします。単一ノードの場合は、ループに陥ることなく最大10秒のバウンドバックオフを遵守します。HTTP 429失敗結果の`AdamantApiResult`には、オプションの`status`、`retryAfterMs`、`rateLimitScope`メタデータが公開されます。なお、書き込みの`POST`リクエストは厳密に再試行されません。

## 依存関係のセキュリティ更新と7日間のリリース経過隔離

本リリースでは、`pnpm-workspace.yaml`において`minimumReleaseAge: 10080`（7日間）および明示的な`allowBuilds`設定（`'@parcel/watcher': false`、`esbuild: true`、`unrs-resolver: true`）が強制され、リリース経過期間の除外は一切ありません。直接的および推移的な依存関係は7日間のカットオフを過ぎたものに更新されました。これにはaxios、bitcoinjs-lib、tiny-secp256k1、pbkdf2、socket.io-client、bip39、ecpair、semver、@redocly/cli、eslint、jest、prettier、swagger-typescript-apiが含まれ、本番環境の監査指摘事項を20件から0件に削減しました。公開はGitHub Actions npm Trusted Publishingとビルドの真正性証明（provenance）を使用して行われます。

## 検証

Node.js v24.19.0およびpnpm 11.13.1で検証済みです。完全なテストスイート（`pnpm test`）は20のスイートと333のテストをカバーし、100%の関数カバレッジを達成しており、`gts lint`も通過しました。APIの型チェックは参照されたADAMANTおよびadamant-walletsのコミットと一致しています。TypeDocおよびVitePressのドキュメントビルドも通過しました。ESM、CommonJS、ライブコンシューマー、パッケージサブパス、およびTypeScript宣言のパッケージテストも通過済みです。本番環境の監査では脆弱性は0件と報告され、ロックされた893個のパッケージすべてで署名が検証されています。

### Breaking changes

`encodeMessage()`および`decodeMessage()`関数は、非標準、オフカーブ、および位数1、2、4、8の小さなオーダーのEd25519鍵に対して`invalid key`をスローするようになりました。正当なメインネットの鍵には影響ありません。`getPublicKey()`メソッドは、無効なADMアドレスに対してネットワークリクエストを行わずに空文字列を返し、ノードの鍵からアドレスが導出できない場合も空文字列を返します。`sendMessage()`メソッドはこのような受信者を`{success: false, errorMessage}`で拒否し、`voteForDelegate()`はアドレスバインディングに失敗したデリゲート鍵を拒否します。

TypeScriptのクエリオプションの絞り込みにより、`ChatroomsOptions`および`KVSOptions`は、ADAMANT Node v0.11.0が拒否するサポート外の`TransactionQueryParameters`フィールドを継承しなくなりました。`getChatTransactions()`メソッドは、`fromHeight`、`toHeight`、`inId`、`isIn`を保持する`ChatroomsOptions`のスーパーセットである`ChatTransactionsOptions`を使用するようになりました。`TransactionQueryParameters`は変更されず、引き続きエクスポートされます。

`transformTransactionQuery(query, 'states' | 'chats' | 'chatrooms')`を`or`ラッパーやプレフィックス付きの`and:`または`or:`フィルターキーで直接呼び出すと、`badParameter`メッセージを含む`Error`がスローされます。一方、`AdamantApi`クライアントメソッドは`{success: false, errorMessage}`を返します。

`getKVS()`および`getChatTransactions()`における`toHeight`フィルターは、ADAMANT Node v0.11.0以降でのみ強制されます。古いノードは`toHeight`を黙って無視し、`success: true`で新しいレコードを返すため、上限の高さに依存する呼び出し元は`minVersion: '0.11.0'`を設定する必要があります。

`/api/chatrooms/*`の`userId`フィールドは`ChatroomsOptions`で非推奨となり、専用の警告とともに実行時に削除されます。呼び出し元は、`getChats(address)`または`getChatMessages(address1, address2)`のURLパス引数としてのみアカウントアドレスを渡す必要があります。

`checkHealthAtStartup: true`の場合、`onReady`は待機し、使用可能でロード済みかつ同期中でないノードが選択されるまで`api.isReady`は`false`のままとなります。スタートアップチェックは5秒、10秒、30秒、60秒のバックオフで再試行されます。

HTTP 429でリクエストが失敗した場合、`AdamantApiResult`の`success: false`バリアントにオプションの`status`、`retryAfterMs`、`rateLimitScope`フィールドが追加されました。

トランザクションのバイトレイアウト、ハッシュ、ID、署名、暗号化、ウォレット導出、およびルートエクスポートに変更はありません。
