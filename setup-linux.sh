#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if running from the correct directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    print_error "Please run this script from the project root directory (OWL_ROLES)"
    exit 1
fi

print_header "🚀 Cubicals Project Setup"

# ============================================
# Backend Setup
# ============================================
print_header "📦 Backend Setup"

cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_warning "Installing backend dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        print_success "Backend dependencies installed"
    else
        print_error "Failed to install backend dependencies"
        exit 1
    fi
else
    print_success "Backend dependencies already installed"
fi

# Create .env file with default values
print_warning "Creating backend .env file with default values..."
cat > .env << 'BACKEND_ENV'
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://cubicals_user:CubicalsApp123@cubicals-cluster.mongodb.net/cubicals?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production_2025

# Cloudinary Configuration (for profile photos)
CLOUDINARY_NAME=dvwjy2pxo
CLOUDINARY_API_KEY=437768858779948
CLOUDINARY_API_SECRET=NnPxPq5sTvGfHj2pKqL9MwR5Xt

# Client URL
CLIENT_URL=http://localhost:5174

# Email Configuration (if needed)
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

# API Rate Limiting
RATE_LIMIT=100

# Log Level
LOG_LEVEL=debug
BACKEND_ENV

if [ $? -eq 0 ]; then
    print_success "Backend .env file created"
else
    print_error "Failed to create backend .env file"
    exit 1
fi

print_success "Backend setup complete!"

# ============================================
# Frontend Setup
# ============================================
print_header "📦 Frontend Setup"

cd ../frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_warning "Installing frontend dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        print_success "Frontend dependencies installed"
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
else
    print_success "Frontend dependencies already installed"
fi

# Create .env.local file
print_warning "Creating frontend .env.local file..."
cat > .env.local << 'FRONTEND_ENV'
VITE_API_END_POINT=http://localhost:3000
VITE_APP_NAME=Owl Roles
VITE_APP_VERSION=1.0.0
FRONTEND_ENV

if [ $? -eq 0 ]; then
    print_success "Frontend .env.local file created"
else
    print_error "Failed to create frontend .env.local file"
    exit 1
fi

print_success "Frontend setup complete!"

# ============================================
# Start Servers
# ============================================
print_header "🚀 Starting Servers"

cd ..

# Kill any existing processes on ports 3000 and 5174
print_warning "Cleaning up existing processes on ports 3000 and 5174..."
fuser -k 3000/tcp 2>/dev/null || true
fuser -k 5174/tcp 2>/dev/null || true
sleep 2

# Start backend in a new terminal window
print_warning "Starting backend server in new terminal..."
if command -v gnome-terminal &> /dev/null; then
    gnome-terminal -- bash -c "cd backend && npm start; read -p 'Press enter to close...'"
elif command -v konsole &> /dev/null; then
    konsole -e bash -c "cd backend && npm start; read -p 'Press enter to close...'" &
else
    print_warning "No compatible terminal found. Starting backend in background..."
    cd backend && npm start &
    BACKEND_PID=$!
    cd ..
fi

sleep 3

# Start frontend in a new terminal window
print_warning "Starting frontend development server in new terminal..."
if command -v gnome-terminal &> /dev/null; then
    gnome-terminal -- bash -c "cd frontend && npm run dev; read -p 'Press enter to close...'"
elif command -v konsole &> /dev/null; then
    konsole -e bash -c "cd frontend && npm run dev; read -p 'Press enter to close...'" &
else
    print_warning "No compatible terminal found. Starting frontend in background..."
    cd frontend && npm run dev &
    FRONTEND_PID=$!
    cd ..
fi

sleep 3

print_header "✅ Setup Complete!"
echo ""
echo -e "${GREEN}Your application is starting:${NC}"
echo -e "${BLUE}📍 Backend (API)${NC}  : http://localhost:3000"
echo -e "${BLUE}📍 Frontend (UI)${NC}  : http://localhost:5174"
echo -e "${BLUE}📍 API Docs${NC}      : http://localhost:3000/api-docs"
echo ""
echo -e "${YELLOW}Important Notes:${NC}"
echo "  • Both servers should be running for the app to work"
echo "  • Check the Terminal windows for any errors"
echo "  • Press Ctrl+C in either Terminal to stop the server"
echo "  • MongoDB must be accessible from your network"
echo "  • .env files have been created with default values"
echo ""
echo -e "${YELLOW}To customize environment variables:${NC}"
echo "  • Edit backend/.env for backend configuration"
echo "  • Edit frontend/.env.local for frontend configuration"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
