package com.lms.membershipService.services;

import java.util.List;

import com.lms.membershipService.dto.MembershipRequestDTO;
import com.lms.membershipService.dto.MembershipResponseDTO;

public interface MembershipService {

    public MembershipResponseDTO newMembership(MembershipRequestDTO membershipRequest);

    public MembershipResponseDTO updateMembership(long id, MembershipRequestDTO membershipRequest);

    public MembershipResponseDTO deleteMembership(long id);

    public MembershipResponseDTO getMembership(long id);

    public List<MembershipResponseDTO> getAllMemberships();
}
