// Runtime API base URL configuration.
//
// In containerised deployments this file is regenerated at container startup
// from the API_BASE_URL environment variable (see docker-entrypoint.sh), which
// allows a single Docker image to serve staging and production while pointing
// at the correct API host.
//
// For static builds (GitHub Pages) and local development the assignment below is
// conditional, so it preserves the build-time value already set in the page head.
window.__API_BASE_URL__ = window.__API_BASE_URL__ || "https://api.notification.canada.ca";
