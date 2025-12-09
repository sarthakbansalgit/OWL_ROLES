#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting OWL ROLES Job Portal Locally${NC}"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js version:${NC} $(node -v)"

# Start Backend
echo -e "\n${YELLOW}Starting Backend on port 3000...${NC}"
cd backend
npm install > /dev/null 2>&1
npm start &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"

sleep 3

# Start Frontend
echo -e "\n${YELLOW}Starting Frontend on port 5173...${NC}"
cd ../frontend
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"

echo -e "\n${GREEN}=====================================${NC}"
echo -e "${GREEN}🎉 Both services are running!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo -e "\n${YELLOW}Frontend:${NC} http://localhost:5173"
echo -e "${YELLOW}Backend:${NC}  http://localhost:3000"
echo -e "\n${YELLOW}Press Ctrl+C to stop both services${NC}\n"

# Function to handle cleanup
cleanup() {
    echo -e "\n${YELLOW}Stopping services...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✓ Services stopped${NC}"
}

# Trap Ctrl+C
trap cleanup SIGINT

# Wait for both processes
wait
