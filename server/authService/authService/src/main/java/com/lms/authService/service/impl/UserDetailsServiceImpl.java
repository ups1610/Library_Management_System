package com.lms.authService.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


import com.lms.authService.config.CustomUserDetails;
import com.lms.authService.entities.UserCredential;
import com.lms.authService.repositories.UserRepository;

@Component
public class UserDetailsServiceImpl  implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

   

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserCredential> userOptional = userRepository.findByUsername(username);
        UserCredential user = userOptional.orElseThrow(() -> new BadCredentialsException("Bad Credentials"));
        return new CustomUserDetails(user);
    }


}
