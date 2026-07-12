---
title: Portefeuilles, nœuds et infrastructure
description: Déploiement de nœuds, explorateurs, API, surveillance, portefeuilles et maintenance à long terme pour les systèmes crypto en production.
cta: Je veux une infrastructure crypto
layoutStyle: timeline
proofLinks:
  - label: ipfs-node
    url: https://github.com/Adamant-im/ipfs-node
  - label: currencyinfo
    url: https://github.com/Adamant-im/currencyinfo
---

L'infrastructure crypto échoue différemment de l'infrastructure web ordinaire : un nœud bloqué signifie des dépôts manqués, une mauvaise mise à jour peut vous isoler du réseau, et « on restaurera depuis la sauvegarde » a des conséquences quand de l'argent est en jeu. Nous exploitons cette catégorie de systèmes pour notre propre écosystème — voici comment une mission d'infrastructure se déroule typiquement.

## Phase 0 — Évaluation

Nous commençons par lire ce que vous avez : chaînes, portefeuilles, versions de nœuds, hébergement, stratégie de sauvegarde, et la panne qui vous inquiète le plus. Vous recevez une courte évaluation écrite avec des risques concrets et une architecture cible proposée — utile même si la mission s'arrête là.

## Phase 1 — Déploiement

Nœuds, explorateurs, indexeurs, backends de portefeuilles et API déployés sur vos serveurs ou des hôtes dédiés que vous contrôlez. Tout est reproductible : configuration dans un dépôt, bootstrap documenté, pas de serveurs uniques que seul un prestataire comprend.

## Phase 2 — Observabilité

Avant d'appeler quoi que ce soit « terminé », le système se rapporte lui-même : retard de hauteur de bloc, nombre de pairs, marge disque, latence API, seuils de solde de portefeuille. Les alertes vont vers les canaux de votre équipe — Telegram, ADAMANT, e-mail — avec des runbooks pour les cas courants.

## Phase 3 — Exploitation

Mises à jour de chaîne et hard forks appliqués selon le calendrier, dépendances patchées, capacité revue. Nous proposons des contrats de maintenance continue, ou nous transmettons proprement à votre équipe avec documentation et formation — l'auto-hébergement signifie que vous n'êtes jamais enfermés.

## Construit à partir de composants que nous exploitons nous-mêmes

[ipfs-node](https://github.com/Adamant-im/ipfs-node) est notre nœud de stockage distribué, utilisé là où les fichiers n'ont pas leur place sur une blockchain. [currencyinfo](https://github.com/Adamant-im/currencyinfo) est un service auto-hébergé de taux crypto et fiat — le genre de dépendance banale et critique sur laquelle les systèmes de production s'appuient discrètement. Les deux sont open source, les deux tournent dans notre propre infrastructure aujourd'hui.

## Le standard que nous tenons

Nous maintenons ce que nous construisons. Cela compte quand vos nœuds, portefeuilles et API doivent rester en ligne pendant des années — pas seulement bien en démo dans une présentation.
