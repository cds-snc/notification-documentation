# Pour commencer

Cette documentation s’adresse aux développeurs qui souhaitent intégrer l’interface de programmation d’application (API) de [GC Notification](https://notification.canada.ca/?lang=fr) à l’application Web ou au système administratif de leur ministère.

L’intégration de l’API GC Notification vous permet d’envoyer automatiquement des courriels ou des messages texte. Vous pouvez le faire si vous disposez d’un système qui suit un processus opérationnel, de sorte qu’à chaque fois qu’il y a une modification d’état, vos clients peuvent recevoir une notification à propos de la mise à jour.

## Adresse URL de base

```
https://api.notification.canada.ca
```
## En-têtes

**En-tête `Authorization`**

L’en-tête `Authorization` est une [clé API](cles.md). Vous devez inclure un en-tête d’autorisation.

L’en-tête comprend :

```json
"Authorization": "ApiKey-v1 VOTRE-CLÉ-SECRÈTE"
```

Cette clé secrète fait partie de votre [clé API](cles.md), qui suit le format `{nom_clé}-{iss-uuid}-{clé-secrète-uuid}`.

Par exemple, si votre clé API est
`ma_clé_test-26785a09-ab16-4eb0-8407-a37497a57506-3d844edf-8d35-48ac-975b-e84 7b4f122b0`:

* votre nom de clé API est `ma_clé_test`
* votre ISS (votre ID de service) est `26785a09-ab16-4eb0-8407-a37497a57506`
* votre clé secrète est `3d844edf-8d35-48ac-975b-e847b4f122b0`

Par conséquent, vous devez définir l’en-tête HTTP à la valeur suivante :

```json
"Authorization": "ApiKey-v1 3d844edf-8d35-48ac-975b-e847b4f122b0"
```

Veuillez noter que votre clé secrète représente les 36 derniers caractères de votre clé API.

**En-tête de contenu**

L’en-tête de contenu est `application/json` :

```json
"Content-Type": "application/json"
```
