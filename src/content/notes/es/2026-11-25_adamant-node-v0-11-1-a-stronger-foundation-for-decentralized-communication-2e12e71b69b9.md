---
title: "ADAMANT Node v0.11.1: Seguridad, resiliencia y APIs más claras"
slug: "adamant-node-v0-11-1-a-stronger-foundation-for-decentralized-communication-2e12e71b69b9"
description: "La comunicación descentralizada depende de nodos independientes. ADAMANT node v0.11.1 es una actualización de seguridad y fiabilidad que optimiza las operaciones diarias."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v0-11-1-a-stronger-foundation-for-decentralized-communication-2e12e71b69b9"
publishedAt: "2026-11-25T17:54:29.629Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:2e12e71b69b9"
coverImage: "/images/engineering-notes/medium/2e12e71b69b9/001-866983f729.webp"
locale: "es"
placeholder: false
---

La comunicación descentralizada depende de nodos operados de forma independiente que validan, intercambian y preservan datos. ADAMANT node v0.11.1 es una versión centrada en la seguridad y la fiabilidad que refuerza las operaciones diarias sin alterar las reglas de consenso existentes del protocolo. Es la primera versión etiquetada de la línea v0.11; el código v0.11.0 se integró pero nunca se etiquetó, y la v0.11.1 incluye una corrección adicional en la red de pares, por lo que los operadores que ya ejecutan ese código deben actualizarse.

### Reducción de la superficie de ataque

Esta versión elimina los controles de forjado HTTP heredados y los endpoints de tiempo de ejecución de DApp. Estas superficies incluían rutas de ejecución y firma del lado del servidor que ya no tienen cabida en un nodo moderno. Su eliminación aborda el aviso GHSA-vjhq-r5fg-85cx y facilita la comprensión del límite operativo del nodo. Los delegados ahora configuran el forjado a través de `forging.secret` y aplican los cambios con un reinicio controlado. Los comandos CLI locales opcionales permiten bloquear y desbloquear frases de contraseña cifradas. Las APIs de DApp de solo lectura y el manejo del consenso para los tipos de transacciones de DApp existentes siguen estando disponibles; los clientes deben firmar las transacciones localmente y enviarlas a través de los endpoints de transacción estándar.

### Secretos de delegado cifrados

Los operadores ahora pueden cifrar las frases de contraseña de forjado con una contraseña de operador utilizando AES-256-GCM y scrypt. La configuración en texto plano sigue siendo compatible con implementaciones existentes. Un nodo con secretos cifrados aún puede sincronizarse, mantener pares, servir APIs y procesar su mempool mientras el forjado está bloqueado. Después de cada reinicio, el operador desbloquea el forjado mediante un aviso local o un socket de control Unix exclusivo del propietario. El soporte de monitoreo permite a los operadores observar el estado de bloqueo sin exponer la identidad del delegado. El cifrado protege las frases de contraseña almacenadas, pero no exime al operador de la responsabilidad de asegurar el host, la contraseña, las copias de seguridad y el acceso.

### Resiliencia de la red

Los límites contra abusos de HTTP y WebSocket para entornos de producción están habilitados por defecto, cubriendo APIs públicas, tráfico de pares, intentos de conexión y suscripciones, con una respuesta HTTP 429 documentada para solicitudes que exceden la tasa permitida. Existe una advertencia importante sobre versiones mixtas: los pares heredados que no envían el encabezado de negociación de límite de tasa omiten los límites HTTP de pares dentro del nodo durante la transición. Los operadores deben aplicar límites externos en `/peer/*` en su proxy inverso o firewall. Las configuraciones existentes que contienen explícitamente ajustes heredados `max: 0` mantienen los límites afectados deshabilitados hasta que se actualicen.

La versión también delimita las comprobaciones de estado de los pares, gestiona los pares inalcanzables de forma más deliberada y mejora la recuperación de PostgreSQL tras una pérdida de conexión. Los scripts de instalación y reparación ahora verifican las instantáneas antes de la ruta de reemplazo de base de datos predeterminada, utilizan la instalación de dependencias basada en archivos de bloqueo y son más cuidadosos al reiniciar un nodo mientras se sincroniza o reconstruye.

### Conexiones de pares en tiempo real restauradas

La corrección final de la v0.11.1 restaura la selección de pares WebSocket salientes. En el código v0.11.0 sin etiquetar, la falta de valores predeterminados en los objetos de pares activos causaba que la consulta de candidatos no devolviera ningún par. Los nodos aún podían sincronizarse a través de HTTP y recibir conexiones WebSocket entrantes, pero el envío de bloques y transacciones en tiempo real salientes no funcionaba. La corrección establece los valores predeterminados en la instancia de par activa, y las pruebas de regresión cubren los valores predeterminados de los pares y la consulta de selección.

### Corrección de repetición y APIs más estrictas

La liquidación de rondas ahora respeta la altura de bloque actual durante la repetición, y la indexación de recompensas de reversión alinea a cada delegado con sus propios cambios. Las notas de la versión informan de comprobaciones de equivalencia de estado bit a bit en la red principal (mainnet) y la red de prueba (testnet) canónicas durante la reconstrucción completa, el inicio de la imagen y la recuperación de puntos de control. Un problema de reversión preexistente independiente sigue siendo rastreado en el issue #300.

Para los desarrolladores de aplicaciones, el manejo de filtros en estados, chats y salas de chat es ahora más estricto. Los filtros `and:` soportados se aplican de forma consistente; los filtros `or:` no soportados y los parámetros ignorados anteriormente son rechazados. El parámetro de clave de lote cambia de `keysIds` a `keyIds`. Estos son cambios intencionales en la API HTTP que rompen la compatibilidad, por lo que las integraciones deben revisarse antes de la implementación.

### Documentación unificada

La documentación del nodo y la especificación OpenAPI 3.2 ahora residen junto al código en el repositorio del nodo, lo que permite actualizar el comportamiento, la documentación y el contrato de API de forma conjunta. Los operadores y desarrolladores pueden explorar la [documentación](https://docs.adamant.im/) unificada y el [esquema de API](https://docs.adamant.im/schema/), incluyendo nuevas guías para la actualización, seguridad, monitoreo y pruebas.

### Notas de actualización

La actualización no introduce ninguna bifurcación (fork) de consenso ni nuevas migraciones SQL. La serialización de bloques y transacciones, las firmas, el orden de los delegados, las recompensas, las tarifas, las alturas de activación y la temporización de ranuras permanecen sin cambios respecto a la v0.10.2. Requiere atención a la compatibilidad operativa y de la API HTTP. Los operadores deben leer la [guía de actualización](https://docs.adamant.im/own-node/upgrading.html) y verificar las integraciones en busca de rutas eliminadas y filtros más estrictos. Se requiere una versión de Node.js compatible: `^22.22.2 || >=24.15.0`. Detenga el nodo de forma controlada y espere a la limpieza, luego revise los límites de tasa, la confianza del proxy y la configuración de forjado antes de reiniciar. Si los secretos de forjado están cifrados, desbloquéelos después de cada reinicio y verifique el estado de bloqueo local. Tras la actualización, compruebe el estado del nodo, la conectividad de los pares y los ajustes contra abusos.
