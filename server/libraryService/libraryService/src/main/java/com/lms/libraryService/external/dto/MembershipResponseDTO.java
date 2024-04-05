package com.lms.libraryService.external.dto;

import java.util.Date;


public record MembershipResponseDTO(
        long membershipId,
        long memberId,
        String memberName,
        Date startDate,
        Date endDate,
        String status,
        String  plan,
        TransactionResponseDTO transactionId
       
        ) {
}
