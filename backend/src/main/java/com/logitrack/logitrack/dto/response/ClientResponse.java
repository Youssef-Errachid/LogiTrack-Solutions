package src.main.java.com.logitrack.logitrack.dto.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter @Setter
public class ClientResponse{
    private Long id;
    private String  name;
    private String email;
    private String phone;
    private String city;
}


