package com.lms.membershipService.dto;

import com.lms.membershipService.entities.Address;

public record MemberRequestDTO(
        String firstName,
        String familyName,
        String mobile,
        String email,
        Address currentAddress,
        Address permanentAddress) {
}
