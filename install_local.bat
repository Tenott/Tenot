@echo off
setlocal enabledelayedexpansion

if not exist .env (
  echo JWT_SECRET=change_me_local_secret> .env
  echo .env created (please change JWT_SECRET if you want).
)

docker compose -f docker-compose.local.yml up -d --build
if errorlevel 1 goto :err

docker compose -f docker-compose.local.yml exec -T api sh -lc "npx prisma migrate deploy"
if errorlevel 1 goto :err

echo.
echo Done! Open: http://localhost:8080
exit /b 0

:err
echo.
echo ERROR: install failed. Make sure Docker Desktop is running.
exit /b 1
