# 🎭 Script de Démonstration - Soutenance Waly Platform

## 📋 **Scénario Complet de Démonstration**

### **🎯 Objectif**
Montrer une plateforme de livraison Web3 complète avec :
- Smart contract sur Polygon Amoy
- Intégration MetaMask
- Paiements Mobile Money automatiques
- Preuve de livraison (QR code, photo, géolocalisation)

---

## 👥 **Acteurs de la Démonstration**

1. **Présentateur** : Vous (guide la démo)
2. **Vendeur** : Crée et vend des produits
3. **Acheteur** : Commande et paie
4. **Livreur** : Accepte et livre

---

## 🚀 **DÉMARRAGE DES SERVICES**

### **1. Terminal 1 - Backend API**
```bash
cd apps/api
npm start
```
✅ Attendre : `Nest application successfully started on port 3002`

### **2. Terminal 2 - Oracle Mobile Money**
```bash
cd oracle
npm start
```
✅ Attendre : `Oracle server started on port 3003`

### **3. Terminal 3 - Frontend Web**
```bash
cd apps/web
npm run dev
```
✅ Attendre : `Ready on http://localhost:3000`

---

## 📱 **ÉTAPE 1 - CONFIGURATION METAMASK**

### **À montrer :**
1. **Installation MetaMask** (si nécessaire)
2. **Configuration réseau Polygon Amoy** :
   - Nom : Polygon Amoy Testnet
   - RPC : https://rpc-amoy.polygon.technology
   - Chain ID : 80002
   - Devise : POL
3. **Obtenir des POL testnet** : https://faucet.polygon.technology/
4. **Solde du wallet** : Montrer 0.1+ POL

---

## 🛍️ **ÉTAPE 2 - VENDEUR : CRÉATION PRODUIT**

### **Actions :**
1. **Aller sur** : http://localhost:3000/dashboard
2. **Connecter MetaMask** → Confirmer la connexion
3. **Déposer caution vendeur** : 1 POL
4. **Ajouter un produit** :
   - Nom : "Laptop Dell XPS"
   - Prix : 5000 FCFA (1 POL)
   - Description : "Ordinateur portable haute performance"
   - Photo : Image placeholder

### **À vérifier :**
- ✅ Wallet connecté
- ✅ Caution déposée (transaction visible)
- ✅ Produit ajouté à la base de données

---

## 🛒 **ÉTAPE 3 - ACHETEUR : COMMANDE**

### **Actions :**
1. **Nouveau wallet** (ou même wallet avec rôle acheteur)
2. **Déposer caution acheteur** : 1 POL
3. **Parcourir les produits** → Voir le Laptop Dell XPS
4. **Commander** :
   - Quantité : 1
   - Adresse de livraison : "Dakar, Plateau"
   - Téléphone : "+221 77 123 45 67"
5. **Payer avec MetaMask** → Confirmer transaction

### **À vérifier :**
- ✅ Commande créée
- ✅ Transaction blockchain visible
- ✅ Notification vendeur

---

## 🚚 **ÉTAPE 4 - VENDEUR : VALIDATION**

### **Actions :**
1. **Dashboard vendeur** → Voir les nouvelles commandes
2. **Valider la commande** :
   - Confirmer les détails
   - **Assigner un livreur** : "Livreur Alpha"
3. **Confirmer sur blockchain**

### **À vérifier :**
- ✅ Commande validée
- ✅ Livreur notifié
- ✅ Statut mis à jour

---

## 🏍️ **ÉTAPE 5 - LIVREUR : ACCEPTATION**

### **Actions :**
1. **Wallet livreur** → Déposer caution 2 POL
2. **Dashboard livreur** → Voir les missions disponibles
3. **Accepter la mission** :
   - Numéro de commande : 1
   - Confirmer acceptation
4. **Confirmer sur blockchain**

### **À vérifier :**
- ✅ Mission acceptée
- ✅ Transaction blockchain
- ✅ Statut "En cours de livraison"

---

## 📸 **ÉTAPE 6 - PREUVE DE LIVRAISON**

### **Actions :**
1. **Scanner QR code** :
   - Générer QR code pour la commande
   - Scanner avec l'interface
2. **Prendre photo** :
   - Utiliser la caméra du téléphone
   - Capturer le colis livré
3. **Géolocalisation** :
   - Obtenir la position GPS
   - Confirmer la localisation
4. **Soumettre la preuve** :
   - Notes : "Livré avec succès"
   - Confirmer sur blockchain

### **À vérifier :**
- ✅ QR code scanné
- ✅ Photo prise
- ✅ Géolocalisation enregistrée
- ✅ Preuve soumise

---

## 💰 **ÉTAPE 7 - PAIEMENTS AUTOMATIQUES**

### **À montrer :**
1. **Oracle logs** :
   ```bash
   curl http://localhost:3003/status
   ```
2. **Événements blockchain** :
   - `PaymentReleased` émis
   - `DeliveryCompleted` émis
3. **Paiements Mobile Money** :
   - Vendeur : 5000 FCFA
   - Livreur : 1000 FCFA
4. **PolygonScan** :
   - https://amoy.polygonscan.com/address/0xDEC7Bcad4c4A23d21b526A0F5AeC70516408b2f7

### **À vérifier :**
- ✅ Transactions visibles sur PolygonScan
- ✅ Logs Oracle montrant les paiements
- ✅ Backend notifié

---

## 📊 **VÉRIFICATION FINALE**

### **Inputs Blockchain :**
- ✅ Dépôts de caution : 4 POL total
- ✅ Création commande : 1 POL
- ✅ Acceptation livraison : 0 gas
- ✅ Complétion livraison : 0 gas

### **Outputs Blockchain :**
- ✅ Paiement vendeur : 0.8 POL
- ✅ Paiement livreur : 0.2 POL
- ✅ Remboursement caution acheteur : 1 POL

### **Backend :**
- ✅ Produit enregistré
- ✅ Commande suivie
- ✅ Preuve de livraison stockée

---

## 🎯 **POINTS CLÉS À METTRE EN VALEUR**

### **🔗 Intégration Blockchain**
- Smart contract déployé et vérifié
- Transactions transparentes
- Preuve immuable

### **📱 Mobile Money**
- Orange Money, MTN, Wave intégrés
- Paiements automatiques
- Conversion POL → FCFA

### **🛡️ Sécurité**
- Caution pour chaque acteur
- Validation multi-étapes
- Preuve de livraison complète

### **⚡ Performance**
- Événements en temps réel
- Oracle réactif
- Interface responsive

---

## 🚨 **DÉPANNAGE RAPIDE**

### **Si MetaMask ne se connecte pas :**
- Vérifier le réseau Polygon Amoy
- Rafraîchir la page
- Réessayer la connexion

### **Si la transaction échoue :**
- Vérifier le solde POL
- Augmenter le gas price
- Réessayer la transaction

### **Si l'Oracle ne reçoit pas :**
- Vérifier que l'Oracle tourne
- Consulter les logs : `logs/combined.log`
- Redémarrer l'Oracle

---

## 🏆 **CONCLUSION DE LA DÉMO**

### **Résumé des accomplissements :**
- ✅ Plateforme Web3 fonctionnelle
- ✅ Smart contract sur Polygon Amoy
- ✅ Intégration Mobile Money complète
- ✅ Preuve de livraison multi-facteurs
- ✅ Interface utilisateur intuitive

### **Prochaines étapes :**
- Déploiement sur Polygon Mainnet
- Intégration vraies APIs Mobile Money
- Application mobile native
- Expansion à d'autres pays

---

**🎉 La plateforme Waly est prête pour la production !**

---

*Durée estimée de la démo : 15-20 minutes*
*Nombre de transactions : 4-5*
*Coût total en POL : < 0.1 POL*
