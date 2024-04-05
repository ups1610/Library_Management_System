package com.lms.libraryService.external.service;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.lms.libraryService.external.dto.TransactionRequestDTO;
import com.lms.libraryService.external.dto.TransactionResponseDTO;



@FeignClient(name="TransactionService", url="http://192.168.155.39:8085")
public interface TransactionService {

      @GetMapping("transaction/{id}")
      TransactionResponseDTO getTransaction(@PathVariable long id);

      @GetMapping("transaction/member/{memberId}")
     List<TransactionResponseDTO> getTransactionsByMember(@PathVariable long memberId);
    
     @PostMapping("transaction")
     TransactionResponseDTO transaction(TransactionRequestDTO transaction);

}
