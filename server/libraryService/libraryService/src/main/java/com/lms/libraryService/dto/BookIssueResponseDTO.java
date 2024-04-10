package com.lms.libraryService.dto;

import java.util.Date;

import com.lms.libraryService.external.dto.BookInstanceResponseDTO;
public record BookIssueResponseDTO(
        long bookIssueId,
        BookInstanceResponseDTO bookInstance,
   
        long member_Id,
        String memberName,
        Date dateOfIssue,
        Date dateOfReturn,
        String isReturn,
        String issueBy
) {

}
