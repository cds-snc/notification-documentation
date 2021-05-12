# Callbacks

Callbacks can automate the production of a delivery receipt or persist the status of a notification to your database.

A callback lets you receive messages about the state of notifications from GC Notify to a URL you choose. Callbacks are when GC Notify sends `POST` requests to your system. You can get callbacks when an email or text message you’ve sent is delivered or fails.

You'll need to provide a `Bearer` token, for security. We'll add this to the authorization header of the callback request.

## Set up callbacks

You must provide:

- a URL where Notify will post the callback to
- a `Bearer` token, for security, which GC Notify will put in the authorization header of the requests

To do this:

1. [Sign in to GC Notify](https://notification.canada.ca/sign-in).
1. Go to the __API integration__ page.
1. Select __Callbacks__.

When creating a `Bearer` token, you should:

- Keep your `Bearer` token secure
- Change it if you have any reason to think it might no longer be trusted
- Make sure that callbacks you receive from GC Notify contain your bearer token in the `Authorization` header
- Use a hashed value so that GC Notify doesn't hold the true token

## Message delivery receipts

When you send an email or text message, GC Notify will send a receipt to your callback URL to tell you if it was delivered or not. This is an automated method to get the status of messages.

This functionality works with test API keys, but does not work with smoke testing email addresses or phone numbers.

The callback message is formatted in JSON. All of the values are strings. The key, description and format of the callback message arguments will be:

|Key | Description | String format|
|:---|:---|:---|
|`id` | GC Notify’s id for the status receipts | UUID|
|`reference` | The reference sent by the service | 12345678|
|`to` | The email address or phone number of the recipient | hello@canada.ca or 01234567890|
|`status` | The status of the notification | `delivered`, `permanent-failure`, `temporary-failure` or `technical-failure`|
|`provider_response` | The detailed response from the provider. This will only be not null in a case of a technical failure | `Blocked as spam by phone carrier` (or any other message) or nil|
|`created_at` | The time the service sent the request | `2017-05-14T12:15:30.000000Z`|
|`completed_at` | The last time the status was updated | `2017-05-14T12:15:30.000000Z` or nil|
|`sent_at` | The time the notification was sent | `2017-05-14T12:15:30.000000Z` or nil|
|`notification_type` | The notification type | `email` or `sms`|


::: warning Multiple receipts for a notification

You might receive multiple callbacks for one notification. For example, the receiving mail server might accept the email (triggering a delivery notification), but after processing the email, the receiving mail server might determine that the email actually results in a bounce (triggering a bounce notification).

Callbacks are sent in the order they are received.

:::
