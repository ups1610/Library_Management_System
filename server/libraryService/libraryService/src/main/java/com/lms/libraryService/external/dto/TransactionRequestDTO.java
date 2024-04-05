package com.lms.libraryService.external.dto;

import java.util.Date;

public record TransactionRequestDTO(
  
    long member,
  
    double amount,
    String narration,
    String mode,
    long initiatedBy
) {

}
