# Reports

You can use GC Notify to request, list, and download reports of your notifications using the API.

Reports are generated asynchronously. After you request a report, poll the report by ID until its status is `ready`, then download its content.

## What you'll need

To use the report endpoints, you need an API key with the `manage_reports` permission.

For key types and key management details, refer to [API keys](keys.md#key-types).

## Rate limit

You can request a maximum of __10 reports per hour, per service__. This limit applies to the `POST /v2/reports` endpoint only.

If you exceed the limit, you will get a `429` error `RateLimitExceeded` with the message `Maximum 10 report requests per hour`.

## Request a report

```
POST /v2/reports
```

### Request body

```json
{
  "report_type": "email",
  "language": "en"
}
```

To request a report for a bulk job, include `job_id`:

```json
{
  "report_type": "job",
  "language": "en",
  "job_id": "b7a2f0c4-8e1d-4d3b-9c2a-2f5e6d7a8b9c"
}
```

### Arguments

**report_type (required)**

The type of report to generate. Allowed values:

- `sms`
- `email`
- `job`

**language (required)**

The language of the report. Allowed values:

- `en`
- `fr`

**job_id (required when `report_type` is `job`)**

The ID of the bulk job to generate a report for.

### Response

If the request is successful, the response body is `json` with a status code of `202`:

```json
{
  "report_id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "status": "requested"
}
```

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "report_type invalid is not one of [sms, email, job]"`<br>`}]`|Use a supported `report_type`: `sms`, `email`, or `job`|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "job_id is a required property"`<br>`}]`|Include `job_id` when `report_type` is `job`|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage reports."`<br>`}]`|Create or use an API key with `manage_reports` permission|
|`429`|`[{`<br>`"error": "RateLimitExceeded",`<br>`"message": "Maximum 10 report requests per hour"`<br>`}]`|Wait before requesting another report. You can request up to 10 reports per hour|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your request|

## Get a list of reports

```
GET /v2/reports
```

### Query parameters

**older_than (optional)**

Return the next page of reports, older than the report with this ID.

### Response

If the request is successful, the response body is `json` with a status code of `200`:

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

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage reports."`<br>`}]`|Create or use an API key with `manage_reports` permission|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your request|

## Get a report by ID

```
GET /v2/reports/{report_id}
```

### Arguments

**report_id (required)**

The ID of the report to retrieve.

### Response

If the request is successful, the response body is `json` with a status code of `200`:

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

The `status` field can be one of:

- `requested` - the report has been requested and is waiting to be generated
- `generating` - the report is being generated
- `ready` - the report is ready to download
- `error` - the report could not be generated

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage reports."`<br>`}]`|Create or use an API key with `manage_reports` permission|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirm the report ID exists in your service|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your request|

## Download report content

```
GET /v2/reports/{report_id}/content
```

The report must have a status of `ready` before you can download it. The content is returned as a CSV file.

### Arguments

**report_id (required)**

The ID of the report to download.

### Response

If the request is successful, the response is a CSV file with a status code of `200`. The `Content-Type` is `text/csv` and the file is returned as an attachment.

### CSV columns

The columns depend on the type of report. Times are in the `America/Toronto` time zone.

The column headers are shown in the language you requested with the `language` argument. The columns below use the English headers.

For `email` and `sms` reports, the columns are:

|Column|Description|
|:---|:---|
|Recipient|The email address or phone number the message was sent to|
|Template|The name of the template used|
|Type|The notification type: `email` or `sms`|
|Sent by|The name of the user who sent the message, if sent by a person|
|Sent by email|The email address of the user who sent the message, if sent by a person|
|Job|The file name of the bulk send the message came from, if applicable|
|Status|The delivery status of the message|
|Sent Time|The date and time the message was sent|

For `job` reports, the columns are:

|Column|Description|
|:---|:---|
|Row number|The row number of the recipient in the original bulk send file|
|Recipient|The email address or phone number the message was sent to|
|Template|The name of the template used|
|Type|The notification type: `email` or `sms`|
|Job|The file name of the bulk send the message came from|
|Status|The delivery status of the message|
|Sent Time|The date and time the message was sent|

### Error codes

|status_code|message|How to fix|
|:---|:---|:---|
|`403`|`[{`<br>`"error": "ForbiddenError",`<br>`"message": "This API key does not have permission to manage reports."`<br>`}]`|Create or use an API key with `manage_reports` permission|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Confirm the report ID exists in your service|
|`409`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Report is not ready for download (status: generating)"`<br>`}]`|Wait until the report status is `ready` before downloading|
|`502`|`[{`<br>`"error": "S3ReportDownloadError",`<br>`"message": "Failed to retrieve report content"`<br>`}]`|GC Notify was unable to retrieve the report content, try again later|

## CURL examples

Example to request a report

```
curl --request POST \
  --url https://api.notification.canada.ca/v2/reports \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "report_type": "email",
    "language": "en"
  }'
```

Example to get a list of reports

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/reports \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```

Example to get a report by ID

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/reports/REPORT_ID \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json'
```

Example to download report content

```
curl --request GET \
  --url https://api.notification.canada.ca/v2/reports/REPORT_ID/content \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --output report.csv
```
