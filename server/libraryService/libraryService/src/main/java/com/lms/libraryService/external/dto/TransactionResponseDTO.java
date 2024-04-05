package com.lms.libraryService.external.dto;

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
