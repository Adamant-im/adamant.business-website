---
title: "Actualización de la infraestructura de testnet para ADAMANT"
slug: "discussion-34-updating-the-testnet-infrastructure-for-adamant-9063403"
description: "ADAMANT ha identificado una tarea de mejora (Issue 148) para actualizar y estabilizar su entorno de testnet. Una testnet saludable es esencial para el desarrollo confiable de blockchains."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/34"
publishedAt: "2025-10-23T15:40:31Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9063403"
locale: "es"
placeholder: false
---

ADAMANT ha identificado una tarea de mejora de infraestructura (Issue #148) para actualizar y estabilizar su entorno de testnet. Una testnet saludable es esencial para un desarrollo de blockchain confiable, ya que permite pruebas realistas y la incorporación de colaboradores.

## Qué está disponible

Ahora está disponible para descargar una **instantánea de arranque (bootstrap snapshot)** de la base de datos de testnet en `https://testnet.adamant.im/db_test_backup.sql.gz`. Esto permite a los desarrolladores iniciar un nodo de testnet rápidamente sin tener que sincronizar desde cero.

Las monedas ADM de testnet (3500 ADM) pueden solicitarse mediante la misma fuente utilizada para la red principal en `https://adamant.im/free-adm-tokens/`. La aplicación de mensajería de testnet que ejecuta la rama de desarrollo está disponible en `https://dev-adamant-testnet.surge.sh/`, y el explorador de bloques de testnet está disponible en `https://testnet.adamant.im/`.

Una lista de nodos públicos de testnet se mantiene en el archivo de configuración predeterminado en GitHub: `https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json`.

Para obtener detalles completos de implementación, consulte el artículo original en `https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56`.
