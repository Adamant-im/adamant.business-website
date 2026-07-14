---
title: "新ADMコンソール — コマンドラインツール"
slug: "new-adm-console-command-line-tool-23c6e6b7b970"
description: "ADAMANTコンソールはADAMANTブロックチェーンと連携するためのコマンドラインツールで、バージョン2.0.0で全面的に再設計されました。既存のJSおよびNode APIに加え、アカウント作成、トークン送信、メッセージ送信、デリゲート登録が可能。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-adm-console-command-line-tool-23c6e6b7b970"
publishedAt: "2022-07-18T11:14:07.081Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/23c6e6b7b970/001-0-c431kvn9ybiqfp7j.webp"
cardSpan: "full"
originalId: "medium:23c6e6b7b970"
locale: "ja"
placeholder: false
---

ADAMANTコンソールは、ADAMANTブロックチェーンと連携するためのコマンドラインツールであり、バージョン2.0.0で完全に再設計されました。既存のJSおよびNode APIに加えて、ユーザーはアカウントの作成、トークンの送信、メッセージの送信、デリゲートの登録を行うことができます。

このツールはスタンドアロンのコマンドラインインターフェースとして、またNodeJSライブラリとしても機能するため、外部スクリプトやアプリケーションへの統合に適しています。開発者は、新しいメッセージ復号化機能を活用して、メッセンジャーやブロックチェーンベースの二要素認証システムなど、本格的な分散型アプリケーションの構築にコンソールを利用できます。

2.0.0リリースはコードベースの完全なリファクタリングを意味し、現在は`adamant-api`パッケージを使用しています。インタラクティブモード、コマンド用の組み込みヘルプ、依存関係の更新、および各種バグ修正が導入されています。
