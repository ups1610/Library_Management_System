package com.lms.transactionService.service.impl;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.lms.transactionService.dto.OnlinePaymentRequestDto;
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
import com.razorpay.Utils;

import lombok.AllArgsConstructor;

@Service

public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepositry transactionRepository;
    private final UserService userService;
    private final MemberService memberService;

    private final Logger log= LoggerFactory.getLogger(TransactionServiceImpl.class);


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

        String user = "Self";
        String referenceId=  "Cash";

        if(entity.getReferenceId()!=null){
            referenceId= entity.getReferenceId();
        }
        if(entity.getInitiatedBy()>0){
            user = userService.getUser(entity.getInitiatedBy()).userName();
        }
        return new TransactionResponseDTO(
                entity.getTransactionId(),
                member.firstName() + " " + member.familyName(),
                entity.getPaidMode(),
                entity.getTransactionTimeStamp(),
                entity.getAmount(),
                entity.getNarration(),
                referenceId,
                user
                );
    }

    @Override
    public List<TransactionResponseDTO> getCollectionToday() {
     
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
            return order.get("id");
        } catch (RazorpayException e) {
          
            e.printStackTrace(); 
            return "Failed to create payment: " + e.getMessage();
        }
    }

    @Override
    public long paymentVerification(OnlinePaymentRequestDto payment) {
        RazorpayClient razorpay =null;
        try {
             razorpay = new RazorpayClient(apiKeyId,apiKeySecret);
       

        String secret = apiKeySecret;
                        
     

        System.out.println(payment.orderId()+"Order ID");
        JSONObject options = new JSONObject();
        options.put("razorpay_order_id", payment.orderId());
        options.put("razorpay_payment_id",  payment.paymentId());
        options.put("razorpay_signature", payment.signature());
        
        boolean status = Utils.verifyPaymentSignature(options, secret);

        if(status==true){
            Transaction entity = new Transaction();

            entity.setMember(payment.member());
            entity.setTransactionTimeStamp(new Date());
            entity.setAmount(payment.amount());
            entity.setNarration(payment.narration());
            entity.setPaidMode("Online");
            entity.setInitiatedBy(-1);
            entity.setReferenceId(payment.paymentId());
            entity = transactionRepository.save(entity);
                return entity.getTransactionId();
        }
       
        return -1;
        } catch (RazorpayException e) {
           log.error("Error", e);
         
           return -1;
        }

       
    }




    private String hmac_sha256(String message, String secret) {
        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
            sha256_HMAC.init(secret_key);

            byte[] hash = sha256_HMAC.doFinal(message.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
            log.error("SHa256",e);
            return null;
        }
    }

}