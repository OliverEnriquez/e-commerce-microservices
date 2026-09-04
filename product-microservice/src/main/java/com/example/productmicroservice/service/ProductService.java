package com.example.productmicroservice.service;

import com.example.productmicroservice.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();

    void addProducts(List<Product> products);
}
