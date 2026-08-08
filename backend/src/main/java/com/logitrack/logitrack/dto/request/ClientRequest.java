package com.logitrack.logitrack.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter @Getter
public class ClientRequest{

    @NotBlank(message= "name is required")
    private String name;

    @NotBlank(message= "email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message= "phone is required")
    private String phone;

    @NotBlank(message= "city is required")
    private String city;
}