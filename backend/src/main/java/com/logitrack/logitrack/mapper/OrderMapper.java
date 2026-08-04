package  com.logitrack.logitrack.mapper;

import com.logitrack.logitrack.model.Order;
import com.logitrack.logitrack.dto.request.OrderRequest;
import com.logitrack.logitrack.dto.response.OrderResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order toEntity(OrderRequest request);
    OrderResponse toResponse(Order order);
    List<OrderResponse> toResponseList(List<Order> orders);
    void updateOrderFromRequest(OrderRequest request, @MappingTarget Order order);
}