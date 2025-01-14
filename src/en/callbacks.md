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

::: warning Health check requests

GC Notify sends health check requests to the URL you provided, to verify that we can reach and receive a response from your API.

```json
{
    "health_check": "true"
}
```
:::

We send these health checks when you:

- Set up callbacks.
- Update a callback configuration.
- Test your service's response time via the callbacks page.

:::tip GC Notify offers API response time testing

You can access it directly from our website. From your service dashboard, visit `API Integration > Callbacks`.
:::

## Maintaining your callbacks

When you set up API callbacks for your GCNotify service, make sure that your API has **consistent uptime** and can respond within **1 second.** It is important to:

- Maintain adequate API logging to help you diagnose issues.
- Identify and address bottlenecks in your code and infrastructure.
- Monitor and test your API's response times.


### Delivery retries and suspensions

GC Notify continues trying to deliver until a callback fails 25 times in 5 minutes. After that, we'll email to inform you there's a problem with your API.

::: warning Temporary suspensions

If GC Notify has **frequent** problems delivering callbacks to your API, we may **temporarily suspend callback deliveries for your service and send you an email with steps to resolve the suspension.

:::


## Message delivery receipts

When you send an email or text message, GC Notify will send a receipt to your callback URL to tell you if it was delivered or not. This is an automated method to get the status of messages.

This functionality works with test API keys, but does not work with smoke testing email addresses or phone numbers.

The callback message is formatted in JSON. All of the values are strings. The key, description and format of the callback message arguments will be:

|Key | Description | String format|
|:---|:---|:---|
|`id` | GC Notify’s id for the status receipts | UUID|
|`reference` | The reference sent by the service | 12345678|
|`to` | The email address or phone number of the recipient | hello@canada.ca or 01234567890|
|`status` | The status of the notification | `created`, `sending`, `pending`, `sent`, `delivered`, `permanent-failure`, `temporary-failure`, `technical-failure`, `pending-virus-check` or `virus-scan-failed`|
|`status_description` | Label for notification's delivery status | `In transit`, `In transit`, `In transit`, `Delivered`, `[Blocked | No such number | No such address]`, `[Content or inbox issue | Carrier issue]`, `Tech issue`, `In transit`, `Attachment has virus`|
|`provider_response` | The detailed response from the provider. This will only be not null in a case of a technical failure | `Blocked as spam by phone carrier` (or any other message) or nil|
|`created_at` | The time the service sent the request | `2017-05-14T12:15:30.000000Z`|
|`completed_at` | The last time the status was updated | `2017-05-14T12:15:30.000000Z` or nil|
|`sent_at` | The time the notification was sent | `2017-05-14T12:15:30.000000Z` or nil|
|`notification_type` | The notification type | `email` or `sms`|


::: warning Multiple callbacks for a notification

You might receive multiple callbacks for one sent notification. For example, the receiving mail server might accept the email (triggering a delivery notification), but after processing the email, the receiving mail server might determine that the email actually results in a bounce (triggering a bounce notification).

Callbacks are sent in the order they are received.

:::
