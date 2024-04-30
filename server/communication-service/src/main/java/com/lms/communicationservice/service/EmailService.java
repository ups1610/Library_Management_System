package com.lms.communicationservice.service;

import com.lms.communicationservice.dto.MailConfigRequestDto;
import com.lms.communicationservice.dto.MailConfigResponseDto;
import com.lms.communicationservice.dto.SendMailRequestDto;

public interface EmailService {


    public String sendMail(SendMailRequestDto sendMail);

    public MailConfigResponseDto setMailConfig(MailConfigRequestDto data);


    public MailConfigResponseDto  getMailConfig();

}
