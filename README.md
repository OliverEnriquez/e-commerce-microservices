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
     └─────────┬──────────┘  └─────────────────────────┘  │
               │                                           │
               │  lb://PRODUCT-MICROSERVICE               │
               │──────────────────────────────────────────>│
               │                                           │
 External  │  /products/** --> /api/products               │
 Clients ──┘                                               │
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

**Flujo de enrutamiento:**
1. Cliente envia `GET http://localhost:8080/products`
2. Gateway coincide con `Path=/products/**`
3. Reescribe la ruta: `/products` -> `/api/products`
4. Resuelve `lb://PRODUCT-MICROSERVICE` via Eureka
5. Envia la peticion a `http://localhost:8081/api/products`

**Endpoints expuestos:**
- `GET/POST /products/**` - Proxy al Product Microservice
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
| `POST` | `/api/products` | Crear productos (bulk) | `List<Product>` JSON | `200 OK` |

**Capas de arquitectura:**
```
Controller  -->  Service  -->  Repository  -->  PostgreSQL
  (REST)         (Logica)       (JPA)           (BD)
```

---

## Requisitos Previos

- **Java 17+**
- **Maven 3.6+**
- **PostgreSQL 12+**
- **Puertos disponibles:** 8761, 8080, 8081

---

## Base de Datos

Crear la base de datos en PostgreSQL antes de iniciar el microservicio de productos:

```sql
CREATE DATABASE product_db;
```



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

### 3. Iniciar API Gateway
```bash
cd ecomerse-gateweay
mvn spring-boot:run
```

---

## Probar los Endpoints

### Directamente al Product Microservice
```bash
# Obtener todos los productos
curl http://localhost:8081/api/products

# Crear productos
curl -X POST http://localhost:8081/api/products \
  -H "Content-Type: application/json" \
  -d '[{"id":1,"name":"Laptop","description":"Laptop gaming","price":1200.00,"quantity":10,"category":"Electronics","image":"laptop.jpg"}]'
```

### A traves del API Gateway
```bash
# El gateway reescribe /products/** a /api/products
curl http://localhost:8080/products
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
└── .gitignore
```

---

## Licencia

MIT
