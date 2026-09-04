package com.example.ordermicroservice.service;

import com.example.ordermicroservice.client.ProductClient;
import com.example.ordermicroservice.entity.Order;
import com.example.ordermicroservice.entity.OrderItem;
import com.example.ordermicroservice.entity.Product;
import com.example.ordermicroservice.repostiroy.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductClient productClient;

    @Override
    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }
    @Override
    public Order getOrderById(Long id){
        return orderRepository.findById(id).get();
    }
    @Override
    public void deleteOrderById(Long id){
        orderRepository.deleteById(id);
    }
    @Override
    public void updateOrder(Order order){
        orderRepository.save(order);
    }
    @Override
    public void addOrder(Order order){
        double total = 0;
        for (OrderItem item : order.getItems()) {
            Product product = productClient.getProductById(item.getProductId());
            if (product != null) {
                item.setProductName(product.getName());
                item.setUnitPrice(product.getPrice());
                item.setSubtotal(item.getQuantity() * product.getPrice());
                item.setOrder(order);
                total += item.getSubtotal();
            }
        }
        order.setTotalPrice(total);
        orderRepository.save(order);
    }


}
