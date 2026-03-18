package com.logitrack.logitrack.repository;

import com.logitrack.logitrack.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(String category);

    List<Product> findByPriceLessThan(Double price);

    @Query("SELECT p FROM Product p WHERE p.quantityInStock < 10")
    List<Product> findLowStockProducts();

}
