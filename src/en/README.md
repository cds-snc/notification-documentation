# Connect to the API

Integrate the GC Notify API with your web application or back office system to send email or text messages automatically. 

## Base URL
```
https://api.notification.canada.ca
```

## Headers

### Authorisation header

The authorisation header is an [API key](#api-keys). You must include an authorisation header.

The header consists of:

```json
  “Authorization”: “apikey-v1 YOUR-SECRET-KEY”
```

That secret key forms a part of your [API key](#api-keys), which follows the format `{key_name}-{iss-uuid}-{secret-key-uuid}`.

For example, if your API key is
`my_test_key-26785a09-ab16-4eb0-8407-a37497a57506-3d844edf-8d35-48ac-975b-e847b4f122b0`:

* your API key name is `my_test_key`
* your iss (your service id) is `26785a09-ab16-4eb0-8407-a37497a57506`
* your secret key is `3d844edf-8d35-48ac-975b-e847b4f122b0`

### Content header

The content header is `application/json`:

```json
"Content-type": "application/json"
```
