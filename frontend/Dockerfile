# ==========================================
# Stage 1 : Build de l'application React (Vite)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copier package.json + package-lock.json en premier (cache Docker)
COPY package*.json ./

# npm ci : installation déterministe basée sur package-lock.json
RUN npm ci

# Copier le code source
COPY . .

# Build de production (Vite → dossier /app/dist)
RUN npm run build

# ==========================================
# Stage 2 : Serveur Nginx de Production
# ==========================================
FROM nginx:1.25-alpine

# Nettoyer les fichiers par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers statiques compilés
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Lancer Nginx en foreground (obligatoire pour Docker)
CMD ["nginx", "-g", "daemon off;"]