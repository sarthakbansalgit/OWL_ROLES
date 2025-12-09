#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║     OWL ROLES - Public Internet Access with ngrok          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo -e "${YELLOW}Installing ngrok...${NC}"
    brew install ngrok/ngrok/ngrok
fi

echo -e "\n${GREEN}✓ Starting services...${NC}\n"

# Kill any existing processes
pkill -f "npm start" 2>/dev/null
pkill -f "npm run dev" 2>/dev/null
pkill -f "ngrok" 2>/dev/null

# Start Backend
echo -e "${YELLOW}[1/4]${NC} Starting Backend..."
cd "$(dirname "$0")/backend"
npm start > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
sleep 3

# Start Frontend
echo -e "${YELLOW}[2/4]${NC} Starting Frontend..."
cd "$(dirname "$0")/frontend"
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 3

# Expose Backend to Internet
echo -e "${YELLOW}[3/4]${NC} Exposing Backend to Internet (Port 3000)..."
ngrok http 3000 > /tmp/ngrok-backend.log 2>&1 &
NGROK_BACKEND_PID=$!
sleep 3

# Expose Frontend to Internet
echo -e "${YELLOW}[4/4]${NC} Exposing Frontend to Internet (Port 5174)..."
ngrok http 5174 > /tmp/ngrok-frontend.log 2>&1 &
NGROK_FRONTEND_PID=$!
sleep 3

# Extract ngrok URLs
BACKEND_URL=$(grep -oP 'https://\S+\.ngrok\.io' /tmp/ngrok-backend.log 2>/dev/null | head -1)
FRONTEND_URL=$(grep -oP 'https://\S+\.ngrok\.io' /tmp/ngrok-frontend.log 2>/dev/null | head -1)

echo -e "\n${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                    🎉 SETUP COMPLETE! 🎉                 ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${YELLOW}📱 Your Public URLs (Share these with anyone):${NC}"
echo -e "\n${BLUE}Frontend:${NC}  ${FRONTEND_URL:-Loading...}"
echo -e "${BLUE}Backend:${NC}   ${BACKEND_URL:-Loading...}"

echo -e "\n${YELLOW}🔧 To update Frontend .env:${NC}"
echo "VITE_API_END_POINT=${BACKEND_URL:-Loading...}"

echo -e "\n${YELLOW}📊 Local Access (Same WiFi):${NC}"
echo "Frontend: http://172.20.10.2:5174"
echo "Backend:  http://172.20.10.2:3000"

echo -e "\n${YELLOW}📋 Logs:${NC}"
echo -e "Backend:        tail -f /tmp/backend.log"
echo -e "Frontend:       tail -f /tmp/frontend.log"
echo -e "ngrok Backend:  tail -f /tmp/ngrok-backend.log"
echo -e "ngrok Frontend: tail -f /tmp/ngrok-frontend.log"

echo -e "\n${YELLOW}⏹️  To stop everything:${NC}"
echo "Press Ctrl+C in this terminal"

# Function to cleanup
cleanup() {
    echo -e "\n${YELLOW}Stopping all services...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    kill $NGROK_BACKEND_PID 2>/dev/null
    kill $NGROK_FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✓ All services stopped${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Wait for all processes
wait
