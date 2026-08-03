package com.logitrack.logitrack.controller;

import com.logitrack.logitrack.dto.request.OrderRequest;
import com.logitrack.logitrack.dto.response.OrderResponse;
import com.logitrack.logitrack.mapper.OrderMapper;
import com.logitrack.logitrack.model.*;
import com.logitrack.logitrack.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private  final OrderMapper orderMapper;

    public OrderController(OrderService orderService, OrderMapper orderMapper) {
        this.orderService = orderService;
        this.orderMapper = orderMapper;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestParam OrderRequest request) {
        Order order = orderMapper.toEntity(request);
        Order savedOrder = orderService.createOrder(order.getClient().getId());
        return ResponseEntity.ok(orderMapper.toResponse(savedOrder));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orderMapper.toResponseList(orders));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return ResponseEntity.ok(orderMapper.toResponse(order));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status) {
        Order updateOrder = orderService.updateOrderStatus(id,status);
        return ResponseEntity.ok(orderMapper.toResponse(updateOrder));
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByClient(@PathVariable Long clientId) {
        List<Order> orders = orderService.getOrdersByClient(clientId);
        return ResponseEntity.ok(orderMapper.toResponseList(orders));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countOrders() {
        return ResponseEntity.ok(orderService.countAllOrders());
    }

}