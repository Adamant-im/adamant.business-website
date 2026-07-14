---
title: "ADAMANT Tradebot v4.3.4"
slug: "release-adamant-tradebot-v4-3-4-50424674"
description: "Esta versión añade soporte para el intercambio P2PB2B y elimina Atomars. El bot ahora obtiene decimales e información de pares comerciales directamente de los intercambios cuando es posible."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v4.3.4"
publishedAt: "2021-09-28T20:06:30Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v4.3.4"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:50424674"
locale: "es"
placeholder: false
---

Esta versión añade soporte para el intercambio P2PB2B y elimina el intercambio Atomars. El bot ahora obtiene los decimales y la información de los pares comerciales directamente de los intercambios cuando es posible, mejorando la confiabilidad en la colocación de órdenes y en los cálculos de saldo.

Las dependencias han sido actualizadas, incluyendo la adopción de ADAMANT JS API v1.1.0. Los comandos han sido actualizados y se ha añadido ESLint al proyecto, acompañado de una refactorización general del código.

Ahora es posible enviar notificaciones a múltiples direcciones. Los saldos y órdenes se guardan por separado para cada remitente, asegurando una gestión de estado más limpia entre múltiples usuarios.
