---
title: "Actualización de marketmaking.app: Nuevos idiomas, renovación de contenido y cambios de precios"
slug: "discussion-56-marketmaking-app-update-6-new-languages-content-refresh-and-pricing-changes-10333867"
description: "cryptofoundry lanzó una actualización importante de marketmaking.app con seis nuevos idiomas, nueva orientación para emisores de tokens, documentación actualizada y mejoras de UX."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/56"
publishedAt: "2026-06-28T14:14:24Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10333867"
locale: "es"
placeholder: false
---

## Visión general

cryptofoundry lanzó una actualización importante de marketmaking.app, que incluye seis nuevos idiomas, una nueva propuesta centrada en el bot gratuito básico para emisores de tokens, documentación actualizada y varias mejoras de experiencia de usuario.

## Idiomas

El sitio ahora admite ocho idiomas. Además de los idiomas existentes en inglés y ruso, cryptofoundry agregó chino (simplificado), español, árabe (RTL), francés, japonés y alemán. Todas las páginas principales fueron traducidas del inglés, utilizando el ruso como referencia cuando fue necesario. El encabezado, el menú modal, el botón de contacto, el selector de idioma, los enlaces de navegación y el logotipo ahora apuntan a las URLs específicas del idioma correspondiente.

## Contenido y posicionamiento

La sección "¿Qué es la creación de mercado" ahora está alineada con el concepto actual del README de ADAMANT tradebot, destacando una versión básica gratuita para emisores de tokens junto con módulos y servicios premium. Las páginas de instalación, inicio rápido y bot gratuito de creación de mercado han sido revisadas y actualizadas. La referencia de comandos se sincronizó con la base de código del bot para agregar nuevos comandos y corregir descripciones obsoletas.

Las funciones premium se ajustaron eliminando el bloque "Sin wash trading" y agregando los bloques "Balance watcher" y "Perpetual trading" (futuros). Los precios en dólares fueron reemplazados por enlaces "Solicitar" que abren el popup de contacto. La página de servicios ya no muestra precios fijos ni la nota sobre el suministro de claves API de exchanges, y la página de inicio eliminó el precio de demostración de $800 de la sección "Solicitar una demostración". Se corrigieron diversos errores gramaticales, enlaces rotos y fechas desactualizadas en los textos en inglés y ruso.

## Contacto y experiencia de usuario

Ahora se puede abrir un modal de contacto desde cualquier página usando el ancla `#contact`, como en `/cex-mm/free-market-making-bot/#contact`. Se agregó Telegram como tercera opción de contacto a través de @adamant_business.

## Infraestructura

Se actualizó el servidor y la pila de WordPress, incluyendo paquetes de Ubuntu, PHP, MySQL, núcleo de WordPress, Polylang, Insert PHP y WP Rocket. Se eliminó Duplicator tras la migración. Se realizaron copias de seguridad completas antes y después de la actualización.

![Captura de pantalla de la discusión 1](/images/engineering-notes/github/discussions/10333867/001-007bf37e.webp)
