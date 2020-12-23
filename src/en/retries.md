# Retries and timeouts

You should send requests to our API with a sensible timeout value like 1-2 seconds and retry 502/503 requests with an exponential backoff.
