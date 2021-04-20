# Limits

## Rate limits

You’re limited to doing 1,000 API requests per minute.

This limit is calculated on a rolling basis, per API key type. If you exceed the limit, you will get a `429` error `RateLimitError`.

::: tip Adjusting the API rate limit

This rate limit can be changed if you need. To request an API rate limit increase, [contact us](https://notification.canada.ca/contact).

:::

## Daily limits

There’s a limit to the number of messages you can send each day:

|Service status|Type of API key|Daily limit|
|:---|:---|:---|
|Live|Team or live|Customized according to your needs|
|Trial|Team|50|
|Live or trial|Test|Unlimited|

These limits reset at midnight UTC. All team members will receive an email if you reach 80% of your daily limit and if you reach your daily limit.

You can request to go live in settings.

::: tip Adjusting your daily limit

The daily limit can be changed if you need. To request a limit increase, [contact us](https://notification.canada.ca/contact).

:::

## Phone network limits

If you repeatedly send text messages to the same number the phone networks will block them.

There’s an hourly limit of:

- 20 messages with the same content
- 100 messages with any content

Your messages may not be delivered if you exceed these limits.
