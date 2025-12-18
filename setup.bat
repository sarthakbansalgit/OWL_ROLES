@echo off
REM Cubicals Project Setup Script for Windows
REM This script will setup the project and start both frontend and backend servers
REM IMPORTANT: All credentials and API keys are shown clearly - CUSTOMIZE BEFORE PRODUCTION!

setlocal enabledelayedexpansion

REM Check if running from correct directory
if not exist "backend" (
    color 0C
    echo.
    echo ERROR: backend folder not found!
    echo Please run this script from the project root directory (OWL_ROLES)
    echo.
    pause
    exit /b 1
)

if not exist "frontend" (
    color 0C
    echo.
    echo ERROR: frontend folder not found!
    echo Please run this script from the project root directory (OWL_ROLES)
    echo.
    pause
    exit /b 1
)

cls
color 0B
echo.
echo ========================================
echo 🚀 Cubicals Project Setup - Windows
echo ========================================
echo.
color 0F

REM ============================================
REM Backend Setup
REM ============================================
color 0B
echo.
echo ========================================
echo 📦 Backend Setup
echo ========================================
color 0F
echo.

cd backend

if not exist "node_modules" (
    color 0E
    echo ⚠ Installing backend dependencies...
    echo This may take a few minutes...
    color 0F
    call npm install
    if !errorlevel! equ 0 (
        color 0A
        echo ✓ Backend dependencies installed successfully
        color 0F
    ) else (
        color 0C
        echo ✗ Failed to install backend dependencies
        color 0F
        pause
        exit /b 1
    )
) else (
    color 0A
    echo ✓ Backend dependencies already installed
    color 0F
)

echo.
color 0E
echo ⚠ Creating backend .env file with credentials...
color 0F

REM Display the MongoDB URI being used
echo.
echo ========== BACKEND .ENV CONFIGURATION ==========
echo.
echo MongoDB Connection String (MONGODB_URI):
echo mongodb+srv://cubicals_user:CubicalsApp123@cubicals-cluster.mongodb.net/cubicals?retryWrites=true^&w=majority
echo.
echo JWT Secret Key (JWT_SECRET):
echo your_super_secret_jwt_key_change_in_production_2025
echo.
echo Cloudinary API Credentials:
echo - CLOUDINARY_NAME: dvwjy2pxo
echo - CLOUDINARY_API_KEY: 437768858779948
echo - CLOUDINARY_API_SECRET: NnPxPq5sTvGfHj2pKqL9MwR5Xt
echo.
echo Client URL (CLIENT_URL):
echo http://localhost:5174
echo.
echo =============================================
echo.

REM Create the .env file
(
    echo # ================================================
    echo # Backend Environment Configuration
    echo # Created: %date% %time%
    echo # ================================================
    echo.
    echo # Server Configuration
    echo PORT=3000
    echo NODE_ENV=development
    echo.
    echo # ================================================
    echo # DATABASE CONFIGURATION
    echo # ================================================
    echo # MongoDB Atlas Connection String
    echo # Username: cubicals_user
    echo # Password: CubicalsApp123
    echo # Database: cubicals
    echo # IMPORTANT: Keep these credentials secure!
    echo MONGODB_URI=mongodb+srv://cubicals_user:CubicalsApp123@cubicals-cluster.mongodb.net/cubicals?retryWrites=true^&w=majority
    echo.
    echo # ================================================
    echo # JWT CONFIGURATION
    echo # ================================================
    echo # Secret key for signing JWT tokens
    echo # CHANGE THIS IN PRODUCTION!
    echo JWT_SECRET=your_super_secret_jwt_key_change_in_production_2025
    echo.
    echo # ================================================
    echo # CLOUDINARY CONFIGURATION
    echo # ================================================
    echo # Cloud storage for profile photos
    echo # Account: dvwjy2pxo
    echo CLOUDINARY_NAME=dvwjy2pxo
    echo CLOUDINARY_API_KEY=437768858779948
    echo CLOUDINARY_API_SECRET=NnPxPq5sTvGfHj2pKqL9MwR5Xt
    echo.
    echo # ================================================
    echo # APPLICATION URLS
    echo # ================================================
    echo CLIENT_URL=http://localhost:5174
    echo.
    echo # ================================================
    echo # EMAIL CONFIGURATION (Optional)
    echo # ================================================
    echo MAIL_USER=your_email@gmail.com
    echo MAIL_PASS=your_app_password
    echo.
    echo # ================================================
    echo # API CONFIGURATION
    echo # ================================================
    echo RATE_LIMIT=100
    echo LOG_LEVEL=debug
    echo.
    echo # ================================================
    echo # END OF CONFIGURATION
    echo # ================================================
) > .env

if !errorlevel! equ 0 (
    color 0A
    echo ✓ Backend .env file created successfully
    echo.
    echo File location: %cd%\.env
    color 0F
) else (
    color 0C
    echo ✗ Failed to create backend .env file
    color 0F
    pause
    exit /b 1
)

echo.
color 0A
echo ✓ Backend setup complete!
color 0F
echo.

REM ============================================
REM Frontend Setup
REM ============================================
cd ..\frontend

color 0B
echo ========================================
echo 📦 Frontend Setup
echo ========================================
color 0F
echo.

if not exist "node_modules" (
    color 0E
    echo ⚠ Installing frontend dependencies...
    echo This may take a few minutes...
    color 0F
    call npm install
    if !errorlevel! equ 0 (
        color 0A
        echo ✓ Frontend dependencies installed successfully
        color 0F
    ) else (
        color 0C
        echo ✗ Failed to install frontend dependencies
        color 0F
        pause
        exit /b 1
    )
) else (
    color 0A
    echo ✓ Frontend dependencies already installed
    color 0F
)

echo.
color 0E
echo ⚠ Creating frontend .env.local file...
color 0F

REM Display the frontend configuration
echo.
echo ========== FRONTEND .ENV.LOCAL CONFIGURATION ==========
echo.
echo API Endpoint (VITE_API_END_POINT):
echo http://localhost:3000
echo.
echo App Name (VITE_APP_NAME):
echo Owl Roles
echo.
echo App Version (VITE_APP_VERSION):
echo 1.0.0
echo.
echo =====================================================
echo.

REM Create the .env.local file
(
    echo # ================================================
    echo # Frontend Environment Configuration
    echo # Created: %date% %time%
    echo # ================================================
    echo.
    echo # ================================================
    echo # API ENDPOINT
    echo # ================================================
    echo # Backend API URL - The frontend communicates with backend using this URL
    echo VITE_API_END_POINT=http://localhost:3000
    echo.
    echo # ================================================
    echo # APPLICATION INFO
    echo # ================================================
    echo VITE_APP_NAME=Owl Roles
    echo VITE_APP_VERSION=1.0.0
    echo.
    echo # ================================================
    echo # END OF CONFIGURATION
    echo # ================================================
) > .env.local

if !errorlevel! equ 0 (
    color 0A
    echo ✓ Frontend .env.local file created successfully
    echo.
    echo File location: %cd%\.env.local
    color 0F
) else (
    color 0C
    echo ✗ Failed to create frontend .env.local file
    color 0F
    pause
    exit /b 1
)

echo.
color 0A
echo ✓ Frontend setup complete!
color 0F
echo.

REM ============================================
REM Verify .env files
REM ============================================
cls
color 0B
echo.
echo ========================================
echo ✓ VERIFYING CREATED .ENV FILES
echo ========================================
color 0F
echo.

REM Show backend .env
echo.
color 0E
echo === BACKEND .env FILE CONTENTS ===
color 0F
cd ..\backend
if exist .env (
    type .env
    color 0A
    echo.
    echo ✓ Backend .env file verified
    color 0F
) else (
    color 0C
    echo ✗ Backend .env file NOT FOUND
    color 0F
)

echo.
echo.

REM Show frontend .env.local
color 0E
echo === FRONTEND .env.local FILE CONTENTS ===
color 0F
cd ..\frontend
if exist .env.local (
    type .env.local
    color 0A
    echo.
    echo ✓ Frontend .env.local file verified
    color 0F
) else (
    color 0C
    echo ✗ Frontend .env.local file NOT FOUND
    color 0F
)

echo.
echo.

REM ============================================
REM Start Servers
REM ============================================
cd ..

color 0B
echo ========================================
echo 🚀 STARTING SERVERS
echo ========================================
color 0F
echo.

color 0E
echo ⚠ Starting backend server in new window...
echo   Command: cd backend ^&^& npm start
color 0F
start "Cubicals Backend Server" cmd /k "title Backend Server (Port 3000) && cd backend && npm start"

timeout /t 4 /nobreak

color 0E
echo ⚠ Starting frontend development server in new window...
echo   Command: cd frontend ^&^& npm run dev
color 0F
start "Cubicals Frontend Server" cmd /k "title Frontend Dev Server (Port 5174) && cd frontend && npm run dev"

timeout /t 4 /nobreak

cls
color 0B
echo.
echo ========================================
echo ✅ SETUP COMPLETE!
echo ========================================
color 0F
echo.

color 0A
echo YOUR APPLICATION IS STARTING IN TWO NEW WINDOWS:
color 0F
echo.
echo   📍 Frontend (React UI)     : http://localhost:5174
echo   📍 Backend (Express API)   : http://localhost:3000
echo   📍 API Documentation       : http://localhost:3000/api-docs
echo.

color 0E
echo IMPORTANT NOTES:
color 0F
echo   • Both servers should be running for the app to work properly
echo   • Check the two new Terminal windows for any errors or messages
echo   • Press Ctrl+C in either window to stop the server
echo   • MongoDB connection must be accessible from your network
echo   • All credentials and API keys are in the .env files (created above)
echo.

color 0C
echo ⚠️  SECURITY REMINDER:
color 0F
echo   • The credentials shown above are for DEVELOPMENT only
echo   • Before deploying to PRODUCTION:
echo     - Change JWT_SECRET to a strong random string
echo     - Update MongoDB credentials
echo     - Use environment-specific Cloudinary accounts
echo     - Enable HTTPS
echo     - Review all security settings
echo.

color 0E
echo TO CUSTOMIZE CREDENTIALS:
color 0F
echo   • Edit backend\.env to change MongoDB, JWT, or Cloudinary settings
echo   • Edit frontend\.env.local to change the API endpoint
echo   • Use any text editor (Notepad, VSCode, etc.)
echo   • Restart the servers after making changes
echo.

color 0A
echo GETTING STARTED:
color 0F
echo   1. Wait for both servers to start (10-20 seconds)
echo   2. Open http://localhost:5174 in your browser
echo   3. Click "Sign Up" to create a new account
echo   4. Choose your role (student or recruiter)
echo   5. Fill in your profile and upload a resume
echo   6. Start exploring jobs!
echo.

color 0A
echo Happy coding! 🎉
color 0F
echo.

pause
