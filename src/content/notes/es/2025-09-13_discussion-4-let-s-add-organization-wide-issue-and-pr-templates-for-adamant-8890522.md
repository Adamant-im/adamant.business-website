---
title: "Plantillas para Problemas y PR a Nivel de Organización para ADAMANT"
slug: "discussion-4-let-s-add-organization-wide-issue-and-pr-templates-for-adamant-8890522"
description: "Mejora la consistencia en todos los repositorios de ADAMANT con plantillas predeterminadas para problemas y solicitudes de extracción."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/4"
publishedAt: "2025-09-13T14:38:21Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Proposals & Ideas"
cardSpan: "half"
originalId: "github-discussion:8890522"
locale: "es"
placeholder: false
---

Para mejorar la coherencia en todos los repositorios de ADAMANT, podemos aprovechar la función de plantillas a nivel de organización de GitHub. Al crear un repositorio especial `.github` en la raíz de la organización, podemos proporcionar plantillas predeterminadas que los repositorios sin sus propias plantillas personalizadas heredarán automáticamente.

Este repositorio contendría varios archivos de plantilla. Para informes de errores, un archivo `bug_report.yml` estructuraría el proceso de informe. Para solicitudes de funciones, `feature_request.yml` guiaría a los colaboradores. Un archivo `config.yml` puede controlar la visibilidad de las plantillas y agregar enlaces de contacto, mientras que un archivo `PULL_REQUEST_TEMPLATE.md` estandarizaría las descripciones de las solicitudes de extracción.

La implementación de estas plantillas proporciona una estructura clara para los colaboradores, asegurando que no se omitan detalles críticos como los pasos para reproducir, la motivación y las alternativas. Esto ahorra tiempo a los mantenedores al reducir los problemas incompletos y mejora la experiencia general del desarrollador en todos los proyectos de ADAMANT.

El siguiente paso es decidir la redacción final y los campos para estas plantillas. Una vez acordados, podemos preparar una solicitud de extracción con los archivos listos para usar.
