#!/usr/bin/env bash
set -euo pipefail

# Copies /etc/letsencrypt into ./infra/nginx/ssl so the nginx container can read certs.
# Run this after certbot renew.

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ $EUID -ne 0 ]]; then
  echo "Please run as root (needed to read /etc/letsencrypt)."
  exit 1
fi

cd "$PROJECT_ROOT"

mkdir -p infra/nginx/ssl
rsync -a /etc/letsencrypt/ infra/nginx/ssl/

# Ensure nginx container reloads new certs
docker compose restart nginx

echo "Synced /etc/letsencrypt -> infra/nginx/ssl and restarted nginx."
