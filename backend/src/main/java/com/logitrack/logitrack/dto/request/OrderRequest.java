package com.logitrack.logitrack.dto.request;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class OrderRequest{

    private  Long clientId;
}