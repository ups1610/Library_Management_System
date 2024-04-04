package com.lms.authService.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.authService.dto.LoginRequestDto;
import com.lms.authService.dto.LoginResponseDto;
import com.lms.authService.dto.UserRequestDto;
import com.lms.authService.dto.UserResponseDto;
import com.lms.authService.entities.UserCredential;
import com.lms.authService.service.UserService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addNew")
    public ResponseEntity<UserResponseDto> postMethodName(@RequestBody UserRequestDto entity) {

        UserResponseDto userResponse = userService.addUser(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDto>> getUsers() {

        List<UserResponseDto> userResponse = userService.getAllUser();
        return ResponseEntity.status(HttpStatus.OK).body(userResponse);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable long id) {

        UserResponseDto userResponse = userService.getUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(userResponse);
    }

    @PutMapping("/Status")
    public ResponseEntity<UserResponseDto> status(@RequestParam long id) {

        UserResponseDto userResponse = userService.activateOrBlockUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(userResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto entity) {
        LoginResponseDto resp = userService.generateToken(entity);

        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }

    @GetMapping("/validate")
    public ResponseEntity<UserResponseDto> validateToken(@RequestParam String token) {
        UserResponseDto user = userService.validateToken(token);

        return ResponseEntity.status(HttpStatus.OK).body(user);

    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteToken());
    }

}
