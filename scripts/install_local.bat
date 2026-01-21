@echo off
setlocal

where docker >nul 2>nul
if errorlevel 1 (
  echo Docker not found. Install Docker Desktop first.
  exit /b 1
)

echo ==^> Building and starting Tenot locally (HTTP on :8080)...
docker compose -f docker-compose.local.yml up -d --build
if errorlevel 1 exit /b 1

echo ==^> Running database migrations...
docker compose -f docker-compose.local.yml exec -T api sh -lc "npx prisma migrate deploy"
if errorlevel 1 exit /b 1

echo ==^> Done.
echo Open: http://localhost:8080
endlocal
