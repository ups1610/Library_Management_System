package com.lms.membershipService.dto;

public record AddressResponseDTO(
        long addressId,
        String landmark,
        String currentAddress,
        String permanentAddress,
        String city,
        String district,
        String state,
        String pincode) {

}
