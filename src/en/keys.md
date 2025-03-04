# API keys

## Security

Always follow these steps:
1. Use a modern, secure web browser.
1. Apply security patches within 30 days of release.
1. Keep API keys in an encrypted file that’s only for authorized staff. Do not share by email, support tickets or put in plain text in a source code repository.
1. Rotate keys whenever anyone with key access leaves your team.
1. Give third-party users a unique API key.

We recommend using a cloud service provider’s key management service to keep API keys secure.

## Key types

There are three different types of API keys:

- test
- team and safelist
- live

When you set up a new service it will start in trial mode. A service in trial mode can create either __test__ or __team and safelist__ keys. You must have a live service to create a __live key__.

To create an API key:

1. [Sign in to GC Notify](https://notification.canada.ca/sign-in).
1. Go to the __API integration__ page.
1. Select __API keys__.
1. Select __Create an API key__.

## Test

Use a test key to test the performance of your service and its integration with GC Notify.

Messages sent using a test key:

- generate realistic responses
- result in a delivered status
- are not actually delivered to a recipient
- do not appear on your dashboard
- do not count against your email and text message allowances

To test failure responses with a test key, use the following numbers and addresses:

|Phone number/Email address|Response|
|:---|:---|
|+15149301633|`temporary-failure`|
|+15149301632|`permanent-failure`|
|temp-fail@simulator.notify|`temporary-failure`|
|perm-fail@simulator.notify|`permanent-failure`|
|any other valid number or address|`delivered`|

You do not have to revoke test keys.

## Team and safelist

A team and safelist key lets you send real messages to your team members and addresses/numbers on your safelist while your service is still in trial mode.

You will get an error if you use these keys to send messages to anyone who is not on your team or your safelist.

Messages sent with a team and safelist key appear on your dashboard and count against your email and text message allowances.

You do not have to revoke team and safelist keys.

## Live

You can only create live keys once your service is live. You can use live keys to send messages to anyone. Request to go live in settings.

Messages sent with a live key appear on your dashboard and count against your text message and email allowances.

You should revoke and re-create these keys on a regular basis. To revoke a key:

1. [Sign in to GC Notify](https://notification.canada.ca/sign-in).
1. Go to the __API integration__ page.
1. Select __API keys__.
1. Select __Revoke__ for the API key you want to revoke.

You can have more than one active key at a time.

You should never send test messages to invalid numbers or addresses using a live key.
