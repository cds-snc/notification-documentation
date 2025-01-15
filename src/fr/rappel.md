# Fonctions de rappel

Les fonctions de rappels peuvent automatiser la production d'un accusé de réception ou maintenir l'état d'une notification dans votre base de données.

Une fonction de rappel vous permet de recevoir des messages sur l'état des notifications de Notification GC à une adresse URL de votre choix. Les rappels sont lorsque Notification GC envoie des requêtes HTTP `POST` à votre service. Vous pouvez obtenir des rappels lorsqu'un courriel ou un message texte que vous avez envoyé est livré ou échoue.

Vous devrez fournir un jeton `Bearer`, pour des raisons de sécurité. Nous ajouterons ceci à l’en-tête `Authorization` de la demande de rappel.

## Configurer des fonctions de rappel

Vous devez fournir :

- une adresse URL de destination vers laquelle Notification GC effectuera une requête HTTP
- un jeton `Bearer`, pour des raisons de sécurité, que Notification GC placera dans l’en-tête `Authorization` des demandes

Pour ce faire :

1. [Connectez-vous à Notification GC](https://notification.canada.ca/sign-in?lang=fr).
1. Allez à la page __Intégration API__.
1. Sélectionnez __Fonctions de rappel__.

Lors de la création d’un jeton `Bearer`, vous devez :

- garder votre jeton `Bearer` sécurisé
- le changer si vous avez une raison de penser qu’on ne peut plus lui faire confiance
- Assurez-vous que les fonctions de rappel que vous recevez de Notification GC contiennent votre jeton `Bearer` dans l’en-tête `Authorization`
- utiliser une valeur hachée pour que Notification GC ne contienne pas le vrai jeton

## Demandes de bilan de santé

Notification GC envoie des demandes de bilan de santé à l’URL que vous avez fournie afin de vérifier que nous pouvons joindre votre API et recevoir une réponse de sa part.

```json
{
    "health_check": "true"
}
```

Nous vous envoyons ces bilans de santé lorsque vous :

- configurez des rappels;
- mettez à jour une configuration de rappel; et
- testez le temps de réponse de votre service via la page des rappels.


:::tip Notification GC vous permet de tester le temps de réponse de votre API

Vous pouvez accéder à cette fonctionnalité directement depuis notre site Web. À partir du tableau de bord de votre service, rendez-vous dans la section « Intégration API » puis dans <span style="white-space: nowrap;">« Fonctions de rappel ».</span>

:::

## Maintenance de vos fonctions de rappel

Lorsque vous configurez les rappels d’API pour votre service Notification GC, vérifiez que votre API offre un temps de fonctionnement constant et peut répondre dans un délai d’une seconde. Il est important de :

- maintenir des journaux d’activité adéquats concernant votre API pour vous aider à diagnostiquer les problèmes;
- reconnaître les goulots d'étranglement au sein de votre code et de votre infrastructure et d’y remédier; et de
- surveiller et tester les temps de réponse de votre API.

## Tentatives d’envoi et suspensions

Notification GC continuera ses tentatives d’envoi jusqu’à ce qu’une fonction de rappel échoue 25 fois en 5 minutes. Après quoi, nous vous informerons par courriel qu’il y a un problème avec votre API.

::: warning Suspensions temporaires

Si Notification GC rencontre fréquemment des problèmes concernant l’envoi de rappels à votre API, nous pouvons suspendre temporairement ces envois pour votre service et vous envoyer un courriel détaillant les étapes à suivre pour mettre fin à la suspension.

:::

## Accusés de réception de message

Lorsque vous envoyez un courriel ou un message texte, Notification GC envoie un accusé de réception à votre adresse URL de rappel pour vous dire s’il a été livré ou non. Il s’agit d’une méthode automatisée pour obtenir l’état des messages.

Cette fonctionnalité fonctionne avec les clés API de test, mais ne fonctionne pas avec les adresses de courriel ou les numéros de téléphone de test de détection de fumée.

Le message de la fonction de rappel est formaté en JSON. Toutes les valeurs sont des chaînes de caractères. Voici la clé, la description et le format des arguments du message de la fonction de rappel :

|Clé | Description | Format de la chaîne|
|:---|:---|:---|
|`id` | ID de Notification GC pour les accusés d’état  | UUID|
|`reference` | Référence envoyée par le service | 12345678|
|`to` | L’adresse de courriel ou numéro de téléphone du destinataire | hello@canada.ca ou 01234567890|
|`status` | État de la notification | `created`, `sending`, `pending`, `sent`, `delivered`, `permanent-failure`, `temporary-failure`, `technical-failure`, `pending-virus-check` ou `virus-scan-failed`|
|`status_description` | (placeholder) Libellé de l'état de livraison de la notification | `Envoi en cours`, `Envoi en cours`, `Envoi en cours`, `Livraison réussie`, `[Message bloqué | Numéro inexistante | Adresse inexistant]`, `[Problème de contenu ou de boîte de réception | Problème du fournisseur]`, `Problème technique`, `Envoi en cours`, `Virus dans la pièce jointe`|
|`provider_response` | La réponse détaillée venant du fournisseur. Ceci sera renseigné uniquement lorsque l’état de la notification est une erreur technique | `Blocked as spam by phone carrier` (ou tout autre message) ou nul|
|`created_at` | Heure à laquelle le service a envoyé la demande | `2017-05-14T12:15:30.000000Z`|
|`completed_at` | Dernière mise à jour de l’état | `2017-05-14T12:15:30.000000Z` ou nul|
|`sent_at` | Heure d’envoi de la notification | `2017-05-14T12:15:30.000000Z` ou nul|
|`notification_type` | Type de notification | `email` ou `sms`|

::: warning Plusieurs fonctions de rappel pour une notification

Vous pouvez recevoir plusieurs fonctions de rappel pour une seule notification envoyée. Par exemple, il est possible que le serveur de messagerie destinataire accepte le courriel (envoyant une fonction de rappel de livraison réussie), mais après avoir traité le courriel, le serveur de messagerie peut déterminer qu’en réalité ce courriel retourne un échec (envoyant une fonction de rappel d’échec).

Les fonctions de rappel sont envoyées dans l’ordre où elles sont reçues.

:::
