::: code-group

```java [Java]
import uk.gov.service.notify.NotificationClient;

NotificationClient client = new NotificationClient(apiKey, "https://api.notification.canada.ca");
```

```vbnet [.NET]
using Notify.Client;

var client = new NotificationClient("https://api.notification.canada.ca", apiKey);
```

```php [PHP]
require __DIR__ . '/vendor/autoload.php';

$notifyClient = new \Alphagov\Notifications\Client([
  'baseUrl' => "https://api.notification.canada.ca",
  'apiKey' => 'your-api-key',
  'httpClient' => new \Http\Adapter\Guzzle6\Client
]);
```

```js [Node.js]
NotifyClient("https://api.notification.canada.ca", apiKey)
```

```python [Python]
from notifications_python_client.notifications import NotificationsAPIClient

notifications_client = NotificationsAPIClient(
    api_key,
    base_url="https://api.notification.canada.ca"
)
```

```ruby [Ruby]
require 'notifications/client'

client = Notifications::Client.new(api_key, "https://api.notification.canada.ca")
```

:::
