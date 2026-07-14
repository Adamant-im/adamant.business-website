---
title: "ADAMANT Forging Pool v3.1.0: より安全な報酬処理、運用の簡素化、モニタリングの強化"
slug: "forging-pool-v3-1-0-safer-rewards-easier-operations-better-monitoring-c77f450abf44"
description: "ADAMANT Forging Pool v3.1.0はプール運営者向けの推奨アップデートです。報酬計算や支払いの信頼性、会計ロジックの強化、ランタイムのモダン化を実現。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/forging-pool-v3-1-0-safer-rewards-easier-operations-better-monitoring-c77f450abf44"
publishedAt: "2026-07-01T18:03:33.378Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:c77f450abf44"
coverImage: "/images/engineering-notes/medium/c77f450abf44/001-5ca73690a5.webp"
locale: "ja"
placeholder: false
---

ADAMANT Forging Pool v3.1.0は、プール運営者向けの推奨アップデートです。報酬計算と支払いの信頼性を向上させ、会計ロジックを強化し、ランタイムをモダン化するとともに、日常運用を簡素化します。

### このリリースの重要性

フォージングプールの主な責務は、投票者への報酬を正しく計算し、安全に支払うことです。v3.1.0はまさにこの点に焦点を当てています。リトライ時や部分的失敗、保存された報酬値の取り扱いにおけるエッジケースのリスクを低減するため、報酬計算および支払いのフローを見直し、強化しました。支払い前の未払い報酬は正規化され、投票者ごとの報酬進捗がより安全に追跡されるようになりました。これにより、クラッシュやリトライ時に報酬の更新が誤って重複するリスクが低減され、報酬支払いの正確性と長期的な信頼性を重視する運営者にとって特に重要なリリースとなっています。

### v3.1.0の新機能

最も大きなインフラ変更は、MongoDBベースのストレージへの移行です。これにより、ブロック、投票者、トランザクション、報酬履歴、運用データに対して、より堅牢なストレージ層を提供します。既存のプールについては、従来のLowDBベースのデータを移行するツールがv3.1.0に含まれており、運営者は報酬履歴を失うことなく移行できます。

![Forging Pool v3.1.0: より安全な報酬処理、運用の簡素化、モニタリングの強化](/images/engineering-notes/medium/c77f450abf44/002-a7aa0fc331.webp)

このリリースには、より安全な報酬分配と支払い会計処理、リトライに安全な報酬進捗追跡、改善された支払いおよびブロック処理ログ、外部モニタリング用の`/api/health`エンドポイント、委任者パスフレーズの暗号化サポート（オプション）、`adm-pool` CLIコマンド（encrypt、unlock、lock、status）、アドレスまたは名前によるダッシュボードフィルタリング、表での投票者／委任者の表示改善、ドキュメントの更新、およびNode.js 22.13.0+を最低要件とするランタイムの採用も含まれます。

### 運営者向けのセキュリティ強化

プール運営者は、委任者のパスフレーズを運営者パスワードで暗号化できるようになりました。これはオプションであり、既存の平文パスフレーズ設定は引き続きサポートされますが、新しいワークフローにより、より安全な本番環境運用が可能になります。暗号化されたパスフレーズを使用すると、プールはロック状態で起動できます。ブロック同期、ダッシュボード、公開APIは利用可能のままに保たれますが、支払いおよびADM通知は、運営者がプールをアンロックするまで一時停止されます。これにより、サーバーが復旧または再起動しても、直ちに支払い機能が暴露されるリスクを回避できます。

### 運用とモニタリングの簡素化

新しい`adm-pool` CLIにより、最も機微なランタイム操作を簡単なコマンドで実行可能になります：

```sh
npm run adm-pool encrypt
npm run adm-pool unlock
npm run adm-pool lock
npm run adm-pool status
```

設定ファイルやプロセスログ内で手動で機微な状態変更を管理する代わりに、専用の制御ワークフローが提供されます。新しい`/api/health`エンドポイントは、Zabbixやカスタムダッシュボード、稼働監視ツールなどに対して、シークレット不要のステータススナップショットを提供します。MongoDBストレージや明確なログと組み合わせることで、プールの観測性、デバッグ、長期的なメンテナンスが容易になります。

### アップグレード推奨

ADAMANT Forging Pool v3.1.0は、すべてのプール運営者に推奨されます。特に定期的に報酬を支払っている本番環境のプール運営者には重要です。アップグレード前に、設定ファイルと報酬履歴のバックアップを実行し、MongoDB設定を確認、既存データのコピーで移行をテストし、移行後に支払い設定を検証してください。

リリース: [https://github.com/Adamant-im/pool/releases/tag/v3.1.0](https://github.com/Adamant-im/pool/releases/tag/v3.1.0)
リポジトリ: [https://github.com/Adamant-im/pool](https://github.com/Adamant-im/pool)
