package com.lms.authService.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    private final Logger log=LoggerFactory.getLogger(UserServiceImpl.class);

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtServiceImpl jwtService,
            AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public UserResponseDto addUser(UserRequestDto userRequest) {
        Optional<UserCredential> optionalUser=null;
       optionalUser = userRepository.findByEmail(userRequest.email());
        if (optionalUser.isPresent()) {
            throw new DuplicateUserException("Email already registered!");
        }

       optionalUser = userRepository.findByUsername(userRequest.userName());
        if (optionalUser.isPresent()) {
            throw new DuplicateUserException("Username not available!");
        }

        optionalUser = userRepository.findByMobile(userRequest.mobile());
        if (optionalUser.isPresent()) {
            throw new DuplicateUserException("Mobile No already registered!");
        }


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
                savedUser.getRole(),
                savedUser.getStatus()
                
                );
    }

    @Override
    public LoginResponseDto generateToken(LoginRequestDto user) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.userName(), user.password()));
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(user.userName());

            UserCredential loginUser = userRepository.findByUsername(user.userName())
                    .orElseThrow(() -> new BadCredentialsException("Bad Credentials"));

            return new LoginResponseDto(token, loginUser.getUserId(), loginUser.getUsername(), loginUser.getFirstname(),
                    loginUser.getLastname(), loginUser.getMobile(), loginUser.getEmail(), loginUser.getRole());
        } else {
            throw new BadCredentialsException("Bad Credentials");
        }

    }

    @Override
    public UserResponseDto validateToken(String token) {
        boolean isValid= jwtService.validateToken(token);

        if(!isValid){
            throw new BadCredentialsException("Invalid Token");
        
        }

        String username= jwtService.getUserNameFromToken(token);
       UserCredential user= userRepository.findByUsername(username).orElseThrow(()-> new BadCredentialsException("Invalid Username: "+username));

       return new UserResponseDto(
        user.getUserId(),
        user.getUsername(),
        user.getFirstname(),
        user.getLastname(),
        user.getMobile(),
        user.getEmail(),
        user.getRole(),
        user.getStatus()
                
                );
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
                    user.getRole(),
                    user.getStatus()
                    
                    );
        } else {
            throw new BadCredentialsException("User with ID " + id + " not found");
        }
    }

    @Override
    public List<UserResponseDto> getAllUser() {
        List<UserCredential> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserResponseDto(
                        user.getUserId(),
                        user.getUsername(),
                        user.getFirstname(),
                        user.getLastname(),
                        user.getMobile(),
                        user.getEmail(),
                        user.getRole(),
                        user.getStatus()))
                .collect(Collectors.toList());
    }

   

    @Override
    public UserResponseDto activateOrBlockUser(long id) {
      UserCredential user= userRepository.findById(id).orElseThrow(()-> new BadCredentialsException("Invalid User id: "+id));
      if ("active".equals(user.getStatus()))
      user.setStatus("block");
    else
        user.setStatus("active");
    
        UserCredential updateUser= userRepository.save(user);

        return new UserResponseDto(
            updateUser.getUserId(),
            updateUser.getUsername(),
            updateUser.getFirstname(),
            updateUser.getLastname(),
            updateUser.getMobile(),
            updateUser.getEmail(),
            updateUser.getRole(),
            updateUser.getStatus());
    
    }

    @Override
    public UserResponseDto updateUser(long id, UserRequestDto userRequest) {
       
       
       
        UserCredential user=  userRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Invalid User Id"));
       
    //     Optional<UserCredential> optionalUser=null;
    //    optionalUser = userRepository.findByEmail(userRequest.email());
    //     if (optionalUser.isPresent() ) {
    //         throw new DuplicateUserException("Email already registered!");
    //     }

    //    optionalUser = userRepository.findByUsername(userRequest.userName());
    //     if (optionalUser.isPresent() && userRequest.mobile()!=user.getMobile()) {
    //         throw new DuplicateUserException("Username not available!");
    //     }

    //     optionalUser = userRepository.findByMobile(userRequest.mobile());
    //     if (optionalUser.isPresent()) {
    //         throw new DuplicateUserException("Mobile No already registered!");
    //     }

       
       
        user.setUsername(userRequest.userName());
        user.setFirstname(userRequest.firstName());
        user.setLastname(userRequest.lastName());
        user.setMobile(userRequest.mobile());
        user.setEmail(userRequest.email());
        user.setRole(userRequest.role());

       UserCredential updatedUser= userRepository.save(user);

       return new UserResponseDto(
        updatedUser.getUserId(),
        updatedUser.getUsername(),
        updatedUser.getFirstname(),
        updatedUser.getLastname(),
        updatedUser.getMobile(),
        updatedUser.getEmail(),
        updatedUser.getRole(),
        updatedUser.getStatus()
        
        );
    }

    @Override
    public String changePassword(long id, String password) {
        UserCredential user=  userRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Invalid User Id"));

        user.setPassword(passwordEncoder.encode(password));

        return "Password changed!";
    }
   

}
