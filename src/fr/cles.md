# Clés API

## Sécurité

Suivez toujours les étapes suivantes :
* Utilisez un navigateur Web moderne et sécurisé.
* Appliquez des correctifs de sécurité dans les 30 jours suivant le lancement.
* Conservez les clés API dans un fichier chiffré dont l’accès est limité au personnel autorisé. Ne les communiquez pas par courriel ni par ticket de soutien et ne les mettez pas en texte clair dans un référentiel de code source.
* Veillez à la rotation des clés dès qu’une personne ayant accès aux clés quitte votre équipe.
* Donnez aux utilisateurs tiers et utilisatrices tierces une clé API unique.

Nous recommandons l’utilisation d’un service de gestion de clés offert par un fournisseur de services infonuagiques pour garantir la sécurité des clés API.

## Types de clés

Il existe trois types de clés API différents :

- test
- équipe et liste de confiance
- active

Lorsque vous configurez un nouveau service, il démarrera en mode d’essai. Un service en mode d’essai peut créer des __clés de test__ ou __des clés d’équipe et de liste de confiance__. Vous devez disposer d’un service activé pour créer une __clé active__.

Pour créer une clé API :

1. [Connectez-vous à Notification GC](https://notification.canada.ca/sign-in?lang=fr).
1. Allez à la page __Intégration API__.
1. Sélectionnez __Clés API__.
1. Sélectionnez __Créer une clé API__.

## Test

Utilisez une clé de test pour tester la performance de votre service et son intégration avec Notification GC.

Les messages envoyés à l’aide d’une clé de test :

- génèrent des réponses réalistes
- permettent d'obtenir un état de livraison
- ne sont pas réellement livrés à un destinataire
- n’apparaissent pas sur votre tableau de bord
- ne comptent pas sur vos allocations de courriels et de messages texte

Pour tester les réponses d’échec avec une clé de test, utilisez les numéros et adresses suivants :

|Numéro de téléphone/adresse de courriel|Réponse|
|:---|:---|
|+15149301633|`temporary-failure`|
|+15149301632|`permanent-failure`|
|temp-fail@simulator.notify|`temporary-failure`|
|perm-fail@simulator.notify|`permanent-failure`|
|tout autre numéro ou adresse valide|`delivered`|

Vous n’êtes pas obligé de révoquer les clés de test.

## Équipe et liste de confiance

Une clé d’équipe et de liste de confiance vous permet d’envoyer de vrais messages aux membres de votre équipe ainsi qu’aux adresses ou numéros sur votre liste de confiance pendant que votre service est encore en mode d’essai.

Vous obtiendrez une erreur si vous utilisez ces clés pour envoyer des messages à toute personne qui n’est pas dans votre équipe ou votre liste de confiance.

Les messages envoyés avec une clé d’équipe et de liste de confiance apparaissent sur votre tableau de bord et comptent sur vos allocations de courriels et de messages texte.

Vous n’êtes pas obligé de révoquer les clés d’équipe et de liste de confiance.

## Active

Vous ne pouvez créer des clés active qu’une fois votre service est activé. Vous pouvez utiliser des clés actives pour envoyer des messages à n’importe qui. Activez votre service dans les paramètres.

Les messages envoyés avec une clé active apparaissent sur votre tableau de bord et comptent sur vos allocations de courriels et de messages texte.

Vous devez révoquer et recréer régulièrement ces clés. Pour révoquer une clé :

1. [Connectez-vous à Notification GC](https://notification.canada.ca/sign-in?lang=fr).
1. Allez à la page __Intégration API__.
1. Sélectionnez __Clés API__.
1. Sélectionnez __Révoquer___ pour la clé API que vous voulez révoquer.

Vous pouvez avoir plusieurs clés actives à la fois.

Vous ne devez jamais envoyer de messages de test à des numéros ou adresses non valides à l’aide d’une clé active.
