package com.lms.transactionService.external.dto;


public record MemberResponseDTO(
        long memberId,
        String firstName,
        String familyName,
        long mobile,
        String email,
        AddressResponseDTO currentAddress,
        AddressResponseDTO permanentAddress) {
}
