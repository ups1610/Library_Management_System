package com.lms.membershipService.dto;

public record AddressRequestDTO(
        String landmark,
        String currentAddress,
        String permanentAddress,
        String city,
        String district,
        String state,
        String pincode) {

}