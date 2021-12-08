package com.example.sellozocurd.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "seller")
public class Seller {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull(message = "Name can not be null")
    @Size(min = 2, message = "Name can not be less than 2 characters")
    private String sellerName;

    private String sellerAddress;
}
