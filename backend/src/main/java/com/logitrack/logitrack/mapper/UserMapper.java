package com.logitrack.logitrack.mapper;

import com.logitrack.logitrack.dto.request.RegisterRequest;
import com.logitrack.logitrack.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(RegisterRequest request);
}
