package com.lms.authService.exception;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(CustomExceptionHandler.class);
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public Map<String,String> illegalExp(IllegalArgumentException ex){
        Map<String,String> error= new HashMap<>();
        error.put("error", ex.getMessage());

        return error;
    }  


    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(BadCredentialsException.class)
    public Map<String,String> badCredential(BadCredentialsException ex){
        Map<String,String> error= new HashMap<>();
        error.put("error", ex.getMessage());

        return error;
    }  


    
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(DuplicateUserException.class)
    public Map<String,String> DuplicateUser(DuplicateUserException ex){
        Map<String,String> error= new HashMap<>();
        error.put("error", ex.getMessage());

        return error;
    }  



    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    @ExceptionHandler(Exception.class)
    public Map<String,String> exphandle(Exception ex){
        Map<String,String> error= new HashMap<>();
        log.error("Auth Service",ex);
        error.put("error", "Something Went Wrong");

        return error;
    }   
}
