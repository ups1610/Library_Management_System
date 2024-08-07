package com.lms.libraryService.external.service;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.lms.libraryService.external.dto.MemberResponseDTO;
import com.lms.libraryService.external.dto.MembershipResponseDTO;



@FeignClient(name="MembershipService", url="http://localhost:8084")
public interface MemberService {

    @GetMapping("membershipService/member/{id}")
   MemberResponseDTO getMember(@PathVariable long id);

   @GetMapping("membershipService/membership/member/{id}")
   MembershipResponseDTO getMemberShipByID(@PathVariable long id);

   
   @GetMapping("membershipService/membership/all")
  List<MembershipResponseDTO> getAllMembershipHolderMember();
      

}
