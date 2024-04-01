package com.lms.transactionService.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.lms.transactionService.dto.TransactionRequestDTO;
import com.lms.transactionService.dto.TransactionResponseDTO;
import com.lms.transactionService.entities.Transaction;
import com.lms.transactionService.repositry.TransactionRepositry;
import com.lms.transactionService.service.TransactionService;

import lombok.AllArgsConstructor;

@Service

public class TransactionServiceImpl implements TransactionService{

    private final TransactionRepositry transactionRepository;
    public TransactionServiceImpl(TransactionRepositry transactionRepository){
        this.transactionRepository=transactionRepository;
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
        return convertToTransactionResponseDTO(entity,"dummy","dummy");
    }

    @Override
    public List<TransactionResponseDTO> getAll() {
      List<Transaction> transactions = transactionRepository.findAll();
 
    return transactions.stream()
    .map(transaction -> {
       
        return convertToTransactionResponseDTO(transaction, "dummy", "fetch from other service");
    })
    .collect(Collectors.toList());
    }

    @Override
    public TransactionResponseDTO getParticular(long id) {
        Transaction entity = transactionRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Invald transaction id: "+id));
       
        return convertToTransactionResponseDTO(entity,"dummy","dummy");
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
           
            return convertToTransactionResponseDTO(transaction, "dummy", "fetch from other service");
        })
        .collect(Collectors.toList());
    }
    
    @Override
    public List<TransactionResponseDTO> getByInitiator(long initiator) {
        List<Transaction> transactions = transactionRepository.findByInitiatedBy(initiator);
        return transactions.stream()
        .map(transaction -> {
           
            return convertToTransactionResponseDTO(transaction, "dummy", "fetch from other service");
        })
        .collect(Collectors.toList());
    }
    
    private TransactionResponseDTO convertToTransactionResponseDTO(Transaction entity,String member,String initatedBy) {
        return new TransactionResponseDTO(
                entity.getTransactionId(),
                member,
                entity.getPaidMode(),
                entity.getTransactionTimeStamp(),
                entity.getAmount(),
                entity.getNarration(),
                initatedBy
        );
    }
    

}
