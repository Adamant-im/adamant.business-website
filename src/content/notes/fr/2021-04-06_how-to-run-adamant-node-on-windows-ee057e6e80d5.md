---
title: "Comment exécuter un nœud ADAMANT sur Windows"
slug: "how-to-run-adamant-node-on-windows-ee057e6e80d5"
description: "Depuis Windows 10 version 1903 et Windows Server 2019, Microsoft inclut WSL 2, permettant d'exécuter des applications Linux. Découvrez comment installer un nœud ADAMANT."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-adamant-node-on-windows-ee057e6e80d5"
publishedAt: "2021-04-06T13:12:12.555Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/ee057e6e80d5/001-1-uqe2ccpdkrmbxnio3cyqaq-jpeg.webp"
cardSpan: "full"
originalId: "medium:ee057e6e80d5"
locale: "fr"
placeholder: false
---

Depuis la version 1903 de Windows 10 et Windows Server 2019, Microsoft inclut WSL 2 (Windows Subsystem for Linux), qui permet d'exécuter des applications Linux sous Windows. Cela signifie que vous pouvez exécuter un nœud ADAMANT sur votre ordinateur personnel, y compris en tant que délégué ou pour gérer un pool de forging.

### Exigences système

Vous avez besoin de Windows 10 x64 (version 1903 / build 18362 ou supérieure) ou de Windows Server 2019, d'au moins 4 Go de RAM et de 50 Go d'espace disque. La technologie de virtualisation doit être activée dans le BIOS de votre ordinateur avant l'installation.

### Configuration de WSL 2

Suivez le [guide officiel d'installation de WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install-win10#manual-installation-steps). Si vous n'utilisez pas le Microsoft Store, vous pouvez [télécharger Ubuntu manuellement](https://docs.microsoft.com/en-us/windows/wsl/install-manual) ; Ubuntu 16, 18 ou 20 sont tous adaptés.

![Comment exécuter un nœud ADAMANT sur Windows](/images/engineering-notes/medium/ee057e6e80d5/002-0-d3n4-16cc9epoa-d.webp)

Après l'installation, créez un nom d'utilisateur et un mot de passe UNIX pour la distribution Ubuntu. Par exemple, définissez le nom d'utilisateur comme *ubuntu*.

### Installer le nœud ADAMANT

Vous disposez désormais d'un sous-système Ubuntu fonctionnant sous Windows, qui se comporte comme une machine virtuelle. Installez le nœud ADAMANT en suivant les [instructions standard pour Ubuntu](https://medium.com/adamant-im/how-to-run-your-adamant-node-on-ubuntu-990e391e8fcc).

![Comment exécuter un nœud ADAMANT sur Windows](/images/engineering-notes/medium/ee057e6e80d5/003-0-jj5gjxvimq-cagrf.webp)

Immédiatement après l'installation, le processus *Vmmem* (WSL 2) peut consommer beaucoup de RAM car le script d'installation télécharge une image fraîche de la blockchain et le sous-système Linux la met en cache en mémoire. La consommation de mémoire diminue fortement après un redémarrage de l'ordinateur.

### Exécuter le nœud après un redémarrage

Fermer la fenêtre Ubuntu n'arrête pas le nœud ; le sous-système Linux continue de fonctionner en arrière-plan. Si l'ordinateur passe en veille, le nœud reprend lors du réveil et se synchronise avec la hauteur actuelle de la blockchain. Toutefois, après un redémarrage complet de l'ordinateur, vous devez démarrer le nœud manuellement.

Ouvrez le terminal Ubuntu, ou connectez-vous depuis PowerShell :

```
wsl
```

Si vous avez plusieurs distributions Linux installées, précisez la version :

```
wsl -d Ubuntu-18.04
```

Une fois connecté, démarrez PostgreSQL, passez à l'utilisateur *adamant* et lancez le nœud :

```
sudo service postgresql start
su - adamant
cd /home/adamant/adamant && pm2 start --name adamant app.js
```

Vérifiez que le nœud fonctionne et qu'il augmente sa hauteur :

```
curl http://localhost:36666/api/blocks/getHeight
```

Le nœud met un certain temps à rattraper la hauteur actuelle de la blockchain. Vous pouvez configurer un démarrage automatique au redémarrage si vous avez des connaissances en administration système ; consultez [cette réponse sur Ask Ubuntu](https://askubuntu.com/a/1166012) pour des instructions.

### Accéder à l'API

Depuis le terminal Ubuntu ou depuis Windows, vous pouvez accéder à l'API du nœud via *localhost*. Ouvrez un navigateur vers `http://localhost:36666/api/blocks/getHeight`. L'accès à l'API depuis un autre ordinateur nécessite une configuration réseau supplémentaire.
