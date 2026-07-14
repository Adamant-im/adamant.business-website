---
title: "Moving Android PWA to Capacitor"
slug: "moving-android-pwa-to-capacitor-e64b923284c0"
description: "Previously, the ADAMANT Android app was built using PWABuilder, which imposed several limitations: no control over the target API level, no access to native code, and no automat…"
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
locale: "en"
placeholder: false
---

Previously, the ADAMANT Android app was built using PWABuilder, which imposed several limitations: no control over the target API level, no access to native code, and no automation support. With the PWA v4.7 update, the app moved to Capacitor.js to gain full control of native code, the ability to run native functionality such as push notifications and camera via the Cordova API, code optimization, custom plugins, and CI/CD automation.

![Moving Android PWA to Capacitor](/images/engineering-notes/medium/e64b923284c0/002-0-l2l0siac7nx7sixj.webp)

### Why Capacitor.js?

ADAMANT Messenger is a decentralized messaging platform that prioritizes performance, security, and maintainability. Capacitor.js was chosen because it integrates seamlessly with modern web frameworks like Vue.js, enables a single codebase across iOS, Android, and the web, provides access to native APIs without sacrificing the web experience, and benefits from active development and robust documentation.

![Moving Android PWA to Capacitor](/images/engineering-notes/medium/e64b923284c0/003-0-2oz1atirxy-1lvqb.webp)

### Comparison: Native Android, PWABuilder, and Capacitor.js

Native Android development offers full access to all Android features and APIs, high performance, and granular control over UI and functionality, but it requires Java or Kotlin expertise, a separate codebase per platform, and higher development cost and time.

PWABuilder makes it easy to convert a PWA into a native app with minimal setup and quick deployment, which suits simple apps with limited native functionality. However, it provides limited access to native device features, performance that may not match fully native apps, and a dependency on a third-party conversion service.

Capacitor.js provides a cross-platform single codebase with access to native APIs and plugins, support for modern web development tools and frameworks, and an active community with continuous updates. The trade-offs are a slight learning curve for those unfamiliar with web-native bridges, and some native functionality may still require custom plugins.

### Technical Implementation

The Android app is built natively using Capacitor.js and GitHub Actions. The implementation added a GitHub Actions workflow, Capacitor configuration, Android manifest files, splash screen images and app icons, and a build script. The full changes are available in the [pull request on GitHub](https://github.com/Adamant-im/adamant-im/pull/515).

![Moving Android PWA to Capacitor](/images/engineering-notes/medium/e64b923284c0/004-0-jzpjysc-tuu83qyr.webp)
