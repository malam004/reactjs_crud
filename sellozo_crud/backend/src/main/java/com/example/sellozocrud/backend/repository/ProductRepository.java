package com.example.sellozocrud.backend.repository;

import com.example.sellozocrud.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductName(String productName);
}
