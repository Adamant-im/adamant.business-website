---
title: "Procesamiento de adamant-wallets: Información de monedas y tokens para aplicaciones cliente de ADAMANT"
slug: "discussion-23-explanation-of-processing-adamant-wallets-all-coin-information-for-adamant-client-applicat-8933380"
description: "El repositorio adamant-wallets centraliza la información de monedas y tokens para aplicaciones cliente de ADAMANT. La app procesa estos datos y ofrece una estructura unificada."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/23"
publishedAt: "2025-09-22T12:54:29Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8933380"
locale: "es"
placeholder: false
---

El repositorio `adamant-wallets` centraliza toda la información de monedas y tokens para las aplicaciones cliente de ADAMANT. La aplicación cliente es responsable de procesar correctamente estos datos y proporcionar a los desarrolladores una estructura cómoda y unificada. La estructura propuesta no es perfecta —la información de los tokens se combina desde carpetas diferentes—, pero las alternativas conllevan sus propios compromisos, por lo que no se proponen cambios estructurales aquí.

## Terminología

Un **crypto** es un término general que abarca tanto monedas como tokens. Cada crypto tiene un nombre (por ejemplo, Bitcoin) y un ticker o símbolo (por ejemplo, BTC). Una **moneda** es un crypto que existe en su propia blockchain, como `ADM`, `BTC`, `DOGE`, `DASH` o `KLY`. Un **token** es un crypto que existe sobre alguna blockchain, por ejemplo, `STORJ` o `USDT` en Ethereum o Binance Smart Chain.

Cada blockchain tiene una **moneda principal**, que comparte propiedades comunes para todos los tokens en esa cadena y se utiliza para pagar las tarifas de transferencia. Por ejemplo, transferir USDT en Ethereum requiere tarifas pagadas en `ETH`. Cada blockchain también define un **tipo de token**: Ethereum usa `ERC20`, Binance Smart Chain usa `BEP20`. Un token puede existir en múltiples blockchains (un **token multi-cadena**): USDT existe como `ERC20` en Ethereum y como `BEP20` en Binance Smart Chain. Es el mismo token con el mismo valor e información general, pero almacenado y transferido en cadenas diferentes.

## Estructura básica

Cada crypto existe en la carpeta `/general`. Los tokens existen adicionalmente en la carpeta `/blockchains`. Por ejemplo, `/general/USDT/info.json` contiene información general sobre USDT, mientras que `/blockchains/ethereum/USDT/info.json` contiene información específica de USDT en Ethereum. El archivo `/blockchains/{chain}/info.json` almacena información compartida específica de la cadena para todos los tokens en esa cadena y define el enlace con la moneda principal con sus propiedades base.

### Fuentes de propiedades para un token

Cualquier token en cualquier blockchain tiene cuatro fuentes de propiedades, combinadas por prioridad de mayor a menor:

1. `/blockchains/ethereum/USDT/info.json` — token específico en una blockchain específica
2. `/blockchains/ethereum/info.json` — información compartida de tokens para esta blockchain
3. `/general/ethereum/info.json` — información de la moneda principal de la blockchain
4. `/general/USDT/info.json` — información general del token

Por ejemplo, USDT en Ethereum combina las cuatro fuentes, siendo la fuente (1) la que sobrescribe a la (2), y así sucesivamente.

## Creación de monedas y tokens en aplicaciones

Para crear monedas, la aplicación recorre todos los cryptos en `/general` y lee cada `/general/{crypto}/info.json`. Omite entradas donde `status` no esté activo o donde `type` no sea `coin`. Si `createCoin = true`, crea un objeto moneda mostrado como una entrada de blockchain sin tipo de token —ejemplos incluyen `ADM` y `BTC`.

![Captura de pantalla de discusión 1](/images/engineering-notes/github/discussions/8933380/001-fafd0ecc.webp)

![Captura de pantalla de discusión 2](/images/engineering-notes/github/discussions/8933380/002-cebba626.webp)

Para crear tokens, la aplicación recorre todas las blockchains en `/blockchains` (por ejemplo, `ethereum`, `binanceSmartChain`) y lee el archivo `info.json` a nivel de cadena. Omite la blockchain si su `status` no está activo y registra la `mainCoin`. Luego lee `/general/{mainCoin}/info.json` para obtener la información general de la moneda principal. Para cada token en la carpeta de esa blockchain, lee `/general/{token}/info.json` —omitiendo el token si el archivo no existe o si `type` no es `token`— y luego lee `/blockchains/{blockchain}/{token}/info.json`, omitiendo si `status` no está activo. Finalmente, combina las cuatro fuentes según su prioridad y crea un objeto token mostrado con su tipo (por ejemplo, `ERC20`, `BEP20`). Ejemplos incluyen `USDT`, `USDC` y `DAI`.

![Captura de pantalla de discusión 3](/images/engineering-notes/github/discussions/8933380/003-f4329279.webp)

![Captura de pantalla de discusión 4](/images/engineering-notes/github/discussions/8933380/004-a0d74d6b.webp)

## Objeto de datos para un crypto

Tras analizar `adamant-wallets`, la aplicación posee un objeto de datos con información sobre todas las monedas y tokens en todas las cadenas. Dado que las propiedades ya están combinadas, recuperar los datos es sencillo:

```js
// Inside token-related methods
let property = coinInfo.property

// Outside, referencing by token and chain
let property = coinInfo["USDT"]["ethereum"].property
```

Esto garantiza que las aplicaciones ADAMANT puedan manejar múltiples blockchains y tokens de forma coherente.
