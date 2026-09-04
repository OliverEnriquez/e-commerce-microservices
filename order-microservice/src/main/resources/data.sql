-- Ordenes de ejemplo usando los productos existentes

-- Orden 1: Laptop + Mouse + Teclado (Trabajo remoto)
INSERT INTO orders (id, order_id, user_id, total_price, status, shipping_address, payment_method, order_date)
VALUES (1, 1001, 1, 28997.99, 'CONFIRMED', 'Av. Principal 123, Lima', 'CREDIT_CARD', '2026-09-01 10:30:00');

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (1, 1, 'Laptop Dell XPS 13', 1, 24999.99, 24999.99);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (1, 2, 'Mouse Logitech MX Master 3', 1, 1899.00, 1899.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (1, 3, 'Teclado Mecanico Keychron K8', 1, 2199.50, 2199.50);

-- Orden 2: Monitor + Silla ergonomica (Setup oficina)
INSERT INTO orders (id, order_id, user_id, total_price, status, shipping_address, payment_method, order_date)
VALUES (2, 1002, 2, 22998.00, 'PENDING', 'Jr. Los Olivos 456, Cusco', 'DEBIT_CARD', '2026-09-01 14:45:00');

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (2, 4, 'Monitor Samsung 27 pulgadas', 1, 6999.00, 6999.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (2, 6, 'Silla Ergonomica Herman Miller', 1, 15999.00, 15999.00);

-- Orden 3: Audifonos + Webcam + Microfono (Streaming)
INSERT INTO orders (id, order_id, user_id, total_price, status, shipping_address, payment_method, order_date)
VALUES (3, 1003, 3, 13297.00, 'SHIPPED', 'Calle San Martin 789, Arequipa', 'PAYPAL', '2026-09-02 09:15:00');

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (3, 5, 'Audifonos Sony WH-1000XM5', 1, 8499.00, 8499.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (3, 7, 'Webcam Logitech C920', 1, 1499.00, 1499.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (3, 13, 'Microfono Blue Yeti', 1, 3299.00, 3299.00);

-- Orden 4: Componentes PC (Armar computadora)
INSERT INTO orders (id, order_id, user_id, total_price, status, shipping_address, payment_method, order_date)
VALUES (4, 1004, 4, 14795.00, 'DELIVERED', 'Urb. El Palmar 321, Trujillo', 'CREDIT_CARD', '2026-09-02 11:20:00');

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (4, 24, 'Tarjeta Grafica RTX 4060', 1, 8999.00, 8999.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (4, 23, 'Memoria RAM Corsair 16GB', 2, 1399.00, 2798.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (4, 27, 'Fuente de Poder Corsair 650W', 1, 2199.00, 2199.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (4, 8, 'SSD Samsung 1TB', 1, 2299.00, 2299.00);

-- Orden 5: Accesorios multiples
INSERT INTO orders (id, order_id, user_id, total_price, status, shipping_address, payment_method, order_date)
VALUES (5, 1005, 5, 3794.00, 'CONFIRMED', 'Av. La Marina 654, Piura', 'TRANSFER', '2026-09-02 16:00:00');

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (5, 11, 'Cargador Anker 65W', 1, 899.00, 899.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (5, 16, 'Hub USB-C 7 en 1', 1, 799.00, 799.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (5, 17, 'Mousepad XXL Gaming', 1, 399.00, 399.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (5, 20, 'Soporte para Laptop Ajustable', 1, 549.00, 549.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (5, 26, 'Organizador de Cables', 2, 199.00, 398.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (5, 29, 'Kit de Limpieza para Laptop', 1, 249.00, 249.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (5, 15, 'Lampara LED de Escritorio', 1, 599.00, 599.00);

-- Orden 6: Audio portatil
INSERT INTO orders (id, order_id, user_id, total_price, status, shipping_address, payment_method, order_date)
VALUES (6, 1006, 1, 5798.00, 'PENDING', 'Av. Principal 123, Lima', 'CREDIT_CARD', '2026-09-03 08:30:00');

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (6, 19, 'Bocina Bluetooth JBL Flip 6', 2, 2499.00, 4998.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (6, 25, 'Power Bank 20000mAh', 1, 799.00, 799.00);

-- Orden 7: Red y almacenamiento
INSERT INTO orders (id, order_id, user_id, total_price, status, shipping_address, payment_method, order_date)
VALUES (7, 1007, 2, 5297.00, 'SHIPPED', 'Jr. Los Olivos 456, Cusco', 'PAYPAL', '2026-09-03 10:45:00');

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (7, 9, 'Router TP-Link AX3000', 1, 2799.00, 2799.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (7, 14, 'Disco Duro Externo Seagate 2TB', 1, 1799.00, 1799.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (7, 21, 'Switch de Red 8 Puertos', 1, 699.00, 699.00);

-- Orden 8: Setup gaming completo
INSERT INTO orders (id, order_id, user_id, total_price, status, shipping_address, payment_method, order_date)
VALUES (8, 1008, 3, 26595.00, 'CONFIRMED', 'Calle San Martin 789, Arequipa', 'CREDIT_CARD', '2026-09-03 13:00:00');

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (8, 22, 'Silla Gamer Secretlab', 1, 9999.00, 9999.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (8, 4, 'Monitor Samsung 27 pulgadas', 2, 6999.00, 13998.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (8, 17, 'Mousepad XXL Gaming', 1, 399.00, 399.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (8, 30, 'Adaptador Bluetooth USB', 1, 299.00, 299.00);

-- Orden 9: Hogar inteligente
INSERT INTO orders (id, order_id, user_id, total_price, status, shipping_address, payment_method, order_date)
VALUES (9, 1009, 4, 3498.00, 'DELIVERED', 'Urb. El Palmar 321, Trujillo', 'DEBIT_CARD', '2026-09-03 15:30:00');

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (9, 18, 'Camara de Seguridad WiFi', 2, 999.00, 1998.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (9, 9, 'Router TP-Link AX3000', 1, 2799.00, 2799.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (9, 25, 'Power Bank 20000mAh', 1, 799.00, 799.00);

-- Orden 10: Oficina completa
INSERT INTO orders (id, order_id, user_id, total_price, status, shipping_address, payment_method, order_date)
VALUES (10, 1010, 5, 13696.00, 'PENDING', 'Av. La Marina 654, Piura', 'CREDIT_CARD', '2026-09-03 17:00:00');

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (10, 28, 'Escritorio Ajustable Electrico', 1, 8499.00, 8499.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (10, 6, 'Silla Ergonomica Herman Miller', 1, 15999.00, 15999.00);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
VALUES (10, 30, 'Impresora HP LaserJet Pro', 1, 4599.00, 4599.00);
