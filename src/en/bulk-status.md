# Get bulk job status

You can use the GC Notify API to retrieve the status and notification statistics for bulk sending jobs.

## Get a list of bulk jobs

```
GET /v2/notifications/bulk
```

This endpoint returns bulk jobs created by the service associated with your API key, ordered from newest to oldest. The response is paginated.

### Query parameters

#### older_than (optional)

Use the ID of a bulk job from the previous page to retrieve older jobs. The next page URL is returned in `links.next` when another page is available. You can use that URL directly or pass its `older_than` value in a new request.

```json
"older_than": "684fca45-42d9-4cae-bf84-22a9f5fc9e6f"
```

### Response

If the request is successful, the response body is `json` and the status code is `200`:

```json
{
  "bulk_jobs": [
    {
      "id": "684fca45-42d9-4cae-bf84-22a9f5fc9e6f",
      "original_file_name": "Bulk send name",
      "notification_count": 3,
      "template": "055d4e5c-27c2-4ea6-8736-d4c328279acf",
      "template_version": 4,
      "template_type": "email",
      "service": "f8ea1d5f-95db-4374-a6ad-5251a26173c8",
      "service_name": { "name": "Test service" },
      "created_by": {
        "id": "6887e196-437f-4e3a-aaee-c152dc54c900",
        "name": "Notify service user"
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

`statistics` contains one entry for each notification status and its count. It is an empty array when no statistics are available.

## Get a bulk job by ID

```
GET /v2/notifications/bulk/{job_id}
```

Use this endpoint to retrieve one bulk job and its current status. The response has the same job fields as the list endpoint and is wrapped in a `data` object.

### job_id (required)

The ID of the bulk job. You can find it in the response from `POST /v2/notifications/bulk` or in the `bulk_jobs` response from the list endpoint.

## Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|Invalid job ID or `older_than` value|Check that the value is a valid UUID. The `older_than` job must belong to your service.|
|`403`|`AuthError`|Use the correct [API key](keys.md).|
|`404`|`JobNotFoundError`|Check the bulk job ID.|
