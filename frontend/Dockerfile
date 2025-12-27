FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV PORT=5174

EXPOSE 5174

CMD ["npm", "install", "-g", "serve", "&&", "serve", "-s", "dist", "-l", "5174"]
