package com.example.sellozocurd.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@Table(name="product")
public class Product {

    @Id
    @GeneratedValue

    private String sku_d;
    private String productName;
    private double productPrice;
}
