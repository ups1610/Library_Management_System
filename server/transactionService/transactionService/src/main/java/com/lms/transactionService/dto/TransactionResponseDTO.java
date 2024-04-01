package com.lms.transactionService.dto;

import java.util.Date;

public record TransactionResponseDTO(
    long transactionId,
    String member,
    
    String mode,
    Date date,
    double amount,
    String narration,
    String initiatedBy
) {

}
