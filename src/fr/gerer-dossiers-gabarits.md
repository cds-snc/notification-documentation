# Gérer les dossiers de gabarits

Vous pouvez utiliser Notification GC pour créer, lire, renommer, déplacer et supprimer des dossiers de gabarits à l'aide de l'API.

Les dossiers vous aident à organiser vos gabarits. Pour placer un gabarit dans un dossier, utilisez `parent_folder_id` lorsque vous [créez ou mettez à jour un gabarit](gerer-gabarits.md).

## Ce dont vous aurez besoin

Les points de terminaison d'API pour gérer les dossiers de gabarits exigent une clé API avec la permission `manage_templates`. Il s'agit de la même permission que celle utilisée pour [Gérer les gabarits](gerer-gabarits.md).

Pour les types de clés et leur gestion, consultez [Clés API](cles.md).

## Objet dossier

Tous les points de terminaison retournent les dossiers dans ce format :

```json
{
  "id": "f025b1a9-63af-43e8-b969-627bfe544bba",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "name": "Courriels d'authentification",
  "parent_folder_id": null,
  "users_with_permission": [
    "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
  ]
}
```

|Champ|Description|
|:---|:---|
|`id`|L'ID du dossier.|
|`service_id`|L'ID du service propriétaire du dossier.|
|`name`|Le nom du dossier.|
|`parent_folder_id`|L'ID du dossier parent, ou `null` pour un dossier de premier niveau.|
|`users_with_permission`|Les ID des membres de l'équipe qui peuvent voir le dossier dans Notification GC.|

### Accès aux dossiers

- Un dossier de premier niveau est partagé avec tous les membres actifs de l'équipe de votre service.
- Un sous-dossier hérite de l'accès de son dossier parent.
- Lorsque vous déplacez un dossier dans un autre dossier, les membres de l'équipe qui n'ont pas accès au nouveau dossier parent perdent l'accès au dossier déplacé et à ses sous-dossiers.

## Obtenir tous les dossiers

```
GET /v2/manage-template-folder
```

### Réponse

Si la requête réussit, le corps de la réponse est en `json` avec un code d'état `200` :

```json
{
  "template_folders": [
    {
      "id": "f025b1a9-63af-43e8-b969-627bfe544bba",
      "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
      "name": "Courriels d'authentification",
      "parent_folder_id": null,
      "users_with_permission": [
        "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
      ]
    },
    {
      "id": "0c7a3bd5-3d3b-4a7f-9d0b-0f5a6f1f6e11",
      "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
      "name": "Réinitialisations de mot de passe",
      "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba",
      "users_with_permission": [
        "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
      ]
    }
  ]
}
```

La réponse inclut tous les dossiers de votre service, y compris les sous-dossiers.

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_templates`|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n'a pas pu traiter la requête, renvoyez votre requête|

## Obtenir un dossier par ID

```
GET /v2/manage-template-folder/{template_folder_id}
```

### Paramètres

**template_folder_id (obligatoire)**

L'ID du dossier à récupérer.

### Réponse

Si la requête réussit, le corps de la réponse est en `json` avec un code d'état `200` :

```json
{
  "id": "f025b1a9-63af-43e8-b969-627bfe544bba",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "name": "Courriels d'authentification",
  "parent_folder_id": null,
  "users_with_permission": [
    "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
  ]
}
```

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "id is not a valid UUID"`<br>`}]`|Utilisez un UUID valide pour `template_folder_id`|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_templates`|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirmez que l'ID du dossier existe dans votre service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n'a pas pu traiter la requête, renvoyez votre requête|

## Créer un dossier

```
POST /v2/manage-template-folder
```

### Corps de la requête

```json
{
  "name": "Réinitialisations de mot de passe",
  "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba"
}
```

### Paramètres

**name (obligatoire)**

Le nom du dossier. Il ne peut pas être vide. Les espaces au début et à la fin sont supprimés.

**parent_folder_id (facultatif)**

L'ID du dossier dans lequel créer ce dossier. Omettez ce paramètre, ou définissez-le à `null`, pour créer un dossier de premier niveau.

### Réponse

Si la requête réussit, le corps de la réponse est en `json` avec un code d'état `201` :

```json
{
  "id": "0c7a3bd5-3d3b-4a7f-9d0b-0f5a6f1f6e11",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "name": "Réinitialisations de mot de passe",
  "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba",
  "users_with_permission": [
    "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
  ]
}
```

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "name is a required property"`<br>`}]`|Ajoutez `name` au corps de la requête|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "parent_folder_id is not a valid UUID"`<br>`}]`|Utilisez un UUID valide ou `null` pour `parent_folder_id`|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "Additional properties are not allowed"`<br>`}]`|Utilisez uniquement les champs pris en charge : `name`, `parent_folder_id`|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "name cannot be empty"`<br>`}]`|Fournissez un nom qui n'est pas vide ni composé uniquement d'espaces|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "parent_folder_id not found"`<br>`}]`|Utilisez un ID de dossier valide de votre service|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_templates`|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n'a pas pu traiter la requête, renvoyez votre requête|

## Mettre à jour un dossier

```
PATCH /v2/manage-template-folder/{template_folder_id}
```

Utilisez ce point de terminaison pour renommer un dossier, le déplacer, ou les deux.

### Corps de la requête

Fournissez un ou plusieurs champs à mettre à jour.

```json
{
  "name": "Courriels de réinitialisation de mot de passe",
  "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba"
}
```

### Paramètres

**template_folder_id (obligatoire)**

L'ID du dossier à mettre à jour.

**name (facultatif)**

Le nouveau nom du dossier. Il ne peut pas être vide. Les espaces au début et à la fin sont supprimés.

**parent_folder_id (facultatif)**

L'ID du dossier dans lequel déplacer ce dossier. Pour déplacer le dossier au premier niveau, définissez `parent_folder_id` à `null`.

Vous ne pouvez pas déplacer un dossier dans lui-même ni dans l'un de ses propres sous-dossiers.

### Réponse

Si la requête réussit, le corps de la réponse est en `json` avec un code d'état `200` :

```json
{
  "id": "0c7a3bd5-3d3b-4a7f-9d0b-0f5a6f1f6e11",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "name": "Courriels de réinitialisation de mot de passe",
  "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba",
  "users_with_permission": [
    "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
  ]
}
```

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "id is not a valid UUID"`<br>`}]`|Utilisez un UUID valide pour `template_folder_id`|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "parent_folder_id is not a valid UUID"`<br>`}]`|Utilisez un UUID valide ou `null` pour `parent_folder_id`|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "Additional properties are not allowed"`<br>`}]`|Utilisez uniquement les champs pris en charge : `name`, `parent_folder_id`|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "name cannot be empty"`<br>`}]`|Fournissez un nom qui n'est pas vide ni composé uniquement d'espaces|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "parent_folder_id not found"`<br>`}]`|Utilisez un ID de dossier valide de votre service|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "You cannot move a folder to itself"`<br>`}]`|Utilisez un autre dossier pour `parent_folder_id`|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "You cannot move a folder to one of its subfolders"`<br>`}]`|Utilisez un dossier qui ne se trouve pas dans le dossier que vous déplacez|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_templates`|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirmez que l'ID du dossier existe dans votre service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n'a pas pu traiter la requête, renvoyez votre requête|

## Supprimer un dossier

```
DELETE /v2/manage-template-folder/{template_folder_id}
```

Ce point de terminaison supprime définitivement un dossier. Vous ne pouvez supprimer qu'un dossier qui ne contient aucun gabarit ni sous-dossier. Déplacez les gabarits vers un autre dossier (ou retirez-les du dossier) et supprimez d'abord les sous-dossiers. Les gabarits archivés sont toujours considérés comme faisant partie du dossier.

### Paramètres

**template_folder_id (obligatoire)**

L'ID du dossier à supprimer.

### Réponse

Si la requête réussit, le corps de la réponse est en `json` avec un code d'état `200`. La réponse contient le dossier qui a été supprimé :

```json
{
  "id": "0c7a3bd5-3d3b-4a7f-9d0b-0f5a6f1f6e11",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "name": "Courriels de réinitialisation de mot de passe",
  "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba",
  "users_with_permission": [
    "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
  ]
}
```

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "id is not a valid UUID"`<br>`}]`|Utilisez un UUID valide pour `template_folder_id`|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Folder is not empty"`<br>`}]`|Déplacez les gabarits hors du dossier et supprimez ses sous-dossiers, puis réessayez|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_templates`|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirmez que l'ID du dossier existe dans votre service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n'a pas pu traiter la requête, renvoyez votre requête|

## Exemples CURL

Exemple pour obtenir tous les dossiers

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/manage-template-folder \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```

Exemple pour obtenir un dossier

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/manage-template-folder/TEMPLATE_FOLDER_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```

Exemple pour créer un dossier

```
curl --request POST \
  --url https://api.notification.canada.ca/v2/manage-template-folder \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Réinitialisations de mot de passe",
    "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba"
  }'
```

Exemple pour renommer ou déplacer un dossier

```
curl --request PATCH \
  --url https://api.notification.canada.ca/v2/manage-template-folder/TEMPLATE_FOLDER_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Courriels de réinitialisation de mot de passe",
    "parent_folder_id": null
  }'
```

Exemple pour supprimer un dossier

```
curl --request DELETE \
  --url https://api.notification.canada.ca/v2/manage-template-folder/TEMPLATE_FOLDER_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```
