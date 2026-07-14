---
title: "ADAMANT Market-Making Bot：より安全で賢明なスプレッドサポート"
slug: "adamant-market-making-bot-a-safer-smarter-spread-support-aef80292b22c"
description: "スプレッドサポート（SS）注文はADAMANT Market-Making Botの強力な機能ですが、取り扱いが難しい面もあります。今回のアップデートで安全性と可視性が向上しました。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-market-making-bot-a-safer-smarter-spread-support-aef80292b22c"
publishedAt: "2026-03-31T18:05:33.126Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/aef80292b22c/001-1-yjio7wtzsgsnwh-gu1vzpa-png.webp"
cardSpan: "full"
originalId: "medium:aef80292b22c"
locale: "ja"
placeholder: false
---

スプレッドサポート（SS）流動性注文は、ADAMANT Market-Making Botのもつ最も強力な機能の一つですが、同時に最も繊細な部分でもあります。これらの注文はスプレッドを狭く保ち、注文帳を健全にしますが、単純なリフィルロジックでは悪用される可能性があります。リフィルループがリスク暴露を再生成し、変動相場が注文配置を歪め、一方的な価格変動が本来有用な仕組みを回避可能なリスクの源に変えてしまうことがあります。

このアップデートでは、以下の3段階の改善によりこの問題に対処します：専用のシミュレーションツールの導入、スプレッドサポートとセーフ流動性をオプションのサブモジュールとして分離、そして無制限な損失ループを生み出す可能性のある従来の繰り返しリフィルロジックを、スプレッドを維持しつつ損失を制限する「ミラーストラテジー」に置き換えます。

### なぜこのアップデートが重要なのか

流動性ロジックは、市場のストレス下でも予測可能な挙動を示すべきです。平均的な買い・売り価格を自然に尊重するデプスベースの流動性とは異なり、SS注文はスプレッドそのものを支えるために存在します。このため、悪意ある約定、急激な方向性のある価格変動、平穏な相場では機能するが変動相場では破綻する配置ルールに対して敏感になります。今回のリリースは、スプレッドサポートを有用に保ちつつ、それが無制限のリスク源になることを防ぐことに焦点を当てています。

### フェーズ1：シミュレーションおよび可視化ツール

コアロジックを変更する前に、制御された環境でSSの挙動を検査できるスタンドアロンツールが構築されました。このツールは `trade/tests/liquidity_test.js` と `trade/tests/liquidity_test.html` からなり、Express + Socket.ioアプリケーションとして動作します。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/002-1-idogwktarx9lftmrmbspow-png.webp)

**ペーパーモード**では、ツールはメモリ内に単一の注文帳スナップショットを保持します。SSのイテレーションは手動でトリガーでき、価格レベルをクリックするとそのレベルまでのすべての注文が完全に約定された状態をシミュレートでき、エッジケースを再現して反応を検査しやすくなります。

**ライブモード**では、ツールは取引所から注文帳を継続的に更新し、実際の `ordersDb` レコードと連携します。イテレーションは依然として手動でトリガーされますが、環境は実際の市場状況を反映します。

HTMLインターフェースには、外部注文、デプス流動性、SS注文、ミラー注文を色分けして表示する注文帳テーブルが含まれています。統計パネルでは、サイドごとの未約定・約定・キャンセルされたSS注文数、買い・売りのVWAP値、イテレーションごとの差分（Delta）を表示します。読み取り専用の `tradeParams` パネルはアクティブなランタイム状態を表示し、手動コントロールによりオペレーターがSSイテレーションを実行し、状態の変化を確認、セル値をコピーできます。各イテレーションで変更点がハイライトされるため、ログから推測するのではなく、流動性の挙動を直接観察できるようになります。

### フェーズ2：セーフ流動性とスプレッドサポートをオプションモジュールとして分離

従来、コアのセーフ流動性状態とSS配置ロジックは `mm_liquidity_provider` 内にあり、複数の関心事項が密接に結合されていました。今回のリリースでは、これらを2つの専用モジュールに分離します：`trade/mm_liquidity_safe.js` と `trade/mm_liquidity_ss.js`。

セーフ流動性モジュールは `liqLimits` 状態と関連するすべてのヘルパー（`updateLiqLimits`、`loadLiqLimits`、`storeLiqLimits`、`resetLiqLimits`、`getLiqLimits`、`getVwapRangeString`）をカプセル化します。`subPurpose === 'depth'` フィルターを使用してデプスの約定のみを処理し、デプスベースの実行履歴とそこから導出される制限に集中できるようにします。

スプレッドサポートモジュールは、`updateSsLiquidity(liquidityOrders, orderBookInfo)`、`updateSsVwap()`、SS価格ロジック、SS注文数の上限、ミラー配置ロジックなど、SSの挙動をカプセル化します。サイドごとの最小・最大SS注文数などの定数もここに移動されました。

メインの `mm_liquidity_provider.js` は、`utils.softRequire()` を通じて両モジュールを読み込みます。これらのモジュールはオプションです。どちらかが欠けていても、ボットは正しく動作します。デプス流動性は引き続き機能します。`mm_liquidity_safe` が存在しない場合、セーフ流動性の制限は単に無効になります。`mm_liquidity_ss` が存在しない場合、スプレッドサポートは無効になります。クラッシュも、フローの破損も、別個のコード分岐も不要です。

また、プロバイダーは、SSモジュールが存在する場合に、SS固有のクロージングルールをそのモジュールに委譲し、インラインのSS配置ループを `ss.updateSsLiquidity()` に置き換え、SS配置後に注文帳を更新することで、デプス注文が最新の中間価格を使用できるようにし、配置の一貫性を向上させます。

### フェーズ3：リフィルループを制限付きミラーストラテジーに置き換え

これがコアの挙動変更です。従来の繰り返しリフィルパターンは、特定の約定シナリオ下で望ましくない形でリスク暴露を繰り返し再生成する可能性がありました。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/003-1-747lh26q3v79vk3xcekrvq-png.webp)

#### コアのミラー規則

通常のSS注文が約定された場合、ボットは同じ数量で反対側に**ミラー注文**を、対称価格に配置します。**同じ側に再び注文を配置しません**。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/004-1-fwgdzzeu-axrb9noqz-o2q-png.webp)

流動性が消費された場所に無限にリフィルするのではなく、システムは約定を認識し、スプレッドを挟んで制限された対応注文を配置します。これにより、同じ側への無限の補充ループを生み出さずに市場をタイトに保ちます。

#### ミラー注文の特性

ミラー注文は、`subType: 'mirrored'`、`subTypeString: ' (ss mirrored)'`、`priceCorrected: true` で明示的にマークされます。`priceCorrected` フィールドにより、既存の `closeLiquidityOrders` ロジックは、通常のSSスプレッド範囲外にあっても有効なミラー注文をスキップできます。これにより、ミラー注文は適切な場所に残り続け、別途キャンセル経路を設ける必要がなくなります。

#### カスケード防止

ミラー化ロジックにおける大きな危険は、再帰的な挙動です。ミラー注文が約定され、さらにそのミラーが生成され、それがまた約定される…という連鎖です。これは明示的にブロックされます。約定されたミラー注文は、さらにミラー化されません。モジュールは `subType` をチェックし、一度ミラーが生成されると、元の注文は「ミラー元」としてマークされ、カスケードチェーンを防止してメカニズムを制限内に保ちます。

#### リスク管理

**ミラー距離の上限。** 数学的に「正しい」ミラー価格が中間価格から遠すぎる場合、ボットはその価格に盲目的に注文するのではなく、SSスプレッドの端に近い制限された価格にフォールバックします。これにより、ミラー注文が意味のある流動性行動から乖離するのを防ぎます。

**VWAP関連性ガード。** SSは現在、`subPurpose: 'ss'` でキー付けされた専用の `fillsEngine` エポックを通じて独自の約定統計を維持し、デプス流動性とは別にSSの `buyVWAP` と `sellVWAP` を追跡します。SSのVWAPが現在の中間価格から2%以上乖離した場合、それは古くなったと見なされ、配置制約では無視されます。これは強い方向性の反転後、古いVWAPのアンカーがSSロジックを市場の一方に閉じ込めてしまうのを防ぐ上で重要です。

**広スプレッド時の緩和。** 変動相場では、外部スプレッドが意図されたSSゾーンよりも一時的に大幅に広がることがあります。そのような場合、定義された倍率で広がったとき、ミラーの占有チェックが緩和され、厳格な配置前提が市場に合わなくなっても、スプレッドサポートが凍結せずに継続して動作できるようになります。

**新しい通常SS配置の制限。** 通常のSS配置は、VWAPが関連する場合にそれを尊重するようになりました。新しい通常の買い注文はSS `buyVWAP` よりも下に、新しい通常の売り注文はSS `sellVWAP` よりも上に配置され、次第に不利な価格レベルで繰り返し新たなリスクを追加する可能性が低くなります。

### 可観測性とオペレーター制御の改善

`/stats` コマンドは、`parseCommandParams` を通じてペアを検証するようになり、デフォルトペアだけでなく任意のペアまたはパーペチュアルティッカーを受け入れるようになります。24時間スプレッド値は太字で表示され、`volumeInCoin2` には安定した精度が使用されます。取引高と約定注文統計はデフォルトペアに対してのみ表示され、ラダー（`ld`）注文が約定注文統計に含まれるようになります。また、Notesセクションが追加されました。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/005-1-h4suuocfjjiiwmrko04igq-png.webp)

新しい豊富な流動性統計ビューが `/orders liq full` で利用可能になりました。これには、ステータス、スプレッドパラメータ、注文数、未約定数量、セーフ流動性制限、約定履歴を含むデプス流動性ブロック；SSスプレッド範囲、注文サイズ制限、通常およびミラー注文数、SS約定統計、VWAP、MTM PnLを含むスプレッドサポートブロック；デプスとSSの約定データを集計した合計ブロック；現在の流動性エポックの開始時刻；取引所の最小注文情報；再利用可能なデプスヘルパーによる現在の注文帳情報が含まれます。約定統計テーブルはコンパクトな4列レイアウト（ラベル、Buy、Sell、Delta）を使用します。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/006-1-bnw14f3hsjeoscgu6x3y0g-png.webp)

通常の `/orders liq` リストは、部分的に約定された注文の約定率を表示するようになり、`subPurpose` および `subType` ラベル（例：`ss, mirrored`）を含めるようになりました。`/orderbook` コマンドには、ライブの `ordersDb` レコードから導出される、各価格レベルに対応するボットモジュールを示す新しい **Purpose** 列が追加されました。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/007-1-m8b7g-dtzbkcqrovk8i-0w-png.webp)

`/enable liq` コマンドは、流動性パラメータを変更する前に確認ステップを追加し、ビルド機能を検証するようになりました：`mm_liquidity_safe` が存在しない場合、デプス範囲表記は拒否され、`mm_liquidity_ss` が存在しない場合、SSパラメータは明確なメッセージとともに拒否されます。新しい `/enable liq reset` サブコマンドは、確認後に `mm_liquidityInitTs` をリセットし、`liqLimits` をクリアしてVWAPエポックを再開します。

手動の `/buy` および `/sell` コマンドには安全性の改善が加えられました：要求された注文価格が市場価格から1000%以上乖離している場合、ボットは停止し、`/y` による確認を求めます。これにより、極端な価格での注文を誤って出すことを防ぎます。`/account` コマンドは、取引所APIからの空の手数料リストをより適切に処理できるようになりました。

### ブレーキングチェンジなし

`mm_liquidity_safe` および `mm_liquidity_ss` はどちらもオプションです。どちらかが欠けていても、`mm_liquidity_provider` はデプス流動性を有効にしたまま正しく動作します。フォーマットレベルでの唯一の進化は、`fillsEngine` 統計キーにオプションの `:<subPurpose>` セグメントが含まれる可能性があることですが、そのセグメントのない既存レコードは有効で、影響を受けません。

### まとめ

このアップデートは3つのことを実現しています。シミュレーションツールを通じてスプレッドサポートを可視化し、隠れた流動性の挙動を検査可能かつ再生可能なものにしました。セーフ流動性とSSを単一のプロバイダーから分離することで、スプレッドサポートをモジュール化しました。そして何より重要なのは、繰り返しリフィルモデルを、スプレッドを維持しつつ暴走する損失ループを防ぐ制限付きミラーストラテジーに置き換えたことで、スプレッドサポートをより安全にしたことです。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/008-1-mnimve9mbrwsscd6m9gllq-png.webp)

マーケットメイキングシステムにとって、これは正しい方向性です。単に活動量を増やすのではなく、実際の市場の圧力下でより賢明な挙動を実現すること。スプレッドサポートは今や、より理解しやすく、保守しやすく、悪用されにくくなりました。
