#!/bin/bash

# 1. Recupera l'ultimo TAG di Git
VERSION=$(git describe --tags --abbrev=0 2>/dev/null)

if [ -z "$VERSION" ]; then
    VERSION="latest"
fi

echo "🚀 Inizio Deploy versione: $VERSION"

# 2. Identifica quale frontend è attualmente attivo nel Gateway
# Cerchiamo nel file del gateway quale upstream è decommentato
CURRENT_ACTIVE=$(grep "server frontend-" gateway/nginx.conf | head -n 1 | awk '{print $2}' | cut -d':' -f1)

if [ "$CURRENT_ACTIVE" == "frontend-blue" ]; then
    TARGET="green"
    OLD="blue"
else
    TARGET="blue"
    OLD="green"
fi

echo "🔄 Stato attuale: $OLD attivo. Target deploy: $TARGET"

# 3. Build della nuova immagine con il tag di Git
echo "📦 Building image: his-afp:$VERSION..."
docker build -t his-afp:$VERSION ./his-afp

# 4. Update e Start del container target
# Usiamo il tag appena creato per il nuovo container
docker compose up -d frontend-$TARGET

# 5. Switch del traffico nel Gateway (Automazione di NGINX)
echo "🚦 Switch del traffico da $OLD a $TARGET..."
# Usiamo 'sed' per cambiare il puntamento nel file di configurazione
sed -i "s/server frontend-$OLD:80;/server frontend-$TARGET:80;/g" gateway/nginx.conf

# 6. Reload del Gateway senza downtime
docker exec sio-gateway nginx -s reload

echo "✅ Deploy completato! La versione $VERSION è live su $TARGET."
