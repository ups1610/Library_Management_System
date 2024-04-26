package com.lms.transactionService.service;

import java.util.Date;
import java.util.List;

import com.lms.transactionService.dto.OnlinePaymentRequestDto;
import com.lms.transactionService.dto.TransactionRequestDTO;
import com.lms.transactionService.dto.TransactionResponseDTO;
import com.razorpay.RazorpayException;

public interface TransactionService {

    public TransactionResponseDTO create(TransactionRequestDTO transaction);
    public List<TransactionResponseDTO> getAll();
    
    public TransactionResponseDTO getParticular(long id);
    public String delete(long id);
    public List<TransactionResponseDTO> getByMember(long member);
    public List<TransactionResponseDTO>getByInitiator(long initiator);
   
    public List<TransactionResponseDTO>getCollectionToday();

    public String newPaymentOrder(String name, String email,double amount);

    public long paymentVerification(OnlinePaymentRequestDto onlinePayment);
}
