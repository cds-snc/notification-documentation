# Get started

## Base URL

```
https://api.notification.canada.ca
```
## Headers

**Authorization header**

The authorization header is an [API key](keys.md). You must include an authorization header.

The header consists of:

```json
"Authorization": "ApiKey-v1 YOUR-API-KEY"
```

Your [API key](keys.md) follows the format `{key_name}-{iss-uuid}-{secret-key-uuid}`.

For example, if your API key is
`my_test_key-26785a09-ab16-4eb0-8407-a37497a57506-3d844edf-8d35-48ac-975b-e847b4f122b0`:

* your API key name is `my_test_key`
* your iss (your service ID) is `26785a09-ab16-4eb0-8407-a37497a57506`
* your secret key is `3d844edf-8d35-48ac-975b-e847b4f122b0`

::: tip NEW: Include the entire API key when calling the API
&nbsp;
:::

When calling the API, you need to include your entire API key in the HTTP header:
```json
"Authorization": "ApiKey-v1 my_test_key-26785a09-ab16-4eb0-8407-a37497a57506-3d844edf-8d35-48ac-975b-e847b4f122b0"
```

**Content header**

The content header is `application/json`:

```json
"Content-Type": "application/json"
```
