---
title: "ADAMANT Payment v1.0 — Plateforme crypto-native pour les paiements, abonnements et gestion de licences"
slug: "discussion-47-adamant-payment-v1-0-universal-crypto-first-platform-for-payments-subscriptions-and-licens-10234312"
description: "ADAMANT Payment est une nouvelle infrastructure pour l'écosystème ADAMANT et tout produit nécessitant une monétisation native en crypto sans assembler plusieurs services tiers."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/47"
publishedAt: "2026-06-10T14:30:29Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10234312"
locale: "fr"
placeholder: false
---

**ADAMANT Payment** (`adamant-payment`) est une nouvelle composante d'infrastructure pour l'écosystème ADAMANT et pour tout produit nécessitant une monétisation native en crypto sans devoir assembler plusieurs services tiers. Elle remplace l'ancienne approche `adamant-client-auth` par une plateforme moderne et neutre vis-à-vis des produits : authentification, facturation, paiements en crypto, abonnements, gestion de licences, portail utilisateur et console d'administration réunis en une solution auto-hébergée.

La première intégration cible est l'abonnement à l'interface Web de ADAMANT Tradebot (scénario B) : les utilisateurs achètent un abonnement ou un essai sur adamant-payment, reçoivent un jeton de licence limité en portée, et le bot établit une connexion sortante vers le relais public de l'interface Web. La plateforme n'est pas liée au Tradebot — elle est conçue comme un produit autonome destiné aux bots, aux logiciels SaaS, aux applications de bureau et aux services Web3.

## Architecture et principaux atouts

La plateforme est conçue dès l'origine pour les paiements en cryptomonnaies, et non comme une fonction secondaire ajoutée a posteriori. Elle s'intègre naturellement aux projets Web3, aux bots de trading, aux produits SaaS et aux logiciels destinés à un public mondial. Le paiement est initialement pris en charge via Bitcoin (à travers BTCPay Server) et ADM (en natif, avec des adresses de dépôt uniques surveillées sur la blockchain), ainsi qu'un fournisseur de développement pour les tests. Les webhooks sont idempotents, et les valeurs uniques `externalId`/txid garantissent la justesse des paiements — les licences payantes sont émises ou prolongées dès le règlement.

Authentification, facturation, paiements en crypto, abonnements, gestion de licences, portail utilisateur et panneau d'administration sont combinés en une seule solution, éliminant le besoin d'assembler plusieurs services tiers. La plateforme peut automatiquement émettre des licences après paiement, gérer les dates d'expiration, les abonnements, les forfaits et l'accès aux produits. Les applications externes valident les licences via l'API REST sous `/v1/...`, ce qui permet aux produits de vérifier par programme l'état de la licence, la validité de l'abonnement et les droits d'accès de l'utilisateur.

Les utilisateurs peuvent se connecter avec un compte email classique ou via une authentification cryptographique utilisant une connexion par portefeuille ADM ou ETH (SIWE). Cela est particulièrement utile pour les utilisateurs Web3, car la plateforme peut fonctionner sans imposer d'identité basée sur l'email. Les sessions JWT avec cookies de rafraîchissement prennent en charge les applications basées sur navigateur.

La solution inclut une interface utilisateur et un tableau de bord d'administration. Les clients gèrent leurs paiements, licences et abonnements ; les éditeurs de produits gèrent les utilisateurs, commandes, forfaits et droits d'accès. Le panneau d'administration prend en charge la 2FA ADM et ETH, le captcha Turnstile, le verrouillage par IP et empreinte, ainsi que la journalisation des audits. En production, le panneau d'administration fonctionne sur une origine distincte.

`adamant-payment` n'est pas lié à ADAMANT Messenger ni à une application spécifique. Le marquage blanc est disponible via les variables d'environnement `BRAND_*`, et le modèle de données utilise des identifiants génériques pour les produits. Contrairement à Stripe, Paddle, Lemon Squeezy ou aux solutions SaaS traditionnelles de gestion de licences, elle peut être adaptée à vos propres règles, flux de paiement en crypto, modèles de tarification et produits. Elle s'installe sur votre propre infrastructure (PostgreSQL, Node.js), avec un contrôle total sur les utilisateurs, la logique de paiement, les licences et les données métier. Docker Compose est fourni pour Postgres, sans dépendance obligatoire à un service cloud SaaS.

## Périmètre de la version v1.0

La sortie v1.0 couvre le flux de monétisation de base : inscription des utilisateurs, paiement, délivrance d'accès, renouvellement d'abonnement, administration et intégration produit. L'authentification prend en charge le code par message ADM, Ethereum (SIWE) et l'email avec mot de passe. La facturation inclut un catalogue, un essai de 14 jours (une fois par exchange et paire au niveau mondial), des licences payantes, promotionnelles et manuelles, avec rechargement à chaud de `config/` pour les forfaits et codes promotionnels. Le panneau d'administration offre des statistiques, la gestion des comptes, des licences, des factures et des portefeuilles ADM/BTC, avec authentification par clé API et 2FA optionnel. L'internationalisation couvre l'anglais et le russe au lancement, avec un système i18n extensible dans `packages/shared`.

La pile technologique utilise pnpm avec Turborepo, Fastify 5, Prisma, PostgreSQL et React 18 (Vite). L'intégration continue s'exécute sur GitHub Actions, couvrant l'installation, la génération Prisma, la compilation, l'analyse de code (lint) et la vérification des types.

## Exigences produit et d'intégration

La neutralité vis-à-vis du produit est une exigence fondamentale : aucune marque Tradebot ou ADAMANT n'est en dur dans les énumérations de la base de données ; tout est configurable selon le déploiement. La portée de la licence est une licence par exchange et paire, avec un essai unique par portée au niveau mondial. L'authentification multi-identité garantit la coexistence ADM, ETH et email. La sécurité opérateur exige que le panneau d'administration fonctionne sur une origine distincte en production, avec clé API, 2FA optionnel, captcha, verrouillage et journal d'audit.

Pour l'intégration à l'écosystème, le relais de l'interface Web de Tradebot (scénario B) valide les licences via l'API adamant-payment, le bot utilisant un modèle de connexion sortante. L'API Tradebot sur la branche `refactor/new-webui-api` consomme la validation de licence, et l'interface Web Tradebot sur la branche `refactor/new-stack` fournit l'interface Web publique et le relais. De nouvelles implémentations `PaymentProvider` (par exemple, chaînes supplémentaires) peuvent être ajoutées sans réécrire le cœur de la facturation.

## Critères de publication

La version v1.0.0 sera publiée et étiquetée comme une GitHub Release. L'IC doit être au vert sur `dev` et sur la PR de publication vers `main`. La documentation couvre l'authentification, la facturation, les paiements, la sécurité de l'administration, le marquage, la base de données et la configuration de BTCPay. Les tests de fumée couvrent les flux d'authentification, la réclamation d'essai, le passage de la commande à l'émission de licence, les panneaux d'administration et le point de terminaison de validation de licence.

## Feuille de route post-v1

Les travaux prévus incluent l'automatisation du renouvellement des abonnements (BTCPay crée uniquement des factures ; la logique de renouvellement réside dans adamant-payment), l'ajout de nouveaux fournisseurs de paiement et chaînes, la documentation OpenAPI pour l'API publique, et des intégrations avec des produits tiers au-delà de Tradebot.

Suivi de la sortie : [Adamant-im/adamant-payment#1](https://github.com/Adamant-im/adamant-payment/issues/1).
