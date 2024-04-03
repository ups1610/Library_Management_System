package com.lms.authService.service;

import com.lms.authService.dto.LoginRequestDto;
import com.lms.authService.dto.LoginResponseDto;
import com.lms.authService.dto.UserRequestDto;
import com.lms.authService.dto.UserResponseDto;

public interface UserService {

    public UserResponseDto addUser(UserRequestDto userRequest);
    public LoginResponseDto generateToken(LoginRequestDto user);

    public boolean validateToken(String token);
    public UserResponseDto getUser(long id);
    public boolean test();

    public String deleteToken();

    

}
