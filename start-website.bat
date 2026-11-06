@echo off
setlocal

cd /d "%~dp0frontend"
if errorlevel 1 (
  echo Could not find the frontend folder.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js and npm are required. Install Node.js, then run this file again.
  pause
  exit /b 1
)

if not exist "node_modules\vite\bin\vite.js" (
  echo Installing website dependencies...
  call npm ci
  if errorlevel 1 (
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

echo.
echo Starting Titan Gym website...
echo Open this address: http://localhost:5173/
echo Keep this window open while you use the website.
echo Press Ctrl+C here to stop the website.
echo.
call npm run dev -- --host 127.0.0.1 --strictPort --open

pause
