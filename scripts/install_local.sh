#!/usr/bin/env bash
set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker not found. Install Docker Desktop (Windows/macOS) or Docker Engine (Linux)."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "docker compose not available. Install Docker Compose v2."
  exit 1
fi

if [ ! -f .env ]; then
  echo "JWT_SECRET=change_me_super_secret" > .env
  echo "Created .env. Please change JWT_SECRET for real projects."
fi

echo "==> Building and starting Tenot locally (HTTP on :8080)..."
docker compose -f docker-compose.local.yml up -d --build

echo "==> Running database migrations..."
docker compose -f docker-compose.local.yml exec -T api sh -lc "npx prisma migrate deploy"

echo "==> Done."
echo "Open: http://localhost:8080"
