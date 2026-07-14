---
title: "ADAMANT Localnet et remplacements de configuration : développement plus rapide, tests simplifiés, meilleure automatisation"
slug: "adamant-localnet-and-config-overrides-faster-development-easier-testing-better-automation-c6756a10f6bd"
description: "Le développement ADAMANT est désormais plus simple et rapide grâce à Localnet et aux remplacements de configuration dynamiques pour les nœuds, contributeurs et développeurs d'applications."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-localnet-and-config-overrides-faster-development-easier-testing-better-automation-c6756a10f6bd"
publishedAt: "2026-06-06T13:20:25.670Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/c6756a10f6bd/001-1-50jddzsw9tlqqlt95tevlg-png.webp"
cardSpan: "full"
originalId: "medium:c6756a10f6bd"
locale: "fr"
placeholder: false
---

Le développement ADAMANT est devenu plus simple et plus rapide pour les opérateurs de nœuds, les contributeurs et les développeurs d'applications. En complément du Testnet ADAMANT public, les développeurs peuvent désormais exécuter un réseau ADAMANT local léger directement sur leur propre machine. Cette configuration Localnet est conçue pour des expérimentations rapides, des vérifications automatisées, des tests de scénarios et des flux de travail de développement qui ne nécessitent ni réseau public ni infrastructure lourde. Parallèlement, ADAMANT Node prend désormais en charge des remplacements de configuration flexibles, permettant aux opérateurs et aux scripts d'automatisation de test de modifier les paramètres du nœud au démarrage sans avoir à éditer manuellement `config.json` ou `test/config.json`.

### Du Testnet à Localnet

Le Testnet reste important car il offre aux développeurs un environnement public partagé proche des conditions réelles du réseau. Il est utile pour tester des intégrations, vérifier le comportement d'une application, valider la compatibilité des nœuds et expérimenter des fonctionnalités avant leur passage en Mainnet. Cependant, toutes les tâches de développement n'ont pas besoin d'un réseau public. Parfois, les développeurs ont besoin de quelque chose de plus petit et plus rapide : démarrer plusieurs nœuds localement, tester des modifications liées au consensus, vérifier la découverte des pairs et la synchronisation, reproduire un bogue, exécuter des tests automatisés de scénarios ou valider le comportement d'un nœud avant d'ouvrir une demande de fusion (pull request). C'est là qu'intervient Localnet.

### Qu'est-ce qu'ADAMANT Localnet ?

ADAMANT Localnet est un réseau ADAMANT local multi-nœuds géré qui s'exécute sur une seule machine. Au lieu de se connecter à des nœuds publics du Testnet, Localnet démarre plusieurs nœuds ADAMANT isolés localement. Chaque nœud dispose de ses propres ports, état d'exécution, journaux (logs), configuration, métadonnées de processus et paramètres de base de données.

Le flux de travail de base est simple :

```bash
npm run start:localnet -- --nodes 3
npm run status:localnet
npm run stop:localnet
```

Lorsqu'un nettoyage complet est nécessaire, les bases de données locales persistantes peuvent être supprimées avec `npm run drop:localnet` ou en utilisant `npm run stop:localnet -- --dropOnStop`.

Localnet est volontairement léger. Il ne nécessite ni serveur public, ni VPS, ni longue synchronisation depuis le réseau. Il s'exécute localement, utilise une configuration de test contrôlée et convient aux machines de développement. Cela le rend utile pour les contributeurs testant des modifications de nœud avant de les soumettre, les mainteneurs ayant besoin de vérifications rapides de versions, les développeurs créant des applications basées sur les API ADAMANT, ainsi que pour les scripts d'automatisation ou les environnements de type CI.

### Ce que crée Localnet en arrière-plan

Lorsque Localnet démarre, il génère des données d'exécution isolées pour chaque nœud, incluant des fichiers de configuration par nœud, l'état d'exécution, les fichiers PID, un manifeste, les données locales de chaîne et des dossiers de journaux par nœud. Les journaux sont séparés par nœud, par exemple sous `logs-localnet/node-1/`, `logs-localnet/node-2/`, etc. Cela est important car les problèmes multi-nœuds nécessitent souvent de comparer le comportement entre différents pairs — un seul fichier journal n'est pas suffisant pour déboguer des problèmes de propagation, de reconnexion, de blocs manquants, de situations de split-brain, de comportement de forging ou de consensus broadhash. Les outils Localnet produisent également des métadonnées lisibles par machine pouvant être utilisées ultérieurement par des outils de test de scénarios.

Le script d'état (status) fournit des informations par nœud telles que l'état de l'API, le nombre de délégués, l'heure du dernier forging, le nethash et le consensus broadhash en temps réel. Le consensus broadhash est particulièrement utile pour vérifier si les nœuds locaux sont réellement alignés entre eux après le démarrage. Dans un test de fumée local, un réseau local à 3 nœuds a été démarré, l'état a été interrogé, le consensus broadhash en direct a atteint 100 % sur tous les nœuds, puis le réseau local a été arrêté puis supprimé proprement.

Localnet n'est pas arrêté en tuant simplement les processus. Le script `stop:localnet` utilise le chemin d'arrêt gracieux normal du nœud, ce qui permet d'éviter des problèmes inutiles de base de données ou d'état d'exécution et de rapprocher les tests locaux du comportement opérationnel réel. Par défaut, les bases de données PostgreSQL locales sont persistantes. La création automatique de base de données dépend du rôle local PostgreSQL disposant de la permission `CREATEDB` ; si celle-ci n'est pas disponible, les développeurs peuvent utiliser une configuration de base de données existante ou les options documentées de saut/création.

### Remplacements de configuration : fin de l'édition manuelle des fichiers

Auparavant, ADAMANT Node permettait de sélectionner un fichier de configuration avec `--config` et disposait de plusieurs remplacements CLI en dur comme `--port`, `--address`, `--peers`, `--log` et `--snapshot`. Cela fonctionnait pour des cas simples mais ne s'adaptait pas bien. Les opérateurs et les scripts d'automatisation ont souvent besoin de modifier des valeurs de configuration imbriquées — ports, paramètres Redis, paramètres de base de données, listes de pairs, options de journalisation, paramètres d'API, configuration de forging, hauteurs d'activation ou paramètres spécifiques aux tests. Éditer manuellement des fichiers de configuration copiés est source d'erreurs, ajouter un indicateur CLI par clé de configuration ne s'adapte pas, et remplacer tout le fichier de configuration est souvent trop lourd pour de petites modifications spécifiques à l'environnement.

Les développeurs peuvent désormais transmettre des valeurs de configuration individuelles directement au démarrage en utilisant des clés en notation pointée correspondant à la structure existante de l'objet de configuration :

```bash
node app.js \
  --config test/config.json \
  --genesis test/genesisBlock.json \
  --config-set consensusActivationHeights.fairSystem=4359465 \
  --config-set redis='{ "url": "redis://127.0.0.1:6379/1", "password": null }'
```

Cela permet aux scripts de remplacer une seule valeur scalaire imbriquée ou une valeur d'objet entière. Les valeurs sont analysées comme des valeurs compatibles JSON lorsque c'est possible, afin que les nombres, booléens, null, tableaux et objets soient correctement représentés au lieu d'être traités comme des chaînes simples.

Les remplacements de configuration prennent également en charge les fichiers. Un fichier de remplacement au format env peut contenir des entrées telles que :

```ini
consensusActivationHeights.fairSystem=4359465
redis='{ "url": "redis://127.0.0.1:6379/1", "password": null }'
```

L'implémentation prend également en charge les fichiers de remplacement partiels au format JSON. Cela est utile pour les environnements locaux, l'automatisation de tests, les flux de travail de type CI et les mainteneurs souhaitant un ensemble reproductible de modifications sans modifier les fichiers de configuration suivis. Localnet utilise ce mécanisme par défaut via `test/config.localnet.json`, conservant ainsi la configuration de base stable tandis que les différences spécifiques à Localnet sont appliquées via le même flux de remplacement validé.

### Validation et sécurité

La configuration finale résolue est toujours validée par rapport au schéma de configuration ADAMANT existant après résolution des valeurs par défaut, des fichiers de remplacement, des remplacements directs et des raccourcis CLI hérités. Les chemins invalides, les types de valeurs incorrects, le JSON mal formé et les clés non sécurisées doivent échouer avant le démarrage, plutôt que de provoquer un comportement imprévisible à l'exécution. Les valeurs sensibles sont occultées dans les journaux de remplacement de configuration, y compris les mots de passe, les phrases secrètes (passphrases), les secrets et les jetons. Les raccourcis de démarrage hérités sont acheminés via le même pipeline de remplacement validé et conservent la priorité la plus élevée, permettant ainsi aux flux de travail existants de continuer à fonctionner tout en offrant aux nouveaux flux un mécanisme de configuration plus générique et cohérent.

Certaines valeurs de configuration sont sensibles au consensus. Remplacer des clés telles que `consensusActivationHeights.*` peut être utile pour des scénarios locaux ou de test, mais utiliser des hauteurs d'activation incompatibles avec le réseau sur la mauvaise chaîne peut amener un nœud à diverger du réseau. Les remplacements de configuration sont conçus pour être explicites et visibles. Ils sont utiles pour Localnet, Testnet, l'automatisation et des scénarios opérationnels contrôlés, mais doivent être utilisés avec précaution sur les nœuds Mainnet de production. Cette fonctionnalité modifie uniquement la résolution de la configuration au démarrage — elle ne modifie pas directement la logique des blocs, la sérialisation des transactions, la logique des récompenses, des frais, l'ordre des délégués, les vérifications de signature ou les règles de consensus.

### Localnet et Testnet fonctionnent ensemble

Localnet ne remplace pas le Testnet ; ils résolvent des problèmes différents. Localnet est idéal pour un développement rapide, privé et reproductible sur une seule machine, où les développeurs ont besoin d'un contrôle total, d'un démarrage rapide et d'expérimentations isolées. Le Testnet est idéal pour des tests publics, partagés et au niveau du réseau, où les développeurs ont besoin d'un environnement persistant, de pairs publics, de pièces ADM de test, d'un accès à l'explorateur et de vérifications au niveau de l'application sur un réseau partagé. Ensemble, ils offrent aux contributeurs ADAMANT un pipeline de développement plus solide : tester localement avec Localnet, valider sur le Testnet public, puis préparer des versions Mainnet plus sûres.

La gestion du cycle de vie de Localnet a été séparée intentionnellement de l'exécution des tests de scénarios. Les scripts Localnet sont responsables du démarrage, de l'arrêt, de l'inspection et du nettoyage du réseau local. Les exécuteurs de scénarios peuvent ensuite cibler un Localnet ou un Testnet déjà disponible et produire des rapports. Cette séparation rend les responsabilités claires et facilite la création d'outils futurs.
