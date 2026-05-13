@echo off
echo 🚀 Démarrage de l'environnement de développement Waly Platform
echo ==================================================

REM Vérifier si Node.js est installé
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé. Veuillez installer Node.js 20+
    pause
    exit /b 1
)

REM Vérifier si npm est installé
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm n'est pas installé. Veuillez installer npm
    pause
    exit /b 1
)

REM Arrêter tous les processus Node existants
echo 🔄 Arrêt des processus existants...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

REM Installer les dépendances
echo 📦 Installation des dépendances...
npm install
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'installation des dépendances
    pause
    exit /b 1
)

REM Démarrer l'API backend
echo 🔧 Démarrage de l'API backend...
start "Waly API" cmd /c "npm run dev:api"

REM Attendre que l'API démarre
echo ⏳ Attente du démarrage de l'API...
timeout /t 10 /nobreak >nul

REM Vérifier si l'API est bien démarrée
curl -s http://localhost:3001 >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ L'API backend n'a pas pu démarrer correctement
    pause
    exit /b 1
)

echo ✅ API backend démarrée avec succès

REM Démarrer l'application web
echo 🌐 Démarrage de l'application web...
start "Waly Web" cmd /c "npm run dev:web"

REM Attendre que l'application web démarre
echo ⏳ Attente du démarrage de l'application web...
timeout /t 15 /nobreak >nul

REM Vérifier si l'application web est bien démarrée
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ L'application web n'a pas pu démarrer correctement
    pause
    exit /b 1
)

echo.
echo 🎉 Environnement de développement prêt !
echo ===================================
echo 📱 Application web: http://localhost:3000
echo 🔧 API backend: http://localhost:3001
echo.
echo Pour arrêter l'environnement:
echo   - Exécutez: taskkill /F /IM node.exe
echo   - Ou fermez les fenêtres de terminal
echo.
echo Les services sont maintenant en cours d'exécution...
pause
