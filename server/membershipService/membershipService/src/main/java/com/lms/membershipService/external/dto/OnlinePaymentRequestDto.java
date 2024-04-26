package com.lms.membershipService.external.dto;


public record OnlinePaymentRequestDto(
    long member,
    double amount,
    String narration,
    String orderId,
    String paymentId,
    String signature

) {

}
