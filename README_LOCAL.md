# Tenot — local install (PC)

This project is dockerized. The easiest way to run it on a PC is via Docker Desktop.

## Requirements
- Docker Desktop (Windows/macOS) or Docker Engine (Linux)
- Docker Compose v2 (comes with Docker Desktop)

## Start (Windows)
Double-click:
- `scripts\install_local.bat`

Then open:
- http://localhost:8080

## Start (macOS/Linux)
Run:
```bash
chmod +x scripts/install_local.sh
./scripts/install_local.sh
```
Then open:
- http://localhost:8080

## Stop
```bash
docker compose -f docker-compose.local.yml down
```

## Data persistence
PostgreSQL data is stored in a Docker volume `pgdata`.

## Ports
- UI: http://localhost:8080
- Postgres: localhost:5432 (user/pass/db: tenot/tenot/tenot)

