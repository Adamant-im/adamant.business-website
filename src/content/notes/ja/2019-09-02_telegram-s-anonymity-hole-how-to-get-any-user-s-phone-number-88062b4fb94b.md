---
title: "Telegramの匿名性の穴：任意のユーザーの電話番号を取得する方法"
slug: "telegram-s-anonymity-hole-how-to-get-any-user-s-phone-number-88062b4fb94b"
description: "Telegramはメッセージ開始に電話番号を要求し、すべてのメッセージをユーザーの身元に結びつける。この仕組みは時代遅れで、重大なプライバシーリスクを伴う。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/telegrams-anonymity-hole-how-to-get-any-user-s-phone-number-88062b4fb94b"
publishedAt: "2019-09-02T08:18:08.034Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/88062b4fb94b/001-0-mhckpcqqduw4kpcb.webp"
cardSpan: "full"
originalId: "medium:88062b4fb94b"
locale: "ja"
placeholder: false
---

Telegramはメッセージの送信を開始する際に電話番号を必要とし、すべてのメッセージをユーザーの身元に紐づけます。この仕組みは時代遅れであるだけでなく、重大なプライバシー上のリスクを引き起こします。そのような脆弱性の一つとして、アプリの連絡先同期機能を悪用することで、Telegramグループ内の任意のユーザーの電話番号を第三者が取得できる問題があります。

たとえば、「Sergey Lebedev」という対象ユーザーが表示されているオープンなグループチャットを想定します。

![Telegramの匿名性の穴：任意のユーザーの電話番号を取得する方法](/images/engineering-notes/medium/88062b4fb94b/002-0-fcieyaa3mo5op3nv.webp)

アプリから退出した後、端末のネイティブな連絡先帳に推測した電話番号で新しい連絡先を追加することで、その番号がTelegramユーザーに登録されているかどうかをテストできます。

![Telegramの匿名性の穴：任意のユーザーの電話番号を取得する方法](/images/engineering-notes/medium/88062b4fb94b/003-0-usc809xtvbg9yqgn.webp)

次に、Telegramのプライバシー設定（設定 — プライバシーとセキュリティ）で連絡先の同期が有効になっていることを確認します。この機能により、端末の連絡先に登録された番号がTelegramに登録されている場合、自動的にアプリに追加されます。

![Telegramの匿名性の穴：任意のユーザーの電話番号を取得する方法](/images/engineering-notes/medium/88062b4fb94b/004-0-bpxhl6k-bs5uhotz.webp)

推測した電話番号がTelegramに登録されている場合、アプリはそのユーザーを連絡先リストに追加します。この例では、推測した番号が正しかったことがわかります。

![Telegramの匿名性の穴：任意のユーザーの電話番号を取得する方法](/images/engineering-notes/medium/88062b4fb94b/005-0-ajrqdbdxby-cjw0f.webp)

その後、Telegramはユーザーの表示名を端末の連絡先帳に設定された名前に上書きします。元のグループチャットに戻ると、「Sergey Lebedev」は「Testing Phone ID」として表示されており、推測した電話番号が本人のものであることが確認できます。

![Telegramの匿名性の穴：任意のユーザーの電話番号を取得する方法](/images/engineering-notes/medium/88062b4fb94b/006-0-qbjxtb52xz7x-fzs.webp)

数百万の電話番号の中から正しい番号を当てるのは非現実的に思えるかもしれませんが、攻撃者は社会工学的手法を用いて対象者の国や通信キャリアを特定することで、候補を大幅に絞り込むことができます。さらに、単純なモバイルアプリによって、多数の電話番号を端末のアドレス帳に自動的に追加するプロセスを実行することが可能であり、ブルートフォースによる発見も現実的な脅威となります。この脆弱性は、著名人、投資家、活動家などにとって特に重大なプライバシーの脅威です。電話番号の登録を必須とするアプリケーションは、見えない形でのプライバシーの代償を伴うことが多いのです。
