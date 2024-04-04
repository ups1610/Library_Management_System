package com.lms.membershipService.dto;

public record MembershipPlanResponseDTO(
        long id,
        String planName,
        String description,
        double price,
        int durationMonth) {

}
