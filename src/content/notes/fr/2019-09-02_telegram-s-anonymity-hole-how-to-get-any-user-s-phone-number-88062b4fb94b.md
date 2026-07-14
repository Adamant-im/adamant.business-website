---
title: "La faille d'anonymat de Telegram : comment obtenir le numéro de téléphone de n'importe quel utilisateur"
slug: "telegram-s-anonymity-hole-how-to-get-any-user-s-phone-number-88062b4fb94b"
description: "Telegram exige un numéro de téléphone pour envoyer des messages, ce qui lie toutes les communications à l'identité d'un utilisateur et crée de graves risques pour la vie privée."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/telegrams-anonymity-hole-how-to-get-any-user-s-phone-number-88062b4fb94b"
publishedAt: "2019-09-02T08:18:08.034Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/88062b4fb94b/001-0-mhckpcqqduw4kpcb.webp"
cardSpan: "full"
originalId: "medium:88062b4fb94b"
locale: "fr"
placeholder: false
---

Telegram exige un numéro de téléphone pour commencer à envoyer des messages, liant ainsi tous les messages à l'identité de l'utilisateur. Ce mécanisme n'est pas seulement obsolète, il introduit également des risques importants pour la vie privée. L'une de ces vulnérabilités permet à n'importe qui d'obtenir le numéro de téléphone d'un utilisateur d'un groupe Telegram en exploitant la fonction de synchronisation des contacts de l'application.

Pour illustrer cela, considérons un chat de groupe ouvert dans lequel un utilisateur cible, « Sergey Lebedev », est visible.

![La faille d\'anonymat de Telegram : comment obtenir le numéro de téléphone de n\'importe quel utilisateur](/images/engineering-notes/medium/88062b4fb94b/002-0-fcieyaa3mo5op3nv.webp)

En quittant l'application et en ajoutant un nouveau contact au carnet d'adresses natif de l'appareil avec un numéro de téléphone deviné, nous pouvons tester si ce numéro appartient à un utilisateur de Telegram.

![La faille d\'anonymat de Telegram : comment obtenir le numéro de téléphone de n\'importe quel utilisateur](/images/engineering-notes/medium/88062b4fb94b/003-0-usc809xtvbg9yqgn.webp)

Ensuite, assurez-vous que la synchronisation des contacts est activée dans les paramètres de confidentialité de Telegram (Paramètres — Confidentialité et sécurité). Cette fonctionnalité ajoute automatiquement les contacts de l'appareil à l'application s'ils sont inscrits sur Telegram.

![La faille d\'anonymat de Telegram : comment obtenir le numéro de téléphone de n\'importe quel utilisateur](/images/engineering-notes/medium/88062b4fb94b/004-0-bpxhl6k-bs5uhotz.webp)

Si le numéro de téléphone deviné est enregistré sur Telegram, l'application ajoutera l'utilisateur à sa liste de contacts. Dans cet exemple, le numéro deviné était correct.

![La faille d\'anonymat de Telegram : comment obtenir le numéro de téléphone de n\'importe quel utilisateur](/images/engineering-notes/medium/88062b4fb94b/005-0-ajrqdbdxby-cjw0f.webp)

Telegram remplacera alors le nom affiché de l'utilisateur par celui attribué dans le carnet d'adresses de l'appareil. En retournant au chat de groupe d'origine, « Sergey Lebedev » s'affiche désormais comme « Testing Phone ID », confirmant que le numéro de téléphone deviné lui appartient.

![La faille d\'anonymat de Telegram : comment obtenir le numéro de téléphone de n\'importe quel utilisateur](/images/engineering-notes/medium/88062b4fb94b/006-0-qbjxtb52xz7x-fzs.webp)

Bien que deviner un numéro de téléphone parmi des millions semble irréaliste, les attaquants peuvent réduire considérablement cette plage en utilisant l'ingénierie sociale pour déterminer le pays et l'opérateur de la cible. De plus, une application mobile simple pourrait automatiser l'ajout de grandes plages de numéros de téléphone au carnet d'adresses d'un appareil, rendant ainsi la découverte par force brute réalisable. Cette vulnérabilité constitue une menace grave pour la vie privée des utilisateurs, en particulier pour les personnalités publiques, les investisseurs et les activistes. Les applications qui exigent un numéro de téléphone pour l'inscription comportent souvent des compromis cachés en matière de confidentialité.
