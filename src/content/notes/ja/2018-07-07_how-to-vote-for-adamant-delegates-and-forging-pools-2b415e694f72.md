---
title: "ADAMANTのデリゲートおよびフォージングプールへの投票方法"
slug: "how-to-vote-for-adamant-delegates-and-forging-pools-2b415e694f72"
description: "ADAMANTはdPoS合意アルゴリズムを使用。上位101位のデリゲートがブロックをフォージし、手数料を獲得します。個人やプールへの投票方法を解説。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-vote-for-adamant-delegates-2b415e694f72"
publishedAt: "2018-07-07T10:22:13.190Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/2b415e694f72/001-1-jsqq-as0cou1-vtdcisj4w-png.webp"
cardSpan: "full"
originalId: "medium:2b415e694f72"
locale: "ja"
placeholder: false
---

ADAMANTは、ブロックチェーンの合意プロトコルとして委任型プルーフオブステーク（dPoS）を使用しています。アクティブなスロットで上位101位にランクインしたデリゲートがブロックをフォージし、トランザクション手数料を獲得します。フォージングプール自体もデリゲートであるため、個人のデリゲートを支持する場合でもプールを支持する場合でも、同じ投票プロセスが適用されます。自分の所有するデリゲートを含め、任意のデリゲートに投票できます。

### 前提条件

50 ADM以上を保有するアカウントであれば誰でも投票できます。投票手数料は、投票するデリゲートの数に関わらず（一度に最大30まで）50 ADMで、アカウントから差し引かれ、現在のデリゲートによってフォージされます。アップボートで支持を追加し、ダウンボートで以前の投票を取り下げることができます。

### Webウォレットからの投票

[msg.adamant.im](https://msg.adamant.im) にログインし、**設定 → デリゲートに投票** に移動します。この画面では、登録されたすべてのADAMANTデリゲートが名前、ランク、および現在のあなたの投票状況とともに表示されます。

![ADAMANTのデリゲートおよびフォージングプールへの投票方法](/images/engineering-notes/medium/2b415e694f72/002-1-zrnvu6rsipsvzlhrc0w5aa-png.webp)

**名前** 列には登録されたデリゲート名が、**ランク** 列にはその順位が表示されます。ブロックをフォージできるのは上位101位までのデリゲートのみです。デリゲート名をクリックすると、それを支持するかどうか判断するための追加情報が表示されます。

親指アイコンのアップとダウンを使って、デリゲートをアップボートまたはダウンボートし、その後 **投票内容を確認** をクリックして選択を確認し、**投票** をクリックして変更を適用します。

![ADAMANTのデリゲートおよびフォージングプールへの投票方法](/images/engineering-notes/medium/2b415e694f72/003-1-topby8sxxwodlqzftbiwjg-png.webp)

### コンソールからの投票

投票は [ADAMANT Console](https://github.com/Adamant-im/adamant-console/wiki/Available-Commands#vote) を通じて行うことも可能です。この方法は上級ユーザー向けであり、通常のウォレットユーザーには推奨されません。

さらに詳しい情報については、ADAMANTのドキュメントの[フォージング](https://medium.com/adamant-im/earning-money-on-adm-forging-4c7b6eb15516)および[デリゲートになる方法](https://medium.com/adamant-im/how-to-become-an-adamant-delegate-745f01d032f)を参照してください。
