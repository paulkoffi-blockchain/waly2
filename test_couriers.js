const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'apps/api', 'waly_platform.db');
const db = new sqlite3.Database(dbPath);

console.log('🔄 Ajout de livreurs de test...');

// Ajouter des livreurs de test
const couriers = [
  {
    wallet_address: '0xCourier1111111111111111111111111111111',
    name: 'Jean Kouassi',
    email: 'jean.kouassi@example.com',
    phone: '+2250712345678',
    user_type: 'courier',
    mobile_money_provider: 'orange',
    collateral_amount: 10000,
    collateral_active: 1,
    is_online: 1,
    current_latitude: 5.3600,
    current_longitude: -3.8900
  },
  {
    wallet_address: '0xCourier2222222222222222222222222222222',
    name: 'Mariam Diallo',
    email: 'mariam.diallo@example.com',
    phone: '+2250798765432',
    user_type: 'courier',
    mobile_money_provider: 'mtn',
    collateral_amount: 10000,
    collateral_active: 1,
    is_online: 1,
    current_latitude: 5.3700,
    current_longitude: -3.8800
  },
  {
    wallet_address: '0xCourier3333333333333333333333333333333',
    name: 'Koffi Yao',
    email: 'koffi.yao@example.com',
    phone: '+2250755555555',
    user_type: 'courier',
    mobile_money_provider: 'wave',
    collateral_amount: 10000,
    collateral_active: 1,
    is_online: 1,
    current_latitude: 5.3500,
    current_longitude: -3.9000
  }
];

couriers.forEach((courier, index) => {
  db.run(`
    INSERT OR REPLACE INTO users (
      wallet_address, name, email, phone, user_type, mobile_money_provider,
      collateral_amount, collateral_active, is_online, current_latitude, current_longitude
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    courier.wallet_address,
    courier.name,
    courier.email,
    courier.phone,
    courier.user_type,
    courier.mobile_money_provider,
    courier.collateral_amount,
    courier.collateral_active,
    courier.is_online,
    courier.current_latitude,
    courier.current_longitude
  ], function(err) {
    if (err) {
      console.error(`❌ Erreur insertion livreur ${index + 1}:`, err);
    } else {
      console.log(`✅ Livreur ${index + 1} ajouté: ${courier.name}`);
    }
  });
});

// Vérifier les livreurs insérés
setTimeout(() => {
  db.all('SELECT * FROM users WHERE user_type = ?', ['courier'], (err, rows) => {
    if (err) {
      console.error('❌ Erreur récupération livreurs:', err);
    } else {
      console.log(`\n📦 Total livreurs dans la base: ${rows.length}`);
      console.log('👥 Liste des livreurs:');
      rows.forEach((courier, index) => {
        console.log(`   ${index + 1}. ${courier.name} (${courier.wallet_address}) - ${courier.is_online ? 'En ligne' : 'Hors ligne'}`);
      });
    }
    db.close();
  });
}, 1000);