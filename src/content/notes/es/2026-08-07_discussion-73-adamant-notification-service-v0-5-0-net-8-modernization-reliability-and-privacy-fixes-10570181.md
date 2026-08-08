---
title: "ADAMANT Notification Service v0.5.0: Modernización a .NET 8, mejoras de fiabilidad y privacidad"
slug: "discussion-73-adamant-notification-service-v0-5-0-net-8-modernization-reliability-and-privacy-fixes-10570181"
description: "ADAMANT Notification Service (ANS) envía notificaciones push a la app iOS de ADAMANT sin que ANS o Apple sepan quién envía mensajes a quién. La v0.5.0 es su primera versión."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/73"
publishedAt: "2026-08-07T14:06:51Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10570181"
locale: "es"
placeholder: false
---

[ADAMANT Notification Service (ANS)](https://github.com/Adamant-im/adamant-notificationService) envía notificaciones push de Apple para la aplicación iOS de ADAMANT sin que ANS o Apple lleguen a saber nunca quién envía mensajes a quién. La versión [v0.5.0](https://github.com/Adamant-im/adamant-notificationService/releases/tag/v0.5.0) es su primer lanzamiento etiquetado desde la versión 0.4.1 en 2019.

No se trató de una reescritura. Está previsto que ANS sea sustituido eventualmente por [adamant-ns](https://github.com/Adamant-im/adamant-ns), por lo que el objetivo fue limitado: eliminar dependencias obsoletas y corregir los errores que causaban incidentes en producción, sin alterar la arquitectura ni el modelo de privacidad.

## Entorno de ejecución

El servicio pasó de `netcoreapp3.0` (EOL, sin soporte desde 2020) a **.NET 8 LTS** en todos los proyectos. Esto permite el despliegue nativo en Ubuntu 22.04+ sin depender de contenedores con librerías obsoletas para mantener el antiguo entorno de ejecución.

## Fuga de sockets

El cliente de la API asignaba un nuevo `HttpClient` por cada solicitud y nunca lo liberaba. En producción, esto se manifestaba como un aumento constante de sockets bloqueados en estado `CLOSE-WAIT`, confirmado en aproximadamente 30+ descriptores de archivo por minuto en una instancia en ejecución. Al alcanzar cierto punto, esto provocaba la caída de la resolución DNS para todo el proceso. Ahora se utiliza un único cliente compartido y reutilizado.

## Conmutación por error (Failover)

Anteriormente, la selección de nodos elegía un nodo configurado al azar y nunca reintentaba. Cualquier error en ese nodo, incluso uno transitorio, bloqueaba todo el servicio. Ahora, el sistema reintenta la conexión con un nodo diferente antes de desistir, y una caída total en todos los nodos configurados resulta en "omitir este ciclo" en lugar de provocar un fallo.

## Cambio de proveedor de EF Core

El plan original era dejar EF Core intacto y solo actualizar el framework de destino de la aplicación. Esto funcionó para el núcleo del ORM (EF Core 2.2 apunta a `netstandard2.0`, por lo que compila con .NET 8), pero el proveedor de MySQL (`MySql.Data.EntityFrameworkCore`) no funcionó en absoluto: se produjo una `AmbiguousMatchException` en la primera consulta, detectada por una nueva prueba de humo basada en SQLite antes de llegar a producción. Fue reemplazado por `Pomelo.EntityFrameworkCore.MySql`, el proveedor con mantenimiento activo que se ha convertido en el estándar en el ecosistema .NET.

## Mejoras de privacidad

Tres declaraciones de registro (logs) imprimían datos sensibles: un token de dispositivo en cada notificación exitosa, una carga útil de señal *desencriptada* (que incluye el token del dispositivo) en caso de error de análisis, y una contraseña de certificado APNs en caso de error de carga. Los tres casos violaban las propias normas de privacidad del proyecto y han sido eliminados.

## Otras correcciones en producción

Tras implementar lo anterior, se encontraron y corrigieron problemas adicionales en el entorno de producción: un error de expansión de ruta `~` que impedía el inicio de ambos trabajadores en un servidor sin monitor, un caso extremo de inicio que podía enviar notificaciones masivas sobre transacciones antiguas tras un fallo de red, un problema de seguridad de hilos en la selección de nodos bajo uso concurrente, la falta de un tiempo de espera (timeout) HTTP y una referencia nula ante una respuesta APNs mal formada.

## Apagado elegante

Ninguno de los trabajadores observaba anteriormente la señal `SIGTERM`, por lo que un `docker stop` o `systemctl restart` rutinario siempre aparecía como un fallo en los registros. Ahora se cierran correctamente.

## Pruebas y seguimiento de versiones

La cobertura de pruebas aumentó de unas pocas a 35, incluyendo la prueba de humo de EF Core/SQLite mencionada anteriormente. Las compilaciones ahora llevan un número de versión real; anteriormente, cada compilación se enviaba silenciosamente como `1.0.0.0` independientemente de lo que indicara el archivo del proyecto.

## Seguridad

Seguridad auditada por [cryptofoundry](https://adamant.business#contact).

## Enlaces

- [Notas de la versión](https://github.com/Adamant-im/adamant-notificationService/releases/tag/v0.5.0)
- [Diferencias completas, 0.4.1 → v0.5.0](https://github.com/Adamant-im/adamant-notificationService/compare/0.4.1...v0.5.0)
- [Incidencia de seguimiento](https://github.com/Adamant-im/adamant-notificationService/issues/12)
- [Repositorio](https://github.com/Adamant-im/adamant-notificationService)
