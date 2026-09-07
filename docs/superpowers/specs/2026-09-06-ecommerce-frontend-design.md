# E-Commerce Frontend Design Spec

## Overview

React SPA frontend for a Spring Boot e-commerce microservice. Dark tech aesthetic with neon green accents. Sells electronics, peripherals, gaming, and office equipment in Peruvian Soles.

**Backend:** Gateway at `localhost:8080` proxying to Product (8081) and Order (8082) microservices.

**No authentication:** UserId simulated as `1` for all operations.

---

## Design Tokens

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0A0A0F` | Page background |
| `--bg-surface` | `#12121A` | Cards, modals, sidebar |
| `--bg-elevated` | `#1A1A25` | Hover states, inputs |
| `--border` | `#2A2A35` | Subtle borders |
| `--text-primary` | `#F0F0F5` | Headings, primary text |
| `--text-secondary` | `#8888AA` | Descriptions, labels |
| `--accent` | `#00FF88` | CTAs, links, active states |
| `--accent-dim` | `#00CC6A` | Hover accent |
| `--danger` | `#FF4466` | Delete, errors, CANCELLED |
| `--warning` | `#FFAA33` | PENDING status |
| `--info` | `#33AAFF` | SHIPPED status |
| `--success` | `#00FF88` | DELIVERED, CONFIRMED |

### Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display | Space Grotesk | 700 | 2.5rem |
| H1 | Space Grotesk | 600 | 2rem |
| H2 | Space Grotesk | 600 | 1.5rem |
| H3 | Space Grotesk | 500 | 1.25rem |
| Body | Inter | 400 | 1rem |
| Small | Inter | 400 | 0.875rem |
| Caption | JetBrains Mono | 400 | 0.75rem |

### Spacing Scale

4px base: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80

### Border Radius

- `--radius-sm`: 6px (badges, small elements)
- `--radius-md`: 10px (cards, inputs)
- `--radius-lg`: 16px (modals, drawers)

### Signature Effect

Product cards emit a `0 0 20px rgba(0,255,136,0.15)` green glow on hover. Cart sidebar uses `backdrop-filter: blur(20px)` glassmorphism over a semi-transparent dark background.

---

## Pages

### 1. Home (`/`)

**Job:** Welcome users, showcase featured products, drive to catalog.

- **Hero:** Full-width gradient from `--bg-primary` to `--bg-surface` with large heading "Tech que define tu estilo", subheading about the catalog, and CTA button "Explorar catálogo" (accent colored)
- **Featured Products:** Horizontal scroll row of 6 product cards
- **Categories:** Grid of 4 category pills (Laptops, Gaming, Perifericos, Oficina) linking to filtered catalog
- **Stats Bar:** 3 columns — "30+ Productos", "Envio a todo Peru", "Pago seguro"

### 2. Catalog (`/products`)

**Job:** Browse and filter all products.

- **Layout:** Sidebar filters (left 240px) + product grid (remaining)
- **Filter sidebar:**
  - Search input with magnifying glass icon
  - Category checkboxes: Laptops, Monitores, Perifericos, Gaming, Audio, Redes, Almacenamiento, Componentes PC, Oficina, Hogar Inteligente, Accesorios
  - Price range: min/max inputs in S/
  - "Limpiar filtros" button
- **Product grid:** Responsive CSS Grid — 1 col mobile, 2 cols tablet, 3 cols desktop
- **Sort dropdown:** "Mayor precio", "Menor precio", "Nombre A-Z"
- **Empty state:** "No se encontraron productos" with icon
- **Loading state:** Skeleton shimmer cards

### 3. Product Detail (`/products/:id`)

**Job:** Show full product info, enable add to cart.

- **Layout:** Two columns — image (left 50%), info (right 50%)
- **Image:** Product image with dark overlay gradient at bottom
- **Info panel:**
  - Category badge (accent border)
  - Product name (H1)
  - Price in S/ with 2 decimals, large accent text
  - Description paragraph
  - Stock indicator: "En stock (X unidades)" green or "Sin stock" red
  - Quantity selector: minus/plus buttons with number input
  - "Agregar al carrito" button (accent, full width)
- **Back link:** "< Volver al catalogo"

### 4. Cart (Drawer overlay, not a page)

**Job:** Review items, modify quantities, proceed to checkout.

- **Trigger:** Cart icon in navbar with item count badge
- **Drawer:** Slides from right, glassmorphism background (`backdrop-filter: blur(20px)`)
- **Header:** "Tu carrito" with close X button
- **Items list:** Each item shows image thumbnail, name, unit price, quantity controls (minus/plus), subtotal, trash icon to remove
- **Empty state:** "Tu carrito esta vacio" with shopping bag icon
- **Footer:**
  - Subtotal line
  - Total line (bold, accent color)
  - "Ir a checkout" button (accent, full width)
  - "Seguir comprando" link

### 5. Checkout (`/checkout`)

**Job:** Collect shipping and payment info, create order.

- **Layout:** Two columns — form (left 60%), order summary (right 40%)
- **Form fields:**
  - Direccion de envio (text input, required)
  - Metodo de pago (select: Tarjeta de Credito, Tarjeta de Debito, PayPal, Transferencia)
  - Ciudad (text input)
- **Order summary:** List of cart items with quantities and subtotals, total at bottom
- **Submit button:** "Confirmar pedido" (accent, full width)
- **Success:** Redirect to order detail with success toast

### 6. Order History (`/orders`)

**Job:** Show all past orders for the user.

- **Layout:** Full width list
- **Order card:** Horizontal card with:
  - Order ID (monospace)
  - Date formatted (DD/MM/YYYY HH:mm)
  - Status badge (colored: PENDING=warning, CONFIRMED=success, SHIPPED=info, DELIVERED=success, CANCELLED=danger)
  - Total in S/
  - Items count
  - "Ver detalles" link
- **Empty state:** "No tienes pedidos aun" with package icon
- **Delete button:** Trash icon per order with confirmation

### 7. Order Detail (`/orders/:id`)

**Job:** Show complete order information.

- **Layout:** Full width
- **Header:** Order ID, date, status badge (large)
- **Two columns:**
  - **Items table:** Product name, quantity, unit price, subtotal per row, total at bottom
  - **Shipping info:** Address, payment method, user ID
- **Actions:** "Volver a pedidos" link, delete order button

---

## Components

### Navbar
- Fixed top, `--bg-surface` background with bottom border
- Left: Logo/brand "TechStore" in Space Grotesk bold, accent color
- Center: Nav links — "Inicio", "Catalogo", "Mis Pedidos"
- Right: Cart icon with count badge (accent background, dark text)

### ProductCard
- `--bg-surface` background, `--radius-md` border radius
- Image area with aspect-ratio 4/3, object-fit cover
- Category badge top-left (small, accent border, transparent bg)
- Name (H3), price (accent, monospace), "Agregar al carrito" button
- Hover: green glow shadow, slight scale(1.02) transform

### StatusBadge
- Small pill badge with status-specific color
- Text: PENDING="Pendiente", CONFIRMED="Confirmado", SHIPPED="Enviado", DELIVERED="Entregado", CANCELLED="Cancelado"

### QuantityControl
- Horizontal group: minus button, number display, plus button
- `--bg-elevated` background, `--border` borders
- Accent color on hover

### Toast
- Fixed bottom-right notification
- Success (green), error (red), info (blue)
- Auto-dismiss after 3 seconds

---

## API Integration

All requests go through the gateway at `http://localhost:8080`.

| Action | Method | Endpoint | Body |
|--------|--------|----------|------|
| List products | GET | `/products` | — |
| Get product | GET | `/products/{id}` | — |
| List orders | GET | `/orders` | — |
| Get order | GET | `/orders/{id}` | — |
| Create order | POST | `/orders` | Order JSON |
| Update order | PUT | `/orders` | Order JSON |
| Delete order | DELETE | `/orders/{id}` | — |

### Order JSON structure for POST:

```json
{
  "userId": 1,
  "shippingAddress": "Av. Principal 123, Lima",
  "paymentMethod": "CREDIT_CARD",
  "items": [
    { "productId": 1, "quantity": 1 }
  ]
}
```

The backend automatically calculates totals, product names, and prices via Feign client calls.

---

## Tech Stack

- **React 18** via Vite
- **React Router v6** for client-side routing
- **React Context** for cart state (no Redux needed)
- **Axios** for HTTP requests
- **lucide-react** for icons
- **CSS Modules** for scoped styling
- **Vite dev server** with proxy to gateway

---

## File Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.module.css
│   ├── index.css              (global styles, tokens, reset)
│   ├── api/
│   │   └── client.js          (axios instance + interceptors)
│   ├── context/
│   │   └── CartContext.jsx    (cart state, add/remove/update)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.module.css
│   │   ├── ProductCard.jsx
│   │   ├── ProductCard.module.css
│   │   ├── StatusBadge.jsx
│   │   ├── StatusBadge.module.css
│   │   ├── QuantityControl.jsx
│   │   ├── QuantityControl.module.css
│   │   ├── CartDrawer.jsx
│   │   ├── CartDrawer.module.css
│   │   ├── Toast.jsx
│   │   └── Toast.module.css
│   └── pages/
│       ├── Home.jsx
│       ├── Home.module.css
│       ├── Catalog.jsx
│       ├── Catalog.module.css
│       ├── ProductDetail.jsx
│       ├── ProductDetail.module.css
│       ├── Checkout.jsx
│       ├── Checkout.module.css
│       ├── OrderHistory.jsx
│       ├── OrderHistory.module.css
│       ├── OrderDetail.jsx
│       └── OrderDetail.module.css
```
