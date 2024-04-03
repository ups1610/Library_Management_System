package com.lms.authService.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.lms.authService.service.impl.UserDetailsServiceImpl;

@Configuration

@EnableWebSecurity
public class AuthConfig {


    @Bean
    public UserDetailsService userDetailsService(){
        return new UserDetailsServiceImpl();
    }

    @Bean   
    public PasswordEncoder passwordEncoder(){
        return new  BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }


      @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.cors(AbstractHttpConfigurer::disable);//disable cors
        httpSecurity.csrf(AbstractHttpConfigurer::disable);//disable csrf

        // http request filter
        httpSecurity.authorizeHttpRequests(
            requestMatcher->
                    requestMatcher.requestMatchers("/auth/**").permitAll()
                    .requestMatchers("/v3/api-docs/**").permitAll()
                         .requestMatchers("/swagger-ui/**").permitAll()
                         .requestMatchers("/configuration/ui").permitAll()
                         .requestMatchers("/swagger-resources/**").permitAll()
                       
                         .requestMatchers("/auth/**").permitAll()
                        
                      
                                    .anyRequest().authenticated()
                                    
                
        ) ;  

      
        //  // Authentication Entry point -exception hnadler
        // httpSecurity.exceptionHandling(
        //     exceptionConfig->exceptionConfig.authenticationEntryPoint(authenticationEntryPoint)
        // );
        
        // //session policy-not req in jwt case;
        // httpSecurity.sessionManagement(sessionCOnfig->sessionCOnfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // //add jwt authentication filter
        // httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();

    }


      @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService){
        DaoAuthenticationProvider authenticationProvider= new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }




   

}
