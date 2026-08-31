---
title: "ETH-transactions-storage: Filtro de direcciones opcional, índices más ligeros y una API pública más segura"
slug: "discussion-76-eth-transactions-storage-optional-address-filter-lighter-indexes-and-a-safer-public-api-10716438"
description: "ETH-transactions-storage es un indexador de Ethereum autohospedado que sigue a un nodo, almacena actividad de ETH y ERC-20 en PostgreSQL y la expone mediante una API REST."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/76"
publishedAt: "2026-08-30T20:51:54Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10716438"
locale: "es"
placeholder: false
---

[ETH-transactions-storage](https://github.com/Adamant-im/ETH-transactions-storage) es un indexador de Ethereum autohospedado que sigue a un nodo de Ethereum, almacena la actividad de ETH nativo y transferencias ERC-20 `transfer(address,uint256)` en PostgreSQL, y la expone como una API REST de solo lectura a través de PostgREST. Dado que los nodos de Ethereum no pueden responder directamente a consultas de historial de direcciones, las billeteras, dapps, tesorerías y operadores suelen depender de un explorador de terceros. Este proyecto es la alternativa que usted mismo ejecuta: sin proveedores de claves API, sin seguimiento y sin telemetría.

La rama `dev` ahora incluye un **filtro de direcciones opcional**, fusionado en el [PR #29](https://github.com/Adamant-im/ETH-transactions-storage/pull/29). La indexación de cadena completa sigue siendo la opción predeterminada y es la que utilizan las billeteras de ADAMANT. El modo filtrado está dirigido a operadores que solo necesitan un conjunto conocido de direcciones y no desean almacenar el resto de la cadena.

## Por qué existe el filtro

Un indexador público de Ethereum es una base de datos grande. En un conjunto de datos de la red principal de un año de aproximadamente 490 millones de filas, el conjunto de índices completo heredado consumía cientos de gigabytes. Muchos operadores no necesitan esa escala: una billetera o backend de custodia que sirve solo a sus propios usuarios, una tesorería de proyecto que supervisa un puñado de direcciones operativas, un explorador autohospedado para un conjunto de direcciones específico de una aplicación, o un entorno de laboratorio y CI que debe mantenerse pequeño, todos se benefician de un almacenamiento selectivo. El filtro preserva el contrato de API existente: los clientes siguen consultando `/ethtxs`, `/max_block` y `/aval`. Los operadores cambian lo que se almacena, no cómo se lee.

## Comportamiento del filtro de direcciones

El filtro está desactivado de forma predeterminada (`ADDRESS_FILTER_ENABLED=false`). Al activarlo, se apunta `ADDRESS_FILTER_FILE` a una lista privada (por defecto `filter/addresses.txt`, ignorada por git y no copiada en la imagen de Docker). La lista acepta una dirección de 40 caracteres hexadecimales con prefijo `0x` por línea, ignorando líneas en blanco y comentarios `#`, y la coincidencia no distingue entre mayúsculas y minúsculas. Las transferencias nativas coinciden con `txfrom` o `txto`. Las llamadas ERC-20 `transfer(address,uint256)` admitidas coinciden con el remitente (`txfrom`), el contrato del token (`txto`) y el destinatario codificado en ABI (`contract_to`).

La lista se recarga antes de cada paso de sincronización, por lo que las adiciones y eliminaciones válidas surten efecto sin reiniciar el indexador. Las listas no válidas, vacías o faltantes fallan de forma segura: la indexación se detiene hasta que se corrige el archivo en lugar de almacenar todo silenciosamente. La RPC de recibo se omite para las transacciones que el filtro rechaza.

Los límites existentes del indexador permanecen sin cambios: el filtro no captura transferencias internas de ETH, flujos ERC-20 que no son una `transfer(address,uint256)` directa (como `transferFrom`, routers, multisigs o llamadas por lotes/agregadores), ni el relleno histórico automático cuando se agrega una dirección. Habilitar el filtro no elimina las filas ya almacenadas. La reconstrucción es un paso manual del operador: detenga el indexador, trunque `ethtxs` y `sync_state` en una transacción (o rebobine ambos al bloque `N`), establezca `START_BLOCK` y reinicie. Truncar solo `ethtxs` no volverá a escanear porque el punto de control aún informa que la cadena está completa.

## Progreso de sincronización duradero

Los bloques filtrados y vacíos anteriormente parecían "no haber tenido actividad", por lo que el indexador podía volver a escanearlos. La rama `dev` ahora mantiene un punto de control de una sola fila en `public.sync_state`, actualizado en la misma transacción de PostgreSQL que las inserciones para ese bloque. El endpoint `/max_block` sigue devolviendo `{ max, version }`, donde `max` es `GREATEST(MAX(ethtxs.block), sync_state.last_block)`. El inicio todavía rebobina el último bloque procesado, ahora de forma atómica con el punto de control. El script `create_tables.sql` es idempotente: crea `sync_state`, lo inicializa desde el bloque de transacciones más alto existente y otorga DML a `api_user` y `app_user` cuando esos roles existen. El rol `web_anon` no puede leer ni escribir en `sync_state` directamente.

## Índices, endurecimiento de la API y operaciones

El filtro de direcciones se basa en otros trabajos de la rama `dev` del [PR #28](https://github.com/Adamant-im/ETH-transactions-storage/pull/28), que aún no es un lanzamiento de GitHub (la última etiqueta sigue siendo [v2.4.1](https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.4.1)). Un conjunto mínimo de cinco índices cubre los formatos de consulta de ADAMANT Web e iOS, ahorrando aproximadamente 90–110 GB por conjunto de datos anual en comparación con el conjunto de ocho índices heredado. El rol anónimo de PostgREST `web_anon` ahora es de solo `SELECT` en `ethtxs`, `aval` y `max_block`, y `db-max-rows = 10000` limita el tamaño del resultado serializado para que un `GET /ethtxs` sin límites no agote la memoria de la API.

Las implementaciones públicas obtienen protecciones de nginx: una lista de permitidos de métodos (`GET`/`HEAD`/`OPTIONS`), un requisito de `txfrom` o `txto` en `/ethtxs`, y el rechazo de `Prefer: count=exact` y desplazamientos (offsets) masivos. El flujo de trabajo de `.env` ahora está documentado con una plantilla, los secretos se mantienen fuera de Git y Compose ya no incluye una contraseña de base de datos codificada. Los diagnósticos de DB son más seguros: los URI de conexión funcionan correctamente y las contraseñas se redactan de los registros. Un archivo `AGENTS.md` define el contrato de colaborador y operador para el repositorio.

Los hosts de systemd existentes deben mantener su unidad actual durante la actualización de código y esquema. Aplique `create_tables.sql` con `ON_ERROR_STOP` antes de iniciar el nuevo indexador, y no copie el `ethsync.service` del repositorio hasta que exista un `.env` de producción con valores equivalentes.

## Para quién es esto

ADAMANT utiliza este indexador para que [adamant-im](https://github.com/Adamant-im/adamant-im) y [adamant-iOS](https://github.com/Adamant-im/adamant-iOS) puedan mostrar el historial de Ethereum y ERC-20 sin un explorador centralizado. El mismo binario es un servicio de código abierto de propósito general para billeteras, procesadores de pagos, emisores de tokens y cualquier persona que desee un historial de Ethereum indexado por direcciones bajo su propia política de PostgreSQL y acceso. Autohospédelo, mantenga el modo de cadena completa para una API pública o habilite el filtro y almacene solo las direcciones a las que realmente sirve.
