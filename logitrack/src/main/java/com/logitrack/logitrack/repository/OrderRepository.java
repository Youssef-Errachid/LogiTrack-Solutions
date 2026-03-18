package com.logitrack.logitrack.repository;


import com.logitrack.logitrack.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByClientId(Long clientId);

    @Query("SELECT COUNT(o) FROM Order o")
    Long countAllOrders();

}
