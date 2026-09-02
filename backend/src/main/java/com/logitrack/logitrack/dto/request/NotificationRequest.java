package com.logitrack.logitrack.dto.request;

public record NotificationRequest(
        String message,
        String kind,
        Long orderId
) {
}