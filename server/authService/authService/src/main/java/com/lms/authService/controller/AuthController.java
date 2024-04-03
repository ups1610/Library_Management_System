package com.lms.authService.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.authService.dto.LoginRequestDto;
import com.lms.authService.dto.LoginResponseDto;
import com.lms.authService.dto.UserRequestDto;
import com.lms.authService.dto.UserResponseDto;
import com.lms.authService.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService){
        this.userService=userService;
    }

    @PostMapping("/addNew")
    public ResponseEntity<UserResponseDto> postMethodName(@RequestBody UserRequestDto entity) {
       
        
        UserResponseDto userResponse = userService.addUser(entity);
            return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
    }


  
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto entity) {
      LoginResponseDto resp= userService.generateToken(entity);
       
       return ResponseEntity.status(HttpStatus.OK).body(resp);
    }   

    @GetMapping("/validate")
    public ResponseEntity<String> validateToken(@RequestParam String token) {
        boolean isValid = userService.validateToken(token);
        if (isValid) {
            return ResponseEntity.status(HttpStatus.OK).body("Token is valid");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is invalid");
        }
    }

    @GetMapping("/logout")
    public  ResponseEntity<String> logout() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteToken());
    }
    
    

    




}
