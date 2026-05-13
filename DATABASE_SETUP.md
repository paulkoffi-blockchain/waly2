# Base de Données Locale MySQL - Guide d'Installation

## Configuration XAMPP + MySQL

### 1. Installation de XAMPP
```bash
# Télécharger XAMPP depuis https://www.apachefriends.org/
# Installer XAMPP avec Apache et MySQL
```

### 2. Démarrage des Services
1. Ouvrir XAMPP Control Panel
2. Démarrer Apache
3. Démarrer MySQL

### 3. Configuration de la Base de Données
```sql
-- Se connecter à MySQL via phpMyAdmin ou ligne de commande:
-- http://localhost/phpmyadmin

-- Importer le fichier de schéma:
-- database/waly_platform.sql
```

### 4. Configuration des Variables d'Environnement

#### Fichier `.env` pour l'API (apps/api/.env)
```env
# Configuration Base de Données MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=waly_platform

# Configuration API
NODE_ENV=development
PORT=3001
```

#### Fichier `.env.local` pour le Web (apps/web/.env.local)
```env
# Configuration API URL
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Installation des Dépendances

### API Backend
```bash
cd apps/api
npm install
npm install @nestjs/typeorm mysql2 typeorm
```

### Web Frontend
```bash
cd apps/web
npm install
```

## Démarrage des Applications

### 1. Démarrer l'API Backend
```bash
cd apps/api
npm run start:dev
```

### 2. Démarrer le Web Frontend
```bash
cd apps/web
npm run dev
```

## Test de l'Intégration

### 1. Vérification de la Connexion Base de Données
```bash
# Tester l'endpoint de santé
curl http://localhost:3001/database/users/0x1234567890123456789012345678901234567890
```

### 2. Test des Endpoints API

#### Créer un Utilisateur
```bash
curl -X POST http://localhost:3001/database/users \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "0x1234567890123456789012345678901234567890",
    "name": "Test Livreur",
    "userType": "courier",
    "phone": "+221771234567"
  }'
```

#### Obtenir les Données Dashboard
```bash
curl http://localhost:3001/database/dashboard/0x1234567890123456789012345678901234567890?userType=courier
```

## Structure des Données

### Tables Principales
- **users**: Informations des utilisateurs (vendeurs, acheteurs, livreurs)
- **products**: Catalogue des produits
- **orders**: Historique des commandes
- **reputation_scores**: Notes et réputation
- **wallet_balances**: Soldes des wallets
- **delivery_proofs**: Preuves de livraison
- **rejection_reasons**: Raisons de refus

### Vues Utilitaires
- **order_details**: Vue détaillée des commandes
- **user_reputation**: Scores de réputation agrégés

## Fonctionnalités Implémentées

### Entrées de Données (Ce qu'on enregistre)
✅ Informations des utilisateurs (nom, prénom, téléphone, adresse, type de compte)
✅ Détails complets de chaque commande (prix, date, statut, adresse de livraison)
✅ Historique des cautions déposées
✅ Photos et preuves de livraison (hash IPFS)
✅ Historique des transactions et paiements
✅ Raisons de refus quand un acheteur refuse un colis
✅ Score de réputation des livreurs

### Sorties de Données (Ce qu'on affiche)
✅ Liste des commandes en cours pour chaque utilisateur
✅ Historique des commandes passées
✅ Tableau de bord personnalisé selon le profil (Acheteur, Vendeur, Livreur)
✅ Statut en temps réel d'une commande
✅ Montant disponible dans le wallet de l'utilisateur
✅ Liste des commandes à livrer pour les livreurs

## Dépannage

### Problèmes Communs

#### 1. Erreur de Connexion MySQL
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution**: Vérifier que MySQL est démarré dans XAMPP

#### 2. Base de Données Introuvable
```
Error: Unknown database 'waly_platform'
```
**Solution**: Importer le fichier `database/waly_platform.sql` via phpMyAdmin

#### 3. Permissions Refusées
```
Error: Access denied for user 'root'@'localhost'
```
**Solution**: Vérifier le mot de passe MySQL dans `.env`

### Logs et Débogage

#### Logs API
```bash
# Les logs de l'API s'affichent dans le terminal
# Activer les logs SQL en mode développement
```

#### Logs Base de Données
```sql
-- Vérifier les connexions actives
SHOW PROCESSLIST;

-- Vérifier les tables
SHOW TABLES;
```

## Performance et Optimisation

### Indexes Configurés
- Recherche rapide par adresse wallet
- Filtrage par statut de commande
- Recherche par type d'utilisateur

### Connections Pool
- Configuration: 10 connections maximum
- Timeout: 60 secondes
- Reconnexion automatique

## Sécurité

### Mesures Implémentées
- Validation des entrées
- Protection contre les injections SQL
- Chiffrement des mots de passe
- CORS configuré

### Recommendations
- Utiliser des variables d'environnement
- Limiter les permissions de la base de données
- Activer les logs d'audit
- Sauvegardes régulières
