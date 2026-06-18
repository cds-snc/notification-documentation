# Template categories

Use this endpoint to list template categories for the manage template API.

You can pass a category ID from this response as `template_category_id` when creating or updating templates.

## What you'll need

You need an API key with the `manage_templates` permission. Refer to [Manage templates](manage-template.md) and [API keys](keys.md).

## Current template categories reference

If needed, you can use this current reference list:

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

## Get template categories

```
GET /v2/manage-template/template-categories
```

### Response

If the request is successful, the response body is `json` with a status code of `200`:

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

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage templates."`<br>`}]`|Create or use an API key with `manage_templates` permission|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your request|

## CURL example

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/manage-template/template-categories \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```