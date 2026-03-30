#!/bin/bash

VERSION=$(git describe --tags --abbrev=0 2>/dev/null || echo "latest")
echo "🚀 Inizio Deploy versione: $VERSION"

# 1. Identifica attivo/inattivo
CURRENT_ACTIVE=$(docker exec sio-gateway nginx -T | grep "server frontend-" | head -n 1 | awk '{print $2}' | cut -d':' -f1)

if [ "$CURRENT_ACTIVE" == "sio-frontend-blue" ]; then
    TARGET="green"
    OLD="blue"
else
    TARGET="blue"
    OLD="green"
fi

echo "🔄 Stato: $OLD attivo. Preparazione $TARGET..."

# 2. Build e Start (senza downtime per il vecchio)
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

# 5. RELOAD
docker exec sio-gateway nginx -s reload
echo "✅ Deploy completato con successo."
