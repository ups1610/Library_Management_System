package com.lms.catalogueService.exception;

public class CapacityReachException  extends RuntimeException {

    public CapacityReachException(String msg){
        super(msg);
    }

}
