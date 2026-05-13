# 🚨 GUIDE DE DÉPANNAGE - Waly Platform

## 📋 PROBLÈMES RÉCURRENTS

### ❌ INTERNAL SERVER ERROR / NAVIGATEUR NON CONNECTÉ

**Causes possibles :**
1. **Conflit de ports** : Autre logiciel utilise 3000/3001
2. **Processus Node.js multiples** : Services en conflit
3. **Cache navigateur** : Anciennes données corrompues
4. **Pare-feu Windows** : Bloque Node.js/ports
5. **Erreur de compilation** : Code TypeScript cassé

---

## 🛠️ SOLUTIONS RAPIDES

### 🚀 Solution 1 : Script Automatique
```bash
npm run fix:server
```

### 🚀 Solution 2 : Redémarrage Complet
```bash
npm run restart:all
```

### 🔍 Solution 3 : Diagnostic Manuel
```bash
npm run check:ports
```

### 🧹 Solution 4 : Nettoyage
```bash
npm run kill:node
npm run dev:clean
```

---

## 📊 VÉRIFICATIONS SYSTÈME

### Ports utilisés
```bash
netstat -ano | findstr :3000
netstat -ano | findstr :3001
```

### Processus Node.js
```bash
tasklist | findstr node
```

### Logs de compilation
```bash
cd apps/api && npm run build
cd apps/web && npm run build
```

---

## 🎯 PRÉVENTION

### ✅ Bonnes pratiques
1. **Toujours utiliser** `npm run dev:clean` après modifications
2. **Vider le cache** navigateur (Ctrl+Shift+Del)
3. **Vérifier les ports** avant démarrage
4. **Utiliser le script** `diagnose-and-fix.sh` pour problèmes récurrents

### ⚠️ À éviter
- Ne pas lancer plusieurs fois les mêmes services
- Ne pas modifier les ports sans mise à jour
- Ne pas ignorer les erreurs de compilation

---

## 🆘 CONTACT SUPPORT

Si le problème persiste :
1. **Vérifier les logs** dans la console
2. **Faire un screenshot** de l'erreur
3. **Noter les étapes** reproduisant le bug
4. **Utiliser le script** de diagnostic automatique

---

## 📝 NOTES DE VERSION

- **Node.js** : v18+
- **Next.js** : 16.2.4
- **NestJS** : Dernière version
- **Système** : Windows 10/11

---

*Dernière mise à jour : 07/05/2026*
