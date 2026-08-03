package src.main.java.com.logitrack.logitrack.dto.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class ProductRequest{
    private String name;
    private  String category;
    private  Double price;
    private Integer quantityInStock;
}