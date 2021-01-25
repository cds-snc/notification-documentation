# Envoyer un message

Vous pouvez utiliser GC Notification pour envoyer des courriels et des messages texte. Il peut s’agir d’une réponse à un événement généré par l’utilisateur, comme un reçu après qu’ils demandent votre service, ou comme un rappel lorsqu’un paiement est attendu.

**Ce dont vous aurez besoin :**

Pour envoyer un message à l’aide de GC Notification, vous devez configurer un gabarit dans l’interface utilisateur. 

Pour créer un gabarit :

1. [Connectez-vous à GC Notification](https://notification.canada.ca/sign-in?lang=fr).
1. Accédez à la page __Gabarits__.
1. Sélectionnez __Nouveau gabarit__.

Une fois le gabarit prêt, recherchez l’ID de gabarit associé. Vous aurez besoin de cet ID pour indiquer le gabarit que vous voulez utiliser lorsque vous appelez l’API.

Votre appel à l'API doit également inclure tous les champs qui ont été configurés comme des personnalisations. La personnalisation vous permet de modifier ce qui apparaît dans un message précis lors de son envoi. Vous pouvez utiliser la personnalisation pour :

- Vous adresser à un utilisateur par son nom
- Fournir aux utilisateurs un lien précis sur lequel cliquer
- Envoyer un numéro de transaction unique comme suivi
- Donner aux utilisateurs une liste dynamique des mesures qu’ils doivent prendre

## Envoyer un courriel

```
POST /v2/notifications/email
```

### Corps de la demande
```json
{
  "email_address": "expéditeur@quelquechose.com",
  "template_id": "f33517ff-2a88-4f6e-b855-c550268ce08a"
}
```

### Arguments

**Adresse courriel (obligatoire)**

`email_address` est l'adresse de courriel du destinataire.

**ID du gabarit (obligatoire)**

Pour rechercher `template_id` (ID du gabarit) :

1. [Connectez-vous à GC Notification](https://notification.canada.ca/sign-in?lang=fr).
1. Accédez à la page __Gabarits__ et sélectionnez le gabarit approprié.
1. Sélectionnez __Copier template ID dans le presse-pappier__.

**Personnalisation (facultatif)**

Utilisez `personalisation` si un gabarit comporte des champs réservés pour des renseignements personnalisés comme le nom ou le numéro de référence, vous devez fournir leurs valeurs dans un dictionnaire avec des paires de valeurs clés. Par exemple :

```json
"personalisation": {
  "first_name": "Amala",
  "application_date": "2018-01-01"
}
```
Vous pouvez ignorer cet argument si un gabarit ne comporte pas de champs réservés pour les renseignements personnalisés.

**Référence (facultatif)**

`reference` est un identificateur que vous pouvez créer au besoin. Cette référence identifie une seule notification ou un lot de notifications. Il ne doit contenir aucun renseignement personnel comme le nom ou l’adresse postale. Par exemple :

```json
"reference": "STRING"
```
Vous pouvez ignorer cet argument si vous n’avez pas de référence.

**ID de l'adresse courriel de réponse (facultatif)**

`email_reply_to_id` est une adresse de courriel que vous avez indiquée pour recevoir les réponses de vos utilisateurs. Vous devez ajouter au moins une adresse de courriel de réponse avant que votre service puisse être activé.

Pour ajouter une adresse de courriel de réponse :

1. [Connectez-vous à GC Notification](https://notification.canada.ca/sign-in?lang=fr).
1. Accédez à la page __Paramètres__.
1. Dans la section __Courriel__, sélectionnez __Configurer__ à la ligne __Adresses courriel de réponse__.
1. Sélectionnez __Ajouter une adresse courriel de réponse__.
1. Entrez l’adresse de courriel que vous souhaitez utiliser, puis sélectionnez __Ajouter__. 

Par exemple :

```json
"email_reply_to_id": "8e222534-7f05-4972-86e3-17c5d9f894e2"
```

Vous pouvez ignorer cet argument si votre service n’a qu’une seule adresse de courriel de réponse ou si vous voulez utiliser l’adresse de courriel par défaut.

## Envoyer un fichier par courriel

Pour activer cette fonctionnalité, [communiquez avec nous](https://notification.canada.ca/contact?lang=fr).

Pour envoyer un fichier par courriel, vous aurez à ajoutez un espace réservé au gabarit, puis téléversez un fichier. L’espace réservé contient un lien sécurisé pour téléverser le fichier.

Les liens sont uniques et impossibles à deviner. GC Notification ne peut pas accéder votre fichier ou le déchiffrer.

### Ajouter les coordonnées à la page de téléchargement du fichier

Pour activer cette fonctionnalité, [communiquez avec nous](http://notification.canada.ca/contact?lang=fr).

### Ajouter un espace réservé au gabarit

1. [Connectez-vous à GC Notification](https://notification.canada.ca/sign-in?lang=fr).
1. Accédez à la page __Gabarits__ et sélectionnez le gabarit de courriel approprié.
1. Sélectionnez __Modifier__.
1. Ajoutez un espace réservé au gabarit de courriel à l’aide de parenthèses doubles. Par exemple :

"Téléchargez votre fichier à : ((link_to_file))"

### Téléverser votre fichier

Vous pouvez téléverser des fichiers PDF, CSV, .jpeg, .png, .odt, .txt, .rtf, et des fichiers Microsoft Excel et Microsoft Word. La taille de votre fichier doit être inférieure à 10 Mo. [Communiquez avec nous](https://notification.canada.ca/contact?lang=fr) si vous devez envoyer d’autres types de fichiers.
Vous devrez convertir le fichier en chaîne codée base64.

Passez la chaîne encodée dans un objet avec une clé `file`, et mettez-la dans l’argument de personnalisation. Par exemple :

```json
"personalisation":{
  "first_name": "Amala",
  "application_date": "2018-01-01",
  "link_to_file": {"file": "file as base64 encoded string"}
}
```

**Fichiers CSV**

Les téléchargements pour les fichiers CSV doivent définir l’indicateur `is_csv` comme `true` pour s’assurer qu’il est téléchargé en tant que fichier .csv. Par exemple :

```json
"personalisation":{
  "first_name": "Amala",
  "application_date": "2018-01-01",
  "link_to_file": {"file": "CSV file as base64 encoded string", "is_csv": true}
}
```

### Réponse

Si la demande au client est acceptée, le client renvoie un `dict` :

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "reference": "STRING",
  "content": {
    "subject": "TEXTE DE L’OBJET",
    "body" : "TEXTE DU MESSAGE",
    "from_email" : "ADRESSE DE COURRIEL DE L’EXPÉDITEUR"
  },
  "uri": "https://api.notification.canada.ca/v2/notifications/740e5834-3a29-46b4-9a6f-16142fde533a",
  "template": {
    "id": "f33517ff-2a88-4f6e-b855-c550268ce08a",
    "version": 1,
    "uri": "https://api.notification.canada.ca/v2/template/f33517ff-2a88-4f6e-b855-c550268ce08a"
  }
}
```

### Codes d’erreur

Si la demande a été refusée, le corps de la réponse est “json”, consultez le tableau ci-dessous pour plus de détails.

|status_code|message|Comment réparer|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient using a team-only API key"`<br>`}]`|Utiliser le bon type de [clé API](keys.md)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient when service is in trial mode`<br>`}]`|Votre service ne peut pas envoyer cette notification en mode d’essai|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Unsupported file type '(FILE TYPE)'. Supported types are: '(ALLOWED TYPES)"`<br>`}]`|Mauvais type de fichier. Vous ne pouvez télécharger que des fichiers .pdf, .csv, .txt, .jpeg, .png, .doc, .docx, .xls, .xlsx, .rtf ou .odt|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "File did not pass the virus scan"`<br>`}]`|Le fichier contient un virus|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Send files by email has not been set up - add contact details for your service"`<br>`}]`|Voir comment ajouter les coordonnées à la page de téléchargement de fichier|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Error: Your system clock must be accurate to within 30 seconds"`<br>`}]`|Vérifiez votre horloge système|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Invalid token: API key not found"`<br>`}]`|Utilisez la bonne [clé API](keys.md)|
|`429`|`[{`<br>`"error": "RateLimitError",`<br>`"message": "Exceeded rate limit for key type TEAM/TEST/LIVE of 3000 requests per 60 seconds"`<br>`}]`|Reportez-vous à [Débits maximaux API](limits.md) pour plus de renseignements|
|`429`|`[{`<br>`"error": "TooManyRequestsError",`<br>`"message": "Exceeded send limits (LIMIT NUMBER) for today"`<br>`}]`|Reportez-vous à [limites du service](limits.md) pour le nombre maximal|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notification n’a pas pu traiter la demande, renvoyez votre notification.|

## Envoyer un message texte

```
POST /v2/notifications/sms
```

### Corps de la demande

```json
{
  "phone_number": "+19021234567",
  "template_id": "f33517ff-2a88-4f6e-b855-c550268ce08a"
}
 ```

### Arguments

**Numéro de téléphone (obligatoire)**

`phone_number` est le numéro de téléphone du destinataire du message texte.

**ID du gabarit (obligatoire)**

Pour rechercher `template_id` (l’ID du gabarit) :

1. [Connectez-vous à GC Notification](https://notification.canada.ca/sign-in?lang=fr).
1. Accédez à la page __Gabarits__ et sélectionnez le gabarit approprié.
1. Sélectionnez __Copier template ID dans le presse-pappier__.

**Personnalisation (facultatif)**

Utilisez `personalisation` si un gabarit comporte des champs réservés pour des renseignements personnalisés comme le nom ou le numéro de référence, vous devez fournir leurs valeurs dans un dictionnaire avec des paires de valeurs clés. Par exemple :

```json
"personalisation": {
  "first_name": "Amala",
  "application_date": "2018-01-01"
}
```

Vous pouvez ignorer cet argument si un gabarit ne comporte pas de champs réservés pour les renseignements personnalisés.

**Référence (facultatif)**

`reference` est un identificateur que vous pouvez créer au besoin. Cette référence identifie une seule notification ou un lot de notifications. Il ne doit contenir aucun renseignement personnel comme le nom ou l’adresse postale. Par exemple :

```json
"reference": "STRING"
```

Vous pouvez ignorer cet argument si vous n’avez pas de référence.

**Expéditeur du message texte (facultatif)**

`sms_sender_id` est un identificateur unique de l’expéditeur de la notification par message texte.

Pour rechercher l’expéditeur du message texte :

1. [Connectez-vous à GC Notification](https://notification.canada.ca/sign-in?lang=fr).
1. Accédez à la page __Paramètres__.
1. Dans la section __Messages texte__, sélectionnez __Configurer__ à la ligne __Expéditeurs de messages texte__.

Ensuite, vous pouvez soit :

- copier l’ID de l’expéditeur que vous souhaitez utiliser et le coller dans la méthode
- sélectionner __Modifier__ pour modifier l’expéditeur par défaut que le service utilisera, et sélectionnez __Enregistrer__.

```json
"sms_sender_id": "8e222534-7f05-4972-86e3-17c5d9f894e2"
```

Vous pouvez ignorer cet argument si votre service n’a qu’un seul expéditeur de message texte, ou si vous voulez utiliser l’expéditeur par défaut.

### Réponse

Si la demande est acceptée, le corps de la réponse est `json` avec un code de statut de `201` :

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "reference": "STRING",
  "content": {
    "body" : "TEXTE DU MESSAGE",
    "from_number": "EXPÉDITEUR"
  },
  "uri": "https://api.notifications.service.gov.uk/v2/notifications/740e5834-3a29-46b4-9a6f-16142fde533a",
  "template": {
    "id": "f33517ff-2a88-4f6e-b855-c550268ce08a",
    "version": 1,
    "uri": "https://api.notifications.service.gov.uk/v2/template/ceb50d92-100d-4b8b-b559-14fa3b091cd"
  }
}
```

Si vous utilisez la [clé API de test](keys.md), tous vos messages reviendront avec le statut "livré".

Tous les messages envoyés à l’aide des clés équipe et liste de confiance ou en fonction apparaîtront dans votre tableau de bord.

### Codes d’erreur

Si la demande a été refusée, le corps de la réponse est `json`, consultez le tableau ci-dessous pour plus de détails.

|status_code|message|Comment réparer|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient using a team-only API key"`<br>`}]`|Utiliser le bon type de [clé API](keys.md)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient when service is in trial mode"`<br>`}]`|Votre service ne peut pas envoyer cette notification en mode d’essai|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Error: Your system clock must be accurate to within 30 seconds"`<br>`}]`|Vérifiez votre horloge système|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Jeton non valide : Clé API introuvable"`<br>`}]`|Utilisez la bonne [clé API](keys.md).|
|`429`|`[{`<br>`"error": "RateLimitError",`<br>`"message": "Exceeded rate limit for key type TEAM/TEST/LIVE of 3000 requests per 60 seconds"`<br>`}]`|Reportez-vous à [Débits maximaux API](limits.md) pour plus de renseignements|
|`429`|`[{`<br>`"error": "TooManyRequestsError",`<br>`"message": "Exceeded send limits (LIMIT NUMBER) for today"`<br>`}]`|Reportez-vous à [limites du service](limits.md) pour le nombre maximal|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notification n’a pas pu traiter la demande, renvoyez votre notification.|
