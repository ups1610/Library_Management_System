package com.lms.transactionService.dto;

public record OnlinePaymentRequestDto(
    long member,
    double amount,
    String narration,
    String orderId,
    String paymentId,
    String signature

) {

}
