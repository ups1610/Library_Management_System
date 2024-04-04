package com.lms.membershipService.dto;

public record AddressResponseDTO(
        String landmark,
        String address1,
        String address2,
        String city,
        String district,
        String state,
        long pincode) {

}
