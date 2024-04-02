package com.lms.membershipService.dto;

import java.sql.Date;

public record MembershipRequestDTO(
        long memberId,
        Date startDate,
        Date endDate,
        String status,
        long membershipPlanId,
        int transactionId) {

}
