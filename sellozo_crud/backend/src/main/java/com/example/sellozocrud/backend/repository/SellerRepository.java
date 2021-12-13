package com.example.sellozocrud.backend.repository;

import com.example.sellozocrud.backend.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SellerRepository extends JpaRepository<Seller, Long> {

    @Query(
            value = "SELECT COUNT(*) FROM seller",
            nativeQuery = true
    )
    int findAllByProduct(Long id);

    @Query(
            value = "",
            nativeQuery = true)
    List<?> findAllProduct();
}
