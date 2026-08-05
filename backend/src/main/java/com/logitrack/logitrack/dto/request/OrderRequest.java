package com.logitrack.logitrack.dto.request;
import com.logitrack.logitrack.model.OrderStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class OrderRequest{
@NotBlank(message = "Client id is required")
    private  Long clientId;
}