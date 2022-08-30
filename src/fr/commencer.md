# Pour commencer

## Adresse URL de base

```
https://api.notification.canada.ca
```
## En-têtes

**En-tête `Authorization`**

L’en-tête `Authorization` est une [clé API](cles.md). Vous devez inclure un en-tête d’autorisation.

L’en-tête comprend :

```json
"Authorization": "ApiKey-v1 VOTRE-CLÉ-API"
```

Cette [clé API](cles.md) suit le format `{nom_clé}-{iss-uuid}-{clé-secrète-uuid}`.

Par exemple, si votre clé API est
`ma_clé_test-26785a09-ab16-4eb0-8407-a37497a57506-3d844edf-8d35-48ac-975b-e84 7b4f122b0`:

* votre nom de clé API est `ma_clé_test`
* votre ISS (votre ID de service) est `26785a09-ab16-4eb0-8407-a37497a57506`
* votre clé secrète est `3d844edf-8d35-48ac-975b-e847b4f122b0`

::: tip NOUVEAU: Inclure la clé API entière lorsque vous appelez l'API
&nbsp;
:::

Vous devez fournir la clé entière dans l’en-tête HTTP lorsque vous appelez l'API :

```json
"Authorization": "ApiKey-v1 3d844edf-8d35-48ac-975b-e847b4f122b0"
```

**En-tête de contenu**

L’en-tête de contenu est `application/json` :

```json
"Content-Type": "application/json"
```
