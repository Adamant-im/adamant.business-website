---
title: "ADAMANT Market-Making Bot: Eine sicherere, intelligentere Spread-Unterstützung"
slug: "adamant-market-making-bot-a-safer-smarter-spread-support-aef80292b22c"
description: "Spread-Unterstützung (SS) ist eine der leistungsfähigsten Funktionen des ADAMANT Market-Making Bots, aber auch empfindlich. Diese Aktualisierung verbessert Sicherheit und Kontrolle."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-market-making-bot-a-safer-smarter-spread-support-aef80292b22c"
publishedAt: "2026-03-31T18:05:33.126Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/aef80292b22c/001-1-yjio7wtzsgsnwh-gu1vzpa-png.webp"
cardSpan: "full"
originalId: "medium:aef80292b22c"
locale: "de"
placeholder: false
---

Spread-Unterstützung (SS)-Liquiditätsaufträge gehören zu den leistungsfähigsten Funktionen des ADAMANT Market-Making Bots, sind aber auch am empfindlichsten. Sie halten Spreads eng und Orderbücher gesund, doch naive Auffülllogik kann ausnutzbar werden: Auffüllschleifen erzeugen erneut Exposition, volatile Bedingungen verzerren die Platzierung, und einseitige Bewegungen verwandeln einen nützlichen Mechanismus in eine Quelle vermeidbaren Risikos.

Dieses Update behebt das mit einer dreiphasigen Verbesserung: einem dedizierten Simulationswerkzeug, der Trennung von Spread-Unterstützung und sicherer Liquidität in optionale Untermodule und dem Ersatz der alten wiederholbaren Auffülllogik durch eine begrenzte Spiegelstrategie, die enge Spreads erhält, ohne unbegrenzte Verlustschleifen zu öffnen.

### Warum diese Aktualisierung wichtig ist

Liquiditätslogik sollte unter Stress vorhersehbar reagieren. Im Gegensatz zur tiefebasierten Liquidität, die natürlicherweise durchschnittliche Kauf- und Verkaufspreise respektiert, existieren SS-Aufträge, um den Spread selbst zu unterstützen. Dadurch sind sie empfindlich gegenüber feindlichen Ausführungen, plötzlichen einseitigen Bewegungen und Platzierungsregeln, die in ruhigen Bedingungen funktionieren, aber in volatilen versagen. Diese Version konzentriert sich darauf, die Spread-Unterstützung nützlich zu halten, ohne sie zu einer Quelle unbegrenzten Risikos werden zu lassen.

### Phase 1: Simulations- und Visualisierungswerkzeug

Bevor die Kernlogik geändert wurde, wurde ein eigenständiges Werkzeug entwickelt, um das SS-Verhalten in einer kontrollierten Umgebung zu untersuchen. Der Testaufbau besteht aus `trade/tests/liquidity_test.js` und `trade/tests/liquidity_test.html` und läuft als Express + Socket.io-Anwendung.

![ADAMANT Market-making bot: Eine sicherere, intelligentere Spread-Unterstützung](/images/engineering-notes/medium/aef80292b22c/002-1-idogwktarx9lftmrmbspow-png.webp)

Im **Papiermodus** hält das Werkzeug eine einzelne Orderbuch-Snapshot im Speicher. SS-Iterationen können manuell ausgelöst werden, und durch Anklicken eines Preisniveaus wird die vollständige Ausführung aller Aufträge bis zu diesem Niveau simuliert, wodurch Randfälle leicht reproduziert und Reaktionen untersucht werden können.

Im **Live-Modus** aktualisiert das Werkzeug das Orderbuch kontinuierlich von der Börse und arbeitet mit echten `ordersDb`-Einträgen. Iterationen werden weiterhin manuell ausgelöst, aber die Umgebung spiegelt tatsächliche Marktbedingungen wider.

Die HTML-Oberfläche enthält eine farbcodierte Orderbuchtabelle, die externe Aufträge, Tiefenliquidität, SS-Aufträge und gespiegelte Aufträge unterscheidet. Ein Statistikbereich zeigt offene, ausgeführte und stornierte SS-Anzahlen pro Seite, Kauf- und Verkauf-VWAP-Werte sowie Deltas pro Iteration an. Ein schreibgeschützter `tradeParams`-Bereich zeigt den aktiven Laufzustand an, während manuelle Steuerelemente es Operatoren ermöglichen, SS-Iterationen auszulösen, Zustandsänderungen zu prüfen und Zellenwerte zu kopieren. Jede Iteration hebt hervor, was sich geändert hat, und verwandelt Liquiditätsverhalten von etwas, das aus Logs erschlossen werden muss, in etwas Direktbeobachtbares.

### Phase 2: Auslagerung von sicherer Liquidität und Spread-Unterstützung in optionale Module

Zuvor befanden sich der Kernzustand der sicheren Liquidität und die SS-Platzierungslogik innerhalb von `mm_liquidity_provider`, wodurch mehrere unterschiedliche Aspekte eng miteinander verknüpft waren. Diese Version trennt sie in zwei dedizierte Module: `trade/mm_liquidity_safe.js` und `trade/mm_liquidity_ss.js`.

Das sichere Liquiditätsmodul kapselt den `liqLimits`-Zustand und alle zugehörigen Hilfsfunktionen (`updateLiqLimits`, `loadLiqLimits`, `storeLiqLimits`, `resetLiqLimits`, `getLiqLimits`, `getVwapRangeString`). Es verarbeitet ausschließlich Tiefenausführungen mithilfe eines strikten `subPurpose === 'depth'`-Filters und konzentriert sich so auf die ausführungsbezogene Historie und abgeleitete Grenzwerte.

Das Spread-Unterstützungsmodul kapselt SS-Verhalten, einschließlich `updateSsLiquidity(liquidityOrders, orderBookInfo)`, `updateSsVwap()`, SS-Preislogik, SS-Auftragsanzahlbegrenzungen und Spiegelplatzierungslogik. Konstanten wie minimale und maximale SS-Aufträge pro Seite wurden ebenfalls hierher verschoben.

Der Hauptprovider `mm_liquidity_provider.js` lädt nun beide Module über `utils.softRequire()`. Diese Module sind optional: Fehlt eines davon, funktioniert der Bot weiterhin korrekt. Tiefenliquidität bleibt aktiv. Fehlt `mm_liquidity_safe`, sind die Grenzwerte für sichere Liquidität einfach inaktiv. Fehlt `mm_liquidity_ss`, ist die Spread-Unterstützung inaktiv. Keine Abstürze, kein unterbrochener Ablauf, keine separaten Codezweige erforderlich.

Der Provider delegiert außerdem SS-spezifische Schließregeln an das SS-Modul, falls vorhanden, ersetzt die inline SS-Platzierungsschleife durch `ss.updateSsLiquidity()` und aktualisiert das Orderbuch nach SS-Platzierung, sodass Tiefenaufträge einen aktuellen Mittelpreis nutzen können, was die Platzierungskonsistenz verbessert.

### Phase 3: Ersetzen von Auffüllschleifen durch eine begrenzte Spiegelstrategie

Dies ist die zentrale Verhaltensänderung. Das alte wiederholbare Auffüllmuster konnte unter bestimmten Ausführungsszenarien erneut Exposition erzeugen.

![ADAMANT Market-making bot: Eine sicherere, intelligentere Spread-Unterstützung](/images/engineering-notes/medium/aef80292b22c/003-1-747lh26q3v79vk3xcekrvq-png.webp)

#### Die zentrale Spiegelregel

Wenn ein regulärer SS-Auftrag ausgeführt wird, platziert der Bot einen **Spiegelauftrag** auf der gegenüberliegenden Seite zum reflektierten Preis und mit derselben Größe. Er platziert **keinen** Ersatz auf derselben Seite.

![ADAMANT Market-making bot: Eine sicherere, intelligentere Spread-Unterstützung](/images/engineering-notes/medium/aef80292b22c/004-1-fwgdzzeu-axrb9noqz-o2q-png.webp)

Anstatt endlos dort aufzufüllen, wo Liquidität gerade verbraucht wurde, erkennt das System die Ausführung an und reagiert mit einem begrenzten Gegenstück über den Spread. Dadurch bleibt der Markt eng, ohne eine unbegrenzte Feedbackschleife gleicherseitiger Auffüllung zu erzeugen.

#### Eigenschaften von Spiegelaufträgen

Spiegelaufträge sind explizit gekennzeichnet mit `subType: 'mirrored'`, `subTypeString: ' (ss mirrored)'` und `priceCorrected: true`. Das Feld `priceCorrected` ermöglicht es der bestehenden `closeLiquidityOrders`-Logik, gültige Spiegelaufträge zu ignorieren, auch wenn sie außerhalb des normalen SS-Spread-Fensters liegen, sodass Spiegel dort bestehen bleiben, wo sie sollten, ohne einen separaten Stornierungsweg zu benötigen.

#### Verhinderung von Kaskaden

Eine große Gefahr bei gespiegelter Logik ist rekursives Verhalten: Ein Spiegel wird ausgeführt, dann erneut gespiegelt, und so weiter. Dies wird explizit blockiert. Ausgeführte Spiegelaufträge werden nicht weiter gespiegelt. Das Modul prüft `subType`, und sobald ein Spiegel erzeugt wurde, wird der ursprüngliche Auftrag als Spiegelquelle markiert, wodurch Kaskadenketten verhindert und der Mechanismus begrenzt bleibt.

#### Risikosteuerung

**Spiegelabstands-Obergrenze.** Wenn der mathematisch „richtige“ Spiegelpreis zu weit vom Mittelpreis entfernt liegen würde, greift der Bot stattdessen auf einen begrenzten Preis nahe der SS-Spread-Kante zurück, anstatt ihn blind dort zu platzieren. Dadurch wird verhindert, dass Spiegel von sinnvollen Liquiditätsverhalten abkoppeln.

**VWAP-Relevanzschutz.** SS führt nun eigene Ausführungsstatistiken über eine dedizierte `fillsEngine`-Epoche mit `subPurpose: 'ss'`, wobei SS `buyVWAP` und `sellVWAP` separat von der Tiefenliquidität verfolgt werden. Wenn sich der SS-VWAP um mehr als 2 % vom aktuellen Mittelpreis entfernt, wird er als veraltet betrachtet und für Platzierungseinschränkungen ignoriert. Dies ist wichtig nach starken einseitigen Umkehrungen, bei denen ein alter VWAP-Anker die SS-Logik andernfalls auf einer Seite des Marktes gefangen halten könnte.

**Entspannung bei weiten Spreads.** In volatilen Märkten kann der externe Spread vorübergehend viel breiter werden als die vorgesehene SS-Zone. In diesem Fall, ab einem definierten Multiplikator, werden die Spiegelbelegungsprüfungen gelockert, sodass die Spread-Unterstützung weiterarbeiten kann, anstatt wegen strenger Platzierungsannahmen einzufrieren, die nicht mehr zum Markt passen.

**Begrenzte neue reguläre SS-Platzierung.** Die reguläre SS-Platzierung berücksichtigt nun den SS-VWAP, wenn relevant. Neue reguläre Käufe werden unterhalb des SS `buyVWAP` platziert, neue reguläre Verkäufe oberhalb des SS `sellVWAP`, wodurch die Wahrscheinlichkeit verringert wird, wiederholt neue Exposition auf immer ungünstigeren Niveaus hinzuzufügen.

### Verbesserungen bei Beobachtbarkeit und Bedienkontrolle

Der Befehl `/stats` validiert Paare nun über `parseCommandParams`, akzeptiert jedes Paar oder Perpetual-Ticker (nicht nur das Standardpaar), formatiert 24h-Spread-Werte fett, verwendet stabile Genauigkeit für `volumeInCoin2`, zeigt Handelsvolumen und Statistiken zu ausgeführten Aufträgen nur für das Standardpaar an, bezieht Ladder-(`ld`)-Aufträge in die Statistiken zu ausgeführten Aufträgen ein und fügt einen Abschnitt „Hinweise“ hinzu.

![ADAMANT Market-making bot: Eine sicherere, intelligentere Spread-Unterstützung](/images/engineering-notes/medium/aef80292b22c/005-1-h4suuocfjjiiwmrko04igq-png.webp)

Eine neue umfangreiche Liquiditätsstatistikansicht ist über `/orders liq full` verfügbar. Sie enthält einen Tiefenliquiditätsblock mit Status, Spread-Parametern, Auftragsanzahlen, offenen Beträgen, Grenzwerten für sichere Liquidität und Ausführungsverlauf; einen Spread-Unterstützungsblock mit SS-Spread-Bereich, Auftragsgrößenbegrenzungen, regulären und gespiegelten Auftragsanzahlen, SS-Ausführungsstatistiken, VWAP und MTM-PnL; einen kombinierten Gesamtblock, der Tiefen- und SS-Ausführungsdaten aggregiert; die Startzeit der aktuellen Liquiditätsepoche; Informationen zu minimalen Börsenaufträgen; sowie aktuelle Orderbuchinformationen über wiederverwendbare Tiefenhilfsfunktionen. Tabellen mit Ausführungsstatistiken verwenden ein kompaktes Vier-Spalten-Layout: Bezeichnung, Kauf, Verkauf und Delta.

![ADAMANT Market-making bot: Eine sicherere, intelligentere Spread-Unterstützung](/images/engineering-notes/medium/aef80292b22c/006-1-bnw14f3hsjeoscgu6x3y0g-png.webp)

Die reguläre `/orders liq`-Liste zeigt nun den prozentualen Ausführungsgrad für teilweise ausgeführte Aufträge an und beinhaltet `subPurpose`- und `subType`-Labels wie `ss, mirrored`. Der Befehl `/orderbook` enthält eine neue **Zweck**-Spalte, die anzeigt, welche Botmodule jedem Preisniveau entsprechen, abgeleitet aus live `ordersDb`-Einträgen.

![ADAMANT Market-making bot: Eine sicherere, intelligentere Spread-Unterstützung](/images/engineering-notes/medium/aef80292b22c/007-1-m8b7g-dtzbkcqrovk8i-0w-png.webp)

Der Befehl `/enable liq` enthält nun eine Bestätigung, bevor Liquiditätsparameter geändert werden, und validiert Build-Fähigkeiten: Notationen für Tiefenbereiche werden abgelehnt, wenn `mm_liquidity_safe` fehlt, und SS-Parameter werden abgelehnt, wenn `mm_liquidity_ss` fehlt, mit klarer Meldung. Ein neuer Unterbefehl `/enable liq reset` setzt `mm_liquidityInitTs` zurück und löscht `liqLimits`, startet die VWAP-Epoche nach Bestätigung neu.

Manuelle `/buy`- und `/sell`-Befehle erhielten eine Sicherheitsverbesserung: Wenn ein angeforderter Auftragspreis um mehr als 1000 % vom Markt abweicht, stoppt der Bot und fordert eine Bestätigung mit `/y`, um versehentliche Extrempreisaufträge zu verhindern. Der Befehl `/account` verarbeitet nun leere Gebührenlisten von Börsen-APIs besser.

### Keine inkompatiblen Änderungen

Sowohl `mm_liquidity_safe` als auch `mm_liquidity_ss` sind optional. Fehlt eines davon, arbeitet `mm_liquidity_provider` weiterhin korrekt mit aktiver Tiefenliquidität. Die einzige Änderung auf Format-Ebene ist, dass `fillsEngine`-Statistikschlüssel nun ein optionales `:<subPurpose>`-Segment enthalten können; bestehende Einträge ohne dieses Segment bleiben gültig und unverändert.

### Zusammenfassung

Diese Aktualisierung bewirkt drei Dinge. Sie macht die Spread-Unterstützung sichtbar durch ein Simulationswerkzeug, das verstecktes Liquiditätsverhalten inspizierbar und wiederholbar macht. Sie macht die Spread-Unterstützung modular, indem sichere Liquidität und SS aus einem einzigen Provider-Pfad entkoppelt werden. Und am wichtigsten: Sie macht die Spread-Unterstützung sicherer, indem ein wiederholbares Auffüllmodell durch eine begrenzte Spiegelstrategie ersetzt wird, die darauf ausgelegt ist, den Spread eng zu halten, ohne unkontrollierbare Verlustschleifen zu ermöglichen.

![ADAMANT Market-making bot: Eine sicherere, intelligentere Spread-Unterstützung](/images/engineering-notes/medium/aef80292b22c/008-1-mnimve9mbrwsscd6m9gllq-png.webp)

Für Market-Making-Systeme ist dies die richtige Richtung: nicht mehr Aktivität um ihrer selbst willen, sondern intelligentes Verhalten unter echtem Marktdruck. Die Spread-Unterstützung ist nun besser verständlich, wartbarer und viel schwerer auszunutzen.
