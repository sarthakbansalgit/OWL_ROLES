# Use Node.js LTS version with Alpine for small image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for layer caching)
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm install

# Copy everything else (including docs/)
COPY . .

# Set NODE_ENV to production
ENV NODE_ENV=production

# Expose backend port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]

# Use node with ESM (if using "type": "module" in package.json)
CMD ["node", "index.js"]
