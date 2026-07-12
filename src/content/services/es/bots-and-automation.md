---
title: Bots y automatización cripto
description: Bots autoalojados, monitorización, alertas y herramientas de ejecución. Usted conserva las claves, la estrategia y la responsabilidad.
cta: Quiero un bot cripto
layoutStyle: accordion
proofLinks:
  - label: adamant-2fa
    url: https://github.com/Adamant-im/adamant-2fa
  - label: adamant-exchangebot
    url: https://github.com/Adamant-im/adamant-exchangebot
---

Un bot es un programa pequeño con acceso al dinero. Ese marco guía cada decisión que tomamos: permisos mínimos sobre las claves, fiabilidad sin adornos y código fuente completo en sus manos. Nosotros entregamos el software; usted conserva las claves, la estrategia y la responsabilidad.

## Qué automatizamos

- **Bots de notificación y alertas** — bots de Telegram y ADAMANT que vigilan saldos, salud de nodos, estado de órdenes en exchanges o transferencias on-chain y avisan a una persona antes de que un problema se convierta en pérdida
- **Asistentes de ejecución** — flujos semiautomatizados en los que el bot prepara una transacción u orden y una persona la aprueba; útil para operaciones de tesorería y liquidación OTC
- **Paneles operativos** — una vista única sobre las carteras, nodos y bots que su equipo ya opera, en lugar de ocho pestañas del navegador y una hoja de cálculo
- **Servicios en el chat** — bots dentro del chat cifrado de ADAMANT: flujos de exchange, pagos, colas de soporte y control de acceso
- **Herramientas asistidas por IA** — resúmenes y asistentes de triaje con LLM, siempre bajo revisión de ingeniería senior y nunca con acceso directo a las claves

## Cómo evitamos que los bots se conviertan en incidentes

La mayoría de historias de terror con bots provienen de los mismos tres errores: claves API con permisos de retiro, bucles de reintento que duplican gastos y silencio cuando algo falla. Nuestra práctica estándar:

- Claves de exchange limitadas al conjunto mínimo de permisos que el flujo necesita — solo trading o solo lectura siempre que sea posible
- Operaciones idempotentes y estado explícito, para que un reinicio nunca repita una transferencia
- Presupuestos de rate limit y circuit breakers en torno a cada API externa
- Alertas sobre el propio bot — un bot que se detiene en silencio es peor que no tener bot
- Despliegue en sus servidores, con registros y métricas que su equipo puede leer

## Caso: 2FA verificado en blockchain

[adamant-2fa](https://github.com/Adamant-im/adamant-2fa) entrega códigos de un solo uso a través del mensajero ADAMANT en lugar de SMS. La entrega se verifica on-chain y no puede ser objeto de SIM swap. Construimos flujos de verificación similares para productos en los que el correo y el SMS no son superficies de ataque aceptables.

## Caso: exchange dentro de un chat cifrado

[adamant-exchangebot](https://github.com/Adamant-im/adamant-exchangebot) ejecuta un flujo completo de exchange — cotizaciones, depósitos, pagos — dentro de un chat cifrado de extremo a extremo. El mismo patrón se adapta a pagos, faucets, recompensas por bounty y distribución interna de tokens en su propia infraestructura.

## Dónde está el límite

No ejecutamos estrategias en su nombre, no custodiamos sus claves y no prometemos beneficios de trading. Si una solicitud se reduce a «haz un bot que imprima dinero», diremos que no y explicaremos por qué — y luego propondremos la automatización que realmente ahorra horas de ingeniería a su equipo.
