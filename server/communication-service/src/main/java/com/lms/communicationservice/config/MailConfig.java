package com.lms.communicationservice.config;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.lms.communicationservice.entities.Email;
import com.lms.communicationservice.repositories.EmailConfigRepository;

@Configuration
public class MailConfig {

    private final EmailConfigRepository emailConfigRepository;

    public MailConfig(EmailConfigRepository emailConfigRepository) {
        this.emailConfigRepository = emailConfigRepository;
    }

    @Bean
    public JavaMailSender javaMailSender() {
        Email email = emailConfigRepository.findFirstEmail();
        if (email == null) {
            throw new IllegalStateException("Email configuration not found in the database.");
        }

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(email.getHost());
        mailSender.setPort(email.getPort());
        mailSender.setUsername(email.getUserName());
        mailSender.setPassword(email.getPass());

        // Additional properties
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.starttls.required", "true");

        return mailSender;
    }
}
