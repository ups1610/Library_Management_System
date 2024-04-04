package com.lms.membershipService.dto;

public record AddressRequestDTO(
        String landmark,
        String address1,
        String address2,
        String city,
        String district,
        String state,
        long pincode) {

}