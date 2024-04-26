package com.lms.membershipService.services;

import java.util.List;

import com.lms.membershipService.dto.MembershipRequestDTO;
import com.lms.membershipService.dto.MembershipResponseDTO;

public interface MembershipService {

    public MembershipResponseDTO newMembership(MembershipRequestDTO membershipRequest);

    

    public MembershipResponseDTO getMembership(long id);
    public MembershipResponseDTO getMembershipByMemberID(long id);
    
    public MembershipResponseDTO toggleStatus(long id);
    
    public MembershipResponseDTO activateMembership(long id ,long transaction);
    public List<MembershipResponseDTO> getAllMemberships();
}
