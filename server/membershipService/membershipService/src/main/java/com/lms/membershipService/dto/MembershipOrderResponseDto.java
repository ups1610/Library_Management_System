package com.lms.membershipService.dto;

public record MembershipOrderResponseDto(
    long memberId,

    long membershipid,

    String memberName,

    String memberEmail,
    
    long memberMobile,

    String orderId,
    double amount,

    String orderStatus

) {

}
