# 🚀 Guide de Démarrage Complet - Waly Platform

## 📋 État Actuel du Projet

### ✅ **Composants Prêts**
- **Smart Contract** : Déployé sur Polygon Amoy (0xDEC7Bcad4c4A23d21b526A0F5AeC70516408b2f7)
- **Frontend** : Application Next.js avec composants blockchain
- **Backend API** : Service NestJS
- **Oracle** : Service Mobile Money
- **MetaMask** : Configuration Polygon Amoy prête

---

## 🔧 **Démarrage des Services**

### 1. **Backend API** (Port 3002)
```bash
cd apps/api
npm start
```
**URL** : http://localhost:3002

### 2. **Oracle Mobile Money** (Port 3003)
```bash
cd oracle
npm start
```
**URL** : http://localhost:3003

### 3. **Frontend Web** (Port 3000)
```bash
cd apps/web
npm run dev
```
**URL** : http://localhost:3000

---

## 🎯 **Flux de Test Complet**

### Étape 1: **Configuration MetaMask**
1. **Installer MetaMask** si ce n'est pas fait
2. **Ajouter le réseau Polygon Amoy** :
   - Nom : Polygon Amoy Testnet
   - RPC : https://rpc-amoy.polygon.technology
   - Chain ID : 80002
   - Devise : POL
3. **Obtenir des POL testnet** : https://faucet.polygon.technology/

### Étape 2: **Dépôt de Caution**
1. **Connecter MetaMask** dans l'application
2. **Déposer une caution** :
   - Vendeur : 1 POL minimum
   - Acheteur : 1 POL minimum  
   - Livreur : 2 POL minimum

### Étape 3: **Création de Commande**
1. **Dashboard Acheteur** → Parcourir les produits
2. **Sélectionner un produit** → Ajouter au panier
3. **Commander** → Confirmer avec MetaMask
4. **Transaction blockchain** enregistrée

### Étape 4: **Validation Vendeur**
1. **Dashboard Vendeur** → Voir les commandes
2. **Valider la commande** → Assigner un livreur
3. **Transaction blockchain** enregistrée

### Étape 5: **Acceptation Livreur**
1. **Dashboard Livreur** → Voir les missions
2. **Accepter la mission** → Confirmer avec MetaMask
3. **Transaction blockchain** enregistrée

### Étape 6: **Livraison Complétée**
1. **Scanner QR code** (à implémenter)
2. **Prendre photo** (à implémenter) 
3. **Géolocalisation** (à implémenter)
4. **Confirmer livraison** → Paiements automatiques

---

## 📊 **Monitoring**

### **Vérification PolygonScan**
- **Lien** : https://amoy.polygonscan.com/address/0xDEC7Bcad4c4A23d21b526A0F5AeC70516408b2f7
- **Transactions** : Toutes les transactions blockchain
- **Événements** : Événements émis par le smart contract

### **Oracle Status**
```bash
curl http://localhost:3003/status
```

### **Backend API**
```bash
curl http://localhost:3002/health
```

---

## 🛠 **Dépannage**

### **Problèmes Communs**

#### 1. **MetaMask ne se connecte pas**
- Vérifier que Polygon Amoy est configuré
- S'assurer d'avoir des POL sur le wallet
- Rafraîchir la page et réessayer

#### 2. **Transaction échoue**
- Vérifier le solde POL
- Confirmer les frais de gaz (gas limit)
- Réessayer avec un gas price plus élevé

#### 3. **Oracle ne reçoit pas les événements**
- Vérifier que l'Oracle tourne sur le port 3003
- Confirmer l'adresse du contrat
- Vérifier les logs de l'Oracle

#### 4. **Backend API ne répond pas**
- Vérifier que le service tourne sur le port 3002
- Consulter les logs d'erreurs
- Redémarrer le service si nécessaire

---

## 📱 **Fonctionnalités Implémentées**

### ✅ **Fait**
- Connexion MetaMask automatique
- Dépôt de caution blockchain
- Création de commande blockchain
- Écoute d'événements en temps réel
- Oracle Mobile Money (simulation)
- Interface responsive

### 🔄 **En Cours**
- Acceptation de commande par livreur
- Scan QR code à la livraison
- Photo et géolocalisation
- Paiements Mobile Money réels

---

## 🎯 **Prochaines Actions**

1. **Démarrer les 3 services** simultanément
2. **Tester le flux complet** avec MetaMask
3. **Vérifier les transactions** sur PolygonScan
4. **Implémenter les fonctionnalités manquantes**
5. **Connecter les vraies APIs Mobile Money**

---

## 📞 **Support**

- **Smart Contract** : 0xDEC7Bcad4c4A23d21b526A0F5AeC70516408b2f7
- **Réseau** : Polygon Amoy Testnet
- **Documentation** : Voir les README.md dans chaque dossier
- **Logs** : Consultez les fichiers de logs dans chaque service

---

**Prêt à tester la plateforme de livraison Web3 complète ! 🚀**
