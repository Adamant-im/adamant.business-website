---
title: Bots crypto et automatisation
description: Bots auto-hébergés, surveillance, alertes et outils d'exécution. Vous gardez les clés, la stratégie et la responsabilité.
cta: Je veux un bot crypto
layoutStyle: accordion
proofLinks:
  - label: adamant-2fa
    url: https://github.com/Adamant-im/adamant-2fa
  - label: adamant-exchangebot
    url: https://github.com/Adamant-im/adamant-exchangebot
---

Un bot est un petit programme avec accès à l'argent. Ce cadrage guide chaque décision que nous prenons : permissions minimales sur les clés, fiabilité sobre, et code source complet entre vos mains. Nous livrons le logiciel — vous gardez les clés, la stratégie et la responsabilité.

## Ce que nous automatisons

- **Bots de notification et d'alerte** — bots Telegram et ADAMANT qui surveillent les soldes, la santé des nœuds, l'état des ordres sur les exchanges ou les transferts on-chain, et alertent un humain avant qu'un problème ne devienne une perte
- **Assistants d'exécution** — flux semi-automatisés où le bot prépare une transaction ou un ordre et une personne l'approuve ; utile pour les opérations de trésorerie et le règlement OTC
- **Tableaux de bord opérationnels** — une vue unique sur les portefeuilles, nœuds et bots que votre équipe exploite déjà, au lieu de huit onglets de navigateur et d'un tableur
- **Services dans le chat** — bots vivant dans le chat ADAMANT chiffré : flux d'échange, paiements, files de support et contrôle d'accès
- **Outils assistés par IA** — synthétiseurs et assistants de triage basés sur des LLM, toujours sous revue d'ingénieurs seniors et jamais avec accès direct aux clés

## Comment nous évitons que les bots deviennent des incidents

La plupart des histoires d'horreur viennent des trois mêmes erreurs : clés API avec droits de retrait, boucles de retry qui dépensent deux fois, et silence quand quelque chose casse. Notre pratique standard :

- Clés d'exchange limitées au minimum de permissions nécessaire au flux — trade-only ou read-only dès que possible
- Opérations idempotentes et état explicite, pour qu'un redémarrage ne répète jamais un transfert
- Budgets de rate-limit et circuit breakers autour de chaque API externe
- Alertes sur le bot lui-même — un bot qui s'arrête silencieusement est pire qu'aucun bot
- Déploiement sur vos serveurs, avec logs et métriques lisibles par votre équipe

## Cas : 2FA vérifiée sur la blockchain

[adamant-2fa](https://github.com/Adamant-im/adamant-2fa) livre des codes à usage unique via la messagerie ADAMANT plutôt que par SMS. La livraison est vérifiée on-chain et ne peut pas faire l'objet d'un SIM swap. Nous construisons des flux de vérification similaires pour les produits où l'e-mail et le SMS ne sont pas des surfaces d'attaque acceptables.

## Cas : échange dans un chat chiffré

[adamant-exchangebot](https://github.com/Adamant-im/adamant-exchangebot) exécute un flux d'échange complet — cotations, dépôts, paiements — dans un chat chiffré de bout en bout. Le même modèle s'adapte aux paiements, faucets, primes de bounty et distribution de jetons interne dans votre propre pile.

## Où se trace la limite

Nous n'exécutons pas de stratégies pour votre compte, ne détenons pas vos clés et ne promettons pas de profits de trading. Si une demande se résume à « faites un bot qui imprime de l'argent », nous refuserons et expliquerons pourquoi — puis proposerons l'automatisation qui économise réellement des heures d'ingénierie à votre équipe.
