package com.logitrack.logitrack.service;

import com.logitrack.logitrack.client.NotificationClient;
import com.logitrack.logitrack.dto.request.NotificationRequest;
import com.logitrack.logitrack.entity.*;
import com.logitrack.logitrack.enums.OrderStatus;
import com.logitrack.logitrack.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ClientRepository clientRepository;
    private final ProductRepository productRepository;
    private final OrderLineRepository orderLineRepository;
    private final NotificationClient notificationClient;

    private static final Logger logger =
            LoggerFactory.getLogger(OrderService.class);

    public OrderService(OrderRepository orderRepository,
                        ClientRepository clientRepository,
                        ProductRepository productRepository,
                        OrderLineRepository orderLineRepository,
                        NotificationClient notificationClient) {
        this.orderRepository = orderRepository;
        this.clientRepository = clientRepository;
        this.productRepository = productRepository;
        this.orderLineRepository = orderLineRepository;
        this.notificationClient = notificationClient;
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

        Order savedOrder = orderRepository.save(order);

        sendNotification(
                savedOrder,
                "ORDER_CREATED",
                "Order #" + savedOrder.getId() + " has been created"
        );

        return savedOrder;
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

        Order savedOrder = orderRepository.save(order);

        if (status == OrderStatus.SHIPPED) {
            sendNotification(
                    savedOrder,
                    "ORDER_SHIPPED",
                    "Order #" + savedOrder.getId() + " has been shipped"
            );
        }

        if (status == OrderStatus.DELIVERED) {
            sendNotification(
                    savedOrder,
                    "ORDER_DELIVERED",
                    "Order #" + savedOrder.getId() + " has been delivered"
            );
        }

        return savedOrder;
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

    private void sendNotification(Order order, String kind, String message) {
        NotificationRequest notificationRequest =
                new NotificationRequest(
                        message,
                        kind,
                        order.getId()
                );

        try {
            notificationClient.createNotification(notificationRequest);
        } catch (Exception e) {
            logger.error(
                    "Failed to send notification for order {}",
                    order.getId(),
                    e
            );
        }
    }
}