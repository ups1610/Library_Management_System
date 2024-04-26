package com.lms.membershipService.dto;

public record MailRequestDto(
    long id,
    String subject,
    String body
) {

}
