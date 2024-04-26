package com.lms.membershipService.services;

import com.lms.membershipService.dto.MembershipOrderResponseDto;
import com.lms.membershipService.external.dto.VerifyMembershipPaymentRequestDto;

public interface MembershipOrderService {



    public  MembershipOrderResponseDto newMembershipOrder(long memberId, double amount);

    public MembershipOrderResponseDto getMembershipOrder(String orderId);

    public MembershipOrderResponseDto activateMembership(VerifyMembershipPaymentRequestDto order);

}
