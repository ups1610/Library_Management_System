package com.lms.communicationservice.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.lms.communicationservice.dto.MailConfigRequestDto;
import com.lms.communicationservice.dto.MailConfigResponseDto;
import com.lms.communicationservice.dto.SendMailRequestDto;
import com.lms.communicationservice.entities.Email;
import com.lms.communicationservice.repositories.EmailConfigRepository;
import com.lms.communicationservice.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    private final EmailConfigRepository emailConfigRepository;
  
    private Email mailConfigResponse;

  
    public EmailServiceImpl(JavaMailSender mailSender,EmailConfigRepository emailConfigRepository) {
        this.mailSender = mailSender;
        this.emailConfigRepository=emailConfigRepository;

        mailConfigResponse= emailConfigRepository.findFirstEmail();
    }

    @Override
    public String sendMail(SendMailRequestDto mail) {

            
            SimpleMailMessage message = new SimpleMailMessage();


        
            message.setFrom(mailConfigResponse.getUserName()); 
            message.setTo(mail.toMail());
            message.setText(mail.body());
            message.setSubject(mail.subject());
            
            mailSender.send(message);

            return "Mail sent successfully";
        
    }

    @Override
    public MailConfigResponseDto setMailConfig(MailConfigRequestDto data) {
        Email email = emailConfigRepository.findFirstEmail(); 
        if (email == null) {
            email = new Email(); 
          
        }
        email.setHost(data.host());
        email.setPort(data.port());
        email.setUserName(data.userName());
        email.setPass(data.pass());
        emailConfigRepository.save(email);
        return new MailConfigResponseDto(email.getPort(), email.getHost(), email.getUserName(), email.getPass());
    }

    @Override
    public MailConfigResponseDto getMailConfig() {
        Email email = emailConfigRepository.findFirstEmail(); 
        if (email == null) {
          
            return null;
        }
        return new MailConfigResponseDto(email.getPort(), email.getHost(), email.getUserName(), email.getPass());
    }
}
