/**
 * Script de test pour la base de données SQLite
 * Ce script teste toutes les fonctionnalités de la base de données
 */

const http = require('http');

// Configuration
const API_BASE_URL = 'http://localhost:3001';

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Fonction utilitaire pour faire des requêtes HTTP
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port || 3001,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        try {
          const parsedData = responseData ? JSON.parse(responseData) : null;
          resolve({ status: res.statusCode, data: parsedData });
        } catch (error) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Tests
async function runTests() {
  log('\n🚀 Démarrage des tests SQLite WALY Platform\n', 'blue');

  const testWalletAddress = '0xTEST' + Date.now().toString(16).padStart(36, '0');
const testEmail = `test${Date.now()}@sqlite.com`;

  try {
    // Test 1: Créer un utilisateur
    log('📝 Test 1: Création d\'un utilisateur', 'yellow');
    const userData = {
      walletAddress: testWalletAddress,
      name: 'Utilisateur Test SQLite',
      email: testEmail,
      phone: '+221771234567',
      address: 'Dakar, Test SQLite',
      userType: 'buyer',
      mobileMoneyProvider: 'orange',
      collateralAmount: 1.0,
      collateralActive: true,
      isOnline: false
    };

    const createResult = await makeRequest('POST', '/database/users', userData);
    if (createResult.status === 200 || createResult.status === 201) {
      log('✅ Utilisateur créé avec succès', 'green');
      log(`   Données: ${JSON.stringify(createResult.data)}`, 'reset');
    } else {
      log(`❌ Erreur création utilisateur: ${createResult.status}`, 'red');
    }

    // Test 2: Récupérer l'utilisateur
    log('\n📝 Test 2: Récupération d\'un utilisateur', 'yellow');
    const getUserResult = await makeRequest('GET', `/database/users/${testWalletAddress}`);
    if (getUserResult.status === 200 && getUserResult.data) {
      log('✅ Utilisateur récupéré avec succès', 'green');
      log(`   Nom: ${getUserResult.data.name}`, 'reset');
    } else {
      log(`❌ Erreur récupération utilisateur: ${getUserResult.status}`, 'red');
    }

    // Test 3: Créer un produit
    log('\n📝 Test 3: Création d\'un produit', 'yellow');
    const productData = {
      sellerAddress: '0x1234567890123456789012345678901234567890', // Utiliser un vendeur existant
      name: 'Produit Test SQLite',
      description: 'Description du produit test',
      priceFcfa: 25000,
      category: 'electronics',
      status: 'active'
    };

    const createProductResult = await makeRequest('POST', '/database/products', productData);
    if (createProductResult.status === 200 || createProductResult.status === 201) {
      log('✅ Produit créé avec succès', 'green');
      log(`   Produit: ${createProductResult.data?.name || productData.name}`, 'reset');
    } else {
      log(`❌ Erreur création produit: ${createProductResult.status}`, 'red');
    }

    // Test 4: Récupérer les produits actifs
    log('\n📝 Test 4: Récupération des produits actifs', 'yellow');
    const getProductsResult = await makeRequest('GET', '/database/products');
    if (getProductsResult.status === 200 && Array.isArray(getProductsResult.data)) {
      log(`✅ ${getProductsResult.data.length} produits actifs récupérés`, 'green');
      if (getProductsResult.data.length > 0) {
        log(`   Premier produit: ${getProductsResult.data[0].name}`, 'reset');
      }
    } else {
      log(`❌ Erreur récupération produits: ${getProductsResult.status}`, 'red');
    }

    // Test 5: Créer une commande
    log('\n📝 Test 5: Création d\'une commande', 'yellow');
    const orderData = {
      buyerAddress: '0x2345678901234567890123456789012345678901', // Acheteur existant
      sellerAddress: '0x1234567890123456789012345678901234567890', // Vendeur existant
      productId: 1,
      itemPriceFcfa: 25000,
      deliveryAddress: 'Dakar, Test Commande',
      deliveryPhone: '+221771234567',
      buyerName: 'Acheteur Test'
    };

    const createOrderResult = await makeRequest('POST', '/database/orders', orderData);
    if (createOrderResult.status === 200 || createOrderResult.status === 201) {
      log('✅ Commande créée avec succès', 'green');
    } else {
      log(`❌ Erreur création commande: ${createOrderResult.status}`, 'red');
    }

    // Test 6: Récupérer les commandes de l'acheteur
    log('\n📝 Test 6: Récupération des commandes acheteur', 'yellow');
    const getOrdersResult = await makeRequest('GET', `/database/orders/buyer/${testWalletAddress}`);
    if (getOrdersResult.status === 200 && Array.isArray(getOrdersResult.data)) {
      log(`✅ ${getOrdersResult.data.length} commandes récupérées`, 'green');
    } else {
      log(`❌ Erreur récupération commandes: ${getOrdersResult.status}`, 'red');
    }

    // Test 7: Récupérer le solde wallet
    log('\n📝 Test 7: Récupération du solde wallet', 'yellow');
    const getWalletResult = await makeRequest('GET', `/database/wallet/${testWalletAddress}`);
    if (getWalletResult.status === 200 && getWalletResult.data) {
      log('✅ Solde wallet récupéré avec succès', 'green');
      log(`   Solde POL: ${getWalletResult.data.pol_balance || 0}`, 'reset');
      log(`   Solde FCFA: ${getWalletResult.data.fcfa_balance || 0}`, 'reset');
    } else {
      log(`❌ Erreur récupération wallet: ${getWalletResult.status}`, 'red');
    }

    // Test 8: Dashboard data
    log('\n📝 Test 8: Récupération des données dashboard', 'yellow');
    const getDashboardResult = await makeRequest('GET', `/database/dashboard/${testWalletAddress}?userType=buyer`);
    if (getDashboardResult.status === 200 && getDashboardResult.data) {
      log('✅ Données dashboard récupérées avec succès', 'green');
      log(`   Utilisateur: ${getDashboardResult.data.user?.name || 'N/A'}`, 'reset');
      log(`   Commandes: ${getDashboardResult.data.orders?.length || 0}`, 'reset');
      log(`   Statistiques: ${JSON.stringify(getDashboardResult.data.stats)}`, 'reset');
    } else {
      log(`❌ Erreur récupération dashboard: ${getDashboardResult.status}`, 'red');
    }

    // Test 9: Mettre à jour le statut d'une commande
    log('\n📝 Test 9: Mise à jour du statut commande', 'yellow');
    const updateOrderResult = await makeRequest('PUT', '/database/orders/1/status', { status: 'accepted' });
    if (updateOrderResult.status === 200) {
      log('✅ Statut commande mis à jour avec succès', 'green');
    } else {
      log(`❌ Erreur mise à jour statut: ${updateOrderResult.status}`, 'red');
    }

    log('\n🎉 Tous les tests terminés !\n', 'green');

  } catch (error) {
    log(`\n❌ Erreur lors des tests: ${error.message}\n`, 'red');
  }
}

// Attendre que l'API soit prête
setTimeout(() => {
  runTests();
}, 2000);