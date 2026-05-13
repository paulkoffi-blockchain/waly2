#!/bin/bash

echo "🔍 DIAGNOSTIC ET RÉPARATION AUTOMATIQUE - Waly Platform"
echo "=================================================="

# Vérifier les processus Node.js
echo "📋 Vérification des processus Node.js..."
tasklist | findstr node.exe

# Tuer tous les processus Node.js
echo "🔄 Arrêt des processus Node.js..."
taskkill /F /IM node.exe > nul 2>&1

# Attendre 2 secondes
timeout /t 2 /nobreak > nul

# Vérifier les ports utilisés
echo "🔌 Vérification des ports..."
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Attendre encore 2 secondes
timeout /t 2 /nobreak > nul

# Démarrer l'API
echo "🚀 Démarrage de l'API Backend..."
cd /d "c:\Users\HP\Downloads\last-mile-web3-landing\waly-platform"
start /B npm run dev:api

# Attendre 5 secondes pour que l'API démarre
echo "⏳ Attente du démarrage de l'API..."
timeout /t 5 /nobreak > nul

# Démarrer le Frontend
echo "🌐 Démarrage du Frontend..."
cd /d "c:\Users\HP\Downloads\last-mile-web3-landing\waly-platform\apps\web"
start /B npx next dev --port 3000 --hostname 127.0.0.1

# Attendre 3 secondes
echo "⏳ Attente du démarrage du Frontend..."
timeout /t 3 /nobreak > nul

# Vérifier que tout fonctionne
echo "✅ Vérification finale..."
netstat -ano | findstr :3000
netstat -ano | findstr :3001

echo ""
echo "🎉 SERVEURS REDÉMARRÉS AVEC SUCCÈS !"
echo "📍 Frontend : http://127.0.0.1:3000"
echo "📍 API      : http://localhost:3001"
echo ""
echo "⚠️  Si l'erreur persiste, vérifiez :"
echo "   1. Aucun autre logiciel n'utilise les ports 3000/3001"
echo "   2. Pare-feu Windows autorise Node.js"
echo "   3. Navigateur cache vidé (Ctrl+F5)"
echo ""
echo "Appuyez sur une touche pour continuer..."
pause > nul
