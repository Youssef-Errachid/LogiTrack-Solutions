package com.logitrack.logitrack.dto.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter @Getter
public class ClientRequest{
    private String name;
    private String email;
    private String phone;
    private String sity;
}