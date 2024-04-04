package com.lms.authService.service;

import java.util.List;

import com.lms.authService.dto.LoginRequestDto;
import com.lms.authService.dto.LoginResponseDto;
import com.lms.authService.dto.UserRequestDto;
import com.lms.authService.dto.UserResponseDto;
import com.lms.authService.entities.UserCredential;

public interface UserService {

    public UserResponseDto addUser(UserRequestDto userRequest);
    public LoginResponseDto generateToken(LoginRequestDto user);
    
    public List<UserCredential> getAllUser();
   

    public UserResponseDto activateOrBlockUser(long id);
   
    public UserResponseDto validateToken(String token);
    public UserResponseDto getUser(long id);
    public boolean test();

    public String deleteToken();

    

}
