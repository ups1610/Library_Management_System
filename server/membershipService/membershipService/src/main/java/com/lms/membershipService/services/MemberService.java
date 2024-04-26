package com.lms.membershipService.services;

import java.util.List;

import com.lms.membershipService.dto.MailRequestDto;
import com.lms.membershipService.dto.MemberRequestDTO;
import com.lms.membershipService.dto.MemberResponseDTO;
import com.lms.membershipService.external.dto.BookIssueResponseDTO;
import com.lms.membershipService.external.dto.TransactionResponseDTO;

public interface MemberService {

    MemberResponseDTO newMember(MemberRequestDTO memberRequest);

    MemberResponseDTO updateMember(long id, MemberRequestDTO memberRequest);

    MemberResponseDTO deleteMember(long id);

    MemberResponseDTO getMember(long id);
    List<TransactionResponseDTO> getMemberTransactions(long id);
    List<MemberResponseDTO> getAllMembers();

    String sendMail(MailRequestDto mail);
   

    
}

