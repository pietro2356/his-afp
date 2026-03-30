#!/bin/bash

# 1. Recupera il tag da Git
VERSION=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.1")
echo "🚀 Versione Git rilevata: $VERSION"

# 2. Identifica chi è attivo leggendo la config REALE di NGINX
# Cerchiamo esattamente la stringa dopo 'server ' e prima di ':80'
CURRENT_ACTIVE=$(grep -oP 'server \Kfrontend-\w+' gateway/nginx.conf)

if [ "$CURRENT_ACTIVE" == "frontend-blue" ]; then
    TARGET="green"
    OLD="blue"
    export FE_GREEN_TAG=$VERSION
    export FE_BLUE_TAG="stable"
else
    TARGET="blue"
    OLD="green"
    export FE_BLUE_TAG=$VERSION
    export FE_GREEN_TAG="latest"
fi

echo "🔄 Switch: $OLD -> $TARGET"

# 3. Build e Up del target
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

echo "🚦 Switch del traffico: $OLD -> $TARGET"

# CREIAMO IL NUOVO CONTENUTO IN UNA VARIABILE O FILE TEMPORANEO
# Poi lo "iniettiamo" nel file originale mantenendo l'inode
NEW_CONF=$(sed "s/frontend-$OLD/frontend-$TARGET/g" gateway/nginx.conf)
echo "$NEW_CONF" > gateway/nginx.conf

# Ora NGINX nel container vedrà istantaneamente il cambio contenuto
docker exec sio-gateway nginx -s reload

echo "✅ Traffico spostato su $TARGET correttamente."
