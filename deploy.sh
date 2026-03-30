#!/bin/bash

# 1. Recupera il tag da Git
VERSION=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.1")
echo "🚀 Versione rilevata da Git: $VERSION"

# 2. Identifica chi è attivo (chiedendo a NGINX)
CURRENT_ACTIVE=$(docker exec sio-gateway nginx -T | grep "server frontend-" | head -n 1 | awk '{print $2}' | cut -d':' -f1)

# 3. Definisci Target e assegna i TAG
if [ "$CURRENT_ACTIVE" == "sio-frontend-blue" ]; then
    TARGET="green"
    export FE_GREEN_TAG=$VERSION
    # Dobbiamo mantenere la versione attuale del blue per non farlo riavviare
    export FE_BLUE_TAG="stable"
else
    TARGET="blue"
    export FE_BLUE_TAG=$VERSION
    export FE_GREEN_TAG="latest"
fi

echo "📦 Build e Deploy di frontend-$TARGET con tag $VERSION..."

# 4. Esegui il comando passando le variabili
# Docker Compose leggerà FE_BLUE_TAG e FE_GREEN_TAG dall'ambiente dello script
docker compose build frontend-$TARGET
docker compose up -d frontend-$TARGET

# 3. 🧪 HEALTH CHECK
echo "🔍 Verifica salute del container frontend-$TARGET..."
MAX_RETRIES=10
COUNT=0
SUCCESS=false

while [ $COUNT -lt $MAX_RETRIES ]; do
    # Usiamo docker inspect per trovare l'IP interno del container target
    TARGET_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' sio-frontend-$TARGET)

    # Eseguiamo un curl dal container gateway verso il target
    STATUS=$(docker exec sio-gateway curl -s -o /dev/null -w "%{http_code}" http://$TARGET_IP)

    if [ "$STATUS" == "200" ]; then
        echo "✅ Container $TARGET in salute (HTTP 200)!"
        SUCCESS=true
        break
    fi

    echo "⏳ In attesa... (tentativo $((COUNT+1))/$MAX_RETRIES)"
    sleep 2
    COUNT=$((COUNT+1))
done

if [ "$SUCCESS" = false ]; then
    echo "❌ Errore: Il container $TARGET non ha risposto in tempo. Abortisco deploy."
    exit 1
fi

# 4. SWITCH (Fix Inode per Docker)
echo "🚦 Switch del traffico..."
# Sovrascriviamo il file senza cambiare l'inode
sed "s/frontend-$OLD/frontend-$TARGET/g" gateway/nginx.conf > gateway/nginx.conf.tmp && mv gateway/nginx.conf.tmp gateway/nginx.conf
docker exec sio-gateway nginx -s reload
echo "✅ Deploy completato con successo."
