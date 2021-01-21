# Callbacks

A callback lets you receive messages from GC Notify to a URL you choose. Callbacks are when GC Notify sends `POST` requests to your service. You can get callbacks when a text message or email you’ve sent is delivered or fails.

You'll need to provide a bearer token, for security. We'll add this to the authorisation header of the callback request.

## Set up callbacks

You must provide:

- a URL where GC Notify will post the callback to
- a bearer token, for security, which GC Notify will put in the authorisation header of the requests

To do this:

1. [Sign in to GC Notify](https://notification.canada.ca/sign-in).
1. Go to the __API integration__ page.
1. Select __Callbacks__.

When creating a bearer token, you should:

- Keep your bearer token secure
- Change it if you have any reason to think it might no longer be trusted
- Make sure that callbacks you receive from GC Notify contain your bearer token in the `Authorisation` header
- Use a hashed value so that GC Notify doesn't hold the true token

## Message delivery receipts

When you send an email or text message, GC Notify will send a receipt to your callback URL to tell you if it was delivered or not. This is an automated method to get the status of messages.

This functionality works with test API keys, but does not work with smoke testing email addresses or phone numbers.

The callback message is formatted in JSON. All of the values are strings. The key, description and format of the callback message arguments will be:

|Key | Description | Format|
|:---|:---|:---|
|`id` | GC Notify’s id for the status receipts | UUID|
|`reference` | The reference sent by the service | 12345678|
|`to` | The email address or phone number of the recipient | hello@canada.ca or 01234567890|
|`status` | The status of the notification | `delivered`, `permanent-failure`, `temporary-failure` or `technical-failure`|
|`created_at` | The time the service sent the request | `2017-05-14T12:15:30.000000Z`|
|`completed_at` | The last time the status was updated | `2017-05-14T12:15:30.000000Z` or nil|
|`sent_at` | The time the notification was sent | `2017-05-14T12:15:30.000000Z` or nil|
|`notification_type` | The notification type | `email` or `sms`|
