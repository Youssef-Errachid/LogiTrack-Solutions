package src.main.java.com.logitrack.logitrack.dto.request;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class OrderLineRequest{
    private Integer quantity;
    private Long productId;
    private Long orderId;
}