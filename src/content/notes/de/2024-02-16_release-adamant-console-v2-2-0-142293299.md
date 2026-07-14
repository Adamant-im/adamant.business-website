---
title: "ADAMANT Console v2.2.0"
slug: "release-adamant-console-v2-2-0-142293299"
description: "Die Wiki-Seiten wurden aktualisiert, Abhängigkeiten auf den neuesten Stand gebracht und der Code auf ES-Module (.mjs) umgestellt. Prettier für Formatierung hinzugefügt."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v2.2.0"
publishedAt: "2024-02-16T09:24:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v2.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:142293299"
locale: "de"
placeholder: false
---

Die Wiki-Seiten wurden aktualisiert, um die neuesten Änderungen widerzuspiegeln. Abhängigkeiten wurden auf ihre aktuellen Versionen aktualisiert. Der Codebase wurde umgeschrieben, um ES-Module (.mjs) zu verwenden, um moderne Bibliotheken zu unterstützen. Prettier wurde für die Codeformatierung hinzugefügt.

### Breaking changes

Das Format der Konfigurationsdatei hat sich geändert. Der Schlüssel `passPhrase` in der Konfiguration wurde in `passphrase` umbenannt. Die Konfigurationsdateien `config.json` und `config.default.json` wurden in `config.jsonc` und `config.default.jsonc` umbenannt. Die Antwort des Befehls `account new` gibt nun `passphrase` statt `passPhrase` zurück. Die Befehlszeilenoption `--passPhrase` wurde in `--passphrase` umbenannt, sodass `adm --passPhrase=""` nun als `adm --passphrase=""` verwendet werden muss.
