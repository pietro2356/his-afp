# STAGE 1: Build
FROM node:24-alpine AS build
LABEL authors="pietro2356"
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# STAGE 2: Web Server (Interno)
FROM nginx:alpine
# Usiamo una versione semplificata del tuo nginx.conf (vedi sotto)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# CORREZIONE: Il percorso deve combaciare con il tuo project tree
COPY --from=build /app/dist/his-afp/browser /usr/share/nginx/html
# Script per iniettare le variabili all'avvio
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js && exec nginx -g 'daemon off;'"]
EXPOSE 80
