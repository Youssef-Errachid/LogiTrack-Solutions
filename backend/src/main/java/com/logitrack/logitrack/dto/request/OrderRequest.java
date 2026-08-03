package com.logitrack.logitrack.dto.request;
import com.logitrack.logitrack.model.OrderStatus;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class OrderRequest{
    private LocalDate orderDate;
    private OrderStatus status;
    private  Long clientId;
}