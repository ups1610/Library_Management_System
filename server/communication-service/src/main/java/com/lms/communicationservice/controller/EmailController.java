package com.lms.communicationservice.controller;

import org.springframework.web.bind.annotation.RestController;

import com.lms.communicationservice.dto.SendMailRequestDto;
import com.lms.communicationservice.service.EmailService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController

@RequestMapping("/communicate")
public class EmailController {


    private final EmailService emailService;


    public EmailController(EmailService emailService){
        this.emailService=emailService;
    }

    @PostMapping("/sendMail")
    public ResponseEntity<String> sendMail(@RequestBody SendMailRequestDto mail) {
       
           String response= emailService.sendMail(mail);

                return  ResponseEntity.ok(response);
       
    }
    
}
