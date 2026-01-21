#!/usr/bin/env bash
set -euo pipefail

if [ ! -f .env ]; then
  cat > .env <<'ENV'
JWT_SECRET=change_me_local_secret
ENV
  echo ".env created (please change JWT_SECRET if you want)."
fi

docker compose -f docker-compose.local.yml up -d --build

docker compose -f docker-compose.local.yml exec -T api sh -lc "npx prisma migrate deploy"

echo "\nDone! Open: http://localhost:8080"
