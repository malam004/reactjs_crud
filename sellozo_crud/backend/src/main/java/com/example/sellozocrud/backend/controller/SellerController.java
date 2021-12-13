package com.example.sellozocrud.backend.controller;

import com.example.sellozocrud.backend.exception.ApiRequestException;
import com.example.sellozocrud.backend.model.Seller;
import com.example.sellozocrud.backend.repository.SellerRepository;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SellerController {

    @Autowired
    private SellerRepository sellerRepository;

    @GetMapping("/sellers")
    @ApiOperation(value = "Find all sellers")
    List<Seller> getSellers() {
        if(sellerRepository.findAll().isEmpty()) {
            throw new ApiRequestException(ApiRequestException.NO_RECORDS_FOUND);
        } else {
            return sellerRepository.findAll();
        }
    }

    @GetMapping("/bookings")
    @ApiOperation(value = "Find all bookings")
    List<?> getBookings() {
        if(sellerRepository.findAllBookings().isEmpty()) {
            throw new ApiRequestException(ApiRequestException.NO_RECORDS_FOUND);
        } else {
            return sellerRepository.findAllBookings();
        }
    }

    @PostMapping("/sellers")
    @ApiOperation(value = "Save seller and sell a product",
            notes = "Provide name of minimum 2 characters, correctly formatted id of existing product to sell an product")
    ResponseEntity<Seller> createSeller(@Valid @RequestBody Seller seller) throws URISyntaxException {
        Seller result = SellerRepository.save(Seller);
        return ResponseEntity.created(new URI("/api/Sellers" + result.getId())).body(result);
    }

}
