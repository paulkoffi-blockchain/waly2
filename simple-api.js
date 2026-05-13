const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Base de données en mémoire
let orders = [];
let products = [
  {
    id: 1,
    sellerAddress: "0xSeller123456789012345678901234567890",
    name: "iPhone 14 Pro",
    description: "Latest iPhone with advanced features",
    price: 950000,
    collateral: 50000,
    category: "electronics",
    isActive: true,
    stock: 10,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    sellerAddress: "0xSeller123456789012345678901234567890",
    name: "Samsung Galaxy S23",
    description: "Premium Android smartphone",
    price: 850000,
    collateral: 40000,
    category: "electronics",
    isActive: true,
    stock: 15,
    createdAt: new Date().toISOString()
  }
];

// Routes pour les produits
app.get('/database/products', (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/database/products/active', (req, res) => {
  try {
    const activeProducts = products.filter(p => p.isActive !== false);
    res.json(activeProducts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/database/products/seller/:sellerAddress', (req, res) => {
  try {
    const sellerProducts = products.filter(p => p.sellerAddress === req.params.sellerAddress);
    res.json(sellerProducts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/database/products', (req, res) => {
  try {
    const newProduct = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Routes pour les commandes
app.get('/database/orders/buyer/:buyerAddress', (req, res) => {
  try {
    const buyerOrders = orders.filter(o => o.buyerAddress === req.params.buyerAddress);
    res.json(buyerOrders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/database/orders/seller/:sellerAddress', (req, res) => {
  try {
    const sellerOrders = orders.filter(o => o.sellerAddress === req.params.sellerAddress);
    res.json(sellerOrders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/database/orders', (req, res) => {
  try {
    const newOrder = {
      id: Date.now(),
      orderId: req.body.orderId || Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    orders.push(newOrder);
    res.json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Simple API is running' });
});

// Routes pour les livreurs
app.get('/database/orders/courier/:courierAddress', (req, res) => {
  try {
    const courierOrders = orders.filter(o => o.courierAddress === req.params.courierAddress);
    res.json(courierOrders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/database/orders/available', (req, res) => {
  try {
    const availableOrders = orders.filter(o => o.status === 'accepted' && !o.courierAddress);
    res.json(availableOrders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/database/orders/:orderId/status', (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    const orderIndex = orders.findIndex(o => o.id === parseInt(orderId));
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      orders[orderIndex].updatedAt = new Date().toISOString();
      res.json(orders[orderIndex]);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Routes pour les utilisateurs
app.post('/database/users', (req, res) => {
  try {
    const newUser = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/database/users/:walletAddress', (req, res) => {
  try {
    // Simuler un utilisateur
    const user = {
      id: 1,
      walletAddress: req.params.walletAddress,
      name: 'User Name',
      email: 'user@example.com',
      userType: 'buyer',
      createdAt: new Date().toISOString()
    };
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/database/users/:walletAddress', (req, res) => {
  try {
    const updatedUser = {
      id: 1,
      walletAddress: req.params.walletAddress,
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Routes pour la réputation
app.post('/database/reputation', (req, res) => {
  try {
    const newReputation = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    res.json(newReputation);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/database/reputation/:userAddress', (req, res) => {
  try {
    const reputation = {
      overallRating: 4.5,
      deliveryRating: 4.7,
      sellingRating: 4.3,
      buyingRating: 4.6,
      totalRatings: 25,
      deliveryCount: 10,
      sellingCount: 8,
      buyingCount: 7
    };
    res.json(reputation);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Routes pour les wallets
app.get('/database/wallet/:userAddress', (req, res) => {
  try {
    const wallet = {
      userAddress: req.params.userAddress,
      deliveryAddress: "Abidjan, Côte d'Ivoire", 
      deliveryPhone: "+225000000000", 
      ethBalance: 1.5,
      fcfaBalance: 750000,
      updatedAt: new Date().toISOString()
    };
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/database/wallet/:userAddress', (req, res) => {
  try {
    const updatedWallet = {
      userAddress: req.params.userAddress,
      ethBalance: req.body.ethBalance || 1.5,
      fcfaBalance: req.body.fcfaBalance || 750000,
      updatedAt: new Date().toISOString()
    };
    res.json(updatedWallet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Routes pour les preuves de livraison
app.post('/database/delivery-proof', (req, res) => {
  try {
    const newProof = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    res.json(newProof);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/database/delivery-proof/order/:orderId', (req, res) => {
  try {
    // Simuler des preuves de livraison
    const proofs = [];
    res.json(proofs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Routes pour les raisons de refus
app.post('/database/rejection-reason', (req, res) => {
  try {
    const newReason = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    res.json(newReason);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/database/rejection-reason/order/:orderId', (req, res) => {
  try {
    // Simuler des raisons de refus
    const reasons = [];
    res.json(reasons);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Dashboard data endpoint
app.get('/database/dashboard/:userAddress', (req, res) => {
  try {
    const { userAddress } = req.params;
    const { userType } = req.query;
    
    let dashboardData = {
      user: {
        id: 1,
        walletAddress: userAddress,
        name: 'User Name',
        userType: userType || 'buyer'
      },
      orders: [],
      products: [],
      stats: {
        totalOrders: 0,
        completedOrders: 0,
        pendingOrders: 0,
        activeOrders: 0
      },
      walletBalance: {
        fcfaBalance: 750000,
        ethBalance: 1.5
      },
      reputation: {
        overallRating: 4.5,
        deliveryRating: 4.7,
        sellingRating: 4.3,
        buyingRating: 4.6,
        totalRatings: 25,
        deliveryCount: 10,
        sellingCount: 8,
        buyingCount: 7
      }
    };

    if (userType === 'buyer') {
      dashboardData.orders = orders.filter(o => o.buyerAddress === userAddress);
    } else if (userType === 'seller') {
      dashboardData.orders = orders.filter(o => o.sellerAddress === userAddress);
      dashboardData.products = products.filter(p => p.sellerAddress === userAddress);
    } else if (userType === 'courier') {
      dashboardData.orders = orders.filter(o => o.courierAddress === userAddress);
    }

    dashboardData.stats.totalOrders = dashboardData.orders.length;
    dashboardData.stats.completedOrders = dashboardData.orders.filter(o => o.status === 'delivered').length;
    dashboardData.stats.pendingOrders = dashboardData.orders.filter(o => o.status === 'created' || o.status === 'accepted').length;
    dashboardData.stats.activeOrders = dashboardData.stats.pendingOrders; // Pour les livreurs, les commandes actives sont les commandes en attente

    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Simple API server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
});
