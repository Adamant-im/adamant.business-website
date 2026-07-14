---
title: "Migrando la PWA de Android a Capacitor"
slug: "moving-android-pwa-to-capacitor-e64b923284c0"
description: "La aplicación Android de ADAMANT dejó de usar PWABuilder para pasar a Capacitor.js, obteniendo control total sobre código nativo y automatización CI/CD."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/moving-android-pwa-to-capacitor-e64b923284c0"
publishedAt: "2024-07-05T08:19:06.778Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/e64b923284c0/001-1-n3f-qwiedtkwhrlo6feg7a-png.webp"
cardSpan: "full"
originalId: "medium:e64b923284c0"
locale: "es"
placeholder: false
---

Anteriormente, la aplicación Android de ADAMANT se construía utilizando PWABuilder, lo cual imponía varias limitaciones: sin control sobre el nivel de API objetivo, sin acceso al código nativo y sin soporte de automatización. Con la actualización PWA v4.7, la aplicación migró a Capacitor.js para obtener control total sobre el código nativo, la capacidad de ejecutar funcionalidades nativas como notificaciones push y cámara a través de la API de Cordova, optimización de código, complementos personalizados y automatización CI/CD.

![Migrando la PWA de Android a Capacitor](/images/engineering-notes/medium/e64b923284c0/002-0-l2l0siac7nx7sixj.webp)

### ¿Por qué Capacitor.js?

ADAMANT Messenger es una plataforma de mensajería descentralizada que prioriza el rendimiento, la seguridad y la mantenibilidad. Se eligió Capacitor.js porque se integra perfectamente con frameworks web modernos como Vue.js, permite una base de código única para iOS, Android y la web, brinda acceso a APIs nativas sin sacrificar la experiencia web y se beneficia de un desarrollo activo y documentación robusta.

![Migrando la PWA de Android a Capacitor](/images/engineering-notes/medium/e64b923284c0/003-0-2oz1atirxy-1lvqb.webp)

### Comparación: Android nativo, PWABuilder y Capacitor.js

El desarrollo nativo de Android ofrece acceso completo a todas las funciones y APIs de Android, alto rendimiento y control detallado sobre la interfaz y funcionalidad, pero requiere experiencia en Java o Kotlin, una base de código separada por plataforma y mayores costos y tiempo de desarrollo.

PWABuilder facilita la conversión de una PWA en una aplicación nativa con configuración mínima y despliegue rápido, lo que la hace adecuada para aplicaciones simples con funcionalidad nativa limitada. Sin embargo, ofrece acceso limitado a funciones nativas del dispositivo, rendimiento que puede no igualar al de aplicaciones completamente nativas y dependencia de un servicio de conversión de terceros.

Capacitor.js proporciona una base de código única multiplataforma con acceso a APIs y complementos nativos, soporte para herramientas y frameworks modernos de desarrollo web, y una comunidad activa con actualizaciones continuas. Las desventajas son una ligera curva de aprendizaje para quienes no están familiarizados con los puentes web-nativos, y algunas funcionalidades nativas pueden requerir complementos personalizados.

### Implementación técnica

La aplicación Android se construye de forma nativa usando Capacitor.js y GitHub Actions. La implementación incluyó un flujo de trabajo de GitHub Actions, configuración de Capacitor, archivos de manifiesto de Android, imágenes de pantalla de bienvenida e iconos de la aplicación, y un script de compilación. Los cambios completos están disponibles en la [solicitud de extracción en GitHub](https://github.com/Adamant-im/adamant-im/pull/515).

![Migrando la PWA de Android a Capacitor](/images/engineering-notes/medium/e64b923284c0/004-0-jzpjysc-tuu83qyr.webp)
