package com.lms.libraryService.dto;

import java.util.Date;
public record BookIssueResponseDTO(
        long bookIssueId,
        long bookInstance,
        long member_Id,
        String memberName,
        Date dateOfIssue,
        Date dateOfReturn,
        String issueBy
) {

}
