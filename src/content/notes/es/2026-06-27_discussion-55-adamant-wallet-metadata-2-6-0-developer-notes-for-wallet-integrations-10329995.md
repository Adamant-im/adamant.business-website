---
title: "ADAMANT Wallet Metadata 2.6.0: Notas para desarrolladores sobre integraciones de billeteras"
slug: "discussion-55-adamant-wallet-metadata-2-6-0-developer-notes-for-wallet-integrations-10329995"
description: "ADAMANT Wallet Metadata 2.6.0 está lista para su lanzamiento. Esta actualización es principalmente relevante para desarrolladores que integran billeteras cripto integradas de ADAMANT, metadatos de billeteras, listas de nodos, etc."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/55"
publishedAt: "2026-06-27T13:42:14Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10329995"
locale: "es"
placeholder: false
---

ADAMANT Wallet Metadata `2.6.0` está lista para su lanzamiento. Esta actualización es principalmente relevante para desarrolladores que integran billeteras cripto integradas de ADAMANT, metadatos de billeteras, listas de nodos, definiciones de servicios o sincronización de interfaz/configuración descendente.

## Qué ha cambiado para desarrolladores de billeteras y servicios

El repositorio `adamant-wallets` es la fuente canónica de metadatos de monedas, tokens, blockchains, nodos, servicios, iconos y esquemas utilizados por las aplicaciones ADAMANT. La versión `2.6.0` actualiza tanto los metadatos como la documentación sobre cómo los consumidores descendentes deben leerlos.

El modelo de anulación de metadatos ahora está documentado con mayor claridad. Los campos compartidos se encuentran en `assets/general/<coin-or-token>/info.json`, los valores predeterminados de blockchain en `assets/blockchains/<blockchain>/info.json`, y las anulaciones de tokens específicos de blockchain en `assets/blockchains/<blockchain>/<token>/info.json`. El archivo `README.md` ahora restaura y amplía las explicaciones de los campos de los parámetros de metadatos de billetera, incluyendo nodos, servicios, tarifas, precisión, iconos, comprobaciones de estado, indicadores de estado y límites de transferencia. El archivo `specification/openapi.json` cubre más campos de metadatos de billetera y estructuras anidadas, ayudando a que los SDK, validadores, consumidores de esquemas y documentación generada se mantengan más cercanos a la forma real del JSON. Las reglas de mantenimiento específicas del repositorio, expectativas de validación, convenciones de problemas/PR y reglas de seguridad de metadatos ahora están documentadas en `AGENTS.md` y `.github/CONTRIBUTING.md`.

## Actualizaciones de metadatos para revisar en sistemas descendentes

Si su aplicación, servicio, SDK, bot o backend consume directamente metadatos de billetera ADAMANT o a través de billeteras ADAMANT integradas, revise los siguientes cambios.

Se actualizó la metadata de nodos ADAMANT, y se eliminaron tres nodos proxy ADM no disponibles: `tauri.bbry.app`, `endless.bbry.app` y `debate.bbry.app`. Se actualizaron los metadatos de Bitcoin, Dash y Dogecoin, y se corrigieron ejemplos de validación de direcciones de Dogecoin. Se corrigió el enlace de GitHub de DAI y se actualizó el nombre del token GT. Se eliminó la metadata obsoleta de USDS y los activos de iconos relacionados. También se actualizaron la metadata del paquete, el archivo de bloqueo de dependencias, la información del motor Node.js, los scripts de validación y los enlaces del repositorio.

## Comprobaciones recomendadas para integradores

Si consume este repositorio en una billetera, integración de exchange, servicio de monitoreo, aplicación móvil, PWA, SDK o backend personalizado, sincronice nuevamente los metadatos de la billetera después de que la versión `2.6.0` se fusione en `master`. Verifique si su código tiene referencias codificadas en el código a los metadatos de USDS eliminados o a los nodos proxy ADM eliminados, y vuelva a ejecutar su validación de metadatos contra el esquema OpenAPI actualizado si utiliza tipos generados, validadores u herramientas conscientes del esquema.

Vuelva a verificar el comportamiento de la interfaz de usuario de la billetera para campos como `status`, `defaultVisibility`, `defaultOrdinalLevel`, `decimals`, `cryptoTransferDecimals`, `minBalance`, `minTransferAmount`, `fixedFee`, `defaultFee` y rutas de iconos. Vuelva a verificar la lógica de selección de nodos y servicios si su aplicación utiliza `nodes`, `services`, `healthCheck`, `minVersion`, `hasIndex`, `alt_ip`, `txFetchInfo`, `txConsistencyMaxTime`, `timeout` o configuraciones de gas de confiabilidad. Asegúrese de que su integración trate los metadatos como una configuración basada en listas y no fije un único punto final a menos que su propia estrategia de respaldo sea explícita.

## Referencias

- Issue del lanzamiento: https://github.com/Adamant-im/adamant-wallets/issues/137
- PR del lanzamiento: https://github.com/Adamant-im/adamant-wallets/pull/138
- Repositorio: https://github.com/Adamant-im/adamant-wallets
- ADAMANT Improvement Proposals: https://aips.adamant.im/
