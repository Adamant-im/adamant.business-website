---
title: "ADAMANT Messenger：安全なETH送金"
slug: "adamant-messenger-secure-eth-transfers-b27984a3ce05"
description: "ADAMANTがプライベートメッセージングプラットフォーム内に統合されたイーサリアム（ETH）ウォレットのサポートと送金機能を追加。完全に信頼不要な仮想通貨送金がチャット内で可能に。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-secure-eth-transfers-b27984a3ce05"
publishedAt: "2018-06-07T07:30:57.792Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b27984a3ce05/001-0-0qs-wuvvdq6a0uk2.webp"
cardSpan: "full"
originalId: "medium:b27984a3ce05"
locale: "ja"
placeholder: false
---

ADAMANTは、そのプライベートメッセージングプラットフォーム内に、統合されたイーサリアム（ETH）ウォレットのサポートと送金機能を追加しました。この機能により、第三者や仲介者を必要とせずに、チャットシステム内で完全に信頼不要な仮想通貨の送金が可能になります。これは、オープンソースのクライアントサイドアプリケーションであるMyEtherWalletと同様に動作します。ユーザーは自身の秘密鍵を保持し、すべてのトランザクションは、イーサリアムノードに暗号化されて送信される前に、クライアント側で署名されます。

ユーザーがADAMANTネットワークを通じてETHを送信する際、ADAMANT Messengerへのアクセスに使用される同じADAMANTウォレットのパスフレーズから秘密鍵が導出されます。つまり、ADAMANTのパスフレーズが、紐付けられたすべての仮想通貨ウォレットを管理する唯一の鍵となるため、パスフレーズの安全な保管が極めて重要です。ADAMANTは、パスフレーズを紛失またはフィッシングによって侵害された場合、資金の回復やアカウントの凍結を行うことはできません。

![ADAMANT Messenger：安全なETH送金](/images/engineering-notes/medium/b27984a3ce05/002-0-zzoel-pond1fmpkh.webp)

現在開発中なのは、トランザクション履歴の取得に特化したデータベースインデックスを備えた個別のイーサリアムノードです。ADAMANTのインフラストラクチャを信頼したくないユーザーは、そのようなインデックスを備えた独自のイーサリアムノードを実行し、アプリケーション内でそれを選択できます。ADAMANTのすべてのソースコードは、GitHub上で公開されています。

ユーザーがADAMANTアカウントを作成すると、イーサリアムアドレスが生成され、所有権を証明するためにブロックチェーン上にKVS内に公開エントリが記録されます。このトランザクションを記録するには、アカウントが0.001 ADM以上を保有している必要があります。記録されると、チャット内の誰もがブロックチェーンからETHアドレスを照会して支払いを送信でき、別途アドレスを要求する必要がなくなります。

重要なプライバシーの考慮点として、ETHアドレスはブロックチェーン上で公開されているため、特定のADAMANTアドレスがどのETHアドレスと紐付けられているかは誰でも確認できます。これは実世界の身元に直接結びつけることはできませんが、匿名性を気にするユーザーは、ADAMANTアドレスを公開して共有しないようにすべきです。ユーザーはETHウォレットを完全に制御でき、標準的なイーサリアムのガス手数料が適用されながら、資金を他の任意のイーサリアムウォレットに送金できます。
