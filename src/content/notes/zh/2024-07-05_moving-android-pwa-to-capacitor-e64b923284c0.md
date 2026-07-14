---
title: "将 Android PWA 迁移到 Capacitor"
slug: "moving-android-pwa-to-capacitor-e64b923284c0"
description: "此前，ADAMANT Android 应用使用 PWABuilder 构建，存在诸多限制：无法控制目标 API 级别、无法访问原生代码、缺乏自动化支持。迁移至 Capacitor 后实现了全面优化。"
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
locale: "zh"
placeholder: false
---

此前，ADAMANT Android 应用使用 PWABuilder 构建，这带来了一些限制：无法控制目标 API 级别、无法访问原生代码，且缺乏自动化支持。随着 PWA v4.7 版本的更新，应用已迁移到 Capacitor.js，从而实现了对原生代码的完全控制，能够通过 Cordova API 运行推送通知和摄像头等原生功能，优化代码，开发自定义插件，并实现 CI/CD 自动化。

![将 Android PWA 迁移到 Capacitor](/images/engineering-notes/medium/e64b923284c0/002-0-l2l0siac7nx7sixj.webp)

### 为何选择 Capacitor.js？

ADAMANT Messenger 是一个去中心化消息平台，高度重视性能、安全性和可维护性。选择 Capacitor.js 是因为它能与 Vue.js 等现代 Web 框架无缝集成，支持在 iOS、Android 和 Web 上使用单一代码库，提供对原生 API 的访问能力，同时不牺牲 Web 体验，并且拥有活跃的开发社区和完善的文档支持。

![将 Android PWA 迁移到 Capacitor](/images/engineering-notes/medium/e64b923284c0/003-0-2oz1atirxy-1lvqb.webp)

### 对比：原生 Android、PWABuilder 与 Capacitor.js

原生 Android 开发可完全访问所有 Android 特性和 API，性能高，对 UI 和功能有精细控制，但需要掌握 Java 或 Kotlin，每个平台需维护独立代码库，开发成本和时间较高。

PWABuilder 可轻松将 PWA 转换为原生应用，设置简单、部署快速，适合原生功能有限的简单应用。但其对设备原生功能的访问受限，性能可能不及完全原生应用，且依赖第三方转换服务。

Capacitor.js 支持跨平台单一代码库，可访问原生 API 和插件，兼容现代 Web 开发工具和框架，并拥有活跃社区和持续更新。其权衡在于，对不熟悉 Web-原生桥接的开发者有一定学习曲线，部分原生功能仍需开发自定义插件。

### 技术实现

该 Android 应用使用 Capacitor.js 和 GitHub Actions 原生构建。实现过程中新增了 GitHub Actions 工作流、Capacitor 配置、Android 清单文件、启动图和应用图标，以及构建脚本。完整变更可在 [GitHub 上的拉取请求](https://github.com/Adamant-im/adamant-im/pull/515) 中查看。

![将 Android PWA 迁移到 Capacitor](/images/engineering-notes/medium/e64b923284c0/004-0-jzpjysc-tuu83qyr.webp)
