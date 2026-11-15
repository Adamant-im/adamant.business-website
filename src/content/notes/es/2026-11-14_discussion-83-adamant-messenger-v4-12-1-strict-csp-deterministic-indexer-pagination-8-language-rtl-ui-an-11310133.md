---
title: "ADAMANT Messenger v4.12.1: CSP estricta, paginación determinista del indexador, interfaz RTL y compilaciones verificables"
slug: "discussion-83-adamant-messenger-v4-12-1-strict-csp-deterministic-indexer-pagination-8-language-rtl-ui-an-11310133"
description: "ADAMANT Messenger PWA v4.12.1 se lanza desde master (074db965) sobre v4.12.0 (dfe094d3), cubriendo 69 commits, 12 pull requests fusionados y 14 issues cerrados."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/83"
publishedAt: "2026-11-14T17:50:00Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Messenger apps"
cardSpan: "half"
originalId: "github-discussion:11310133"
locale: "es"
placeholder: false
---

ADAMANT Messenger PWA `v4.12.1` se lanza desde `master` (`074db965`) sobre `v4.12.0` (`dfe094d3`), cubriendo 69 commits, 12 pull requests fusionados y 14 issues de hitos cerrados. Más allá de añadir funciones superficiales, esta versión se centra en el transporte verificable y el endurecimiento del tiempo de ejecución, la paginación determinista de nodos e indexadores bajo una infraestructura descentralizada multioperador, la paridad total en ocho idiomas con soporte RTL para árabe y la procedencia transparente de las compilaciones en objetivos web, escritorio y Android.

## CSP estricta, validación Web3 sin eval y encabezados de seguridad compartidos

Un contrato de encabezado de seguridad unificado (`PWA_SECURITY_HEADERS` en `vite-config/plugins/cspHardeningPlugin.ts`) define ahora la única fuente de verdad aplicada en todas las compilaciones — `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer` y `X-XSS-Protection: 0` — reflejado por los encabezados catch-all de `vercel.json` y los archivos de configuración de nginx. El ABI de Web3 y la validación cambian a Zod 4 con `config({ jitless: true })` para `web3-validator` y `abitype` para `web3-eth-abi`, eliminando los puntos de entrada del compilador mientras el plugin de endurecimiento CSP amplía el control del bundle de producción contra `eval` en tiempo de ejecución y alias de `Function`.

El endurecimiento de la cadena de suministro incluye un `.npmrc` con una antigüedad mínima de lanzamiento de siete días, un script de verificación de antigüedad de dependencias, periodos de enfriamiento de Dependabot, limpieza de producción de Electron y exclusiones de credenciales y artefactos de Playwright. Los sondeos de verificación de despliegue en vivo (`cspDeployments.env.spec.ts`, `tests/e2e/production-csp.live.spec.ts`) validan la presencia de encabezados y la aplicación de scripts en la pantalla de inicio de sesión sin violaciones de CSP en producción, desarrollo, GitHub Pages y despliegues en Surge.

## Límites de nodos, consultas PostgREST acotadas y afinidad de paginación de nodo único

La versión mínima de la API de ADM aumenta a `0.10.0` en mainnet, testnet y Tor. La versión mínima del nodo IPFS se lee ahora explícitamente desde `ipfsService.minVersion` (`0.1.0`) en lugar de recurrir al límite general de servicios. Las IPs de respaldo de nodos reubicadas se sincronizan a través del registro `adamant-wallets`.

Se han mejorado las transferencias directas de ADM en tiempo real: el esquema sustituye `withoutDirectTransfers` por enumeraciones enteras, las conexiones WebSocket se establecen inmediatamente al desbloquear suscribiéndose a los tipos de transacción de chat `[0, 8]`, y el estado de la transferencia permanece sincronizado en la vista previa del chat, la lista de transacciones y los componentes de la tarjeta de transferencia.

Las consultas del indexador ETH a través de `EthIndexerClient.ts` ahora imponen un `limit` en cada solicitud `/ethtxs` (por defecto 25), dividen las búsquedas de ETH nativo en dos consultas indexadas acotadas, fusionadas y deduplicadas en el lado del cliente por `txhash`, e introducen `getTimestampGroup` para la resolución de límites de marcas de tiempo iguales. Los protectores de paginación entre cadenas para BTC, DOGE y DASH mantienen la paginación activa fijada a un solo indexador en lugar de dispersar una dirección entre operadores. El estado persistente del módulo elimina las transacciones en caché y restablece los cursores de sesión de paginación al guardar, evitando el desfase de cursores obsoletos.

![Límites de versión de nodos ADM e IPFS junto con acciones de Configuración en móvil](/images/engineering-notes/github/discussions/11310133/001-bcf4ca3db8.webp)

*Nodos ADM por debajo de `0.10.0` y puntos finales HTTP simples marcados como no compatibles; nodos IPFS verificados contra `ipfsNode.minVersion` (`0.1.0`).*

![Chat de panel dividido en escritorio con estado de transferencia ADM sincronizado y saneamiento XSS de texto plano](/images/engineering-notes/github/discussions/11310133/002-4dc1da2b89.webp)

*Espaciado de vista previa de chat y ticks de entrega sincronizados con transferencias ADM tipo 0; vistas previas de carga útil no saneada renderizadas de forma segura como texto inerte.*

![Lista de transacciones de la billetera ADM en escritorio](/images/engineering-notes/github/discussions/11310133/003-a42684a993.webp)

*Feed de transacciones de mainnet en vivo emparejado con la arquitectura de paginación de nodo único en ADM, ETH/ERC-20, BTC y DOGE.*

## Identidad de compilación, respaldo de multihash IPFS HTTP y configuraciones de red aisladas

Un plugin de información de compilación (`virtual:adamant-build-info`) expone `version`, `branch`, `commit`, `prNumber`, `author`, `buildDate` e `isTestnet` saneados en un diálogo de compilación, junto con una acción de Service Worker de refresco forzado que limpia CacheStorage preservando las credenciales del usuario y el estado cifrado de IndexedDB. Las compilaciones de testnet muestran insignias explícitas de `TESTNET`.

Para contextos HTTP simples como los espejos `.onion` donde `crypto.subtle` no está disponible, el respaldo de adjuntos IPFS utiliza la derivación multihash SHA-256 de `@noble/hashes`. Las configuraciones de red se unifican en `src/config/mainnet.json` expuesto a través de un módulo virtual, de modo que los modos de Vite no compatibles o las fugas de configuración entre redes fallan en tiempo de compilación.

![BuildInfoDialog con Refresco forzado, selector de 8 idiomas e indicador de inicio de sesión en Testnet](/images/engineering-notes/github/discussions/11310133/004-4f8da5e80c.webp)

*Diálogo de compilación de inicio de sesión con refresco forzado, menú desplegable de 8 idiomas y marcadores TESTNET distintos en despliegues de testnet.*

## Paridad de ocho idiomas y soporte completo RTL para árabe

Esta versión añade traducciones al español, francés, japonés y árabe, completa las auditorías para alemán, ruso y chino simplificado, y alinea los ocho archivos de localización a una paridad exacta de claves (418 claves hoja por localización). La función `applyLocale()` sincroniza `vue-i18n`, `dayjs`, las localizaciones de Vuetify, `dir` y `lang`, añade reglas de plural precisas para árabe, francés y casos de adolescentes en ruso por encima de 100, selecciona numerales `ar-u-nu-latn` para fechas en árabe y detecta el idioma inicial localmente desde `navigator.languages`.

El diseño RTL completo para árabe se habilita mediante `rtl: { ar: true }` de Vuetify, flechas de navegación reflejadas a través de un componente de icono direccional, propiedades lógicas CSS en todas las vistas y `dir="auto"` en mensajes escritos por el usuario, forzando LTR para frases de contraseña. Las pruebas de regresión (`RtlUiContract.spec.js`, `chat-rtl-layout-regression.spec.ts`) bloquean el diseño contra futuras roturas.

![Vistas móviles RTL en árabe en Chats, chat activo con transferencia ADM y Configuración](/images/engineering-notes/github/discussions/11310133/005-94937d5ba6.webp)

*Lista de chat alineada a la derecha con numerales latinos, tarjeta de transferencia activa en vista de chat RTL con iconos direccionales reflejados y jerarquía de Configuración reflejada.*

![Pantallas de Configuración en español, francés y japonés](/images/engineering-notes/github/discussions/11310133/006-867e6e8b17.webp)

*Español, francés y japonés coincidiendo con las 418 cadenas de la interfaz de usuario en el despliegue en vivo.*

## Notas sobre empaquetado y plataforma

Los objetivos de Android se actualizan a `compileSdkVersion` y `targetSdkVersion` 36, con `minSdkVersion` elevada a 24 (Android 7.0+), y AGP 8.13.0, Gradle 8.14.3 y Cordova Android 14.0.1 (`versionCode` 41201).

En macOS, Apple bloqueó la cuenta de desarrollador, por lo que la notarización de CI está actualmente desactivada. Los instaladores `.dmg` de escritorio (x64, arm64, universal) siguen estando firmados con Developer ID y se pueden instalar a través de Ajustes del Sistema → Privacidad y seguridad → Abrir de todos modos después del primer intento de lanzamiento. El botón de la App Store de iOS en adamant.im no es clicable temporalmente con un aviso correspondiente.
