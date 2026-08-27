---
title: "ADAMANT IPFS Node v0.1.0: Almacenamiento limitado, GC consciente del ciclo de vida y replicación determinista"
slug: "discussion-74-adamant-ipfs-node-v0-1-0-bounded-storage-lifecycle-aware-gc-and-deterministic-replication-10693309"
description: "ADAMANT IPFS Node v0.1.0 introduce un ciclo de vida de almacenamiento orientado a producción que limita el crecimiento del disco, limpia subidas fallidas y gestiona réplicas."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/74"
publishedAt: "2026-08-26T19:14:25Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10693309"
locale: "es"
placeholder: false
---

ADAMANT IPFS Node v0.1.0 introduce un ciclo de vida de almacenamiento orientado a producción que limita el crecimiento del disco, limpia las subidas fallidas, distingue el contenido duradero de la caché recuperable, coloca las réplicas de forma determinista en el conjunto de nodos ADAMANT, repara las copias faltantes y preserva cada CID preexistente durante una actualización.

## Por qué era necesario

La implementación anterior podía transmitir bloques al almacén de bloques antes de que se conocieran todos los límites de las solicitudes. Una subida interrumpida o rechazada podía dejar bloques residuales, las subidas exitosas permanecían ancladas sin una política de expiración y no existía un proceso explícito de quórum de replicación o reparación. Esto hacía imposible responder de forma fiable a cuestiones como cuánto espacio en disco puede consumir una subida, qué archivos son duraderos o recuperables, qué sucede si una solicitud se desconecta a mitad de la importación, qué nodos son responsables de un CID, si un nodo puede recuperar espacio sin eliminar contenido confirmado y si los archivos existentes siguen disponibles tras una actualización del clúster.

## La admisión ocurre antes del almacenamiento

Las subidas se rechazan antes de que puedan consumir un espacio en disco ilimitado. Las subidas concurrentes están limitadas por `storage.maxConcurrentUploads` (respuesta `429`). El tamaño agregado de la solicitud está limitado por `storage.maxRequestSizeBytes` (`413`), aplicado tanto a `Content-Length` como a los bytes transmitidos realmente, ya que las solicitudes fragmentadas (chunked) no declaran su tamaño final. Una reserva de disco aplicada mediante `storage.diskReserveBytes` devuelve `507` cuando el espacio libre es insuficiente. Los archivos por solicitud están limitados por `maxFileCount` (`400`) y el tamaño individual de archivo por `uploadLimitSizeBytes` (`400`). Las solicitudes concurrentes reservan disco de forma atómica, por lo que varias subidas no pueden consumir el mismo margen de espacio libre.

Cada solicitud posee una sesión de subida que rastrea los bloques que creó. El rechazo de un analizador, un fallo de importación, un error de ruta, un fallo de quórum estricto o la desconexión del cliente eliminan solo esos bloques nuevos. Los bloques preexistentes, los bloques retenidos por otra subida concurrente y los bloques anclados se conservan.

## Ciclo de vida explícito del archivo

Un registro respaldado por el almacén de datos bajo `/adm/files` registra el ciclo de vida y la contabilidad de almacenamiento de cada CID conocido. El estado `temporary` representa una subida a la espera de confirmación o liquidación transaccional. `confirmed` representa contenido duradero protegido por política. `expired` representa contenido que ha sido liberado y puede ser recuperado bajo presión. `pinned` y `heldLocally` se rastrean por separado del estado lógico.

Las transiciones de ciclo de vida, las operaciones de anclaje, las escrituras en el registro, la limpieza de subidas, la liquidación de réplicas, la reparación y la recolección de basura se coordinan con bloqueos por CID y un arrendamiento de recolección en todo el almacenamiento. La compensación de fallos restaura tanto el anclaje como el registro a su línea base observada en lugar de dejarlos en estados contradictorios.

El valor predeterminado `storage.confirmationRequired: false` mantiene el contrato de API existente donde las subidas se vuelven duraderas inmediatamente. Las implementaciones que habilitan la confirmación reciben un TTL configurable para subidas abandonadas y deben llamar al endpoint de confirmación autenticado.

## Recolección de basura basada en presión y consciente del ciclo de vida

Liberar un anclaje y eliminar bloques son decisiones separadas intencionalmente. Un archivo liberado permanece en el almacén de bloques y puede seguir sirviendo lecturas sin coste. Los bloques solo se eliminan cuando el almacén de bloques supera la marca de agua alta configurada o el sistema de archivos cae en la reserva de disco. Esto evita descartar caché útil solo para tener que recuperarla de nuevo más tarde.

El recolector tiene varias propiedades de seguridad. El contenido confirmado retenido por este nodo nunca se selecciona para su desalojo. La protección faltante en un archivo confirmado se repara antes de que comience cualquier eliminación. Una ejecución que no puede verificar el contenido duradero se aborta antes de su primera acción destructiva. Los fallos parciales de GC retienen los registros para que la siguiente pasada pueda reintentar de forma segura. El modo de prueba (dry-run) informa del plan exacto de liberación y retención sin cambiar anclajes ni bloques. Los barridos programados están limitados y avanzan en lugar de escanear repetidamente todo el registro.

Los valores predeterminados documentados son una marca de agua alta de 50 GiB, una marca de agua baja de 40 GiB, una reserva de espacio libre de 5 GiB y una pasada programada cada 15 minutos. Todos los valores son configurables. La GC programada está habilitada de forma predeterminada, pero no realiza ninguna eliminación mientras el espacio permanezca por encima de los umbrales de seguridad. Los operadores pueden inspeccionar el plan con:

bash
curl --fail-with-body \
  -X POST \
  -H "x-api-key: $ADMIN_API_KEY" \
  "https://ipfs.example.org/api/storage/gc?dryRun=true"

## Replicación sobre la red libp2p existente

La replicación se ejecuta sobre `/adamant/replication/1.0.0`, no sobre un servicio HTTP adicional. El protocolo de enlace (handshake) de libp2p demuestra la identidad del par remoto, por lo que la replicación no necesita un secreto de API compartido, un segundo puerto público o un demonio de clúster separado. Las operaciones que hacen que este nodo sea responsable del contenido solo se aceptan de los pares listados en `nodes`. Los mensajes de control están enmarcados por longitud y limitados. Las transacciones de réplica registran a su par de origen, y solo ese par puede liquidarlas.

Los poseedores se seleccionan mediante hash de encuentro (rendezvous hashing) sobre el CID. Cada nodo con la misma lista de miembros calcula de forma independiente el mismo conjunto de poseedores sin un coordinador central. La política de colocación predeterminada mantiene cuatro copias para contenido nuevo, tres copias después de 180 días y dos copias después de un año. El recuento está limitado por el tamaño real de la red, por lo que una red de tres nodos a la que se le piden cuatro copias coloca una copia en cada nodo disponible. La colocación se reduce según la antigüedad del archivo en lugar del tiempo de último acceso, ya que rastrear las lecturas crearía metadatos sobre cuándo los usuarios recuperan los archivos.

La durabilidad estricta de la subida es opcional. Cuando `replication.requireQuorumOnUpload` está habilitado, la admisión local y las réplicas remotas forman una transacción con capacidad de reversión: los pares preparan copias, el origen verifica el quórum de reconocimiento configurado y luego confirma o aborta cada réplica preparada. Una configuración estricta requiere `ackQuorum >= 2`, asegurando que el éxito pruebe al menos una copia remota.

## Reparación, transferencia y recuperación

El trabajo de reparación pregunta a un par si ya tiene un CID y si tiene espacio antes de transferir los datos. La entrada está limitada por concurrencia, tamaño de solicitud, reserva de disco, tiempo de espera y presupuesto por par. Un nodo fuera del conjunto actual de poseedores entrega su copia duradera a los poseedores designados y libera su propio anclaje solo después de que esos poseedores confirmen que tienen el archivo. Si todos los poseedores remotos desaparecen más tarde mientras los bloques aún son locales, el nodo vuelve a asumir la responsabilidad en lugar de permitir que la última copia recuperable desaparezca.

Las lecturas también utilizan información de colocación. Antes de servir un CID, un nodo se conecta directamente a los pares que se espera que lo contengan en lugar de depender de que un par de Bitswap útil ya esté conectado. El peering periódico mantiene la malla configurada disponible después del inicio. Esto es importante para ADAMANT Messenger: un remitente y un receptor normalmente utilizan nodos de infraestructura diferentes, por lo que la primera lectura del receptor suele caer en un nodo que no es un poseedor designado.

## Preservación de archivos y CIDs existentes

La actualización no vuelve a importar, reescribir ni renombrar el contenido almacenado. La generación de CID sigue siendo compatible con la pila anterior, por lo que los enlaces de mensajes existentes siguen direccionando a los mismos archivos. Al inicio, los anclajes anteriores al registro del ciclo de vida se rellenan como registros confirmados. Sus tamaños de DAG se miden sin conexión y el contenido incompleto se reporta en lugar de registrarse silenciosamente como duradero. La API puede iniciarse mientras el relleno continúa en segundo plano.

Una implicación de capacidad es importante: el tiempo de subida original de un anclaje heredado no se puede recuperar, por lo que los archivos rellenados se tratan inicialmente como nuevos y entran en el nivel de colocación más amplio. Los operadores deben planificar la capacidad del clúster para el corpus existente, no solo para futuras subidas. Los procesos de reparación procesan ese corpus en lotes limitados y progresivos en lugar de intentar replicar todo en una sola pasada.

Solo se ofrece `/adamant/replication/1.0.0` actualmente, por lo que esta versión está destinada a una actualización coordinada en todo el clúster. `GET /api/storage/metrics` expone la versión del protocolo activo, haciendo visible una implementación mixta.

## Visibilidad operativa y límites de acceso

Las rutas públicas de solo lectura exponen la capacidad y el estado del ciclo de vida sin nombres de archivo, inventarios de CID o topología de pares: `GET /api/file/:cid/status`, `GET /api/storage/metrics` y `GET /api/storage/policy`. Las mutaciones administrativas como la confirmación, liberación, GC bajo demanda, reparación, gestión de anclajes y operaciones de topología libp2p requieren la `x-api-key` configurada.

El informe de almacenamiento incluye bytes anclados y recuperables, disponibilidad del sistema de archivos, capacidad reservada y utilizable, recuentos de ciclo de vida, transacciones de réplica en espera, estado del trabajo y salud de la replicación. Proporciona suficiente información para validar una actualización y monitorear las pasadas posteriores de recolección y reparación sin exponer detalles operativos privados.

## Valores predeterminados que los operadores deben revisar

Los valores predeterminados se adaptan a un volumen de almacenamiento dedicado y preservan el comportamiento actual de subida inmediata. El tamaño agregado de subida es de 512 MiB, las subidas concurrentes de 32, la reserva de disco de 5 GiB, el TTL temporal de 24 horas, el programa de GC cada 15 minutos, el programa de reparación cada 30 minutos y la colocación de contenido nuevo de 4 copias. El quórum de reconocimiento de subida es de 1 (replicación de mejor esfuerzo) y el quórum estricto de subida está deshabilitado. Cada operador debe revisar la capacidad, las marcas de agua, las listas de miembros y los niveles de colocación antes de la implementación.

## Verificación

La implementación fusionada superó 232 pruebas unitarias, 102 pruebas de integración, la compilación de producción de TypeScript, las comprobaciones de ESLint y Prettier, una auditoría de dependencias de producción y escaneos Semgrep SAST y Semgrep OSS. También se probó en una red de cuatro nodos: dieciséis archivos se colocaron en tres poseedores mientras eran nuevos, convergieron a exactamente dos poseedores después de envejecer al siguiente nivel y luego se leyeron byte a byte desde los cuatro nodos a través de 64 lecturas exitosas entre nodos. No se introdujo ninguna nueva dependencia de tiempo de ejecución.

## Trabajo de seguimiento deliberado

Esta versión establece almacenamiento limitado y durabilidad entre nodos, pero no pretende resolver todos los problemas de propiedad o membresía de red. El Issue #27 rastrea la eliminación autorizada por la firma del cargador original. El Issue #28 rastrea el descubrimiento descentralizado de nodos y la resistencia a Sybil. El Issue #29 rastrea la contabilidad de tráfico, el retroceso (backoff) y los límites mensuales. El cifrado del contenido sigue siendo responsabilidad del protocolo del cliente ADAMANT; el nodo de almacenamiento gestiona el contenido cifrado por CID y no necesita acceso al texto plano.
