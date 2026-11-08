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
echo Desktop: http://localhost:5173/
for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "$config = Get-NetIPConfiguration | Where-Object { $_.NetAdapter.Status -eq 'Up' -and $_.IPv4DefaultGateway } | Select-Object -First 1; $config.IPv4Address.IPAddress | Select-Object -First 1"`) do set "LAN_IP=%%I"
if defined LAN_IP (
  echo Phone or tablet on the same Wi-Fi: http://%LAN_IP%:5173/
) else (
  echo Find your computer's IPv4 address with ipconfig to open this on your phone.
)
echo Keep this window open while you use the website.
echo Press Ctrl+C here to stop the website.
echo.
call npm run dev -- --host 0.0.0.0 --strictPort --open

pause
