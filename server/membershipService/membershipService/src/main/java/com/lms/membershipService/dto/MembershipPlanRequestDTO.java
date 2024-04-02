package com.lms.membershipService.dto;

public record MembershipPlanRequestDTO(
        String planName,
        String description,
        double price,
        int durationMonth) {

}
