---
title: "ADAMANT Console v2.2.0"
slug: "release-adamant-console-v2-2-0-142293299"
description: "La wiki se ha actualizado con los últimos cambios. Se actualizaron las dependencias. La base de código ahora usa módulos ES (.mjs) para soportar bibliotecas modernas."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v2.2.0"
publishedAt: "2024-02-16T09:24:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v2.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:142293299"
locale: "es"
placeholder: false
---

La wiki se ha actualizado para reflejar los últimos cambios. Las dependencias se han actualizado a sus versiones actuales. La base de código se ha reescrito para usar módulos ES (.mjs) para admitir bibliotecas modernas. Se ha añadido Prettier para el formateo del código.

### Cambios importantes

El formato del archivo de configuración ha cambiado. La clave `passPhrase` en la configuración ha sido renombrada a `passphrase`. Los archivos de configuración `config.json` y `config.default.json` han sido renombrados a `config.jsonc` y `config.default.jsonc` respectivamente. La respuesta del comando `account new` ahora devuelve `passphrase` en lugar de `passPhrase`. La opción de línea de comandos `--passPhrase` ha sido renombrada a `--passphrase`, por lo que `adm --passPhrase=""` debe cambiarse ahora a `adm --passphrase=""`.
