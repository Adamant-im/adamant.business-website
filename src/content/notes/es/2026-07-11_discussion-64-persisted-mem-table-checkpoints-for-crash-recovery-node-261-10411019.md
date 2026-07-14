---
title: "Puntos de control persistentes de Mem-Table para recuperación tras fallo"
slug: "discussion-64-persisted-mem-table-checkpoints-for-crash-recovery-node-261-10411019"
description: "El nodo ADAMANT ahora admite puntos de control persistentes rotativos del estado de memoria derivado. Tras una interrupción forzada, el arranque puede restaurar el último punto verificado."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/64"
publishedAt: "2026-07-11T14:36:39Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10411019"
locale: "es"
placeholder: false
---

El nodo ADAMANT ahora admite puntos de control persistentes y rotativos del estado derivado `mem_*`. Tras una interrupción forzada que deja las réplicas de memoria en un estado inconsistente, el arranque puede restaurar el último punto de control verificado y reprocesar únicamente los bloques posteriores a la altura del punto de control, en lugar de reconstruir todas las tablas de memoria desde la altura 1. Esto implementa el diseño propuesto en el issue #227, fusionado en la pull request #261. Los puntos de control son solo una caché local de recuperación; los bloques y la reproducción determinista siguen siendo la fuente de verdad. Si falla la verificación o la reproducción, el nodo vuelve al procedimiento existente de reconstrucción completa.

Las tablas derivadas como `mem_accounts`, `mem_round`, tablas de enlace de delegados y multisig, y sus réplicas no confirmadas pueden volverse inconsistentes si el proceso se interrumpe mientras hay escrituras en curso. El apagado ordenado mediante `SIGTERM` sigue siendo el procedimiento operativo requerido, pero los puntos de control reducen el tiempo de recuperación cuando ocurre una finalización forzada.

La implementación introduce una tabla de metadatos (`mem_state_checkpoint_meta`) y tres conjuntos rotativos de ranuras de tabla (`mem_ckpt_0..2_*`) para el estado confirmado. Las tablas de enlace no confirmadas no se incluyen en los puntos de control; se reconstruyen a partir del estado confirmado durante la restauración. La lógica principal se divide entre `logic/memCheckpoint.js` (para el cálculo del hash y la rotación de ranuras), `modules/memCheckpoints.js` como envoltorio de módulo, `sql/memCheckpoints.js` para funciones auxiliares SQL, y modificaciones en `modules/loader.js` y `modules/blocks/chain.js` para activar la recuperación y la creación de puntos de control.

Los puntos de control se crean únicamente en los límites de rondas completadas, tras la finalización completa de la canalización `applyBlock` y la persistencia del bloque. En la punta de la cadena, esto ocurre cada ronda completada. Durante la sincronización de recuperación, se produce cada 100 rondas para evitar reducir el rendimiento de sincronización. La creación del punto de control utiliza una transacción PostgreSQL `REPEATABLE READ` para congelar la instantánea MVCC. La sección crítica de procesamiento de bloques se libera tan pronto como la fila de metadatos se persiste, mientras que la copia de tablas y el cálculo del hash continúan en segundo plano sobre la instantánea congelada. Esto evita mantener la sección crítica bloqueada durante toda la operación de copia.

Antes de que un punto de control sea aceptado para recuperación, se verifican varias invariantes: el estado debe estar completo, el esquema y el nethash deben coincidir, el bloque referenciado debe existir y el resumen SHA-256 debe coincidir. La recuperación prueba todas las ranuras completas desde la más reciente hasta la más antigua, por lo que una ranura más reciente dañada no fuerza una reconstrucción completa si existe una ranura válida más antigua. En el arranque, si `checkMemTables()` detecta inconsistencia, `memCheckpoints.tryRecover()` restaura la ranura, restablece el estado no confirmado, establece el último bloque y reproduce los bloques desde la altura del punto de control hasta la punta. Si la reproducción falla, el nodo descarta el estado del punto de control y realiza una reconstrucción completa desde el génesis.

La función está habilitada por defecto en `config.default.json`:

```json
"loading": {
  "memCheckpoints": {
    "enabled": true
  }
}
```

Los operadores deben tener en cuenta que esta función no introduce cambios de protocolo; los puntos de control nunca son entrada al consenso y los datos locales alterados no pueden eludir la validación de bloques. En huellas de `mem_*` del tamaño de mainnet, tres ranuras requieren aproximadamente entre 96 y 144 MB más metadatos, por lo que se recomienda reservar unos 1 GB adicional. Los operadores deben seguir prefiriendo el apagado ordenado, ya que los puntos de control acortan el tiempo de recuperación pero no sustituyen a los procedimientos correctos de apagado.
