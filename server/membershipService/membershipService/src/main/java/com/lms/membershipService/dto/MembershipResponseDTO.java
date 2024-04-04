package com.lms.membershipService.dto;

import java.util.Date;

public record MembershipResponseDTO(
        long membershipId,
        long memberId,
        Date startDate,
        Date endDate,
        String status,
        long planId,
        int transactionId) {
    public MembershipResponseDTO(
            long membershipId,
            long memberId,
            Date startDate,
            Date endDate,
            String status,
            long planId,
            int transactionId) {
        this.membershipId = membershipId;
        this.memberId = memberId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.planId = planId;
        this.transactionId = transactionId;
    }
}
