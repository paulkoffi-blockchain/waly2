# Guide de Maintien de Connexion MetaMask

## 🦊 Problème Identifié

Lorsque vous confirmez le paiement et accédez au dashboard acheteur, vous pouvez être déconnecté de MetaMask, ce qui cause plusieurs problèmes critiques :

1. **Perte de l'adresse wallet** pour les vérifications
2. **Interruption des écouteurs d'événements blockchain**
3. **Impossibilité de signer de nouvelles transactions**
4. **Mauvaise expérience utilisateur**

## ✅ Solutions Implémentées

### 1. Navigation Sans Rechargement de Page

**Fichier modifié :** `apps/web/src/app/marketplace/page.tsx`

**Avant :**
```typescript
const handleNotificationOk = () => {
  // Rediriger vers le dashboard
  window.location.href = '/dashboard?role=buyer'; // ❌ Provoque un rechargement complet
};
```

**Après :**
```typescript
const router = useRouter();

const handleNotificationOk = () => {
  // Rediriger vers le dashboard sans rechargement de page
  router.push('/dashboard?role=buyer'); // ✅ Navigation SPA
};
```

**Avantage :** La connexion MetaMask est maintenue car la page n'est pas rechargée complètement.

### 2. Vérification de Connexion Réelle

**Fichier modifié :** `apps/web/src/hooks/useWalletConnection.ts`

**Améliorations :**
- Vérification de l'état de connexion MetaMask au chargement de la page
- Vérification périodique (toutes les 5 secondes) de l'état de connexion
- Écouteurs d'événements MetaMask pour les changements de compte/réseau
- Nettoyage automatique si MetaMask est déconnecté

```typescript
// Vérification au chargement
const checkConnection = async () => {
  const savedWallet = localStorage.getItem("waly_wallet");
  if (savedWallet && window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (!accounts || accounts.length === 0) {
      // MetaMask déconnecté → nettoyage
      localStorage.removeItem("waly_wallet");
      setIsConnected(false);
    }
  }
};

// Vérification périodique
setInterval(async () => {
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  if (!accounts || accounts.length === 0) {
    // Déconnexion détectée
    localStorage.removeItem("waly_wallet");
    setIsConnected(false);
  }
}, 5000);

// Écouteurs d'événements
window.ethereum.on("accountsChanged", handleAccountsChanged);
window.ethereum.on("chainChanged", handleChainChanged);
```

### 3. Protection du Dashboard

**Fichier modifié :** `apps/web/src/app/dashboard/page.tsx`

**Ajouté :**
- Vérification de connexion MetaMask avant l'accès au dashboard
- Message d'invitation à se reconnecter si MetaMask est déconnecté
- Vérification périodique pendant l'utilisation du dashboard
- Redirection automatique vers la marketplace si la connexion est perdue

```typescript
// Vérification avant l'accès
if (!isConnected) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🦊</div>
        <h2 className="text-2xl font-bold text-white mb-4">MetaMask non connecté</h2>
        <p className="text-slate-400 mb-6">
          Pour accéder au dashboard, vous devez connecter votre wallet MetaMask.
        </p>
        <button onClick={() => router.push('/marketplace')}>
          Retour à la Marketplace
        </button>
      </div>
    </div>
  );
}

// Vérification périodique pendant l'utilisation
useEffect(() => {
  const checkMetaMaskConnection = setInterval(async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (!accounts || accounts.length === 0) {
        router.push('/marketplace'); // Redirection si déconnecté
      }
    }
  }, 10000);
  
  return () => clearInterval(checkMetaMaskConnection);
}, [isConnected, router]);
```

## 🔄 Flux Utilisateur Amélioré

### Avant (Problème) :
1. Utilisateur se connecte à MetaMask
2. Utilisateur effectue un paiement
3. Redirection vers dashboard avec `window.location.href`
4. **Page rechargée complètement**
5. **Connexion MetaMask perdue**
6. Erreurs dans le dashboard

### Après (Solution) :
1. Utilisateur se connecte à MetaMask
2. Utilisateur effectue un paiement
3. Redirection vers dashboard avec `router.push()`
4. **Navigation SPA (pas de rechargement)**
5. **Connexion MetaMask maintenue**
6. Dashboard fonctionne correctement

## 🛡 Sécurités Ajoutées

### 1. Vérification d'Adresse
Le code vérifie que l'adresse sauvegardée correspond à l'adresse actuelle de MetaMask :

```typescript
const currentAddress = accounts[0].toLowerCase();
if (currentAddress === walletData.address.toLowerCase()) {
  // Connexion valide
} else {
  // Adresse ne correspond pas → déconnexion
  localStorage.removeItem("waly_wallet");
  setIsConnected(false);
}
```

### 2. Écouteurs d'Événements
Les écouteurs détectent les changements dans MetaMask :
- `accountsChanged` : Utilisateur change de compte ou se déconnecte
- `chainChanged` : Utilisateur change de réseau

### 3. Nettoyage Automatique
Si MetaMask est détecté comme déconnecté :
- Nettoyage de localStorage
- Mise à jour de l'état de connexion
- Redirection vers la marketplace

## 📝 Recommandations Utilisateur

### Pour les Testeurs :
1. **Ne pas fermer l'extension MetaMask** pendant le processus de paiement
2. **Ne pas changer de compte** MetaMask pendant le processus
3. **Ne pas changer de réseau** Polygon Amoy pendant le processus
4. **Attendre la confirmation** de transaction avant de naviguer

### Pour les Utilisateurs Finaux :
- Le système détecte automatiquement les déconnexions
- Vous serez invité à vous reconnecter si nécessaire
- La connexion est maintenue pendant la navigation SPA

## 🔧 Dépannage

### Si vous êtes déconnecté du dashboard :

1. **Vérifiez MetaMask** :
   - Ouvrez l'extension MetaMask
   - Vérifiez que vous êtes sur le bon réseau (Polygon Amoy Testnet)
   - Vérifiez que vous êtes connecté avec le bon compte

2. **Reconnectez-vous** :
   - Cliquez sur "Retour à la Marketplace"
   - Connectez votre wallet MetaMask
   - Accédez à nouveau au dashboard

3. **Vérifiez localStorage** :
   - Ouvrez les outils de développement (F12)
   - Allez dans Application → Local Storage
   - Vérifiez que `waly_wallet` existe et contient les bonnes informations

## 🎯 Résultat

**OUI, c'était un problème important !** 

Maintenant :
- ✅ La connexion MetaMask est maintenue pendant la navigation
- ✅ Vérification automatique de l'état de connexion
- ✅ Protection contre les déconnexions accidentelles
- ✅ Meilleure expérience utilisateur
- ✅ Redirection automatique en cas de problème

**La connexion MetaMask est maintenue depuis la marketplace jusqu'au dashboard !** 🦊
