---
title: "取引リストでの連絡先名とコメント表示 — 更新されたアプリケーションで"
slug: "contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
description: "ADAMANTウェブメッセンジャーv2.6.0の更新により、取引リストがより情報豊かに。転送コメントや連絡先名が直接表示されるようになります。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
publishedAt: "2020-06-10T06:44:48.139Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/bf6de06943b0/001-0-q5zuwj-pur7a9hdb.webp"
cardSpan: "full"
originalId: "medium:bf6de06943b0"
locale: "ja"
placeholder: false
---

ADAMANTウェブメッセンジャーv2.6.0のアップデートにより、取引リストがより情報豊かになりました。送金のコメントがリスト内ですぐに確認できるようになり、アドレスとともに連絡先名が表示されるようになります。また、各取引エントリーには対応するチャットを開くためのショートカットが用意されています。取引詳細ビューも更新され、コメントや連絡先名が表示されるようになり、ユーザー自身のアドレスは明確に「自分」とラベル付けされます。他の暗号通貨を含む取引についても、取引リストにADMアドレスと連絡先名が表示され、同じチャットショートカットが利用可能です。

![取引リストでの連絡先名とコメント表示 — 更新されたアプリケーションで](/images/engineering-notes/medium/bf6de06943b0/002-0-nu76kd5rli905hye.webp)

ログインの永続性設定が明確化されました：従来の「タブを閉じるとログアウト」は、「ログイン状態を維持する」というより明確なオプションに置き換えられました。ダークモードがデフォルトのテーマとして設定されるようになりました。セキュリティ面では、メッセージ内のリンクやユーザーのパスワードに関するドキュメントリンクが、タブナッビングを防ぐために`noopener`付きで新しいウィンドウで開くようになっています。プッシュ通知の不具合も本リリースで修正されています。

完全な変更履歴は[ADAMANT GitHubリリースページ](https://github.com/Adamant-im/adamant-im/releases/tag/v2.6.0)でご確認いただけます。
