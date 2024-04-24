package com.lms.communicationservice.service;

import com.lms.communicationservice.dto.SendMailRequestDto;

public interface EmailService {


    public String sendMail(SendMailRequestDto sendMail);

}
