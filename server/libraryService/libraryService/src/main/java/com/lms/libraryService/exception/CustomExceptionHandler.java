package com.lms.libraryService.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public Map<String,String> illegalExp(IllegalArgumentException ex){
        Map<String,String> error= new HashMap<>();
        error.put("error", ex.getMessage());

        return error;
    }  

    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    @ExceptionHandler(Exception.class)
    public Map<String,String> exphandle(Exception ex){
        Map<String,String> error= new HashMap<>();
        error.put("error", ex.getMessage());

        return error;
    }   
}

