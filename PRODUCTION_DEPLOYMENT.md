# 🚀 WALY Platform - Guide de Déploiement en Production

## 📋 Prérequis

### Système
- Node.js 20.19.0+ 
- MySQL 8.0+
- Git

### Infrastructure
- Serveur web (Nginx/Apache)
- Base de données MySQL
- Domaine configuré

---

## 🛠️ Étape 1: Configuration Base de Données

```bash
# Importer la base de données
mysql -u root -p < database/waly_platform.sql

# Créer utilisateur dédié
CREATE USER 'waly_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON waly_platform.* TO 'waly_user'@'localhost';
FLUSH PRIVILEGES;
```

---

## 🔧 Étape 2: Configuration Variables d'Environnement

### Backend (apps/api/.env)
```env
NODE_ENV=production
PORT=3001

# Base de données
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=waly_user
DATABASE_PASSWORD=secure_password
DATABASE_NAME=waly_platform

# Blockchain
ETHEREUM_RPC_URL=https://polygon-mainnet.infura.io/v3/YOUR_PROJECT_ID
PRIVATE_KEY=your_private_key_here
CONTRACT_ADDRESS=your_contract_address

# Sécurité
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=https://yourdomain.com
```

### Frontend (apps/web/.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://polygon-mainnet.infura.io/v3/YOUR_PROJECT_ID
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_NETWORK_ID=137
```

---

## 🏗️ Étape 3: Build Production

```bash
# Builder le backend
cd apps/api
npm install --production
npm run build

# Builder le frontend
cd ../web
npm install --production
npm run build
```

---

## 🚀 Étape 4: Déploiement

### Backend (API)
```bash
cd apps/api
npm run start:prod
# Ou avec PM2 pour production
pm2 start dist/main.js --name "waly-api"
```

### Frontend (Web)
```bash
cd apps/web
npm run start
# Ou servir avec Nginx
sudo cp -r .next/* /var/www/waly/
```

---

## 🌐 Configuration Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # Frontend
    location / {
        root /var/www/waly;
        try_files $uri $uri/ /index.html;
    }
    
    # API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔒 Sécurité

### SSL/TLS
```bash
# Installer Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Firewall
```bash
# Ports requis
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

---

## 📊 Monitoring

### Logs
```bash
# Backend logs
pm2 logs waly-api

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Performance
```bash
# Installer monitoring
npm install -g pm2
pm2 install pm2-server-monit
```

---

## 🔄 Mise à Jour

```bash
# Pull des changements
git pull origin main

# Rebuild
npm run build

# Redémarrage
pm2 restart waly-api
```

---

## ✅ Vérification Déploiement

1. **API**: `https://api.yourdomain.com/health`
2. **Frontend**: `https://yourdomain.com`
3. **Base de données**: Connexion test
4. **Blockchain**: Transactions test

---

## 🆘 Support

- **Documentation**: `/docs`
- **Logs**: `/var/log/waly/`
- **Monitoring**: PM2 Dashboard

---

## 📈 Performance Optimisation

### Database
```sql
-- Optimiser les tables
OPTIMIZE TABLE users, products, orders, delivery_proofs;

-- Ajouter indexes si nécessaire
CREATE INDEX idx_performance ON orders(status, created_at);
```

### Cache
```bash
# Configurer Redis pour le cache
npm install redis
```

---

## 🎉 Déploiement Terminé !

Votre plateforme WALY est maintenant en production !

**URLs**:
- 🌐 Frontend: `https://yourdomain.com`
- 🔧 API: `https://api.yourdomain.com`
- 📊 Monitoring: `http://your-server:3000`
