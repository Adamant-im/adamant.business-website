---
title: "Procedimiento de recuperación de bifurcaciones en la blockchain ADM"
slug: "discussion-25-adm-blockchain-recovering-procedure-8951749"
description: "En el software de nodo de la blockchain ADAMANT, pueden ocurrir bifurcaciones cortas cuando múltiples nodos delegados producen bloques simultáneamente. La red debe decidir entonces qué bloque conservar."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/25"
publishedAt: "2025-09-27T12:49:14Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:8951749"
locale: "es"
placeholder: false
---

En el [software de nodo de la blockchain ADAMANT](https://github.com/Adamant-im/adamant), pueden ocurrir bifurcaciones cortas cuando múltiples nodos delegados producen bloques al mismo tiempo. La red debe decidir entonces qué bloque conservar. La regla actual de consenso es seleccionar el bloque más antiguo, suponiendo que la marca de tiempo sea confiable, o si las marcas de tiempo son iguales, elegir el bloque con el ID más pequeño. Estas bifurcaciones cortas ocurren regularmente en las blockchains y no se convierten en bifurcaciones más grandes o peligrosas.

## Eliminación del último bloque

Un nodo registra "Deleting last block" cuando se detecta una bifurcación, ya sea durante la recuperación o al recibir un nuevo bloque. Un desencadenante común es cuando el nodo recibe un bloque con la misma altura y el mismo ID de bloque anterior que un bloque existente, pero con un ID de bloque diferente. Esta es una acción de recuperación normal que mantiene la blockchain coherente sin generar bifurcaciones más profundas.

## Ejemplo de registro

La siguiente entrada de registro ilustra la acción de recuperación. El bloque que se elimina tiene altura 48093334 y ID 15500937233239097229. Las cargas completas de transacciones se omiten aquí por brevedad, pero los metadatos clave muestran la versión del bloque, totales, recompensa, generador y marca de tiempo:

```
[WRN] 2025-08-06 00:00:09 | Deleting last block - {"version":0,"totalAmount":12119967437,"totalFee":150000000,"reward":15000000,"payloadHash":"b04ed7f935bec1f74b7a179ff07557a36ca5ea38d6966381f1a5794ca9df7125","timestamp":250066805,"numberOfTransactions":3,"payloadLength":351,"previousBlock":"17914802164676259429","generatorPublicKey":"547919533beb2612d76e3a7d5f38e61145a2b0ecb96d971277f34fb8efd3bcb3","blockSignature":"64be4069540ab86f195d3bfb477ac8b2514dc99c33b881d98cdab103101b95e21c3f0cb1d6df5a128977a13992956c5390d7e69b18eb99055250c55d9b734802","height":48093334,"id":"15500937233239097229","relays":3}
```

## Resumen

Las bifurcaciones se resuelven automáticamente seleccionando el bloque más antiguo o el bloque con el ID más pequeño. La acción "Deleting last block" es un paso de recuperación rutinario que se realiza cuando se detectan bloques en conflicto a la misma altura, asegurando que la blockchain permanezca coherente sin producir bifurcaciones más profundas.
