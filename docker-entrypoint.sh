#!/bin/bash
set -euo pipefail

# Regenerate the runtime API base URL configuration consumed by the docs site.
# This lets a single Docker image serve staging and production while pointing at
# the correct API host, configured via the API_BASE_URL environment variable.
API_BASE_URL="${API_BASE_URL:-https://api.notification.canada.ca}"

cat > /usr/share/nginx/html/env-config.js <<EOF
window.__API_BASE_URL__ = "${API_BASE_URL}";
EOF

exec nginx -g "daemon off;"
