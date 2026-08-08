---
title: "ADAMANT通知サービスを刷新：変わらぬプライバシーと堅牢な基盤"
slug: "adamant-notification-service-rebuilt-same-privacy-sturdier-foundations-fee1b3ab39fb"
description: "ADAMANT通知サービス（ANS）が2019年以来の最大アップデートを実施。iOSユーザー向けのゼロ知識プッシュ通知モデルを維持しつつ、基盤インフラを全面的に刷新しました。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-notification-service-rebuilt-same-privacy-sturdier-foundations-fee1b3ab39fb"
publishedAt: "2026-08-07T14:48:47.463Z"
author: "Sab Kabadas"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:fee1b3ab39fb"
coverImage: "/images/engineering-notes/medium/fee1b3ab39fb/001-50da4f2353.webp"
locale: "ja"
placeholder: false
---

ADAMANT通知サービス（ANS）は、2019年以来最大となるアップデートを実施しました。iOS版ADAMANT Messengerユーザー向けに、プライバシーを侵害しないゼロ知識プッシュ通知モデルを維持しつつ、その基盤となるインフラを全面的に再構築しています。ANSはバックグラウンドで静かに動作し、プライバシーを損なうことなく新しいメッセージの到着をデバイスに通知します。

多くのメッセージングアプリでは、プッシュ通知のためにシステム側がメッセージの詳細を把握する必要があるというトレードオフが存在します。ANSはこの問題を、公開されているADAMANTブロックチェーンをポーリングし、登録済みデバイス宛のトランザクションを監視することで回避しています。トランザクションを検知すると、ANSはトランザクションIDのみを使用してAppleに通知を依頼します。復号にはユーザーのデバイスのみが保持する秘密鍵が必要なため、ANSがトランザクションの内容を読み取ったり、プッシュ通知のペイロードに復号後の内容を含めたりすることはできません。したがって、ANSもAppleも会話内容を再現することは不可能です。

このプライバシーモデルは維持しつつ、基盤となるランタイムと信頼性メカニズムは大幅に強化されました。ANSは今回、サポートが終了した旧バージョンのランタイムから.NET 8へと移行しました。これにより、古い互換レイヤーに依存することなく、最新のサーバーOS上でネイティブにサービスを実行できるようになりました。

さらに、時間の経過とともに蓄積し、定期的なサービス再起動を必要としていたネットワーク接続のリーク問題が修正され、接続が適切に再利用されるようになりました。また、ブロックチェーンノードとの通信において真のフェイルオーバーを実装しました。以前は、到達不能なノードが1つあるだけで通知パイプライン全体が停止する可能性がありましたが、ANSはADAMANTネットワークの分散型の回復力を活用し、別のノードに対して自動的に再試行を行うようになります。

このメンテナンスリリースは、cryptofoundryによる独立したセキュリティ監査を受けています。ランタイムの近代化とコアインフラの課題修正により、ADAMANTは今後も長年にわたり、信頼性の高いゼロ知識通知をタイムリーに提供し続けます。
