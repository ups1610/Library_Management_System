package com.lms.membershipService.dto;


public record MemberRequestDTO(
        String firstName,
        String familyName,
        long mobile,
        String email,
        AddressRequestDTO currentAddress,
        AddressRequestDTO permanentAddress) {

   
}
