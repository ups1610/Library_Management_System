package com.lms.membershipService.external.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import com.lms.membershipService.external.dto.SendMailRequestDto;

@FeignClient(name="communication-service")
public interface EmailService {
    @PostMapping("/communicate/sendMail")
    String sendMail(SendMailRequestDto mail);
}
