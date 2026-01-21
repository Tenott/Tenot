#!/usr/bin/env bash
set -euo pipefail

TS="$(date +%F_%H-%M-%S)"
OUT_DIR="./backups"
mkdir -p "$OUT_DIR"

# Dumps from the running Postgres container and stores a gzipped SQL file.
docker compose exec -T db pg_dump -U autoparts -d autoparts \
  | gzip > "${OUT_DIR}/autoparts_${TS}.sql.gz"

echo "Backup saved: ${OUT_DIR}/autoparts_${TS}.sql.gz"
