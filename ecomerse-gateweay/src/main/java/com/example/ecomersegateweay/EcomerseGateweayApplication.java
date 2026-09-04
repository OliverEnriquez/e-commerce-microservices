package com.example.ecomersegateweay;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class EcomerseGateweayApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcomerseGateweayApplication.class, args);
    }

}
