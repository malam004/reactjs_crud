package com.example.sellozocrud.backend.controller;

import com.example.sellozocrud.backend.exception.ApiRequestException;
import com.example.sellozocrud.backend.model.Product;
import com.example.sellozocrud.backend.repository.ProductRepository;
import com.example.sellozocrud.backend.repository.SellerRepository;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.time.Instant;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ProductController {

    private ProductRepository productRepository;
    private SellerRepository sellerRepository;

    public ProductController(ProductRepository productRepository, SellerRepository sellerRepository) {
        super();
        this.productRepository = productRepository;
        this.sellerRepository = sellerRepository;
    }

    @GetMapping("/product")
    @ApiOperation(value = "Find all available products")
    Collection<Product> products() {
        if(productRepository.findAll().isEmpty()) {
            throw new ApiRequestException(ApiRequestException.NO_RECORDS_FOUND);
        } else {
            return productRepository.findAll();
        }
    }

    @GetMapping("product/{id}")
    @ApiOperation(value = "Find product by id",
            notes = "Provide an id to look up specific product from products model",
            response = Product.class)
    ResponseEntity<?> getProduct(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent()) {
            return product.map(response -> ResponseEntity.ok().body(response))
                    .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }
        throw new ApiRequestException(ApiRequestException.NO_RECORDS_FOUND);
    }

    @PostMapping("/products")
    @ApiOperation(value = "Save an product",
            notes = "Provide an product name of greater than 2 characters",
            response = Product.class)
    ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        if (product.getName().length() < 3) {
            throw new ApiRequestException(ApiRequestException.VALID);
        } else if(product.getProduct_date().compareTo(Instant.now()) < 0) {
            throw new ApiRequestException(ApiRequestException.VALID);
        } else {
            try {
                Product result = productRepository.save(product);
                return ResponseEntity.created(new URI("/api/products" + result.getId())).body(result);
            } catch (Exception e) {
                System.out.println(ApiRequestException.WRONG);
            }
        }
        throw new ApiRequestException(ApiRequestException.WRONG);
    }

    @PutMapping("/product/{id}")
    @ApiOperation(value = "Modify an existing product",
            notes = "Provide an id of existing product and name greater than 2 characters modify an product",
            response = Product.class)
    ResponseEntity<Product> updateProduct(@Valid @RequestBody Product product) {
        ResponseEntity found = getProduct(product.getId());

        if(found.hasBody()) {
            if(product.getName().length() < 3) {
                throw new ApiRequestException(ApiRequestException.VALID);
            } else if(product.getProduct_date().compareTo(Instant.now()) < 0) {
                throw new ApiRequestException(ApiRequestException.VALID);
            } else {
                try {
                    Product result = productRepository.save(product);
                    return ResponseEntity.ok().body(result);
                } catch (Exception e) {
                    System.out.println(ApiRequestException.WRONG);
                }
            }
        }
        throw new ApiRequestException(ApiRequestException.WRONG);
    }

    @DeleteMapping("/products/{id}")
    @ApiOperation(value = "Delete an product",
            notes = "Provide an id of an existing product to delete it.",
            response = Product.class)
    ResponseEntity<?> deleteProduct(@PathVariable Long id) {

        if(sellerRepository.findAllByProduct(id) <= 0 ) {
            try {
                productRepository.deleteById(id);
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                System.out.println(ApiRequestException.WRONG);
            }
        } else {
            throw new ApiRequestException("There are " +
                    sellerRepository.findAllByProduct(id) +
                    " product(s) sold for this product, so delete not allowed");
        }
        throw new ApiRequestException(ApiRequestException.NO_RECORDS_FOUND);
    }
}
