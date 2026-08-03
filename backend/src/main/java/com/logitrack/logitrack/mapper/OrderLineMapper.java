package  com.logitrack.logitrack.mapper;


import com.logitrack.logitrack.model.OrderLine;
import com.logitrack.logitrack.dto.request.OrderLineRequest;
import com.logitrack.logitrack.dto.response.OrderLineResponse;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderLineMapper {
    OrderLine toEntity(OrderLineRequest request);
    OrderLineResponse toResponse(OrderLine orderLine);
    List<OrderLineResponse> toResponseList(List<OrderLine> orderLines);

    void updateClientFromRequest(OrderLineRequest request, @MappingTarget OrderLine orderLine);
}