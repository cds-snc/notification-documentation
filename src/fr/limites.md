# Limites

## Limites d’appels à l’API

Vous êtes limité à envoyer 1 000 requêtes HTTP par minute.

Cette limite est calculée sur une base continue, par type de clé API. Si vous dépassez la limite, vous obtiendrez une erreur `429` `RateLimitError`.

::: tip Ajuster la limite d’appels à l’API

Cette limite peut être modifiée en fonction de vos besoins. Pour demander une augmentation de la limite, [communiquez avec nous](https://notification.canada.ca/contact?lang=fr).

:::

## Limites quotidiennes

Il y a une limite au nombre de messages que vous pouvez envoyer chaque jour :

|État du service|Type de clé d’API|Limite quotidienne|
|:---|:---|:---|
|Activé|Équipe ou activé|10 000|
|En mode d’essai|Équipe|50|
|Activé ou en mode d'essai|Test|Illimité|

Ces limites sont réinitialisées à minuit UTC. Tous les membres de votre service recevront un courriel si vous atteignez 80% de votre limite quotidienne et si votre limite quotidienne est atteinte.

Vous pouvez activer votre service dans les paramètres.

::: tip Ajuster la limite quotidienne

Votre limite d’envoi quotdienne peut être modifiée en fonction de vos besoins. Pour demander une augmentation de la limite, [communiquez avec nous](https://notification.canada.ca/contact?lang=fr).

:::

## Limites du réseau téléphonique

Si vous envoyez plusieurs fois des messages texte au même numéro, les réseaux téléphoniques les bloqueront.

Il y a une limite horaire de :

- 20 messages avec le même contenu
- 100 messages avec tout contenu

Vos messages peuvent ne pas être livrés si vous dépassez ces limites.
