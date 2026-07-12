---
title: Software de trading
description: Automatización CEX/DEX, herramientas de tesorería y pipelines de datos de mercado — software de trading autoalojado sin promesas de beneficio.
cta: Quiero software de trading
layoutStyle: split
proofLinks:
  - label: adamant-tradebot
    url: https://github.com/Adamant-im/adamant-tradebot
  - label: marketmaking.app
    url: https://marketmaking.app
---

El software de trading se juzga en el peor momento: una API de exchange se degrada, un websocket se cae en silencio, un fill parcial llega a mitad de un reinicio. Construimos sistemas para esos momentos — autoalojados, observables y bajo el control de su equipo desde el primer commit.

## Qué incluye un proyecto típico

- **Conectividad con exchanges** — conectores REST y websocket para los CEX y DEX que usa, con reconexión, manejo de deriva de reloj y presupuestos de rate limit por venue
- **Motor de órdenes** — seguimiento del ciclo de vida de órdenes que sobrevive a reinicios: cada orden se concilia con el exchange, nunca se asume
- **Barreras de riesgo** — límites duros de posición, límites nocionales, kill switches y comprobaciones de sanidad entre el código de estrategia y el exchange
- **Pipeline de datos de mercado** — trades, libros de órdenes y velas normalizados entre venues, almacenados donde sus analistas pueden consultarlos
- **Vista operativa** — paneles y alertas, para que una persona siempre sepa qué hace el sistema y pueda detenerlo con una acción

## Market making, en concreto

Una década ejecutando nuestro propio software de market making se refleja en [adamant-tradebot](https://github.com/Adamant-im/adamant-tradebot) — software especializado de market making y trading con una edición open source gratuita y una experiencia premium alojada en [marketmaking.app](https://marketmaking.app). Para equipos que lo necesitan en su propio hardware — pares personalizados, venues personalizados, reglas de riesgo personalizadas — adaptamos despliegues autoalojados del mismo motor.

## Tesorería y herramientas de ejecución

No todo es una estrategia. Fondos y empresas de producto acuden a nosotros por la capa poco glamurosa: rebalanceo entre venues, ejecución TWAP de posiciones grandes, lotes de pagos e informes que concilian hasta el satoshi. Aquí es donde la automatización se amortiza más rápido.

## Qué le diremos de antemano

- No prometemos beneficios, señales ni «APY garantizado» — quien lo hace le está vendiendo riesgo
- No generamos volumen falso ni actividad de mercado artificial
- No custodiamos fondos; las claves viven en su entorno, con permisos mínimos
- La colocación HFT de baja latencia es otra industria — construimos automatización robusta, no carreras de nanosegundos

Usted obtiene software, código fuente, documentación y un socio de ingeniería que lo mantiene. La estrategia y la responsabilidad siguen siendo suyas.
