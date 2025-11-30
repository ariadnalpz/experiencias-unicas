# Dockerfile.frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json desde la raíz
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Servir con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
