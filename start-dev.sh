#!/bin/bash

echo "🚀 Démarrage de l'environnement de développement Waly Platform"
echo "=================================================="

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 20+"
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez installer npm"
    exit 1
fi

# Arrêter tous les processus Node existants
echo "🔄 Arrêt des processus existants..."
taskkill /F /IM node.exe 2>/dev/null || true
pkill -f node 2>/dev/null || true

# Attendre que les processus s'arrêtent
sleep 2

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Démarrer l'API backend
echo "🔧 Démarrage de l'API backend..."
npm run dev:api &
API_PID=$!

# Attendre que l'API démarre
echo "⏳ Attente du démarrage de l'API..."
sleep 10

# Vérifier si l'API est bien démarrée
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ API backend démarrée avec succès"
else
    echo "❌ L'API backend n'a pas pu démarrer correctement"
    kill $API_PID 2>/dev/null
    exit 1
fi

# Démarrer l'application web
echo "🌐 Démarrage de l'application web..."
npm run dev:web &
WEB_PID=$!

# Attendre que l'application web démarre
echo "⏳ Attente du démarrage de l'application web..."
sleep 15

# Vérifier si l'application web est bien démarrée
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Application web démarrée avec succès"
else
    echo "❌ L'application web n'a pas pu démarrer correctement"
    kill $API_PID $WEB_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎉 Environnement de développement prêt !"
echo "==================================="
echo "📱 Application web: http://localhost:3000"
echo "🔧 API backend: http://localhost:3001"
echo ""
echo "Pour arrêter l'environnement:"
echo "  - Sur Windows: taskkill /F /IM node.exe"
echo "  - Sur Mac/Linux: pkill -f node"
echo ""
echo "Les processus PID:"
echo "  - API: $API_PID"
echo "  - Web: $WEB_PID"

# Attendre que les processus soient terminés
wait $API_PID $WEB_PID
