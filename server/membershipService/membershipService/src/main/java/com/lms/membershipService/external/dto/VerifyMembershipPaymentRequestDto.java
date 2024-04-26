package com.lms.membershipService.external.dto;

public record VerifyMembershipPaymentRequestDto(

String orderId,

String paymentId,

String signature
) {

}
