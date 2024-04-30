package com.lms.communicationservice.dto;

public record MailConfigRequestDto(

 int port,
 String host,
 String userName,
 String pass

) {

}
