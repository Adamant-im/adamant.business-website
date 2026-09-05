---
title: "Almacenamiento de transacciones ETH v2.5.0"
slug: "release-eth-transactions-storage-v2-5-0-382952479"
description: "ETH Transactions Storage v2.5.0 convierte el proyecto en un indexador de transacciones Ethereum y backend REST API documentado, distribuible y autohospedado."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.5.0"
publishedAt: "2026-09-04T18:56:20Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "ETH-transactions-storage"
tag: "v2.5.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:382952479"
locale: "es"
placeholder: false
---

ETH Transactions Storage v2.5.0 convierte el proyecto en un indexador de transacciones Ethereum y backend REST API documentado, distribuible y autohospedado para billeteras, exploradores, herramientas de contabilidad y tesorería, servicios de monitoreo y aplicaciones personalizadas. Mantiene el contrato de API PostgREST existente utilizado en producción por los clientes de ADAMANT.

Esta versión añade transacciones y puntos de control fiables por bloque, recuperación al inicio, comportamiento de reintento y reversión de base de datos, y progreso a través de bloques vacíos o filtrados. Ahora está disponible el indexado opcional basado en direcciones con validación, coincidencia de remitente, destinatario nativo y destinatario de token, recargas de listas en vivo y comportamiento de fallo cerrado. El conjunto de índices de base de datos recomendado se ha reducido a cinco índices, dejando los tres anteriores disponibles por separado para formas de consulta personalizadas; el conjunto más pequeño ahorra un estimado de 90–110 GB en aproximadamente 490 millones de filas. Se han añadido un esquema `sync_state` aditivo, acceso de solo lectura `web_anon`, un límite de respuesta PostgREST de 10,000 filas y orientación para proteger despliegues de API pública. Se incluye soporte para URI de conexión PostgreSQL con ocultación de credenciales, carga de `.env`, dependencias de Python restringidas, diagnósticos actualizados y una unidad de systemd revisada. Se han añadido un contenedor de Python 3.11, una configuración de Compose con imagen publicada, una anulación de compilación local separada, metadatos OCI y publicación GHCR multiarquitectura impulsada por versiones. El sitio de documentación VitePress está disponible en <https://eth-indexer.docs.adamant.im>, con herramientas de Node reproducibles, CI de documentación, despliegue en Pages y guía para colaboradores. El proyecto se reposiciona para cualquier consumidor compatible mientras preserva la propiedad, procedencia y evidencia de compatibilidad de producción de ADAMANT.

## Requisitos de actualización

Detenga el indexador existente y actualice el repositorio completo antes de realizar la actualización. Aplique el nuevo esquema como administrador de PostgreSQL antes de iniciar la v2.5.0:

```bash
sudo -u postgres psql -v ON_ERROR_STOP=1 -d index < create_tables.sql
```

Luego, instale las dependencias de Python declaradas para despliegues manuales o mediante systemd:

```bash
pip3 install -r requirements.txt
```

Conserve todos los valores y credenciales del entorno de producción; la plantilla de systemd del repositorio ahora requiere un `.env` válido. Establezca `POSTGRES_PASSWORD` antes de usar Docker Compose. Migre los datos existentes de PostgreSQL 12 correctamente antes de adoptar la imagen de PostgreSQL 14 para Compose; cambiar solo la etiqueta de la imagen no constituye una actualización. Cree y verifique el conjunto de índices recomendado antes de eliminar los índices heredados; utilice operaciones de índice concurrentes en una base de datos activa. Aplique `create_tables.sql` antes de cambiar PostgREST a `web_anon`, o las solicitudes de API anónimas fallarán. Planifique el historial filtrado explícitamente: activar el filtro de direcciones o añadir una dirección no rellena bloques anteriores.

Consulte la guía de actualización completa en <https://eth-indexer.docs.adamant.im/guide/upgrading> antes de desplegar esta versión.

## Compatibilidad y alcance actual

Los endpoints `/ethtxs`, `/max_block` y `/aval`, las columnas de la base de datos, el manejo de direcciones sin distinción entre mayúsculas y minúsculas, las codificaciones de valores y las formas de consulta de cliente establecidas siguen siendo compatibles. `/max_block.max` ahora también refleja los bloques procesados que no almacenaron filas de transacciones.

El indexador continúa almacenando transferencias nativas de ETH y llamadas directas de nivel superior ERC-20 `transfer(address,uint256)`. No indexa transferencias internas de ETH, `transferFrom`, flujos multisig, de enrutador o por lotes, otros estándares de tokens, ni correcciones automáticas de reorganización profunda.

## Distribución

La publicación de esta versión estable activa imágenes para `linux/amd64` y `linux/arm64`:

```text
ghcr.io/adamant-im/eth-transactions-storage:2.5.0
ghcr.io/adamant-im/eth-transactions-storage:latest
```

Las etiquetas de imagen de versión son inmutables. Fije `2.5.0` en lugar de `latest` en producción.

## Verificación

Se aprobaron las 12 pruebas unitarias de Python. La sintaxis de Python, el formato, el linting de Markdown y la compilación de VitePress fueron exitosos. Las pruebas de humo de compilación de contenedor, exclusión de estado de operador, metadatos OCI, ambas configuraciones de Compose, progreso de API y reinicio de puntos de control pasaron en el commit de fusión de la versión. El despliegue de la documentación fue exitoso y el sitio se sirve bajo HTTPS forzado. El servicio de producción ha sido desplegado y confirmado como saludable por su operador.

Trabajo incluido: #27, #28, #29, #31 y #33. Issue de seguimiento: #32. Registro de cambios completo: <https://github.com/Adamant-im/ETH-transactions-storage/compare/v2.4.1...v2.5.0>.

### Cambios importantes

El nuevo esquema `sync_state` debe aplicarse mediante `create_tables.sql` antes de iniciar la v2.5.0, y debe aplicarse antes de cambiar PostgREST a `web_anon` o las solicitudes de API anónimas fallarán. La plantilla de systemd ahora requiere un archivo `.env` válido, por lo que las implementaciones existentes sin uno no se iniciarán hasta que se cree. Activar el filtro de direcciones o añadir una dirección no rellena bloques anteriores, lo que significa que el historial no indexado previamente no se capturará retroactivamente sin una acción explícita del operador.
