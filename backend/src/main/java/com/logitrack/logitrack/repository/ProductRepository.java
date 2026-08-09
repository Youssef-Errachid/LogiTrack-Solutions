package com.logitrack.logitrack.repository;

import com.logitrack.logitrack.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(String category);

    List<Product> findByPriceLessThan(Double price);

    @Query("SELECT p FROM Product p WHERE p.quantityInStock < 10")
    List<Product> findLowStockProducts();

    @Query("""
        SELECT ol.product FROM OrderLine ol
        GROUP BY ol.product
        ORDER BY SUM(ol.quantity) DESC
        """)
    List<Product> findTopSellingProducts(Pageable pageable);

    @Query("""
    SELECT p FROM Product p
    WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    Page<Product> searchProducts(@Param("keyword") String keyword, Pageable pageable);

}
