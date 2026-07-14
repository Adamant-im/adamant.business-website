---
title: "ADAMANT v4.11.0: Más Confiable, Pulido y Maduro"
slug: "adamant-v4-11-0-more-reliable-polished-mature-80c9b4c0a888"
description: "ADAMANT v4.11.0 incluye 20 solicitudes de fusión y 437 commits, con enfoque en confiabilidad de conexión, consistencia de interfaz, flujos de billetera y estabilidad general."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-v4-11-0-more-reliable-polished-mature-80c9b4c0a888"
publishedAt: "2026-03-20T16:23:57.256Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/80c9b4c0a888/001-1-4agtbybzbmpaqqrwpbaz5q-png.webp"
cardSpan: "full"
originalId: "medium:80c9b4c0a888"
locale: "es"
placeholder: false
---

ADAMANT v4.11.0 incluye 20 solicitudes de fusión y 437 commits, con enfoque en la confiabilidad de la conexión, la consistencia de la interfaz, los flujos de billetera y la estabilidad general del producto, más que en una única característica destacada.

### Resistencia del Nodo y Comportamiento de Red
Una mejora importante en esta versión es la confiabilidad del nodo. ADAMANT ahora incluye conmutación por error a direcciones IP alternativas cuando el acceso por dominio no está disponible, junto con mejoras en el ciclo de vida de las verificaciones de estado y el manejo de tiempos de espera. Se ha reforzado la recuperación tras estados de suspensión o desconexión del dispositivo, y se ha refinado el mensaje del estado del nodo para reducir señales falsas de sincronización. Esto aborda directamente los puntos de fallo en condiciones de red inestables, haciendo que el mensajero sea más resistente.

![ADAMANT v4.11.0: Más Confiable, Pulido y Maduro](/images/engineering-notes/medium/80c9b4c0a888/002-1-bnmyyew25hm84-zwmg0y0w-png.webp)

### Modernización de la Interfaz
La versión introduce mejoras visuales generales en chats, billeteras, flujos de envío de fondos, ajustes, diálogos y navegación. Implementa tokens de diseño compartidos, reglas de espaciado más precisas, mejor tipografía, primitivas de diseño y limpieza del tema mediante variables CSS. Una cobertura ampliada de pruebas de regresión de diseño ayuda a preservar la calidad de la interfaz en futuras actualizaciones.

### Mejoras en la Experiencia de Chat
El lado de mensajería recibe mejoras en el diseño del chat abierto, manejo del estado de mensajes, indicadores de reintento, comportamiento del selector de emojis, manejo de desbordamiento en respuestas, carga de claves públicas y agrupación de mensajes. Se corrige el comportamiento de actualización de fechas obsoletas y regresiones de desplazamiento nulo al cambiar rápidamente entre chats, asegurando una operación diaria más fluida.

![ADAMANT v4.11.0: Más Confiable, Pulido y Maduro](/images/engineering-notes/medium/80c9b4c0a888/003-1-mmpisulwbp1letrtngejyq-png.webp)

![ADAMANT v4.11.0: Más Confiable, Pulido y Maduro](/images/engineering-notes/medium/80c9b4c0a888/004-1-6kfadiesjlisjwmvg9o4ww-png.webp)

### Flujos de Billetera y Envío de Fondos
Las pantallas financieras recibieron pulido sustancial, incluyendo mejoras en las tarjetas de billetera, pestañas, estados de saldo y diseño de la lista de transacciones. La actualización corrige la normalización del monto en transferencias propias para BTC, DOGE y DASH, y normaliza los símbolos de billetera almacenados al restaurar, manteniendo el estado actualizado consistente.

![ADAMANT v4.11.0: Más Confiable, Pulido y Maduro](/images/engineering-notes/medium/80c9b4c0a888/005-1-ia-qldhd8-vcndnkepcjdw-png.webp)

### Eliminación del Soporte para Klayr
Una decisión notable en el alcance del producto es la eliminación completa del soporte para Klayr (KLY) en billeteras, nodos, transacciones, configuraciones, iconos, consultas, clientes de nodos, rutas de almacenamiento y la interfaz de usuario relacionada. La eliminación de rutas heredadas ayuda a simplificar la base de código y reducir la complejidad para el usuario.

### Herramientas y Documentación
Detrás de escena, el proyecto ha actualizado de Node.js 20 a 22, migrado a ESLint 9 y actualizado las compilaciones de Electron para incluir soporte universal en macOS. Los flujos de trabajo ampliados de pruebas Playwright (smoke y regresión) mejoran la disciplina de pruebas. La documentación también se ha actualizado, incluyendo guías más claras para autohospedaje en `README.md` y pautas de operación de IA en `AGENTS.md`.
