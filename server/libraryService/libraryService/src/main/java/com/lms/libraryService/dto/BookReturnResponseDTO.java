package com.lms.libraryService.dto;

import com.lms.libraryService.entities.BookIssue;
import java.util.Date;

public record BookReturnResponseDTO(
        long bookReturnId,
        BookIssue bookIssue,
 
        Date date,
        String collectBy) {

}
