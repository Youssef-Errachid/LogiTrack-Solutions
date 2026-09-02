package com.logitrack.logitrack.dto.response;

import com.logitrack.logitrack.enums.Role;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class AuthResponse {

    private String token;
    private String username;
    private String email;
    private Role role;
}
