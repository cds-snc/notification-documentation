# Envoyer un message

Vous pouvez utiliser Notification GC pour envoyer des courriels et des messages texte. Il peut s’agir d’une réponse à un événement généré par l’utilisateur, comme un reçu après qu’ils demandent votre service, ou comme un rappel lorsqu’un paiement est attendu.

**Ce dont vous aurez besoin :**

Pour envoyer un message à l’aide de Notification GC, vous devez configurer un gabarit dans l’interface utilisateur. 

Pour créer un gabarit :

1. [Connectez-vous à Notification GC](https://notification.canada.ca/sign-in?lang=fr).
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

### Corps de la requête
```json
{
  "email_address": "expéditeur@quelquechose.com",
  "template_id": "f33517ff-2a88-4f6e-b855-c550268ce08a"
}
```

### Paramètres

**Adresse courriel (obligatoire)**

`email_address` est l'adresse de courriel du destinataire.

<Content :page-key="$site.pages.find(p => p.relativePath === 'fr/_arg_template_id.md').key"/>


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

1. [Connectez-vous à Notification GC](https://notification.canada.ca/sign-in?lang=fr).
1. Accédez à la page __Paramètres__.
1. Dans la section __Courriel__, sélectionnez __Configurer__ à la ligne __Adresses courriel de réponse__.
1. Sélectionnez __Ajouter une adresse courriel de réponse__.
1. Entrez l’adresse de courriel que vous souhaitez utiliser, puis sélectionnez __Ajouter__. 

Par exemple :

```json
"email_reply_to_id": "8e222534-7f05-4972-86e3-17c5d9f894e2"
```

Vous pouvez ignorer cet argument si votre service n’a qu’une seule adresse de courriel de réponse ou si vous voulez utiliser l’adresse de courriel par défaut.

## L’envoi de fichiers par courriel est une fonctionnalité unique à l’API

Pour activer cette fonctionnalité, [connectez-vous à Notification GC](https://notification.canada.ca/sign-in?lang=fr) et accédez à la section __Paramètres__.

### Types de fichiers

Vous pouvez téléverser des fichiers aux formats .pdf, .csv, .jpeg, .png, .odt, .txt, .rtf, Microsoft Excel et Microsoft Word. Si vous avez besoin d’envoyer des fichiers de formats différents, veuillez nous contacter.

### Nombre de fichiers et volume des fichiers

Notification GC impose une limite de dix pièces jointes par notification courriel.

Le volume du courriel, pièces jointes comprises, ne peut excéder 6 Mo.

### Vous pouvez envoyer vos fichiers de deux façons différentes

1. En les joignant directement au courriel (pièce jointe)
1. Sous la forme d’un lien unique permettant un téléchargement depuis le courriel (lien)

Vous avez le choix de la méthode d’envoi pour chaque appel d’API.

### L’envoi sous forme de pièce jointe est généralement préférable

Si vous optez pour un envoi sous forme de lien, Notification GC devra chiffrer et stocker le fichier. Nous supprimons les fichiers correspondants au bout de sept jours pour des raisons de confidentialité. Les destinataires qui cliqueraient sur le lien après cette période se verraient indiquer une erreur 404, ce qui signifie que le fichier est introuvable.

À l’inverse, l’accès aux pièces jointes n’est pas limité dans le temps, à condition que le fournisseur de courriel des destinataires le permette. Il est également possible que les destinataires aient davantage l’habitude de recevoir des fichiers sous la forme de pièces jointes.

### Dans certaines situations, l’envoi sous forme de lien peut présenter des avantages

Certains fournisseurs de courriel et certaines règles de sécurité représentent des obstacles à l’envoi de pièces jointes. Il se peut par exemple que les ministères du gouvernement interdisent les pièces jointes dans le cadre de la communication interne.  

Avant de choisir votre méthode d’envoi, effectuez des tests afin de vérifier quelle méthode se prête le mieux à votre cas. Vous pouvez également [nous contacter](https://notification.canada.ca/contact?lang=fr).

### Téléverser votre fichier

Pour téléverser des fichiers, passez un dictionnaire de paramètres dans la clé `personalisation`. Renseignez ce paramètre dans la clé associée à votre champ réservé dans votre gabarit, ou utilisez un nom de votre choix.

Vous devrez renseigner :

- `file` : convertissez votre fichier en chaîne de caractères encodée en base64. Exemple : `Q2FuYWRh` (`Canada` encodé en base64)
- `filename` : le nom de votre fichier que vous envoyez. Exemple : `nom_service_nom_personne.pdf`
- `sending_method` : la méthode d’envoi pour ce fichier. Indiquez soit `attach` pour la méthode d’envoi par pièce jointe ou `link` pour la méthode d’envoi par lien unique

#### Si vous envoyez des fichiers en tant que pièces jointes

Spécifiez `attach` en tant que `sending_method`.

Par exemple :

**Gabarit**
```
Bonjour ((nom)),

Nous avons reçu vos document le ((date)).

Vous trouverez votre demande en pièce jointe.
```

**Paramètres HTTP**
```json
"personalisation": {
  "nom": "Amala",
  "date": "2018-01-01",
  "fichier": {
    "file": "fichier encodé en base64",
    "filename": "votre_nom_de_fichier.pdf",
    "sending_method": "attach"
  }
}
```

#### Si vous envoyez des fichiers en tant que liens uniques

1. Ajouter un espace réservé dans votre gabarit
1. Envoyez des requêtes HTTP, spécifiez `link` en tant que `sending_method`

**Ajouter un espace réservé au gabarit**

1. [Connectez-vous à Notification GC](https://notification.canada.ca/sign-in?lang=fr).
1. Accédez à la page __Gabarits__ et sélectionnez le gabarit de courriel approprié.
1. Sélectionnez __Modifier__.
1. Ajoutez un espace réservé au gabarit de courriel à l’aide de parenthèses doubles. Par exemple : `((lien_vers_fichier))`

```
Vous pouvez télécharger [votre document](((lien_vers_fichier))).
```

Par exemple :

**Gabarit**
```
Bonjour ((nom)),

Nous avons reçu vos document le ((date)).

Vous pouvez télécharger [votre document](((lien_vers_fichier))).
```

**Paramètres HTTP**
```json
"personalisation": {
  "nom": "Amala",
  "date": "2018-01-01",
  "lien_vers_fichier": {
    "file": "fichier encodé en base64",
    "filename": "votre_nom_de_fichier.pdf",
    "sending_method": "link"
  }
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

Si la demande a été refusée, le corps de la réponse est `json`. Consultez le tableau ci-dessous pour plus de détails.

|status_code|message|Comment réparer|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient using a team-only API key"`<br>`}]`|Utiliser le bon type de [clé API](cles.md)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient when service is in trial mode`<br>`}]`|Votre service ne peut pas envoyer cette notification en mode d’essai. Activez votre service dans les paramètres.|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Unsupported file type '(FILE TYPE)'. Supported types are: '(ALLOWED TYPES)"`<br>`}]`|Mauvais type de fichier. Vous ne pouvez télécharger que des fichiers .pdf, .csv, .txt, .jpeg, .png, .doc, .docx, .xls, .xlsx, .rtf ou .odt|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "File did not pass the virus scan"`<br>`}]`|Le fichier contient un virus|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "sending_method is a required property"`<br>`}]`|Indiquer soit `attach` pour une pièce jointe ou `link` pour un lien unique comme méthode d'envoi|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "filename is a required property"`<br>`}]`|Précisez le nom du fichier que vous envoyez|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "personalisation (key) is not one of [attach, link]"`<br>`}]`|La méthode d'envoi précisée doit être soit `attach` pour une pièce jointe ou `link` pour un lien unique|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "(key) : Incorrect padding : Error decoding base64 field"`<br>`}]`|Le fichier doit être converti en une chaîne de caractères encodée en base64|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "filename is too short"`<br>`}]`|Le nom du fichier doit comporter au moins 3 caractères|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "filename is too long"`<br>`}]`|Le nom du fichier doit comporter moins de 250 caractères|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Error: Your system clock must be accurate to within 30 seconds"`<br>`}]`|Vérifiez votre horloge système|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Invalid token: API key not found"`<br>`}]`|Utilisez la bonne [clé API](cles.md)|
|`429`|`[{`<br>`"error": "RateLimitError",`<br>`"message": "Exceeded rate limit for key type TEAM/TEST/LIVE of 1000 requests per 60 seconds"`<br>`}]`|Reportez-vous à [Débits maximaux API](limites.md) pour plus de renseignements|
|`429`|`[{`<br>`"error": "TooManyRequestsError",`<br>`"message": "Exceeded send limits (LIMIT NUMBER) for today"`<br>`}]`|Reportez-vous à [limites du service](limites.md) pour le nombre maximal|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n’a pas pu traiter la demande, renvoyez votre notification.|

## Envoyer un message texte

```
POST /v2/notifications/sms
```

### Corps de la requête

```json
{
  "phone_number": "+19021234567",
  "template_id": "f33517ff-2a88-4f6e-b855-c550268ce08a"
}
```

### Paramètres

**Numéro de téléphone (obligatoire)**

`phone_number` est le numéro de téléphone du destinataire du message texte.

<Content :page-key="$site.pages.find(p => p.relativePath === 'fr/_arg_template_id.md').key"/>

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

1. [Connectez-vous à Notification GC](https://notification.canada.ca/sign-in?lang=fr).
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
  "uri": "https://api.notification.canada.ca/v2/notifications/740e5834-3a29-46b4-9a6f-16142fde533a",
  "template": {
    "id": "f33517ff-2a88-4f6e-b855-c550268ce08a",
    "version": 1,
    "uri": "https://api.notification.canada.ca/v2/template/ceb50d92-100d-4b8b-b559-14fa3b091cd"
  }
}
```

Si vous utilisez la [clé API de test](cles.md), tous vos messages reviendront avec le statut "livré".

Tous les messages envoyés à l’aide des clés équipe et liste de confiance ou active apparaîtront dans votre tableau de bord.

### Codes d’erreur

Si la demande a été refusée, le corps de la réponse est `json`, consultez le tableau ci-dessous pour plus de détails.

|status_code|message|Comment réparer|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient using a team-only API key"`<br>`}]`|Utiliser le bon type de [clé API](cles.md)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient when service is in trial mode"`<br>`}]`|Votre service ne peut pas envoyer cette notification en mode d’essai. Activez votre service dans les paramètres.|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Error: Your system clock must be accurate to within 30 seconds"`<br>`}]`|Vérifiez votre horloge système|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Jeton non valide : Clé API introuvable"`<br>`}]`|Utilisez la bonne [clé API](cles.md).|
|`429`|`[{`<br>`"error": "RateLimitError",`<br>`"message": "Exceeded rate limit for key type TEAM/TEST/LIVE of 1000 requests per 60 seconds"`<br>`}]`|Reportez-vous à [Débits maximaux API](limites.md) pour plus de renseignements|
|`429`|`[{`<br>`"error": "TooManyRequestsError",`<br>`"message": "Exceeded send limits (LIMIT NUMBER) for today"`<br>`}]`|Reportez-vous à [limites du service](limites.md) pour le nombre maximal|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n’a pas pu traiter la demande, renvoyez votre notification.|


## Envoyer des notifications de masse

```
POST /v2/notifications/bulk
```

Envoyer des notifications de masse, jusqu'à 50 000 destinataires à la fois, pour un gabarit unique. Vous pouvez programmer l'envoi de notifications jusqu'à 4 jours à l'avance.

### Corps de la requête

```json
{
  "name": "Nom de l'envoi de masse",
  "template_id": "f33517ff-2a88-4f6e-b855-c550268ce08a",
  "rows": [
    ["email address", "nom"],
    ["alice@example.com", "Alice"],
    ["bob@example.com", "Bob"]
  ],
  "scheduled_for": "2021-06-08T15:15:00", # chaîne facultative
  "reply_to_id": "f025b1a9-63af-43e8-b969-627bfe544bba" # chaîne facultative
}
```

### Paramètres

**nom (obligatoire)**

`name` est le nom de votre envoi de masse. Il est utilisé pour identifier votre envoi.

<Content :page-key="$site.pages.find(p => p.relativePath === 'fr/_arg_template_id.md').key"/>

**lignes (obligatoire)**

`rows` est une liste de listes. La première ligne est l'en-tête et doit comprendre au moins `email address` si vous envoyez un gabarit de courriel ou `phone number` si vous envoyez un gabarit de message texte. Les autres colonnes doivent correspondre aux champs réservés pour des renseignements personnalisés de votre gabarit.

Les lignes suivantes doivent inclure les informations de vos destinataires et doivent correspondre à l'ordre des colonnes de l'en-tête. Vous pouvez avoir entre 1 et 50 000 destinataires.

#### Paramètres optionnels

**envoi programmé (optionnel)**

`scheduled_for` peut être renseigné si vous souhaitez envoyer des notifications dans le futur, vous pouvez spécifier une date et une heure jusqu'à 4 jours dans le futur au [format ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601). Par exemple : `2021-06-08T15:15:00` (heure UTC).

**identifiant de l'expéditeur (optionnel)**

`reply_to_id` peut être renseigné si vous souhaitez utiliser une adresse de courriel pour recevoir les réponses spécifiques, vous pouvez indiquer indiquer l'identifiant de l'adresse courriel de réponse. 

Pour trouver l'identifiant de votre addresse courriel de réponse :

1. [Connectez-vous à Notification GC](https://notification.canada.ca/sign-in?lang=fr).
1. Allez dans la page __Paramètres__.
1. Dans la section __Courriel__, sélectionnez __Adresses courriel de réponse__
1. Copiez l'identifiant de l'adresse que vous souhaitez utiliser

Par défaut, Notification GC utilisera votre adresse de courriel de réponse par défaut si vous n'en spécifiez pas, ou aucune si vous n'avez pas configuré cette fonctionnalité.

**csv (optionnel)**

`csv` peut être renseigné si vous préférez passer le contenu d'un fichier CSV plutôt que des lignes dans le paramètre `rows`. Passez le contenu complet de votre fichier CSV dans une clé nommée `csv`. Ne passez pas le paramètre `rows`.

Par exemple :

```json
{
  "name": "Nom de l'envoi de masse",
  "template_id": "f33517ff-2a88-4f6e-b855-c550268ce08a",
  "csv": "email address,nom\nalice@example.com,Alice"
}
```


### Réponse

::: warning Délai d'attente de la réponse

Si vous spécifiez un délai d'attente de la réponse lors de votre appel HTTP, assurez-vous qu'il soit défini à 15 secondes. L'API Notification GC pourrait prendre quelques secondes pour valider votre requête et sauvegarder vos paramètres si votre envoi de masse comporte beaucoup de destinataires.

:::

Si la demande est acceptée, le corps de la réponse est `json` avec un code de statut de `201` :

```json
{
   "data":{
      "api_key":{
         "id":"de1fafa2-fb2a-49c5-9b9a-8400727ecd29",
         "key_type":"team",
         "name":"Clé test"
      },
      "archived":false,
      "created_at":"2021-06-10T17:14:15.341308+00:00",
      "created_by":{
         "id":"6af522d0-2915-4e52-83a3-3690455a5fe6",
         "name":"Notify service user"
      },
      "id":"0ea216ae-4b03-46b7-ab44-893ae85104f5",
      "job_status":"pending",
      "notification_count":3,
      "original_file_name":"Nom de l'envoi de masse",
      "processing_finished":null,
      "processing_started":null,
      "scheduled_for":null,
      "sender_id":"f025b1a9-63af-43e8-b969-627bfe544bba",
      "service":"afa2be3b-1250-430f-a70f-28a1a9d49dfa",
      "service_name":{
         "name":"Test service"
      },
      "template":"f33517ff-2a88-4f6e-b855-c550268ce08a",
      "template_version":4,
      "updated_at":null
   }
}
```

Vous pouvez suivre la progression de votre envoi de masse dans l'interface de Notification GC.

Si vous avez programmé votre envoi, vous pouvez l'annuler dans l'interface web.

### Codes d’erreur

Si la demande a été refusée, le corps de la réponse est `json`, consultez le tableau ci-dessous pour plus de détails.

|Code HTTP|message|Comment réparer|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "You should specify either rows or csv"`<br>`}]`|Passez les données au moyen de `rows` ou `csv`|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "name is a required property"`<br>`}]`|Spécifiez le paramètre `name`|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "scheduled_for 42 is not of type string, null"`<br>`}]`|Vérifiez que vous passez une [date au format ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "scheduled_for datetime cannot be in the past"`<br>`}]`|Vérifiez que vous passez une date future|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "scheduled_for datetime can only be up to 96 hours in the future"`<br>`}]`|Vérifiez que votre date est au plus 4 jours dans le futur|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "scheduled_for datetime format is invalid. It must be a valid ISO8601 date time format, https://en.wikipedia.org/wiki/ISO_8601"`<br>`}]`|Vérifiez que vous passez une [date au format ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Template not found"`<br>`}]`|Mettez à jour l'identifiant de gabarit|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Template has been deleted"`<br>`}]`|Créez un nouveau gabarit et renseignez son identifiant|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Service is not allowed to send emails"`<br>`}]`|Activez l'envoi de courriels dans les Paramètres|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Missing column headers: name"`<br>`}]`|Ajoutez l'en-tête manquant|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Duplicate column headers: name, NAME"`<br>`}]`|Retirez l'en-tête en doublon|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Too many rows. Maximum number of rows allowed is 50000"`<br>`}]`|Renseignez moins de 50 000 lignes|
|`400`|`[{`<br>`{"error": "BadRequestError",`<br>`"message": "You cannot send to these recipients because you used a team and safelist API key."`<br>`}]`|Demandez d'activer votre service dans les Paramètres ou utilisez une [clé d'API active](cles.md)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "You cannot send to these recipients because your service is in trial mode. You can only send to members of your team and your safelist."`<br>`}]`|Ajoutez des membres à votre équipe, mettez à jour votre liste de confiance ou demandez d'activer votre service|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "You only have 50 remaining messages before you reach your daily limit. You've tried to send 75 messages."`<br>`}]`|Retirez les lignes en surplus, essayez à nouveau demain ou demander une augmentation de limites|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Some rows have errors. Row 1 - name: Missing. Row 2 - email address: invalid recipient. Row 3 - name: Missing. Row 4 - name: Missing."`<br>`}]`|Assurez-vous que les lignes n'ont pas de valeurs manquantes|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n’a pas pu traiter la demande. Renvoyez votre notification.|
