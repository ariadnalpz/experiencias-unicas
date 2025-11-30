# Backend Node
FROM node:20-alpine

WORKDIR /app

# Copiar package.json e instalar
COPY package*.json ./
RUN npm install

# Copiar todo el backend
COPY . .

# Variables de entorno (puedes usar .env en VPS)
ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

CMD ["node", "src/index.js"]
