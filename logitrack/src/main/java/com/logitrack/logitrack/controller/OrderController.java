package com.logitrack.logitrack.controller;

import com.logitrack.logitrack.model.*;
import com.logitrack.logitrack.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestParam Long clientId) {
        return ResponseEntity.ok(orderService.createOrder(clientId));
    }

    @PostMapping("/{orderId}/products")
    public ResponseEntity<Order> addProductToOrder(
            @PathVariable Long orderId,
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(orderService.addProductToOrder(orderId, productId, quantity));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Order>> getOrdersByClient(@PathVariable Long clientId) {
        return ResponseEntity.ok(orderService.getOrdersByClient(clientId));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countOrders() {
        return ResponseEntity.ok(orderService.countAllOrders());
    }
}