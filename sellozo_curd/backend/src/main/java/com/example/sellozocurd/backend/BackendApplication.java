package com.example.sellozocurd.backend;

import com.example.sellozocurd.backend.model.Product;
import com.example.sellozocurd.backend.model.Seller;
import com.example.sellozocurd.backend.repository.ProductRepository;
import com.example.sellozocurd.backend.repository.SellerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.Instant;
import java.util.Collections;

@SpringBootApplication
@EnableSwagger2
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner init(ProductRepository productRepo, SellerRepository sellerRepo){
		return args -> {

		    Product product1 = createProduct(productRepo, "");
		    Seller seller1 = createSeller(sellerRepo, product1, "", 0);
		};
	}

    private Product createProduct(ProductRepository productRepo, String name, String time) {
        Instant instant = Instant.parse(time);
        Product product = new Product();

        product.setName(name);
        product.setproduct_date(instant);
        return productRepo.save(product);
    }

    private Seller createSeller(SellerRepository sellerRepo, Product product, String f_name, String l_name, String email, int age) {
        Seller seller = new Seller();

        seller.setFirst_name(f_name);
        seller.setLast_name(l_name);
        seller.setAge(age);
        seller.setEmail(email);
        seller.setProduct(product);
        return sellerRepo.save(seller);
    }

	@Bean
    public Docket swaggerConfiguration() {

	    return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .build()
                .apiInfo(apiDetails());
    }

    private ApiInfo apiDetails() {
	    return new ApiInfo(
	            "CURD Backend API",
                "Sample API project",
                "1.0",
                "Free to use",
                new springfox.documentation.service.Contact("Sellozo", "info@sellozo.com", "ala@gmail.com"),
                "API License",
                "",
                Collections.emptyList());
    }
}
