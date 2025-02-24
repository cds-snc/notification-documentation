# Send a message

You can use GC Notify to send emails and text messages. These might be in response to a user-generated event, like a receipt after they apply to your service, or as a reminder when a payment is due.

**What you'll need:**

To send a message with GC Notify, you'll need to set up a template in the user interface. 

To create a template:

1. [Sign in to GC Notify](https://notification.canada.ca/sign-in).
1. Go to the __Templates__ page.
1. Select __New template__.

Once you've got a template ready, find the template ID associated with it. You'll need that ID to specify which template you want to use when you call the API.

Your API call must also include any fields that have been set up as personalisations. Personalisation allows you to change what shows up in a specific message as it gets sent out. You might use personalisation to:

- Address a user by their name
- Provide users with a specific link to click
- Send a unique transaction number as a follow up
- Give users a dynamically generated list of actions they need to take

## Check status, repair and resend messages

If your HTTP requests receive a:
1. 4xx class error for an invalid request.
1. 5xx class error for server failure.

GC Notify treats these errors as unprocessed requests. Resend these requests so we can process them.

Requests must receive 2xx class success in order for GC Notify to retry until sending is done. Restrict requests to GC Notify’s API to 1000 per minute. You’ll get a 429 error if you exceed this number.

## Sending an email

```
POST /v2/notifications/email
```

### Request body
```json
{
  "email_address": "sender@something.com",
  "template_id": "f33517ff-2a88-4f6e-b855-c550268ce08a"
}
```

### Arguments

**email_address (required)**

The `email_address` of the recipient.

<Content :page-key="$site.pages.find(p => p.relativePath === 'en/_arg_template_id.md').key"/>

**personalisation (optional)**

Use `personalisation` if a template has placeholder fields for personalised information such as name or reference number, you need to provide their values in a dictionary with key value pairs. For example:

```json
"personalisation": {
  "first_name": "Amala",
  "application_date": "2018-01-01"
}
```
You can leave out this argument if a template does not have any placeholder fields for personalised information.

**reference (optional)**

`reference` is an identifier you can create if necessary. This reference identifies a single notification or a batch of notifications. It must not contain any personal information such as name or mailing address. For example:

```json
"reference": "STRING"
```
You can leave out this argument if you do not have a reference.

**email_reply_to_id (optional)** 

`email_reply_to_id` is an email address specified by you to receive replies from your users.

To add a reply-to email address:

1. [Sign in to GC Notify](https://notification.canada.ca/sign-in).
1. Go to the __Settings__ page.
1. In the __Email__ section, select __Manage__ on the __Reply-to email addresses__ row.
1. Select __Add reply-to address__.
1. Enter the email address you want to use, and select __Add__.

For example:

```json
"email_reply_to_id": "8e222534-7f05-4972-86e3-17c5d9f894e2"
```

You can leave out this argument if your service only has one reply-to email address, or you want to use the default email address.

## Sending files by email is an API-only feature

To turn on this feature, [sign in to GC Notify](https://notification.canada.ca/sign-in) and go to the __Settings__ page.

### File types

You can upload .pdf, .csv, .jpeg, .png, .odt, .txt, .rtf, as well as Microsoft Excel and Microsoft Word files. If you need to send other file types, [contact us](https://notification.canada.ca/contact).

### File quantity and size

GC Notify allows a maximum of 10 file attachments per email notification.

The email’s size, including accompanying files, cannot exceed 6MB.

### You can send files in 2 ways

1. Directly attached to the email (attachment mode).
1. As a unique link, to download from the email (link mode).

You control the sending method on every API call.

### Attachments are generally preferable

If you use link mode, GC Notify needs to encrypt and store the file. For privacy reasons, we delete the file after 7 days. After deletion, recipients get a 404 “File not found” error when they select the link.

In contrast, recipients can access attachments indefinitely, if permitted by their email provider. They may also be more familiar with receiving files as attachments.

### In some situations, there may be advantages to link mode

Some email providers and security rules block attachments. For example, government departments may restrict attachments for internal communication.  

Before choosing a sending method, perform tests to check what works best for your use case. You can also [contact us](https://notification.canada.ca/contact).

### Upload your file

To send files, pass a dictionary in the `personalisation` argument. Pass this dictionary to the placeholder key if it’s present in your template or use a name of your choice.

You’ll need to specify:

- `file`: convert the file into a string that is base64 encoded. Example: `Q2FuYWRh` (`Canada` encoded in base64)
- `filename`: the filename of the file you are sending. Example: `service_name_applicant_name.pdf`
- `sending_method`: specify how you want to send this file. Either `attach` for the direct attachment method or `link` to generate a unique link

#### If you’re sending files as direct attachments

Specify `attach` as `sending_method`.

For example:

**Template**
```
Hello ((first_name)),

We received your application on ((application_date)).

You will find your application attached.
```

**HTTP parameters**
```json
"personalisation": {
  "first_name": "Amala",
  "application_date": "2018-01-01",
  "application_file": {
    "file": "file as base64 encoded string",
    "filename": "your_custom_filename.pdf",
    "sending_method": "attach"
  }
}
```

#### If you’re sending files as unique links

1. Add a placeholder to the email template
1. Send HTTP requests, specify `link` as `sending_method`

**Add a placeholder to the template**

1. [Sign in to GC Notify](https://notification.canada.ca/sign-in).
1. Go to the __Templates__ page and select the relevant email template.
1. Select __Edit__.
1. Add a placeholder to the email template using double brackets. For example: `((link_to_file))`

```
You can [now download your application](((link_to_file))).
```

For example:

**Template**
```
Hello ((first_name)),

We received your application on ((application_date)).

You can [now download your application](((link_to_file))).
```

**HTTP parameters**
```json
"personalisation": {
  "first_name": "Amala",
  "application_date": "2018-01-01",
  "link_to_file": {
    "file": "file as base64 encoded string",
    "filename": "your_custom_filename.pdf",
    "sending_method": "link"
  }
}
```

### Response

If the request to the client is successful, the client returns a `dict`:

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "reference": "STRING",
  "content": {
    "subject": "SUBJECT TEXT",
    "body": "MESSAGE TEXT",
    "from_email": "SENDER EMAIL"
  },
  "uri": "https://api.notification.canada.ca/v2/notifications/740e5834-3a29-46b4-9a6f-16142fde533a",
  "template": {
    "id": "f33517ff-2a88-4f6e-b855-c550268ce08a",
    "version": 1,
    "uri": "https://api.notification.canada.ca/v2/template/f33517ff-2a88-4f6e-b855-c550268ce08a"
  }
}
```

### Error codes

If the request fails, the response body is `json` with the following keys:

- `status_code` with the integer status code,
- `errors` with an array of objects. Each object has 2 more keys, one  labeled `error` and the other labeled `message`.

```json
{
  "errors": [
    {
      "error": "BadRequestError",
      "message": "The error message."
    },
    {
      "error": "ValidationError",
      "message": "The error message."
    },
  ],
  "status_code": 400
}
```

The table below gives status codes and example error objects.

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient using a team-only API key"`<br>`}]`|Use the correct type of [API key](keys.md)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient when service is in trial mode`<br>`}]`|Your service cannot send this notification in trial mode. You can request to go live in settings.|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Unsupported file type '(FILE TYPE)'. Supported types are: '(ALLOWED TYPES)"`<br>`}]`|Wrong file type. You can only upload .pdf, .csv, .txt, .jpeg, .png, .doc, .docx, .xls, .xlsx, .rtf or .odt files|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "File did not pass the virus scan"`<br>`}]`|The file contains a virus|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "sending_method is a required property"`<br>`}]`|Specify either `attach` or `link` as a sending method|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "filename is a required property"`<br>`}]`|Specify a filename for the file you are sending|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "personalisation (key) is not one of [attach, link]"`<br>`}]`|The sending method specified must be either `attach` or `link`|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "(key) : Incorrect padding : Error decoding base64 field"`<br>`}]`|The file must be converted to a string that is base64 encoded|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "filename is too short"`<br>`}]`|File name must be at least 3 characters|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "filename is too long"`<br>`}]`|File name must be less than 250 characters|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Error: Your system clock must be accurate to within 30 seconds"`<br>`}]`|Check your system clock|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Invalid token: API key not found"`<br>`}]`|Use the correct [API keys](keys.md)|
|`429`|`[{`<br>`"error": "RateLimitError",`<br>`"message": "Exceeded rate limit for key type TEAM/TEST/LIVE of 1000 requests per 60 seconds"`<br>`}]`|Refer to [API rate limits](limits.md#rate-limits) for more information|
|`429`|`[{`<br>`"error": "TooManyRequestsError",`<br>`"message": "Exceeded send limits (LIMIT NUMBER) for today"`<br>`}]`|Refer to [service limits](limits.md) for the limit number|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your notification.|

## Sending a text message

```
POST /v2/notifications/sms
```

### Request body

```json
{
  "phone_number": "+19021234567",
  "template_id": "f33517ff-2a88-4f6e-b855-c550268ce08a"
}
```

### Arguments

**phone_number (required)**

The `phone_number` of the recipient of the text message.

<Content :page-key="$site.pages.find(p => p.relativePath === 'en/_arg_template_id.md').key"/>

**personalisation (optional)**

Use `personalisation` if a template has placeholder fields for personalised information such as name or reference number, you must provide their values in a dictionary with key value pairs. For example:

```json
"personalisation": {
  "first_name": "Amala",
  "application_date": "2018-01-01"
}
```

You can leave out this argument if a template does not have any placeholder fields for personalised information.

**reference (optional)**

`reference` is an identifier you can create if necessary. This reference identifies a single notification or a batch of notifications. It must not contain any personal information such as name or postal address. For example:

```json
"reference": "STRING"
```

You can leave out this argument if you do not have a reference.

**sms_sender_id (optional)**

`sms_sender_id` is a unique identifier of the sender of the text message notification.

To find the text message sender:

1. [Sign in to  Notify](https://notification.canada.ca/sign-in).
1. Go to the __Settings__ page.
1. In the __Text Messages__ section, select __Manage__ on the __Text Message sender__ row.

You can then either:

- copy the sender ID that you want to use and paste it into the method
- select __Change__ to change the default sender that the service will use, and select __Save__

```json
"sms_sender_id": "8e222534-7f05-4972-86e3-17c5d9f894e2"
```

You can leave out this argument if your service only has one text message sender, or if you want to use the default sender.

### Response

If the request is successful, the response body is `json` with a status code of `201`:

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a",
  "reference": "STRING",
  "content": {
    "body": "MESSAGE TEXT",
    "from_number": "SENDER"
  },
  "uri": "https://api.notification.canada.ca/v2/notifications/740e5834-3a29-46b4-9a6f-16142fde533a",
  "template": {
    "id": "f33517ff-2a88-4f6e-b855-c550268ce08a",
    "version": 1,
    "uri": "https://api.notification.canada.ca/v2/template/ceb50d92-100d-4b8b-b559-14fa3b091cd"
  }
}
```

If you are using the [test API key](keys.md), all your messages will come back with a `delivered` status.

All messages sent using the team and safelist or live keys will appear on your dashboard.

### Error codes

If the request is not successful, the response body is `json`, refer to the table below for details.

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient using a team-only API key"`<br>`}]`|Use the correct type of [API key](keys.md)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient when service is in trial mode"`<br>`}]`|Your service cannot send this notification in trial mode. You can request to go live in settings.|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Error: Your system clock must be accurate to within 30 seconds"`<br>`}]`|Check your system clock|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Invalid token: API key not found"`<br>`}]`|Use the correct [API key](keys.md)|
|`429`|`[{`<br>`"error": "RateLimitError",`<br>`"message": "Exceeded rate limit for key type TEAM/TEST/LIVE of 1000 requests per 60 seconds"`<br>`}]`|Refer to [API rate limits](limits.md) for more information|
|`429`|`[{`<br>`"error": "TooManyRequestsError",`<br>`"message": "Exceeded send limits (LIMIT NUMBER) for today"`<br>`}]`|Refer to [service limits](limits.md) for the limit number|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request, resend your notification.|


## Sending notifications in bulk

```
POST /v2/notifications/bulk
```

Send notifications in bulk, up to 50,000 recipients at a time, for a single template. You can schedule to send notifications up to 4 days in advance.

### Request body

```json
{
  "name": "Bulk send name",
  "template_id": "f33517ff-2a88-4f6e-b855-c550268ce08a",
  "rows": [
    ["email address", "name"],
    ["alice@example.com", "Alice"],
    ["bob@example.com", "Bob"]
  ],
  "scheduled_for": "2021-06-08T15:15:00", # optional string
  "reply_to_id": "f025b1a9-63af-43e8-b969-627bfe544bba" # optional string
}
```

### Arguments

**name (required)**

The `name` of your bulk sending job. Used to identify this bulk of notifications later on.

<Content :page-key="$site.pages.find(p => p.relativePath === 'en/_arg_template_id.md').key"/>

**rows (required)**

`rows` is an array of arrays. The first line is the header and should include at least `email address` if you're sending an email template or `phone number` if you're sending a text message template. The other column headers should match the placeholder fields (personalised variables) of your template.

The following lines should be your recipients' details and should match the order of column headers. You can have between 1 and 50,000 recipients.

#### Optional arguments

**scheduled_for (optional)**

If you want to send notifications in the future, you can specify a datetime up to 4 days in the future, in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601). For example: `2021-06-08T15:15:00` (UTC time).

**reply_to_id (optional)**

If you want to use a specific reply-to email address when sending emails, you can specify a reply-to email address ID.

To find your reply-to email address ID:

1. [Sign in to GC Notify](https://notification.canada.ca/sign-in).
1. Go to the __Settings__ page.
1. In the __Email__ section, select __Reply-to email addresses__
1. Copy the ID of the reply-to email address you want to use

By default, GC Notify will use your default reply-to email address if you don't specify one, or none if you didn't set up one.

**csv (optional)**

If you prefer to pass the content of CSV files instead of rows in the `rows` argument, you can do so. Pass the full content of your CSV file in a key named `csv`. Do not include the `rows` argument.

For example:

```json
{
  "name": "Bulk send name",
  "template_id": "f33517ff-2a88-4f6e-b855-c550268ce08a",
  "csv": "email address,name\nalice@example.com,Alice"
}
```


### Response

::: warning Response timeout
If you specify a response timeout when calling this endpoint, make sure it is set to 15 seconds. The GC Notify API could take a few seconds to validate your request and save the payload if you submit a large bulk sending job with many recipients.
:::

If the request is successful, the response body is `json` with a status code of `201`:

```json
{
   "data":{
      "api_key":{
         "id":"de1fafa2-fb2a-49c5-9b9a-8400727ecd29",
         "key_type":"team",
         "name":"Test"
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
      "original_file_name":"Bulk send name",
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

You can follow the progression of your bulk sending job from the GC Notify web interface.

If you scheduled your batch in the future, you can cancel it from the web interface.

### Error codes

If the request is not successful, the response body is `json`, refer to the table below for details.

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "You should specify either rows or csv"`<br>`}]`|Pass data through `rows` or `csv`|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "name is a required property"`<br>`}]`|Specify the `name` property|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "scheduled_for 42 is not of type string, null"`<br>`}]`|Check that you pass a valid ISO 8601 datetime|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "scheduled_for datetime cannot be in the past"`<br>`}]`|Check that you pass a datetime in the future|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "scheduled_for datetime can only be up to 96 hours in the future"`<br>`}]`|Check that you pass datetime at most 4 days in the future|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "scheduled_for datetime format is invalid. It must be a valid ISO8601 date time format, https://en.wikipedia.org/wiki/ISO_8601"`<br>`}]`|Check that you pass a valid [ISO 8601 datetime](https://en.wikipedia.org/wiki/ISO_8601)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Template not found"`<br>`}]`|Update template ID|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Template has been deleted"`<br>`}]`|Create a new template and update its ID|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Service is not allowed to send emails"`<br>`}]`|Turn on email sending in Settings|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Missing column headers: name"`<br>`}]`|Add the missing column header|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Duplicate column headers: name, NAME"`<br>`}]`|Remove the duplicate column headers|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Too many rows. Maximum number of rows allowed is 50000"`<br>`}]`|Pass less than 50,000 rows|
|`400`|`[{`<br>`{"error": "BadRequestError",`<br>`"message": "You cannot send to these recipients because you used a team and safelist API key."`<br>`}]`|Request to go live in Settings or use [a live API key](keys.md)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "You cannot send to these recipients because your service is in trial mode. You can only send to members of your team and your safelist."`<br>`}]`|Add more team members, update your safelist or request to go live|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "You only have 50 remaining messages before you reach your daily limit. You've tried to send 75 messages."`<br>`}]`|Remove rows in excess, try again tomorrow or request a limit increase|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Some rows have errors. Row 1 - name: Missing. Row 2 - email address: invalid recipient. Row 3 - name: Missing. Row 4 - name: Missing."`<br>`}]`|Make sure rows don't have missing values|
|`500`|`[{`<br>`"error": "Exception",`<br>`"message": "Internal server error"`<br>`}]`|GC Notify was unable to process the request. Re-send your notification.|

## CURL Example

Example to send a single notification

```
curl --request POST \
  --url https://api.notification.canada.ca/v2/notifications/email \
  --header 'Authorization: ApiKey-v1 YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --header 'base_url: https:///notification.canada.ca' \
  --data '{
        "email_address": "EMAIL_ADDRESS_TO_SEND_NOTIFICAITION",
        "template_id": "TEMPLATE_ID"
}'
```
