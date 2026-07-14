---
title: "Vorlagen für Organisationseinheiten für ADAMANT: Issues & PRs"
slug: "discussion-4-let-s-add-organization-wide-issue-and-pr-templates-for-adamant-8890522"
description: "Verbesserung der Konsistenz in allen ADAMANT-Repositories durch organisationweite GitHub-Vorlagen."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/4"
publishedAt: "2025-09-13T14:38:21Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Proposals & Ideas"
cardSpan: "half"
originalId: "github-discussion:8890522"
locale: "de"
placeholder: false
---

Um die Konsistenz in allen ADAMANT-Repositories zu verbessern, können wir die Funktion für organisationweite Vorlagen von GitHub nutzen. Durch die Erstellung eines speziellen `.github`-Repositories in der Wurzel der Organisation können wir Standardvorlagen bereitstellen, die automatisch von Repositories geerbt werden, die keine eigenen benutzerdefinierten Vorlagen haben.

Dieses Repository würde mehrere Vorlagendateien enthalten. Für Fehlerberichte würde eine `bug_report.yml`-Datei den Meldungsprozess strukturieren. Für Funktionswünsche würde `feature_request.yml` die Mitwirkenden leiten. Eine `config.yml`-Datei kann die Sichtbarkeit der Vorlagen steuern und Kontaktlinks hinzufügen, während eine `PULL_REQUEST_TEMPLATE.md`-Datei die Beschreibungen von Pull Requests standardisiert.

Die Implementierung dieser Vorlagen bietet eine klare Struktur für Mitwirkende und stellt sicher, dass wichtige Details wie Replikationsschritte, Motivation und Alternativen nicht übersehen werden. Dadurch sparen die Maintainer Zeit, da unvollständige Issues reduziert werden, und die gesamte Entwicklererfahrung in allen ADAMANT-Projekten wird verbessert.

Der nächste Schritt besteht darin, die endgültige Formulierung und die Felder für diese Vorlagen festzulegen. Nach der Absprache können wir einen Pull Request mit den einsatzbereiten Dateien vorbereiten.
