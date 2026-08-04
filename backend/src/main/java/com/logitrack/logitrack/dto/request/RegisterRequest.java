package com.logitrack.logitrack.dto.request;

import com.logitrack.logitrack.model.Role;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter @Setter
public class RegisterRequest {

    private  String username;
    private String email;
    private String password;
    private Role role;
}
