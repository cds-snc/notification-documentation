# API architecture

## Sending an email

![Alt](./images/Email.png "A diagram that shows how sending an email from a service goes through GC Notify to the provider who delivers it to the recipient. Then the delivery receipt goes back to the provider and GC Notify before being received by the service.")
1. The service sends an email notification to GC Notify.
1. GC Notify sends the email to the provider.
1. The provider delivers the email to the recipient.
1. The recipient receives the email and sends a delivery receipt to the provider.
1. The provider sends the delivery receipt to GC Notify.
1. GC Notify receives the delivery receipt and sends an API response to the service.
1. The service receives the API response.

## Sending a text message

![Alt](./images/Text.png "A diagram that shows how sending an email from a service goes through GC Notify to the provider who delivers it to the recipient. Then the delivery receipt goes back to the provider and GC Notify before being received by the service.")
1. The service sends a text message notification to GC Notify.
1. GC Notify sends the text message to the provider.
1. The provider delivers the text message to the recipient.
1. The recipient receives the text message and sends a delivery receipt to the provider.
1. The provider sends the delivery receipt to GC Notify.
1. GC Notify receives the delivery receipt and sends an API response to the service.
1. The service receives the API response.

## Getting the status of a message

![Alt](./images/Status.png "A diagram that shows how a notification status is requested and received, by querying the GC Notify database and sending the retrieved API response with the status.")
1. The service requests a notification status from GC Notify.
1. GC Notify queries the database and retrieves the notification status.
1. GC Notify sends the API response with the notification status to the service.
1. The service receives the API response...
