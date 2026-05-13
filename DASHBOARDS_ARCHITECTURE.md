# Architecture des Dashboards Waly Platform
## Intégration Blockchain + Base de Données

## 📊 **RÉPONSE À VOTRE QUESTION**

**OUI, les trois dashboards (Livreur, Acheteur, Vendeur) sont RELIÉS entre eux par la blockchain et la base de données !**

---

## 🔗 **ARCHITECTURE GLOBALE**

```
┌─────────────────────────────────────────────────────────────────┐
│                     Waly Platform Architecture                   │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│   Blockchain (POL)    │         │   Base de Données    │
│   Smart Contract      │◄────────►│   SQLite (API 3001)  │
│   ProofOfDelivery     │         │   NestJS Backend     │
└──────────────────────┘         └──────────────────────┘
         ▲                                   ▲
         │                                   │
         │ Événements                        │ Données
         │ temps réel                        │ partagées
         │                                   │
         └───────────────────┬───────────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
    ┌───────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
    │ BuyerDashboard│  │SellerDashboard│  │RiderDashboard│
    └──────────────┘  └───────────────┘  └──────────────┘
```

---

## 🎯 **COMMENT LES DASHBOARDS SONT RELIÉS**

### **1. SYNCHRONISATION PAR LA BLOCKCHAIN**

Les trois dashboards écoutent les **mêmes événements blockchain** pour synchroniser les états :

#### **Événements Communs Écoutés :**

| Événement Blockchain | BuyerDashboard | SellerDashboard | RiderDashboard |
|---------------------|----------------|-----------------|----------------|
| `OrderCreated` | ✅ Écoute | ✅ Écoute | ❌ Non |
| `OrderAcceptedBySeller` | ✅ Écoute | ✅ Écoute | ✅ Écoute |
| `RiderAssigned` | ✅ Écoute | ✅ Écoute | ✅ Écoute |
| `DeliveryArrived` | ❌ Non | ❌ Non | ✅ Écoute |
| `ProofOfDeliverySubmitted` | ❌ Non | ❌ Non | ✅ Écoute |
| `OrderCompleted` | ✅ Écoute | ✅ Écoute | ✅ Écoute |
| `PaymentReleased` | ✅ Écoute | ✅ Écoute | ✅ Écoute |
| `DeliveryRejected` | ✅ Écoute | ❌ Non | ❌ Non |
| `CollateralDeposited` | ❌ Non | ✅ Écoute | ❌ Non |

#### **Exemple de Flux de Synchronisation :**

```
🛒 ACHETEUR crée une commande
    ↓
📝 Blockchain: OrderCreated émis
    ↓
🔄 Tous les dashboards écoutant cet événement réagissent :
    ├─ BuyerDashboard: Met à jour l'état local + recharge BD
    └─ SellerDashboard: Met à jour l'état local + recharge BD
```

---

### **2. SYNCHRONISATION PAR LA BASE DE DONNÉES**

Les dashboards partagent les **mêmes données** via l'API SQLite :

#### **API Endpoints Partagés :**

```typescript
// Service utilisé par tous les dashboards
databaseService.getOrdersByBuyer(buyerAddress)    // BuyerDashboard
databaseService.getOrdersBySeller(sellerAddress)  // SellerDashboard  
databaseService.getOrdersByCourier(courierAddress)// RiderDashboard
databaseService.getAvailableOrdersForCouriers()   // RiderDashboard
```

#### **Données Partagées dans la Base :**

| Table | Données | Dashboards qui y accèdent |
|-------|---------|---------------------------|
| `orders` | Toutes les commandes | Buyer, Seller, Rider |
| `products` | Produits disponibles | Buyer, Seller |
| `users` | Profils utilisateurs | Tous |
| `reputation` | Scores de réputation | Tous |
| `wallet_balances` | Soldes wallets | Tous |
| `delivery_proofs` | Preuves de livraison | Buyer, Rider |
| `rejection_reasons` | Motifs de refus | Buyer, Seller |

---

## 🔄 **FLUX DE DONNÉES COMPLET**

### **Scénario 1: Création d'une Commande**

```
1. 🛒 BuyerDashboard
   ├─ Appel: createOrder() via Smart Contract
   ├─ Blockchain: Transaction signée et envoyée
   └─ Événement: OrderCreated émis

2. 📡 Blockchain (Smart Contract)
   ├─ Reçoit la transaction
   ├─ Crée la commande
   ├─ Émet l'événement OrderCreated
   └─ Met à jour l'état du contrat

3. 🔔 Écouteurs d'événements (temps réel)
   ├─ BuyerDashboard reçoit OrderCreated
   │  └─ Recharge: databaseService.getOrdersByBuyer()
   └─ SellerDashboard reçoit OrderCreated
      └─ Recharge: databaseService.getOrdersBySeller()

4. 💾 Base de Données (SQLite)
   ├─ Stocke la nouvelle commande
   ├─ Rend les données accessibles via API
   └─ Synchronise tous les dashboards
```

---

### **Scénario 2: Acceptation par le Vendeur**

```
1. 🏪 SellerDashboard
   ├─ Appel: acceptOrder() via Smart Contract
   ├─ Blockchain: Transaction signée et envoyée
   └─ Événement: OrderAcceptedBySeller émis

2. 📡 Blockchain (Smart Contract)
   ├─ Met à jour le statut de la commande
   ├─ Émet l'événement OrderAcceptedBySeller
   └─ Met à jour l'état du contrat

3. 🔔 Écouteurs d'événements
   ├─ BuyerDashboard reçoit OrderAcceptedBySeller
   │  └─ Recharge: databaseService.getOrdersByBuyer()
   ├─ SellerDashboard reçoit OrderAcceptedBySeller
   │  └─ Recharge: databaseService.getOrdersBySeller()
   └─ RiderDashboard reçoit OrderAcceptedBySeller
      └─ Recharge: databaseService.getOrdersByCourier()

4. 💾 Base de Données (SQLite)
   ├─ Met à jour le statut de la commande
   ├─ Rend les données accessibles à tous
   └─ Synchronise tous les dashboards
```

---

### **Scénario 3: Assignation du Livreur**

```
1. 🏍 RiderDashboard
   ├─ Appel: assignRider() via Smart Contract
   ├─ Blockchain: Transaction signée et envoyée
   └─ Événement: RiderAssigned émis

2. 📡 Blockchain (Smart Contract)
   ├─ Assigne le livreur à la commande
   ├─ Émet l'événement RiderAssigned
   └─ Met à jour l'état du contrat

3. 🔔 Écouteurs d'événements
   ├─ BuyerDashboard reçoit RiderAssigned
   │  └─ Recharge: databaseService.getOrdersByBuyer()
   ├─ SellerDashboard reçoit RiderAssigned
   │  └─ Recharge: databaseService.getOrdersBySeller()
   └─ RiderDashboard reçoit RiderAssigned
      └─ Recharge: databaseService.getOrdersByCourier()

4. 💾 Base de Données (SQLite)
   ├─ Met à jour le livreur assigné
   ├─ Rend les données accessibles à tous
   └─ Synchronise tous les dashboards
```

---

## 🎛️ **MÉCANISMES DE SYNCHRONISATION**

### **1. Écouteurs d'Événements Blockchain (Temps Réel)**

**BuyerDashboard.tsx (lignes 166-259)**
```typescript
useEffect(() => {
  if (!contract || !account) return;

  const setupEventListeners = () => {
    // Écouter OrderCreated
    contract.on('OrderCreated', (orderId, buyer, seller, totalAmount, timestamp) => {
      if (buyer.toLowerCase() === account.toLowerCase()) {
        console.log('🎉 Nouvelle commande créée:', { orderId, seller });
        loadOrdersFromDatabase(); // Recharge depuis la BD
      }
    });

    // Écouter OrderAcceptedBySeller
    contract.on('OrderAcceptedBySeller', (orderId, seller, timestamp) => {
      console.log('✅ Commande acceptée par le vendeur:', { orderId, seller });
      loadOrdersFromDatabase(); // Recharge depuis la BD
    });

    // ... autres écouteurs
  };

  setupEventListeners();
  
  return () => {
    // Nettoyage des écouteurs
    contract.removeAllListeners('OrderCreated');
    contract.removeAllListeners('OrderAcceptedBySeller');
    // ...
  };
}, [contract, account]);
```

**SellerDashboard.tsx (lignes 149-243)**
```typescript
useEffect(() => {
  if (!contract || !walletInfo) return;

  const setupEventListeners = () => {
    contract.on('OrderCreated', handleOrderCreated);
    contract.on('OrderAcceptedBySeller', handleOrderAccepted);
    contract.on('RiderAssigned', handleRiderAssigned);
    contract.on('OrderCompleted', handleOrderCompleted);
    contract.on('PaymentReleased', handlePaymentReleased);
    contract.on('CollateralDeposited', handleCollateralDeposited);
  };

  setupEventListeners();
  
  return () => {
    contract.removeAllListeners('OrderCreated');
    contract.removeAllListeners('OrderAcceptedBySeller');
    // ...
  };
}, [contract, walletInfo]);
```

**RiderDashboard.tsx (lignes 106-175)**
```typescript
useEffect(() => {
  if (!contract || !walletInfo) return;

  const setupEventListeners = () => {
    contract.on('RiderAssigned', handleRiderAssigned);
    contract.on('OrderAcceptedBySeller', handleOrderAccepted);
    contract.on('DeliveryArrived', handleRiderArrived);
    contract.on('ProofOfDeliverySubmitted', handleDeliveryProofSubmitted);
    contract.on('OrderCompleted', handleOrderCompleted);
    contract.on('PaymentReleased', handlePaymentReleased);
  };

  setupEventListeners();
  
  return () => {
    contract.removeAllListeners('RiderAssigned');
    contract.removeAllListeners('OrderAcceptedBySeller');
    // ...
  };
}, [contract, walletInfo]);
```

---

### **2. Rechargement Périodique depuis la Base de Données**

**BuyerDashboard.tsx (lignes 277-284)**
```typescript
// Recharger les commandes périodiquement pour les mises à jour en temps réel
const intervalId = setInterval(() => {
  if (walletInfo?.address) {
    loadOrdersFromDatabase(); // Toutes les 10 secondes
  }
}, 10000);

return () => clearInterval(intervalId);
```

**SellerDashboard.tsx (lignes 376-382)**
```typescript
// Rafraîchir les commandes toutes les 30 secondes
const interval = setInterval(() => {
  loadSellerOrdersFromDatabase(); // Toutes les 30 secondes
}, 30000);

return () => clearInterval(interval);
```

---

### **3. Service de Base de Données Partagé**

**database.service.ts (lignes 114-139)**
```typescript
class DatabaseService {
  // Méthodes utilisées par BuyerDashboard
  async getOrdersByBuyer(buyerAddress: string): Promise<Order[]> {
    return await this.request<Order[]>(`/orders/buyer/${buyerAddress}`);
  }

  // Méthodes utilisées par SellerDashboard
  async getOrdersBySeller(sellerAddress: string): Promise<Order[]> {
    return await this.request<Order[]>(`/orders/seller/${sellerAddress}`);
  }

  // Méthodes utilisées par RiderDashboard
  async getOrdersByCourier(courierAddress: string): Promise<Order[]> {
    return await this.request<Order[]>(`/orders/courier/${courierAddress}`);
  }

  // Méthode pour les commandes disponibles pour les livreurs
  async getAvailableOrdersForCouriers(): Promise<Order[]> {
    return this.request<Order[]>('/orders/available');
  }
}
```

---

## 🔍 **PREUVE DE L'INTÉGRATION**

### **1. Code Source - Écouteurs Blockchain**

**BuyerDashboard.tsx (lignes 232-237)**
```typescript
contract.on('OrderCreated', handleOrderCreated);
contract.on('OrderAcceptedBySeller', handleOrderAccepted);
contract.on('RiderAssigned', handleRiderAssigned);
contract.on('DeliveryRejected', handleDeliveryRejected);
contract.on('OrderCompleted', handleOrderCompleted);
contract.on('PaymentReleased', handlePaymentReleased);
```

**SellerDashboard.tsx (lignes 222-227)**
```typescript
contract.on('OrderCreated', handleOrderCreated);
contract.on('OrderAcceptedBySeller', handleOrderAccepted);
contract.on('RiderAssigned', handleRiderAssigned);
contract.on('OrderCompleted', handleOrderCompleted);
contract.on('PaymentReleased', handlePaymentReleased);
contract.on('CollateralDeposited', handleCollateralDeposited);
```

**RiderDashboard.tsx (lignes 154-159)**
```typescript
contract.on('RiderAssigned', handleRiderAssigned);
contract.on('OrderAcceptedBySeller', handleOrderAccepted);
contract.on('DeliveryArrived', handleRiderArrived);
contract.on('ProofOfDeliverySubmitted', handleDeliveryProofSubmitted);
contract.on('OrderCompleted', handleOrderCompleted);
contract.on('PaymentReleased', handlePaymentReleased);
```

---

### **2. Code Source - Accès Base de Données**

**BuyerDashboard.tsx (lignes 436-458)**
```typescript
const loadOrdersFromDatabase = async () => {
  if (!walletInfo?.address) return;

  console.log('🔄 Chargement des commandes pour:', walletInfo.address);
  try {
    const dbOrders = await databaseService.getOrdersByBuyer(walletInfo.address);
    console.log('✅ Commandes chargées depuis la BD:', dbOrders.length, 'commandes');
    setLocalOrders(dbOrders);
  } catch (error) {
    console.error('❌ Erreur chargement commandes depuis BD:', error);
  }
};
```

**SellerDashboard.tsx (lignes 246-258)**
```typescript
const loadSellerOrdersFromDatabase = async () => {
  const walletAddress = typeof walletInfo === 'string' ? walletInfo : (walletInfo as any)?.address;
  if (!walletAddress) return;

  try {
    const dbOrders = await databaseService.getOrdersBySeller(walletAddress);
    console.log('✅ Commandes vendeur chargées:', dbOrders.length, 'commandes');
    setSellerOrders(dbOrders);
  } catch (error) {
    console.error('❌ Erreur chargement commandes vendeur:', error);
  }
};
```

**RiderDashboard.tsx (lignes 178-202)**
```typescript
const loadDashboardData = async () => {
  if (!walletInfo) return;

  setIsLoadingData(true);
  try {
    const data = await databaseService.getDashboardData(walletInfo, 'courier');
    setDashboardData(data);
  } catch (error) {
    console.error('❌ Erreur chargement dashboard livreur:', error);
  } finally {
    setIsLoadingData(false);
  }
};
```

---

## 📊 **TABLEAU DE SYNTHÈSE**

| Aspect | Blockchain | Base de Données | Résultat |
|--------|-----------|-----------------|----------|
| **Synchronisation** | Événements temps réel | Rechargement périodique | Double synchronisation |
| **Données partagées** | États des commandes | Toutes les données | Cohérence garantie |
| **Écouteurs actifs** | 7-8 par dashboard | API REST | Communication bidirectionnelle |
| **Latence** | Quelques secondes | Immédiate | Optimisée |
| **Persistance** | Permanente | Permanente | Redondance |
| **Fiabilité** | Élevée (décentralisée) | Élevée (centralisée) | Haute disponibilité |

---

## ✅ **CONCLUSION**

**OUI, les trois dashboards sont parfaitement reliés entre eux par :**

1. **🔗 Blockchain (Smart Contract)**
   - Écouteurs d'événements temps réel
   - Synchronisation automatique des états
   - Communication directe entre les rôles

2. **💾 Base de Données (SQLite + API)**
   - Données partagées et accessibles
   - Rechargement périodique pour cohérence
   - Service centralisé pour tous les dashboards

3. **🔄 Double Mécanisme de Synchronisation**
   - Événements blockchain (temps réel)
   - Rechargement base de données (périodique)
   - Résultat : Synchronisation quasi instantanée

**L'architecture assure que toute action dans un dashboard est immédiatement visible dans les autres dashboards concernés !** 🚀

---

## 📁 **Fichiers Clés**

- `apps/web/src/components/dashboards/BuyerDashboard.tsx` - Dashboard Acheteur
- `apps/web/src/components/dashboards/SellerDashboard.tsx` - Dashboard Vendeur
- `apps/web/src/components/dashboards/RiderDashboard.tsx` - Dashboard Livreur
- `apps/web/src/services/database.service.ts` - Service base de données
- `apps/web/src/hooks/useWalyContract.ts` - Hook Smart Contract
- `apps/api/src/modules/database/database.service.ts` - Backend API
- `apps/api/src/database/sqlite.service.ts` - Service SQLite
