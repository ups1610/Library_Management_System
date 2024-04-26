package com.lms.libraryService.external.service;



import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import com.lms.libraryService.external.dto.SendMailRequestDto;


@FeignClient(name="communication-service", url="http://localhost:8089")
public interface EmailService {

    @PostMapping("/communicate/sendMail")
    String sendMail(SendMailRequestDto mail);
}
