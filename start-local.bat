@echo off
REM Colors and styling for Windows
cls
echo.
echo ========================================
echo.     OWL ROLES Job Portal Launcher
echo.
echo ========================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [INFO] Node.js version:
node -v

REM Start Backend
echo.
echo [INFO] Starting Backend on port 3000...
echo.
cd /d "%~dp0backend"
start "Backend Server" cmd /k "npm start"
timeout /t 3 /nobreak

REM Start Frontend
echo [INFO] Starting Frontend on port 5173...
echo.
cd /d "%~dp0frontend"
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo [SUCCESS] Both services are starting!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3000
echo.
echo [INFO] Keep this window open. Close it to stop all services.
echo.
pause
