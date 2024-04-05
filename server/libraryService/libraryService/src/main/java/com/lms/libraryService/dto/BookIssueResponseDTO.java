package com.lms.libraryService.dto;

import java.util.Date;
public record BookIssueResponseDTO(
        long bookIssueId,
        long book,
        long bookInstance,
        long member,
        Date dateOfIssue,
        Date dateOfReturn,
        long issueBy
) {

}
