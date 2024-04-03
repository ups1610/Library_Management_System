package com.lms.authService.dto;

public record LoginResponseDto(

String token, 
long userId,
String userName,
String firstName,
String lastName,
long mobile,
String email,
String role
) {

}
