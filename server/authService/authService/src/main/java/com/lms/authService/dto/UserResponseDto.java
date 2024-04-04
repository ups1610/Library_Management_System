package com.lms.authService.dto;

public record UserResponseDto(
    
    long userId,
    String userName,
    String firstName,
    String lastName,
    long mobile,
    String email,
    String role,
    String status
) {

}
