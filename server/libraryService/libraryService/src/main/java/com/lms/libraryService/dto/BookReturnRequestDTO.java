package com.lms.libraryService.dto;

import com.lms.libraryService.entities.BookIssue;
import java.util.Date;

public record BookReturnRequestDTO(
        long bookIssue,
    
        Date date,
        int fine,
        boolean waveOffFine,
        String mode,
        long collectBy

) {

}
