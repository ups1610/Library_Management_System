package com.lms.membershipService.services;

import java.util.List;

import com.lms.membershipService.dto.MembershipPlanRequestDTO;
import com.lms.membershipService.dto.MembershipPlanResponseDTO;

public interface MembershipPlanService {

    MembershipPlanResponseDTO newMembershipPlan(MembershipPlanRequestDTO planRequest);

    MembershipPlanResponseDTO updateMembershipPlan(long id, MembershipPlanRequestDTO planRequest);

    MembershipPlanResponseDTO deleteMembershipPlan(long id);

    MembershipPlanResponseDTO getMembershipPlan(long id);

    List<MembershipPlanResponseDTO> getAllMembershipPlans();
}
