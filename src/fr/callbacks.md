# Fonctions de rappel

Une fonction de rappel vous permet de recevoir des messages de GC Notification à une adresse URL de votre choix. Les rappels sont lorsque GC Notification envoie des requêtes HTTP `POST` à votre service. Vous pouvez obtenir des rappels lorsqu'un courriel ou un message texte que vous avez envoyé est livré ou échoue.

Vous devrez fournir un jeton `Bearer`, pour des raisons de sécurité. Nous ajouterons ceci à l’en-tête d’autorisation de la demande de rappel.

## Configurer des fonctions de rappel

Vous devez fournir :

- une adresse URL de destination vers laquelle GC Notification effectuera une requête HTTP
- un jeton `Bearer`, pour des raisons de sécurité, que GC Notification placera dans l’en-tête d’autorisation des demandes

Pour ce faire :

1. [Connectez-vous à GC Notification](https://notification.canada.ca/sign-in?lang=fr).
1. Allez à la page __Intégration API__.
1. Sélectionnez __Fonctions de rappel__.

Lors de la création d’un jeton `Bearer`, vous devez :

- garder votre jeton `Bearer` sécurisé
- le changer si vous avez une raison de penser qu’on ne peut plus lui faire confiance
- Assurez-vous que les fonctions de rappel que vous recevez de GC Notification contiennent votre jeton `Bearer` dans l’en-tête `Authorisation`
- utiliser une valeur hachée pour que GC Notification ne contienne pas le vrai jeton

## Accusés de réception de message

Lorsque vous envoyez un courriel ou un message texte, GC Notification envoie un accusé de réception à votre adresse URL de rappel pour vous dire s’il a été livré ou non. Il s’agit d’une méthode automatisée pour obtenir l’état des messages.

Cette fonctionnalité fonctionne avec les clés API de test, mais ne fonctionne pas avec les adresses de courriel ou les numéros de téléphone de test de détection de fumée.

Le message de la fonction de rappel est formaté en JSON. Toutes les valeurs sont des chaînes de caractères. Voici la clé, la description et le format des arguments du message de la fonction de rappel :

|Clé | Description | Format|
|:---|:---|:---|
|`id` | ID de GC Notification pour les accusés d’état  | UUID|
|`reference` | Référence envoyée par le service | 12345678|
|`to` | L’adresse de courriel ou numéro de téléphone du destinataire | hello@gov.uk ou 07700912345|
|`status` | État de la notification | `delivered`, `permanent-failure`, `temporary-failure` ou `technical-failure`|
|`created_at` | Heure à laquelle le service a envoyé la demande | `2017-05-14T12:15:30.000000Z`|
|`completed_at` | Dernière mise à jour de l’état | `2017-05-14T12:15:30.000000Z` ou nul|
|`sent_at` | Heure d’envoi de la notification | `2017-05-14T12:15:30.000000Z` ou nul|
|`notification_type` | Type de notification | `email` ou `sms`|
