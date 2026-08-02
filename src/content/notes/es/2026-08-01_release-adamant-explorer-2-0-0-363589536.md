---
title: "ADAMANT Explorer v2.0.0"
slug: "release-adamant-explorer-2-0-0-363589536"
description: "ADAMANT Explorer v2.0.0 es la primera versión estable desde la v1.3.0, modernizando el frontend, backend, monitoreo, seguridad, dependencias y documentación operativa."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-explorer/releases/tag/2.0.0"
publishedAt: "2026-08-01T17:56:02Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-explorer"
tag: "2.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-explorer:363589536"
locale: "es"
placeholder: false
---

ADAMANT Explorer v2.0.0 es la primera versión estable desde la v1.3.0. Esta actualización moderniza el frontend, el backend, el monitoreo en tiempo real, los límites de seguridad, las dependencias, las pruebas y la documentación operativa del Explorer, preservando al mismo tiempo las URL de las páginas públicas y los enlaces directos existentes.

El frontend ha sido reconstruido utilizando Vue 3, Pinia, Vue Router 5 y Vite 8, reemplazando la pila anterior de AngularJS, Bootstrap 3 y Webpack. Todas las páginas públicas del Explorer ahora cuentan con diseños adaptables para escritorio, tableta y dispositivos móviles, con temas claros y oscuros persistentes, controles accesibles, tarjetas de transacciones móviles, información sobre herramientas (tooltips) más segura y una mejor respuesta al copiar datos. Se ha añadido semántica contextual de transacciones para transferencias, votos y revocaciones, operaciones de DApp, actividad de intercambio y bonos de bienvenida.

En el backend, el acceso a ADAMANT Node se ha reconstruido en torno a `adamant-api` 3.1.0, incorporando control de disponibilidad (readiness gating), conmutación por error (failover), paginación acotada, normalización de errores y capas de solicitud y gestión separadas. Se mantienen las 12 rutas de mismo origen requeridas por la interfaz del Explorer y se ha añadido una nueva ruta `GET /api/networkHealth`. Ahora se cuenta con validación estricta de rutas y consultas, ordenamiento determinista de transacciones, filtrado de transferencias corregido, paginación de cuentas principales, confirmaciones en tiempo real y formato ADM de precisión completa. Redis es opcional para el servicio principal, mientras que se mantienen el almacenamiento en caché de API resiliente y las estadísticas continuas de bloques y nodos (peers).

El monitoreo en tiempo real se ha estabilizado en los ciclos de vida de Header, Delegate Monitor, Network Monitor y Activity Graph Socket.IO, con sondeo serializado y reintentos limitados. Se han añadido actualizaciones de página basadas en bloques y confirmación REST acotada para notificaciones de bloques mediante WebSocket. Se han mejorado los cronogramas de delegados, los estados de forjado, las recompensas, las tarifas, las estadísticas de nodos, el ordenamiento de versiones y el comportamiento en los límites de ronda. La integración con Freegeoip ha sido reemplazada por una geolocalización de nodos opcional mediante GeoJS, y se ha introducido un proxy de mosaicos de OpenStreetMap de mismo origen, validado, almacenado en caché y con limitación de tasa.

Las mejoras en seguridad y confiabilidad incluyen la eliminación de CORS con comodines y de 16 puntos finales de la API del Explorer heredados y sin soporte. Se han añadido límites de tasa de API con reconocimiento de proxy, proxies de confianza validados, encabezados de seguridad, una CSP restringida, errores estables y tiempos de espera HTTP explícitos. Los registros de solicitudes se han minimizado excluyendo las cadenas de consulta, y se validan los datos no confiables provenientes de nodos, pares, proxies, Redis, geolocalización y orígenes de navegador. Se han incorporado un modelo de amenazas para el repositorio, una revisión de seguridad y confiabilidad, y una amplia cobertura de pruebas unitarias para los límites públicos y el estado del monitoreo en tiempo real.

El entorno de ejecución soportado se ha actualizado a Node.js `^22.18.0 || >=24.11.0`. Se han actualizado Express, Redis, Socket.IO, Axios, Vue, Vite, Pinia, Vue Router, ESLint, Mocha, Chai, Supertest y las dependencias restantes. Se han eliminado Grunt, Protractor, Cucumber, Jenkins, Travis, Webpack/Babel, así como las integraciones obsoletas de Market Watcher y de intercambios. Se han añadido 43 módulos de pruebas unitarias exclusivos para Node, se han actualizado las configuraciones de Testnet en vivo y se ha ampliado la cobertura de API, seguridad, programación, modelado de datos y utilidades de frontend. El archivo `README.md` se ha renovado con guías operativas actuales para colaboradores y agentes de IA.

La validación incluyó la superación de las comprobaciones de ESLint y Prettier, una compilación de producción con 6,337 módulos transformados, un conjunto de pruebas unitarias de 226 casos, un conjunto de pruebas de API de Testnet con 41 casos sobre el árbol de fuentes publicado, una auditoría de dependencias que reporta 0 vulnerabilidades y comprobaciones de humo en navegadores que cubren 13 rutas en resoluciones de escritorio, tableta y móvil sin errores de consola ni desbordamiento horizontal.

### Cambios importantes (Breaking changes)

Node.js debe actualizarse a `^22.18.0 || >=24.11.0`. La configuración de despliegue debe crearse a partir del nuevo `config.default.jsonc`, revisando los parámetros `nodes_adm`, `trustedProxies`, `redis`, `geoLocation`, `exchangeRates` y `log_level`. Se requiere ADAMANT Node v0.10.2 o superior, y se prefieren múltiples nodos HTTPS operados de forma independiente. La integración eliminada de Freegeoip debe reemplazarse con la configuración opcional de GeoJS; deshabilitar la geolocalización mantiene disponibles los datos de nodos y nombres de host sin mapas ni banderas de países. Los consumidores externos de rutas de la API del Explorer eliminadas deben migrar a `adamant-api-jsclient`, y se debe utilizar `GET /api/networkHealth` para el monitoreo operativo. La ruta de mismo origen `/osm-tiles/` debe permitirse en las reglas de firewall y proxy inverso. El paquete `public/` ignorado debe compilarse durante el despliegue con `npm run build`. Para el desarrollo, utilice `npm run dev` para la pila combinada de backend y Vite, o `npm run dev:frontend` solo para Vite. Las rutas de página y enlaces directos existentes del Explorer siguen siendo compatibles, y aunque se recomienda Redis, ya no es obligatorio para el servicio principal de HTTP y contenido estático.
