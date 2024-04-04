package com.lms.membershipService.dto;

import com.lms.membershipService.entities.Address;

public record MemberResponseDTO(
        long memberId,
        String firstName,
        String familyName,
        long mobile,
        String email,
        AddressResponseDTO currentAddress,
        AddressResponseDTO permanentAddress) {
}
