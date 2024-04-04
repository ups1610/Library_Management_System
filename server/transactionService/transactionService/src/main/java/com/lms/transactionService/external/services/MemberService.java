package com.lms.transactionService.external.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.lms.transactionService.external.dto.MemberResponseDTO;



@FeignClient(name="MembershipService", url="http://192.168.155.39:8084")
public interface MemberService {

    @GetMapping("membershipService/member/{id}")
   MemberResponseDTO getMember(@PathVariable long id);
      

}
