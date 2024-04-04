package com.lms.transactionService.dto;



public record TransactionRequestDTO(
  
    long member,
  
    double amount,
    String narration,
    String mode,
    long initiatedBy
) {

}
