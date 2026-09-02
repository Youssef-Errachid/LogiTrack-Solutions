package  com.logitrack.logitrack.mapper;

import com.logitrack.logitrack.dto.request.ClientRequest;
import com.logitrack.logitrack.dto.response.ClientResponse;
import com.logitrack.logitrack.entity.Client;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClientMapper {
    Client toEntity(ClientRequest request);
    ClientResponse toReponse(Client client);
    List<ClientResponse> toResponseList(List<Client> clients);
    void updateClientFromRequest(ClientRequest request, @MappingTarget Client client);
}