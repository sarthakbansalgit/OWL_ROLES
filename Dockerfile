FROM node:20-alpine

WORKDIR /app

# Copy both frontend and backend
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install --legacy-peer-deps

# Install frontend dependencies and build
WORKDIR /app/frontend
RUN npm install --legacy-peer-deps && npm run build

# Set backend as main
WORKDIR /app/backend

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "index.js"]
