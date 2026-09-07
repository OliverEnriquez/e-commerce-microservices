# E-Commerce Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully functional React SPA frontend for a Spring Boot e-commerce microservice with dark tech aesthetic.

**Architecture:** React 18 + Vite SPA with React Router v6, React Context for cart state, Axios for API calls. All requests proxy through Spring Cloud Gateway at localhost:8080.

**Tech Stack:** React 18, Vite, React Router v6, Axios, lucide-react, CSS Modules

---

## Task 1: Scaffold Vite + React Project

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/vite.config.js`
- Create: `frontend/index.html`
- Create: `frontend/src/main.jsx`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "ecommerce-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "axios": "^1.7.9",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/products': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/orders': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
```

- [ ] **Step 3: Create index.html**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TechStore - E-Commerce</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create src/main.jsx**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CartProvider } from './context/CartContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
)
```

- [ ] **Step 5: Install dependencies**

Run: `cd frontend && npm install`
Expected: node_modules created, package-lock.json generated

---

## Task 2: Global Styles & Design Tokens

**Files:**
- Create: `frontend/src/index.css`

- [ ] **Step 1: Create index.css with full design system**

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg-primary: #0A0A0F;
  --bg-surface: #12121A;
  --bg-elevated: #1A1A25;
  --border: #2A2A35;
  --text-primary: #F0F0F5;
  --text-secondary: #8888AA;
  --accent: #00FF88;
  --accent-dim: #00CC6A;
  --danger: #FF4466;
  --warning: #FFAA33;
  --info: #33AAFF;
  --success: #00FF88;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --shadow-glow: 0 0 20px rgba(0, 255, 136, 0.15);
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);
  --transition: 200ms ease;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color var(--transition);
}

a:hover {
  color: var(--accent-dim);
}

button {
  font-family: var(--font-body);
  cursor: pointer;
  border: none;
  outline: none;
}

input, select, textarea {
  font-family: var(--font-body);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 0.9375rem;
  transition: border-color var(--transition);
}

input:focus, select:focus, textarea:focus {
  border-color: var(--accent);
  outline: none;
}

img {
  max-width: 100%;
  display: block;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.2;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}
```

- [ ] **Step 2: Verify empty App renders**

Create temporary `src/App.jsx`:
```jsx
export default function App() {
  return <div style={{ color: 'var(--accent)' }}>TechStore Loading...</div>
}
```

Run: `cd frontend && npm run dev`
Expected: Browser shows "TechStore Loading..." in green on dark background

---

## Task 3: API Client

**Files:**
- Create: `frontend/src/api/client.js`

- [ ] **Step 1: Create axios instance**

```js
import axios from 'axios'

const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (products) => api.post('/products', products)
}

export const orderAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (order) => api.post('/orders', order),
  update: (order) => api.put('/orders', order),
  delete: (id) => api.delete(`/orders/${id}`)
}

export default api
```

---

## Task 4: Cart Context

**Files:**
- Create: `frontend/src/context/CartContext.jsx`

- [ ] **Step 1: Create cart context with full logic**

```jsx
import { createContext, useContext, useReducer, useCallback } from 'react'

const CartContext = createContext(null)

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload)
      }
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(i => i.id !== action.payload.id)
        }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        )
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

const initialState = {
  items: [],
  isOpen: false
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = useCallback((product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } })
    dispatch({ type: 'OPEN_CART' })
  }, [])

  const removeItem = useCallback((productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' })
  }, [])

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' })
  }, [])

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const value = {
    items: state.items,
    isOpen: state.isOpen,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
```

---

## Task 5: Components — Navbar & StatusBadge

**Files:**
- Create: `frontend/src/components/Navbar.jsx`
- Create: `frontend/src/components/Navbar.module.css`
- Create: `frontend/src/components/StatusBadge.jsx`
- Create: `frontend/src/components/StatusBadge.module.css`

- [ ] **Step 1: Create Navbar component**

```jsx
import { NavLink } from 'react-router-dom'
import { ShoppingCart, Store } from 'lucide-react'
import { useCart } from '../context/CartContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { totalItems, toggleCart } = useCart()

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <Store size={24} />
          <span>TechStore</span>
        </NavLink>

        <div className={styles.links}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
            Inicio
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? styles.active : ''}>
            Catalogo
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => isActive ? styles.active : ''}>
            Mis Pedidos
          </NavLink>
        </div>

        <button className={styles.cartBtn} onClick={toggleCart}>
          <ShoppingCart size={22} />
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </button>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Create Navbar CSS Module**

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  height: 64px;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--accent);
  text-decoration: none;
}

.logo:hover {
  color: var(--accent);
}

.links {
  display: flex;
  gap: 32px;
}

.links a {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: color var(--transition);
  padding: 4px 0;
}

.links a:hover {
  color: var(--text-primary);
}

.links a.active {
  color: var(--accent);
}

.cartBtn {
  position: relative;
  background: none;
  color: var(--text-primary);
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: color var(--transition), background var(--transition);
}

.cartBtn:hover {
  color: var(--accent);
  background: var(--bg-elevated);
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--accent);
  color: var(--bg-primary);
  font-size: 0.6875rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
```

- [ ] **Step 3: Create StatusBadge component**

```jsx
import styles from './StatusBadge.module.css'

const STATUS_MAP = {
  PENDING: { label: 'Pendiente', className: styles.pending },
  CONFIRMED: { label: 'Confirmado', className: styles.confirmed },
  SHIPPED: { label: 'Enviado', className: styles.shipped },
  DELIVERED: { label: 'Entregado', className: styles.delivered },
  CANCELLED: { label: 'Cancelado', className: styles.cancelled }
}

export default function StatusBadge({ status, large = false }) {
  const config = STATUS_MAP[status] || { label: status, className: '' }
  return (
    <span className={`${styles.badge} ${config.className} ${large ? styles.large : ''}`}>
      {config.label}
    </span>
  )
}
```

- [ ] **Step 4: Create StatusBadge CSS Module**

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.large {
  padding: 6px 14px;
  font-size: 0.875rem;
}

.pending {
  background: rgba(255, 170, 51, 0.15);
  color: var(--warning);
  border: 1px solid rgba(255, 170, 51, 0.3);
}

.confirmed {
  background: rgba(0, 255, 136, 0.15);
  color: var(--success);
  border: 1px solid rgba(0, 255, 136, 0.3);
}

.shipped {
  background: rgba(51, 170, 255, 0.15);
  color: var(--info);
  border: 1px solid rgba(51, 170, 255, 0.3);
}

.delivered {
  background: rgba(0, 255, 136, 0.15);
  color: var(--success);
  border: 1px solid rgba(0, 255, 136, 0.3);
}

.cancelled {
  background: rgba(255, 68, 102, 0.15);
  color: var(--danger);
  border: 1px solid rgba(255, 68, 102, 0.3);
}
```

---

## Task 6: Components — ProductCard & QuantityControl

**Files:**
- Create: `frontend/src/components/ProductCard.jsx`
- Create: `frontend/src/components/ProductCard.module.css`
- Create: `frontend/src/components/QuantityControl.jsx`
- Create: `frontend/src/components/QuantityControl.module.css`

- [ ] **Step 1: Create ProductCard component**

```jsx
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.image || `https://placehold.co/600x400/12121A/00FF88?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className={styles.image}
        />
        <span className={styles.category}>{product.category}</span>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>S/ {product.price?.toFixed(2)}</p>
        <button className={styles.addBtn} onClick={handleAdd}>
          <ShoppingCart size={16} />
          Agregar
        </button>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Create ProductCard CSS Module**

```css
.card {
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform var(--transition), box-shadow var(--transition);
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-glow);
}

.imageWrapper {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--bg-elevated);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 300ms ease;
}

.card:hover .image {
  transform: scale(1.05);
}

.category {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(0, 0, 0, 0.6);
  color: var(--accent);
  border: 1px solid rgba(0, 255, 136, 0.3);
  backdrop-filter: blur(8px);
}

.info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price {
  font-family: var(--font-mono);
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--accent);
}

.addBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  transition: background var(--transition), color var(--transition);
  margin-top: auto;
}

.addBtn:hover {
  background: var(--accent);
  color: var(--bg-primary);
}
```

- [ ] **Step 3: Create QuantityControl component**

```jsx
import { Minus, Plus } from 'lucide-react'
import styles from './QuantityControl.module.css'

export default function QuantityControl({ quantity, onChange, min = 1, max = 99 }) {
  const decrement = () => {
    if (quantity > min) onChange(quantity - 1)
  }

  const increment = () => {
    if (quantity < max) onChange(quantity + 1)
  }

  return (
    <div className={styles.control}>
      <button className={styles.btn} onClick={decrement} disabled={quantity <= min}>
        <Minus size={14} />
      </button>
      <span className={styles.value}>{quantity}</span>
      <button className={styles.btn} onClick={increment} disabled={quantity >= max}>
        <Plus size={14} />
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Create QuantityControl CSS Module**

```css
.control {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--bg-elevated);
  color: var(--text-primary);
  transition: background var(--transition), color var(--transition);
}

.btn:hover:not(:disabled) {
  background: var(--border);
  color: var(--accent);
}

.btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.value {
  min-width: 40px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 500;
  background: var(--bg-surface);
  height: 36px;
  line-height: 36px;
}
```

---

## Task 7: Components — CartDrawer & Toast

**Files:**
- Create: `frontend/src/components/CartDrawer.jsx`
- Create: `frontend/src/components/CartDrawer.module.css`
- Create: `frontend/src/components/Toast.jsx`
- Create: `frontend/src/components/Toast.module.css`

- [ ] **Step 1: Create CartDrawer component**

```jsx
import { useNavigate } from 'react-router-dom'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import QuantityControl from './QuantityControl'
import styles from './CartDrawer.module.css'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  if (!isOpen) return null

  return (
    <>
      <div className={styles.overlay} onClick={closeCart} />
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2>Tu carrito</h2>
          <button className={styles.closeBtn} onClick={closeCart}>
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <ShoppingBag size={48} />
            <p>Tu carrito esta vacio</p>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map(item => (
                <div key={item.id} className={styles.item}>
                  <img
                    src={item.image || `https://placehold.co/80x80/12121A/00FF88?text=${encodeURIComponent(item.name)}`}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemPrice}>S/ {item.price?.toFixed(2)}</p>
                    <div className={styles.itemActions}>
                      <QuantityControl
                        quantity={item.quantity}
                        onChange={(q) => updateQuantity(item.id, q)}
                      />
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className={styles.itemSubtotal}>
                    S/ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total</span>
                <span className={styles.totalPrice}>S/ {totalPrice.toFixed(2)}</span>
              </div>
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                Ir a checkout
              </button>
              <button className={styles.keepBtn} onClick={closeCart}>
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
```

- [ ] **Step 2: Create CartDrawer CSS Module**

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 200;
  backdrop-filter: blur(4px);
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 420px;
  max-width: 100vw;
  background: var(--bg-surface);
  backdrop-filter: blur(20px);
  border-left: 1px solid var(--border);
  z-index: 201;
  display: flex;
  flex-direction: column;
  animation: slideIn 200ms ease;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.header h2 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
}

.closeBtn {
  background: none;
  color: var(--text-secondary);
  padding: 4px;
  border-radius: var(--radius-sm);
  transition: color var(--transition), background var(--transition);
}

.closeBtn:hover {
  color: var(--text-primary);
  background: var(--bg-elevated);
}

.empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--text-secondary);
}

.empty p {
  font-size: 1rem;
}

.items {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item {
  display: flex;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.item:last-child {
  border-bottom: none;
}

.itemImage {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  background: var(--bg-elevated);
}

.itemInfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.itemName {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.3;
}

.itemPrice {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.itemActions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.removeBtn {
  background: none;
  color: var(--text-secondary);
  padding: 4px;
  border-radius: var(--radius-sm);
  transition: color var(--transition);
}

.removeBtn:hover {
  color: var(--danger);
}

.itemSubtotal {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent);
  white-space: nowrap;
}

.footer {
  padding: 20px 24px;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
}

.totalPrice {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  color: var(--accent);
}

.checkoutBtn {
  width: 100%;
  padding: 14px;
  background: var(--accent);
  color: var(--bg-primary);
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  transition: background var(--transition);
}

.checkoutBtn:hover {
  background: var(--accent-dim);
}

.keepBtn {
  width: 100%;
  padding: 12px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-sm);
  transition: color var(--transition);
}

.keepBtn:hover {
  color: var(--text-primary);
}
```

- [ ] **Step 3: Create Toast component**

```jsx
import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import styles from './Toast.module.css'

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  info: Info
}

let toastId = 0
const listeners = new Set()

export function showToast(message, type = 'success') {
  const id = ++toastId
  listeners.forEach(fn => fn({ id, message, type }))
  return id
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const listener = (toast) => {
      setToasts(prev => [...prev, toast])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id))
      }, 3000)
    }
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  if (toasts.length === 0) return null

  return (
    <div className={styles.container}>
      {toasts.map(toast => {
        const Icon = ICONS[toast.type] || Info
        return (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
            <Icon size={18} />
            <span>{toast.message}</span>
            <button className={styles.closeBtn} onClick={() => removeToast(toast.id)}>
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 4: Create Toast CSS Module**

```css
.container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 300;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  animation: toastIn 200ms ease;
  min-width: 280px;
  font-size: 0.875rem;
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.success {
  border-color: rgba(0, 255, 136, 0.3);
  color: var(--success);
}

.error {
  border-color: rgba(255, 68, 102, 0.3);
  color: var(--danger);
}

.info {
  border-color: rgba(51, 170, 255, 0.3);
  color: var(--info);
}

.closeBtn {
  margin-left: auto;
  background: none;
  color: var(--text-secondary);
  padding: 2px;
  border-radius: var(--radius-sm);
  transition: color var(--transition);
}

.closeBtn:hover {
  color: var(--text-primary);
}
```

---

## Task 8: Page — Home

**Files:**
- Create: `frontend/src/pages/Home.jsx`
- Create: `frontend/src/pages/Home.module.css`

- [ ] **Step 1: Create Home page**

```jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Package, Truck, Shield } from 'lucide-react'
import { productAPI } from '../api/client'
import ProductCard from '../components/ProductCard'
import styles from './Home.module.css'

const CATEGORIES = [
  { name: 'Laptops', slug: 'Laptops' },
  { name: 'Gaming', slug: 'Gaming' },
  { name: 'Perifericos', slug: 'Perifericos' },
  { name: 'Oficina', slug: 'Oficina' }
]

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productAPI.getAll()
      .then(res => setFeatured(res.data.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Tech que define<br />tu estilo
          </h1>
          <p className={styles.heroSubtitle}>
            Los mejores productos de tecnologia, gaming y oficina con envio a todo Peru.
          </p>
          <Link to="/products" className={styles.heroCta}>
            Explorar catalogo
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className={styles.heroGlow} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Destacados</h2>
        {loading ? (
          <div className={styles.grid}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Categorias</h2>
        <div className={styles.categories}>
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className={styles.categoryCard}
            >
              <span>{cat.name}</span>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <Package size={28} />
            <div>
              <p className={styles.statValue}>30+</p>
              <p className={styles.statLabel}>Productos</p>
            </div>
          </div>
          <div className={styles.stat}>
            <Truck size={28} />
            <div>
              <p className={styles.statValue}>Todo Peru</p>
              <p className={styles.statLabel}>Envio nacional</p>
            </div>
          </div>
          <div className={styles.stat}>
            <Shield size={28} />
            <div>
              <p className={styles.statValue}>100%</p>
              <p className={styles.statLabel}>Pago seguro</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Create Home CSS Module**

```css
.home {
  padding-top: 64px;
}

.hero {
  position: relative;
  padding: 80px 24px 60px;
  text-align: center;
  overflow: hidden;
}

.heroContent {
  position: relative;
  z-index: 1;
  max-width: 640px;
  margin: 0 auto;
}

.heroTitle {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 20px;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.heroSubtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 32px;
  line-height: 1.6;
}

.heroCta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--accent);
  color: var(--bg-primary);
  font-weight: 600;
  font-size: 1rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: background var(--transition), transform var(--transition);
}

.heroCta:hover {
  background: var(--accent-dim);
  transform: translateY(-2px);
  color: var(--bg-primary);
}

.heroGlow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 24px;
}

.sectionTitle {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 28px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.skeleton {
  aspect-ratio: 3 / 4;
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.categories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.categoryCard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-weight: 500;
  text-decoration: none;
  transition: border-color var(--transition), transform var(--transition);
}

.categoryCard:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  color: var(--accent);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  color: var(--accent);
}

.statValue {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.statLabel {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .heroTitle {
    font-size: 2rem;
  }

  .stats {
    grid-template-columns: 1fr;
  }
}
```

---

## Task 9: Page — Catalog

**Files:**
- Create: `frontend/src/pages/Catalog.jsx`
- Create: `frontend/src/pages/Catalog.module.css`

- [ ] **Step 1: Create Catalog page**

```jsx
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { productAPI } from '../api/client'
import ProductCard from '../components/ProductCard'
import styles from './Catalog.module.css'

const ALL_CATEGORIES = [
  'Laptops', 'Monitores', 'Perifericos', 'Gaming', 'Audio',
  'Redes', 'Almacenamiento', 'Componentes PC', 'Oficina',
  'Hogar Inteligente', 'Accesorios'
]

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Nombre A-Z' },
  { value: 'price-desc', label: 'Mayor precio' },
  { value: 'price-asc', label: 'Menor precio' }
]

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get('category') ? [searchParams.get('category')] : []
  )
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [sort, setSort] = useState('name-asc')

  useEffect(() => {
    productAPI.getAll()
      .then(res => setProducts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    let result = [...products]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      )
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category))
    }

    if (priceMin) {
      result = result.filter(p => p.price >= parseFloat(priceMin))
    }
    if (priceMax) {
      result = result.filter(p => p.price <= parseFloat(priceMax))
    }

    const [key, dir] = sort.split('-')
    result.sort((a, b) => {
      const mul = dir === 'asc' ? 1 : -1
      if (key === 'price') return (a.price - b.price) * mul
      return (a.name || '').localeCompare(b.name || '') * mul
    })

    return result
  }, [products, search, selectedCategories, priceMin, priceMax, sort])

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedCategories([])
    setPriceMin('')
    setPriceMax('')
    setSort('name-asc')
  }

  const hasFilters = search || selectedCategories.length > 0 || priceMin || priceMax

  return (
    <div className={styles.catalog}>
      <aside className={styles.sidebar}>
        <div className={styles.searchBox}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <h3>Categorias</h3>
          {ALL_CATEGORIES.map(cat => (
            <label key={cat} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <h3>Precio (S/)</h3>
          <div className={styles.priceRange}>
            <input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <h3>Ordenar por</h3>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button className={styles.clearBtn} onClick={clearFilters}>
            <X size={14} />
            Limpiar filtros
          </button>
        )}
      </aside>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Catalogo</h1>
          <span className={styles.count}>{filtered.length} productos</span>
        </div>

        {loading ? (
          <div className={styles.grid}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>No se encontraron productos</p>
            {hasFilters && (
              <button onClick={clearFilters}>Limpiar filtros</button>
            )}
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Create Catalog CSS Module**

```css
.catalog {
  padding-top: 88px;
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 48px;
  display: flex;
  gap: 32px;
}

.sidebar {
  width: 240px;
  flex-shrink: 0;
  position: sticky;
  top: 88px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.searchBox {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
}

.searchBox input {
  border: none;
  background: none;
  padding: 0;
  flex: 1;
  font-size: 0.875rem;
}

.searchBox input:focus {
  outline: none;
}

.filterGroup h3 {
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--text-primary);
  transition: color var(--transition);
}

.checkbox:hover {
  color: var(--accent);
}

.checkbox input[type="checkbox"] {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid var(--border);
  border-radius: 3px;
  background: var(--bg-elevated);
  cursor: pointer;
  position: relative;
  padding: 0;
}

.checkbox input[type="checkbox"]:checked {
  background: var(--accent);
  border-color: var(--accent);
}

.checkbox input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  color: var(--bg-primary);
  font-weight: 700;
}

.priceRange {
  display: flex;
  align-items: center;
  gap: 8px;
}

.priceRange input {
  width: 100%;
  font-size: 0.8125rem;
  font-family: var(--font-mono);
}

.priceRange span {
  color: var(--text-secondary);
}

.filterGroup select {
  width: 100%;
  font-size: 0.875rem;
}

.clearBtn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.8125rem;
  border-radius: var(--radius-sm);
  transition: color var(--transition);
}

.clearBtn:hover {
  color: var(--danger);
}

.main {
  flex: 1;
  min-width: 0;
}

.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 24px;
}

.header h1 {
  font-family: var(--font-display);
  font-size: 1.75rem;
}

.count {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.skeleton {
  aspect-ratio: 3 / 4;
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.empty {
  text-align: center;
  padding: 80px 24px;
  color: var(--text-secondary);
}

.empty p {
  font-size: 1.125rem;
  margin-bottom: 16px;
}

.empty button {
  padding: 10px 20px;
  background: var(--bg-surface);
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  transition: background var(--transition), color var(--transition);
}

.empty button:hover {
  background: var(--accent);
  color: var(--bg-primary);
}

@media (max-width: 768px) {
  .catalog {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: static;
  }
}
```

---

## Task 10: Page — ProductDetail

**Files:**
- Create: `frontend/src/pages/ProductDetail.jsx`
- Create: `frontend/src/pages/ProductDetail.module.css`

- [ ] **Step 1: Create ProductDetail page**

```jsx
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { productAPI } from '../api/client'
import { useCart } from '../context/CartContext'
import { showToast } from '../components/Toast'
import QuantityControl from '../components/QuantityControl'
import styles from './ProductDetail.module.css'

export default function ProductDetail() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setLoading(true)
    productAPI.getById(id)
      .then(res => setProduct(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = () => {
    addItem(product, quantity)
    showToast(`${product.name} agregado al carrito`)
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.skeletonImage} />
        <div className={styles.skeletonInfo} />
      </div>
    )
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Producto no encontrado</h2>
        <Link to="/products">Volver al catalogo</Link>
      </div>
    )
  }

  return (
    <div className={styles.detail}>
      <Link to="/products" className={styles.backLink}>
        <ArrowLeft size={16} />
        Volver al catalogo
      </Link>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img
            src={product.image || `https://placehold.co/800x600/12121A/00FF88?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            className={styles.image}
          />
        </div>

        <div className={styles.infoSection}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>S/ {product.price?.toFixed(2)}</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.stock}>
            {product.quantity > 0 ? (
              <span className={styles.inStock}>En stock ({product.quantity} unidades)</span>
            ) : (
              <span className={styles.outOfStock}>Sin stock</span>
            )}
          </div>

          {product.quantity > 0 && (
            <div className={styles.actions}>
              <QuantityControl
                quantity={quantity}
                onChange={setQuantity}
                max={product.quantity}
              />
              <button className={styles.addBtn} onClick={handleAdd}>
                Agregar al carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create ProductDetail CSS Module**

```css
.detail {
  padding-top: 88px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 88px 24px 48px;
}

.backLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 32px;
  text-decoration: none;
  transition: color var(--transition);
}

.backLink:hover {
  color: var(--accent);
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

.imageSection {
  position: sticky;
  top: 88px;
}

.image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius-md);
  background: var(--bg-surface);
}

.infoSection {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--accent);
  border: 1px solid rgba(0, 255, 136, 0.3);
  width: fit-content;
}

.name {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

.price {
  font-family: var(--font-mono);
  font-size: 1.75rem;
  font-weight: 500;
  color: var(--accent);
}

.description {
  color: var(--text-secondary);
  line-height: 1.7;
}

.stock {
  padding: 12px 0;
}

.inStock {
  color: var(--success);
  font-size: 0.9375rem;
  font-weight: 500;
}

.outOfStock {
  color: var(--danger);
  font-size: 0.9375rem;
  font-weight: 500;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;
}

.addBtn {
  width: 100%;
  padding: 16px;
  background: var(--accent);
  color: var(--bg-primary);
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  transition: background var(--transition), transform var(--transition);
}

.addBtn:hover {
  background: var(--accent-dim);
  transform: translateY(-1px);
}

.loading {
  padding-top: 88px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 88px 24px 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}

.skeletonImage {
  aspect-ratio: 4 / 3;
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  animation: shimmer 1.5s infinite;
}

.skeletonInfo {
  height: 300px;
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.notFound {
  padding-top: 88px;
  text-align: center;
  padding: 120px 24px;
}

.notFound h2 {
  font-family: var(--font-display);
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .imageSection {
    position: static;
  }
}
```

---

## Task 11: Page — Checkout

**Files:**
- Create: `frontend/src/pages/Checkout.jsx`
- Create: `frontend/src/pages/Checkout.module.css`

- [ ] **Step 1: Create Checkout page**

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { orderAPI } from '../api/client'
import { showToast } from '../components/Toast'
import styles from './Checkout.module.css'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    shippingAddress: '',
    city: '',
    paymentMethod: 'CREDIT_CARD'
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (items.length === 0) {
      showToast('El carrito esta vacio', 'error')
      return
    }

    setLoading(true)
    try {
      const order = {
        userId: 1,
        shippingAddress: `${form.shippingAddress}, ${form.city}`,
        paymentMethod: form.paymentMethod,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      }
      await orderAPI.create(order)
      clearCart()
      showToast('Pedido creado exitosamente')
      navigate('/orders')
    } catch {
      showToast('Error al crear el pedido', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <ShoppingBag size={48} />
        <h2>No hay productos en el carrito</h2>
        <button onClick={() => navigate('/products')}>Ir al catalogo</button>
      </div>
    )
  }

  return (
    <div className={styles.checkout}>
      <h1>Checkout</h1>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Direccion de envio</label>
            <input
              type="text"
              name="shippingAddress"
              value={form.shippingAddress}
              onChange={handleChange}
              placeholder="Av. Principal 123"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Ciudad</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Lima"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Metodo de pago</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option value="CREDIT_CARD">Tarjeta de Credito</option>
              <option value="DEBIT_CARD">Tarjeta de Debito</option>
              <option value="PAYPAL">PayPal</option>
              <option value="TRANSFER">Transferencia</option>
            </select>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Confirmar pedido'}
          </button>
        </form>

        <div className={styles.summary}>
          <h2>Resumen del pedido</h2>
          <div className={styles.summaryItems}>
            {items.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <div>
                  <p className={styles.summaryName}>{item.name}</p>
                  <p className={styles.summaryQty}>x{item.quantity}</p>
                </div>
                <span className={styles.summarySubtotal}>
                  S/ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>S/ {totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create Checkout CSS Module**

```css
.checkout {
  padding-top: 88px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 88px 24px 48px;
}

.checkout h1 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  margin-bottom: 32px;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  align-items: start;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.field input,
.field select {
  width: 100%;
}

.submitBtn {
  width: 100%;
  padding: 16px;
  background: var(--accent);
  color: var(--bg-primary);
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  transition: background var(--transition);
  margin-top: 8px;
}

.submitBtn:hover:not(:disabled) {
  background: var(--accent-dim);
}

.submitBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.summary {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 24px;
  position: sticky;
  top: 88px;
}

.summary h2 {
  font-family: var(--font-display);
  font-size: 1.125rem;
  margin-bottom: 20px;
}

.summaryItems {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.summaryItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summaryName {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.summaryQty {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.summarySubtotal {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--text-primary);
}

.summaryTotal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  font-size: 1.125rem;
  font-weight: 700;
}

.summaryTotal span:last-child {
  font-family: var(--font-mono);
  color: var(--accent);
}

.empty {
  padding-top: 88px;
  text-align: center;
  padding: 120px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: var(--text-secondary);
}

.empty h2 {
  font-family: var(--font-display);
  color: var(--text-primary);
}

.empty button {
  padding: 12px 24px;
  background: var(--accent);
  color: var(--bg-primary);
  font-weight: 600;
  border-radius: var(--radius-sm);
  transition: background var(--transition);
}

.empty button:hover {
  background: var(--accent-dim);
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .summary {
    position: static;
  }
}
```

---

## Task 12: Pages — OrderHistory & OrderDetail

**Files:**
- Create: `frontend/src/pages/OrderHistory.jsx`
- Create: `frontend/src/pages/OrderHistory.module.css`
- Create: `frontend/src/pages/OrderDetail.jsx`
- Create: `frontend/src/pages/OrderDetail.module.css`

- [ ] **Step 1: Create OrderHistory page**

```jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, Trash2 } from 'lucide-react'
import { orderAPI } from '../api/client'
import { showToast } from '../components/Toast'
import StatusBadge from '../components/StatusBadge'
import styles from './OrderHistory.module.css'

export default function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = () => {
    setLoading(true)
    orderAPI.getAll()
      .then(res => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchOrders() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Eliminar este pedido?')) return
    try {
      await orderAPI.delete(id)
      setOrders(prev => prev.filter(o => o.id !== id))
      showToast('Pedido eliminado')
    } catch {
      showToast('Error al eliminar', 'error')
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className={styles.orders}>
        <h1>Mis Pedidos</h1>
        <div className={styles.list}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.orders}>
      <h1>Mis Pedidos</h1>

      {orders.length === 0 ? (
        <div className={styles.empty}>
          <Package size={48} />
          <p>No tienes pedidos aun</p>
          <Link to="/products">Explorar catalogo</Link>
        </div>
      ) : (
        <div className={styles.list}>
          {orders.map(order => (
            <div key={order.id} className={styles.card}>
              <div className={styles.cardMain}>
                <div className={styles.cardInfo}>
                  <span className={styles.orderId}>#{order.orderId || order.id}</span>
                  <span className={styles.date}>{formatDate(order.orderDate)}</span>
                  <span className={styles.itemsCount}>
                    {order.items?.length || 0} productos
                  </span>
                </div>
                <div className={styles.cardRight}>
                  <StatusBadge status={order.status} />
                  <span className={styles.total}>S/ {order.totalPrice?.toFixed(2)}</span>
                  <Link to={`/orders/${order.id}`} className={styles.viewBtn}>
                    Ver detalles
                  </Link>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(order.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create OrderHistory CSS Module**

```css
.orders {
  padding-top: 88px;
  max-width: 900px;
  margin: 0 auto;
  padding: 88px 24px 48px;
}

.orders h1 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  margin-bottom: 32px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  transition: border-color var(--transition);
}

.card:hover {
  border-color: rgba(0, 255, 136, 0.2);
}

.cardMain {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.cardInfo {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.orderId {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--accent);
}

.date {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.itemsCount {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.cardRight {
  display: flex;
  align-items: center;
  gap: 16px;
}

.total {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-primary);
  min-width: 100px;
  text-align: right;
}

.viewBtn {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
  white-space: nowrap;
  transition: color var(--transition);
}

.viewBtn:hover {
  color: var(--accent-dim);
}

.deleteBtn {
  background: none;
  color: var(--text-secondary);
  padding: 6px;
  border-radius: var(--radius-sm);
  transition: color var(--transition);
}

.deleteBtn:hover {
  color: var(--danger);
}

.skeleton {
  height: 80px;
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.empty {
  text-align: center;
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: var(--text-secondary);
}

.empty p {
  font-size: 1.125rem;
}

.empty a {
  padding: 12px 24px;
  background: var(--accent);
  color: var(--bg-primary);
  font-weight: 600;
  border-radius: var(--radius-sm);
  text-decoration: none;
}

@media (max-width: 768px) {
  .cardMain {
    flex-direction: column;
    align-items: flex-start;
  }

  .cardRight {
    width: 100%;
    justify-content: space-between;
  }
}
```

- [ ] **Step 3: Create OrderDetail page**

```jsx
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { orderAPI } from '../api/client'
import { showToast } from '../components/Toast'
import StatusBadge from '../components/StatusBadge'
import styles from './OrderDetail.module.css'

const PAYMENT_LABELS = {
  CREDIT_CARD: 'Tarjeta de Credito',
  DEBIT_CARD: 'Tarjeta de Debito',
  PAYPAL: 'PayPal',
  TRANSFER: 'Transferencia'
}

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderAPI.getById(id)
      .then(res => setOrder(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Eliminar este pedido?')) return
    try {
      await orderAPI.delete(id)
      showToast('Pedido eliminado')
      navigate('/orders')
    } catch {
      showToast('Error al eliminar', 'error')
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.skeletonHeader} />
        <div className={styles.skeletonBody} />
      </div>
    )
  }

  if (!order) {
    return (
      <div className={styles.notFound}>
        <h2>Pedido no encontrado</h2>
        <Link to="/orders">Volver a pedidos</Link>
      </div>
    )
  }

  return (
    <div className={styles.detail}>
      <Link to="/orders" className={styles.backLink}>
        <ArrowLeft size={16} />
        Volver a pedidos
      </Link>

      <div className={styles.header}>
        <div>
          <h1>Pedido #{order.orderId || order.id}</h1>
          <p className={styles.date}>{formatDate(order.orderDate)}</p>
        </div>
        <div className={styles.headerRight}>
          <StatusBadge status={order.status} large />
          <button className={styles.deleteBtn} onClick={handleDelete}>
            <Trash2 size={16} />
            Eliminar
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.itemsSection}>
          <h2>Productos</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map(item => (
                <tr key={item.id}>
                  <td className={styles.productName}>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td className={styles.mono}>S/ {item.unitPrice?.toFixed(2)}</td>
                  <td className={`${styles.mono} ${styles.accent}`}>S/ {item.subtotal?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"><strong>Total</strong></td>
                <td className={`${styles.mono} ${styles.accent}`}><strong>S/ {order.totalPrice?.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className={styles.infoSection}>
          <h2>Informacion de envio</h2>
          <div className={styles.infoCard}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Direccion</span>
              <span>{order.shippingAddress}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Metodo de pago</span>
              <span>{PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Usuario</span>
              <span>#{order.userId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create OrderDetail CSS Module**

```css
.detail {
  padding-top: 88px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 88px 24px 48px;
}

.backLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-decoration: none;
  margin-bottom: 32px;
  transition: color var(--transition);
}

.backLink:hover {
  color: var(--accent);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
}

.header h1 {
  font-family: var(--font-display);
  font-size: 1.75rem;
}

.date {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-top: 4px;
}

.headerRight {
  display: flex;
  align-items: center;
  gap: 16px;
}

.deleteBtn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  transition: color var(--transition), border-color var(--transition);
}

.deleteBtn:hover {
  color: var(--danger);
  border-color: var(--danger);
}

.content {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
  align-items: start;
}

.itemsSection h2,
.infoSection h2 {
  font-family: var(--font-display);
  font-size: 1.125rem;
  margin-bottom: 16px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
}

.table td {
  padding: 12px 16px;
  font-size: 0.875rem;
  border-bottom: 1px solid var(--border);
}

.table tfoot td {
  border-bottom: none;
  padding-top: 16px;
}

.productName {
  font-weight: 500;
}

.mono {
  font-family: var(--font-mono);
}

.accent {
  color: var(--accent);
}

.infoCard {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.infoRow {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.infoLabel {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
}

.loading {
  padding-top: 88px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 88px 24px 48px;
}

.skeletonHeader {
  height: 80px;
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  animation: shimmer 1.5s infinite;
  margin-bottom: 24px;
}

.skeletonBody {
  height: 300px;
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.notFound {
  padding-top: 88px;
  text-align: center;
  padding: 120px 24px;
}

.notFound h2 {
  font-family: var(--font-display);
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }

  .header {
    flex-direction: column;
    gap: 16px;
  }
}
```

---

## Task 13: App Routing & Integration

**Files:**
- Modify: `frontend/src/App.jsx`
- Create: `frontend/src/App.module.css`

- [ ] **Step 1: Create App.jsx with all routes**

```jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import ToastContainer from './components/Toast'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import OrderHistory from './pages/OrderHistory'
import OrderDetail from './pages/OrderDetail'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <CartDrawer />
      <ToastContainer />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
        </Routes>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Create App CSS Module**

```css
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}
```

---

## Task 14: Final Verification

- [ ] **Step 1: Run dev server and verify no errors**

Run: `cd frontend && npm run dev`
Expected: Server starts on http://localhost:3000 without errors

- [ ] **Step 2: Build for production**

Run: `cd frontend && npm run build`
Expected: Build succeeds, dist/ folder created

- [ ] **Step 3: Test all routes load**

Verify in browser:
- `/` — Home page with hero, featured products, categories
- `/products` — Catalog with sidebar filters
- `/products/1` — Product detail page
- `/checkout` — Checkout form (redirects to catalog if cart empty)
- `/orders` — Order history list
- `/orders/1` — Order detail page

- [ ] **Step 4: Test cart flow**

1. Add items from catalog or product detail
2. Cart drawer opens with items
3. Modify quantities in drawer
4. Go to checkout, fill form, submit
5. Redirects to orders with new order visible
