---
title: "Comment exécuter votre nœud ADAMANT sur Docker (Windows ou Mac)"
slug: "how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
description: "Remarque : l'image Docker peut être obsolète ; il est préférable d'exécuter un nœud ADAMANT sur un serveur Ubuntu. ADAMANT utilise le Delegated Proof of Stake (dPoS) pour la validation de la blockchain…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
publishedAt: "2018-06-22T15:46:46.729Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9a927cf7875a/001-0-fg4w7kswcdb2l5b0.webp"
cardSpan: "full"
originalId: "medium:9a927cf7875a"
locale: "fr"
placeholder: false
---

Remarque : l'image Docker peut être obsolète ; il est recommandé d'exécuter un nœud ADAMANT sur un serveur Ubuntu. ADAMANT utilise le Delegated Proof of Stake (dPoS) pour la validation de la blockchain, et l'exécution de votre propre nœud renforce la décentralisation du réseau.

Ce guide explique comment installer, exécuter et mettre à jour un nœud ADAMANT sur Windows, macOS ou Linux à l'aide de Docker. L'exemple utilise Windows 10, qui nécessite une version 64 bits de Windows 10 Pro, Entreprise ou Éducation (Build 14393 ou ultérieure). La machine hôte doit disposer d'au moins 4 Go de RAM et de 50 Go d'espace disque libre, selon la hauteur actuelle du bloc.

Pour installer Docker, téléchargez la version gratuite Docker Community Edition et exécutez l'installateur. Suivez l'assistant pour accepter la licence et autoriser l'installateur avec votre mot de passe système, nécessaire pour les composants réseau et les machines virtuelles Hyper-V. Après l'installation, démarrez Docker depuis le menu Démarrer. Une fois que l'icône de baleine dans la barre d'état devient stable, Docker est en cours d'exécution. Vous devez également partager votre lecteur local avec Docker en cliquant avec le bouton droit sur l'icône de la barre d'état, en sélectionnant Paramètres, en cochant la case du lecteur partagé, puis en appliquant les modifications.

![Comment exécuter votre nœud ADAMANT sur Docker (Windows ou Mac)](/images/engineering-notes/medium/9a927cf7875a/002-0-lyckrpled-5lr7hl.webp)

![Comment exécuter votre nœud ADAMANT sur Docker (Windows ou Mac)](/images/engineering-notes/medium/9a927cf7875a/003-0-6akvfvvlkcfe7829.webp)

![Comment exécuter votre nœud ADAMANT sur Docker (Windows ou Mac)](/images/engineering-notes/medium/9a927cf7875a/004-0-a86t6y8gjz9oxrpc.webp)

Pour installer le nœud ADAMANT, installez d'abord un client Git en utilisant les options par défaut. Ouvrez Microsoft PowerShell et clonez le dépôt :

```bash
git clone https://github.com/Adamant-im/adamant-docker
cd adamant-docker
```

![Comment exécuter votre nœud ADAMANT sur Docker (Windows ou Mac)](/images/engineering-notes/medium/9a927cf7875a/005-0-fgfme0jdbid9yncf.webp)

Pour exécuter le nœud, récupérez les images Docker nécessaires :

```bash
docker-compose pull
```

![Comment exécuter votre nœud ADAMANT sur Docker (Windows ou Mac)](/images/engineering-notes/medium/9a927cf7875a/006-0-aivqroqzrjyhguqd.webp)

Démarrez le service de base de données et vérifiez qu'il s'est lancé correctement :

```bash
docker-compose up -d db
docker-compose logs
```

![Comment exécuter votre nœud ADAMANT sur Docker (Windows ou Mac)](/images/engineering-notes/medium/9a927cf7875a/007-0-papyajoh0cxgai9i.webp)

Ensuite, démarrez le service adamant-node et vérifiez les journaux pour confirmer un démarrage réussi :

```bash
docker-compose up -d adamant-node
```

![Comment exécuter votre nœud ADAMANT sur Docker (Windows ou Mac)](/images/engineering-notes/medium/9a927cf7875a/008-0-5juodmupmzrre2n1.webp)

Vous pouvez arrêter tous les services en cours d'exécution avec `docker-compose stop` et les redémarrer ultérieurement à l'aide de `docker-compose start`.

![Comment exécuter votre nœud ADAMANT sur Docker (Windows ou Mac)](/images/engineering-notes/medium/9a927cf7875a/009-0-hrzlp4aniigch2fc.webp)

Validez l'installation en vérifiant le journal de l'application du nœud :

```bash
docker-compose logs --tail=10 adamant-node
```

![Comment exécuter votre nœud ADAMANT sur Docker (Windows ou Mac)](/images/engineering-notes/medium/9a927cf7875a/010-0-v8ofli8bjy-hqo2b.webp)

L'argument `--tail=10` limite la sortie aux 10 dernières lignes du journal. Pour vérifier que le nœud est connecté à la blockchain ADAMANT, rendez-vous sur le moniteur de réseau ADAMANT et recherchez votre nœud par son adresse IP. Cela peut prendre quelques minutes avant que votre nœud apparaisse. Un nœud fraîchement installé affichera une hauteur de bloc de 1 pendant la synchronisation, ce qui peut prendre jusqu'à un jour selon votre connexion et votre processeur.

![Comment exécuter votre nœud ADAMANT sur Docker (Windows ou Mac)](/images/engineering-notes/medium/9a927cf7875a/011-0-74skpvuswckotzf6.webp)

Pour vérifier la hauteur directement, obtenez l'ID du conteneur à l'aide de `docker ps`, puis interrogez l'API du nœud :

```bash
docker ps
docker exec <container_id> curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

![Comment exécuter votre nœud ADAMANT sur Docker (Windows ou Mac)](/images/engineering-notes/medium/9a927cf7875a/012-0-osgtdu-u6daibuqi.webp)

Lorsque la synchronisation est terminée, la hauteur correspondra à celle des autres nœuds du réseau. Pour mettre à jour le nœud ADAMANT, ouvrez PowerShell et exécutez les commandes suivantes :

```bash
cd adamant-docker
docker-compose stop
docker-compose pull
docker-compose down
docker-compose up -d db
docker-compose up -d adamant-node
```

![Comment exécuter votre nœud ADAMANT sur Docker (Windows ou Mac)](/images/engineering-notes/medium/9a927cf7875a/013-0-l5hbgju9qlgr65sw.webp)
