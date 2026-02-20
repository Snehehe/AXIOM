@echo off
title AXIOM Intelligence
cd /d "C:\Users\snehs\Downloads\axiom-intelligence-final\axiom-next"

if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
)

echo.
echo  Starting AXIOM Intelligence...
echo  Open your browser to: http://localhost:3000
echo.

start "" cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:3000"
npm run dev
pause
