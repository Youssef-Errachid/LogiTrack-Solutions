package com.logitrack.logitrack.dto.request;

import com.logitrack.logitrack.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter @Setter
public class RegisterRequest {

    @NotBlank(message = "user name is required")
    private  String username;

    @Email(message = "email format invalid")
    @NotBlank(message = "email is required")
    private String email;

    @Size(min = 6,message= "password must contain at lest 6 chars")
    private String password;

    private Role role;
}
