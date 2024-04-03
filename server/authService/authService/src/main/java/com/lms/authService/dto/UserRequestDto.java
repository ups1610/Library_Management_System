package com.lms.authService.dto;

public record UserRequestDto(
    String userName,
    String firstName,
    String lastName,
    long mobile,
    String email,
    String role,
    String password


) {

}
