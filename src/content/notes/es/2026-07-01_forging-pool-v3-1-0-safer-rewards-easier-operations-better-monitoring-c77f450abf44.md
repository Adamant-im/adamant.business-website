---
title: "ADAMANT Forging Pool v3.1.0: Recompensas más seguras, operaciones más fáciles, mejor monitoreo"
slug: "forging-pool-v3-1-0-safer-rewards-easier-operations-better-monitoring-c77f450abf44"
description: "ADAMANT Forging Pool v3.1.0 es una actualización recomendada para operadores de pools. Mejora el cálculo de recompensas, la confiabilidad de pagos, la lógica contable y moderniza el entorno de ejecución."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/forging-pool-v3-1-0-safer-rewards-easier-operations-better-monitoring-c77f450abf44"
publishedAt: "2026-07-01T18:03:33.378Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:c77f450abf44"
coverImage: "/images/engineering-notes/medium/c77f450abf44/001-5ca73690a5.webp"
locale: "es"
placeholder: false
---

ADAMANT Forging Pool v3.1.0 es una actualización recomendada para operadores de pools. Mejora el cálculo de recompensas y la confiabilidad de pagos, refuerza la lógica contable, moderniza el entorno de ejecución y simplifica las operaciones diarias.

### Por qué esta versión es importante

La responsabilidad principal de un pool de forjado es calcular correctamente las recompensas para los votantes y pagarlas de forma segura. La versión v3.1.0 se centra exactamente en eso. Los flujos de recompensas y pagos fueron revisados y reforzados para reducir riesgos en casos extremos relacionados con reintentos, fallos parciales y valores de recompensas almacenados. Las recompensas pendientes se normalizan antes del cálculo de pagos, y el progreso de las recompensas por votante ahora se rastrea de forma más segura, de modo que un cierre inesperado o un reintento no duplique accidentalmente las actualizaciones de recompensas. Esto hace que la versión sea especialmente importante para operadores que valoran la precisión en los pagos y la confiabilidad a largo plazo.

### Novedades en v3.1.0

El cambio de infraestructura más importante es la migración a almacenamiento respaldado por MongoDB, lo que brinda a los operadores de pools una capa de almacenamiento más robusta para bloques, votantes, transacciones, historial de recompensas y datos operativos. Para pools existentes, v3.1.0 incluye herramientas de migración para datos anteriores basados en LowDB, por lo que los operadores pueden avanzar sin perder el estado histórico de recompensas.

![Forging Pool v3.1.0: Recompensas más seguras, operaciones más fáciles, mejor monitoreo](/images/engineering-notes/medium/c77f450abf44/002-a7aa0fc331.webp)

La versión también añade una distribución de recompensas más segura y contabilidad de pagos, seguimiento de progreso de recompensas seguro ante reintentos, registros mejorados para pagos y procesamiento de bloques, un punto final `/api/health` para monitoreo externo, soporte opcional para frase de acceso cifrada del delegado, comandos CLI `adm-pool` para cifrar, desbloquear, bloquear y estado, filtrado del panel por dirección o nombre, visualización más clara de votantes/delegados en tablas, documentación actualizada y un entorno de ejecución basado en Node.js 22.13.0+.

### Mayor seguridad para operadores

Los operadores de pools ahora pueden cifrar la frase de acceso del delegado con una contraseña de operador. Esta función es opcional, por lo que las configuraciones anteriores con frases de acceso en texto plano siguen siendo compatibles, pero el nuevo flujo de trabajo ofrece a los operadores una ruta más segura para producción. Con frases de acceso cifradas, el pool puede iniciarse en estado bloqueado. La sincronización de bloques, el panel y las APIs públicas permanecen disponibles, mientras que los pagos y las notificaciones ADM permanecen en pausa hasta que el operador desbloquee el pool. Esto significa que un servidor puede recuperarse o reiniciarse sin exponer inmediatamente la capacidad de pago.

### Operaciones y monitoreo más fáciles

El nuevo CLI `adm-pool` ofrece a los operadores comandos simples para las acciones de runtime más sensibles:

```sh
npm run adm-pool encrypt
npm run adm-pool unlock
npm run adm-pool lock
npm run adm-pool status
```

En lugar de manejar manualmente cada cambio de estado sensible dentro de archivos de configuración o registros de procesos, los operadores obtienen un flujo de control dedicado. El nuevo punto final `/api/health` proporciona una instantánea de estado sin secretos para herramientas de monitoreo como Zabbix, paneles personalizados o verificaciones de disponibilidad. Combinado con el almacenamiento en MongoDB y registros más claros, esto hace que el pool sea más fácil de observar, depurar y mantener con el tiempo.

### Actualización recomendada

ADAMANT Forging Pool v3.1.0 se recomienda para todos los operadores de pools, especialmente aquellos que ejecutan pools en producción con pagos regulares. Antes de actualizar, los operadores deben respaldar su configuración y historial de recompensas, revisar la configuración de MongoDB, probar la migración en una copia de los datos existentes y verificar la configuración de pagos después de la migración.

Lanzamiento: [https://github.com/Adamant-im/pool/releases/tag/v3.1.0](https://github.com/Adamant-im/pool/releases/tag/v3.1.0)
Repositorio: [https://github.com/Adamant-im/pool](https://github.com/Adamant-im/pool)
