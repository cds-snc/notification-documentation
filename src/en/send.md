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

**template_id (required)**

To find the `template_id`:

1. [Sign in to GC Notify](https://notification.canada.ca/sign-in).
1. Go to the __Templates__ page and select the relevant template.
1. Select __Copy template ID to clipboard__.

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

`email_reply_to_id` is an email address specified by you to receive replies from your users. You must add at least one reply-to email address before your service can go live.

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

## Sending a file by email

::: warning Enabling this feature

Sending files by email is an API-only feature. To turn on this feature, [contact us](https://notification.canada.ca/contact).
:::

### File types and size requirements
You can upload PDF, CSV, .jpeg, .png, .odt, .txt, .rtf,  Microsoft Excel and Microsoft Word Document files. Your email including the file must be smaller than 10MB.

If you need to send other file types, [contact us](https://notification.canada.ca/contact).

### Sending methods

You can send files in two ways on GC Notify:

1. directly attached to the email
1. with a unique link to download from the email

You are able to control how files are delivered to recipients on every
API call. GC Notify cannot access or decrypt your files.

::: tip Choosing a sending method

People generally expect files to be directly attached to emails. With that in mind, it’s not uncommon to see attachments being blocked by security rules or email providers. Use the unique link method to prevent your attachments from being blocked. Linked files will expire 1 year after the message has been sent.

Before choosing a sending method, perform tests to see what works best for your use case.

:::

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

If the request is not successful, the response body is `json`, refer to the table below for details.

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient using a team-only API key"`<br>`}]`|Use the correct type of [API key](keys.md)|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Can't send to this recipient when service is in trial mode`<br>`}]`|Your service cannot send this notification in trial mode. You can request to go live in settings.|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Unsupported file type '(FILE TYPE)'. Supported types are: '(ALLOWED TYPES)"`<br>`}]`|Wrong file type. You can only upload .pdf, .csv, .txt, .jpeg, .png, .doc, .docx, .xls, .xlsx, .rtf or .odt files|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "File did not pass the virus scan"`<br>`}]`|The file contains a virus|
|`400`|`[{`<br>`"error": "BadRequestError",`<br>`"message": "Send files by email has not been set up - add contact details for your service"`<br>`}]`|See how to add contact details to the file download page|
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

**template_id (required)**

To find the `template_id`:

1. [Sign in to GC Notify](https://notification.canada.ca/sign-in).
1. Go to the __Templates__ page and select the relevant template.
1. Select __Copy template ID to clipboard__.

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
