# Obtenir l’état du message

Vous pouvez utiliser l’API GC Notification pour récupérer l’état d’un ou de plusieurs messages.

L’état du message dépend du type de message que vous avez envoyé.

Vous ne pouvez obtenir que l’état des messages qui ont été envoyés durant les 7 derniers jours. La retention des données peut être configurée pour être entre 3 et 90 jours, soit au niveau du service, soit au niveau de la notification.

## État du courriel

|État|Renseignements|
|:---|:---|
|Créé|GC Notification a placé le message dans une file d’attente, prêt à être envoyé au fournisseur. Il ne doit rester dans cet état que quelques secondes.|
|Envoi en cours|GC Notification a envoyé le message au fournisseur. Le fournisseur essaiera d’envoyer le message au destinataire pendant une période maximale de 72 heures. GC Notification attend les renseignements de livraison.|
|Livraison réussie|Le message a été livré avec succès.|
|Échec|Ce champ couvre tous les états d’échec : <br>- `permanent-failure` – "Le fournisseur n’a pas pu envoyer le message, car l’adresse de courriel était inexacte. Vous devez supprimer ces adresses de courriel de votre base de données."<br>- `temporary-failure` - "Le fournisseur n’a pas pu envoyer le message. Cela peut se produire lorsque la boîte de réception du destinataire est pleine. Vous pouvez essayer de renvoyer le message."<br>- `technical-failure` - "Votre message n’a pas été envoyé, car il y a un problème entre GC Notification et le fournisseur.<br>Vous devrez essayer de renvoyer vos messages."|

## État du message texte

|État|Renseignements|
|:---|:---|
|Créé|GC Notification a placé le message dans une file d’attente, prêt à être envoyé au fournisseur. Il ne doit rester dans cet état que quelques secondes.|
|Envoi en cours|GC Notification a envoyé le message au fournisseur. Le fournisseur essaiera d’envoyer le message au destinataire pendant une période maximale de 72 heures. GC Notification attend les renseignements de livraison.|
|En attente|GC Notification attend plus de renseignements sur la livraison.<br>GC Notification a reçu un rappel du fournisseur, mais l’appareil du destinataire n’a pas encore répondu. Un autre rappel du fournisseur détermine l’état final de la notification.|
|Envoyé / Envoyé à l’international|Le message a été envoyé à un numéro international. Dans certains pays, les réseaux mobiles ne fournissent plus de renseignements sur la livraison. L’API client GC Notification renvoie cet état comme étant `sent`. L’application cliente GC Notification retourne cet état comme `Sent to an international number`.|
|Livraison réussie|Le message a été livré avec succès.|
|Échec|Ce champ couvre tous les états d’échec : <br>- `permanent-failure` – "Le fournisseur n’a pas pu envoyer le message. Cela peut se produire si le numéro de téléphone était inexact ou si l’opérateur réseau rejette le message. Si vous êtes certain que ces numéros de téléphone sont exacts, vous devriez [communiquer avec nous](https://notification.canada.ca/contact?lang=fr). Dans le cas contraire, vous devez les supprimer de votre base de données. Vous serez toujours facturé pour les messages texte qui ne peuvent pas être livrés."<br>- `temporary-failure` - "Le fournisseur n’a pas pu livrer le message. Cela peut se produire lorsque le téléphone du destinataire est éteint, qu’il n’a pas de signal ou que sa boîte de réception de message texte est pleine. Vous pouvez essayer de renvoyer le message. On vous facturera quand même les messages texte aux téléphones qui ne reçoivent pas de messages."<br>- `technical-failure` - "Votre message n’a pas été envoyé, car il y a un problème entre GC Notification et le fournisseur.<br>Vous devrez essayer de renvoyer vos messages. Vous ne serez pas facturé pour les messages texte touchés par une défaillance technique."|

## Obtenir l’état d’un message

Vous pouvez utiliser l’API de GC Notification pour obtenir un état de message unique.

```
GET /v2/notifications/{notification_id}
```

### Paramètres de requête

#### notification_id (obligatoire)

L’ID de la notification. Vous pouvez trouver l’ID de notification dans la réponse à l’appel de méthode de notification initiale.

Vous pouvez également le trouver en [vous connectant à GC Notification](https://notification.canada.ca/sign-in?lang=fr) et en accédant à la page __Integration API__.

Vous pouvez filtrer les messages retournés en incluant les paramètres facultatifs suivants dans l’adresse URL :

- `template_type`
- `status`
- `reference`
- `older_than`

### Réponse

Si la demande est acceptée, le corps de la réponse est `json` et le code d’état est `200` :

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a", # chaîne obligatoire – ID de notification
  "reference": "STRING", # chaîne facultative
  "email_address" : "expéditeur@quelquechose.com", # chaîne obligatoire pour les courriels
  "phone_number": "+447900900123",  # chaîne obligatoire pour les messages texte
  "type" : "email / sms", # chaîne obligatoire
  "status" : "sending / delivered / permanent-failure / temporary-failure / technical-failure", # chaîne obligatoire
  "template": {
    "Version": 1
    "id": "f33517ff-2a88-4f6e-b855-c550268ce08a" # chaîne obligatoire – ID de modèle
    "uri": "/v2/template/{id}/{version}", # obligatoire
  },
  "body": "STRING", # chaîne obligatoire – corps de la notification
  "subject": "STRING" # chaîne obligatoire pour le courriel – objet du courriel
  "created_at": "STRING", # chaîne obligatoire – date et heure de création de la notification
  "created_by_name" : "STRING", # chaîne facultative – nom de la personne qui a envoyé la notification si elle est envoyée manuellement
  "sent_at": "STRING", # chaîne facultative – date et heure d’envoi de la notification au fournisseur
  "completed_at :" "STRING" # chaîne facultative – date et heure de remise ou d’échec de la notification
}
```

### Codes d’erreur

Si la demande a été refusée, le corps de la réponse est `json`, consultez le tableau ci-dessous pour plus de détails.

|status_code|message|Comment réparer|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "id is not a valid UUID"`<br>`}]`|Vérifiez l’ID de notification|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Error: Your system clock must be accurate to within 30 seconds"`<br>`}]`|Vérifiez votre horloge système|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Invalid token: API key not found"`<br>`}]`|Utilisez la bonne [clé API](cles.md)|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Vérifiez l’ID de notification|

## Obtenir l’état de plusieurs messages

Vous pouvez utiliser l’API de GC Notification pour rechercher simultanément l’état de plusieurs messages.

Cet appel d’API renvoie une page d’un maximum de 250 messages et états. Vous pouvez obtenir les messages les plus récents ou obtenir des messages plus anciens en indiquant un ID de notification particulier dans l’argument `older_than`.

Vous ne pouvez obtenir que l’état des messages qui ont été envoyés durant les 7 derniers jours. La retention des données peut être configurée pour être entre 3 et 90 jours, soit au niveau du service, soit au niveau de la notification.

```
GET /v2/notifications
```

#### Tous les messages

Cela retournera tous vos messages avec des états. Chaque page contiendra jusqu’à 250 messages.

Vous pouvez filtrer les messages retournés en incluant les arguments facultatifs suivants dans l’adresse URL :

- `template_type`
- `status`
- `reference`
- `older_than`

### Arguments

Vous pouvez omettre n’importe lequel de ces arguments pour ignorer ces filtres.

#### Type de gabarit (facultatif)

Si vous spécifiez le filtre `template_type`, vous pouvez filtrer par :

* `email`
* `sms`

### État (facultatif)

Si vous spécifiez le filtre `status`, vous pouvez filtrer par chaque :

* état du courriel
* état du message texte

Vous pouvez ignorer cet argument pour ignorer ce filtre.

#### Référence (facultatif)

Si vous spécifiez le filtre `reference`, vous pouvez filtrer les résultats par la valeur `reference`, un identificateur que vous pouvez créer au besoin lors de l'envoi des notifications. Cette référence identifie une seule notification ou un lot de notifications. Il ne doit contenir aucun renseignement personnel comme le nom ou l’adresse postale. Par exemple :

```json
"reference": "STRING"
```

#### Plus ancien que (facultatif)

Si vous spécifiez le filtre `older_than`, la méthode renvoie les 250 notifications reçues plus anciennes que l’ID de notification donné.

```
"older_than":"740e5834-3a29-46b4-9a6f-16142fde533a"
```

Si vous ignorez cet argument, la méthode renvoie les 250 notifications les plus récentes.

Le client ne retourne que les notifications envoyées lors des 7 derniers jours. Si la notification indiquée dans cet argument a été envoyée il y a plus de 7 jours, le client renvoie une réponse vide.

### Réponse

Si la demande est acceptée, le corps de la réponse est `json` et le code d’état est `200`.

#### Tous les messages

```json
{
  "notifications": [
    {
      "id": "740e5834-3a29-46b4-9a6f-16142fde533a", # chaîne obligatoire – ID de notification
      "référence": "STRING", # chaîne facultative – référence client
      "email_address" : "expéditeur@quelquechose.com", # chaîne obligatoire pour les courriels
      "phone_number": "+447900900123",  # chaîne obligatoire pour les messages texte
      "type" : "email / sms", # chaîne obligatoire
      "status" : "sending / delivered / permanent-failure / temporary-failure / technical-failure", # chaîne obligatoire
      "template": {
        "version": 1
        "id": 'f33517ff-2a88-4f6e-b855-c550268ce08a' # chaîne obligatoire – ID de modèle
        "uri": "/v2/template/{id}/{version}", # obligatoire
      },
      "body": "STRING", # chaîne obligatoire – corps de la notification
      "subject": "STRING" # chaîne obligatoire pour le courriel – objet du courriel
      "created_at": "STRING", # chaîne obligatoire – date et heure de création de la notification
      "created_by_name" : "STRING", # chaîne facultative – nom de la personne qui a envoyé la notification si elle est envoyée manuellement
      "sent_at": "STRING", # chaîne facultative – date et heure d’envoi de la notification au fournisseur
      "completed_at :" "STRING" # chaîne facultative – date et heure de livraison ou d’échec de la notification
    },
    …
  ],
  "links": {
    "current": "/notifications?template_type=sms&status=delivered",
    "next": "/notifications?other_than=last_id_in_list&template_type=sms&status=delivered"
  }
}
```

### Codes d’erreur

Si la demande a été refusée, le corps de la réponse est `json`, consultez le tableau ci-dessous pour plus de détails.

|status_code|message|Comment réparer|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "id is not a valid UUID"`<br>`}]`|Vérifiez l’ID de notification|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Error: Your system clock must be accurate to within 30 seconds"`<br>`}]`|Vérifiez votre horloge système|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Invalid token: API key not found"`<br>`}]`|Utilisez la bonne [clé API](cles.md)|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Vérifiez l’ID de notification|
