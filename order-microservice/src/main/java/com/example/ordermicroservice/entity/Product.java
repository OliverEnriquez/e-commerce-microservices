package com.example.ordermicroservice.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Product {
    private Long id1;
    private Long id;
    private String name;
    private String description;
    private double price;
    private int quantity;
    private String category;
    private String image;
}
