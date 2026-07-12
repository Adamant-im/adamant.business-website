---
title: Krypto-Zahlungen & Lizenzierung
description: Nicht-verwahrte Krypto-Zahlungen, Abonnements, Lizenzschlüssel und Zugriffsautomatisierung für SaaS und Softwareprodukte.
cta: Meine Krypto-Zahlungslösung bauen
layoutStyle: cards
proofLinks:
  - label: adamant-payment
    url: https://github.com/Adamant-im/adamant-payment
---

Krypto zu akzeptieren sollte Ihr Produktunternehmen nicht in ein Verwahrungsgeschäft verwandeln. Wir bauen Zahlungs- und Lizenzierungssysteme, bei denen Mittel direkt an Adressen gehen, die Sie kontrollieren, und die Aufgabe der Software eng bleibt: Zahlung erkennen, verifizieren, Zugang freischalten, Aufzeichnungen führen.

## Drei Abläufe, die wir am häufigsten bauen

**Einmalkauf → Lizenzschlüssel.** Ein Kunde zahlt in ADM, BTC, ETH oder Stablecoins; das System überwacht die Adresse, wartet auf die von Ihnen konfigurierte Bestätigungstiefe und stellt dann einen signierten Lizenzschlüssel aus und liefert ihn. Kein Prozessor zwischen Ihnen und den Mitteln.

**Abonnements ohne gespeicherte Karten.** Verlängerungsrechnungen pro Periode, Kulanzfenster, automatisches Downgrade bei Ablauf. Bei Krypto gibt es kein „Karte hinterlegen und belasten“ — wir gestalten Erinnerungs- und Verlängerungsabläufe ehrlich darum herum, statt so zu tun, als gäbe es das.

**Zugriffsautomatisierung.** Eine Zahlung schaltet eine Telegram-Gruppe, Discord-Rolle, ADAMANT-Chat, API-Token oder Feature-Flag frei — und entzieht ihn bei Abo-Ablauf. Die langweiligen Teile (Widerruf, Teilzahlungen, Rückerstattungsbuchführung) sind, wo Heimwerker-Systeme brechen, und dort investieren wir die Arbeit.

## Wie die Architektur aussieht

- Watch-Only-Adressüberwachung — der Zahlungsserver hält keine Ausgabeschlüssel
- Konfigurierbare Bestätigungstiefe pro Chain und Betrag
- Signierte Webhooks in Ihr Backend, mit Replay-Schutz
- Abstimmungsberichte, damit die Buchhaltung jede Zahlung einer Rechnung zuordnen kann
- Selbst gehostetes Deployment: Ihre Datenbank, Ihre Kundendaten, Ihre Verfügbarkeit

## Referenzplattform

[adamant-payment](https://github.com/Adamant-im/adamant-payment) ist unsere Krypto-first-Plattform für Zahlungen, Abonnements und Software-Lizenzverwaltung. Sie ist der Ausgangspunkt, den wir forken und anpassen — Ihr Projekt beginnt mit laufendem Code, nicht mit einem leeren Repository.

## Was Sie vor dem Start vorbereiten sollten

- Die Chains und Token, die Sie tatsächlich akzeptieren wollen (weniger ist beim Start besser)
- Wohin Mittel fließen sollen — Cold Wallet, Multisig oder Adressen pro Rechnung
- Was eine Zahlung freischaltet und was bei Ablauf passieren muss
- Ihre Rechnungs- und Aufzeichnungsanforderungen, damit Berichte vom ersten Tag an stimmen

Wir bauen, deployen und warten diese Systeme in Produktion — keine Slide Decks.
