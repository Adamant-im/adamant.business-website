---
title: "AIP-17: ADAMANT Messengerによるブロックチェーン上のメッセージリアクション"
slug: "unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
description: "AIP-17は、これまでのブロックチェーンメッセージアプリにない、絵文字リアクション機能をADAMANT Messengerに導入します。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
publishedAt: "2023-09-15T10:09:07.924Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/857b07759524/001-0-tn1uulgukvtmgwym.webp"
cardSpan: "full"
originalId: "medium:857b07759524"
locale: "ja"
placeholder: false
---

ADAMANT Improvement Proposal 17（AIP-17）は、ADAMANT Messengerにおけるメッセージに対する絵文字ベースのリアクションを導入します。これは、これまでのどのブロックチェーンメッセージアプリにも存在しなかった機能です。本提案では、既存のメッセージインフラに統合される標準化されたリアクション構造を定義しています。

## 仕組み

リアクションは、AIP-5（リッチコンテンツメッセージ）で確立された規則に従い、ADMリッチメッセージとして送信されます。新しい必須フィールド `reactto_id` は、リアクション対象のメッセージのトランザクションIDを識別します。もう一つのフィールド `react_message` は、ユーザーが選択した絵文字を格納します。リアクションは作成後に編集または削除できます。

リアクションのペイロードは以下のようになります：

```json
{
  "reactto_id": "Transaction_ID",
  "react_message": "👍"
}
```

すべてのリアクションは、IDによって他のトランザクションを参照するオンチェーントランザクションそのものであるため、本方式はADAMANTの既存の監査可能性と分散化モデルを維持しつつ、標準的なチャットメッセージに軽量な表現層を追加しています。

実装は、すべてのプラットフォームでADAMANTアプリに適用される予定です。技術的な議論および完全な提案内容は、[AIP-17 proposal page](https://github.com/Adamant-im/AIPs/issues/52)で確認できます。

![AIP-17: ADAMANT Messengerによるブロックチェーン上のメッセージリアクション](/images/engineering-notes/medium/857b07759524/002-1-zslip-kei08fk54o3-u34q-png.webp)
