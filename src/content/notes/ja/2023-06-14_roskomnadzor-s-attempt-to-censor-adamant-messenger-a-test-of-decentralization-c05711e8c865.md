---
title: "ロスコムナドゾルによるADAMANT Messengerの検閲試み：分散化のテスト"
slug: "roskomnadzor-s-attempt-to-censor-adamant-messenger-a-test-of-decentralization-c05711e8c865"
description: "ロスコムナドゾルがADAMANT Messengerのウェブサイトをブロックしようとしたが、ADAMANTチームによれば、これは分散化の強靭性を逆に示す結果となった。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/roskomnadzors-attempt-to-censor-adamant-messenger-a-test-of-decentralization-c05711e8c865"
publishedAt: "2023-06-14T07:54:33.044Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/c05711e8c865/001-0-jwcvr-n50oxiub1g.webp"
cardSpan: "full"
originalId: "medium:c05711e8c865"
locale: "ja"
placeholder: false
---

ロスコムナドゾル、すなわちロシア連邦のメディア監督機関は、ADAMANT Messengerのウェブサイトをブロックするよう試みました。ADAMANTチームによると、この行動は、プラットフォームのアーキテクチャが標的となる中央制御ポイントを存在させないため、分散化の回復力の高さを逆に浮き彫りにしたにすぎません。

![Roskomnadzor's Attempt to Censor ADAMANT Messenger: A Test of Decentralization](/images/engineering-notes/medium/c05711e8c865/002-0-huj1r-ko7v6mmyj2.webp)

![Roskomnadzor's Attempt to Censor ADAMANT Messenger: A Test of Decentralization](/images/engineering-notes/medium/c05711e8c865/003-0-u2rhtpmennkqqq87.webp)

## ADAMANTに対して検閲が非現実的な理由

ADAMANT Messengerは、第三者のインフラに依存しないコミュニケーションプラットフォームを提供するためにブロックチェーン技術を利用しています。中央サーバーにデータを保存する従来のメッセージアプリとは異なり、ADAMANTはメッセージを個別に運営される複数のノードからなるネットワーク上に分散して保存します。つまり、停止すべき中央サーバーも、データを制御する単一の組織も存在しません。

ADAMANTチームの反応は明確でした。「検閲は不可能です。ADAMANTは真に分散型のプロトコルです。これは単なる主張ではなく、私たちのプラットフォームの基盤に組み込まれた機能です。」これらの特性は、通常のインターネット（clearnet）およびTor経由で利用可能な、プラットフォームの利用規約に記載されています。

![Roskomnadzor's Attempt to Censor ADAMANT Messenger: A Test of Decentralization](/images/engineering-notes/medium/c05711e8c865/004-0-xm12prccf1rsvrxa.webp)

## ADAMANT財団

ロスコムナドゾルの要求書には「ADAMANT TECH LABS」という組織名が記載されていましたが、この組織はすでに存在しません。2020年12月以降、ADAMANTはリーダーや中央管理を持たない財団として運営されています。オープンソースプロジェクトはGitHub上の開発者コミュニティによって維持されています。

![Roskomnadzor's Attempt to Censor ADAMANT Messenger: A Test of Decentralization](/images/engineering-notes/medium/c05711e8c865/005-0-ptiedse-rssglttj.webp)

## ロシア国内のユーザーへの影響

公式ウェブサイトがブロックされたとしても、ADAMANTプロトコルは引き続き正常に機能しています。メッセージが中央サーバーではなく複数の独立したノードに分散して保存されているため、ネットワークにはオフラインにできる単一のエンドポイントが存在しません。この出来事は、ADAMANTの分散化の主張に対する現実世界でのストレステストとなり、システムは一貫して運用可能でした。

ロシアのユーザーは、公式サイト、WebアプリのURL、および `adamant.im` の下にあるパブリックノードがアクセス不能になる可能性があることを認識しておく必要があります。一時的な回避策として、VPNまたはTorネットワーク経由での接続が可能です。Windows、Linux、macOS向けのデスクトップアプリはプロジェクトのGitHubリリースから入手可能で、Webフロントエンドに依存せずにプロトコルに直接接続できます。

恒久的な解決策として、ユーザーは構成でAPIを有効にした独自のADAMANTノードを立ち上げ、オープンソースリポジトリからMessengerのインスタンスを自分で実行し、Messengerの設定ファイルをその自己ホストされたノードに指し向けることができます。これにより、ブロックされる可能性のあるパブリックインフラへの依存が排除されます。

## 結論

ロスコムナドゾルによるブロックは、デジタル通信を統制しようとする国家当局と、そのような統制に耐えるように設計された分散型プラットフォームとの間の継続的な対立を浮き彫りにしています。ADAMANTにとっては、この出来事は、主なWebプレゼンスがオフラインになっても、ブロックチェーンベースのメッセージプロトコルが引き続き動作できることを実証する実践的な機会となりました。ADAMANTチームは、プラットフォームの改善と、世界中での安全でプライベートかつ検閲のない通信の実現に向けた取り組みを改めて表明しています。
