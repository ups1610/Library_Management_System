package com.lms.transactionService.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.lms.transactionService.dto.TransactionRequestDTO;
import com.lms.transactionService.dto.TransactionResponseDTO;
import com.lms.transactionService.entities.Transaction;
import com.lms.transactionService.external.dto.MemberResponseDTO;
import com.lms.transactionService.external.dto.UserResponseDto;
import com.lms.transactionService.external.services.MemberService;
import com.lms.transactionService.external.services.UserService;
import com.lms.transactionService.repositry.TransactionRepositry;
import com.lms.transactionService.service.TransactionService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import lombok.AllArgsConstructor;

@Service

public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepositry transactionRepository;
    private final UserService userService;
    private final MemberService memberService;



    @Value("${razorpay.key_id}")
    private String apiKeyId;

    @Value("${razorpay.key_secret}")
    private String apiKeySecret;

    public TransactionServiceImpl(TransactionRepositry transactionRepository, UserService userService,
            MemberService memberService) {
        this.memberService = memberService;
        this.transactionRepository = transactionRepository;
        this.userService = userService;
    }

    @Override
    public TransactionResponseDTO create(TransactionRequestDTO transaction) {
        Transaction entity = new Transaction();

        entity.setMember(transaction.member());
        entity.setTransactionTimeStamp(new Date());
        entity.setAmount(transaction.amount());
        entity.setNarration(transaction.narration());
        entity.setPaidMode(transaction.mode());
        entity.setInitiatedBy(transaction.initiatedBy());
        entity = transactionRepository.save(entity);

        return convertToTransactionResponseDTO(entity);
    }

    @Override
    public List<TransactionResponseDTO> getAll() {
        List<Transaction> transactions = transactionRepository.findAll();

        return transactions.stream()
                .map(transaction -> {

                    return convertToTransactionResponseDTO(transaction);
                })
                .collect(Collectors.toList());
    }

    @Override
    public TransactionResponseDTO getParticular(long id) {
        Transaction entity = transactionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invald transaction id: " + id));

        return convertToTransactionResponseDTO(entity);
    }

    @Override
    public String delete(long id) {

        transactionRepository.deleteById(id);
        return "Transaction deleted successfully";
    }

    @Override
    public List<TransactionResponseDTO> getByMember(long member) {
        List<Transaction> transactions = transactionRepository.findByMember(member);
        return transactions.stream()
                .map(transaction -> {

                    return convertToTransactionResponseDTO(transaction);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<TransactionResponseDTO> getByInitiator(long initiator) {
        List<Transaction> transactions = transactionRepository.findByInitiatedBy(initiator);
        return transactions.stream()
                .map(transaction -> {

                    return convertToTransactionResponseDTO(transaction);
                })
                .collect(Collectors.toList());
    }

    private TransactionResponseDTO convertToTransactionResponseDTO(Transaction entity) {

        MemberResponseDTO member = memberService.getMember(entity.getMember());

        UserResponseDto user = userService.getUser(entity.getInitiatedBy());
        return new TransactionResponseDTO(
                entity.getTransactionId(),
                member.firstName() + " " + member.familyName(),
                entity.getPaidMode(),
                entity.getTransactionTimeStamp(),
                entity.getAmount(),
                entity.getNarration(),
                entity.getReferenceId(),
                user.userName());
    }

    @Override
    public List<TransactionResponseDTO> getCollectionToday() {
        // TODO Auto-generated method stub
        Date today = new Date();
        List<Transaction> transactionsToday = transactionRepository.findByTransactionTimeStampBetween(today,
                endOfDay(today));

        return transactionsToday.stream()
                .map(transaction -> {

                    return convertToTransactionResponseDTO(transaction);
                })
                .collect(Collectors.toList());
    }

    private Date endOfDay(Date date) {
        return Date.from(date.toInstant().plusSeconds(86399)); // 86399 seconds is 23:59:59
    }

    @Override
    public String newPaymentOrder(String name, String email, double amount) {
        try {
            RazorpayClient razorpay = new RazorpayClient(apiKeyId, apiKeySecret);
    
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount*100);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "receipt#1");
            JSONObject notes = new JSONObject();
            notes.put("name", name); 
            notes.put("email", email); 
            orderRequest.put("notes", notes);
    
            Order order = razorpay.orders.create(orderRequest);
            return order.toString();
        } catch (RazorpayException e) {
          
            e.printStackTrace(); 
            return "Failed to create payment: " + e.getMessage();
        }
    }

    @Override
    public String paymentVerification() {
        return "Success";
    }

}