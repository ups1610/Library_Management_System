package com.lms.authService.exception;

public class DuplicateUserException  extends RuntimeException {
        public DuplicateUserException(String msg){
            super(msg);
        }
}
