package com.lms.authService.service.impl;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lms.authService.dto.LoginRequestDto;
import com.lms.authService.dto.LoginResponseDto;
import com.lms.authService.dto.UserRequestDto;
import com.lms.authService.dto.UserResponseDto;
import com.lms.authService.entities.UserCredential;
import com.lms.authService.exception.DuplicateUserException;
import com.lms.authService.repositories.UserRepository;
import com.lms.authService.service.UserService;

import lombok.AllArgsConstructor;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtServiceImpl jwtService;

    private final AuthenticationManager authenticationManager;

    public UserServiceImpl(UserRepository userRepository,PasswordEncoder passwordEncoder,JwtServiceImpl jwtService, AuthenticationManager authenticationManager){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtService=jwtService;
        this.authenticationManager=authenticationManager;
    }


    public UserResponseDto addUser(UserRequestDto userRequest) {

        // if(userRepository.findByByUserName(userRequest.userName()).get()){
        //     throw new DuplicateUserException("User with Email " + userRequest.email() + " already exists");
        // }


        UserCredential user = new UserCredential();
        user.setUsername(userRequest.userName());
        user.setFirstname(userRequest.firstName());
        user.setLastname(userRequest.lastName());
        user.setMobile(userRequest.mobile());
        user.setEmail(userRequest.email());
        user.setRole(userRequest.role());
        user.setPassword(passwordEncoder.encode(userRequest.password()));

        UserCredential savedUser = userRepository.save(user);

        return new UserResponseDto(
            savedUser.getUserId(),
            savedUser.getUsername(),
            savedUser.getFirstname(),
            savedUser.getLastname(),
            savedUser.getMobile(),
            savedUser.getEmail(),
            savedUser.getRole()
        );
    }

    @Override
    public LoginResponseDto generateToken(LoginRequestDto user) {

       Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.userName(), user.password()));
        if(authentication.isAuthenticated()){
            String token= jwtService.generateToken(user.userName());

            UserCredential loginUser = userRepository.findByUsername(user.userName()).orElseThrow(()-> new BadCredentialsException("User not Found"));

            return new LoginResponseDto(token, loginUser.getUserId(), loginUser.getUsername(), loginUser.getFirstname(), loginUser.getLastname(),loginUser.getMobile(), loginUser.getEmail(), loginUser.getRole());
        }else{
            throw new BadCredentialsException("Bad Credentials");
        }


       
    }

    


    @Override
    public boolean validateToken(String token) {
        return jwtService.validateToken(token);
    }


    @Override
    public boolean test() {
        return true;
    }


    @Override
    public String deleteToken() {
         SecurityContextHolder.clearContext(); 
        return "Success";
    }


    @Override
    public UserResponseDto getUser(long id) {
 
        Optional<UserCredential> optionalUser = userRepository.findById(id);
        
  
        if (optionalUser.isPresent()) {
            UserCredential user = optionalUser.get();
         
            return new UserResponseDto(
                user.getUserId(),
                user.getUsername(),
                user.getFirstname(),
                user.getLastname(),
                user.getMobile(),
                user.getEmail(),
                user.getRole()
            );
        } else {    throw new BadCredentialsException("User with ID " + id + " not found");
        }
    }
    

}
