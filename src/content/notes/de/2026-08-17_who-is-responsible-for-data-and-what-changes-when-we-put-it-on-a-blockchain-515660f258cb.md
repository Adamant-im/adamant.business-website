---
title: "Wer ist für Daten verantwortlich? Und was ändert sich, wenn wir sie auf einer Blockchain speichern?"
slug: "who-is-responsible-for-data-and-what-changes-when-we-put-it-on-a-blockchain-515660f258cb"
description: "Jedes digitale Produkt beginnt mit der Erfassung von Daten. Wenn diese durch Anwendungen und Datenbanken fließen, verschiebt sich die Verantwortung, verschwindet aber nicht."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/who-is-responsible-for-data-and-what-changes-when-we-put-it-on-a-blockchain-515660f258cb"
publishedAt: "2026-08-17T14:11:55.973Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:515660f258cb"
coverImage: "/images/engineering-notes/medium/515660f258cb/001-2915e505dd.webp"
locale: "de"
placeholder: false
---

Jedes digitale Produkt beginnt mit der Erfassung von Daten über Personen oder Dinge. Wenn Daten durch Anwendungen, Anbieter, Datenbanken und manchmal eine Blockchain fließen, wirkt die Verantwortung oft diffus. Doch eine Blockchain kann zwar die Verwahrung verteilen, aber sie kann die Rechenschaftspflicht nicht auflösen.

Das Fehlen eines zentralen Datenbankadministrators bedeutet nicht das Fehlen von Entscheidungen, Pflichten oder Konsequenzen. Es gibt immer jemanden, der entscheidet, was in das System gelangt, warum es benötigt wird, wie lange es dort verbleiben soll und was geschieht, wenn die Daten fehlerhaft sind.

### Daten werden niemals herrenlos

Eigentum ist nur eine rechtliche Metapher. Eine praktischere Frage lautet: Wer trägt in welcher Phase des Datenlebenszyklus welche Verantwortung? Die Person, die durch die Daten beschrieben wird, hat Rechte. Die Partei, die über Zweck und Art der Datennutzung entscheidet, legt die Regeln fest. Dienstanbieter implementieren Speicherung und Sicherheit. Ingenieure übersetzen Richtlinien in Schemata und Berechtigungen. Infrastrukturbetreiber halten die Systeme verfügbar. Wirtschaftsprüfer und Regulierungsbehörden sorgen für die Aufsicht.

Unter der DSGVO bestimmt ein Verantwortlicher die Zwecke und Mittel der Verarbeitung, während ein Auftragsverarbeiter im Namen des Verantwortlichen handelt. Der Verantwortliche muss die Einhaltung von Prinzipien wie Zweckbindung, Datenminimierung, Richtigkeit und Speicherbegrenzung nachweisen. Diese Struktur gilt über Rechtsordnungen hinweg: War die Erhebung notwendig? Wurde die Person informiert? Kann ein Fehler korrigiert werden? Gibt es eine reale Partei, die auf eine Beschwerde antworten kann?

### Was eine Blockchain ändert – und was nicht

Eine herkömmliche Anwendung gibt einem Betreiber weitreichende technische Kontrolle, um Datensätze zu bearbeiten, zu widerrufen oder zu löschen. Dieselbe Kontrolle ermöglicht Korrekturen, aber auch Zensur und Manipulation. Eine Blockchain ändert dies: Mehrere Knoten reproduzieren eine geordnete Historie, validieren Änderungen gemäß gemeinsamer Regeln und erschweren einseitige Änderungen. Das NIST beschreibt Blockchains als manipulationserkennend und manipulationsresistent, nicht als magisch unveränderlich.

Dies schafft einen neuen Zielkonflikt: Je schwieriger ein Datensatz ohne Genehmigung zu ändern ist, desto schwieriger ist er zu korrigieren, wenn die Änderung legitim ist. Verantwortung verlagert sich, anstatt zu verschwinden. Anwendungsentwickler entscheiden, was eingereicht wird. Protokollentwickler definieren gültige Zustandsübergänge. Validatoren setzen Regeln durch. Knotenbetreiber replizieren die Historie. Die Governance entscheidet über die Softwareentwicklung. Die französische Datenschutzbehörde CNIL kam zu einem ähnlichen Schluss: Der Teilnehmer, der entscheidet, Daten zu registrieren, kann als Verantwortlicher betrachtet werden. „Das Protokoll war es“ ist kein ernsthaftes Modell für Rechenschaftspflicht.

### Wann Daten On-Chain geschrieben werden sollten

Eine Blockchain ist gerechtfertigt, wenn mehrere Parteien einen gemeinsamen Zustand benötigen, sich nicht vollständig vertrauen, eine Reihenfolge und Herkunft benötigen, unabhängige Verifizierung schätzen und wenn der Datensatz rechtmäßig dauerhaft bleiben kann. Dies macht die On-Chain-Speicherung überzeugend für konsenskritische Zustände (Guthaben, Übertragungen), öffentliche Zusagen (zeitgestempelte Hashes), Status- und Widerrufsregister, gemeinsame Audit-Ereignisse und zensurresistente Kommunikationszustände. Beständigkeit ist hier Teil des Produkts, nicht ein Nebeneffekt.

### Wann Daten Off-Chain bleiben sollten

Die meisten Anwendungsdaten erfüllen diesen Test nicht. Rohe persönliche Profile, medizinische Historien, private Dokumente, veränderbare Präferenzen und große Mediendateien sind schlechte Kandidaten für eine dauerhafte Replikation. Die Verschlüsselung eines Datensatzes schützt den Inhalt heute, aber der Geheimtext könnte jahrzehntelang verfügbar bleiben. Schlüssel gehen verloren, Algorithmen altern und Metadaten offenbaren Beziehungen. Das „Löschen des Schlüssels“ (Crypto-Shredding) ist nicht mit dem Entfernen jeder Kopie gleichzusetzen. Hashes sind nicht automatisch anonym; wenn sie mit einer Person verknüpft oder mit kleinen Eingabesätzen verglichen werden, können sie als pseudonyme personenbezogene Daten fungieren.

Die Arbeit des NIST zu datenschutzfreundlichen verteilten Ledgern geht von der Beobachtung aus, dass herkömmliche Unveränderlichkeit mit Datenschutzregeln kollidieren kann, die eine Überarbeitung oder Löschung erfordern. Forscher haben redigierbare Ledger-Strukturen untersucht, die die Integrität wahren und gleichzeitig eine kontrollierte Löschung ermöglichen. Blockchain ist ein Gestaltungsraum, keine heilige Datenstruktur.

### Der praktische Standard: On-Chain beweisen, Off-Chain speichern

Für viele Produkte ist die stärkste Architektur hybrid: Sensible Datensätze werden in verschlüsselten, zugriffsgeschützten Systemen gehalten, während nur der kleinste Beweis On-Chain gespeichert wird. Speichern Sie ein Dokument Off-Chain und verankern Sie einen Hash On-Chain. Stellen Sie verifizierbare Berechtigungsnachweise mit selektiver Offenlegung aus. Veröffentlichen Sie Widerrufseinträge ohne private Inhalte. Verwenden Sie Versionierung, um korrigierte Zustände zu erkennen. Verschlüsseln Sie mit rotierbaren Schlüsseln und definieren Sie Aufbewahrungsrichtlinien.

Das Verifiable-Credentials-Modell des W3C trennt Aussteller, Inhaber, Subjekt und Verifizierer. Eine Person kann eine Tatsache beweisen, ohne einen gesamten Identitätsdatensatz preiszugeben. Das Ziel ist es, Vertrauen portabel zu machen und dabei weniger zu teilen.

Manchmal benötigt man überhaupt keine Blockchain. Eine gut geführte Datenbank bietet Verschlüsselung, Zugriffskontrolle, signierte Audit-Ereignisse und schnelle Korrekturen. Ein Transparenzprotokoll unter Verwendung von Merkle-Bäumen (wie Certificate Transparency, RFC 9162) bietet Inklusionsnachweise ohne verteilten Konsens. Die entscheidende Frage ist nicht „Können wir eine Blockchain verwenden?“, sondern „Welches Versagen versuchen wir zu verhindern?“

### Ein Test mit sieben Fragen vor der ersten Transaktion

Bevor Daten dauerhaft gemacht werden, muss ein Projekt diese Fragen in einfacher Sprache beantworten. Welcher genaue Anspruch muss verifiziert werden? Wer muss sich über den Zustand einig sein? Wäre ein verantwortlicher Betreiber akzeptabel? Könnten die Daten falsch, schädlich oder rechtlich löschbar werden? Kann ein Beweis die Nutzlast ersetzen? Wer kümmert sich um Korrektur und Wiedergutmachung? Was passiert in zwanzig Jahren in Bezug auf Schlüsselkompromittierung und kryptografische Alterung?

### ADAMANT: Beständigkeit für den Transport, Privatsphäre für den Inhalt

ADAMANT bietet ein konkretes Beispiel für eine bewusste Abwägung. Das Netzwerk nutzt eine Delegated-Proof-of-Stake-Blockchain als dezentrale Vertrauensebene für die Kommunikation. Clients müssen nicht darauf vertrauen, dass der Server eines Unternehmens die gemeinsame Transaktionshistorie bewahrt.

Aber die Blockchain ist keine Entschuldigung für die Veröffentlichung von Klartext. Laut der ADAMANT-Dokumentation werden Nachrichtentransaktions-Assets verschlüsselt, bevor sie in Transaktionen verpackt, signiert und übertragen werden. Der einfache Chat verwendet authentifizierte Public-Key-Verschlüsselung basierend auf NaCl-Box; Schlüssel-Wert-Datensätze verwenden NaCl-Secretbox. Der Client führt die kryptografische Arbeit lokal aus.

Der verschlüsselte Nachrichtentext bleibt privat, während das Netzwerk Transaktionsmetadaten – Absender, Empfänger, Zeitstempel, Gebühr, Signatur – benötigt, um Aktivitäten zu validieren und weiterzuleiten. Verschlüsselung schützt den Inhalt; sie macht nicht jede Beziehung unsichtbar. Die Architektur von ADAMANT zeigt den legitimen Blockchain-Anwendungsfall: Kommunikation sollte nicht verschwinden, nur weil ein Unternehmen ein Konto schließt, während das System gleichzeitig minimiert, was öffentliche Knoten über die private Nachricht selbst verstehen müssen.

### Verantwortung ist ein Feature

Vertrauenswürdige Produkte gewinnen nicht dadurch, dass sie die meisten Daten sammeln oder jede Datenbank für unveränderlich erklären. Sie gewinnen, indem sie Verantwortung lesbar machen. Benutzer sollten wissen, was aufgezeichnet wird und was privat bleibt. Entwickler sollten erklären, warum jedes Feld existiert. Betreiber sollten ihre Sicherheitspflichten kennen. Die Governance sollte Korrekturpfade bereitstellen. Dezentralisierung ist dann am stärksten, wenn sie unnötige Kontrolle entfernt, ohne die Rechenschaftspflicht zu beseitigen. Blockchain ist dann am stärksten, wenn sie den Beweis trägt – nicht die ganze Geschichte.

![Wer ist für Daten verantwortlich? Und was ändert sich, wenn wir sie auf einer Blockchain speichern?](/images/engineering-notes/medium/515660f258cb/002-87fcd750d8.webp)

Eine praktische Entscheidungshilfe für die Wahl zwischen Off-Chain-, Hybrid- und On-Chain-Daten.
