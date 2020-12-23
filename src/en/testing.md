# Testing

All testing takes place in the production environment. There is no test environment for GC Notify.

## Smoke testing

If you need to [smoke test](https://www.gov.uk/service-manual/technology/deploying-software-regularly#using-smoke-tests-after-you-deploy) your integration with GC Notify on a regular basis, you  must use the following smoke test phone numbers and email addresses.

<div style="height:1px;font-size:1px;">&nbsp;</div>

|Phone number|
|:---|
|+1613253222|
|+1613253222|
|+16132532224|


|Email address|
|:---|
|simulate-delivered@notification.canada.ca|
|simulate-delivered-2@notification.canada.ca|
|simulate-delivered-3@notification.canada.ca|

The smoke test phone numbers and email addresses will validate the request and simulate a successful response, but will not send a real message, produce a delivery receipt or persist the notification to the database.

You can use these smoke test numbers and addresses with any [type of API key](keys.md).

You can smoke test all Notify API client functions except:

- Get the status of one message
- Get the status of all messages

You cannot use the smoke test phone numbers or email address with these functions because they return a fake `notification_ID`. If you need to test these functions, use a test API key and any other phone number or email.

## Other testing

You must use a [test API key](keys.md#test) to do non-smoke testing such as performance or integration testing. You can use any non-smoke testing phone numbers or email addresses. You do not need a specific Notify testing account.

