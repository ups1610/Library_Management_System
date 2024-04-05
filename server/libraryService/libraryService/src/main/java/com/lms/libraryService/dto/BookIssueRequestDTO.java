package com.lms.libraryService.dto;

import java.util.Date;

public record BookIssueRequestDTO(
        long book,
        long bookInstance,
        long member,
        Date dateOfIssue,
        Date dateOfReturn,
        long issueBy) {

}