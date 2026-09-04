# E-Commerce Microservices

Arquitectura de microservicios para una plataforma e-commerce construida con **Spring Boot** y **Spring Cloud**.

---

## Arquitectura del Sistema

```
                          ┌──────────────────────┐
                          │    Eureka Server      │
                          │      :8761            │
                          │                       │
                          │  Service Registry     │
                          └──────────┬────────────┘
                            Register │
               ┌─────────────────────┼─────────────────────┐
               │                     │                     │
     ┌─────────┴──────────┐  ┌──────┴──────────────────┐  │
     │   API Gateway       │  │  Product Microservice   │  │
     │      :8080          │  │      :8081              │  │
     │                     │  │                         │  │
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
               │                   │                     │  │
 External  │  /products/**        │  "order-microservice"│  │
 Clients ──┘  /orders/**          └─────────────────────┘  │
```

---

## Microservicios

### 1. Eureka Service (Service Registry)
| | |
|---|---|
| **Puerto** | `8761` |
| **Nombre** | `eureka-service` |
| **Descripcion** | Servidor de descubrimiento de servicios Netflix Eureka. Todos los microservicios se registran aqui para que puedan encontrarse entre si. |
| **Dashboard** | `http://localhost:8761/` |

**Dependencias principales:**
- `spring-cloud-starter-netflix-eureka-server`

**Configuracion clave:**
- `eureka.client.register-with-eureka=false` - No se registra a si mismo
- `eureka.client.fetch-registry=false` - No obtiene su propio registro

---

### 2. E-Commerce Gateway (API Gateway)
| | |
|---|---|
| **Puerto** | `8080` |
| **Nombre** | `api-gateweay` |
| **Descripcion** | Punto de entrada unico para todas las peticiones HTTP externas. Enruta las requests a los microservicios downstream usando descubrimiento via Eureka. |
| **Framework** | Spring Cloud Gateway (WebFlux/Reactivo) |

**Dependencias principales:**
- `spring-cloud-starter-gateway-server-webflux` - Gateway reactivo
- `spring-cloud-starter-netflix-eureka-client` - Registro con Eureka
- `spring-boot-starter-actuator` - Health checks y metricas

**Rutas configuradas:**

| Ruta | Predicado | Filtro | Destino |
|---|---|---|---|
| `product-service-route` | `Path=/products/**` | `RewritePath=/products,/api/products` | `lb://PRODUCT-MICROSERVICE` |
| `order-service-route` | `Path=/orders/**` | `RewritePath=/orders,/api/orders` | `lb://ORDER-MICROSERVICE` |

**Endpoints expuestos:**
- `GET/POST /products/**` - Proxy al Product Microservice
- `GET/POST/PUT/DELETE /orders/**` - Proxy al Order Microservice
- `GET /actuator/gateway` - Endpoint de metricas del gateway

---

### 3. Product Microservice
| | |
|---|---|
| **Puerto** | `8081` |
| **Nombre** | `product-microservice` |
| **Descripcion** | Microservicio CRUD para gestion de productos. Almacena datos en PostgreSQL. |
| **Base de datos** | PostgreSQL `product_db` |

**Endpoints REST:**

| Metodo | Path | Descripcion | Response |
|---|---|---|---|
| `GET` | `/api/products` | Obtener todos los productos | `200 OK` - `List<Product>` |
| `GET` | `/api/products/{id}` | Obtener producto por ID | `200 OK` - `Product` |
| `POST` | `/api/products` | Crear productos (bulk) | `200 OK` |

---

### 4. Order Microservice
| | |
|---|---|
| **Puerto** | `8082` |
| **Nombre** | `order-microservice` |
| **Descripcion** | Microservicio para gestion de ordenes. Comunica con Product Microservice via Feign Client para obtener datos de productos en tiempo real. |
| **Base de datos** | PostgreSQL `order_db` |

**Dependencias principales:**
- `spring-cloud-starter-openfeign` - Comunicacion entre microservicios

**Entidades:**
- **Order**: id, orderId, userId, totalPrice, status, shippingAddress, paymentMethod, orderDate, items
- **OrderItem**: id, productId, productName, quantity, unitPrice, subtotal

**Endpoints REST:**

| Metodo | Path | Descripcion | Response |
|---|---|---|---|
| `GET` | `/api/orders` | Obtener todas las ordenes | `200 OK` - `List<Order>` |
| `GET` | `/api/orders/{id}` | Obtener orden por ID | `200 OK` - `Order` |
| `POST` | `/api/orders` | Crear orden | `200 OK` |
| `PUT` | `/api/orders` | Actualizar orden | `200 OK` |
| `DELETE` | `/api/orders/{id}` | Eliminar orden | `200 OK` |

---

## Comunicacion entre Microservicios (Feign Client)

El Order Microservice se comunica con el Product Microservice usando **Spring Cloud OpenFeign**.

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
  "orderId": 1020,
  "userId": 1,
  "status": "PENDING",
  "shippingAddress": "Av. Peru 500, Lima",
  "paymentMethod": "CREDIT_CARD",
  "orderDate": "2026-09-03T19:00:00",
  "items": [
    { "productId": 1, "quantity": 1 },
    { "productId": 5, "quantity": 2 }
  ]
}
```

---

## Requisitos Previos

- **Java 17+**
- **Maven 3.6+**
- **PostgreSQL 12+**
- **Puertos disponibles:** 8761, 8080, 8081, 8082

---

## Base de Datos

```sql
CREATE DATABASE product_db;
CREATE DATABASE order_db;
```

**Credenciales por defecto:** postgres / root

---

## Como Ejecutar

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

---

## Stack Tecnologico

| Componente | Tecnologia |
|---|---|
| Lenguaje | Java 17 |
| Framework | Spring Boot 4.1.1 |
| Cloud | Spring Cloud 2025.1.3 |
| Service Discovery | Netflix Eureka |
| API Gateway | Spring Cloud Gateway (WebFlux) |
| Comunicacion | Spring Cloud OpenFeign |
| ORM | Spring Data JPA / Hibernate |
| Base de datos | PostgreSQL |
| Build Tool | Maven |

---

## Estructura del Proyecto

```
e-commerce-microservices/
├── eureka-service/
│   └── eureka-service/
├── ecomerse-gateweay/
├── product-microservice/
└── order-microservice/
    └── src/main/java/com/example/ordermicroservice/
        ├── client/
        │   └── ProductClient.java
        ├── controller/
        │   └── OrderController.java
        ├── entity/
        │   ├── Order.java
        │   ├── OrderItem.java
        │   └── Product.java
        └── service/
            └── OrderServiceImpl.java
```

---

## Licencia

MIT
