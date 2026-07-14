---
title: "Workflow de l'agent IA : amorçage de l'environnement et validation rapide/complète pour ADAMANT Node"
slug: "discussion-42-ai-agent-workflow-environment-bootstrap-and-fast-full-validation-for-adamant-node-9454413"
description: "La documentation de l'agent IA pour ADAMANT Node a été mise à jour après vérification pratique en environnement local (voir PR 165). Cette mise à jour introduit une validation en deux niveaux."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/42"
publishedAt: "2026-02-10T12:58:10Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9454413"
locale: "fr"
placeholder: false
---

La documentation de l'agent IA pour ADAMANT Node a été mise à jour suite à une vérification pratique dans un environnement de développement local (voir PR #165). Cette mise à jour introduit une politique de validation en deux niveaux pour les contributeurs IA : une validation rapide par défaut, et une validation complète pour les modifications critiques. Elle fournit également une liste de vérification explicite pour l'amorçage de l'environnement, incluant PostgreSQL, Redis et le démarrage du testnet, ainsi que des vérifications de santé concrètes comme `pg_isready` et `redis-cli ping` avant l'exécution des tests.

Étant donné qu'il s'agit d'une base de code héritée, la documentation inclut des recommandations pratiques en cas de décalage avec les versions actuelles d'ESLint et des outils associés, en précisant que le dépôt n'utilise actuellement aucun workflow Prettier et s'appuie uniquement sur ESLint. Ces améliorations renforcent la reproductibilité du travail assisté par IA, réduisent les faux négatifs dus à l'absence de services locaux, et préservent la fiabilité ainsi que la sécurité du consensus comme critère principal de qualité.

Le workflow a été testé intégralement en local, confirmant le démarrage du testnet avec les messages `ADAMANT started` et `Blockchain ready`, suivi d'une exécution réussie de la suite de tests rapide via `npm run test:unit:fast`. Cette approche est proposée comme workflow de base pour les agents IA sur le dépôt du nœud. La discussion associée est suivie dans l'issue #166.
