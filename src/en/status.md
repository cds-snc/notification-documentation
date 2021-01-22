# Get message status

You can use the GC Notify API to retrieve the status of one or more messages.

Message status depends on the type of message you have sent.

You can only get the status of messages that are 7 days old or newer (by default). Data retention can be configured to be anywhere between 3 and 90 days at either the service or notification level.

## Email status

|Status|Information|
|:---|:---|
|Created|GC Notify has placed the message in a queue, ready to be sent to the provider. It should only remain in this state for a few seconds.|
|Sending|GC Notify has sent the message to the provider. The provider will try to deliver the message to the recipient for up to 72 hours. GC Notify is waiting for delivery information.|
|Delivered|The message was successfully delivered.|
|Failed|This covers all failure statuses:<br>- `permanent-failure` - "The provider could not deliver the message because the email address was wrong. You should remove these email addresses from your database."<br>- `temporary-failure` - "The provider could not deliver the message. This can happen when the recipient’s inbox is full. You can try to send the message again."<br>- `technical-failure` - "Your message was not sent because there was a problem between GC Notify and the provider.<br>You’ll have to try sending your messages again."|

## Text message status

|Status|Information|
|:---|:---|
|Created|GC Notify has placed the message in a queue, ready to be sent to the provider. It should only remain in this state for a few seconds.|
|Sending|GC Notify has sent the message to the provider. The provider will try to deliver the message to the recipient for up to 72 hours. GC Notify is waiting for delivery information.|
|Pending|GC Notify is waiting for more delivery information.<br>GC Notify received a callback from the provider but the recipient’s device has not yet responded. Another callback from the provider determines the final status of the notification.|
|Sent / Sent internationally|The message was sent to an international number. The mobile networks in some countries do not provide any more delivery information. The GC Notify client API returns this status as `sent`. The GC Notify client app returns this status as `Sent to an international number`.|
|Delivered|The message was successfully delivered.|
|Failed|This covers all failure statuses:<br>- `permanent-failure` - "The provider could not deliver the message. This can happen if the phone number was wrong or if the network operator rejects the message. If you’re sure that these phone numbers are correct, you should [contact us](https://notification.canada.ca/contact). If not, you should remove them from your database. You’ll still be charged for text messages that cannot be delivered."<br>- `temporary-failure` - "The provider could not deliver the message. This can happen when the recipient’s phone is off, has no signal, or their text message inbox is full. You can try to send the message again. You’ll still be charged for text messages to phones that are not accepting messages."<br>- `technical-failure` - "Your message was not sent because there was a problem between GC Notify and the provider.<br>You’ll have to try sending your messages again. You will not be charged for text messages that are affected by a technical failure."|

## Get the status of one message

You can use the GC Notify API to get a single message status.

```
GET /v2/notifications/{notification_id}
```

### Query parameters

#### notification_id (required)

The ID of the notification. You can find the notification ID in the response to the original notification method call.

You can also find it by [signing in to GC Notify](https://notification.canada.ca/sign-in) and going to the __API integration__ page.

You can filter the returned messages by including the following optional parameters in the URL:

- `template_type`
- `status`
- `reference`
- `older_than`

### Response

If the request is successful, the response body is `json` and the status code is `200`:

```json
{
  "id": "740e5834-3a29-46b4-9a6f-16142fde533a", # required string - notification ID
  "reference": "STRING", # optional string
  "email_address": "sender@something.com",  # required string for emails
  "phone_number": "+447900900123",  # required string for text messages
  "type": "email / sms", # required string
  "status": "sending / delivered / permanent-failure / temporary-failure / technical-failure", # required string
  "template": {
    "Version": 1
    "id": "f33517ff-2a88-4f6e-b855-c550268ce08a" # required string - template ID
    "uri": "/v2/template/{id}/{version}", # required
  },
  "body": "STRING", # required string - body of notification
  "subject": "STRING" # required string for email - subject of email
  "created_at": "STRING", # required string - date and time notification created
  "created_by_name": "STRING", # optional string - name of the person who sent the notification if sent manually
  "sent_at": "STRING", # optional string - date and time notification sent to provider
  "completed_at:" "STRING" # optional string - date and time notification delivered or failed
}
```

### Error codes

If the request is not successful, the response body is `json`, refer to the table below for details.

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "id is not a valid UUID"`<br>`}]`|Check the notification ID|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Error: Your system clock must be accurate to within 30 seconds"`<br>`}]`|Check your system clock|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Invalid token: API key not found"`<br>`}]`|Use the correct API key. Refer to [API keys](keys.md) for more information|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Check the notification ID|


## Get the status of multiple messages

You can use the GC Notify API to find the status of multiple messages at the same time.

This API call returns one page of up to 250 messages and statuses. You can get either the most recent messages, or get older messages by specifying a particular notification ID in the `older_than` argument.

You can only get the status of messages that are 7 days old or newer (by default). Data retention can be configured to be anywhere between 3 and 90 days at either the service or notification level.

```
GET /v2/notifications
```

#### All messages

This will return all your messages with statuses. They will display in pages of up to 250 messages each.

You can filter the returned messages by including the following optional arguments in the URL:

- `template_type`
- `status`
- `reference`
- `older_than`

### Arguments

You can omit any of these arguments to ignore these filters.

#### template_type (optional)

You can filter by:

* `email`
* `sms`

#### status (optional)

You can filter by each:

* email status
* text message status

You can leave out this argument to ignore this filter.

#### reference (optional)

An identifier you can create if necessary. This reference identifies a single notification or a batch of notifications. It must not contain any personal information such as name or postal address. For example:

```json
"reference": "STRING"
```

#### older_than (optional)

Input the ID of a notification into this argument. If you use this argument, the method returns the next 250 received notifications older than the given ID.

```
"older_than":"740e5834-3a29-46b4-9a6f-16142fde533a"
```

If you leave out this argument, the method returns the most recent 250 notifications.

The client only returns notifications that are 7 days old or newer. If the notification specified in this argument is older than 7 days, the client returns an empty response.

### Response

If the request is successful, the response body is `json` and the status code is `200`.

#### All messages

```json
{
  "notifications": [
    {
      "id": "740e5834-3a29-46b4-9a6f-16142fde533a", # required string - notification ID
      "reference": "STRING", # optional string - client reference
      "email_address": "sender@something.com",  # required string for emails
      "phone_number": "+447900900123",  # required string for text messages
      "type": "email / sms", # required string
      "status": "sending / delivered / permanent-failure / temporary-failure / technical-failure", # required string
      "template": {
        "version": 1
        "id": 'f33517ff-2a88-4f6e-b855-c550268ce08a' # required string - template ID
        "uri": "/v2/template/{id}/{version}", # required
      },
      "body": "STRING", # required string - body of notification
      "subject": "STRING" # required string for email - subject of email
      "created_at": "STRING", # required string - date and time notification created
      "created_by_name": "STRING", # optional string - name of the person who sent the notification if sent manually
      "sent_at": " STRING", # optional string - date and time notification sent to provider
      "completed_at": "STRING" # optional string - date and time notification delivered or failed
    },
    …
  ],
  "links": {
    "current": "/notifications?template_type=sms&status=delivered",
    "next": "/notifications?other_than=last_id_in_list&template_type=sms&status=delivered"
  }
}
```

### Error codes

If the request is not successful, the response body is `json`, refer to the table below for details.

|status_code|message|How to fix|
|:---|:---|:---|
|`400`|`[{`<br>`"error": "ValidationError",`<br>`"message": "id is not a valid UUID"`<br>`}]`|Check the notification ID|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Error: Your system clock must be accurate to within 30 seconds"`<br>`}]`|Check your system clock|
|`403`|`[{`<br>`"error": "AuthError",`<br>`"message": "Invalid token: API key not found"`<br>`}]`|Use the correct [API key](keys.md)|
|`404`|`[{`<br>`"error": "NoResultFound",`<br>`"message": "No result found"`<br>`}]`|Check the notification ID|
