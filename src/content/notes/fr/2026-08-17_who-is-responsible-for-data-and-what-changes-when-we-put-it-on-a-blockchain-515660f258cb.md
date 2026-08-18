---
title: "Qui est responsable des données ? Et qu'est-ce qui change lorsque nous les plaçons sur une blockchain ?"
slug: "who-is-responsible-for-data-and-what-changes-when-we-put-it-on-a-blockchain-515660f258cb"
description: "Tout produit numérique commence par l'enregistrement de données. À mesure que celles-ci circulent, la responsabilité semble se diluer, mais la blockchain ne l'efface pas."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/who-is-responsible-for-data-and-what-changes-when-we-put-it-on-a-blockchain-515660f258cb"
publishedAt: "2026-08-17T14:11:55.973Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:515660f258cb"
coverImage: "/images/engineering-notes/medium/515660f258cb/001-2915e505dd.webp"
locale: "fr"
placeholder: false
---

Tout produit numérique commence par l'enregistrement de données sur une personne ou un objet. À mesure que ces données circulent entre les applications, les fournisseurs, les bases de données et parfois une blockchain, la responsabilité semble se diluer. Cependant, si une blockchain peut distribuer la garde des données, elle ne peut pas faire disparaître l'obligation de rendre des comptes.

L'absence d'un administrateur de base de données centralisé ne signifie pas l'absence de décisions, de devoirs ou de conséquences. Quelqu'un doit toujours choisir ce qui entre dans le système, pourquoi c'est nécessaire, combien de temps cela doit rester, et ce qui se passe en cas d'erreur.

### Les données ne deviennent jamais sans propriétaire

La propriété n'est qu'une métaphore juridique. Une question plus pratique est la suivante : qui détient quelle responsabilité à chaque étape du cycle de vie des données ? La personne décrite par les données possède des droits. La partie qui décide pourquoi et comment les données sont utilisées fixe les règles. Les fournisseurs de services mettent en œuvre le stockage et la sécurité. Les ingénieurs traduisent la politique en schémas et en autorisations. Les opérateurs d'infrastructure assurent la disponibilité des systèmes. Les auditeurs et les régulateurs assurent la surveillance.

Dans le cadre du RGPD, un responsable du traitement détermine les finalités et les moyens du traitement, tandis qu'un sous-traitant agit pour le compte du responsable. Ce dernier doit démontrer sa conformité aux principes tels que la limitation des finalités, la minimisation des données, l'exactitude et la limitation de la conservation. Cette structure s'applique au-delà des juridictions : la collecte était-elle nécessaire ? La personne a-t-elle été informée ? Une erreur peut-elle être corrigée ? Existe-t-il une partie réelle capable de répondre à une plainte ?

### Ce qu'une blockchain change — et ce qu'elle ne change pas

Une application conventionnelle donne à un opérateur un contrôle technique étendu pour modifier, révoquer ou supprimer des enregistrements. Ce même contrôle permet la remédiation, mais aussi la censure et la falsification. Une blockchain change cela : de multiples nœuds reproduisent un historique ordonné, valident les changements selon des règles partagées et rendent la réécriture unilatérale difficile. Le NIST décrit les blockchains comme étant résistantes à la falsification et permettant de détecter toute altération, et non comme étant magiquement immuables.

Cela crée un nouveau compromis : plus un enregistrement est difficile à modifier sans autorisation, plus il est difficile à corriger lorsque la modification est légitime. La responsabilité se déplace plutôt qu'elle ne disparaît. Les concepteurs d'applications décident de ce qui doit être soumis. Les développeurs de protocoles définissent les transitions d'état valides. Les validateurs appliquent les règles. Les opérateurs de nœuds répliquent l'historique. La gouvernance décide de l'évolution du logiciel. La CNIL en France est parvenue à une conclusion similaire : le participant qui décide d'enregistrer des données peut être considéré comme responsable du traitement. « C'est le protocole qui l'a fait » n'est pas un modèle de responsabilité sérieux.

### Quand inscrire des données sur la blockchain

La blockchain est justifiée lorsque plusieurs parties ont besoin d'un état partagé, ne se font pas entièrement confiance, exigent un ordonnancement et une provenance, valorisent une vérification indépendante, et lorsque l'enregistrement peut légitimement rester durable. Cela rend le stockage sur la chaîne pertinent pour les états critiques en matière de consensus (soldes, transferts), les engagements publics (hachages horodatés), les registres de statut et de révocation, les événements d'audit partagés et l'état de communication résistant à la censure. La permanence fait partie du produit, ce n'est pas un effet secondaire.

### Quand conserver les données hors chaîne

La plupart des données d'application ne répondent pas à ce critère. Les profils personnels bruts, les antécédents médicaux, les documents privés, les préférences modifiables et les fichiers multimédias volumineux sont de mauvais candidats pour une réplication permanente. Le chiffrement d'un enregistrement protège le contenu aujourd'hui, mais le texte chiffré peut rester disponible pendant des décennies. Les clés fuient, les algorithmes vieillissent et les métadonnées révèlent des relations. « Supprimer la clé » (crypto-déchiquetage) n'est pas identique à la suppression de chaque copie. Les hachages ne sont pas automatiquement anonymes ; s'ils sont liés à une personne ou comparés à de petits ensembles d'entrées, ils peuvent fonctionner comme des données personnelles pseudonymisées.

Les travaux du NIST sur les registres distribués améliorant la confidentialité partent du constat que l'immuabilité conventionnelle peut entrer en conflit avec les règles de confidentialité exigeant une révision ou une suppression. Des chercheurs ont exploré des structures de registres modifiables qui conservent leur intégrité tout en permettant un effacement contrôlé. La blockchain est un espace de conception, pas une structure de données sacrée.

### Le standard pratique : prouver sur la chaîne, stocker hors chaîne

Pour de nombreux produits, l'architecture la plus robuste est hybride : conservez les enregistrements sensibles dans des systèmes chiffrés et contrôlés en accès, et ne placez que la preuve la plus légère sur la chaîne. Stockez un document hors chaîne et ancrez un hachage sur la chaîne. Émettez des justificatifs vérifiables avec divulgation sélective. Publiez des entrées de révocation sans contenu privé. Utilisez le versionnage pour reconnaître les états corrigés. Chiffrez avec des clés renouvelables et définissez des politiques de conservation.

Le modèle de justificatifs vérifiables du W3C sépare l'émetteur, le détenteur, le sujet et le vérificateur. Une personne peut prouver un fait sans exposer un dossier d'identité complet. L'objectif est de rendre la confiance portable tout en partageant moins.

Parfois, vous n'avez pas besoin de blockchain du tout. Une base de données bien gouvernée fournit le chiffrement, le contrôle d'accès, les événements d'audit signés et une correction rapide. Un journal de transparence utilisant des arbres de Merkle (comme Certificate Transparency, RFC 9162) fournit des preuves d'inclusion sans consensus distribué. La question décisive n'est pas « Pouvons-nous utiliser la blockchain ? » mais « Quelle défaillance essayons-nous de prévenir ? »

### Un test en sept questions avant la première transaction

Avant de rendre des données permanentes, un projet doit répondre à ces questions en langage clair. Quelle revendication exacte doit être vérifiée ? Qui doit s'accorder sur l'état ? Un opérateur responsable unique serait-il acceptable ? Les données pourraient-elles devenir erronées, nuisibles ou juridiquement effaçables ? Une preuve peut-elle remplacer la charge utile ? Qui gère la correction et le recours ? Que se passe-t-il dans vingt ans concernant la compromission des clés et le vieillissement cryptographique ?

### ADAMANT : Permanence pour le transport, confidentialité pour le contenu

ADAMANT offre un exemple concret de compromis délibéré. Le réseau utilise une blockchain en preuve d'enjeu déléguée comme couche de confiance décentralisée pour la communication. Les clients n'ont pas besoin de faire confiance au serveur d'une seule entreprise pour préserver l'historique des transactions partagées.

Mais la blockchain n'est pas une excuse pour publier du texte en clair. Selon la documentation d'ADAMANT, les actifs des transactions de messages sont chiffrés avant d'être intégrés dans les transactions, signés et diffusés. Le chat de base utilise un chiffrement à clé publique authentifié basé sur NaCl box ; les enregistrements clé-valeur utilisent NaCl secretbox. Le client effectue le travail cryptographique localement.

Le corps du message chiffré reste privé tandis que le réseau a besoin des métadonnées de transaction — expéditeur, destinataire, horodatage, frais, signature — pour valider et acheminer l'activité. Le chiffrement protège le contenu ; il ne rend pas chaque relation invisible. L'architecture d'ADAMANT montre le cas d'usage légitime de la blockchain : la communication ne devrait pas disparaître parce qu'une entreprise ferme un compte, tout en minimisant ce que les nœuds publics doivent comprendre du message privé lui-même.

### La responsabilité est une fonctionnalité

Les produits dignes de confiance ne gagneront pas en collectant le plus de données ou en déclarant chaque base de données immuable. Ils gagneront en rendant la responsabilité lisible. Les utilisateurs doivent savoir ce qui est enregistré et ce qui reste privé. Les développeurs doivent expliquer pourquoi chaque champ existe. Les opérateurs doivent connaître leurs devoirs en matière de sécurité. La gouvernance doit fournir des voies de correction. La décentralisation est plus forte lorsqu'elle supprime le contrôle inutile sans supprimer la responsabilité. La blockchain est plus forte lorsqu'elle porte la preuve — pas toute l'histoire.

![Qui est responsable des données ? Et qu'est-ce qui change lorsque nous les plaçons sur une blockchain ?](/images/engineering-notes/medium/515660f258cb/002-87fcd750d8.webp)

Une carte de décision pratique pour choisir entre des données hors chaîne, hybrides ou sur la chaîne.
