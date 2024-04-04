package com.lms.membershipService.exceptions;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;




@RestControllerAdvice
public class CustomExceptionHandler {

    private Logger log= LoggerFactory.getLogger(CustomExceptionHandler.class);
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public Map<String,String> illegalExp(IllegalArgumentException ex){
        Map<String,String> error= new HashMap<>();
        error.put("error", ex.getMessage());

        return error;
    }  

    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    @ExceptionHandler(SQLException.class)
    public Map<String,String> sqlException(SQLException ex){
        Map<String,String> error= new HashMap<>();
        log.error(ex.getMessage());
        error.put("error", "Something Went Wrong ");

        return error;
    }  


    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DuplicateDataException.class)
    public Map<String,String> dplicateDataExp(DuplicateDataException ex){
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
