package com.lms.membershipService.dto;

import java.util.Date;

import com.lms.membershipService.external.dto.TransactionResponseDTO;

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
