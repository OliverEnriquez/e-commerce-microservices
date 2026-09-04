package com.example.ordermicroservice.controller;


import com.example.ordermicroservice.entity.Order;
import com.example.ordermicroservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(){
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id){
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PostMapping
    public ResponseEntity<Void> addOrder(@RequestBody Order order){
        orderService.addOrder(order);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Void> updateOrder(@RequestBody Order order){
        orderService.updateOrder(order);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderById(@PathVariable Long id){
        orderService.deleteOrderById(id);
        return ResponseEntity.ok().build();
    }
}
