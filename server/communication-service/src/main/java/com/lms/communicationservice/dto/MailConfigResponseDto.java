package com.lms.communicationservice.dto;

public record MailConfigResponseDto(


int port,
String host,
String userName,
String pass
) {

}
