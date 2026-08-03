package  com.logitrack.logitrack.mapper;

import com.logitrack.logitrack.dto.request.ProductRequest;
import com.logitrack.logitrack.dto.response.ProductResponse;
import com.logitrack.logitrack.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toEntity(ProductRequest request);
    ProductResponse toResponse(Product product);
    List<ProductResponse> toResponseList(List<Product> products);
    void updateClientFromRequest(ProductRequest request, @MappingTarget Product product);
}