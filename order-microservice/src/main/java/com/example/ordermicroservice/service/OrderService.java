package com.example.ordermicroservice.service;

import com.example.ordermicroservice.entity.Order;

import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();

    Order getOrderById(Long id);

    void deleteOrderById(Long id);

    void updateOrder(Order order);

    void addOrder(Order order);
}
