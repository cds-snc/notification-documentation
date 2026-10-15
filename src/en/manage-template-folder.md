# Manage template folders

You can use GC Notify to create, read, rename, move, and delete template folders using the API.

Folders help you organize templates. To put a template in a folder, use `parent_folder_id` when you [create or update a template](manage-template.md).

## What you'll need

To use the manage template folder endpoints, you need an API key with the `manage_templates` permission. This is the same permission used for [Manage templates](manage-template.md).

For key types and key management details, refer to [API keys](keys.md).

## Folder object

All endpoints return folders in this format:

```json
{
  "id": "f025b1a9-63af-43e8-b969-627bfe544bba",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "name": "Authentication emails",
  "parent_folder_id": null,
  "users_with_permission": [
    "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
  ]
}
```

|Field|Description|
|:---|:---|
|`id`|The folder ID.|
|`service_id`|The ID of the service that owns the folder.|
|`name`|The folder name.|
|`parent_folder_id`|The ID of the parent folder, or `null` for a top-level folder.|
|`users_with_permission`|The IDs of the team members who can see the folder in GC Notify.|

### Folder access

- A top-level folder is shared with all active team members on your service.
- A subfolder inherits access from its parent folder.
- When you move a folder into another folder, team members who cannot access the new parent folder lose access to the moved folder and its subfolders.

## Get all folders

```
GET /v2/manage-template-folder
```

### Response

If the request is successful, the response body is `json` with a status code of `200`:

```json
{
  "template_folders": [
    {
      "id": "f025b1a9-63af-43e8-b969-627bfe544bba",
      "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
      "name": "Authentication emails",
      "parent_folder_id": null,
      "users_with_permission": [
        "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
      ]
    },
    {
      "id": "0c7a3bd5-3d3b-4a7f-9d0b-0f5a6f1f6e11",
      "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
      "name": "Password resets",
      "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba",
      "users_with_permission": [
        "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
      ]
    }
  ]
}
```

The response includes every folder in your service, including subfolders.

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Create or use an API key with `manage_templates` permission|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your request|

## Get a folder by ID

```
GET /v2/manage-template-folder/{template_folder_id}
```

### Arguments

**template_folder_id (required)**

The ID of the folder to retrieve.

### Response

If the request is successful, the response body is `json` with a status code of `200`:

```json
{
  "id": "f025b1a9-63af-43e8-b969-627bfe544bba",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "name": "Authentication emails",
  "parent_folder_id": null,
  "users_with_permission": [
    "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
  ]
}
```

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "id is not a valid UUID"`<br>`}]`|Use a valid UUID for `template_folder_id`|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Create or use an API key with `manage_templates` permission|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirm the folder ID exists in your service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your request|

## Create a folder

```
POST /v2/manage-template-folder
```

### Request body

```json
{
  "name": "Password resets",
  "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba"
}
```

### Arguments

**name (required)**

The folder name. It cannot be empty. Leading and trailing spaces are removed.

**parent_folder_id (optional)**

The ID of the folder to create this folder in. Omit this argument, or set it to `null`, to create a top-level folder.

### Response

If the request is successful, the response body is `json` with a status code of `201`:

```json
{
  "id": "0c7a3bd5-3d3b-4a7f-9d0b-0f5a6f1f6e11",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "name": "Password resets",
  "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba",
  "users_with_permission": [
    "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
  ]
}
```

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "name is a required property"`<br>`}]`|Add `name` to the request body|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "parent_folder_id is not a valid UUID"`<br>`}]`|Use a valid UUID or `null` for `parent_folder_id`|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "Additional properties are not allowed"`<br>`}]`|Use only supported fields: `name`, `parent_folder_id`|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "name cannot be empty"`<br>`}]`|Provide a name that is not empty or only spaces|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "parent_folder_id not found"`<br>`}]`|Use a valid folder ID from your service|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Create or use an API key with `manage_templates` permission|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your request|

## Update a folder

```
PATCH /v2/manage-template-folder/{template_folder_id}
```

Use this endpoint to rename a folder, move it, or both.

### Request body

Provide one or more fields to update.

```json
{
  "name": "Password reset emails",
  "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba"
}
```

### Arguments

**template_folder_id (required)**

The ID of the folder to update.

**name (optional)**

The updated folder name. It cannot be empty. Leading and trailing spaces are removed.

**parent_folder_id (optional)**

The ID of the folder to move this folder into. To move the folder to the top level, set `parent_folder_id` to `null`.

You cannot move a folder into itself or into one of its own subfolders.

### Response

If the request is successful, the response body is `json` with a status code of `200`:

```json
{
  "id": "0c7a3bd5-3d3b-4a7f-9d0b-0f5a6f1f6e11",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "name": "Password reset emails",
  "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba",
  "users_with_permission": [
    "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
  ]
}
```

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "id is not a valid UUID"`<br>`}]`|Use a valid UUID for `template_folder_id`|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "parent_folder_id is not a valid UUID"`<br>`}]`|Use a valid UUID or `null` for `parent_folder_id`|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "Additional properties are not allowed"`<br>`}]`|Use only supported fields: `name`, `parent_folder_id`|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "name cannot be empty"`<br>`}]`|Provide a name that is not empty or only spaces|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "parent_folder_id not found"`<br>`}]`|Use a valid folder ID from your service|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "You cannot move a folder to itself"`<br>`}]`|Use a different folder for `parent_folder_id`|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "You cannot move a folder to one of its subfolders"`<br>`}]`|Use a folder that is not inside the folder you are moving|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Create or use an API key with `manage_templates` permission|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirm the folder ID exists in your service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your request|

## Delete a folder

```
DELETE /v2/manage-template-folder/{template_folder_id}
```

This endpoint permanently deletes a folder. You can only delete a folder that has no templates and no subfolders. Move the templates to another folder (or remove them from the folder) and delete the subfolders first. Archived templates still count as being in the folder.

### Arguments

**template_folder_id (required)**

The ID of the folder to delete.

### Response

If the request is successful, the response body is `json` with a status code of `200`. The response contains the folder that was deleted:

```json
{
  "id": "0c7a3bd5-3d3b-4a7f-9d0b-0f5a6f1f6e11",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "name": "Password reset emails",
  "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba",
  "users_with_permission": [
    "5d3a5ab0-2ed8-4cc3-a8f6-9b8d1b5b6a52"
  ]
}
```

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "id is not a valid UUID"`<br>`}]`|Use a valid UUID for `template_folder_id`|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Folder is not empty"`<br>`}]`|Move the templates out of the folder and delete its subfolders, then try again|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Create or use an API key with `manage_templates` permission|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirm the folder ID exists in your service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your request|

## CURL examples

Example to get all folders

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/manage-template-folder \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```

Example to get a folder

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/manage-template-folder/TEMPLATE_FOLDER_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```

Example to create a folder

```
curl --request POST \
  --url https://api.notification.canada.ca/v2/manage-template-folder \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Password resets",
    "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba"
  }'
```

Example to rename or move a folder

```
curl --request PATCH \
  --url https://api.notification.canada.ca/v2/manage-template-folder/TEMPLATE_FOLDER_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Password reset emails",
    "parent_folder_id": null
  }'
```

Example to delete a folder

```
curl --request DELETE \
  --url https://api.notification.canada.ca/v2/manage-template-folder/TEMPLATE_FOLDER_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```
