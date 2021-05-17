# Get started

This documentation is for developers who want to integrate the [GC Notify](https://notification.canada.ca/) application programming interface (API) with their department's web application or back office system.

Integrating the GC Notify API allows you to send email or text messages automatically. You might do this if you have a system that tracks a business process, so that whenever there's a status change, your clients could receive a notification about the update.

## Base URL

```
https://api.notification.canada.ca
```
## Headers

**Authorization header**

The authorization header is an [API key](keys.md). You must include an authorization header.

The header consists of:

```json
"Authorization": "ApiKey-v1 YOUR-SECRET-KEY"
```

That secret key forms a part of your [API key](keys.md), which follows the format `{key_name}-{iss-uuid}-{secret-key-uuid}`.

For example, if your API key is
`my_test_key-26785a09-ab16-4eb0-8407-a37497a57506-3d844edf-8d35-48ac-975b-e847b4f122b0`:

* your API key name is `my_test_key`
* your iss (your service ID) is `26785a09-ab16-4eb0-8407-a37497a57506`
* your secret key is `3d844edf-8d35-48ac-975b-e847b4f122b0`

Therefore, you would need to set the HTTP header to the following value:

```json
"Authorization": "ApiKey-v1 3d844edf-8d35-48ac-975b-e847b4f122b0"
```

Note that your secret key is the last 36 characters of your API key.

**Content header**

The content header is `application/json`:

```json
"Content-Type": "application/json"
```
