package com.lms.communicationservice.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.lms.communicationservice.dto.SendMailRequestDto;
import com.lms.communicationservice.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String username;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public String sendMail(SendMailRequestDto mail) {
       
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(username); 
            message.setTo(mail.toMail());
            message.setText(mail.body());
            message.setSubject(mail.subject());

            mailSender.send(message);

            return "Mail sent successfully";
        
    }
}
