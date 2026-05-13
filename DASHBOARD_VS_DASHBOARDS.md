# Différence entre `dashboard` et `dashboards`

## 📁 **STRUCTURE DES DOSSIERS**

```
apps/web/src/components/
├── dashboard/              ❌ ANCIEN - NON UTILISÉ
│   ├── BuyerDashboard.tsx      (477 lignes)
│   ├── SellerDashboard.tsx     (439 lignes)
│   └── CourierDashboard.tsx   (386 lignes)
│
└── dashboards/             ✅ ACTUEL - EN UTILISATION
    ├── BuyerDashboard.tsx      (1385 lignes)
    ├── SellerDashboard.tsx     (804 lignes)
    ├── RiderDashboard.tsx      (573 lignes)
    ├── CourierDashboard.tsx    (573 lignes)
    ├── SellerOrdersContent.tsx
    ├── SellerProductsContent.tsx
    └── SellersCouriersContent.tsx
```

---

## 🎯 **DIFFÉRENCES PRINCIPALES**

### **1. DOSSIER `dashboard/` (SINGULIER) - ANCIEN**

**📂 Emplacement :** `apps/web/src/components/dashboard/`

**📊 Contenu :**
- `BuyerDashboard.tsx` (477 lignes)
- `SellerDashboard.tsx` (439 lignes)
- `CourierDashboard.tsx` (386 lignes)

**❌ État :** **NON UTILISÉ** - Version obsolète

**🔍 Caractéristiques :**
- Données de test simulées (mock data)
- Pas d'intégration blockchain réelle
- Pas d'intégration base de données
- Pas d'écouteurs d'événements
- Interface simple de démonstration

**📝 Exemple de code :**
```typescript
// components/dashboard/BuyerDashboard.tsx (lignes 6-9)
const [isConnected] = useState(true);
const [address] = useState('0x1234567890123456789012345678901234567890');
const [collateral] = useState({ amount: '1', isActive: true });

// Données de test simulées (lignes 21-46)
const [orders, setOrders] = useState([
  {
    id: 1,
    orderId: 'ORD001',
    productName: 'Laptop Dell XPS 13',
    sellerName: 'Vendeur Tech',
    status: 'delivered',
    // ... données simulées
  }
]);
```

---

### **2. DOSSIER `dashboards/` (PLURIEL) - ACTUEL**

**📂 Emplacement :** `apps/web/src/components/dashboards/`

**📊 Contenu :**
- `BuyerDashboard.tsx` (1385 lignes)
- `SellerDashboard.tsx` (804 lignes)
- `RiderDashboard.tsx` (573 lignes)
- `CourierDashboard.tsx` (573 lignes)
- `SellerOrdersContent.tsx`
- `SellerProductsContent.tsx`
- `SellersCouriersContent.tsx`

**✅ État :** **EN UTILISATION** - Version production

**🔍 Caractéristiques :**
- Intégration blockchain complète (Smart Contract)
- Intégration base de données (SQLite + API)
- Écouteurs d'événements temps réel
- Synchronisation entre dashboards
- Interface fonctionnelle complète

**📝 Exemple de code :**
```typescript
// components/dashboards/BuyerDashboard.tsx (lignes 134-163)
const { 
  isConnected, 
  walletInfo, 
  connectWallet, 
  disconnectWallet,
  orders 
} = useWallet();

const { 
  createOrder, 
  createOrderAsBuyer,
  depositCollateral, 
  fundOrderAsBuyer,
  contract,
  account
} = useWalyContract();

// Écouteurs d'événements blockchain (lignes 166-259)
contract.on('OrderCreated', handleOrderCreated);
contract.on('OrderAcceptedBySeller', handleOrderAccepted);
contract.on('RiderAssigned', handleRiderAssigned);

// Chargement depuis la base de données (lignes 436-458)
const loadOrdersFromDatabase = async () => {
  const dbOrders = await databaseService.getOrdersByBuyer(walletInfo.address);
  setLocalOrders(dbOrders);
};
```

---

## 🔍 **COMPARAISON DÉTAILLÉE**

| Aspect | `dashboard/` (Ancien) | `dashboards/` (Actuel) |
|--------|----------------------|----------------------|
| **Lignes de code** | ~400-477 lignes | ~573-1385 lignes |
| **Données** | Simulées (mock) | Réelles (Blockchain + BD) |
| **Blockchain** | ❌ Non | ✅ Oui (Smart Contract) |
| **Base de données** | ❌ Non | ✅ Oui (SQLite + API) |
| **Écouteurs événements** | ❌ Non | ✅ Oui (temps réel) |
| **Synchronisation** | ❌ Non | ✅ Oui (entre dashboards) |
| **Utilisation** | ❌ Obsolète | ✅ Production |
| **Importé par app** | ❌ Non | ✅ Oui |

---

## 📋 **QUEL DOSSIER EST UTILISÉ ?**

**✅ Le dossier `dashboards/` (PLURIEL) est utilisé dans l'application**

**Preuve dans le code :**

```typescript
// apps/web/src/app/dashboard/page.tsx (lignes 5-7)
import { BuyerDashboard } from "@/components/dashboards/BuyerDashboard";
import { SellerDashboard } from "@/components/dashboards/SellerDashboard";
import RiderDashboard from "@/components/dashboards/RiderDashboard";
```

**❌ Le dossier `dashboard/` (SINGULIER) n'est PAS utilisé**

Aucun import ne fait référence à ce dossier dans l'application.

---

## 🗑️ **RECOMMANDATION**

**Le dossier `dashboard/` (singulier) devrait être supprimé** car :

1. ❌ Il n'est pas utilisé dans l'application
2. ❌ Il contient du code obsolète
3. ❌ Il crée de la confusion
4. ❌ Il contient des données simulées non fonctionnelles

**Commande de suppression suggérée :**
```bash
rm -rf apps/web/src/components/dashboard
```

---

## 📊 **RÉSUMÉ**

| Dossier | État | Utilisation | Action |
|---------|------|-------------|--------|
| `dashboard/` (singulier) | ❌ Obsolète | Non utilisée | 🗑️ À supprimer |
| `dashboards/` (pluriel) | ✅ Actuel | En production | ✅ À conserver |

**Conclusion :** Seul le dossier `dashboards/` (pluriel) est utilisé et contient les dashboards fonctionnels avec intégration blockchain et base de données complète.
