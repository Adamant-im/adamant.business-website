---
title: "ADAMANT Pool v2.0.0 publiée"
slug: "new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
description: "ADAMANT Pool v2.0.0 introduit une réécriture complète du code axée sur la fiabilité et les performances. Le pool utilise désormais l'API JS ADAMANT v1.0.0, garantissant que les votants reçoivent leurs récompenses correctement et à temps."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
publishedAt: "2021-06-19T14:05:48.039Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/aca713a5a3d6/001-0-nfjyvf39o49caqs7.webp"
cardSpan: "full"
originalId: "medium:aca713a5a3d6"
locale: "fr"
placeholder: false
---

ADAMANT Pool v2.0.0 introduit une réécriture complète du code axée sur la fiabilité et les performances. Le pool utilise désormais l'API JS ADAMANT v1.0.0, garantissant que les votants reçoivent leurs récompenses correctement et à temps. Les exigences en ressources ont été considérablement réduites ; le pool peut désormais fonctionner sur une machine virtuelle disposant de 1 vCPU et 512 Mo de RAM. Cette efficacité a été obtenue en supprimant les dépendances inutiles, en mettant à jour celles restantes, et en remplaçant la bibliothèque `request` par `axios`.

Plusieurs modifications de configuration ont été apportées. Le port par défaut est désormais 36667 au lieu de 36668. Le fichier de configuration inclut une nouvelle option `log_level` et un paramètre `donatewallet` permettant de partager un pourcentage des récompenses avec la fondation ADAMANT. Les périodes de paiement peuvent désormais être planifiées à l’aide d’une option indiquant le jour de la semaine pour `payoutperiod`. De plus, les frais de transaction de vote sont désormais pris en charge par les votants, ce qui entraîne une réduction de 0,5 ADM par récompense. Les opérateurs doivent ajuster le paramètre `minpayout` afin de garantir que les paiements restent raisonnables par rapport aux frais. La productivité du délégué est désormais prise en compte lors de la distribution des récompenses.

D'autres mises à jour incluent le refactorisation du code, la suppression du mode lecture seule, et l'ajout de fonctions Markdown pour le notificator. La conception du tableau de bord du panneau d'information du pool a également été mise à jour.

![Nouvelle version du logiciel de forging pool ADAMANT Pool v2.0.0](/images/engineering-notes/medium/aca713a5a3d6/002-0-vrmyfc6ou3ue0xnb.webp)

Lors de la mise à jour d'un pool existant, il est recommandé de supprimer l'ancienne installation et d'effectuer une installation fraîche. Toutefois, le fichier `/db/transactions` contenant l'historique des transactions doit être conservé.
