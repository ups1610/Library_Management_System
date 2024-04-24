package com.lms.membershipService.services;

import com.lms.membershipService.dto.MembershipOrderResponseDto;

public interface MembershipOrderService {



    public  MembershipOrderResponseDto newMembershipOrder(long memberId, double amount);

    public MembershipOrderResponseDto getMembershipOrder(String orderId);

    public MembershipOrderResponseDto activateMembership(String orderId);

}
