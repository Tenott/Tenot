#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <backup_file.sql.gz>"
  exit 1
fi

FILE="$1"
if [[ ! -f "$FILE" ]]; then
  echo "File not found: $FILE"
  exit 1
fi

echo "Restoring: $FILE"
gunzip -c "$FILE" | docker compose exec -T db psql -U autoparts -d autoparts
echo "Done."
