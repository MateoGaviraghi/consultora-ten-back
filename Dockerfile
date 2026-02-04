# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Build de la aplicación
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar build desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]
