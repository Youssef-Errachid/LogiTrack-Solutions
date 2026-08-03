package com.logitrack.logitrack.repository;

import com.logitrack.logitrack.model.OrderLine;

import com.logitrack.logitrack.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderLineRepository extends JpaRepository<OrderLine, Long> {
    @Query("select ol from OrderLine ol where ol.product.id = :id")
    List<OrderLine>  findAllOrderLinesOfProduct(@Param("id") Long id);

}
