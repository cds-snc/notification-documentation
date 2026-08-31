# Obtenir l’état d’un envoi de masse

Vous pouvez utiliser l’API Notification GC pour récupérer l’état et les statistiques des notifications d’un envoi de masse.

## Obtenir la liste des envois de masse

```
GET /v2/notifications/bulk
```

Ce point de terminaison retourne les envois de masse créés par le service associé à votre clé API, du plus récent au plus ancien. La réponse est paginée.

### Paramètres de requête

#### older_than (facultatif)

Utilisez l’identifiant d’un envoi de masse de la page précédente pour obtenir les envois plus anciens. L’adresse de la page suivante est retournée dans `links.next` lorsqu’une autre page est disponible. Vous pouvez utiliser directement cette adresse ou transmettre sa valeur `older_than` dans une nouvelle demande.

```json
"older_than": "684fca45-42d9-4cae-bf84-22a9f5fc9e6f"
```

### Réponse

Si la demande est acceptée, le corps de la réponse est en format `json` et le code d’état est `200` :

```json
{
  "bulk_jobs": [
    {
      "id": "684fca45-42d9-4cae-bf84-22a9f5fc9e6f",
      "original_file_name": "Nom de l’envoi de masse",
      "notification_count": 3,
      "template": "055d4e5c-27c2-4ea6-8736-d4c328279acf",
      "template_version": 4,
      "template_type": "email",
      "service": "f8ea1d5f-95db-4374-a6ad-5251a26173c8",
      "service_name": { "name": "Service de test" },
      "created_by": {
        "id": "6887e196-437f-4e3a-aaee-c152dc54c900",
        "name": "Utilisateur du service Notification"
      },
      "api_key": {
        "id": "0bc38ecd-8be3-4896-a3f3-fc8178a782d6",
        "name": "Test",
        "key_type": "team"
      },
      "job_status": "pending",
      "scheduled_for": null,
      "processing_started": null,
      "processing_finished": null,
      "created_at": "2021-06-10T17:14:15.341308+00:00",
      "updated_at": null,
      "archived": false,
      "sender_id": null,
      "statistics": [
        { "status": "delivered", "count": 2 },
        { "status": "failed", "count": 1 }
      ]
    }
  ],
  "links": {
    "current": "https://api.notification.canada.ca/v2/notifications/bulk",
    "next": "https://api.notification.canada.ca/v2/notifications/bulk?older_than=684fca45-42d9-4cae-bf84-22a9f5fc9e6f"
  }
}
```

`statistics` contient une entrée pour chaque état de notification et son nombre. Le tableau est vide lorsqu’aucune statistique n’est disponible.

## Obtenir un envoi de masse par son identifiant

```
GET /v2/notifications/bulk/{job_id}
```

Utilisez ce point de terminaison pour récupérer un envoi de masse et son état actuel. La réponse contient les mêmes champs que ceux du point de terminaison de la liste et est enveloppée dans un objet `data`.

### job_id (obligatoire)

L’identifiant de l’envoi de masse. Vous le trouverez dans la réponse de `POST /v2/notifications/bulk` ou dans la réponse `bulk_jobs` du point de terminaison de la liste.

## Codes d’erreur

|status_code|message|Comment réparer|
|:---|:---|:---|
|`400`|Identifiant ou valeur `older_than` invalide|Vérifiez que la valeur est un UUID valide. L’envoi de masse indiqué par `older_than` doit appartenir à votre service.|
|`403`|`AuthError`|Utilisez la bonne [clé API](cles.md).|
|`404`|`JobNotFoundError`|Vérifiez l’identifiant de l’envoi de masse.|
