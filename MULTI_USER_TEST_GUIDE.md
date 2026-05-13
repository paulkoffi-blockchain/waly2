# 🧪 Guide de Test Multi-Utilisateurs

## 🎯 Objectif
Ce guide vous permet de tester l'ensemble du flux Waly Platform avec 3 utilisateurs différents (Acheteur, Vendeur, Livreur) depuis un seul navigateur et wallet MetaMask.

## 👥 Utilisateurs de Test Configurés

### 1. **Jean Kouassi** - Vendeur
- **Adresse**: `0xCourier1111111111111111111111111111111111`
- **Rôle**: Vendeur
- **Mobile Money**: Orange
- **Téléphone**: +2250712345678
- **Caution**: 10,000 FCFA (2 POL)

### 2. **Mariam Diallo** - Acheteur
- **Adresse**: `0xCourier2222222222222222222222222222222`
- **Rôle**: Acheteur
- **Mobile Money**: MTN
- **Téléphone**: +2250798765432
- **Caution**: 5,000 FCFA (1 POL)

### 3. **Koffi Yao** - Livreur
- **Adresse**: `0xCourier3333333333333333333333333333333`
- **Rôle**: Livreur
- **Mobile Money**: Wave
- **Téléphone**: +2250755555555
- **Caution**: 10,000 FCFA (2 POL)

## 🚀 Configuration Initiale

### Étape 1: Configurer MetaMask
1. Ouvrir MetaMask
2. Ajouter le réseau **Polygon Amoy Testnet** :
   - Network Name: `Polygon Amoy`
   - RPC URL: `https://rpc-amoy.polygon.technology`
   - Chain ID: `80002`
   - Currency Symbol: `POL`

### Étape 2: Importer les comptes de test
Pour faciliter les tests, vous pouvez importer ces comptes dans MetaMask avec les clés privées suivantes (uniquement pour environnement de test) :

```json
// Jean Kouassi (Vendeur)
Private Key: 0x0000000000000000000000000000000000000000000000000000000000000001

// Mariam Diallo (Acheteur)  
Private Key: 0x0000000000000000000000000000000000000000000000000000000000000002

// Koffi Yao (Livreur)
Private Key: 0x0000000000000000000000000000000000000000000000000000000000000003
```

⚠️ **IMPORTANT**: Ces clés privées sont uniquement pour l'environnement de test. Jamais utiliser en production !

## 🎮 Utilisation du Sélecteur de Profil

### Interface
Un bouton **"Sélectionner Profil"** apparaît en haut à droite du dashboard.

### Fonctionnement
1. **Cliquez sur le bouton** pour ouvrir le menu
2. **Sélectionnez l'utilisateur** souhaité :
   - Jean Kouassi (Vendeur)
   - Mariam Diallo (Acheteur)
   - Koffi Yao (Livreur)
3. **La page se rechargera** avec le profil sélectionné
4. **Changez de compte MetaMask** pour correspondre à l'adresse affichée

### Simulation
Le système simule le changement de profil et met à jour localStorage pour mémoriser votre choix.

## 📱 Système de Notifications Multi-Utilisateurs

### Panneau de Notifications
- Icône de cloche en haut à droite
- Affiche les notifications de tous les utilisateurs
- Bouton **"🧪 Test"** pour générer des notifications de test

### Notifications de Test
Cliquez sur "🧪 Test" pour générer automatiquement :
- **Vendeur**: Nouvelle commande reçue
- **Acheteur**: Livreur en route
- **Livreur**: Nouvelle mission disponible

## 🚚 Flux de Test Complet

### Scénario 1: Achat via Marketplace
1. **Sélectionner Mariam Diallo** (Acheteur)
2. Aller sur la **Marketplace**
3. Choisir un produit et **commander**
4. **Payer** avec MetaMask
5. **Changer vers Jean Kouassi** (Vendeur)
6. Voir la nouvelle commande dans le dashboard
7. **Accepter** la commande
8. **Assigner** à Koffi Yao (Livreur)

### Scénario 2: Livraison Indépendante
1. **Sélectionner Jean Kouassi** (Vendeur)
2. Aller sur l'onglet **"Livreurs"**
3. Choisir un livreur disponible
4. **Remplir le formulaire** de livraison
5. **Confirmer** l'assignation

### Scénario 3: Suivi de Livraison
1. **Sélectionner Koffi Yao** (Livreur)
2. Voir les missions assignées
3. **Accepter** une mission
4. **Cliquez sur "Je suis arrivé"** pour générer QR code
5. **Changer vers Mariam Diallo** (Acheteur)
6. **Scanner** le QR code (simulation)
7. **Prendre photo** avec géolocalisation
8. **Soumettre** la preuve

## 📍 Géolocalisation en Temps Réel

### Activation Automatique
Le système de géolocalisation est automatiquement activé pour le livreur lorsqu'il accepte une mission.

### Simulation de Position
Pour les tests sans GPS réel, vous pouvez simuler une position :
```javascript
const geoService = getGeolocationService();
geoService.simulateLocation(5.3600, -3.8900); // Abidjan
```

## 📸 Preuves de Livraison

### Processus Complet
1. **Livreur arrive** → Clique "Je suis arrivé"
2. **QR Code généré** → S'affiche pour le client
3. **Client scanne** → Simulation
4. **Photo prise** → Avec géolocalisation automatique
5. **Preuve soumise** → Enregistrée dans la base de données

### Données Collectées
- Photo du colis
- Position GPS précise
- Horodatage
- Hash QR code
- Adresse livreur

## 🔔 Notifications Cross-Utilisateurs

Le système de notifications permet de voir ce que chaque utilisateur reçoit :

### Vendeur
- 📦 Nouvelle commande
- ✅ Commande acceptée
- 🚚 Livreur assigné
- 💰 Paiement reçu

### Acheteur
- ✅ Commande confirmée
- 🚚 Livreur en route
- 📍 Livreur arrivé
- 🎉 Livraison terminée

### Livreur
- 📦 Nouvelle mission
- ✅ Mission acceptée
- 📍 Arrivée confirmée
- 💰 Paiement reçu

## 🧪 Tests Automatisés

### Script de Test
```bash
# Lancer le script de test complet
node test_flux_complet.js
```

### Notifications de Test
1. Cliquez sur l'icône de notification
2. Cliquez sur "🧪 Test"
3. Les notifications apparaissent pour tous les utilisateurs
4. Changez de profil pour voir chaque perspective

## 🔄 Changement Rapide de Profil

### Méthode Rapide
1. Cliquez sur **"Sélectionner Profil"**
2. Choisissez l'utilisateur
3. Changez de compte dans MetaMask
4. La page se recharge automatiquement

### Méthode Alternative
```javascript
// Dans la console du navigateur
localStorage.setItem('currentTestUser', JSON.stringify(TEST_WALLETS.seller));
window.location.reload();
```

## 📊 État des Données de Test

### Base de Données
- **4 livreurs** disponibles
- **Table indépendante** créée pour livraisons hors marketplace
- **Toutes les tables** nécessaires actives

### Wallets
- **3 wallets** configurés avec cautions
- **Adresses** liées aux utilisateurs de la base de données
- **Prêts à être utilisés** avec MetaMask

## 🎯 Prochaines Étapes

### Pour le Vendeur
1. Ajouter des produits via "Mes Produits"
2. Voir les commandes marketplace
3. Utiliser les livreurs pour livraisons externes
4. Gérer les paiements

### Pour l'Acheteur
1. Parcourir la Marketplace
2. Commander des produits
3. Suivre les livraisons en temps réel
4. Scanner les QR codes

### Pour le Livreur
1. Voir les missions disponibles
2. Accepter les assignations
3. Signaler les arrivées
4. Soumettre les preuves de livraison

## ⚡ Astuces de Test

### Voir Tout le Monde à la Fois
1. Utilisez le **sélecteur de profil** pour changer rapidement
2. Le **panneau de notifications** montre tout le système
3. Les **données sont partagées** via la base de données SQLite

### Test Rapide
1. **Générez des notifications de test** avec le bouton 🧪
2. **Changez de profil** pour voir chaque perspective
3. **Vérifiez les données** dans la base de données

### Débogage
- **Console**: Tous les événements sont loggés
- **LocalStorage**: Les données de test sont sauvegardées
- **SQLite**: Base de données persistante pour vérification

## 🎉 Conclusion

Ce système multi-utilisateurs vous permet de :
- ✅ Tester le flux complet avec 3 rôles différents
- ✅ Voir les notifications de tous les utilisateurs
- ✅ Simuler des scénarios réels
- ✅ Faciliter le développement et les tests
- ✅ Accélérer le cycle de feedback

**Vous êtes maintenant prêt à tester l'ensemble du système Waly Platform !** 🚀