---
title: "Android PWAをCapacitorに移行"
slug: "moving-android-pwa-to-capacitor-e64b923284c0"
description: "以前、ADAMANT AndroidアプリはPWABuilderを使用して構築されており、ターゲットAPIレベルの制御、ネイティブコードへのアクセス、自動化のサポートが制限されていました。PWA v4.7アップデートでCapacitor.jsに移行し、ネイティブコードの完全な制御、プッシュ通知やカメラなどネイティブ機能の実行、コード最適化、カスタムプラグイン、CI/CD自動化を実現しました。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/moving-android-pwa-to-capacitor-e64b923284c0"
publishedAt: "2024-07-05T08:19:06.778Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/e64b923284c0/001-1-n3f-qwiedtkwhrlo6feg7a-png.webp"
cardSpan: "full"
originalId: "medium:e64b923284c0"
locale: "ja"
placeholder: false
---

以前、ADAMANT AndroidアプリはPWABuilderを使用して構築されており、いくつかの制限がありました：ターゲットAPIレベルを制御できない、ネイティブコードにアクセスできない、自動化のサポートがないなどです。PWA v4.7のアップデートにより、アプリはCapacitor.jsに移行されました。これにより、ネイティブコードの完全な制御、Cordova APIを通じたプッシュ通知やカメラなどのネイティブ機能の実行、コードの最適化、カスタムプラグイン、CI/CDの自動化が可能になりました。

![Android PWAをCapacitorに移行](/images/engineering-notes/medium/e64b923284c0/002-0-l2l0siac7nx7sixj.webp)

### なぜCapacitor.jsを選んだのか？

ADAMANT Messengerは、パフォーマンス、セキュリティ、保守性を重視する分散型メッセージングプラットフォームです。Capacitor.jsは、Vue.jsのようなモダンなWebフレームワークとシームレスに統合でき、iOS、Android、Webで単一のコードベースを共有可能であり、Web体験を損なうことなくネイティブAPIにアクセスでき、活発な開発と充実したドキュメントが整っているため選ばれました。

![Android PWAをCapacitorに移行](/images/engineering-notes/medium/e64b923284c0/003-0-2oz1atirxy-1lvqb.webp)

### 比較：ネイティブAndroid、PWABuilder、Capacitor.js

ネイティブAndroid開発は、すべてのAndroid機能とAPIに完全にアクセスでき、高いパフォーマンスを発揮し、UIや機能に対して細かな制御が可能です。しかし、JavaまたはKotlinの専門知識が必要であり、プラットフォームごとに別々のコードベースを管理する必要があり、開発コストと時間が高くなるという課題があります。

PWABuilderは、最小限の設定でPWAをネイティブアプリに変換でき、簡単なアプリやネイティブ機能が限定的な用途に適しています。しかし、デバイスのネイティブ機能へのアクセスが制限され、完全なネイティブアプリほどのパフォーマンスが得られない可能性があり、サードパーティの変換サービスに依存するという欠点があります。

Capacitor.jsは、クロスプラットフォームで単一のコードベースを維持しつつ、ネイティブAPIやプラグインにアクセスでき、モダンなWeb開発ツールやフレームワークをサポートし、活発なコミュニティによる継続的な更新が特徴です。ただし、Webとネイティブの橋渡しに慣れていない場合の学習コストがわずかに発生し、一部のネイティブ機能は依然としてカスタムプラグインを必要とする場合があります。

### 技術的実装

Androidアプリは、Capacitor.jsとGitHub Actionsを使用してネイティブに構築されています。実装では、GitHub Actionsのワークフロー、Capacitorの設定、Androidのマニフェストファイル、スプラッシュスクリーン画像、アプリアイコン、ビルドスクリプトが追加されました。変更の詳細は、[GitHubのプルリクエスト](https://github.com/Adamant-im/adamant-im/pull/515)で確認できます。

![Android PWAをCapacitorに移行](/images/engineering-notes/medium/e64b923284c0/004-0-jzpjysc-tuu83qyr.webp)
