# Bibliothèques client

[GC Notification](https://notification.canada.ca/?lang=fr) est basé sur le système de notification du gouvernement britannique. Par conséquent, l'API est également disponible en utilisant les clients développés par [GOV.UK](https://www.notifications.service.gov.uk/) (disponible en anglais seulement).

## Avant d'intégrer l'API

Vous devrez modifier votre point de terminaison :

<Content :page-key="$site.pages.find(p => p.relativePath === 'en/_api_endpoints.md').key"/>

::: warning Différences de fonctionnalités à considérer

- [L'envoi de fichiers par courriel est différent avec GC Notification](envoyer.md#envoyer-un-fichier-par-courriel)
- L'envoi de lettres n'est pas disponible
- La réception de messages texte n'est pas disponible
:::

## Clients de GOV.UK

* [Java](https://docs.notifications.service.gov.uk/java.html) (disponible en anglais seulement)
* [.NET](https://docs.notifications.service.gov.uk/net.html)  (disponible en anglais seulement)
* [NodeJS](https://docs.notifications.service.gov.uk/node.html)  (disponible en anglais seulement)
* [PHP](https://docs.notifications.service.gov.uk/php.html)  (disponible en anglais seulement)
* [Python](https://docs.notifications.service.gov.uk/python.html)  (disponible en anglais seulement)
* [Ruby](https://docs.notifications.service.gov.uk/ruby.html)  (disponible en anglais seulement)
