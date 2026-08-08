package com.logitrack.logitrack.service;

import com.logitrack.logitrack.model.*;
import com.logitrack.logitrack.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ClientRepository clientRepository;
    private final ProductRepository productRepository;
    private final OrderLineRepository orderLineRepository;

    public OrderService(OrderRepository orderRepository,
                        ClientRepository clientRepository,
                        ProductRepository productRepository,
                        OrderLineRepository orderLineRepository) {
        this.orderRepository = orderRepository;
        this.clientRepository = clientRepository;
        this.productRepository = productRepository;
        this.orderLineRepository = orderLineRepository;
    }

    public OrderLine addOrderLine(Long orderId, Long productId, Integer quantity) {
        Order order = getOrderById(orderId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        OrderLine orderLine = new OrderLine();
        orderLine.setOrder(order);
        orderLine.setProduct(product);
        orderLine.setQuantity(quantity);

        return orderLineRepository.save(orderLine);
    }

    public Order createOrder(Long clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + clientId));

        Order order = new Order();
        order.setClient(client);
        order.setOrderDate(LocalDate.now());
        order.setStatus(OrderStatus.PENDING);

        return orderRepository.save(order);
    }


    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }


    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }


    public Order updateOrderStatus(Long id, OrderStatus status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }


    public List<Order> getOrdersByClient(Long clientId) {
        return orderRepository.findByClientId(clientId);
    }


    public Long countAllOrders() {
        return orderRepository.countAllOrders();
    }

    public List<OrderLine> getAllOrderLinesWithId(Long id){
        return orderLineRepository.findAllOrderLinesOfProduct(id);
    }

    public List<Order> getRecentOrders() {
        return orderRepository.findTop5ByOrderByOrderDateDesc();
    }

    public long countOrdersByStatus(OrderStatus status) {
        return orderRepository.countByStatus(status);
    }
}