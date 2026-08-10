# Rapports

Vous pouvez utiliser Notification GC pour demander, obtenir la liste et télécharger des rapports de vos notifications à l'aide de l'API.

Les rapports sont générés de façon asynchrone. Après avoir demandé un rapport, interrogez-le via son ID jusqu'à ce que son statut soit `ready`, puis téléchargez son contenu.

## Ce dont vous aurez besoin

Les points de terminaison d'API pour les rapports exigent une clé API avec la permission `manage_reports`.

Pour les types de clés et leur gestion, consultez [Clés API](cles.md#types-de-cles).

## Limite d'appels

Vous pouvez demander un maximum de __10 rapports par heure, par service__. Cette limite s'applique uniquement au point de terminaison `POST /v2/reports`.

Si vous dépassez la limite, vous obtiendrez une erreur `429` `RateLimitExceeded` avec le message `Maximum 10 report requests per hour`.

## Demander un rapport

```
POST /v2/reports
```

### Corps de la requête

```json
{
  "report_type": "email",
  "language": "fr"
}
```

Pour demander un rapport pour un envoi en masse (bulk job), incluez `job_id` :

```json
{
  "report_type": "job",
  "language": "fr",
  "job_id": "b7a2f0c4-8e1d-4d3b-9c2a-2f5e6d7a8b9c"
}
```

### Paramètres

**report_type (obligatoire)**

Le type de rapport à générer. Valeurs permises :

- `sms` (message texte)
- `email` (courriel)
- `job` (envoi de masse)

**language (obligatoire)**

La langue du rapport. Valeurs permises :

- `en` (anglais)
- `fr` (français)

**job_id (obligatoire lorsque `report_type` est `job`)**

L'ID de l'envoi de masse pour lequel générer un rapport. Vous trouverez le `job_id` dans la réponse que vous recevez lorsque vous appelez le point de terminaison d'envoi de masse (bulk).

### Réponse

Si la requête réussit, le corps de la réponse est en `json` avec un code de statut `202` :

```json
{
  "report_id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "status": "requested"
}
```

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "report_type invalid is not one of [sms, email, job]"`<br>`}]`|Utilisez un `report_type` pris en charge : `sms`, `email` ou `job`|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "job_id is a required property"`<br>`}]`|Incluez `job_id` lorsque `report_type` est `job`|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage reports."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_reports`|
|`429`|`[{`<br>`"error": "RateLimitExceeded",`<br>`"message": "Maximum 10 report requests per hour"`<br>`}]`|Attendez avant de demander un autre rapport. Vous pouvez demander jusqu'à 10 rapports par heure|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n'a pas pu traiter la requête, renvoyez votre requête|

## Obtenir la liste des rapports

```
GET /v2/reports
```

### Paramètres de requête

**older_than (facultatif)**

Retourne la page suivante de rapports, plus anciens que le rapport ayant cet ID.

### Réponse

Si la requête réussit, le corps de la réponse est en `json` avec un code de statut `200` :

```json
{
  "reports": [
    {
      "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
      "report_type": "email",
      "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
      "status": "ready",
      "requested_at": "2026-06-15 12:30:00.000000",
      "completed_at": "2026-06-15 12:31:00.000000",
      "expires_at": "2026-06-18 12:31:00.000000"
    }
  ],
  "links": {
    "current": "https://api.notification.canada.ca/v2/reports",
    "next": "https://api.notification.canada.ca/v2/reports?older_than=740e5834-3a29-46b4-9a6f-16142fde533a"
  }
}
```

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage reports."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_reports`|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n'a pas pu traiter la requête, renvoyez votre requête|

## Obtenir un rapport par ID

```
GET /v2/reports/{report_id}
```

### Paramètres

**report_id (obligatoire)**

L'ID du rapport à récupérer.

### Réponse

Si la requête réussit, le corps de la réponse est en `json` avec un code de statut `200` :

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "report_type": "email",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "status": "ready",
  "requested_at": "2026-06-15 12:30:00.000000",
  "completed_at": "2026-06-15 12:31:00.000000",
  "expires_at": "2026-06-18 12:31:00.000000"
}
```

Le champ `status` peut prendre l'une des valeurs suivantes :

- `requested` - le rapport a été demandé et attend d'être généré
- `generating` - le rapport est en cours de génération
- `ready` - le rapport est prêt à être téléchargé
- `error` - le rapport n'a pas pu être généré

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage reports."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_reports`|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirmez que l'ID du rapport existe dans votre service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n'a pas pu traiter la requête, renvoyez votre requête|

## Télécharger le contenu d'un rapport

```
GET /v2/reports/{report_id}/content
```

Le rapport doit avoir le statut `ready` avant de pouvoir être téléchargé. Le contenu est retourné sous forme de fichier CSV.

### Paramètres

**report_id (obligatoire)**

L'ID du rapport à télécharger.

### Réponse

Si la requête réussit, la réponse est un fichier CSV avec un code de statut `200`. Le `Content-Type` est `text/csv` et le fichier est retourné en pièce jointe.

### Colonnes du CSV

Les colonnes dépendent du type de rapport. Les heures sont exprimées dans le fuseau horaire `America/Toronto`.

Les en-têtes de colonnes sont affichés dans la langue demandée avec le paramètre `language`. Les colonnes ci-dessous utilisent les en-têtes en français.

Pour les rapports `email` et `sms`, les colonnes sont :

|Colonne|Description|
|:---|:---|
|Destinataire|L'adresse courriel ou le numéro de téléphone auquel le message a été envoyé|
|Gabarit|Le nom du gabarit utilisé|
|Type|Le type de notification : `courriel` ou `sms`|
|Envoyé par|Le nom de l'utilisateur qui a envoyé le message, s'il a été envoyé par une personne|
|Envoyé par courriel|L'adresse courriel de l'utilisateur qui a envoyé le message, s'il a été envoyé par une personne|
|Tâche|Le nom du fichier d'envoi en masse dont provient le message, le cas échéant|
|État|Le statut de livraison du message|
|Heure d’envoi|La date et l'heure d'envoi du message|

Pour les rapports `job`, les colonnes sont :

|Colonne|Description|
|:---|:---|
|Numéro de ligne|Le numéro de ligne du destinataire dans le fichier d'envoi en masse original|
|Destinataire|L'adresse courriel ou le numéro de téléphone auquel le message a été envoyé|
|Gabarit|Le nom du gabarit utilisé|
|Type|Le type de notification : `courriel` ou `sms`|
|Tâche|Le nom du fichier d'envoi en masse dont provient le message|
|État|Le statut de livraison du message|
|Heure d’envoi|La date et l'heure d'envoi du message|

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage reports."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_reports`|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirmez que l'ID du rapport existe dans votre service|
|`409`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Report is not ready for download (status: generating)"`<br>`}]`|Attendez que le statut du rapport soit `ready` avant de le télécharger|
|`502`|`[{`<br>`"error": "S3ReportDownloadError",`<br>`"message": "Failed to retrieve report content"`<br>`}]`|Notification GC n'a pas pu récupérer le contenu du rapport, réessayez plus tard|

## Exemples CURL

Exemple pour demander un rapport

```
curl --request POST \
  --url https://api.notification.canada.ca/v2/reports \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "report_type": "email",
    "language": "fr"
  }'
```

Exemple pour obtenir la liste des rapports

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/reports \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```

Exemple pour obtenir un rapport par ID

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/reports/REPORT_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```

Exemple pour télécharger le contenu d'un rapport

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/reports/REPORT_ID/content \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --output report.csv
```
