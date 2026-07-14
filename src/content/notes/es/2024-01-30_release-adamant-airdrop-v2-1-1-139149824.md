---
title: "ADAMANT Airdrop v2.1.1"
slug: "release-adamant-airdrop-v2-1-1-139149824"
description: "Esta versión de ADAMANT Airdrop establece los comandos npx como método principal. Varias opciones de configuración han sido renombradas para mayor coherencia: log level es ahora logLevel, n…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-airdrop/releases/tag/v2.1.1"
publishedAt: "2024-01-30T15:20:05Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-airdrop"
tag: "v2.1.1"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-airdrop:139149824"
locale: "es"
placeholder: false
---

Esta versión de ADAMANT Airdrop establece los comandos `npx` como la forma principal de usar la herramienta. Varias opciones de configuración han sido renombradas para mayor coherencia: `log_level` ahora es `logLevel`, `node_ADM` ahora es `nodes`, y `skipDublicates` ahora es `skipDuplicates`. Se ha añadido una nueva opción `outputPath` para especificar la ruta de la lista de direcciones a las que el bot no pudo enviar ADM.

```diff
{
  // ...
-  "node_ADM": [
+  "nodes": [
      // ...
    ],

-  "log_level": "log",
+  "logLevel": "log",

-  "skipDublicates": true
+  "skipDuplicates": true
}
```

Los archivos de salida para la validación de direcciones han sido eliminados; en su lugar se deben usar los registros (logs). La lista de transacciones ahora se almacena en formato `.csv`. El archivo `txt/airdrop/failedAddresses.txt` ha sido renombrado a `failedTransactions.csv`, y `txt/airdrop/successfulAddresses.txt` ha sido renombrado a `successfulTransactions.csv`.

```diff
.
├── logs
│   └── 2024-01-10.log
└── output
    └── 2024-01-10 01:16:43
+        ├── failedTransactions.csv
+        ├── successfulTransactions.csv
-        └── txt
-            ├── airdrop
-            │   ├── failedAddresses.txt
-            │   └── successfulAddresses.txt
-            └── validate
-                ├── invalidAddresses.txt
-                └── validAddresses.txt
```

### Cambios importantes

Los nombres de las opciones de configuración han cambiado, por lo que los usuarios deben actualizar sus archivos de configuración. La opción `node_ADM` ahora es `nodes`, `log_level` ahora es `logLevel`, y `skipDublicates` ahora es `skipDuplicates`. Los formatos y ubicaciones de los archivos de salida han cambiado: las listas de transacciones ahora se almacenan en archivos `.csv` en lugar de `.txt`, y los archivos de salida para la validación de direcciones han sido eliminados por completo en favor de los registros (logs).
