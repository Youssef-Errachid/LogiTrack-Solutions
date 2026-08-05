package com.logitrack.logitrack.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class ProductRequest{
    @NotBlank(message= "name is required")
    private String name;

    @NotBlank(message= "category is required")
    private  String category;

    @Positive(message= "price must be greater than 0")
    private  Double price;

    @PositiveOrZero(message= "Stock can't be negative")
    private Integer quantityInStock;
}