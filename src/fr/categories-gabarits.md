# Catégories de gabarit

Utilisez ce point de terminaison pour obtenir la liste des catégories de gabarit pour l'API de gestion des gabarits.

Vous pouvez utiliser un ID de catégorie de cette réponse comme `template_category_id` lors de la création ou de la mise à jour de gabarits.

## Ce dont vous aurez besoin

Vous avez besoin d'une clé API avec la permission `manage_templates`. Consultez [Gérer les gabarits](gerer-gabarits.md) et [Clés API](cles.md).


## Référence actuelle des catégories de gabarit

Au besoin, vous pouvez utiliser cette liste de référence actuelle :

|template_category_id|name|
|:---|:---|
|`207b293c-2ae5-48e8-836d-fcabd60b2153`|Communication générale|
|`977e2a00-f957-4ff0-92f2-ca3286b24786`|Confirmation|
|`e81678c0-4897-4111-b9d0-172f6b595f89`|Décision|
|`e0b8fbe5-f435-4977-8fc8-03f13d9296a5`|Demande|
|`b6c42a7e-2a26-4a07-802b-123a5c3198a9`|Authentification|
|`55eb1137-6dc6-4094-9031-f61124a279dc`|État d’avancement|
|`7c16aa95-e2e1-4497-81d6-04c656520fe4`|Test|
|`1d8ce435-a7e5-431b-aaa2-a418bc4d14f9`|Alerte|
|`edb966f3-4a4c-47a4-96ab-05ff259b919c`|Rappel|

## Obtenir les catégories de gabarit

```
GET /v2/manage-template/template-categories
```

### Réponse

Si la requête réussit, le corps de la réponse est en `json` avec un code de statut `200` :

```json
{
  "template_categories": [
    {
      "template_category_id": "207b293c-2ae5-48e8-836d-fcabd60b2153",
      "name": "General communication"
    },
    {
      "template_category_id": "977e2a00-f957-4ff0-92f2-ca3286b24786",
      "name": "Confirmation"
    }
  ]
}
```

### Codes d'erreur

|status_code|message|Comment corriger|
|:---|:---|:---|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Créez ou utilisez une clé API avec la permission `manage_templates`|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|Notification GC n'a pas pu traiter la requête, renvoyez votre requête|

## Référence actuelle des catégories de gabarit

Au besoin, vous pouvez utiliser cette liste de référence actuelle :

|template_category_id|name|
|:---|:---|
|`207b293c-2ae5-48e8-836d-fcabd60b2153`|General communication|
|`977e2a00-f957-4ff0-92f2-ca3286b24786`|Confirmation|
|`e81678c0-4897-4111-b9d0-172f6b595f89`|Decision|
|`e0b8fbe5-f435-4977-8fc8-03f13d9296a5`|Request|
|`b6c42a7e-2a26-4a07-802b-123a5c3198a9`|Authentication|
|`55eb1137-6dc6-4094-9031-f61124a279dc`|Status update|
|`7c16aa95-e2e1-4497-81d6-04c656520fe4`|Test|
|`1d8ce435-a7e5-431b-aaa2-a418bc4d14f9`|Alert|
|`edb966f3-4a4c-47a4-96ab-05ff259b919c`|Reminder|

## Exemple CURL

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/manage-template/template-categories \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```