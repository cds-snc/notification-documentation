# Gérer les gabarits

Vous pouvez utiliser Notification GC pour créer, lire, mettre à jour et archiver des gabarits à l'aide de l'API.

Cela est utile si votre équipe souhaite automatiser la configuration et la maintenance des gabarits entre les environnements.

## Ce dont vous aurez besoin

Pour utiliser les points de terminaison de gestion des gabarits, vous avez besoin d'une clé API ayant la permission `manage_templates`.

Pour créer cette clé dans l'application :

1. [Connectez-vous à Notification GC](https://notification.canada.ca/sign-in?lang=fr).
1. Allez à la page __Intégration API__.
1. Sélectionnez __Clés API__.
1. Sélectionnez __Créer une clé API__.
1. Entrez un nom de clé.
1. Sous les permissions, cliquez sur __Manage templates__.
1. Sélectionnez __Créer une clé API__.
1. Copiez la clé et stockez-la de façon sécuritaire.

Pour les types de clés et leur gestion, consultez [Clés API](cles.md).

## Les catégories de gabarit sont obligatoires

Chaque gabarit que vous créez doit inclure `template_category_id`.

Vous pouvez :

- obtenir les catégories depuis le point de terminaison API documenté dans [Catégories de gabarit](categories-gabarits.md)
- utiliser la liste actuelle des catégories dans [Catégories de gabarit](categories-gabarits.md#reference-actuelle-des-categories-de-gabarit)

## Créer un gabarit

```
POST /v2/manage-template
```

### Corps de la requête

```json
{
  "name": "Réinitialisation du mot de passe",
  "template_type": "email",
  "subject": "Réinitialisez votre mot de passe",
  "content": "Bonjour ((name)), utilisez ce lien : ((reset_link))",
  "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9"
}
```

### Paramètres

**name (obligatoire)**

Le nom du gabarit.

**template_type (obligatoire)**

Le type de notification. Valeurs permises :

- `email`
- `sms`

**content (obligatoire)**

Le contenu du corps du gabarit.

**subject (obligatoire pour les gabarits courriel)**

L'objet du gabarit courriel.

**template_category_id (obligatoire)**

L'ID de catégorie de ce gabarit. Consultez [Catégories de gabarit](categories-gabarits.md).

**parent_folder_id (facultatif)**

L'ID du dossier où le gabarit doit être stocké.

### Réponse

Si la requête réussit, le corps de la réponse est en `json` avec un code de statut `201` :

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "service_name": "Nom du service",
  "name": "Réinitialisation du mot de passe",
  "type": "email",
  "created_at": "2026-06-15 12:30:00.000000",
  "updated_at": null,
  "created_by": "utilisateur-service@exemple.com",
  "version": 1,
  "body": "Bonjour ((name)), utilisez ce lien : ((reset_link))",
  "subject": "Réinitialisez votre mot de passe",
  "postage": "second",
  "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9",
  "template_category_name": "Authentication",
  "folder_id": null,
  "archived": false
}
```

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "'template_category_id' is a required property"`<br>`}]`|Ajoutez `template_category_id` au corps de la requête|
|`400`|`[{`<br>`"error": "TemplateCategoryValidationError",`<br>`"message": "template_category_id must be a valid UUID"`<br>`}]`|Utilisez une valeur UUID valide pour `template_category_id`|
|`400`|`[{`<br>`"error": "TemplateCategoryNotFoundError",`<br>`"message": "template_category_id not found"`<br>`}]`|Utilisez une catégorie de [Catégories de gabarit](categories-gabarits.md)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "parent_folder_id not found"`<br>`}]`|Utilisez un ID de dossier valide dans votre service|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Content has a character count greater than the limit of (LIMIT)"`<br>`}]`|Réduisez la longueur du contenu du gabarit|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Template name must be less than (LIMIT) characters"`<br>`}]`|Utilisez un nom de gabarit plus court|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_templates`|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Utilisez un ID de ressource valide du service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n'a pas pu traiter la requête, renvoyez votre requête|

## Obtenir un gabarit par ID

```
GET /v2/manage-template/{template_id}
```

### Paramètres

**template_id (obligatoire)**

L'ID du gabarit à récupérer.

### Réponse

Si la requête réussit, le corps de la réponse est en `json` avec un code de statut `200` :

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "service_name": "Nom du service",
  "name": "Réinitialisation du mot de passe",
  "type": "email",
  "created_at": "2026-06-15 12:30:00.000000",
  "updated_at": "2026-06-15 12:31:00.000000",
  "created_by": "utilisateur-service@exemple.com",
  "version": 2,
  "body": "Bonjour ((name)), utilisez ce lien : ((reset_link))",
  "subject": "Réinitialisez votre mot de passe",
  "postage": "second",
  "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9",
  "template_category_name": "Authentication",
  "folder_id": null,
  "archived": false
}
```

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_templates`|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirmez que l'ID du gabarit existe dans votre service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n'a pas pu traiter la requête, renvoyez votre requête|

## Mettre à jour un gabarit

```
PATCH /v2/manage-template/{template_id}
```

### Corps de la requête

Fournissez un ou plusieurs champs à mettre à jour.

```json
{
  "name": "Réinitialisation du mot de passe v2",
  "content": "Bonjour ((name)), utilisez ce lien sécurisé : ((reset_link))",
  "subject": "Réinitialisez votre mot de passe",
  "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9",
  "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba"
}
```

### Paramètres

**template_id (obligatoire)**

L'ID du gabarit à mettre à jour.

**name (facultatif)**

Le nouveau nom du gabarit.

**content (facultatif)**

Le nouveau contenu du corps.

**subject (facultatif)**

Le nouvel objet du courriel.

**template_category_id (facultatif)**

Le nouvel ID de catégorie de gabarit.

**parent_folder_id (facultatif)**

L'ID du dossier vers lequel déplacer ce gabarit. Pour retirer l'association à un dossier, définissez `parent_folder_id` à `null`.

### Réponse

Si la requête réussit, le corps de la réponse est en `json` avec un code de statut `200` :

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "service_name": "Nom du service",
  "name": "Réinitialisation du mot de passe v2",
  "type": "email",
  "created_at": "2026-06-15 12:30:00.000000",
  "updated_at": "2026-06-15 12:35:00.000000",
  "created_by": "utilisateur-service@exemple.com",
  "version": 3,
  "body": "Bonjour ((name)), utilisez ce lien sécurisé : ((reset_link))",
  "subject": "Réinitialisez votre mot de passe",
  "postage": "second",
  "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9",
  "template_category_name": "Authentication",
  "folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba",
  "archived": false
}
```

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "Additional properties are not allowed"`<br>`}]`|Utilisez seulement les champs pris en charge : `name`, `content`, `subject`, `template_category_id`, `parent_folder_id`|
|`400`|`[{`<br>`"error": "TemplateCategoryValidationError",`<br>`"message": "template_category_id must be a valid UUID"`<br>`}]`|Utilisez une valeur UUID valide pour `template_category_id`|
|`400`|`[{`<br>`"error": "TemplateCategoryNotFoundError",`<br>`"message": "template_category_id not found"`<br>`}]`|Utilisez une catégorie de [Catégories de gabarit](categories-gabarits.md)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "parent_folder_id not found"`<br>`}]`|Utilisez un ID de dossier valide dans votre service|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Content has a character count greater than the limit of (LIMIT)"`<br>`}]`|Réduisez la longueur du contenu du gabarit|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Template name must be less than (LIMIT) characters"`<br>`}]`|Utilisez un nom de gabarit plus court|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_templates`|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirmez que l'ID du gabarit existe dans votre service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n'a pas pu traiter la requête, renvoyez votre requête|

## Archiver un gabarit

```
DELETE /v2/manage-template/{template_id}
```

Ce point de terminaison archive un gabarit. Les gabarits archivés ne sont pas supprimés de façon permanente.

### Paramètres

**template_id (obligatoire)**

L'ID du gabarit à archiver.

### Réponse

Si la requête réussit, le corps de la réponse est en `json` avec un code de statut `200` :

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "service_name": "Nom du service",
  "name": "Réinitialisation du mot de passe v2",
  "type": "email",
  "created_at": "2026-06-15 12:30:00.000000",
  "updated_at": "2026-06-15 12:40:00.000000",
  "created_by": "utilisateur-service@exemple.com",
  "version": 3,
  "body": "Bonjour ((name)), utilisez ce lien sécurisé : ((reset_link))",
  "subject": "Réinitialisez votre mot de passe",
  "postage": "second",
  "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9",
  "template_category_name": "Authentication",
  "folder_id": null,
  "archived": true
}
```

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Template is already archived."`<br>`}]`|Utilisez un gabarit qui n'est pas archivé|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_templates`|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirmez que l'ID du gabarit existe dans votre service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n'a pas pu traiter la requête, renvoyez votre requête|

## Exemples CURL

Exemple pour créer un gabarit

```
curl --request POST \
  --url https://api.notification.canada.ca/v2/manage-template \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Réinitialisation du mot de passe",
    "template_type": "email",
    "subject": "Réinitialisez votre mot de passe",
    "content": "Bonjour ((name)), utilisez ce lien : ((reset_link))",
    "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9"
  }'
```

Exemple pour obtenir un gabarit

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/manage-template/TEMPLATE_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```

Exemple pour mettre à jour un gabarit

```
curl --request PATCH \
  --url https://api.notification.canada.ca/v2/manage-template/TEMPLATE_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Réinitialisation du mot de passe v2",
    "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9"
  }'
```

Exemple pour archiver un gabarit

```
curl --request DELETE \
  --url https://api.notification.canada.ca/v2/manage-template/TEMPLATE_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```