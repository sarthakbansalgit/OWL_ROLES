# Use Node.js LTS version with Alpine for small image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything else (including docs/)
COPY . .

# Optional: set NODE_ENV if needed
# ENV NODE_ENV=production

# Expose backend port
EXPOSE 5000

# Use node with ESM (if using "type": "module" in package.json)
CMD ["node", "index.js"]
