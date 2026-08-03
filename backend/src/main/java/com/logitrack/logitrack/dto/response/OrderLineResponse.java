package com.logitrack.logitrack.dto.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class OrderLineResponse {
    private Long id;
    private Integer quantity;
    private Long productId;
    private Long orderId;
}