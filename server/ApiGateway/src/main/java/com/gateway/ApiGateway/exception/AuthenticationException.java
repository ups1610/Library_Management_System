package com.gateway.ApiGateway.exception;

public class AuthenticationException extends RuntimeException {

    public AuthenticationException(String msg){
        super(msg);
    }

}
