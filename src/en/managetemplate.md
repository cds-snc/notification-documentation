# Manage templates

You can use GC Notify to create, read, update, and archive templates using the API.

This is useful if your team wants to automate template setup and maintenance across environments.

## What you'll need

To use the manage template endpoints, you need an API key with the `manage_templates` permission.

To create this key in the application:

1. [Sign in to GC Notify](https://notification.canada.ca/sign-in).
1. Go to the __API integration__ page.
1. Select __API keys__.
1. Select __Create an API key__.
1. Enter a key name.
1. Under permissions, click __Manage templates__.
1. Select __Create API key__.
1. Copy and securely store the key.

For key types and key management details, refer to [API keys](keys.md).

## Template categories are required

Every template you create must include `template_category_id`.

You can:

- get categories from the API endpoint documented in [Template categories](template-categories.md)
- use the current category list in [Template categories](template-categories.md#current-template-categories-reference)

## Create a template

```
POST /v2/manage-template
```

### Request body

```json
{
  "name": "Password reset",
  "template_type": "email",
  "subject": "Reset your password",
  "content": "Hello ((name)), use this link: ((reset_link))",
  "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9"
}
```

### Arguments

**name (required)**

The template name.

**template_type (required)**

The notification type. Allowed values:

- `email`
- `sms`

**content (required)**

The body content of the template.

**subject (required for email templates)**

The subject line of an email template.

**template_category_id (required)**

The category ID for this template. Refer to [Template categories](template-categories.md).

**parent_folder_id (optional)**

The folder ID where the template should be stored.

### Response

If the request is successful, the response body is `json` with a status code of `201`:

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "service_name": "Service name",
  "name": "Password reset",
  "type": "email",
  "created_at": "2026-06-15 12:30:00.000000",
  "updated_at": null,
  "created_by": "service-user@example.com",
  "version": 1,
  "body": "Hello ((name)), use this link: ((reset_link))",
  "subject": "Reset your password",
  "postage": "second",
  "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9",
  "template_category_name": "Authentication",
  "folder_id": null,
  "archived": false
}
```

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "'template_category_id' is a required property"`<br>`}]`|Add `template_category_id` to the request body|
|`400`|`[{`<br>`"error": "TemplateCategoryValidationError",`<br>`"message": "template_category_id must be a valid UUID"`<br>`}]`|Use a valid UUID value for `template_category_id`|
|`400`|`[{`<br>`"error": "TemplateCategoryNotFoundError",`<br>`"message": "template_category_id not found"`<br>`}]`|Use a category from [Template categories](template-categories.md)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "parent_folder_id not found"`<br>`}]`|Use a valid folder ID from your service|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Content has a character count greater than the limit of (LIMIT)"`<br>`}]`|Reduce template content length|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Template name must be less than (LIMIT) characters"`<br>`}]`|Use a shorter template name|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Create or use an API key with `manage_templates` permission|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Use a valid service resource ID|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your request|

## Get a template by ID

```
GET /v2/manage-template/{template_id}
```

### Arguments

**template_id (required)**

The ID of the template to retrieve.

### Response

If the request is successful, the response body is `json` with a status code of `200`:

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "service_name": "Service name",
  "name": "Password reset",
  "type": "email",
  "created_at": "2026-06-15 12:30:00.000000",
  "updated_at": "2026-06-15 12:31:00.000000",
  "created_by": "service-user@example.com",
  "version": 2,
  "body": "Hello ((name)), use this link: ((reset_link))",
  "subject": "Reset your password",
  "postage": "second",
  "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9",
  "template_category_name": "Authentication",
  "folder_id": null,
  "archived": false
}
```

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Create or use an API key with `manage_templates` permission|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirm the template ID exists in your service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your request|

## Update a template

```
PATCH /v2/manage-template/{template_id}
```

### Request body

Provide one or more fields to update.

```json
{
  "name": "Password reset v2",
  "content": "Hello ((name)), use this secure link: ((reset_link))",
  "subject": "Reset your password",
  "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9",
  "parent_folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba"
}
```

### Arguments

**template_id (required)**

The ID of the template to update.

**name (optional)**

The updated template name.

**content (optional)**

The updated body content.

**subject (optional)**

The updated email subject.

**template_category_id (optional)**

The updated template category ID.

**parent_folder_id (optional)**

The folder ID to move this template into. To remove a folder assignment, set `parent_folder_id` to `null`.

### Response

If the request is successful, the response body is `json` with a status code of `200`:

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "service_name": "Service name",
  "name": "Password reset v2",
  "type": "email",
  "created_at": "2026-06-15 12:30:00.000000",
  "updated_at": "2026-06-15 12:35:00.000000",
  "created_by": "service-user@example.com",
  "version": 3,
  "body": "Hello ((name)), use this secure link: ((reset_link))",
  "subject": "Reset your password",
  "postage": "second",
  "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9",
  "template_category_name": "Authentication",
  "folder_id": "f025b1a9-63af-43e8-b969-627bfe544bba",
  "archived": false
}
```

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "Additional properties are not allowed"`<br>`}]`|Use only supported fields: `name`, `content`, `subject`, `template_category_id`, `parent_folder_id`|
|`400`|`[{`<br>`"error": "TemplateCategoryValidationError",`<br>`"message": "template_category_id must be a valid UUID"`<br>`}]`|Use a valid UUID value for `template_category_id`|
|`400`|`[{`<br>`"error": "TemplateCategoryNotFoundError",`<br>`"message": "template_category_id not found"`<br>`}]`|Use a category from [Template categories](template-categories.md)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "parent_folder_id not found"`<br>`}]`|Use a valid folder ID from your service|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Content has a character count greater than the limit of (LIMIT)"`<br>`}]`|Reduce template content length|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Template name must be less than (LIMIT) characters"`<br>`}]`|Use a shorter template name|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Create or use an API key with `manage_templates` permission|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirm the template ID exists in your service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your request|

## Archive a template

```
DELETE /v2/manage-template/{template_id}
```

This endpoint archives a template. Archived templates are not deleted permanently.

### Arguments

**template_id (required)**

The ID of the template to archive.

### Response

If the request is successful, the response body is `json` with a status code of `200`:

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "service_id": "afa2be3b-1250-430f-a70f-28a1a9d49dfa",
  "service_name": "Service name",
  "name": "Password reset v2",
  "type": "email",
  "created_at": "2026-06-15 12:30:00.000000",
  "updated_at": "2026-06-15 12:40:00.000000",
  "created_by": "service-user@example.com",
  "version": 3,
  "body": "Hello ((name)), use this secure link: ((reset_link))",
  "subject": "Reset your password",
  "postage": "second",
  "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9",
  "template_category_name": "Authentication",
  "folder_id": null,
  "archived": true
}
```

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Template is already archived."`<br>`}]`|Use a template that is not archived|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Create or use an API key with `manage_templates` permission|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirm the template ID exists in your service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your request|

## CURL examples

Example to create a template

```
curl --request POST \
  --url https://api.notification.canada.ca/v2/manage-template \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Password reset",
    "template_type": "email",
    "subject": "Reset your password",
    "content": "Hello ((name)), use this link: ((reset_link))",
    "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9"
  }'
```

Example to get a template

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/manage-template/TEMPLATE_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```

Example to update a template

```
curl --request PATCH \
  --url https://api.notification.canada.ca/v2/manage-template/TEMPLATE_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Password reset v2",
    "template_category_id": "b6c42a7e-2a26-4a07-802b-123a5c3198a9"
  }'
```

Example to archive a template

```
curl --request DELETE \
  --url https://api.notification.canada.ca/v2/manage-template/TEMPLATE_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```