package com.lms.membershipService.services;

import java.util.List;

import com.lms.membershipService.dto.MemberRequestDTO;
import com.lms.membershipService.dto.MemberResponseDTO;

public interface MemberService {

    MemberResponseDTO newMember(MemberRequestDTO memberRequest);

    MemberResponseDTO updateMember(long id, MemberRequestDTO memberRequest);

    MemberResponseDTO deleteMember(long id);

    MemberResponseDTO getMember(long id);

    List<MemberResponseDTO> getAllMembers();

    
}

