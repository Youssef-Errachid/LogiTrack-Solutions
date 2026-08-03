package com.logitrack.logitrack.dto.response;

import com.logitrack.logitrack.model.OrderStatus;
import lombok.*;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class OrderResponse {
    private Long id;
    private LocalDate orderDate;
    private OrderStatus status;
    private  Long clientId;
}
