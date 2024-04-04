package com.lms.membershipService.exceptions;

public class DuplicateDataException  extends RuntimeException {

    public DuplicateDataException(String msg){
        super(msg);
    }

}
