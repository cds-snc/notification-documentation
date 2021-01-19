# Pour commencer

## Adresse URL de base

```
https://api.notification.canada.ca
```
## En-têtes

**En-tête d’autorisation**

L’en-tête d’autorisation est une [clé API](keys.md). Vous devez inclure un en-tête d’autorisation.

L’en-tête comprend :

```json
"Authorisation": "ApiKey-v1 VOTRE-CLÉ-SECRÈTE"
```

Cette clé secrète fait partie de votre [clé API](keys.md), qui suit le format `{nom_clé}-{iss-uuid}-{clé-secrète-uuid}".

Par exemple, si votre clé API est
`ma_clé_test-26785a09-ab16-4eb0-8407-a37497a57506-3d844edf-8d35-48ac-975b-e84 7b4f122b0`:

* votre nom de clé API est `ma_clé_test`
* votre ISS (votre ID de service) est `26785a09-ab16-4eb0-8407-a37497a57506`
* votre clé secrète est `3d844edf-8d35-48ac-975b-e847b4f122b0`

Par conséquent, vous devez définir l’en-tête HTTP à la valeur suivante :

```json
"Authorisation": "ApiKey-v1 3d844edf-8d35-48ac-975b-e847b4f122b0"
```

Veuillez noter que votre clé secrète représente les 36 derniers caractères de votre clé API.

**En-tête de contenu**

L’en-tête de contenu est "application/json" :

```json
"Content-Type": "application/json"
```

