---
title: "AI-Agenten-Workflow: Umgebungs-Bootstrap und schnelle/vollständige Validierung für ADAMANT Node"
slug: "discussion-42-ai-agent-workflow-environment-bootstrap-and-fast-full-validation-for-adamant-node-9454413"
description: "Die AI-Agenten-Dokumentation für ADAMANT Node wurde basierend auf praktischer Verifikation aktualisiert. Es wird eine zweistufige Validierungsrichtlinie eingeführt."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/42"
publishedAt: "2026-02-10T12:58:10Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9454413"
locale: "de"
placeholder: false
---

Die Dokumentation für den AI-Agenten des ADAMANT Node wurde basierend auf praktischer Verifikation in einer lokalen Entwicklungsumgebung aktualisiert (siehe PR #165). Diese Aktualisierung führt eine zweistufige Validierungsrichtlinie für AI-Mitwirkende ein: standardmäßig schnelle Validierung und vollständige Validierung bei kritischen Änderungen. Außerdem wird eine explizite Checkliste für das Einrichten der Umgebung bereitgestellt, einschließlich PostgreSQL, Redis und Testnet-Start, sowie konkrete Health-Checks wie `pg_isready` und `redis-cli ping`, bevor Tests ausgeführt werden.

Da es sich um einen Legacy-Codebase handelt, enthält die Dokumentation praktische Anleitungen für aktuelle Abweichungen bei ESLint und anderen Tools. Klargestellt wird, dass das Repository derzeit keinen Prettier-Workflow verwendet und auf ESLint angewiesen ist. Diese Verbesserungen erhöhen die Wiederholbarkeit von AI-gestützter Arbeit, reduzieren falsch-positive Ergebnisse aufgrund fehlender lokaler Dienste und stellen die Zuverlässigkeit sowie die Konsenssicherheit als primäres Qualitätskriterium sicher.

Der Workflow wurde lokal end-to-end getestet. Der Testnet-Start wurde durch die Nachrichten `ADAMANT started` und `Blockchain ready` bestätigt, gefolgt von der erfolgreichen Ausführung der schnellen Unit-Tests mittels `npm run test:unit:fast`. Dieser Ansatz wird als Baseline-AI-Workflow für das Node-Repository vorgeschlagen. Die zugehörige Diskussion wird im Issue #166 verfolgt.
