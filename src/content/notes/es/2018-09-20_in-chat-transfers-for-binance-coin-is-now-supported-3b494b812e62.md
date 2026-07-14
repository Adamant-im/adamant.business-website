---
title: "Transferencias en el chat para Binance Coin ahora admitidas en ADAMANT"
slug: "in-chat-transfers-for-binance-coin-is-now-supported-3b494b812e62"
description: "ADAMANT es una plataforma descentralizada de mensajería con funciones integradas de transferencia de criptomonedas, no solo un messenger. Tras finalizar las transferencias en el chat de Ethereum a principios de año, la plataforma ahora también admite transferencias en el chat de Binance Coin (BNB)."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/in-chat-transfers-for-binance-coin-is-now-supported-3b494b812e62"
publishedAt: "2018-09-20T07:18:50.354Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3b494b812e62/001-0-n7sxgkakooow6ma9.webp"
cardSpan: "full"
originalId: "medium:3b494b812e62"
locale: "es"
placeholder: false
---

ADAMANT es una plataforma descentralizada de mensajería con funcionalidad integrada de transferencia de criptomonedas, no meramente un messenger. Tras la finalización de las transferencias en el chat de Ethereum a principios de este año, la plataforma ahora también admite transferencias en el chat de Binance Coin (BNB).

Binance Coin es un token lanzado por Binance, el exchange de criptomonedas más grande del mundo, y puede utilizarse para obtener privilegios en dicha plataforma. Admitir BNB sirve como punto de partida hacia una integración más amplia de tokens ERC20 dentro de ADAMANT. La elección de Binance Coin también se basó en el hecho de que el token ADM está en proceso de ser listado en exchanges, y esta integración ayuda al equipo a comprender mejor la mecánica de los exchanges.

![Transferencias en el chat para Binance Coin ahora admitidas](/images/engineering-notes/medium/3b494b812e62/002-1-lw2mpy0kvqgsvgs68oubog-png.webp)

### Cómo funcionan las transferencias en el chat de BNB

Para enviar BNB en el chat, primero debes recargar tu billetera de BNB dentro de ADAMANT Messenger. Esto puede hacerse transfiriendo BNB desde cualquier otra billetera (como MyEtherWallet) o desde un exchange como Binance. La dirección de tu billetera de Binance Coin está disponible en la pestaña "Wallet", donde puedes copiarla pulsando el icono de copiar.

![Transferencias en el chat para Binance Coin ahora admitidas](/images/engineering-notes/medium/3b494b812e62/003-1-cktw266pvgmcz6vcdip4g-png.webp)

Para realizar una transferencia, abre un chat con el destinatario, haz clic en el signo más a la izquierda del campo de entrada de mensajes, selecciona "Send BNB", introduce la cantidad y confirma la transacción.

Una nota técnica importante: dado que BNB es un token ERC20, las transferencias requieren Ether para pagar las tarifas de red. Debes tener algo de ETH en tu billetera de ADAMANT para completar las transferencias de BNB.

### Seguridad

La compatibilidad con Binance Coin se implementa con los mismos principios de seguridad que el soporte para Ethereum. Solo el usuario posee sus billeteras dentro de su cuenta de ADAMANT; la plataforma no custodia fondos. El equipo ha completado una auditoría interna de seguridad y lanzó un concurso de seguridad, con una auditoría externa independiente planeada como próximo paso.
