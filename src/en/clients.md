# Client libraries

[GC Notify](https://notification.canada.ca/) was based on the UK government's notification system. Therefore, the API is also available using the clients developed by [GOV.UK](https://www.notifications.service.gov.uk/).


### Before integrating the API

You will need to change the API endpoint when creating a client.

<Content :page-key="$site.pages.find(p => p.relativePath === 'en/_api_endpoints.md').key"/>

::: warning Feature differences to keep in mind

- [Sending files by email is different with GC Notify](send.md#sending-files-by-email-is-an-API-only-feature)
- Sending bulk notifications through the GOV.UK Notify clients is not directly supported. You can still use one if the client supports customization of the URL endpoint
- Sending letters is not available
- Receiving text messages is not available
:::

### GOV.UK Notify clients

* [Java](https://docs.notifications.service.gov.uk/java.html)
* [.NET](https://docs.notifications.service.gov.uk/net.html)
* [NodeJS](https://docs.notifications.service.gov.uk/node.html)
* [PHP](https://docs.notifications.service.gov.uk/php.html)
* [Python](https://docs.notifications.service.gov.uk/python.html)
* [Ruby](https://docs.notifications.service.gov.uk/ruby.html)



