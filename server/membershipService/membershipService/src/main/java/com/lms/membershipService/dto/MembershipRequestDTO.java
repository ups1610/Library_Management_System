package com.lms.membershipService.dto;

import java.sql.Date;

public record MembershipRequestDTO(
        long memberId,
        Date startDate,
         String modeOfPayment,
        long membershipPlanId
       ) {

}
