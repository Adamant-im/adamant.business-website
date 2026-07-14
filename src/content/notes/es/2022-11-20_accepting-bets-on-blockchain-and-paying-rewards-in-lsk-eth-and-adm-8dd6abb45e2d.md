---
title: "Aceptando Apuestas en Blockchain y Pagando Recompensas en LSK, ETH y ADM"
slug: "accepting-bets-on-blockchain-and-paying-rewards-in-lsk-eth-and-adm-8dd6abb45e2d"
description: "El Bot de Apuestas ADAMANT es una aplicación anónima basada en blockchain que procesa apuestas y paga recompensas automáticamente. Una configuración típica implica apostar por una criptomoneda…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/accepting-bets-on-blockchain-and-paying-rewards-in-lsk-eth-and-adm-8dd6abb45e2d"
publishedAt: "2022-11-20T13:10:11.915Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/8dd6abb45e2d/001-0-l0olsfjrwmjzcc-3.webp"
cardSpan: "full"
originalId: "medium:8dd6abb45e2d"
locale: "es"
placeholder: false
---

El ADAMANT Bet Bot es una aplicación de apuestas anónima y comprobable mediante blockchain que procesa apuestas y paga recompensas automáticamente. Una configuración típica implica apostar por el precio de una criptomoneda como Bitcoin. Con la actualización v2.0, el bot ahora admite apuestas y pagos en Lisk (LSK) junto con ADM y Ethereum.

El bot acepta apuestas en criptomonedas directamente desde las billeteras de ADAMANT Messenger, y toda la actividad de apuestas y pagos queda comprobada mediante transacciones en la blockchain. Los usuarios que predigan correctamente el precio de Bitcoin —u otras criptomonedas— pueden ganar recompensas. Dado que el bot de apuestas es de código abierto, cualquiera puede desplegar su propia instancia para aceptar apuestas sobre el precio de cualquier criptomoneda, no solo Bitcoin.

## Cómo Hacer una Apuesta sobre el Precio de Bitcoin

Para realizar una apuesta, crea una billetera anónima en ADAMANT, recarga su saldo y envía una apuesta al bot. El bot acepta apuestas sobre el tipo de cambio de Bitcoin (BTC). Una nueva ronda comienza todos los domingos a las 10:00 UTC, y las apuestas para la ronda actual se aceptan desde el domingo hasta el jueves. Las apuestas realizadas los viernes o sábados —dentro de las 48 horas previas al final de la ronda— se cuentan para la siguiente ronda.

El margen de error aceptable es de ±500 USD. Por ejemplo, si apuestas por un precio de 9.500 USD y el precio real es de 9.900 USD, aún calificas como ganador. La apuesta mínima es de 0,1 USD, y el pago mínimo también es de 0,1 USD. Para obtener todos los detalles, envía `/help` al bot de apuestas en ADAMANT.

Para realizar una apuesta, recarga la criptomoneda que deseas usar (ADM, LSK o ETH), abre el diálogo del bot de apuestas en ADAMANT y envía `/rates BTC` para verificar el tipo de cambio actual. Luego, envía al bot la cantidad deseada con tu predicción de precio en el comentario de la transacción; por ejemplo, enviar 250 ADM con "11300" como comentario significa que apuestas a que el precio de Bitcoin al final de la ronda será de 11.300 USD. Cuando finalice la ronda, el bot informará el precio real y pagará las recompensas a los ganadores.

![Aceptando apuestas en Blockchain, y pagando recompensas en LSK, ETH y ADM](/images/engineering-notes/medium/8dd6abb45e2d/002-0-yhlmw4fu3ffrh8-l.webp)

## Notas de la versión v2.0.2

La versión v2.0.2 añade soporte para Lisk, habilita conexiones por socket, actualiza dependencias e incluye refactorización y correcciones de errores.
