package com.logitrack.logitrack.dto.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class ProductResponse{
    private Long id;
    private String name;
    private String category;
    private Double price;
    private Integer quantityInStock;
}