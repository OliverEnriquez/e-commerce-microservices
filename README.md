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

**Flujo de enrutamiento:**
1. Cliente envia `GET http://localhost:8080/products`
2. Gateway coincide con `Path=/products/**`
3. Reescribe la ruta: `/products` -> `/api/products`
4. Resuelve `lb://PRODUCT-MICROSERVICE` via Eureka
5. Envia la peticion a `http://localhost:8081/api/products`

**Endpoints expuestos:**
- `GET/POST /products/**` - Proxy al Product Microservice
- `GET/POST/PUT/DELETE /orders/**` - Proxy al Order Microservice
- `GET /actuator/gateway` - Endpoint de metricas del gateway

**Configuracion de auto-descubrimiento:**
```properties
spring.cloud.gateway.server.webflux.discovery.locator.enabled=true
spring.cloud.gateway.server.webflux.discovery.locator.lower-case-service-id=true
```

---

### 3. Product Microservice
| | |
|---|---|
| **Puerto** | `8081` |
| **Nombre** | `product-microservice` |
| **Descripcion** | Microservicio CRUD para gestion de productos. Almacena datos en PostgreSQL. |
| **Base de datos** | PostgreSQL `product_db` |

**Dependencias principales:**
- `spring-boot-starter-data-jpa` - ORM JPA/Hibernate
- `spring-boot-starter-webmvc` - MVC tradicional (servlet)
- `spring-cloud-starter-netflix-eureka-client` - Registro con Eureka
- `postgresql` - Driver JDBC para PostgreSQL
- `lombok` - Generacion de boilerplate code

**Entidad Product:**

| Campo | Tipo | Descripcion |
|---|---|---|
| `id1` | `Long` | Clave primaria (JPA `@Id`) |
| `id` | `Long` | ID de negocio |
| `name` | `String` | Nombre del producto |
| `description` | `String` | Descripcion |
| `price` | `double` | Precio |
| `quantity` | `int` | Cantidad en stock |
| `category` | `String` | Categoria |
| `image` | `String` | URL de imagen |

**Endpoints REST:**

| Metodo | Path | Descripcion | Request Body | Response |
|---|---|---|---|---|
| `GET` | `/api/products` | Obtener todos los productos | - | `200 OK` - `List<Product>` |
| `GET` | `/api/products/{id}` | Obtener producto por ID | - | `200 OK` - `Product` |
| `POST` | `/api/products` | Crear productos (bulk) | `List<Product>` JSON | `200 OK` |

**Capas de arquitectura:**
```
Controller  -->  Service  -->  Repository  -->  PostgreSQL
  (REST)         (Logica)       (JPA)           (BD)
```

---

### 4. Order Microservice
| | |
|---|---|
| **Puerto** | `8082` |
| **Nombre** | `order-microservice` |
| **Descripcion** | Microservicio para gestion de ordenes. Comunica con Product Microservice via Feign Client para obtener datos de productos en tiempo real. |
| **Base de datos** | PostgreSQL `order_db` |

**Dependencias principales:**
- `spring-boot-starter-data-jpa` - ORM JPA/Hibernate
- `spring-boot-starter-webmvc` - MVC tradicional (servlet)
- `spring-cloud-starter-netflix-eureka-client` - Registro con Eureka
- `spring-cloud-starter-openfeign` - Comunicacion entre microservicios
- `postgresql` - Driver JDBC para PostgreSQL
- `lombok` - Generacion de boilerplate code

**Entidades:**

**Order:**

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | `Long` | Clave primaria |
| `orderId` | `Long` | ID unico del pedido |
| `userId` | `Long` | ID del usuario |
| `totalPrice` | `double` | Precio total |
| `status` | `OrderStatus` | Estado: PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED |
| `shippingAddress` | `String` | Direccion de envio |
| `paymentMethod` | `String` | Metodo de pago |
| `orderDate` | `LocalDateTime` | Fecha del pedido |
| `items` | `List<OrderItem>` | Productos de la orden |

**OrderItem:**

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | `Long` | Clave primaria (auto-generada) |
| `productId` | `Long` | ID del producto |
| `productName` | `String` | Nombre del producto (snapshot) |
| `quantity` | `int` | Cantidad |
| `unitPrice` | `double` | Precio unitario |
| `subtotal` | `double` | quantity * unitPrice |

**Endpoints REST:**

| Metodo | Path | Descripcion | Request Body | Response |
|---|---|---|---|---|
| `GET` | `/api/orders` | Obtener todas las ordenes | - | `200 OK` - `List<Order>` |
| `GET` | `/api/orders/{id}` | Obtener orden por ID | - | `200 OK` - `Order` |
| `POST` | `/api/orders` | Crear orden | `Order` JSON | `200 OK` |
| `PUT` | `/api/orders` | Actualizar orden | `Order` JSON | `200 OK` |
| `DELETE` | `/api/orders/{id}` | Eliminar orden | - | `200 OK` |

---

## Comunicacion entre Microservicios (Feign Client)

El Order Microservice se comunica con el Product Microservice usando **Spring Cloud OpenFeign** para obtener datos de productos en tiempo real.

```
Order Service ──Feign──→ Product Service ──→ product_db
     │                        │
     │  GET /api/products/1   │
     │←──── { price: 24999 } ─│
     │
     └──→ Crea OrderItem con precio actual
```

**Flujo al crear una orden:**
1. Cliente envia `POST /api/orders` con items (productId + quantity)
2. Order Service llama a Product Service via Feign por cada item
3. Product Service retorna datos del producto (nombre, precio)
4. Order Service calcula subtotales y total
5. Order Service guarda la orden con los items en `order_db`

** Ejemplo de request para crear orden:**
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

**Respuesta (con precios calculados via Feign):**
```json
{
  "id": 20,
  "orderId": 1020,
  "userId": 1,
  "totalPrice": 19497.99,
  "status": "PENDING",
  "items": [
    { "productId": 1, "productName": "Laptop Dell XPS 13", "quantity": 1, "unitPrice": 24999.99, "subtotal": 24999.99 },
    { "productId": 5, "productName": "Audifonos Sony WH-1000XM5", "quantity": 2, "unitPrice": 8499.00, "subtotal": 16998.00 }
  ]
}
```

---

## Comunicacion entre Microservicios (Feign Client)

El Order Microservice se comunica con el Product Microservice usando **Spring Cloud OpenFeign** para obtener datos de productos en tiempo real.

```
Order Service ──Feign──→ Product Service ──→ product_db
     │                        │
     │  GET /api/products/1   │
     │←──── { price: 24999 } ─│
     │
     └──→ Crea OrderItem con precio actual
```

**Flujo al crear una orden:**
1. Cliente envia `POST /api/orders` con items (productId + quantity)
2. Order Service llama a Product Service via Feign por cada item
3. Product Service retorna datos del producto (nombre, precio)
4. Order Service calcula subtotales y total
5. Order Service guarda la orden con los items en `order_db`

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

**Respuesta (con precios calculados via Feign):**
```json
{
  "id": 20,
  "orderId": 1020,
  "userId": 1,
  "totalPrice": 19497.99,
  "status": "PENDING",
  "items": [
    { "productId": 1, "productName": "Laptop Dell XPS 13", "quantity": 1, "unitPrice": 24999.99, "subtotal": 24999.99 },
    { "productId": 5, "productName": "Audifonos Sony WH-1000XM5", "quantity": 2, "unitPrice": 8499.00, "subtotal": 16998.00 }
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

Crear las bases de datos en PostgreSQL antes de iniciar los microservicios:

```sql
CREATE DATABASE product_db;
CREATE DATABASE order_db;
```

**Credenciales por defecto:**
- Usuario: `postgres`
- Password: `root`
- Puerto: `5432`

> **Nota:** Las credenciales estan configuradas en los `application.properties` de cada microservicio.

---

## Como Ejecutar

### 1. Iniciar Eureka Server (Primero)
```bash
cd eureka-service/eureka-service
mvn spring-boot:run
```
Verificar en: `http://localhost:8761/`

### 2. Iniciar Product Microservice
```bash
cd product-microservice
mvn spring-boot:run
```
Se registra automaticamente con Eureka.

### 3. Iniciar Order Microservice
```bash
cd order-microservice
mvn spring-boot:run
```
Se registra automaticamente con Eureka.

### 4. Iniciar API Gateway
```bash
cd ecomerse-gateweay
mvn spring-boot:run
```

---

## Probar los Endpoints

### Product Microservice
```bash
# Obtener todos los productos
curl http://localhost:8081/api/products

# Obtener producto por ID
curl http://localhost:8081/api/products/1
```

### Order Microservice
```bash
# Obtener todas las ordenes
curl http://localhost:8082/api/orders

# Crear orden (los precios se obtienen via Feign)
curl -X POST http://localhost:8082/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": 1020,
    "userId": 1,
    "status": "PENDING",
    "shippingAddress": "Av. Peru 500, Lima",
    "paymentMethod": "CREDIT_CARD",
    "orderDate": "2026-09-03T19:00:00",
    "items": [
      {"productId": 1, "quantity": 1},
      {"productId": 5, "quantity": 2}
    ]
  }'
```

### A traves del API Gateway
```bash
# Productos
curl http://localhost:8080/products

# Ordenes
curl http://localhost:8080/orders
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
| Utilidades | Lombok |

---

## Estructura del Proyecto

```
e-commerce-microservices/
├── eureka-service/
│   └── eureka-service/
│       ├── pom.xml
│       └── src/
│           └── main/java/com/example/eurekaservice/
│               └── EurekaServiceApplication.java
├── ecomerse-gateweay/
│   ├── pom.xml
│   └── src/
│       └── main/java/com/example/ecomersegateweay/
│           └── EcomerseGateweayApplication.java
├── product-microservice/
│   ├── pom.xml
│   └── src/
│       └── main/java/com/example/productmicroservice/
│           ├── ProductMicroserviceApplication.java
│           ├── controller/
│           │   └── ProductController.java
│           ├── entity/
│           │   └── Product.java
│           ├── repository/
│           │   └── ProductRepository.java
│           └── service/
│               ├── ProductService.java
│               └── ProductServiceImpl.java
├── order-microservice/
│   ├── pom.xml
│   └── src/
│       └── main/java/com/example/ordermicroservice/
│           ├── OrderMicroserviceApplication.java
│           ├── client/
│           │   └── ProductClient.java
│           ├── controller/
│           │   └── OrderController.java
│           ├── entity/
│           │   ├── Order.java
│           │   ├── OrderItem.java
│           │   └── Product.java
│           ├── repostiroy/
│           │   └── OrderRepository.java
│           └── service/
│               ├── OrderService.java
│               └── OrderServiceImpl.java
└── .gitignore
```

---

## Licencia

MIT
