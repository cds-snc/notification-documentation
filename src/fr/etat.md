# Obtenir l’état du message

Vous pouvez utiliser l’API Notification GC pour récupérer l’état d’un ou de plusieurs messages.

L’état du message dépend du type de message que vous avez envoyé.

Vous ne pouvez obtenir que l’état des messages qui ont été envoyés durant les 7 derniers jours.

## État du courriel

|Description de l'état|Renseignements|
|:---|:---|
|Créé|Notification GC a placé le message dans une file d’attente, prêt à être envoyé au fournisseur. Il ne doit rester dans cet état que quelques secondes.|
|Envoi en cours|Notification GC a envoyé le message au fournisseur. Le fournisseur essaiera d’envoyer le message au destinataire pendant une période maximale de 72 heures. Notification GC attend les renseignements de livraison.|
|En attente|Notification GC attend plus de renseignements sur la livraison.<br>Notification GC a reçu un rappel du fournisseur, mais l’appareil du destinataire n’a pas encore répondu. Un autre rappel du fournisseur détermine l’état final de la notification.|
|Livraison réussie|Le message a été livré avec succès.|
|Échec|Ce champ couvre tous les états d’échec : <br>- `permanent-failure` – "Le fournisseur n’a pas pu envoyer le message, car l’adresse de courriel était inexacte. Vous devez supprimer ces adresses de courriel de votre base de données."<br>- `temporary-failure` - "Le fournisseur n’a pas pu envoyer le message. Cela peut se produire lorsque la boîte de réception du destinataire est pleine. Vous pouvez essayer de renvoyer le message."<br>- `technical-failure` - "Votre message n’a pas été envoyé, car il y a un problème entre Notification GC et le fournisseur.<br>Vous devrez essayer de renvoyer vos messages."<br> `virus-scan-failed` "Notification GC n’a pas envoyé votre message, car un virus a été détecté dans vos pièces jointes. Veuillez vérifier ces dernières et réessayer."|

## État du message texte

|Description de l'état|Renseignements|
|:---|:---|
|Créé|Notification GC a placé le message dans une file d’attente, prêt à être envoyé au fournisseur. Il ne doit rester dans cet état que quelques secondes.|
|Envoi en cours|Notification GC a envoyé le message au fournisseur. Le fournisseur essaiera d’envoyer le message au destinataire pendant une période maximale de 72 heures. Notification GC attend les renseignements de livraison.|
|En attente|Notification GC attend plus de renseignements sur la livraison.<br>Notification GC a reçu un rappel du fournisseur, mais l’appareil du destinataire n’a pas encore répondu. Un autre rappel du fournisseur détermine l’état final de la notification.|
|Envoyé / Envoyé à l’international|Le message a été envoyé à un numéro international. Dans certains pays, les réseaux mobiles ne fournissent plus de renseignements sur la livraison. L’API client Notification GC renvoie cet état comme étant `sent`. L’application cliente Notification GC retourne cet état comme `Sent to an international number`.|
|Livraison réussie|Le message a été livré avec succès.|
|Échec|Ce champ couvre tous les états d’échec : <br>- `permanent-failure` – "Le fournisseur n’a pas pu envoyer le message. Cela peut se produire si le numéro de téléphone était inexact ou si l’opérateur réseau rejette le message. Si vous êtes certain que ces numéros de téléphone sont exacts, vous devriez [communiquer avec nous](https://notification.canada.ca/contact?lang=fr). Dans le cas contraire, vous devez les supprimer de votre base de données. Vous serez toujours facturé pour les messages texte qui ne peuvent pas être livrés."<br>- `temporary-failure` - "Le fournisseur n’a pas pu livrer le message. Cela peut se produire lorsque le téléphone du destinataire est éteint, qu’il n’a pas de signal ou que sa boîte de réception de message texte est pleine. Vous pouvez essayer de renvoyer le message. On vous facturera quand même les messages texte aux téléphones qui ne reçoivent pas de messages."<br>- `technical-failure` - "Votre message n’a pas été envoyé, car il y a un problème entre Notification GC et le fournisseur.<br>Vous devrez essayer de renvoyer vos messages. Vous ne serez pas facturé pour les messages texte touchés par une défaillance technique."|

## Obtenir l’état d’un message

Vous pouvez utiliser l’API de Notification GC pour obtenir un état de message unique.

```
GET /v2/notifications/{notification_id}
```

### Paramètres de requête

#### notification_id (obligatoire)

L’ID de la notification. Vous pouvez trouver l’ID de notification dans la réponse à l’appel de méthode de notification initiale.

Vous pouvez également le trouver en [vous connectant à Notification GC](https://notification.canada.ca/sign-in?lang=fr) et en accédant à la page __Integration API__.

### Réponse

Si la demande est acceptée, le corps de la réponse est `json` et le code d’état est `200` :

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a", # chaîne obligatoire – ID de notification
  "reference": "STRING", # chaîne facultative
  "email_address" : "expéditeur@quelquechose.com", # chaîne obligatoire pour les courriels
  "phone_number": "+447900900123",  # chaîne obligatoire pour les messages texte
  "type" : "email / sms", # chaîne obligatoire
  "status" : "created / sending / pending / delivered / permanent-failure / temporary-failure / technical-failure / pending-virus-check / virus-scan-failed", # chaîne obligatoire
  "status_description": "Envoi en cours / Envoi en cours  / Envoi en cours / Livraison réussie / [Message bloqué | Numéro inexistante | Adresse inexistant] / [Problème de contenu ou de boîte de réception | Problème du fournisseur] / Problème technique / Envoi en cours / Virus dans la pièce jointe", # chaîne obligatoire
  "provider_response": "STRING", # chaîne facultative - ne sera pas nulle si seulement le statut est une erreur technique
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

## Obtenir l’état d’un envoi de masse

Vous pouvez utiliser l’API Notification GC pour récupérer l’état et les statistiques des notifications d’un envoi de masse.

### Obtenir la liste des envois de masse

```
GET /v2/notifications/bulk
```

Ce point de terminaison retourne les envois de masse créés par le service associé à votre clé API, du plus récent au plus ancien. La réponse est paginée.

### Paramètres de requête

#### older_than (facultatif)

Utilisez l’identifiant d’un envoi de masse de la page précédente pour obtenir les envois plus anciens. L’adresse de la page suivante est retournée dans `links.next` lorsqu’une autre page est disponible. Vous pouvez utiliser directement cette adresse ou transmettre sa valeur `older_than` dans une nouvelle demande.

```json
"older_than": "684fca45-42d9-4cae-bf84-22a9f5fc9e6f"
```

### Réponse

Si la demande est acceptée, le corps de la réponse est en format `json` et le code d’état est `200` :

```json
{
  "bulk_jobs": [
    {
      "id": "684fca45-42d9-4cae-bf84-22a9f5fc9e6f",
      "original_file_name": "Nom de l’envoi de masse",
      "notification_count": 3,
      "template": "055d4e5c-27c2-4ea6-8736-d4c328279acf",
      "template_version": 4,
      "template_type": "email",
      "service": "f8ea1d5f-95db-4374-a6ad-5251a26173c8",
      "service_name": { "name": "Service de test" },
      "created_by": {
        "id": "6887e196-437f-4e3a-aaee-c152dc54c900",
        "name": "Utilisateur du service Notification"
      },
      "api_key": {
        "id": "0bc38ecd-8be3-4896-a3f3-fc8178a782d6",
        "name": "Test",
        "key_type": "team"
      },
      "job_status": "pending",
      "scheduled_for": null,
      "processing_started": null,
      "processing_finished": null,
      "created_at": "2021-06-10T17:14:15.341308+00:00",
      "updated_at": null,
      "archived": false,
      "sender_id": null,
      "statistics": [
        { "status": "delivered", "count": 2 },
        { "status": "failed", "count": 1 }
      ]
    }
  ],
  "links": {
    "current": "https://api.notification.canada.ca/v2/notifications/bulk",
    "next": "https://api.notification.canada.ca/v2/notifications/bulk?older_than=684fca45-42d9-4cae-bf84-22a9f5fc9e6f"
  }
}
```

`statistics` contient une entrée pour chaque état de notification et son nombre. Le tableau est vide lorsqu’aucune statistique n’est disponible.

### Obtenir un envoi de masse par son identifiant

```
GET /v2/notifications/bulk/{job_id}
```

Utilisez ce point de terminaison pour récupérer un envoi de masse et son état actuel. La réponse contient les mêmes champs que ceux du point de terminaison de la liste et est enveloppée dans un objet `data`.

#### job_id (obligatoire)

L’identifiant de l’envoi de masse. Vous le trouverez dans la réponse de `POST /v2/notifications/bulk` ou dans la réponse `bulk_jobs` du point de terminaison de la liste.

### Codes d’erreur

|status_code|message|Comment réparer|
|:---|:---|:---|
|`400`|Identifiant ou valeur `older_than` invalide|Vérifiez que la valeur est un UUID valide. L’envoi de masse indiqué par `older_than` doit appartenir à votre service.|
|`403`|`AuthError`|Utilisez la bonne [clé API](cles.md).|
|`404`|`JobNotFoundError`|Vérifiez l’identifiant de l’envoi de masse.|

## Obtenir l’état de plusieurs messages

Vous pouvez utiliser l’API de Notification GC pour rechercher simultanément l’état de plusieurs messages.

Cet appel d’API renvoie une page d’un maximum de 250 messages et états. Vous pouvez obtenir les messages les plus récents ou obtenir des messages plus anciens en indiquant un ID de notification particulier dans l’argument `older_than`.

Vous ne pouvez obtenir que l’état des messages qui ont été envoyés durant les 7 derniers jours.

```
GET /v2/notifications
```

#### Tous les messages

Cela retournera vos messages avec des états. Le type de clé API que vous utilisez pour effectuer des requêtes vers ce point de terminaison de l'API est important (c'est-à-dire Équipe, Test ou Active). Ce type sera assorti au type de clé API qui a créé vos messages. Si vous effectuez une requête avec une clé API Active, seuls les messages créés par des clés API Active seront renvoyés. Chaque page contiendra jusqu’à 250 messages.

Vous pouvez filtrer les messages retournés en incluant les arguments facultatifs suivants dans l’adresse URL :

- `template_type`
- `status`
- `reference`
- `older_than`
- `include_jobs`

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

#### Inclure les tâches (facultatif)

Si la valeur de l'argument `include_jobs` est `true`, la réponse inclura les notifications envoyées dans le cadre d'une tâche (envoi par lot). Par défaut, les notifications provenant de tâches ne sont pas incluses.

```
"include_jobs": "true"
```

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
      "status" : "created / in transit / pending / delivered / permanent-failure / temporary-failure / technical-failure / pending-virus-check / virus-scan-failed", # chaîne obligatoire
      "status_description": "Envoi en cours / Envoi en cours / Envoi en cours / Livraison réussie / [Message bloqué | Numéro inexistante | Adresse inexistant] / Problème de contenu ou de boîte de réception / Problème technique / Envoi en cours / Virus dans la pièce jointe", # chaîne obligatoire
      "provider_response": "STRING", # chaîne facultative - ne sera pas nulle si seulement le statut est une erreur technique
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
