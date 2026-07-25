---
title: "ADAMANT Explorer : refonte de l'expérience utilisateur mobile et petits écrans"
slug: "discussion-70-adamant-explorer-mobile-and-small-screen-ux-overhaul-10490745"
description: "ADAMANT Explorer a optimisé son affichage mobile pour que les données blockchain denses restent lisibles et utilisables sur les petits écrans après la refonte Vue."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/70"
publishedAt: "2026-07-24T15:52:32Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10490745"
locale: "fr"
placeholder: false
---

ADAMANT Explorer a terminé une phase d'optimisation ciblée de son comportement sur mobile et petits écrans, afin que les données blockchain denses — tableaux, adresses, moniteurs, carte des pairs et graphe réseau — restent lisibles et utilisables sur les téléphones et les fenêtres étroites suite à la refonte sous Vue. Le travail a été fusionné dans la branche `dev` via Adamant-im/adamant-explorer#42, clôturant les tickets relatifs à l'UX mobile et au bruit généré par les confirmations de blocs WebSocket, ainsi qu'un correctif pour le zoom automatique sur iOS.

![Accueil — dernières opérations](/images/engineering-notes/github/discussions/10490745/001-7b8f5a7ef4.webp)

![Détails de la transaction](/images/engineering-notes/github/discussions/10490745/002-95436bddca.webp)

![Résumé de l'adresse](/images/engineering-notes/github/discussions/10490745/003-7f8d8ca009.webp)

![Détails du bloc](/images/engineering-notes/github/discussions/10490745/004-b4abc82ab8.webp)

![Moniteur des délégués](/images/engineering-notes/github/discussions/10490745/005-d25c6a646f.webp)

![Moniteur réseau](/images/engineering-notes/github/discussions/10490745/006-864cc5422f.webp)

## Changements par interface

La recherche universelle a été déplacée du menu replié vers la barre supérieure, entre le logo et le bouton de menu ; elle se compacte sur les petits écrans tandis que la barre réseau conserve un encart de statut confortable. Sur la page d'accueil, le tableau compressé a été remplacé par des cartes d'opérations. Les pages de blocs, de transactions et d'adresses utilisent désormais des tableaux de transactions compacts et défilants sur mobile ; la liste des blocs affiche une colonne de comptage `TXS`, et la page de transaction masque sa ligne de registre en double. Le moniteur des délégués, les pairs du moniteur réseau, les comptes principaux et les portefeuilles réservés bénéficient de replis en cartes `.table-mobile`, de contrôles de tri mobiles et d'un ARIA affiné. Les info-bulles personnalisées se ferment au toucher pour éviter qu'elles ne restent bloquées sur les écrans tactiles, et le champ de recherche ne déclenche plus le zoom automatique de Safari lors de la mise au point.

## Notes d'implémentation

Deux points de rupture structurels pilotent la mise en page. À une largeur <=720px, les tableaux de données se replient en cartes ou en tableaux défilants compacts ; à <=420px, ces cartes s'empilent verticalement. Les mises en page pour ordinateur et tablette au-dessus de 720px restent inchangées.

Chaque ligne de la page d'accueil est une carte CSS-grid. À <=720px, le trajet s'affiche sur une ligne sous la forme `expéditeur -> destinataire  montant  ouvrir` ; à <=420px, il se réorganise avec une flèche vers le bas centrée, le montant à côté, et l'expéditeur et le destinataire centrés horizontalement. La navigation et l'info-bulle sont liées uniquement au contrôle d'ouverture explicite, et non à l'ensemble de la carte.

Les listes de transactions des blocs et adresses restent de vrais tableaux sur mobile — défilables horizontalement dans leur conteneur avec un ensemble de colonnes compactes fixes (Type, ID, Expéditeur, Destinataire, Montant ; plus Date sur la page adresse) et sans boutons de copie par ligne. La liste des blocs désactive le tri sur mobile.

Un bug de retour à la ligne affectait les valeurs de résumé : les adresses et les ID de transaction étaient tronqués avec un seul caractère isolé, même lorsqu'il y avait de la place. La cause profonde était un élément `flex` avec `min-width: 0` et `overflow-wrap: anywhere` qui se réduisait à sa contribution min-content d'un caractère, forçant une rupture à cause de la largeur du bouton de copie. La valeur s'étend désormais pour remplir la cellule (`flex: 1`), gardant les adresses et les ID de transaction sur une seule ligne, tandis que les clés publiques continuent de s'ajuster correctement.

L'info-bulle unique au niveau du corps de page devient interactive uniquement lorsqu'elle est visible et se masque sur `pointerdown`, garantissant une sortie sur les appareils tactiles où le minuteur de masquage automatique n'est pas toujours fiable. Pour iOS, Mobile Safari zoome sur tout champ de saisie dont la police est inférieure à 16px, ce qui décalait la page ; le champ de recherche est fixé à 16px, tandis que la balise meta viewport conserve le zoom utilisateur activé pour l'accessibilité.

## Confirmation de bloc WebSocket du nœud

Les notifications de bloc WebSocket compactes sont hydratées via l'API REST du nœud avec une seule tentative de nouvelle tentative limitée pour gérer le délai de visibilité SQL `Block not found` entre les nœuds. Un repli sur la hauteur doit toujours confirmer l'ID et la hauteur du bloc annoncé. Le premier échec est consigné au niveau `debug` et un avertissement `warn` n'est émis que lorsque la confirmation est réellement épuisée, de sorte que la synchronisation routinière entre les nœuds ne génère plus de bruit d'erreur. Des tests unitaires spécifiques au nœud couvrent les chemins de nouvelle tentative, de repli, de validation et de journalisation.

## Validation

`npm run lint`, `npm run format:check` et `npm run test:unit` (225 tests, incluant l'hydratation des blocs WebSocket) sont validés. `git diff --check` est propre, et les mises en page pour ordinateur et tablette au-dessus de 720px restent inchangées sans régression.
