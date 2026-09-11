# E-Commerce Microservices

Arquitectura de microservicios para una plataforma e-commerce construida con **Spring Boot**, **Spring Cloud** y un frontend en **React**.

---

## Arquitectura del Sistema

```
                          ┌──────────────────────┐
                          │    Eureka Server      │
                          │      :8761            │
                          │  Service Registry     │
                          └──────────┬────────────┘
               ┌─────────────────────┼─────────────────────┐
               │                     │                     │
     ┌─────────┴──────────┐  ┌──────┴──────────────────┐  │
     │   API Gateway       │  │  Product Microservice   │  │
     │      :8080          │  │      :8081              │  │
     │  "api-gateweay"     │  │  "product-microservice" │  │
     └─────────┬──────────┘  └──────────┬──────────────┘  │
               │                         │                  │
               │  lb://PRODUCT-          │  Feign Client   │
               │  MICROSERVICE           │  (REST)         │
               │────────────────────────>│                  │
               │                         │                  │
               │  lb://ORDER-      ┌─────┴──────────────┐  │
               │  MICROSERVICE     │  Order Microservice │  │
               │──────────────────>│      :8082          │  │
  Frontend  │  /products/**       │  "order-microservice"│  │
  React ────┘  /orders/**         └─────────────────────┘  │
  :3000                                                    │
```

---

## Microservicios

### 1. Eureka Service (Service Registry)
| | |
|---|---|
| **Puerto** | `8761` |
| **Nombre** | `eureka-service` |
| **Descripcion** | Servidor de descubrimiento de servicios Netflix Eureka |

### 2. API Gateway
| | |
|---|---|
| **Puerto** | `8080` |
| **Nombre** | `api-gateweay` |
| **Framework** | Spring Cloud Gateway (WebFlux/Reactivo) |

**Rutas:**

| Ruta | Destino |
|---|---|
| `/products/**` | `lb://PRODUCT-MICROSERVICE` |
| `/orders/**` | `lb://ORDER-MICROSERVICE` |

### 3. Product Microservice
| | |
|---|---|
| **Puerto** | `8081` |
| **Base de datos** | PostgreSQL `product_db` |

**Autenticación (Spring Security + JWT):**

| Ruta             | Metodo | Acceso                          |
| ----------------- | ------ | -------------------------------- |
| `/api/products`   | `GET`  | Publico (catalogo abierto)       |
| `/api/products`   | `POST` | Requiere JWT (rol ADMIN)         |
| `/auth/login`     | `POST` | Publico (login)                  |

| Metodo | Path | Descripcion |
|---|---|---|
| `GET` | `/api/products` | Obtener todos los productos |
| `GET` | `/api/products/{id}` | Obtener producto por ID |
| `POST` | `/api/products` | Crear productos (bulk) |

### 4. Order Microservice
| | |
|---|---|
| **Puerto** | `8082` |
| **Base de datos** | PostgreSQL `order_db` |
| **Comunicacion** | Feign Client con Product Microservice |

| Metodo | Path | Descripcion |
|---|---|---|
| `GET` | `/api/orders` | Obtener todas las ordenes |
| `GET` | `/api/orders/{id}` | Obtener orden por ID |
| `POST` | `/api/orders` | Crear orden |
| `PUT` | `/api/orders` | Actualizar orden |
| `DELETE` | `/api/orders/{id}` | Eliminar orden |

### 5. Frontend (React)
| | |
|---|---|
| **Puerto** | `3000` |
| **Framework** | React 18 + Vite |
| **Estilo** | Dark Tech Theme (#0A0A0F bg, #00FF88 accent) |

**Paginas:**
- `/` - Home con banner, productos destacados, categorias
- `/products` - Catalogo con filtros (busqueda, categoria, precio, orden)
- `/products/:id` - Detalle de producto
- `/checkout` - Formulario de compra
- `/orders` - Historial de pedidos
- `/orders/:id` - Detalle de pedido

**Features:**
- Carrito persistente (localStorage)
- Toasts de notificacion
- Responsive (mobile/tablet/desktop)
- Skeletons de carga
- Estados vacios con CTA

### Capturas de Pantalla

**1. Página Principal (Home)**
![Home](captures/01_home.png)

**2. Catálogo de Productos**
![Catalog](captures/02_catalog.png)

**3. Detalle de Producto**
![Product Detail](captures/03_product_detail.png)

**4. Carrito de Compras**
![Cart Drawer](captures/04_cart_drawer.png)

**5. Checkout**
![Checkout](captures/05_checkout.png)

**6. Historial de Pedidos**
![Order History](captures/06_order_history.png)

**7. Detalle de Pedido**
![Order Detail](captures/07_order_detail.png)

---

## Comunicacion entre Microservicios

```
Order Service ──Feign──→ Product Service ──→ product_db
     │                        │
     │  GET /api/products/1   │
     │←──── { price: 24999 } ─│
     │
     └──→ Crea OrderItem con precio actual
```

**Ejemplo de request para crear orden:**
```json
POST http://localhost:8080/orders
{
  "userId": 1,
  "shippingAddress": "Av. Universidad 123, Chihuahua",
  "paymentMethod": "CREDIT_CARD",
  "items": [
    { "productId": 1, "quantity": 1 },
    { "productId": 5, "quantity": 2 }
  ]
}
```

---

## Autenticacion y Seguridad

[#autenticacion-y-seguridad](#autenticacion-y-seguridad)

`Product Microservice` implementa autenticacion stateless con JWT usando Spring Security, protegiendo las rutas administrativas mientras el catalogo permanece publico.

**Flujo de autenticacion:**

## Docker (Recomendado)

### Ejecutar con Docker Compose
```bash
docker-compose up --build
```

###Urls despues de levantar:

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Gateway | http://localhost:8080 |
| Eureka Dashboard | http://localhost:8761 |
| Product API | http://localhost:8081/api/products |
| Order API | http://localhost:8082/api/orders |

### Comandos utiles:
```bash
# Ejecutar en background
docker-compose up --build -d

# Ver logs
docker-compose logs -f

# Detener todo
docker-compose down

# Limpiar volumes
docker-compose down -v
```

---

## Ejecutar sin Docker

### Requisitos Previos
- **Java 17+**
- **Maven 3.6+**
- **PostgreSQL 12+**
- **Node.js 18+** (para frontend)
- **Puertos:** 8761, 8080, 8081, 8082, 3000, 5432

### Base de Datos
```sql
CREATE DATABASE product_db;
CREATE DATABASE order_db;
```
Credenciales: postgres / postgres

### 1. Iniciar Eureka Server (Primero)
```bash
cd eureka-service/eureka-service
mvn spring-boot:run
```

### 2. Iniciar Product Microservice
```bash
cd product-microservice
mvn spring-boot:run
```

### 3. Iniciar Order Microservice
```bash
cd order-microservice
mvn spring-boot:run
```

### 4. Iniciar API Gateway
```bash
cd ecomerse-gateweay
mvn spring-boot:run
```

### 5. Iniciar Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Stack Tecnologico

| Componente | Tecnologia |
|---|---|
| Backend | Java 17, Spring Boot 4.1.1 |
| Cloud | Spring Cloud 2025.1.3 |
| Service Discovery | Netflix Eureka |
| API Gateway | Spring Cloud Gateway (WebFlux) |
| Comunicacion | Spring Cloud OpenFeign |
| ORM | Spring Data JPA / Hibernate |
| Base de datos | PostgreSQL |
| Frontend | React 18, Vite, React Router v6 |
| Contenedores | Docker, Docker Compose |

---

## Estructura del Proyecto

```
e-commerce-microservice/
├── docker-compose.yml
├── init-db.sql
├── eureka-service/
│   └── eureka-service/
├── ecomerse-gateweay/
├── product-microservice/
├── order-microservice/
└── frontend/
    ├── src/
    │   ├── components/    (Navbar, ProductCard, CartDrawer, etc.)
    │   ├── pages/         (Home, Catalog, ProductDetail, etc.)
    │   ├── context/       (CartContext)
    │   └── api/           (client.js)
    └── nginx.conf
```

---

## Licencia

MIT
