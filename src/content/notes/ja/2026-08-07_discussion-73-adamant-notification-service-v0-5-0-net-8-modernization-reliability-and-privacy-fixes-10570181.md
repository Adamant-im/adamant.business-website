---
title: "ADAMANT Notification Service v0.5.0 — .NET 8への移行、信頼性とプライバシーの向上"
slug: "discussion-73-adamant-notification-service-v0-5-0-net-8-modernization-reliability-and-privacy-fixes-10570181"
description: "ADAMANT Notification Service (ANS) は、送信者と受信者の情報を秘匿したままADAMANT iOSアプリへApple Push通知を配信します。v0.5.0は2019年以来初のタグ付きリリースです。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/73"
publishedAt: "2026-08-07T14:06:51Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10570181"
locale: "ja"
placeholder: false
---

[ADAMANT Notification Service (ANS)](https://github.com/Adamant-im/adamant-notificationService) は、ANSやAppleが送信者と受信者の情報を知ることなく、ADAMANT iOSアプリにApple Push通知を配信するサービスです。バージョン [v0.5.0](https://github.com/Adamant-im/adamant-notificationService/releases/tag/v0.5.0) は、2019年の0.4.1以来となる初のタグ付きリリースです。

今回のアップデートは全面的な書き換えではありません。ANSは将来的に [adamant-ns](https://github.com/Adamant-im/adamant-ns) への移行が計画されているため、目的を「サポート終了となった依存関係の解消」と「本番環境での障害原因となっていたバグの修正」に絞り、アーキテクチャやプライバシーモデルには手を加えていません。

## ランタイム

全プロジェクトにおいて、`netcoreapp3.0`（2020年にサポート終了）から **.NET 8 LTS** へ移行しました。これにより、古いランタイムを維持するためにサポート終了したライブラリを含むコンテナに依存することなく、Ubuntu 22.04以降でのネイティブなデプロイが可能になりました。

## ソケットリーク

APIクライアントがリクエストごとに新しい `HttpClient` を割り当て、破棄していなかった問題がありました。本番環境では、`CLOSE-WAIT` 状態のソケットが蓄積し続け、稼働中のインスタンスで1分間に約30以上のファイルディスクリプタが消費されることが確認されました。これが一定数を超えると、プロセス全体のDNS解決が停止していました。現在は単一の共有クライアントを再利用するように修正されています。

## フェイルオーバー

以前は設定されたノードからランダムに1つを選択するだけで、再試行が行われませんでした。そのため、一時的なエラーを含むノード側のあらゆるエラーがサービス全体のクラッシュを引き起こしていました。現在は別のノードに対して再試行を行うようになり、設定された全ノードで障害が発生した場合でも、クラッシュせずに「今回のサイクルをスキップする」という挙動に変更されました。

## EF Coreプロバイダーの変更

当初はEF Coreには手を加えず、ターゲットフレームワークの引き上げのみを行う予定でした。ORMコアについてはEF Core 2.2が `netstandard2.0` をターゲットとしているため .NET 8 でもコンパイル可能でしたが、MySQLプロバイダー (`MySql.Data.EntityFrameworkCore`) が全く動作しないことが判明しました。最初のクエリで `AmbiguousMatchException` が発生し、本番環境に到達する前にSQLiteベースのスモークテストで検知されました。これを、.NETエコシステムで標準的に使用されている、活発にメンテナンスされている `Pomelo.EntityFrameworkCore.MySql` に置き換えました。

## プライバシーの修正

3つのログ出力箇所で機密データがそのまま出力されていました。具体的には、プッシュ成功時のデバイストークン、解析失敗時の（デバイストークンを含む）*復号済み*シグナルペイロード、そして読み込み失敗時のAPNs証明書パスワードです。これらはいずれもプロジェクトのプライバシー規定に違反していたため、削除しました。

## その他の本番環境向け修正

上記に加え、本番環境で以下の問題が発見・修正されました：ヘッドレスサーバーでワーカーが起動しない原因となる `~` パス展開のバグ、ネットワークの瞬断後に登録済みデバイスすべてに古いトランザクションの通知が殺到する起動時のエッジケース、同時実行時のノード選択におけるスレッドセーフティの問題、HTTPタイムアウト設定の欠落、および不正なAPNsレスポンス受信時のNull参照エラー。

## グレースフルシャットダウン

以前は両ワーカーとも `SIGTERM` を検知していなかったため、`docker stop` や `systemctl restart` を実行するたびにログ上でクラッシュとして記録されていました。現在は正常にシャットダウンされるようになっています。

## テストとバージョン管理

テストカバレッジは数件から35件に増加し、前述のEF Core/SQLiteスモークテストも含まれています。また、ビルドには正式なバージョン番号が付与されるようになりました。以前はプロジェクトファイルの設定に関わらず、すべてのビルドが `1.0.0.0` として出荷されていました。

## セキュリティ

セキュリティ監査は [cryptofoundry](https://adamant.business#contact) によって実施されました。

## リンク

- [リリースノート](https://github.com/Adamant-im/adamant-notificationService/releases/tag/v0.5.0)
- [全差分, 0.4.1 → v0.5.0](https://github.com/Adamant-im/adamant-notificationService/compare/0.4.1...v0.5.0)
- [トラッキングイシュー](https://github.com/Adamant-im/adamant-notificationService/issues/12)
- [リポジトリ](https://github.com/Adamant-im/adamant-notificationService)
