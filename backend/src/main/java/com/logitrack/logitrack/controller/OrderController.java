package com.logitrack.logitrack.controller;

import com.logitrack.logitrack.dto.request.OrderLineRequest;
import com.logitrack.logitrack.dto.request.OrderRequest;
import com.logitrack.logitrack.dto.response.OrderResponse;
import com.logitrack.logitrack.mapper.OrderMapper;
import com.logitrack.logitrack.model.*;
import com.logitrack.logitrack.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PostMapping("/{orderId}/lines")
    public ResponseEntity<Void> addOrderLine(
            @PathVariable Long orderId,
            @Valid @RequestBody OrderLineRequest request) {
        orderService.addOrderLine(orderId, request.getProductId(), request.getQuantity());
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody OrderRequest request) {
        Order savedOrder = orderService.createOrder(request.getClientId());
        return ResponseEntity.ok(orderMapper.toResponse(savedOrder));
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    @GetMapping
    public ResponseEntity<Page<OrderResponse>> getAllOrders(@PageableDefault(size = 10,sort = "orderDate")Pageable pageable) {
        Page<OrderResponse> orders = orderService.getAllOrders(pageable).map(orderMapper::toResponse);
        return ResponseEntity.ok((orders));
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return ResponseEntity.ok(orderMapper.toResponse(order));
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateStatus(
            @Valid
            @PathVariable Long id,
            @RequestParam OrderStatus status) {
        Order updateOrder = orderService.updateOrderStatus(id,status);
        return ResponseEntity.ok(orderMapper.toResponse(updateOrder));
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByClient(@PathVariable Long clientId) {
        List<Order> orders = orderService.getOrdersByClient(clientId);
        return ResponseEntity.ok(orderMapper.toResponseList(orders));
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @GetMapping("/count")
    public ResponseEntity<Long> countOrders() {
        return ResponseEntity.ok(orderService.countAllOrders());
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    @GetMapping("/recent")
    public ResponseEntity<List<OrderResponse>> getRecentOrders() {
        return ResponseEntity.ok(
                orderService.getRecentOrders()
                        .stream()
                        .map(orderMapper::toResponse)
                        .toList()
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    @GetMapping("/count/pending")
    public ResponseEntity<Long> countPendingOrders() {
        return ResponseEntity.ok(
                orderService.countOrdersByStatus(OrderStatus.PENDING)
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    @GetMapping("/count/shipped")
    public ResponseEntity<Long> countShippedOrders() {
        return ResponseEntity.ok(
                orderService.countOrdersByStatus(OrderStatus.SHIPPED)
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    @GetMapping("/count/delivered")
    public ResponseEntity<Long> countDeliveredOrders() {
        return ResponseEntity.ok(
                orderService.countOrdersByStatus(OrderStatus.DELIVERED)
        );
    }
}