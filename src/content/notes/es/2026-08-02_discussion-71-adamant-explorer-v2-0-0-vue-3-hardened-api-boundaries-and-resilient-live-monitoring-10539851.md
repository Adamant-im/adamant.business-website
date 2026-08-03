---
title: "ADAMANT Explorer v2.0.0: Vue 3, límites de API reforzados y monitoreo en tiempo real resiliente"
slug: "discussion-71-adamant-explorer-v2-0-0-vue-3-hardened-api-boundaries-and-resilient-live-monitoring-10539851"
description: "ADAMANT Explorer v2.0.0 es la primera versión estable desde la v1.3.0, consolidando 218 commits y 491 archivos modificados en una actualización mayor de frontend, backend y más."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/71"
publishedAt: "2026-08-02T13:46:45Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10539851"
locale: "es"
placeholder: false
---

ADAMANT Explorer v2.0.0 es la primera versión estable desde la v1.3.0, consolidando 218 commits y 491 archivos modificados en una actualización mayor de frontend, backend, monitoreo en tiempo real, seguridad y operaciones, manteniendo al mismo tiempo las rutas públicas y los enlaces directos existentes.

## Arquitectura del frontend

La aplicación heredada de AngularJS, Bootstrap 3 y Webpack ha sido reemplazada por componentes de archivo único de Vue 3, Pinia para el estado compartido de la red, Vue Router 5 con compatibilidad de URL y Vite 8 para las compilaciones. Las utilidades independientes del framework residen en `src/lib/` y pueden probarse directamente en Node.js.

Se reconstruyeron todas las vistas principales: inicio, bloques, transacciones, direcciones, delegados, Cuentas Top, Carteras Reservadas, Monitor de Delegados, Monitor de Red y Gráfico de Actividad. La interfaz de usuario ahora incluye temas claros y oscuros persistentes, tablas y tarjetas de transacciones adaptables, controles accesibles, ordenamiento determinista de transacciones y presentación de ADM con precisión total donde la exactitud del libro mayor es fundamental.

## Nodo ADAMANT y límite de API

Toda la interacción con el nodo ADAMANT ahora se realiza a través de `adamant-api` 3.1.0 en una capa dedicada de adaptador de solicitudes. El backend añade control de preparación al inicio, conmutación por error de nodos, fallos normalizados del SDK, paginación limitada, validación estricta de rutas/consultas y capas separadas para la solicitud, normalización y ensamblaje de respuestas.

El Explorer expone solo 12 rutas de mismo origen requeridas por su interfaz, además de `GET /api/networkHealth`. Se eliminaron 16 endpoints heredados no compatibles, el paso arbitrario de filtros de transacciones, CORS con comodines y rutas obsoletas de Market Watcher. Esta superficie reducida constituye un límite de implementación para la interfaz del Explorer, no una API pública de propósito general. Las aplicaciones externas deben utilizar `adamant-api-jsclient`. El monitoreo operativo puede usar `GET /api/networkHealth`, que informa estados coherentes de `live`, `degraded`, `critical` o `unavailable`.

## Monitoreo en tiempo real y consistencia de caché

Los cuatro espacios de nombres públicos de Socket.IO (Header, Delegate Monitor, Network Monitor y Activity Graph) ahora utilizan sondeo serializado, generaciones de ciclo de vida, reintentos limitados y protección contra devoluciones de llamada obsoletas. Las actualizaciones basadas en bloques reemplazan los retrasos de frescura fijos para las vistas abiertas de Inicio y Bloques. La hidratación REST y la confirmación limitada respaldan las notificaciones de bloques de WebSocket. Los cálculos de programación de delegados, estado de forjado, recompensas, comisiones y límites de ronda son ahora estables, con estadísticas coherentes de bloques y pares, y persistencia opcional en Redis. La identidad de caché maneja correctamente los bloques nuevos y los reemplazos de bifurcaciones a la misma altura.

La geolocalización de pares mediante GeoJS está limitada con normalización en caché y degradación basada solo en el nombre de host. Un proxy de mosaicos de OpenStreetMap validado, en caché, con límite de tiempo y limitado por IP por cliente, admite implementaciones tanto en clearnet como en Tor. Redis sigue siendo recomendado para el almacenamiento en caché de respuestas y estadísticas persistentes, pero los fallos de Redis ya no afectan al HTTP central ni al servicio de archivos estáticos.

## Refuerzo de seguridad y privacidad

Los límites de solicitudes públicas y del navegador ahora incluyen la aplicación exacta de la superficie de la API antes del trabajo de caché y preparación de ADAMANT, validación estricta para direcciones, identificadores uint64, paginación, rutas, métodos y filtros, y un limitador de API de ventana fija en proceso con identidad de cliente consciente del proxy y un bucket de desbordamiento con fallo cerrado. Se aplican encabezados de seguridad, una Política de Seguridad de Contenido (CSP) restringida, errores públicos estables, tiempos de espera HTTP explícitos y registros de acceso con cadenas de consulta minimizadas. Los valores del Monitor de Red provenientes de nodos y pares se renderizan solo como texto y se validan. La degradación elegante cubre fallos de Redis, nodos, tipos de cambio, geolocalización y proveedores de mosaicos.

El repositorio incluye un modelo de amenazas versionado y una revisión de seguridad y fiabilidad. La seguridad fue auditada por cryptofoundry.

## Cambios en tiempo de ejecución y despliegue

Los operadores que actualicen desde la v1.3.0 deben tener en cuenta que se requiere Node.js `^22.18.0 || >=24.11.0`, y que los nodos ADAMANT configurados deben ejecutar la versión v0.10.2 o superior. Se debe preparar un nuevo `config.jsonc` a partir de `config.default.jsonc`, prestando atención a `nodes_adm`, `trustedProxies`, `redis`, `geoLocation`, `exchangeRates` y `log_level`. Freegeoip ha sido reemplazado por una integración opcional con GeoJS; deshabilitar la geolocalización conserva los datos de pares y nombres de host sin los datos de mapas derivados del proveedor. Los proxies inversos y firewalls deben permitir la ruta de mismo origen `/osm-tiles/`. Los activos generados en `public/` no se confirman y deben compilarse durante el despliegue con `npm run build`. `npm run dev` inicia el backend y Vite juntos; `npm run dev:frontend` inicia solo Vite.

## Validación

El árbol de fuentes publicado superó las comprobaciones de ESLint y Prettier, una compilación de producción con 6,337 módulos transformados, 226 pruebas unitarias solo para Node, 41 pruebas de API de la Testnet de ADAMANT en tiempo real, y auditorías de dependencias completas y solo de producción con cero vulnerabilidades reportadas. Las pruebas de humo del navegador en 13 rutas a resoluciones de escritorio, tableta y móvil no produjeron errores de consola ni desbordamiento horizontal.

La versión completa está disponible en [GitHub Releases](https://github.com/Adamant-im/adamant-explorer/releases/tag/2.0.0).
