# Headers

## Authorization header

The authorization header is an [API key](#api-keys). You must include an authorization header.

The header consists of:

```json
  “Authorization” = API key
  “Authorization” = “apikey-v1 YOUR-SECRET-KEY”
```

That secret key forms a part of your [API key](#api-keys), which follows the format `{key_name}-{iss-uuid}-{secret-key-uuid}`.
