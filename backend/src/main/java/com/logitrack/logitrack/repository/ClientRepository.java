package com.logitrack.logitrack.repository;

import com.logitrack.logitrack.entity.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query("""
        SELECT c FROM Client c
        WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
        """)
    Page<Client> searchClients(@Param("keyword") String keyword, Pageable pageable);
}
