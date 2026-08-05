package com.logitrack.logitrack.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class OrderLineRequest{

    @Positive(message = "quantity must be greater than zero")
    private Integer quantity;

    @NotBlank(message = "product id is required")
    private Long productId;

    @NotBlank(message = "order id is required")
    private Long orderId;
}