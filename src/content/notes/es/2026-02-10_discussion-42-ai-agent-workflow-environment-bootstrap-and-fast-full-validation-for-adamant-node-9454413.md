---
title: "Flujo de trabajo del agente de IA: inicialización del entorno y validación rápida/completa para ADAMANT Node"
slug: "discussion-42-ai-agent-workflow-environment-bootstrap-and-fast-full-validation-for-adamant-node-9454413"
description: "La documentación del agente de IA para ADAMANT Node se ha actualizado tras verificación práctica en un entorno local (ver PR 165). Esta actualización introduce dos niveles de validación para colaboradores de IA: rápida por defecto y completa para cambios críticos."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/42"
publishedAt: "2026-02-10T12:58:10Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9454413"
locale: "es"
placeholder: false
---

La documentación del agente de IA para el ADAMANT Node se ha actualizado basándose en una verificación práctica en un entorno de desarrollo local (ver PR #165). Esta actualización introduce una política de validación en dos niveles para los colaboradores de IA: validación rápida por defecto y validación completa para cambios críticos. También proporciona una lista de verificación explícita para la inicialización del entorno de PostgreSQL, Redis y el inicio de la testnet, junto con comprobaciones de estado concretas como `pg_isready` y `redis-cli ping` antes de ejecutar las pruebas.

Dado que se trata de un código heredado, la documentación incluye orientación práctica de respaldo para las actuales diferencias en ESLint y otras herramientas, aclarando que el repositorio actualmente no tiene un flujo de trabajo con Prettier y depende de ESLint. Estas mejoras aumentan la repetibilidad del trabajo asistido por IA, reducen los falsos negativos causados por servicios locales faltantes y mantienen la fiabilidad y la seguridad del consenso como puerta principal de calidad.

El flujo de trabajo se probó completamente en entorno local, confirmando el inicio de la testnet con los mensajes `ADAMANT started` y `Blockchain ready`, seguido de la ejecución exitosa de la suite rápida de pruebas unitarias mediante `npm run test:unit:fast`. Este enfoque se propone como flujo de trabajo básico de IA para el repositorio del nodo. La discusión relacionada se lleva a cabo en el issue #166.
